from rag.ocr_engine import OCREngine

class OCRTool:
    """Tool wrapper for OCR on engineering drawings and scanned inspection reports."""

    @staticmethod
    def run(file_path: str) -> dict:
        return OCREngine.extract_text_from_image(file_path)
