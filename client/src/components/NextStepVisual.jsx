import React, { useMemo } from "react";

/**
 * NextStepVisual
 * 
 * Aerospace-grade, self-contained SVG vector animation demonstrating procedural assembly steps:
 * - PICK_UP: Lifting Object A (red cube) upward with guide chevrons, gripper brackets, and ground pulse.
 * - PLACE: Aligning and placing Object A onto Object B (wooden block) with descent guide and touchdown shockwave.
 * - TRAY: Stowing Object A into the apparatus tray along a curved path.
 * - PRESS: Pressing the industrial mission complete button with probe depression and radiating sonar ripples.
 * - COMPLETED: Sequence verified seal with glowing hex bezel and success checkmark.
 * 
 * Uses native SVG SMIL / <animateTransform> & <animate> for guaranteed 60 FPS hardware-accelerated
 * motion across all browsers, Electron, and Windows WebView2 desktop runtimes.
 */

export function resolveStepType(stepNumber, label = "", stepData = null, status = "") {
  if (status === "COMPLETED") return "COMPLETED";
  const text = (label || stepData?.label || "").toLowerCase();
  const action = (stepData?.expected_action || "").toUpperCase();
  const target = (stepData?.expected_target || "").toLowerCase();

  if (action === "PRESS" || text.includes("press") || text.includes("button")) {
    return "PRESS";
  }
  if (action === "PLACE" && (target.includes("tray") || text.includes("tray"))) {
    return "TRAY";
  }
  if (action === "PLACE" || text.includes("place") || text.includes("stack") || text.includes("object b")) {
    return "PLACE";
  }
  if (action === "PICK_UP" || text.includes("pick") || text.includes("lift")) {
    return "PICK_UP";
  }

  // Fallback by step number if within standard 1..5 sequence
  if (stepNumber === 1 || stepNumber === 3) return "PICK_UP";
  if (stepNumber === 2) return "PLACE";
  if (stepNumber === 4) return "TRAY";
  if (stepNumber === 5) return "PRESS";
  return "PICK_UP";
}

