#!/usr/bin/env bash
set -e

echo "======================================================================"
echo "🚀 SOVEREIGN WORKBENCH NATIVE LAUNCHER (Linux/macOS)"
echo "======================================================================"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Initialize backend python venv if needed
if [ ! -d "$ROOT_DIR/backend/venv" ]; then
    echo "[+] Creating Python virtual environment in backend/venv..."
    python3 -m venv "$ROOT_DIR/backend/venv"
    source "$ROOT_DIR/backend/venv/bin/activate"
    pip install --upgrade pip
    pip install -r "$ROOT_DIR/backend/requirements.txt"
else
    source "$ROOT_DIR/backend/venv/bin/activate"
fi

# Bootstrap environment & vector store
echo "[+] Initializing backend storage and vector memory..."
cd "$ROOT_DIR/backend"
python init_workbench.py

# Launch Backend FastAPI Server in background
echo "[+] Starting FastAPI Backend at http://localhost:8000..."
python main.py &
BACKEND_PID=$!

# Launch Frontend Next.js Server
echo "[+] Starting Next.js Frontend at http://localhost:3000..."
cd "$ROOT_DIR/frontend"
npm install
npm run dev &
FRONTEND_PID=$!

echo "======================================================================"
echo "✅ SOVEREIGN WORKBENCH IS RUNNING!"
echo "   - Backend API:  http://localhost:8000"
echo "   - Frontend UI:  http://localhost:3000"
echo "======================================================================"

trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait
