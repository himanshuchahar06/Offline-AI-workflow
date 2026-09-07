class ModelAndToolRouter:
    """Routes execution tasks to specialized local models (LLM, VLM, Code Model) and tools."""

    @staticmethod
    def route_step(step_action: str, task_type: str) -> dict:
        if "RAG" in step_action:
            return {"tool": "local_vector_rag", "model": "Qwen2.5-7B (Embedding & Retrieval)", "action": "vector_search"}
        elif "OCR" in step_action or "Extraction" in step_action:
            return {"tool": "ocr_parser", "model": "Qwen2.5-VL Multimodal VLM", "action": "image_ocr"}
        elif "Sandbox" in step_action or "Code" in step_action:
            return {"tool": "python_sandbox", "model": "Qwen2.5-Coder-7B", "action": "execute_python"}
        elif "Verification" in step_action:
            return {"tool": "verifier_engine", "model": "Rule-Based Compliance Auditor", "action": "verify"}
        elif "Deliverable" in step_action:
            return {"tool": "office_doc_builders", "model": "Document Synthesis Engine", "action": "build_docs"}
        else:
            return {"tool": "general_llm", "model": "Qwen2.5-7B-Instruct", "action": "general_reasoning"}
