# 🤝 Contributing to Sovereign On-Premise Agentic AI Workbench

Thank you for your interest in contributing to the **Sovereign On-Premise Agentic AI Workbench**! This project provides an air-gapped, multimodal AI workspace designed for confidential industrial and PSU environments.

---

## 🛠️ Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/himanshuchahar06/Offline-AI-workflow.git
cd Offline-AI-workflow
```

### 2. Backend Environment Setup
```bash
cd backend
python -m venv venv
# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

pip install -r requirements.txt
python init_workbench.py
```

### 3. Frontend Environment Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Testing Guidelines

Before submitting a Pull Request, run the unit test suite and end-to-end smoke test:

```bash
cd backend
# Run Unit Tests:
python -m unittest tests/test_pipeline.py

# Run End-to-End Smoke Test:
python tests/smoke_test.py
```

---

## 📐 Coding Standards

- **Python**: Follow PEP 8 guidelines. All backend functions must be typed (`pydantic` schemas for API payloads).
- **TypeScript / React**: Use strict TypeScript interfaces (`frontend/types/pipeline.ts`).
- **Air-Gap Integrity**: Every tool or endpoint must enforce zero external cloud network requests (`external_network_requests: 0`).
- **Structured Output**: Model outputs must be structured JSON. Strip conversational filler and preambles.

---

## 🔀 Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Commit your changes with clean commit messages: `git commit -m "Add feature X"`
3. Push to your branch: `git push origin feature/your-feature-name`
4. Open a Pull Request against the `main` branch.
