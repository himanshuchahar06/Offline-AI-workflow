<div align="center">

# 🛡️ SOVEREIGN ON-PREMISE AGENTIC AI WORKBENCH
### *Air-Gapped Multimodal AI Workbench for Confidential Industrial & PSU Work*

[![SIH 2026](https://img.shields.io/badge/SIH-2026-orange.svg?style=for-the-badge&logo=hackerearth)](https://sih.gov.in)
[![Organization](https://img.shields.io/badge/Organization-MRPL-blue.svg?style=for-the-badge)](https://mrpl.co.in)
[![Security](https://img.shields.io/badge/Air--Gap-100%25%20Offline-success.style=for-the-badge&logo=shield)](https://github.com/himanshuchahar06/Offline-AI-workflow)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688.svg?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js%2014-black.svg?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**Problem Statement ID:** SIH26117 | **Theme:** Smart Automation  
**Organization:** MRPL — Mangalore Refinery and Petrochemicals Limited  
**Team Name:** Zero Latency | **Team ID:** 934567100  

*“Enterprise-grade AI assistance — without enterprise data leaving the premises.”*

---

[🚀 Quickstart](#-quickstart--local-launch) • [🏛 Architecture](#-technical-architecture) • [🔐 RBAC & Auditability](#-rbac--cryptographic-auditability) • [🧪 Benchmark Test](#-sih-benchmark-test-case) • [📊 Deliverables](#-deliverables-generated) • [🛡️ Air-Gap Audit](#-air-gap-security-compliance) • [📜 Governance & Compliance](#-governance--compliance)

</div>

---

## 📌 Table of Contents
- [Executive Overview](#-executive-overview)
- [Why Existing Approaches Fall Short](#-why-existing-approaches-fall-short)
- [Key Features](#-key-features)
- [Technical Architecture](#-technical-architecture)
- [Tech Stack](#-tech-stack)
- [Role-Based Access Control & Cryptographic Auditability](#-rbac--cryptographic-auditability)
- [Quickstart & Local Launch](#-quickstart--local-launch)
  - [Method 1: Native Launcher Scripts (Linux/macOS bash & Windows PowerShell)](#method-1-native-launcher-scripts)
  - [Method 2: 1-Click Launch in VS Code](#method-2-1-click-launch-in-vs-code-recommended)
  - [Method 3: Manual Terminal Launch](#method-3-manual-terminal-launch)
  - [Method 4: Docker Compose Stack (CPU & GPU)](#method-4-docker-compose-stack-cpu--gpu)
- [Continuous Integration & Testing](#-continuous-integration--testing)
- [SIH Benchmark Test Case](#-sih-benchmark-test-case)
- [Deliverables Generated](#-deliverables-generated)
- [Air-Gap Security Compliance](#-air-gap-security-compliance)
- [Governance & Compliance Documents](#-governance--compliance)
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
- 🔑 **Role-Based Access Control (RBAC)**: Fine-grained permissions for `ADMIN`, `ENGINEER`, and `AUDITOR` roles with JWT authentication.
- ⛓️ **Tamper-Evident SHA-256 Audit Trail**: Hash-chained audit logging ensuring non-repudiation and cryptographic integrity verification (`/api/audit/log`, `/api/audit/verify`).
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
|                                                              |  - Cryptographic Audit Engine   |  |
|                                                              |  - Office Doc Generators        |  |
|                                                              +---------------------------------+  |
+---------------------------------------------------------------------------------------------------+
```

---

## 🔐 RBAC & Cryptographic Auditability

### Role-Based Access Control (RBAC)
- **`ADMIN`**: Full platform control, environment bootstrap (`backend/init_workbench.py`), user management, model configuration, and audit verification.
- **`ENGINEER`**: Document ingestion, RAG querying, workflow execution, deliverable generation, and sandbox code execution.
- **`AUDITOR`**: Read-only access to pipeline logs, verification metrics, air-gap compliance reports, and audit trail verification endpoints.

### Hash-Chained Cryptographic Audit Logging
All platform operations (file uploads, sandbox executions, model inferences, deliverable downloads) write to `backend/audit.py`. Each log entry computes:
$$\text{Hash}_n = \text{SHA256}(\text{Hash}_{n-1} \parallel \text{Timestamp} \parallel \text{User} \parallel \text{Role} \parallel \text{Action} \parallel \text{PayloadHash})$$

Endpoints:
- `POST /api/audit/log`: Record action to cryptographic audit ledger.
- `GET /api/audit/verify`: Verify the full SHA-256 hash chain to detect any tampering or log mutation.

---

## 💻 Tech Stack

- **Frontend**: Next.js 14, React 19, Tailwind CSS, Lucide React Icons
- **Backend**: Python 3.10+, FastAPI, Uvicorn, Pydantic v2
- **Access Control & Audit**: PyJWT authentication (`backend/auth.py`), Cryptographic Hash Chaining (`backend/audit.py`)
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
- (Optional) Docker & Docker Compose for containerized deployment
- (Optional) NVIDIA GPU + NVIDIA Container Toolkit for GPU acceleration

---

### Method 1: Native Launcher Scripts

#### Linux / macOS Bash Launcher:
```bash
chmod +x launch.sh
./launch.sh
```

#### Windows PowerShell Launcher:
```powershell
.\launch.ps1
```
*The launcher checks environment variables, installs backend/frontend dependencies, runs bootstrap setup, and launches both services simultaneously.*

---

### Method 2: 1-Click Launch in VS Code (Recommended)
1. Open VS Code in the project root directory.
2. Press `Ctrl + Shift + P` (or `F1`).
3. Type **`Tasks: Run Task`** and select **`🚀 Start Full Sovereign AI Workbench (Both)`**.

---

### Method 3: Manual Terminal Launch

#### 1. Bootstrap Setup:
```bash
cd backend
python init_workbench.py
```

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

### Method 4: Docker Compose Stack (CPU & GPU)

#### CPU Deployment:
```bash
docker-compose up --build -d
```

#### GPU Accelerated Deployment:
```bash
docker-compose -f docker-compose.yml -f docker-compose.gpu.yml up --build -d
```

---

## 🧪 Continuous Integration & Testing

The repository features automated CI workflows via GitHub Actions (`.github/workflows/ci.yml`):

### Automated Unit Test Suite:
```bash
cd backend
python -m unittest tests/test_pipeline.py
```
*Tests cover Task Analyzer, Model Router, Verification Matrix, Sandbox Escape Blocked, RBAC Role Enforcement, and Audit Trail Hash Chain Integrity.*

### End-to-End Smoke Test:
```bash
cd backend
python tests/smoke_test.py
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
Cryptographic Audit Trail: VERIFIED SHA-256 HASH CHAIN
```

---

## 📜 Governance & Compliance

- **[LICENSE](LICENSE)** — MIT License
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — Developer setup, coding standards, and PR guidelines
- **[SECURITY.md](SECURITY.md)** — Responsible vulnerability disclosure policy and security controls
- **[THREAT_MODEL.md](THREAT_MODEL.md)** — STRIDE threat analysis, trust boundaries, and mitigation matrix
- **[ROADMAP.md](ROADMAP.md)** — Platform milestones, release phases, and future capabilities
- **[ACKNOWLEDGMENTS.md](ACKNOWLEDGMENTS.md)** — Credits for open-source frameworks and libraries

---

## 📁 Repository Structure

```
sovereign-ai-workbench/
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI workflow
├── backend/
│   ├── main.py                     # FastAPI app entry point & API routes
│   ├── config.py                   # Air-gap settings & configuration
│   ├── auth.py                     # RBAC (ADMIN, ENGINEER, AUDITOR) & JWT
│   ├── audit.py                    # SHA-256 Hash-Chained Cryptographic Audit
│   ├── init_workbench.py           # Workbench initialization script
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
│   ├── tests/                      # Unit tests & smoke tests
│   │   ├── test_pipeline.py
│   │   └── smoke_test.py
│   └── sample_data/                # Preloaded MRPL SOPs & inspection reports
├── frontend/                       # Next.js 14 User Workspace App
│   ├── app/                        # Main dashboard & layout
│   └── components/                 # Header, Chat, Reasoning Trace, Deliverables Vault
├── .gitleaks.toml                  # Secret-scanning configuration
├── .env.example                    # Environment variable template
├── launch.sh                       # Linux / macOS bash launcher
├── launch.ps1                      # Windows PowerShell launcher
├── docker-compose.yml              # CPU Docker compose configuration
├── docker-compose.gpu.yml          # GPU acceleration Docker compose override
├── Dockerfile.backend              # Backend Docker container
├── Dockerfile.frontend             # Frontend Docker container
├── LICENSE                         # MIT License
├── CONTRIBUTING.md                 # Contribution guidelines
├── SECURITY.md                      # Security disclosure policy
├── THREAT_MODEL.md                 # STRIDE threat model & mitigations
├── ROADMAP.md                      # Product roadmap & milestones
├── ACKNOWLEDGMENTS.md              # Open source credits
└── README.md                       # Project documentation
```

---

## 👥 Team Information

- **Smart India Hackathon:** SIH 2026
- **Problem Statement:** SIH26117 (MRPL — Mangalore Refinery and Petrochemicals Limited)
- **Team Name:** Zero Latency
- **Team ID:** 934567100
- **Repository Link:** [https://github.com/himanshuchahar06/Offline-AI-workflow](https://github.com/himanshuchahar06/Offline-AI-workflow)

