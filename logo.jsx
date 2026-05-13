/* YAPS · Logo + Loader */

// SVG logo: rounded square with brand gradient + bold Y
function YapsLogo({ size = 40, animated = false }) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="YAPS"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A8347D">
            {animated && (
              <animate
                attributeName="offset"
                values="0;0.15;0"
                dur="3.4s"
                repeatCount="indefinite"
              />
            )}
          </stop>
          <stop offset="50%" stopColor="#8B3D9E">
            {animated && (
              <animate
                attributeName="offset"
                values="0.5;0.62;0.5"
                dur="3.4s"
                repeatCount="indefinite"
              />
            )}
          </stop>
          <stop offset="100%" stopColor="#7B4FD8">
            {animated && (
              <animate
                attributeName="offset"
                values="1;0.92;1"
                dur="3.4s"
                repeatCount="indefinite"
              />
            )}
          </stop>
        </linearGradient>
        <linearGradient id={`gloss-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="15"
        fill={`url(#g-${id})`}
      />
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="15"
        fill={`url(#gloss-${id})`}
      />
      {/* Y */}
      <path
        d="M19 17 L32 36 L45 17 L38.5 17 L32 27 L25.5 17 Z M28.5 34 L35.5 34 L35.5 49 L28.5 49 Z"
        fill="#ffffff"
      />
      {/* inner stroke */}
      <rect
        x="2.5"
        y="2.5"
        width="59"
        height="59"
        rx="14.5"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
      />
    </svg>
  );
}

// Loader splash — pulse + rotation + breathing gradient
function YapsLoader({ done }) {
  return (
    <div className={`loader-shell ${done ? "hidden" : ""}`} aria-hidden={done}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
        }}
      >
        <div style={{ animation: "yaps-spin 8s linear infinite" }}>
          <div style={{ animation: "yaps-pulse 1.6s ease-in-out infinite" }}>
            <YapsLogo size={88} animated />
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontWeight: 700,
              letterSpacing: "0.04em",
              fontSize: 18,
            }}
          >
            YAPS
          </div>
          <div
            style={{
              color: "var(--ink-3)",
              fontSize: 12,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginTop: 6,
            }}
          >
            Chargement<span className="dots">…</span>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes yaps-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes yaps-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

window.YapsLogo = YapsLogo;
window.YapsLoader = YapsLoader;
