export interface PipelineStageEvent {
  session_id: string;
  stage_id: number;
  stage_name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'verified' | 'finished' | 'failed';
  input_summary: string;
  output_summary: string;
  timing_ms: number;
  confidence: number;
  model_routed: string;
  details: Record<string, any>;
  timestamp: string;
}

export interface VerificationClaim {
  claim_id: string;
  claim: string;
  status: 'verified' | 'partially_verified' | 'unverified';
  confidence: number;
  source_citation: string;
  evidence_snippet: string;
  gating_action: string;
}

export interface AgentStepTrace {
  step_id: number;
  action: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'verified' | 'failed';
  details?: Record<string, any>;
  timestamp?: string;
}

export interface VerificationCheck {
  name: string;
  passed: boolean;
  detail: string;
}

export interface VerificationStatus {
  status: 'PASSED' | 'FAILED';
  passed_checks_count: number;
  total_checks_count: number;
  checks: VerificationCheck[];
  claims?: VerificationClaim[];
  warnings?: string[];
  red_flags?: string[];
  airgap_audit?: {
    external_network_requests: number;
    data_boundary: string;
    cloud_leakage: string;
  };
}

export interface DeliverablesMap {
  docx?: string;
  xlsx?: string;
  pptx?: string;
}

export interface AgentResponseData {
  status: string;
  session_id: string;
  task_type: string;
  model_routed: string;
  plan_steps: AgentStepTrace[];
  final_response: string;
  verification_status: VerificationStatus;
  deliverables: DeliverablesMap;
  rag_context?: any[];
  python_sandbox_result?: any;
}
