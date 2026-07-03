import type { CSSProperties, ReactNode, MouseEvent } from "react";

export type ResizeEdge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

/** Everything the orchestrator hands a window to place, drag, focus, resize and control it. */
export interface WindowChrome {
  style: CSSProperties;
  onDrag: (e: MouseEvent) => void;
  onFocus: () => void;
  onClose: () => void;
  onMin: () => void;
  onMax: () => void;
  onResizeStart: (edge: ResizeEdge, e: MouseEvent) => void;
  resizable: boolean;
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

// Thin invisible hit-zones along the frame. Top handles stay above the traffic
// lights (which begin ~9px down), so the close/min/max buttons stay clickable.
const RESIZE_HANDLES: { edge: ResizeEdge; style: CSSProperties; cursor: string }[] = [
  { edge: "n", style: { top: 0, left: 12, right: 12, height: 6 }, cursor: "ns-resize" },
  { edge: "s", style: { bottom: 0, left: 12, right: 12, height: 6 }, cursor: "ns-resize" },
  { edge: "w", style: { left: 0, top: 8, bottom: 12, width: 6 }, cursor: "ew-resize" },
  { edge: "e", style: { right: 0, top: 8, bottom: 12, width: 6 }, cursor: "ew-resize" },
  { edge: "nw", style: { top: 0, left: 0, width: 12, height: 8 }, cursor: "nwse-resize" },
  { edge: "ne", style: { top: 0, right: 0, width: 12, height: 8 }, cursor: "nesw-resize" },
  { edge: "sw", style: { bottom: 0, left: 0, width: 14, height: 14 }, cursor: "nesw-resize" },
  { edge: "se", style: { bottom: 0, right: 0, width: 14, height: 14 }, cursor: "nwse-resize" },
];

function ResizeHandles({ onStart }: { onStart: (edge: ResizeEdge, e: MouseEvent) => void }) {
  return (
    <>
      {RESIZE_HANDLES.map((h) => (
        <div
          key={h.edge}
          onMouseDown={(e) => onStart(h.edge, e)}
          style={{ position: "absolute", zIndex: 20, cursor: h.cursor, ...h.style }}
        />
      ))}
    </>
  );
}

/** macOS-style window: accent-topped frame, draggable title bar, traffic lights, edge-resize. */
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
        onDoubleClick={chrome.onMax}
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
      {chrome.resizable && <ResizeHandles onStart={chrome.onResizeStart} />}
    </div>
  );
}
