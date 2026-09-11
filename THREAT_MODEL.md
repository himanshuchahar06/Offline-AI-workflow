# 🎯 Threat Model & Security Boundary Specification

This document details the threat model, trust boundaries, data classification, and security mitigations for the **Sovereign On-Premise Agentic AI Workbench**.

---

## 📊 Data Classification

| Data Category | Confidentiality Level | Handling Policy |
| :--- | :--- | :--- |
| **P&ID Diagrams & NDT Logs** | RESTRICTED / CONFIDENTIAL | Local disk processing only; metadata stripped; isolated session folder. |
| **Refinery SOPs & Safe Windows** | CONFIDENTIAL | Embedded into local vector memory; zero cloud replication. |
| **Calculations & Formulas** | INTERNAL | Executed in Scoped Python Sandbox; host OS isolation. |
| **Audit Logs** | HIGH INTEGRITY | SHA-256 hash-chained log; tamper-evident verification. |

---

## 🏛️ Trust Boundaries & Attack Vectors

```
[ Browser Client (Next.js) ]
         │
    (JWT / RBAC)
         ▼
[ FastAPI Backend Engine ] ────▶ [ Scoped Python Sandbox (Restricted Builtins) ]
         │
    (Local RAG)
         ▼
[ On-Premise Vector Store ] ───▶ [ Cryptographic Audit Log (SHA-256 Chain) ]
```

### Trust Boundary 1: Browser ↔ FastAPI Backend
- **Threat**: Unauthorized API invocation or privilege escalation.
- **Mitigation**: Server-side Role-Based Access Control (`ADMIN`, `ENGINEER`, `AUDITOR`) with JWT authentication tokens.

### Trust Boundary 2: FastAPI Backend ↔ Local Execution Sandbox
- **Threat**: Malicious python code escaping sandbox to read host files or execute system commands.
- **Mitigation**: `ScopedPythonSandbox` strips `__builtins__`, removing `open`, `__import__`, `os`, `subprocess`, `sys`, and socket access.

### Trust Boundary 3: File Uploads ↔ Workspace Directory
- **Threat**: Malicious file uploads (zip bombs, script execution).
- **Mitigation**: File extension validation, metadata sanitization, per-session directory isolation.

---

## 🚫 Out of Scope

- **Multi-Tenant Public Cloud Hosting**: System is explicitly single-tenant or enterprise multi-role on-premise.
- **Third-Party SaaS Integrations**: External API calls are disabled by design (`external_network_requests == 0`).
