# 🏛️ Sovereign On-Premise Agentic AI Workbench Architecture

This document defines the end-to-end system architecture, security boundary, data flow, and verification gating engine for **ODIN — Sovereign On-Premise Agentic AI Workbench** (designed for confidential PSU & refinery environments such as MRPL / SIH 2026).

---

## 📐 End-to-End 9-Stage Agentic Pipeline

```
[ 👤 1. User Input ]
        │
        ▼
[ 🔐 2. Secure Workspace (Air-Gap Ingestion & Sanitization) ]
        │
        ▼
[ 🧠 3. Task Analyzer (Structured JSON Classification) ]
        │
        ▼
[ 🔀 4. Model Router (Table-Driven Local Model Selection) ]
        │
        ▼
[ 👁️ 5. Specialized Multimodal Model (Text / Vision / Code) ]
        │
        ▼
[ 📋 6. Agent Planner (Plan-Act-Observe-Verify Loop) ]
        │
        ▼
[ 🧰 7. Local Tools & Knowledge (Vector RAG + Python Sandbox) ]
        │
        ▼
[ ✅ 8. Verification & Claim Gating (Confidence & Citations) ]
        │
        ▼
[ 📁 9. Real Deliverable Synthesis (.docx, .xlsx, .pptx) ]
```

---

## 🚀 Detailed Pipeline Stages & Responsibilities

### Stage 1: 👤 User Input & Task Entry
- **Description:** Captures confidential user prompts and document attachments (PDF, DOCX, XLSX, Images, Audio).
- **Interface:** Drag-and-drop workspace UI with permanent air-gap status indicator.

### Stage 2: 🔐 Secure Workspace
- **Description:** Isolates incoming files in per-session workspace storage (`backend/workspaces/{session_id}/`), strips metadata, and enforces zero external internet access (`external_network_requests: 0`).
- **Trust Signal:** Verified on-premise execution with zero cloud leakage.

### Stage 3: 🧠 Task Analyzer
- **Description:** Classifies prompt intent into structured JSON task categories (`risk_analysis`, `inspection_audit`, `financial_synthesis`, `sop_compliance`, `multimodal_extraction`).
- **Output:** Structured sub-task breakdown for execution.

### Stage 4: 🔀 Model Router
- **Description:** Config-driven matrix that selects specialized local Ollama / GGUF models:
  - **Qwen2.5-7B-Instruct:** Complex text reasoning & risk analysis
  - **Qwen2.5-VL Multimodal:** Scanned drawings, P&ID visual diagrams & image OCR
  - **Qwen2.5-Coder-7B:** Python math sandbox & financial ratio modeling
  - **Rule-Based Compliance Auditor:** Verification & claim gating

### Stage 5: 👁️ Specialized Model Execution
- **Description:** Runs the selected local model against multimodal inputs (text, tables, image OCR).

### Stage 6: 📋 Agent Planner Loop
- **Description:** Generates an explicit 9-step execution plan and manages state transitions through a sequential event stream.

### Stage 7: 🧰 Local Tools & Knowledge RAG
- **Description:** Executes semantic vector search over local document chunks (`LocalVectorStore`) and executes mathematical formulas inside an isolated Python execution sandbox (`ScopedPythonSandbox`).

### Stage 8: ✅ Verification & Claim Gating
- **Description:** Audits every claim against retrieved vector passages and sandbox execution results.
- **Claim Statuses:**
  - `verified` (Green): Fully grounded with high confidence score and vector citation.
  - `partially_verified` (Amber): Partial evidence match requiring human review.
  - `unverified` (Red): Unverified assumptions gated and isolated in callout boxes.

### Stage 9: 📁 Real Deliverable Synthesis
- **Description:** Generates management-ready binary Office deliverables:
  - **Word Technical Report (`.docx`):** Formatted executive brief with evidence tables & safety recommendations.
  - **Excel Workbook (`.xlsx`):** Styled calculation sheet with formulas, tables, and financial metrics.
  - **PowerPoint Deck (`.pptx`):** 16:9 executive presentation slides with metric cards.

---

## 🔒 Security & Air-Gap Compliance Model

- **Zero External API Calls:** 100% of LLM reasoning, RAG vector embeddings, OCR parsing, and document synthesis runs locally on-premise.
- **Data Boundary:** Files never leave local session disk space.
- **Network Audit:** Audited by `VerificationEngine` with explicit `external_network_requests == 0` validation on every run.
