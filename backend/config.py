import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "sample_data"
UPLOADS_DIR = BASE_DIR / "uploads"
DELIVERABLES_DIR = BASE_DIR / "deliverables"

DATA_DIR.mkdir(exist_ok=True)
UPLOADS_DIR.mkdir(exist_ok=True)
DELIVERABLES_DIR.mkdir(exist_ok=True)

# Air-gap settings
AIR_GAPPED_MODE = True
ALLOW_EXTERNAL_CALLS = False

# Local inference settings (Ollama / vLLM API endpoint)
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
DEFAULT_MODEL = os.getenv("DEFAULT_MODEL", "qwen2.5-coder:7b")

# PSU / Organization Details
ORGANIZATION_NAME = "MRPL — Mangalore Refinery and Petrochemicals Limited"
TEAM_NAME = "Zero Latency"
TEAM_ID = "934567100"
PROBLEM_STATEMENT = "SIH26117 — Sovereign On-Premise Agentic AI Workbench"
