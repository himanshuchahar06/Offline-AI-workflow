import unittest
from llm.local_reasoning_engine import LocalReasoningEngine
from agent.router import ModelAndToolRouter
from agent.verifier import VerificationEngine

class TestSovereignPipeline(unittest.TestCase):

    def test_task_analyzer_classification(self):
        """Test Task Analyzer classification logic into structured task types."""
        res1 = LocalReasoningEngine.analyze_request("Analyze top 5 risks in this hydrocracker vessel inspection report")
        self.assertIn(res1["task_type"], ["risk_analysis", "inspection_audit", "general"])
        self.assertIn("model_routed", res1)

        res2 = LocalReasoningEngine.analyze_request("Calculate balance sheet financial ratios and NPV cash flow")
        self.assertIn(res2["task_type"], ["financial_synthesis", "engineering_calculation", "general"])

        res3 = LocalReasoningEngine.analyze_request("Verify SOP compliance for catalyst loading procedure")
        self.assertIn(res3["task_type"], ["sop_compliance", "general"])

    def test_model_router_selection(self):
        """Test table-driven Model Router mapping for task types and execution steps."""
        # Step-based routing checks
        route_rag = ModelAndToolRouter.route_step("Local Tools & Knowledge RAG", "risk_analysis")
        self.assertEqual(route_rag["tool"], "local_vector_rag")
        self.assertIn("Qwen", route_rag["model"])

        route_ocr = ModelAndToolRouter.route_step("Multimodal Image OCR Parsing", "inspection_audit")
        self.assertEqual(route_ocr["tool"], "ocr_parser")
        self.assertIn("VL", route_ocr["model"])

        route_sandbox = ModelAndToolRouter.route_step("Run Python Sandbox Calculation", "financial_synthesis")
        self.assertEqual(route_sandbox["tool"], "python_sandbox")
        self.assertIn("Coder", route_sandbox["model"])

        route_verify = ModelAndToolRouter.route_step("Verification & Compliance Audit", "risk_analysis")
        self.assertEqual(route_verify["tool"], "verifier_engine")
        self.assertIn("Auditor", route_verify["model"])

    def test_verification_gating_logic(self):
        """Test Claim Verification and Gating engine logic."""
        sample_rag = [
            {"title": "MRPL_SOP_01.txt", "content": "Operating temperature limit is 415 deg C.", "chunk_index": 0}
        ]
        sample_sandbox = {"status": "success", "output": "Corrosion rate = 0.62 mm/yr"}

        claims = VerificationEngine.verify_claims(sample_rag, sample_sandbox)
        self.assertGreaterEqual(len(claims), 2)
        
        # Check claim statuses
        verified_claims = [c for c in claims if c["status"] == "verified"]
        unverified_claims = [c for c in claims if c["status"] == "unverified"]

        self.assertGreaterEqual(len(verified_claims), 1)
        self.assertGreaterEqual(len(unverified_claims), 1)
        self.assertEqual(unverified_claims[0]["gating_action"], "FLAG_WITH_RED_CALLOUT")

        # Test full execution verification
        mock_state = {
            "rag_context": sample_rag,
            "python_sandbox_result": sample_sandbox,
            "deliverables": {}
        }
        audit = VerificationEngine.verify_agent_execution(mock_state)
        self.assertIn("status", audit)
        self.assertIn("airgap_audit", audit)
        self.assertEqual(audit["airgap_audit"]["external_network_requests"], 0)

    def test_sandbox_escape_blocked(self):
        """Test ScopedPythonSandbox blocks unpermitted host filesystem / OS module imports."""
        from tools.python_sandbox import ScopedPythonSandbox
        
        malicious_code = "import os; files = os.listdir('.')"
        res = ScopedPythonSandbox.execute(malicious_code)
        self.assertEqual(res["status"], "error")
        self.assertTrue("ImportError" in res["error"] or "NameError" in res["error"] or "__import__" in res.get("traceback", ""))

        malicious_file_read = "f = open('config.py', 'r'); text = f.read()"
        res2 = ScopedPythonSandbox.execute(malicious_file_read)
        self.assertEqual(res2["status"], "error")
        self.assertIn("NameError", res2["error"] + res2.get("traceback", ""))

if __name__ == "__main__":
    unittest.main()
