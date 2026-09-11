# Sovereign Workbench Native Launcher (Windows PowerShell)

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "SOVEREIGN WORKBENCH NATIVE LAUNCHER (Windows)" -ForegroundColor Cyan
Write-Host "======================================================================" -ForegroundColor Cyan

$RootDir = $PSScriptRoot

# Bootstrap Environment
Write-Host "[+] Initializing backend storage and vector memory..." -ForegroundColor Yellow
Set-Location "$RootDir\backend"
python init_workbench.py

# Launch Backend FastAPI Server
Write-Host "[+] Starting FastAPI Backend at http://localhost:8000..." -ForegroundColor Green
$BackendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$RootDir\backend'; python main.py" -PassThru

# Launch Frontend Next.js Server
Write-Host "[+] Starting Next.js Frontend at http://localhost:3000..." -ForegroundColor Green
Set-Location "$RootDir\frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$RootDir\frontend'; npm run dev"

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "SOVEREIGN WORKBENCH IS RUNNING!" -ForegroundColor Cyan
Write-Host "   - Backend API:  http://localhost:8000" -ForegroundColor White
Write-Host "   - Frontend UI:  http://localhost:3000" -ForegroundColor White
Write-Host "======================================================================" -ForegroundColor Cyan
