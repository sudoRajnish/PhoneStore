// A simple, self-contained smartphone illustration built with SVG.
// Using an inline illustration (instead of external image URLs) keeps the
// project working offline and avoids depending on third-party image hosts.
function PhoneMockup({ accent = "#c8ff4d", className = "", style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 240 480"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Smartphone illustration"
    >
      <defs>
        <linearGradient id={`screenGlow-${accent}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Body */}
      <rect x="6" y="6" width="228" height="468" rx="42" fill="#151b2b" stroke="#2a3348" strokeWidth="2" />
      {/* Screen */}
      <rect x="18" y="28" width="204" height="424" rx="28" fill="#0a0e17" />
      <rect x="18" y="28" width="204" height="424" rx="28" fill={`url(#screenGlow-${accent})`} />
      {/* Notch / camera */}
      <rect x="96" y="42" width="48" height="12" rx="6" fill="#1f2739" />
      {/* Screen content: simple app-like blocks */}
      <rect x="34" y="90" width="172" height="86" rx="16" fill="#151b2b" stroke="#252e44" />
      <rect x="34" y="188" width="82" height="60" rx="14" fill="#151b2b" stroke="#252e44" />
      <rect x="124" y="188" width="82" height="60" rx="14" fill="#151b2b" stroke="#252e44" />
      <rect x="34" y="260" width="172" height="36" rx="10" fill={accent} opacity="0.9" />
      <rect x="34" y="308" width="120" height="14" rx="7" fill="#232c40" />
      <rect x="34" y="332" width="90" height="14" rx="7" fill="#1a2233" />
      {/* Camera bump (back hinted at edge) */}
      <circle cx="120" cy="465" r="3" fill="#2a3348" />
    </svg>
  );
}

export default PhoneMockup;
