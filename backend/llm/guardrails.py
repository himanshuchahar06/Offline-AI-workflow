import re
import json

STRUCTURED_JSON_SYSTEM_PROMPT = (
    "Return ONLY raw valid JSON matching the specified schema. "
    "Do NOT include conversational preambles, greetings, explanations, disclaimers, "
    "meta-commentary, markdown code fences, or sign-offs."
)

def strip_conversational_filler(text: str) -> str:
    """Strips conversational preambles, AI meta-commentary, and disclaimers from model text."""
    if not text:
        return ""

    # Remove common conversational prefixes
    patterns_to_strip = [
        r"^(?:sure|certainly|here is|here's|i've analyzed|i have analyzed|as an ai|as an ai model|let me know if|hope this helps)[^\n:]*[:\n]?",
        r"^(?:in summary,|overall,|based on my analysis,|i recommend that)[ ]?",
        r"(?:let me know if you need anything else|hope this helps|feel free to ask)[.\!\n]?"
    ]
    
    cleaned = text.strip()
    for pattern in patterns_to_strip:
        cleaned = re.sub(pattern, "", cleaned, flags=re.IGNORECASE).strip()

    return cleaned

def clean_json_output(raw_output: str) -> dict:
    """Post-validates model outputs by stripping leading/trailing prose or code blocks before JSON parsing."""
    if not raw_output:
        return {}

    text = raw_output.strip()

    # Strip markdown code fences ```json ... ``` or ``` ... ```
    text = re.sub(r"^```(?:json)?\s*", "", text, flags=re.IGNORECASE)
    text = re.sub(r"\s*```$", "", text)
    text = text.strip()

    # Extract JSON object or array substring if surrounded by prose
    json_match = re.search(r"(\{.*\}|\[.*\])", text, flags=re.DOTALL)
    if json_match:
        text = json_match.group(1).strip()

    try:
        return json.loads(text)
    except Exception:
        return {}
