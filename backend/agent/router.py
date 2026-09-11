class ModelAndToolRouter:
    """Table-driven router mapping task types and execution steps to specialized local models and tools."""

    ROUTING_TABLE = {
        "risk_analysis": {
            "model": "Qwen2.5-7B-Instruct",
            "tool": "local_vector_rag",
            "reason": "Routed to Qwen2.5-7B-Instruct for industrial risk assessment & evidence synthesis"
        },
        "financial_synthesis": {
            "model": "Qwen2.5-Coder-7B",
            "tool": "python_sandbox",
            "reason": "Routed to Qwen2.5-Coder-7B for financial ratio calculations & balance sheet formulas"
        },
        "inspection_audit": {
            "model": "Qwen2.5-VL Multimodal",
            "tool": "ocr_parser",
            "reason": "Routed to Qwen2.5-VL for P&ID diagram parsing & NDT sensor report extraction"
        },
        "sop_compliance": {
            "model": "Qwen2.5-7B-Instruct",
            "tool": "local_vector_rag",
            "reason": "Routed to Qwen2.5-7B-Instruct for SOP compliance rule matching & vector search"
        },
        "multimodal_extraction": {
            "model": "Qwen2.5-VL Multimodal",
            "tool": "ocr_parser",
            "reason": "Routed to Qwen2.5-VL for chart, image, and scanned document OCR parsing"
        },
        "general": {
            "model": "Qwen2.5-7B-Instruct",
            "tool": "general_llm",
            "reason": "Routed to Qwen2.5-7B-Instruct for general technical reasoning"
        }
    }

    @staticmethod
    def get_task_model(task_type: str) -> dict:
        return ModelAndToolRouter.ROUTING_TABLE.get(
            task_type.lower(), 
            ModelAndToolRouter.ROUTING_TABLE["general"]
        )

    @staticmethod
    def route_step(step_action: str, task_type: str) -> dict:
        action_lower = step_action.lower()
        if "rag" in action_lower or "knowledge" in action_lower:
            return {
                "tool": "local_vector_rag",
                "model": "Qwen2.5-7B (Embedding & Retrieval)",
                "action": "vector_search",
                "reason": "Routed to Qwen2.5-7B Vector Embeddings for semantic RAG search"
            }
        elif "ocr" in action_lower or "multimodal" in action_lower or "image" in action_lower:
            return {
                "tool": "ocr_parser",
                "model": "Qwen2.5-VL Multimodal VLM",
                "action": "image_ocr",
                "reason": "Routed to Qwen2.5-VL Multimodal for image OCR & visual chart analysis"
            }
        elif "sandbox" in action_lower or "code" in action_lower or "calculation" in action_lower:
            return {
                "tool": "python_sandbox",
                "model": "Qwen2.5-Coder-7B",
                "action": "execute_python",
                "reason": "Routed to Scoped Python Sandbox for math & engineering formula execution"
            }
        elif "verification" in action_lower or "claim" in action_lower:
            return {
                "tool": "verifier_engine",
                "model": "Rule-Based Compliance Auditor",
                "action": "verify",
                "reason": "Routed to On-Premise Compliance Auditor for claim verification & gating"
            }
        elif "deliverable" in action_lower or "report" in action_lower:
            return {
                "tool": "office_doc_builders",
                "model": "Office Deliverable Builder Engine",
                "action": "build_docs",
                "reason": "Routed to Office Document Builder Engine for Word, Excel, and PowerPoint generation"
            }
        else:
            default_route = ModelAndToolRouter.get_task_model(task_type)
            return {
                "tool": default_route["tool"],
                "model": default_route["model"],
                "action": "general_reasoning",
                "reason": default_route["reason"]
            }

