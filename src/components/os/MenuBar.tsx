import type { AppId } from "./apps";

const linkStyle = {
  color: "#dfe3ea",
  cursor: "default" as const,
  textShadow: "0 1px 3px rgba(0,0,0,.5)",
};

/** Translucent top menu bar shown once unlocked. */
export function MenuBar({
  onOpen,
  menuDate,
  clock,
}: {
  onOpen: (id: AppId) => void;
  menuDate: string;
  clock: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 12px",
        background: "rgba(255,255,255,.08)",
        borderBottom: "1px solid rgba(255,255,255,.14)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.18)",
        zIndex: 9000,
        fontSize: 13,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <span
          style={{
            color: "#ffffff",
            fontWeight: 700,
            letterSpacing: 0.5,
            textShadow: "0 1px 3px rgba(0,0,0,.5)",
          }}
        >
          ◉ JingHuanOS
        </span>
        <span className="jhos-menu-link" style={linkStyle} onClick={() => onOpen("about")}>
          About
        </span>
        <span className="jhos-menu-link" style={linkStyle} onClick={() => onOpen("projects")}>
          Projects
        </span>
        <span className="jhos-menu-link" style={linkStyle} onClick={() => onOpen("experience")}>
          Work
        </span>
        <span className="jhos-menu-link" style={linkStyle} onClick={() => onOpen("contact")}>
          Contact
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "#dfe3ea",
          textShadow: "0 1px 3px rgba(0,0,0,.5)",
        }}
      >
        <span style={{ color: "#b6bcc6" }}>tjh@jinghuan</span>
        <span style={{ color: "#3ddc91" }}>●</span>
        <span style={{ color: "#dfe3ea" }}>{menuDate}</span>
        <span style={{ minWidth: 74, textAlign: "right", color: "#ffffff" }}>{clock}</span>
      </div>
    </div>
  );
}
