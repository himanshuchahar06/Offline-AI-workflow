import math
import re

class LocalVectorStore:
    """Local, air-gapped vector store and retriever for confidential refinery knowledge bases."""

    def __init__(self):
        self.documents = []  # Stores dicts with {id, title, content, chunks, category}

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
        self.documents.append(doc_entry)
        return len(chunks)

    def search(self, query: str, top_k: int = 4) -> list[dict]:
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
                
                # Bonus for exact keyword matches like P&ID, SOP, Hydrocracker, Corrosion
                for term in query_terms:
                    if len(term) > 3 and term in chunk.lower():
                        score += 0.15

                if score > 0.05:
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
