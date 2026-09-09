@echo off
title Build AETHON Standalone PC Executable
echo ================================================================
echo           Building Standalone AETHON.exe Windows App
echo ================================================================

cd /d "%~dp0"

echo [1/3] Building React production bundle...
call npm.cmd run build

echo [2/3] Verifying app icon...
if not exist "icon.ico" (
    python -c "from PIL import Image; img = Image.open('client/public/isro-logo.png'); img.save('icon.ico', format='ICO', sizes=[(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)])"
)

echo [3/3] Compiling standalone PC App with PyInstaller...
pyinstaller --noconfirm --onedir --windowed ^
    --name "AETHON" ^
    --icon "icon.ico" ^
    --add-data "dist/public;dist/public" ^
    --add-data "yolov8n.pt;." ^
    --add-data "yolov8n-pose.pt;." ^
    --add-data "models;models" ^
    --add-data "experiment/configs;experiment/configs" ^
    --collect-all ultralytics ^
    --collect-all mediapipe ^
    --collect-all pywebview ^
    app.py

echo.
echo ================================================================
echo Build complete! Your PC desktop application is located at:
echo %CD%\dist\AETHON\AETHON.exe
echo ================================================================
