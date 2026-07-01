import { apps, type AppId } from "./apps";
import { AppIcon } from "./icons";

/** Bottom dock — every app, with an open-indicator dot. */
export function Dock({
  isOpen,
  onDockClick,
}: {
  isOpen: Record<AppId, boolean>;
  onDockClick: (id: AppId) => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 14,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "flex-end",
        gap: 8,
        padding: "8px 12px",
        background: "rgba(255,255,255,.1)",
        border: "1px solid rgba(255,255,255,.18)",
        borderRadius: 18,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        zIndex: 9000,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.25), 0 8px 28px rgba(0,0,0,.4)",
      }}
    >
      {apps.map((a) => (
        <div
          key={a.id}
          onClick={() => onDockClick(a.id)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            cursor: "default",
            position: "relative",
          }}
        >
          <div
            className="jhos-dock-icon"
            title={a.title}
            style={{
              width: 42,
              height: 42,
              border: "1px solid rgba(255,255,255,.18)",
              borderRadius: 11,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,.08)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: a.accent,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,.22)",
            }}
          >
            <AppIcon id={a.id} />
          </div>
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: isOpen[a.id] ? a.accent : "transparent",
            }}
          />
        </div>
      ))}
    </div>
  );
}
