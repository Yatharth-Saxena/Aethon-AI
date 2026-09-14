# 🚀 AETHON — Spaceflight AI Mission Control & Payload Assembly

<div align="center">

```
   █████╗ ███████╗████████╗██╗  ██╗ ██████╗ ███╗   ██╗
  ██╔══██╗██╔════╝╚══██╔══╝██║  ██║██╔═══██╗████╗  ██║
  ███████║█████╗     ██║   ███████║██║   ██║██╔██╗ ██║
  ██╔══██║██╔══╝     ██║   ██╔══██║██║   ██║██║╚██╗██║
  ██║  ██║███████╗   ██║   ██║  ██║╚██████╔╝██║ ╚████║
  ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
```

**Autonomous AI Perception, Crew Guidance & Real-Time Telemetry Console for Human Spaceflight**

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React 19](https://img.shields.io/badge/Frontend-React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/3D_Telemetry-Three.js-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![YOLOv8](https://img.shields.io/badge/Vision-Ultralytics_YOLOv8-FF5722?style=for-the-badge)](https://ultralytics.com/)
[![MediaPipe](https://img.shields.io/badge/Kinematics-MediaPipe-007FFF?style=for-the-badge)](https://mediapipe.dev/)

> **"SEE. UNDERSTAND. ASSIST."**  
> An intelligent digital co-pilot inside the spacecraft that watches over complex scientific experiments and orbital assembly protocols in real time — preventing costly mistakes before they happen.

</div>

---

## 🌟 What's New & Recent Upgrades

Here is a quick snapshot of the latest mission upgrades:

| Upgrade | Description | Impact |
| :--- | :--- | :--- |
| 🎬 **Procedural SVG Visualizer** | Smooth, keyframed vector animations for every assembly action (`PICK`, `PLACE`, `PRESS`, `INSERT`, `COMPLETED`). | Astronauts see clear, animated visual cues of what to do next. |
| 🏷️ **Next-Step Mission Badges** | Dynamic badges on the console displaying `STEP XX/YY`, `ACTION TYPE`, and `TARGET OBJECT`. | Eliminates cognitive overload and ambiguity during assembly. |
| 🖥️ **Native Desktop Window** | Edge Chromium (WebView2) desktop launcher (`launch_app.bat` / `app.py`). | Launches instantly with zero browser address bar or chrome. |
| 🏎️ **Unified Zero-Lag Pipeline** | Asynchronous multi-threaded tracking: MediaPipe hands at ~48 FPS + YOLO at ~25 FPS. | Ultra-smooth video overlay even on standard hardware. |
| 📡 **Centralized GitHub Migration** | Repository unified under [Yatharth-Saxena/Aethon-AI](https://github.com/Yatharth-Saxena/Aethon-AI). | Single source of truth for upstream updates. |

---

## ⚡ Core Features in a Nutshell

AETHON combines computer vision, robotics kinematics, deterministic state machines, and aerospace telemetry into one cohesive cockpit:

```
                  ┌─────────────────────────────────────────┐
                  │          AETHON SYSTEM PIPELINE         │
                  └─────────────────────────────────────────┘
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
        [OPTICAL VISION]                               [CREW AUDIO]
     Webcam / GigE Camera                             Microphone In
                │                                             │
      MediaPipe + YOLOv8                               Whisper / STT
  (Hands, Poses & Tool Detect)                     (Aerospace Commands)
                │                                             │
                └──────────────────────┬──────────────────────┘
                                       ▼
                     [DETERMINISTIC STATE MACHINE]
                  • Sequence Verification (Step 1→2→3)
                  • Out-of-Order Anomaly Detection
                  • Real-time Spoken Warnings (TTS)
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
       [3D GLASS COCKPIT]                             [GROUND DOWNLINK]
    React 19 + Three.js Orbit                      12 Hz Telemetry & Logs
```

### 1. 👁️ Real-Time Computer Vision & Kinematics
- **Dual-Hand 21-Keypoint Tracking**: High-precision hand skeleton overlay with pinch and grasp detection.
- **YOLOv8 Component Detection**: Detects tools, containers, electronics, and specimens.
- **Spaceflight Taxonomy**: Automatically converts everyday items into aerospace classifications (e.g. `Shears` → `Payload Shears`, `Beaker` → `Fluid Sample Flask`).
- **Spatial Interaction Engine**: Computes 3D distances between astronaut fingers and target tools to confirm when an item is grasped or placed.

### 2. 🧠 Deterministic Sequence Validator (Zero-Mistake Engine)
- **Mathematical State Machine**: Defines exact rules for every protocol (e.g. *Step 1: Pick Reagent → Step 2: Insert into Chamber → Step 3: Press Seal*).
- **Proactive Anomaly Alerting**: Instantly sounds an alert if a tool is picked out of order or a critical step is skipped.
- **Auto-Advancement**: Detects successful completion of an action and automatically transitions to the next step.

### 3. 🎙️ Hands-Free Voice Assistant
- **Speech Recognition (STT)**: Astronauts can speak natural commands without taking their hands off the hardware (*"AETHON, start protocol"*, *"Next step"*, *"Status report"*).
- **Synthetic Speech Guidance (TTS)**: Non-blocking synthetic voice guides the crew verbally through each phase and delivers instant verbal warnings.

### 4. 🎮 Mission Control Glass Cockpit
- **Live Annotated Feed**: 60 FPS MJPEG video stream with dynamic HUD overlays, bounding boxes, and hand skeletons.
- **3D Orbital Telemetry**: Interactive Three.js globe visualizing Earth, Moon orbit, and satellite position in real time.
- **Next-Step HUD**: Dynamic vector animation showing exactly what motion to perform next.
- **Telemetry Indicators**: Real-time camera FPS, AI inference latency, network roundtrip, and protocol progress.

### 5. 💾 Forensic Blackbox & Ground Station Sync
- **12 Hz Telemetry WebSocket**: Broadcasts high-frequency system state, detection coordinates, and warnings.
- **One-Click Forensic Snapshots**: High-resolution image capture saved directly with timestamped audit logs.
- **Blackbox Video Recording**: Continuous mission video recording for post-flight ground review.
- **JSONL Event Logs**: Every click, speech command, state transition, and anomaly is immutably logged.

---

## 🚀 Quickstart (Run in 30 Seconds)

### Option 1: Native Desktop Application (Recommended)
Double-click `launch_app.bat` or run:
```bash
python app.py
```
> Opens AETHON as a standalone Windows desktop application window powered by Edge Chromium WebView2.

---

### Option 2: Browser & Developer Mode

#### 1. Start the Python Backend Engine
```bash
python scripts/run_aethon.py
```
*Backend runs on `http://127.0.0.1:8000` (FastAPI + YOLOv8 + MediaPipe + WebSocket).*

#### 2. Start the Frontend Console
```bash
npm run dev
```
*Mission Control console runs on `http://localhost:3000` (React 19 + Vite).*

---

## 📡 API Endpoints & Telemetry

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/video_feed` | `GET` | Live MJPEG camera stream with AI HUD overlays |
| `/ws` | `WS` | 12 Hz bidirectional telemetry & perception WebSocket |
| `/api/experiment/start` | `POST` | Begins active protocol evaluation |
| `/api/experiment/pause` | `POST` | Pauses protocol timer and validation |
| `/api/experiment/reset` | `POST` | Resets sequence to Step 1 |
| `/api/voice/command` | `POST` | Dispatches textual aerospace voice command |
| `/api/camera/snapshot` | `POST` | Captures forensic timestamped snapshot |
| `/api/camera/record/start`| `POST` | Starts blackbox video recording |
| `/api/camera/record/stop` | `POST` | Flushes and saves session video recording |
| `/api/logs` | `GET` | Retrieves chronological mission audit logs |

---

## 📁 Repository Structure

```text
trail-aethon/
├── ai/                     # Computer vision & perception engine
│   ├── detector/           # YOLOv8 object detection & custom weights
│   ├── tracking/           # MediaPipe 21-point hand & pose tracking
│   └── pipeline/           # Unified multi-threaded perception pipeline
├── backend/                # FastAPI application & REST/WebSocket routes
├── camera/                 # Low-latency camera capture & DirectShow driver
├── client/                 # React 19 Mission Control Glass Cockpit
│   └── src/
│       ├── components/     # 3D Canvas, NextStepVisual, Glass panels, HUD
│       └── pages/Home.jsx  # Main flight console layout & telemetry monitors
├── experiment/             # Deterministic state machine & step validators
├── recording/              # Blackbox forensic video & snapshot recorders
├── scripts/                # Launchers, test harnesses, and dataset tools
├── voice/                  # Speech-to-text (STT) & Text-to-speech (TTS)
├── app.py                  # Standalone native desktop app launcher
├── launch_app.bat          # 1-click Windows desktop batch launcher
└── requirements.txt        # Python dependencies
```

---

## 📄 License
Released under the **MIT License**. Created for autonomous aerospace payload operations, lunar surface assembly, and scientific microgravity research.
