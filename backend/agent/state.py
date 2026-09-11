from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class PipelineStageEvent(BaseModel):
    session_id: str
    stage_id: int
    stage_name: str
    status: str  # pending, in_progress, completed, verified, failed
    input_summary: str = ""
    output_summary: str = ""
    timing_ms: float = 0.0
    confidence: Optional[float] = 1.0
    model_routed: str = "Qwen2.5-7B"
    details: Dict[str, Any] = Field(default_factory=dict)
    timestamp: str = ""

class VerificationClaim(BaseModel):
    claim_id: str
    claim: str
    status: str  # verified, partially_verified, unverified
    confidence: float
    source_citation: str
    evidence_snippet: str
    gating_action: str

class AgentStepTrace(BaseModel):
    step_id: int
    action: str
    description: str
    status: str = "pending"  # pending, in_progress, completed, verified, failed
    details: Optional[Dict[str, Any]] = None
    timestamp: str = ""

class AgentState(BaseModel):
    session_id: str
    user_prompt: str
    task_type: str = "general"
    model_routed: str = "Qwen2.5-7B"
    plan_steps: List[AgentStepTrace] = []
    events_log: List[PipelineStageEvent] = []
    claims_verification: List[VerificationClaim] = []
    current_step_index: int = 0
    rag_context: List[Dict[str, Any]] = []
    ocr_results: Optional[Dict[str, Any]] = None
    python_sandbox_result: Optional[Dict[str, Any]] = None
    verification_status: Dict[str, Any] = Field(default_factory=dict)
    deliverables: Dict[str, str] = Field(default_factory=dict)  # {"docx": path, "xlsx": path, "pptx": path}
    final_response: str = ""

