@echo off
title AETHON Mission Control - Desktop App
cd /d "%~dp0"

echo ================================================================
echo      AETHON Spaceflight AI Mission Control & Telemetry
echo                     Native PC Desktop App
echo ================================================================

:: Check if pywebview is installed for true native desktop window
python -c "import webview" >nul 2>&1
if %errorlevel% equ 0 (
    echo [1/1] Launching Native Windows Desktop App...
    python app.py
    goto :end
)

:: Fallback to ultra-fast Edge Chromeless App Mode
echo [1/2] Checking AETHON Engine on port 8000...
powershell -Command "$response = try { (Invoke-WebRequest -Uri 'http://127.0.0.1:8000/api/camera/devices' -UseBasicParsing -TimeoutSec 1).StatusCode } catch { 0 }; exit ($response -ne 200)" >nul 2>&1

if %errorlevel% neq 0 (
    echo Starting AETHON Python backend engine in background...
    start /min "AETHON Backend Engine" python scripts/run_aethon.py
    echo Waiting for AETHON engine to initialize...
    :wait_loop
    timeout /t 2 /nobreak >nul
    powershell -Command "$response = try { (Invoke-WebRequest -Uri 'http://127.0.0.1:8000/api/camera/devices' -UseBasicParsing -TimeoutSec 1).StatusCode } catch { 0 }; exit ($response -ne 200)" >nul 2>&1
    if %errorlevel% neq 0 goto wait_loop
)

echo [2/2] Launching AETHON Desktop Application Window...
set EDGE_PATH="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

if exist %EDGE_PATH% (
    start "" %EDGE_PATH% --app=http://127.0.0.1:8000 --enable-gpu-rasterization --enable-zero-copy --start-maximized
) else (
    start http://127.0.0.1:8000
)

:end
