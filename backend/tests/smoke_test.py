import sys
import uuid
from pathlib import Path

# Add backend root to path
backend_root = Path(__file__).parent.parent
sys.path.insert(0, str(backend_root))

from config import DELIVERABLES_DIR, UPLOADS_DIR
from rag.vector_store import LocalVectorStore
from rag.document_loader import DocumentLoader
from agent.execution_loop import AgentExecutionLoop

def run_smoke_test():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')

    print("=" * 70)
    print("SOVEREIGN WORKBENCH END-TO-END SMOKE TEST")
    print("=" * 70)

    # 1. Setup session and test document
    session_id = str(uuid.uuid4())
    test_filename = "mrpl_smoke_test_doc.txt"
    test_filepath = UPLOADS_DIR / test_filename
    
    test_content = (
        "MRPL Hydrocracker Unit II Asset Integrity Audit 2026\n"
        "Pressure Vessel V-101 Shell Ring 2 UTM wall thickness reading: 43.1 mm.\n"
        "Nominal thickness: 48.0 mm. ASME Section VIII Div 2 minimum wall thickness t_min: 42.0 mm.\n"
        "Calculated active corrosion rate: 0.62 mm/year.\n"
        "Remaining corrosion allowance: 1.1 mm. Remaining safe operating life: 1.77 years.\n"
        "Recommendation: Apply SS317L weld overlay during Q2 2027 minor turnaround."
    )
    test_filepath.write_text(test_content, encoding="utf-8")
    print(f"[1/5] Created test document: {test_filepath.name} ({len(test_content)} bytes)")

    # 2. Index into Vector Store
    vector_store = LocalVectorStore()
    chunks_added = vector_store.add_document(
        doc_id=test_filename,
        title="MRPL Hydrocracker Asset Integrity Audit 2026",
        content=test_content,
        category="Smoke Test"
    )
    print(f"[2/5] Indexed document into vector store: {chunks_added} chunks added.")

    # 3. Run Agent Execution Loop
    agent_loop = AgentExecutionLoop(vector_store)
    prompt = "Analyze MRPL Hydrocracker V-101 pressure vessel corrosion rate, remaining safe operating life, and list management recommendations."
    print(f"[3/5] Executing 9-Stage Agentic Loop for prompt: '{prompt[:60]}...'")
    
    state = agent_loop.run_agent(session_id, prompt)
    print(f"      - Task Type Detected: {state.task_type.upper()}")
    print(f"      - Routed Model: {state.model_routed}")
    print(f"      - Plan Steps Completed: {len(state.plan_steps)}/9")

    # 4. Verify Deliverable Files Existence & Non-Zero File Size
    deliverables = state.deliverables
    print(f"[4/5] Auditing generated Office deliverables...")
    assert "docx" in deliverables, "Missing .docx deliverable path"
    assert "xlsx" in deliverables, "Missing .xlsx deliverable path"
    assert "pptx" in deliverables, "Missing .pptx deliverable path"

    for f_type, f_path in deliverables.items():
        path = Path(f_path)
        assert path.exists(), f"Deliverable file missing: {f_path}"
        file_size = path.stat().st_size
        assert file_size > 0, f"Deliverable file is 0 bytes: {f_path}"
        print(f"      [OK] Verified {f_type.upper()}: {path.name} ({file_size // 1024} KB)")

    # 5. Audit Verification & Air-Gap Compliance
    audit = state.verification_status
    assert audit.get("status") == "PASSED", f"Verification failed: {audit}"
    assert audit.get("airgap_audit", {}).get("external_network_requests") == 0, "Network leakage detected!"
    
    print(f"[5/5] Verification Audit Passed: 0 external network requests, 100% air-gapped on-premise execution.")
    print("=" * 70)
    print("END-TO-END SMOKE TEST COMPLETED SUCCESSFULLY!")
    print("=" * 70)

if __name__ == "__main__":
    run_smoke_test()
