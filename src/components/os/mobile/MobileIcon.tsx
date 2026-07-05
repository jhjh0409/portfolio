import type { CSSProperties } from "react";
import { AppIcon } from "../icons";
import type { AppId } from "../apps";

/** A Liquid-Glass springboard/dock tile that reuses the desktop AppIcon glyph. */
export function MobileIcon({
  id,
  accent,
  onTap,
  tile = 56,
  glyph = 27,
  label,
}: {
  id: AppId;
  accent: string;
  onTap: () => void;
  tile?: number;
  glyph?: number;
  label?: string;
}) {
  return (
    <button
      type="button"
      className="mos-tile"
      onClick={onTap}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 7,
        padding: 0,
        border: "none",
        background: "none",
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        fontFamily: "inherit",
      }}
    >
      <span
        className="mos-icon"
        style={
          {
            "--a": accent,
            width: tile,
            height: tile,
            borderRadius: Math.round(tile * 0.27),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          } as CSSProperties
        }
      >
        <span
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            filter: "drop-shadow(0 1px 1px rgba(0,0,0,.32))",
          }}
        >
          <AppIcon id={id} size={glyph} />
        </span>
      </span>
      {label && (
        <span
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,.94)",
            textShadow: "0 1px 2px rgba(0,0,0,.6)",
            letterSpacing: 0.2,
          }}
        >
          {label}
        </span>
      )}
    </button>
  );
}
