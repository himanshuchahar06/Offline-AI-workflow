import requests
from config import OLLAMA_BASE_URL, DEFAULT_MODEL

class OllamaClient:
    """Client for local Ollama / vLLM inference server."""

    @staticmethod
    def is_available() -> bool:
        try:
            r = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=1.5)
            return r.status_code == 200
        except Exception:
            return False

    @staticmethod
    def generate(prompt: str, system_prompt: str = "", model: str = DEFAULT_MODEL) -> str:
        try:
            payload = {
                "model": model,
                "prompt": prompt,
                "system": system_prompt,
                "stream": False
            }
            r = requests.post(f"{OLLAMA_BASE_URL}/api/generate", json=payload, timeout=30.0)
            if r.status_code == 200:
                return r.json().get("response", "")
            return ""
        except Exception as e:
            return ""
