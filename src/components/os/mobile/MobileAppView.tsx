import type { ReactNode } from "react";

/** A full-screen app: status-bar space, glass nav header, content, (home indicator lives in the shell). */
export function MobileAppView({
  title,
  accent,
  canBack,
  onBack,
  onHome,
  children,
}: {
  title: string;
  accent: string;
  canBack: boolean;
  onBack: () => void;
  onHome: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="mos-appview"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        background: "#15171b",
        overflow: "hidden",
        paddingTop: 46,
      }}
    >
      <div
        className="mos-glassbar"
        style={{
          height: 46,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          background: "rgba(24,27,32,.72)",
          borderBottom: "1px solid rgba(255,255,255,.06)",
          zIndex: 3,
        }}
      >
        <button
          type="button"
          onClick={canBack ? onBack : onHome}
          aria-label={canBack ? "Back" : "Home"}
          style={{
            width: 30,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            background: "none",
            color: "#8b93a3",
            fontSize: 22,
            cursor: "pointer",
            padding: 0,
            fontFamily: "inherit",
          }}
        >
          ‹
        </button>
        <span
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 13,
            color: accent,
            letterSpacing: 0.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </span>
        <span style={{ width: 30 }} />
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
}
