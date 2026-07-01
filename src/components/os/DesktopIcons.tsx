import type { MouseEvent } from "react";
import type { AppId } from "./apps";
import { AppIcon } from "./icons";

export interface DesktopIcon {
  id: AppId;
  title: string;
  accent: string;
  x: number;
  y: number;
}

/** Draggable desktop icons down the left edge (hidden on mobile). */
export function DesktopIcons({
  icons,
  onIconDown,
}: {
  icons: DesktopIcon[];
  onIconDown: (id: AppId, e: MouseEvent) => void;
}) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none" }}>
      {icons.map((ic) => (
        <div
          key={ic.id}
          className="jhos-desktop-icon"
          onMouseDown={(e) => onIconDown(ic.id, e)}
          style={{
            position: "absolute",
            left: ic.x,
            top: ic.y,
            width: 74,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            padding: "6px 4px",
            borderRadius: 4,
            cursor: "default",
            pointerEvents: "auto",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              border: "1px solid rgba(255,255,255,.18)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,.08)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              color: ic.accent,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,.25), 0 4px 12px rgba(0,0,0,.3)",
            }}
          >
            <AppIcon id={ic.id} />
          </div>
          <span
            style={{
              fontSize: 11,
              color: "#e7ebf0",
              textAlign: "center",
              lineHeight: 1.1,
              textShadow: "0 1px 4px rgba(0,0,0,.8)",
            }}
          >
            {ic.title}
          </span>
        </div>
      ))}
    </div>
  );
}
