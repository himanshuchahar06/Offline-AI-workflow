import os
import uuid
import json
import asyncio
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, BackgroundTasks, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from pydantic import BaseModel

from config import (
    ORGANIZATION_NAME, TEAM_NAME, TEAM_ID, PROBLEM_STATEMENT,
    DATA_DIR, UPLOADS_DIR, DELIVERABLES_DIR, AIR_GAPPED_MODE
)
from rag.vector_store import LocalVectorStore
from rag.document_loader import DocumentLoader
from rag.ocr_engine import OCREngine
from agent.execution_loop import AgentExecutionLoop
from llm.ollama_client import OllamaClient
from auth import authenticate_user, create_token, UserCredentials, UserProfile, get_current_user, require_role
from audit import AuditLogger

HISTORY_FILE = DELIVERABLES_DIR / "analysis_history.json"

app = FastAPI(
    title="Sovereign On-Premise Agentic AI Workbench API",
    description="Air-gapped AI platform for confidential industrial work (MRPL / SIH 2026)",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize local vector store and populate with sample refinery documents
global_vector_store = LocalVectorStore()

def initialize_knowledge_base():
    sample_files = list(DATA_DIR.glob("*.*"))
    for file_path in sample_files:
        try:
            content = DocumentLoader.load_file(str(file_path))
            global_vector_store.add_document(
                doc_id=file_path.name,
                title=file_path.stem.replace("_", " ").title(),
                content=content,
                category="Refinery Specs"
            )
        except Exception as e:
            print(f"Error indexing sample file {file_path}: {e}")

initialize_knowledge_base()
agent_loop = AgentExecutionLoop(global_vector_store)

def save_analysis_history(session_data: dict):
    """Save all analysis data persistently to disk."""
    history = []
    if HISTORY_FILE.exists():
        try:
            with open(HISTORY_FILE, "r", encoding="utf-8") as f:
                history = json.load(f)
        except Exception:
            history = []
    
    history.insert(0, session_data)
    try:
        with open(HISTORY_FILE, "w", encoding="utf-8") as f:
            json.dump(history[:20], f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"Error saving analysis history: {e}")

# Pydantic Schemas
class ChatRequest(BaseModel):
    prompt: str
    session_id: str = ""

@app.get("/")
def read_root():
    return {
        "status": "online",
        "app": "Sovereign On-Premise Agentic AI Workbench",
        "organization": ORGANIZATION_NAME,
        "team": TEAM_NAME,
        "team_id": TEAM_ID,
        "problem_statement": PROBLEM_STATEMENT,
        "air_gapped_mode": AIR_GAPPED_MODE,
        "external_network_requests": 0
    }

@app.post("/api/auth/login")
def login(creds: UserCredentials):
    user = authenticate_user(creds.username, creds.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password.")
    token = create_token(user)
    AuditLogger.log_action(actor=user.username, role=user.role, action="USER_LOGIN")
    return {
        "access_token": token,
        "token_type": "bearer",
        "username": user.username,
        "role": user.role
    }

@app.get("/api/audit/log")
def get_audit_log(user: UserProfile = Depends(require_role(["ADMIN", "AUDITOR"]))):
    return {
        "status": "success",
        "integrity": AuditLogger.verify_integrity(),
        "entries": AuditLogger._load_log()
    }

@app.get("/api/audit/verify")
def verify_audit_log():
    return AuditLogger.verify_integrity()

@app.post("/api/chat")
def process_chat(req: ChatRequest):
    session_id = req.session_id or str(uuid.uuid4())
    if not req.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt cannot be empty.")

    agent_state = agent_loop.run_agent(session_id, req.prompt)
    res_data = {
        "status": "success",
        "session_id": session_id,
        "task_type": agent_state.task_type,
        "model_routed": agent_state.model_routed,
        "plan_steps": [s.model_dump() for s in agent_state.plan_steps],
        "final_response": agent_state.final_response,
        "verification_status": agent_state.verification_status,
        "deliverables": agent_state.deliverables,
        "rag_context": agent_state.rag_context,
        "python_sandbox_result": agent_state.python_sandbox_result
    }
    save_analysis_history(res_data)
    AuditLogger.log_action(
        actor="local_operator",
        role="ENGINEER",
        action="EXECUTE_AGENT_PIPELINE",
        metadata={"session_id": session_id, "task_type": agent_state.task_type, "deliverables_count": len(agent_state.deliverables)}
    )
    return res_data

@app.post("/api/stream/analyze")
def stream_analysis(req: ChatRequest):
    session_id = req.session_id or str(uuid.uuid4())
    if not req.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt cannot be empty.")

    AuditLogger.log_action(
        actor="local_operator",
        role="ENGINEER",
        action="STREAM_AGENT_PIPELINE",
        metadata={"session_id": session_id, "prompt_preview": req.prompt[:60]}
    )

    return StreamingResponse(
        agent_loop.run_agent_stream(session_id, req.prompt),
        media_type="text/event-stream"
    )

@app.post("/api/rag/upload")
async def upload_document(file: UploadFile = File(...)):
    dest_path = UPLOADS_DIR / file.filename
    with open(dest_path, "wb") as f:
        content = await file.read()
        f.write(content)

    # Index into local RAG vector store
    try:
        if dest_path.suffix.lower() in [".jpg", ".png", ".jpeg"]:
            ocr_res = OCREngine.extract_text_from_image(str(dest_path))
            text_content = ocr_res.get("extracted_text", "")
        else:
            text_content = DocumentLoader.load_file(str(dest_path))

        chunks_added = global_vector_store.add_document(
            doc_id=file.filename,
            title=dest_path.stem.replace("_", " ").title(),
            content=text_content,
            category="User Upload"
        )
        
        # Run AI Agent Execution immediately on newly uploaded file!
        session_id = str(uuid.uuid4())
        upload_prompt = f"Perform complete technical analysis on uploaded file '{file.filename}', run calculations in sandbox, and generate Word report, Excel sheet, and PowerPoint presentation deck."
        agent_state = agent_loop.run_agent(session_id, upload_prompt)

        res_data = {
            "status": "success",
            "session_id": session_id,
            "task_type": agent_state.task_type,
            "model_routed": agent_state.model_routed,
            "plan_steps": [s.model_dump() for s in agent_state.plan_steps],
            "final_response": agent_state.final_response,
            "verification_status": agent_state.verification_status,
            "deliverables": agent_state.deliverables,
            "rag_context": agent_state.rag_context,
            "python_sandbox_result": agent_state.python_sandbox_result
        }
        save_analysis_history(res_data)

        AuditLogger.log_action(
            actor="local_operator",
            role="ENGINEER",
            action="FILE_UPLOAD_AND_ANALYZE",
            metadata={"filename": file.filename, "chunks_added": chunks_added, "session_id": session_id}
        )

        return {
            "status": "success",
            "filename": file.filename,
            "chunks_indexed": chunks_added,
            "total_documents": len(global_vector_store.documents),
            "agent_data": res_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process document: {str(e)}")

@app.get("/api/rag/documents")
def get_documents():
    return {
        "documents": global_vector_store.list_documents()
    }

@app.get("/api/deliverables/history")
def get_deliverable_history():
    if HISTORY_FILE.exists():
        try:
            with open(HISTORY_FILE, "r", encoding="utf-8") as f:
                return {"history": json.load(f)}
        except Exception:
            return {"history": []}
    return {"history": []}

@app.get("/api/deliverables/download/{file_name}")
def download_deliverable(file_name: str):
    file_path = DELIVERABLES_DIR / file_name
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Deliverable file not found.")
    
    media_type = "application/octet-stream"
    if file_name.endswith(".docx"):
        media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    elif file_name.endswith(".xlsx"):
        media_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    elif file_name.endswith(".pptx"):
        media_type = "application/vnd.openxmlformats-officedocument.presentationml.presentation"

    return FileResponse(path=str(file_path), filename=file_name, media_type=media_type)

@app.websocket("/ws/agent-stream")
async def websocket_agent_stream(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            session_id = str(uuid.uuid4())
            await websocket.send_json({"type": "PLAN_CREATED", "message": "Deconstructing prompt into Plan-Act-Observe-Verify loop..."})
            await asyncio.sleep(0.3)
            
            agent_state = agent_loop.run_agent(session_id, data)
            for step in agent_state.plan_steps:
                await websocket.send_json({"type": "STEP_EXECUTION", "step": step.model_dump()})
                await asyncio.sleep(0.2)

            await websocket.send_json({
                "type": "COMPLETED",
                "final_response": agent_state.final_response,
                "verification": agent_state.verification_status,
                "deliverables": agent_state.deliverables
            })
    except WebSocketDisconnect:
        print("WebSocket client disconnected")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
