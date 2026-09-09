"""
AETHON — Native PC Desktop Application
Launches AETHON as a standalone Windows desktop application powered by Microsoft Edge Chromium WebView2.
"""
import sys
import os
import time
import threading
import urllib.request
from pathlib import Path

# Add root directory to sys.path
ROOT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT_DIR))

import uvicorn
import webview
from backend.config import SERVER_HOST, SERVER_PORT

def is_server_running(port=SERVER_PORT):
    try:
        req = urllib.request.Request(
            f"http://127.0.0.1:{port}/api/camera/devices",
            headers={"User-Agent": "AETHON-Desktop-Check"}
        )
        with urllib.request.urlopen(req, timeout=1.0) as resp:
            return resp.status == 200
    except Exception:
        return False

def run_backend():
    """Runs the FastAPI uvicorn server in a background thread."""
    try:
        uvicorn.run(
            "backend.main:app",
            host=SERVER_HOST,
            port=SERVER_PORT,
            log_level="warning",
            ws_ping_interval=None,
            ws_ping_timeout=None
        )
    except Exception as e:
        print(f"[AETHON Core] Server thread terminated: {e}")

def main():
    print("=" * 65)
    print("  LAUNCHING AETHON PC DESKTOP APPLICATION")
    print("  Engine: Microsoft Edge Chromium (WebView2)")
    print(f"  Internal Port: http://127.0.0.1:{SERVER_PORT}")
    print("=" * 65)

    # 1. Start server if not already running
    if not is_server_running():
        print("[AETHON Desktop] Initializing local perception & telemetry server...")
        server_thread = threading.Thread(target=run_backend, daemon=True)
        server_thread.start()

        start_time = time.time()
        while time.time() - start_time < 20.0:
            if is_server_running():
                print("[AETHON Desktop] Server ready. Launching desktop window...")
                break
            time.sleep(0.4)
    else:
        print("[AETHON Desktop] Connected to active AETHON server instance.")

    # 2. Create the native desktop window
    window = webview.create_window(
        title="AETHON — Spaceflight AI Mission Control & Payload Assembly",
        url=f"http://127.0.0.1:{SERVER_PORT}",
        width=1600,
        height=950,
        min_size=(1080, 680),
        background_color="#050607",
        text_select=False,
        confirm_close=False
    )

    # 3. Start native window with Edge Chromium (WebView2) hardware acceleration
    webview.start(gui="edgechromium", debug=False)
    sys.exit(0)

if __name__ == "__main__":
    main()
