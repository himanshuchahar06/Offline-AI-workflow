# Sovereign On-Premise Agentic AI Workbench (SIH 2026)

**SIH Problem Statement ID:** SIH26117  
**Organization:** MRPL — Mangalore Refinery and Petrochemicals Limited  
**Theme:** Smart Automation  
**Team Name:** Zero Latency  
**Team ID:** 934567100  

> *“Enterprise-grade AI assistance — without enterprise data leaving the premises.”*

---

## Overview

Refinery and PSU knowledge work (MRPL) spans highly sensitive materials:
- Piping & Instrumentation Diagrams (P&IDs)
- Equipment Inspection & Ultrasonic Thickness (UT) Reports
- Standard Operating Procedures (SOPs) & Safe Operating Windows
- Engineering Calculation Sheets & Fluid Dynamics
- Confidential Vendor Negotiations & Procurement Quotes

Public cloud AI solutions risk severe data leakage. **Sovereign On-Premise Agentic AI Workbench** solves this dilemma by running a **100% Air-Gapped Local Pipeline** with **Zero External AI / API Calls**, delivering modern **Plan → Act → Observe → Verify → Deliver** capabilities right inside the enterprise security perimeter.

---

## Key Architecture & Core Capabilities

```
+---------------------------------------------------------------------------------------------------+
|                                 AIR-GAPPED SOVEREIGN ZONE                                         |
|                                                                                                   |
|  +--------------------+       +----------------------+       +---------------------------------+  |
|  |     USER           | ----> |  SECURE WORKSPACE    | ----> |  UNDERSTAND & PLAN ENGINE       |  |
|  |  (Refinery Eng.)   |       |  (Next.js UI)        |       |  (Task Decomposition Loop)      |  |
|  +--------------------+       +----------------------+       +---------------------------------+  |
|                                                                              |                    |
|                                                                              v                    |
|  +--------------------+       +----------------------+       +---------------------------------+  |
|  | REAL DELIVERABLES  | <---- |  VERIFY & COMPLIANCE | <---- |  MODEL & TOOL ROUTER            |  |
|  | .DOCX .XLSX .PPTX  |       |  (Quality & Safety)  |       |  (LLM / Code / OCR / RAG)       |  |
|  +--------------------+       +----------------------+       +---------------------------------+  |
|                                                                              |                    |
|                                                                              v                    |
|                                                              +---------------------------------+  |
|                                                              |  LOCAL TOOLS & AGENTS           |  |
|                                                              |  - Local Vector RAG             |  |
|                                                              |  - OCR & Image Parser           |  |
|                                                              |  - Scoped Python Sandbox        |  |
|                                                              |  - Office Doc Generators        |  |
|                                                              +---------------------------------+  |
+---------------------------------------------------------------------------------------------------+
```

1. **Air-Gapped Sovereign Enforcement**: Zero cloud network calls. Continuous audit counter verifies `external_requests = 0`.
2. **Model + Tool Router**: Routes tasks to local specialized models (`Qwen2.5-Coder`, `Mistral-7B`, `Qwen-VL`) via Ollama/vLLM or autonomous CPU fallback.
3. **Local Vector RAG & OCR Engine**: Parses scanned P&ID drawings and inspection PDFs into vector indices.
4. **Scoped Python Execution Sandbox**: Executes engineering formulas (ASME t_min, Darcy-Weisbach pressure drop, corrosion rates) safely.
5. **Verification & Safety Audit Engine**: Validates safety thresholds (e.g. remaining corrosion allowance < turnaround interval).
6. **Real Office Deliverable Generators**: Native binary export of `.docx` Word technical reports, `.xlsx` Excel calculation workbooks, and `.pptx` PowerPoint slide decks.

---

## Quickstart & Local Installation

### Prerequisites
- Python 3.10+
- Node.js v18+
- (Optional) Ollama with `qwen2.5-coder:7b` for local GPU acceleration

### 1. Start Python FastAPI Backend
```bash
cd backend
python -m pip install -r requirements.txt
python main.py
```
*Backend runs on `http://localhost:8000`*

### 2. Start Next.js User Workspace UI
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`*

---

## One-Command Docker Deployment

```bash
docker-compose up --build -d
```

---

## Deliverables Generated

- **Word Technical Report (`.docx`)**: Formatted technical audit with executive summary, tables, and safety recommendations.
- **Excel Calculation Workbook (`.xlsx`)**: Styled spreadsheets with calculated formulas, numbers, and summary totals.
- **PowerPoint Presentation (`.pptx`)**: 16:9 executive deck formatted with operational takeaways and key metric cards.
