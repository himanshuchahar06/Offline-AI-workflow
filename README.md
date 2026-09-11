<div align="center">

# 🛡️ SOVEREIGN ON-PREMISE AGENTIC AI WORKBENCH
### *Air-Gapped Multimodal AI Workbench for Confidential Industrial & PSU Work*

[![SIH 2026](https://img.shields.io/badge/SIH-2026-orange.svg?style=for-the-badge&logo=hackerearth)](https://sih.gov.in)
[![Organization](https://img.shields.io/badge/Organization-MRPL-blue.svg?style=for-the-badge)](https://mrpl.co.in)
[![Security](https://img.shields.io/badge/Air--Gap-100%25%20Offline-success.style=for-the-badge&logo=shield)](https://github.com/himanshuchahar06/Offline-AI-workflow)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688.svg?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js%2014-black.svg?style=for-the-badge&logo=next.js)](https://nextjs.org)

**Problem Statement ID:** SIH26117 | **Theme:** Smart Automation  
**Organization:** MRPL — Mangalore Refinery and Petrochemicals Limited  
**Team Name:** Zero Latency | **Team ID:** 934567100  

*“Enterprise-grade AI assistance — without enterprise data leaving the premises.”*

---

[🚀 Quickstart](#-quickstart--local-launch) • [🏛 Architecture](#-technical-architecture) • [🧪 Benchmark Test](#-sih-benchmark-test-case) • [📊 Deliverables](#-deliverables-generated) • [🛡️ Air-Gap Audit](#-air-gap-security-compliance)

</div>

---

## 📌 Table of Contents
- [Executive Overview](#-executive-overview)
- [Why Existing Approaches Fall Short](#-why-existing-approaches-fall-short)
- [Key Features](#-key-features)
- [Technical Architecture](#-technical-architecture)
- [Tech Stack](#-tech-stack)
- [Quickstart & Local Launch](#-quickstart--local-launch)
  - [Method 1: 1-Click Launch in VS Code](#method-1-1-click-launch-in-vs-code-recommended)
  - [Method 2: Manual Terminal Launch](#method-2-manual-terminal-launch)
  - [Method 3: Single PowerShell Command](#method-3-single-powershell-command)
  - [Method 4: Docker Compose Stack](#method-4-docker-compose-stack)
- [SIH Benchmark Test Case](#-sih-benchmark-test-case)
- [Deliverables Generated](#-deliverables-generated)
- [Air-Gap Security Compliance](#-air-gap-security-compliance)
- [Directory Structure](#-repository-structure)
- [Team Information](#-team-information)

---

## 📖 Executive Overview

Refinery and PSU knowledge work at Mangalore Refinery & Petrochemicals Limited (MRPL) handles highly sensitive, classified material:
- **Piping & Instrumentation Diagrams (P&IDs)**
- **Equipment Inspection & Ultrasonic Thickness (UT) Reports**
- **Standard Operating Procedures (SOPs) & Safe Operating Windows (SOW)**
- **Engineering Calculation Sheets & Fluid Dynamics**
- **Confidential Vendor Negotiations & Procurement Quotes**

Public cloud AI solutions risk severe data leakage and breach regulatory boundaries. **Sovereign On-Premise Agentic AI Workbench** solves this dilemma by operating a **100% Air-Gapped Local Pipeline** with **Zero External AI / API Calls**, delivering modern **Plan → Act → Observe → Verify → Deliver** capabilities right inside the enterprise security boundary.

---

## ⚠️ Why Existing Approaches Fall Short

| Approach | Major Shortcoming |
| :--- | :--- |
| **Public Cloud AI** | Sensitive enterprise data leaves organizational boundaries. |
| **Simple Local Chatbots** | Text-only, single-model — cannot execute complex engineering calculations or generate Office deliverables. |
| **Traditional Doc Management** | Stores files but cannot reason, execute code, verify safety limits, or synthesize deliverables. |
| **Manual Workflow** | Slow, error-prone, and difficult to scale across plant operations. |
| **OUR WORKBENCH** | **Understands → Acts → Verifies → Delivers (100% Air-Gapped)** |

---

## 🔥 Key Features

- 🛡️ **100% Air-Gapped Security**: Zero external network calls (`external_requests = 0`). Data never leaves your premises.
- ⚡ **Automated Upload Trigger & Analysis**: Drag & drop any PDF, DOCX, CSV, or P&ID image — the workbench automatically parses, indexes, and triggers AI agent analysis immediately.
- 🔍 **Deep Uploaded Chunk Inspector**: View exact extracted text passages, relevance scores, extracted numbers, and equipment tags per chunk.
- 🤖 **Model & Tool Router**: Intelligent task router directing tasks to specialized local models (`Qwen2.5-Coder`, `Mistral-7B`, `Qwen-VL`).
- 🧪 **Scoped Python Execution Sandbox**: Executes engineering formulas (corrosion rate, ASME $t_{\min}$, Darcy-Weisbach pressure drop) safely in isolated python runtime.
- 📋 **Verification & Safety Audit Matrix**: Rule-based auditor checking safety limits, syntax, and document integrity.
- 📄 **Real Office Deliverable Generators**: Native generation of formatted Word (`.docx`), Excel (`.xlsx`), and PowerPoint (`.pptx`) deliverables.

---

## 🏛 Technical Architecture

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

---

## 💻 Tech Stack

- **Frontend**: Next.js 14, React 19, Tailwind CSS, Lucide React Icons
- **Backend**: Python 3.14, FastAPI, Uvicorn, Pydantic v2
- **RAG & Vector Search**: Local Vector Store (`LocalVectorStore`), PyPDF, Document Chunking Engine
- **OCR Engine**: PyTesseract / PIL local image parser
- **Code Execution**: Scoped Python Execution Sandbox (`ScopedPythonSandbox`)
- **Local AI Inference**: Ollama / vLLM integration + Autonomous Local CPU Fallback Engine
- **Deliverable Generators**: `python-docx`, `openpyxl`, `python-pptx`

---

## 🚀 Quickstart & Local Launch

### Prerequisites
- Python 3.10+
- Node.js v18+

---

### Method 1: 1-Click Launch in VS Code (Recommended)
1. Open VS Code in the project root directory.
2. Press `Ctrl + Shift + P` (or `F1`).
3. Type **`Tasks: Run Task`** and select **`🚀 Start Full Sovereign AI Workbench (Both)`**.

---

### Method 2: Manual Terminal Launch

#### Terminal 1 — Start FastAPI Backend:
```bash
cd backend
python main.py
```
*(Backend runs at `http://localhost:8000`)*

#### Terminal 2 — Start Next.js Frontend:
```bash
cd frontend
npm run dev
```
*(Frontend runs at `http://localhost:3000`)*

---

### Method 3: Automated Testing & Verification

#### Automated End-to-End Smoke Test:
```bash
cd backend
python tests/smoke_test.py
```

#### Run Pipeline Unit Tests:
```bash
cd backend
python -m unittest tests/test_pipeline.py
```

---

### Method 4: Docker Compose Stack

```bash
docker-compose up --build -d
```

---

## 🧪 SIH Benchmark Test Case

### Test Prompt:
> *“You are operating inside a sovereign, air-gapped AI environment. Analyze the provided confidential report and answer the following business question: 'What are the three most significant risks identified in this report, what evidence supports each risk, and what actions should management take?' Work only with the provided document and locally available knowledge. Assign confidence levels and provide a verification summary at the end.”*

### Benchmark Results:
- **Task Category**: `RISK_ANALYSIS`
- **Model Router**: `Qwen2.5-7B-Instruct + Specialized Risk Auditor`
- **Grounded Chunks**: 6 Vector Passages Analyzed
- **Python Calculations**: Corrosion Rate $0.62\text{ mm/yr}$, Safe Life $1.77\text{ Yrs}$
- **Air-Gap Verification**: **0 External Requests (PASSED)**
- **Deliverables Emitted**: Word (`.docx`), Excel (`.xlsx`), PowerPoint (`.pptx`)

---

## 📊 Deliverables Generated

The workbench outputs real, downloadable binary Office files:
- 📄 **Word Technical Report (`.docx`)**: Formatted inspection memo with executive summary, tables, and safety recommendations.
- 📊 **Excel Workbook (`.xlsx`)**: Styled calculation sheet with formulas, numbers, and summary totals.
- 📽️ **PowerPoint Presentation (`.pptx`)**: 16:9 executive slide deck formatted with operational takeaways and metric cards.

---

## 🛡️ Air-Gap Security Compliance

```text
[AIR-GAP SECURITY AUDIT]
Status: 100% SECURE & AIR-GAPPED
Cloud Data Leakage: 0 BYTES
External API / Network Requests: 0
Local Vector Store Grounding: ON-PREMISE ONLY
Data Boundary: INSIDE ENTERPRISE PERIMETER
```

---

## 📁 Repository Structure

```
sovereign-ai-workbench/
├── backend/
│   ├── main.py                     # FastAPI app entry point & routes
│   ├── config.py                   # Air-gap settings, model routing config
│   ├── agent/                      # Plan-Act-Observe-Verify agentic loop
│   │   ├── state.py
│   │   ├── planner.py
│   │   ├── router.py
│   │   ├── execution_loop.py
│   │   └── verifier.py
│   ├── llm/                        # Local inference & CPU fallback engine
│   ├── rag/                        # On-premise vector store & OCR parser
│   ├── tools/                      # Scoped python sandbox & doc generators
│   │   └── doc_generators/        # docx, xlsx, pptx builders
│   └── sample_data/                # Preloaded MRPL SOPs & inspection reports
├── frontend/                       # Next.js 14 User Workspace App
│   ├── app/                        # Main dashboard & layout
│   └── components/                 # Header, Chat, Reasoning Trace, Deliverables Vault
├── .vscode/                        # VS Code 1-click launch tasks
├── docker-compose.yml              # Single-command docker composition
├── Dockerfile.backend              # Backend Docker container
├── Dockerfile.frontend             # Frontend Docker container
└── README.md                       # Project documentation
```

---

## 👥 Team Information

- **Smart India Hackathon:** SIH 2026
- **Problem Statement:** SIH26117 (MRPL — Mangalore Refinery and Petrochemicals Limited)
- **Team Name:** Zero Latency
- **Team ID:** 934567100
- **Repository Link:** [https://github.com/himanshuchahar06/Offline-AI-workflow](https://github.com/himanshuchahar06/Offline-AI-workflow)
