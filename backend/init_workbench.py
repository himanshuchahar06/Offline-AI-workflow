import os
import sys
from pathlib import Path

# Add backend root to path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

from config import DATA_DIR, UPLOADS_DIR, DELIVERABLES_DIR
from audit import AuditLogger
from rag.vector_store import LocalVectorStore
from rag.document_loader import DocumentLoader

def initialize_environment():
    print("=" * 70)
    print("🛠️ SOVEREIGN ON-PREMISE WORKBENCH INITIALIZATION")
    print("=" * 70)

    # 1. Create required storage directories
    for directory in [DATA_DIR, UPLOADS_DIR, DELIVERABLES_DIR]:
        directory.mkdir(exist_ok=True)
        print(f"[+] Directory verified: {directory.relative_to(backend_dir.parent)}")

    # 2. Initialize Audit Log Genesis Block
    integrity = AuditLogger.verify_integrity()
    if integrity["status"] == "VALID" and integrity["entries_verified"] == 0:
        AuditLogger.log_action(
            actor="SYSTEM_INIT",
            role="ADMIN",
            action="WORKBENCH_INITIALIZED",
            metadata={"status": "100% On-Premise Air-Gapped Zero Data Leakage"}
        )
        print("[+] Cryptographic Hash-Chained Audit Log initialized with Genesis Block.")
    else:
        print(f"[+] Audit Log verified: {integrity['entries_verified']} entries (Status: {integrity['status']})")

    # 3. Populate RAG Vector Store with sample refinery documents
    vector_store = LocalVectorStore()
    sample_files = list(DATA_DIR.glob("*.*"))
    for file_path in sample_files:
        try:
            content = DocumentLoader.load_file(str(file_path))
            vector_store.add_document(
                doc_id=file_path.name,
                title=file_path.stem.replace("_", " ").title(),
                content=content,
                category="Refinery Specs"
            )
        except Exception as e:
            print(f"[!] Error indexing sample file {file_path.name}: {e}")

    print(f"[+] Vector memory initialized with {len(vector_store.documents)} active documents.")
    print("=" * 70)
    print("✅ WORKBENCH INITIALIZATION COMPLETED SUCCESSFULLY!")
    print("=" * 70)

if __name__ == "__main__":
    initialize_environment()
