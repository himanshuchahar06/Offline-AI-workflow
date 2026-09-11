from llm.local_reasoning_engine import LocalReasoningEngine
from agent.state import AgentState, AgentStepTrace

class AgentPlanner:
    """Explicit 9-Stage Sovereign Agentic Planner following exact architectural specifications."""

    @staticmethod
    def create_plan(session_id: str, prompt: str) -> AgentState:
        analysis = LocalReasoningEngine.analyze_request(prompt)
        
        nine_stage_plan = [
            {"step_id": 1, "action": "1. User Input & Task Entry", "description": "Receive confidential user prompt and document attachments (PDF, DOCX, CSV, Image)"},
            {"step_id": 2, "action": "2. Secure Workspace Air-Gap", "description": "Enforce air-gapped security boundary (0 external network API calls)"},
            {"step_id": 3, "action": "3. Task Analyzer", "description": f"Deconstruct prompt into requirements ({analysis['task_type'].upper()}): risk analysis, evidence gathering, verification"},
            {"step_id": 4, "action": "4. Model Router Selection", "description": f"Select specialized local model route: {analysis['model_routed']}"},
            {"step_id": 5, "action": "5. Specialized Multimodal Model", "description": "Perform multimodal text, image OCR, chart, and table parsing"},
            {"step_id": 6, "action": "6. Agent Planner Loop", "description": "Execute sequential Plan-Act-Observe-Verify state machine"},
            {"step_id": 7, "action": "7. Local Tools & Knowledge RAG", "description": "Query local vector store, internal company SOPs, and run scoped Python calculations"},
            {"step_id": 8, "action": "8. Verification & Hallucination Check", "description": "Cross-check claims against document evidence, assign confidence levels, flag unverified data"},
            {"step_id": 9, "action": "9. Real Deliverable Synthesis", "description": "Generate management-ready Office deliverables (.docx Word, .xlsx Excel, .pptx PowerPoint)"}
        ]

        steps = []
        for step_info in nine_stage_plan:
            steps.append(AgentStepTrace(
                step_id=step_info["step_id"],
                action=step_info["action"],
                description=step_info["description"],
                status="pending"
            ))

        return AgentState(
            session_id=session_id,
            user_prompt=prompt,
            task_type=analysis["task_type"],
            model_routed=analysis["model_routed"],
            plan_steps=steps
        )
