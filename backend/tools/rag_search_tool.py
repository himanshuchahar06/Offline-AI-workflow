from rag.vector_store import LocalVectorStore

class RAGSearchTool:
    """Tool wrapper for local confidential vector search."""

    def __init__(self, vector_store: LocalVectorStore):
        self.vector_store = vector_store

    def run(self, query: str) -> dict:
        results = self.vector_store.search(query, top_k=4)
        if not results:
            return {
                "status": "warning",
                "message": "No matching confidential documents found in local RAG vector store.",
                "results": []
            }
        return {
            "status": "success",
            "query": query,
            "match_count": len(results),
            "results": results
        }
