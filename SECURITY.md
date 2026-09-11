# 🛡️ Security Policy

## Supported Versions

| Version | Supported          | Security Audit Status |
| ------- | ------------------ | --------------------- |
| 1.0.x   | :white_check_mark: | 100% On-Premise Air-Gapped |
| < 1.0   | :x:                | Deprecated            |

---

## 🔒 Security Architecture Overview

The **Sovereign On-Premise Agentic AI Workbench** is built specifically for confidential refinery and PSU environments (MRPL / SIH 2026).

Key Security Controls:
1. **100% Air-Gapped Operation**: Zero external cloud API calls (`external_network_requests == 0`).
2. **Scoped Execution Sandbox**: Python code execution is restricted to safe math and engineering builtins; host filesystem and network access are strictly blocked.
3. **Tamper-Evident Audit Logging**: Every system event is recorded in a cryptographic hash-chained audit log (`SHA-256`).
4. **Role-Based Access Control (RBAC)**: Endpoint access is enforced server-side (`ADMIN`, `ENGINEER`, `AUDITOR`).

---

## 🚨 Reporting a Vulnerability

If you discover a potential security vulnerability within this project, please report it responsibly.

- **Email**: Security reports can be sent to `security@sovereign-workbench.local` (or via private GitHub vulnerability disclosure).
- **Response SLA**: Vulnerability reports will be acknowledged within 24 hours.
- **Resolution**: Patches will be developed on-premise and released within 7 business days.

Please do **NOT** post security vulnerabilities in public GitHub issues.
