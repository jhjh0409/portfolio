import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

/** A full-screen app: zooms open from the tapped icon, glass nav header, content. */
export function MobileAppView({
  title,
  accent,
  origin,
  canBack,
  onBack,
  onHome,
  children,
}: {
  title: string;
  accent: string;
  origin: { cx: number; cy: number; scale: number } | null;
  canBack: boolean;
  onBack: () => void;
  onHome: () => void;
  children: ReactNode;
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const reduce =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Zoom open from the tapped icon (or a gentle scale-in when there's no origin).
  const anim: CSSProperties = reduce
    ? {}
    : {
        transformOrigin: origin ? `${origin.cx}px ${origin.cy}px` : "50% 42%",
        transform: shown ? "scale(1)" : `scale(${origin ? origin.scale : 0.94})`,
        opacity: shown ? 1 : 0,
        transition: shown
          ? "transform 0.34s cubic-bezier(0.2,0.8,0.2,1), opacity 0.24s ease"
          : "none",
      };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        background: "#15171b",
        overflow: "hidden",
        paddingTop: 46,
        ...anim,
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
