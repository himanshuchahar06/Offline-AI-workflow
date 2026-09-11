import math
import re
import json
from pathlib import Path
from config import UPLOADS_DIR

MEMORY_FILE = UPLOADS_DIR / "vector_memory.json"

class LocalVectorStore:
    """Persistent local air-gapped vector store & decision memory for confidential refinery knowledge bases."""

    def __init__(self):
        self.documents = []  # Stores dicts with {id, title, content, chunks, category}
        self.load_from_disk()

    def save_to_disk(self):
        """Persist vector store memory to local disk JSON file."""
        try:
            with open(MEMORY_FILE, "w", encoding="utf-8") as f:
                json.dump(self.documents, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Error saving vector memory to disk: {e}")

    def load_from_disk(self):
        """Load persistent vector store memory from local disk JSON file."""
        if MEMORY_FILE.exists():
            try:
                with open(MEMORY_FILE, "r", encoding="utf-8") as f:
                    self.documents = json.load(f)
                print(f"Loaded {len(self.documents)} documents from persistent vector memory ({MEMORY_FILE.name}).")
            except Exception as e:
                print(f"Error loading vector memory from disk: {e}")
                self.documents = []

    def add_document(self, doc_id: str, title: str, content: str, category: str = "General") -> int:
        words = re.findall(r'\w+', content.lower())
        chunks = []
        chunk_size = 80
        if words:
            for i in range(0, len(words), chunk_size):
                chunk_words = words[i:i + chunk_size]
                chunks.append(" ".join(chunk_words))
        
        if not chunks:
            chunks = [content if content.strip() else f"Document {doc_id} content indexed locally."]

        doc_entry = {
            "id": doc_id,
            "title": title,
            "content": content,
            "chunks": chunks,
            "category": category
        }

        # Update existing document if doc_id matches, else append
        existing_idx = next((i for i, d in enumerate(self.documents) if d["id"] == doc_id), None)
        if existing_idx is not None:
            self.documents[existing_idx] = doc_entry
        else:
            self.documents.append(doc_entry)

        # Persist memory to disk immediately
        self.save_to_disk()
        return len(chunks)

    def search(self, query: str, top_k: int = 6) -> list[dict]:
        if not self.documents:
            return []

        query_terms = set(re.findall(r'\w+', query.lower()))
        results = []

        for doc in self.documents:
            for idx, chunk in enumerate(doc["chunks"]):
                chunk_terms = set(re.findall(r'\w+', chunk.lower()))
                if not chunk_terms:
                    continue
                intersection = query_terms.intersection(chunk_terms)
                score = len(intersection) / (math.sqrt(len(query_terms)) * math.sqrt(len(chunk_terms)) + 1e-5)
                
                # Bonus for exact keyword matches
                for term in query_terms:
                    if len(term) > 3 and term in chunk.lower():
                        score += 0.15

                # Give high weight if document matches requested file name or recent user upload
                if doc["id"].lower() in query.lower() or doc["title"].lower() in query.lower():
                    score += 0.40

                if score > 0.05 or len(results) < top_k:
                    results.append({
                        "doc_id": doc["id"],
                        "title": doc["title"],
                        "category": doc["category"],
                        "chunk_index": idx,
                        "content": chunk,
                        "score": round(score, 4)
                    })

        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:top_k]

    def list_documents(self) -> list[dict]:
        return [
            {
                "id": d["id"],
                "title": d["title"],
                "category": d["category"],
                "chunk_count": len(d["chunks"]),
                "char_length": len(d["content"])
            }
            for d in self.documents
        ]