export default function NextStepVisual({
  stepNumber = 1,
  totalSteps = 5,
  nextStepLabel = "",
  stepData = null,
  status = "IDLE",
}) {
  const stepType = useMemo(() => {
    return resolveStepType(stepNumber, nextStepLabel, stepData, status);
  }, [stepNumber, nextStepLabel, stepData, status]);

  const stepIndexFormatted = useMemo(() => {
    const num = String(stepNumber || 1).padStart(2, "0");
    const total = String(totalSteps || 5).padStart(2, "0");
    return `${num}/${total}`;
  }, [stepNumber, totalSteps]);

  const badgeMeta = useMemo(() => {
    switch (stepType) {
      case "PLACE":
        return { text: "STACK" };
      case "TRAY":
        return { text: "TRAY" };
      case "PRESS":
        return { text: "PRESS" };
      case "COMPLETED":
        return { text: "DONE" };
      case "PICK_UP":
      default:
        return { text: "LIFT" };
    }
  }, [stepType]);

  return (
    <div className="next-step-visual-root" role="img" aria-label={`Next Step Guidance: ${nextStepLabel || badgeMeta.text}`}>
      <svg
        viewBox="0 0 100 100"
        className="next-step-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients for Object A (Red Cube) */}
          <linearGradient id="nsvRedTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <linearGradient id="nsvRedLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <linearGradient id="nsvRedRight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>

          {/* Gradients for Object B (Wooden/Gold Cube) */}
          <linearGradient id="nsvWoodTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <linearGradient id="nsvWoodLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="nsvWoodRight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>

          {/* Tray gradients */}
          <linearGradient id="nsvTrayRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="nsvTrayBed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(30, 41, 59, 0.8)" />
            <stop offset="100%" stopColor="rgba(15, 23, 42, 0.95)" />
          </linearGradient>

          {/* Button gradients */}
          <linearGradient id="nsvBtnBezel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <radialGradient id="nsvBtnPlunger" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="65%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="nsvGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ============================================================= */}
        {/* STEP ANIMATION CONTENT                                         */}
        {/* ============================================================= */}

        {stepType === "PICK_UP" && (
          <g className="nsv-pickup-group">
            {/* Ground surface plane */}
            <ellipse cx="50" cy="78" rx="22" ry="9" fill="rgba(0, 230, 200, 0.04)" stroke="rgba(0, 230, 200, 0.2)" strokeWidth="0.8" />
            
            {/* Ground pulsing ring with native SVG animation */}
            <ellipse cx="50" cy="78" rx="14" ry="6" fill="none" stroke="rgba(0, 230, 200, 0.35)" strokeDasharray="2 2">
              <animate attributeName="rx" values="12; 20; 12" dur="2.6s" repeatCount="indefinite" />
              <animate attributeName="ry" values="5; 8.5; 5" dur="2.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7; 0.15; 0.7" dur="2.6s" repeatCount="indefinite" />
            </ellipse>

            {/* Vertical trajectory dashed guide line */}
            <line x1="50" y1="74" x2="50" y2="28" stroke="rgba(0, 230, 200, 0.5)" strokeWidth="1" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" values="12; 0" dur="1.2s" repeatCount="indefinite" />
            </line>

            {/* Upward chevron motion arrows with native SVG translate */}
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,4; 0,-8"
                dur="1.4s"
                repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.2; 0.7; 1" dur="1.4s" repeatCount="indefinite" />
              <path d="M 46 62 L 50 58 L 54 62" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,4; 0,-8"
                begin="0.4s"
                dur="1.4s"
                repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.2; 0.7; 1" begin="0.4s" dur="1.4s" repeatCount="indefinite" />
              <path d="M 46 52 L 50 48 L 54 52" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Lifting Object A (Red Cube) with native SVG translate and gripper clamping */}
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="50,60; 50,60; 50,28; 50,28; 50,60"
                keyTimes="0; 0.15; 0.50; 0.80; 1"
                dur="2.6s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
              />

              {/* Object A Cube facets */}
              <polygon points="0,-7 12,0 0,7 -12,0" fill="url(#nsvRedTop)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
              <polygon points="-12,0 0,7 0,19 -12,12" fill="url(#nsvRedLeft)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
              <polygon points="0,7 12,0 12,12 0,19" fill="url(#nsvRedRight)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
              <text x="0" y="3" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#ffffff" fontFamily="var(--mono)">A</text>

              {/* Gripper brackets on cube */}
              <g>
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  values="1.35 1; 1 1; 1 1; 1.35 1; 1.35 1"
                  keyTimes="0; 0.2; 0.8; 0.95; 1"
                  dur="2.6s"
                  repeatCount="indefinite"
                />
                <path d="M -18 0 L -15 0 L -15 12 L -18 12" fill="none" stroke="rgba(0, 230, 200, 0.7)" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 18 0 L 15 0 L 15 12 L 18 12" fill="none" stroke="rgba(0, 230, 200, 0.7)" strokeWidth="1.2" strokeLinecap="round" />
              </g>
            </g>
          </g>
        )}

        {stepType === "PLACE" && (
          <g className="nsv-place-group">
            {/* Ground shadow for Base Block */}
            <ellipse cx="50" cy="79" rx="19" ry="7" fill="rgba(0, 0, 0, 0.55)" />

            {/* Base Object B (Wooden/Gold Cube) fixed on table */}
            <g transform="translate(50, 56)">
              <polygon points="0,-7 13,0 0,7 -13,0" fill="url(#nsvWoodTop)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
              <polygon points="-13,0 0,7 0,19 -13,12" fill="url(#nsvWoodLeft)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              <polygon points="0,7 13,0 13,13 0,19" fill="url(#nsvWoodRight)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              <text x="0" y="3" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="rgba(255,255,255,0.9)" fontFamily="var(--mono)">B</text>
            </g>

            {/* Target Docking Alignment crosshair on top of B */}
            <g transform="translate(50, 56)">
              <path d="M -9 -1 L -12 0 L -9 1" fill="none" stroke="rgba(224, 233, 236, 0.5)" strokeWidth="0.8" />
              <path d="M 9 -1 L 12 0 L 9 1" fill="none" stroke="rgba(224, 233, 236, 0.5)" strokeWidth="0.8" />
            </g>

            {/* Touchdown shockwave expanding at contact */}
            <ellipse cx="50" cy="56" rx="6" ry="3" fill="none" stroke="rgba(0, 230, 200, 0.6)" strokeWidth="1.5">
              <animate attributeName="rx" values="4; 4; 22; 22" keyTimes="0; 0.48; 0.75; 1" dur="2.6s" repeatCount="indefinite" />
              <animate attributeName="ry" values="2; 2; 10; 10" keyTimes="0; 0.48; 0.75; 1" dur="2.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0; 0; 0.9; 0" keyTimes="0; 0.48; 0.52; 0.78" dur="2.6s" repeatCount="indefinite" />
            </ellipse>

            {/* Downward guide motion chevrons */}
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,-4; 0,8"
                dur="1.4s"
                repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.2; 0.7; 1" dur="1.4s" repeatCount="indefinite" />
              <path d="M 46 25 L 50 29 L 54 25" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,-4; 0,8"
                begin="0.4s"
                dur="1.4s"
                repeatCount="indefinite"
              />
              <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.2; 0.7; 1" begin="0.4s" dur="1.4s" repeatCount="indefinite" />
              <path d="M 46 34 L 50 38 L 54 34" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Object A (Red Cube) descending onto B with native SVG translate */}
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="50,14; 50,14; 50,37; 50,37; 50,14"
                keyTimes="0; 0.15; 0.50; 0.80; 1"
                dur="2.6s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
              />
              <polygon points="0,-7 12,0 0,7 -12,0" fill="url(#nsvRedTop)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
              <polygon points="-12,0 0,7 0,19 -12,12" fill="url(#nsvRedLeft)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
              <polygon points="0,7 12,0 12,12 0,19" fill="url(#nsvRedRight)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
              <text x="0" y="3" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#ffffff" fontFamily="var(--mono)">A</text>
            </g>
          </g>
        )}

        {stepType === "TRAY" && (
          <g className="nsv-tray-group">
            {/* Origin table marker at bottom-left */}
            <ellipse cx="26" cy="62" rx="14" ry="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />

            {/* Isometric Apparatus Tray at bottom-right */}
            <g transform="translate(68, 62)">
              <polygon points="0,-12 24,0 0,12 -24,0" fill="url(#nsvTrayBed)" stroke="url(#nsvTrayRim)" strokeWidth="1.4">
                <animate attributeName="stroke-width" values="1.2; 2.2; 1.2" dur="2.8s" repeatCount="indefinite" />
              </polygon>
              <polygon points="0,-8 18,0 0,8 -18,0" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              <text x="0" y="2" textAnchor="middle" fontSize="5" fontWeight="bold" fill="rgba(224, 233, 236, 0.8)" fontFamily="var(--mono)">TRAY</text>
            </g>

            {/* Parabolic Guide Curve */}
            <path d="M 26 36 Q 44 14 68 50" fill="none" stroke="rgba(0, 230, 200, 0.6)" strokeWidth="1.2" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" values="24; 0" dur="1.4s" repeatCount="indefinite" />
            </path>

            {/* Object A moving along path into tray */}
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="26,32; 26,32; 68,50; 68,50; 26,32"
                keyTimes="0; 0.15; 0.52; 0.82; 1"
                dur="2.8s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
              />
              <polygon points="0,-7 12,0 0,7 -12,0" fill="url(#nsvRedTop)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
              <polygon points="-12,0 0,7 0,19 -12,12" fill="url(#nsvRedLeft)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
              <polygon points="0,7 12,0 12,12 0,19" fill="url(#nsvRedRight)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
              <text x="0" y="3" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#ffffff" fontFamily="var(--mono)">A</text>
            </g>
          </g>
        )}

        {stepType === "PRESS" && (
          <g className="nsv-press-group">
            {/* Button Bezel Base */}
            <circle cx="50" cy="54" r="19" fill="url(#nsvBtnBezel)" stroke="#475569" strokeWidth="1.4" />
            <circle cx="50" cy="54" r="15" fill="#0f172a" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" />

            {/* Sonar radiating ripple waves */}
            <circle cx="50" cy="54" r="13" fill="none" stroke="rgba(0, 230, 200, 0.5)" strokeWidth="1.5">
              <animate attributeName="r" values="12; 12; 28; 28" keyTimes="0; 0.48; 0.82; 1" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0; 0; 0.9; 0" keyTimes="0; 0.48; 0.52; 0.85" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="54" r="14" fill="none" stroke="rgba(224, 233, 236, 0.4)" strokeWidth="1.2">
              <animate attributeName="r" values="13; 13; 36; 36" keyTimes="0; 0.52; 0.90; 1" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0; 0; 0.8; 0" keyTimes="0; 0.52; 0.56; 0.92" dur="2.4s" repeatCount="indefinite" />
            </circle>

            {/* Animated Gold Plunger (compresses when pressed) */}
            <g transform="translate(50, 54)">
              <g>
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  values="1; 1; 0.88; 0.88; 1"
                  keyTimes="0; 0.15; 0.48; 0.76; 1"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
                <circle cx="0" cy="0" r="12" fill="url(#nsvBtnPlunger)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="7" fill="none" stroke="rgba(0, 0, 0, 0.35)" strokeWidth="1" />
                <path d="M 0 -5 L 0 0" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M -2.5 -2.5 A 3.5 3.5 0 1 0 2.5 -2.5" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
              </g>
            </g>

            {/* Automated Press Probe descending */}
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 0,0; 0,14; 0,14; 0,0"
                keyTimes="0; 0.15; 0.48; 0.76; 1"
                dur="2.4s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
              />
              <rect x="47" y="8" width="6" height="18" rx="2" fill="#334155" stroke="#64748b" strokeWidth="0.8" />
              <polygon points="46,26 54,26 50,32" fill="rgba(0, 230, 200, 0.85)" />
              <circle cx="50" cy="26" r="1" fill="#ffffff" />
            </g>
          </g>
        )}

        {stepType === "COMPLETED" && (
          <g transform="translate(50, 52)">
            {/* Rotating Tech HUD Hexagon */}
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="12s"
                repeatCount="indefinite"
              />
              <polygon
                points="0,-28 24,-14 24,14 0,28 -24,14 -24,-14"
                fill="none"
                stroke="rgba(16, 185, 129, 0.45)"
                strokeWidth="1.2"
                strokeDasharray="4 2"
              />
              <circle cx="0" cy="0" r="21" fill="none" stroke="rgba(0, 230, 200, 0.25)" strokeWidth="0.8" />
            </g>

            {/* Pulsing Success Glow Core */}
            <circle cx="0" cy="0" r="16" fill="rgba(16, 185, 129, 0.18)" stroke="#10b981" strokeWidth="1.6">
              <animate attributeName="r" values="15; 18; 15" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8; 1; 0.8" dur="2.2s" repeatCount="indefinite" />
            </circle>

            {/* Checkmark */}
            <path
              d="M -7 -1 L -2 4 L 7 -5"
              fill="none"
              stroke="#34d399"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#nsvGlow)"
            />
          </g>
        )}
      </svg>

      {/* Floating Action Badge at bottom-right matching object-thumbnail-badge */}
      <span className="object-thumbnail-badge">
        {badgeMeta.text}
      </span>
    </div>
  );
}
