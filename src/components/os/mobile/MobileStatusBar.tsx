/** iOS-style status bar: time left, signal/wifi/battery right. Sits above the shell. */
export function MobileStatusBar({ time }: { time: string }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 46,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 24px 0",
        color: "#fff",
        fontSize: 13,
        fontWeight: 600,
        zIndex: 10,
        textShadow: "0 1px 3px rgba(0,0,0,.5)",
        pointerEvents: "none",
      }}
    >
      <span style={{ fontVariantNumeric: "tabular-nums", letterSpacing: 0.3 }}>{time}</span>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="#fff" aria-hidden="true">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0.5" width="3" height="11.5" rx="1" />
        </svg>
        <svg
          width="17"
          height="12"
          viewBox="0 0 17 12"
          fill="none"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M2 4.2a10 10 0 0 1 13 0" />
          <path d="M4.5 7a6 6 0 0 1 8 0" />
          <path d="M7 9.6a2.4 2.4 0 0 1 3 0" />
        </svg>
        <svg width="26" height="13" viewBox="0 0 26 13" aria-hidden="true">
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="12"
            rx="3"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.6"
          />
          <rect x="2.5" y="2.5" width="15" height="8" rx="1.5" fill="#fff" />
          <rect x="24" y="4" width="2" height="5" rx="1" fill="#fff" fillOpacity="0.7" />
        </svg>
      </span>
    </div>
  );
}
