import os
import json
import time
import hashlib
from pathlib import Path
from typing import List, Dict, Any, Optional

AUDIT_LOG_FILE = Path(__file__).parent / "deliverables" / "audit_log.json"

class AuditLogEntry:
    def __init__(self, index: int, timestamp: str, actor: str, role: str, action: str, metadata: dict, previous_hash: str):
        self.index = index
        self.timestamp = timestamp
        self.actor = actor
        self.role = role
        self.action = action
        self.metadata = metadata
        self.previous_hash = previous_hash
        self.hash = self.calculate_hash()

    def calculate_hash(self) -> str:
        payload = f"{self.index}|{self.timestamp}|{self.actor}|{self.role}|{self.action}|{json.dumps(self.metadata, sort_keys=True)}|{self.previous_hash}"
        return hashlib.sha256(payload.encode("utf-8")).hexdigest()

    def to_dict(self) -> dict:
        return {
            "index": self.index,
            "timestamp": self.timestamp,
            "actor": self.actor,
            "role": self.role,
            "action": self.action,
            "metadata": self.metadata,
            "previous_hash": self.previous_hash,
            "hash": self.hash
        }

class AuditLogger:
    """Tamper-evident, hash-chained cryptographic audit logger for air-gapped operations."""

    @staticmethod
    def _load_log() -> List[dict]:
        if not AUDIT_LOG_FILE.exists():
            return []
        try:
            return json.loads(AUDIT_LOG_FILE.read_text(encoding="utf-8"))
        except Exception:
            return []

    @staticmethod
    def _save_log(entries: List[dict]):
        AUDIT_LOG_FILE.parent.mkdir(exist_ok=True)
        AUDIT_LOG_FILE.write_text(json.dumps(entries, indent=2), encoding="utf-8")

    @staticmethod
    def log_action(actor: str, role: str, action: str, metadata: Optional[dict] = None) -> dict:
        entries = AuditLogger._load_log()
        index = len(entries) + 1
        timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        previous_hash = entries[-1]["hash"] if entries else "GENESIS_SOVEREIGN_HASH_00000000000000000000000000000000"

        entry = AuditLogEntry(
            index=index,
            timestamp=timestamp,
            actor=actor,
            role=role,
            action=action,
            metadata=metadata or {},
            previous_hash=previous_hash
        )

        entry_dict = entry.to_dict()
        entries.append(entry_dict)
        AuditLogger._save_log(entries)
        return entry_dict

    @staticmethod
    def verify_integrity() -> dict:
        entries = AuditLogger._load_log()
        if not entries:
            return {"status": "VALID", "entries_verified": 0, "corrupted_index": None}

        expected_prev_hash = "GENESIS_SOVEREIGN_HASH_00000000000000000000000000000000"
        for idx, entry_dict in enumerate(entries):
            # Check previous hash chain continuity
            if entry_dict.get("previous_hash") != expected_prev_hash:
                return {
                    "status": "TAMPERED",
                    "reason": "Hash chain continuity broken",
                    "corrupted_index": entry_dict.get("index"),
                    "entries_verified": idx
                }

            # Recalculate entry hash
            e = AuditLogEntry(
                index=entry_dict["index"],
                timestamp=entry_dict["timestamp"],
                actor=entry_dict["actor"],
                role=entry_dict["role"],
                action=entry_dict["action"],
                metadata=entry_dict["metadata"],
                previous_hash=entry_dict["previous_hash"]
            )

            if e.calculate_hash() != entry_dict["hash"]:
                return {
                    "status": "TAMPERED",
                    "reason": f"Entry #{entry_dict['index']} payload hash mismatch",
                    "corrupted_index": entry_dict.get("index"),
                    "entries_verified": idx
                }

            expected_prev_hash = entry_dict["hash"]

        return {
            "status": "VALID",
            "entries_verified": len(entries),
            "corrupted_index": None,
            "latest_hash": expected_prev_hash
        }
