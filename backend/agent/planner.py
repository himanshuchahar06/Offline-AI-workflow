from llm.local_reasoning_engine import LocalReasoningEngine
from agent.state import AgentState, AgentStepTrace

class AgentPlanner:
    """Deconstructs user prompt into a structured Plan-Act-Observe-Verify execution sequence."""

    @staticmethod
    def create_plan(session_id: str, prompt: str) -> AgentState:
        analysis = LocalReasoningEngine.analyze_request(prompt)
        
        steps = []
        for step_info in analysis["plan_steps"]:
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
