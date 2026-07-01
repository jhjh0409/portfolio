import type { CSSProperties, ReactNode, MouseEvent } from "react";

/** Everything the orchestrator hands a window to place, drag, focus and control it. */
export interface WindowChrome {
  style: CSSProperties;
  onDrag: (e: MouseEvent) => void;
  onFocus: () => void;
  onClose: () => void;
  onMin: () => void;
  onMax: () => void;
}

function TrafficLight({ bg, glyph, onClick }: { bg: string; glyph: string; onClick: () => void }) {
  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: bg,
        cursor: "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span className="g">{glyph}</span>
    </span>
  );
}

/** macOS-style window: accent-topped frame, draggable title bar, traffic lights. */
export function Window({
  chrome,
  title,
  titleColor,
  children,
}: {
  chrome: WindowChrome;
  title: string;
  titleColor: string;
  children: ReactNode;
}) {
  return (
    <div className="win" style={chrome.style} onMouseDown={chrome.onFocus}>
      <div
        onMouseDown={chrome.onDrag}
        style={{
          height: 30,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 10px",
          background: "#1b1e23",
          borderBottom: "1px solid #262a31",
          cursor: "default",
        }}
      >
        <div className="tl" style={{ display: "flex", gap: 7 }}>
          <TrafficLight bg="#ff5f57" glyph="✕" onClick={chrome.onClose} />
          <TrafficLight bg="#febc2e" glyph="−" onClick={chrome.onMin} />
          <TrafficLight bg="#28c840" glyph="+" onClick={chrome.onMax} />
        </div>
        <span
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 12.5,
            color: titleColor,
            letterSpacing: 0.5,
          }}
        >
          {title}
        </span>
        <span style={{ width: 54 }} />
      </div>
      {children}
    </div>
  );
}
