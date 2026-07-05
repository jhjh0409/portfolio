import type { AppDef } from "../apps";
import { MobileIcon } from "./MobileIcon";

/** The springboard: wallpaper, app grid, page dots, glass dock. */
export function MobileHome({
  apps,
  dockApps,
  onOpen,
}: {
  apps: AppDef[];
  dockApps: AppDef[];
  onOpen: (id: string, rect?: DOMRect) => void;
}) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/tahoe-8bit.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          imageRendering: "pixelated",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(6,10,18,.14), rgba(6,10,18,.10) 55%, rgba(6,10,18,.42))",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,.10) 0px, rgba(0,0,0,.10) 1px, transparent 1px, transparent 3px)",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          paddingTop: 66,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "22px 8px",
            padding: "10px 18px 0",
          }}
        >
          {apps.map((a) => (
            <MobileIcon
              key={a.id}
              id={a.id}
              accent={a.accent}
              label={a.title}
              onTap={(rect) => onOpen(a.id, rect)}
            />
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 14 }}>
          <span
            style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,.9)" }}
          />
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(255,255,255,.35)",
            }}
          />
        </div>

        <div
          className="mos-glassbar"
          style={{
            margin: "0 16px 26px",
            display: "flex",
            justifyContent: "center",
            gap: 30,
            padding: 12,
            borderRadius: 30,
            background: "rgba(160,170,190,.13)",
            border: "1px solid rgba(255,255,255,.15)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,.2), 0 6px 18px rgba(0,0,0,.3)",
          }}
        >
          {dockApps.map((a) => (
            <MobileIcon
              key={a.id}
              id={a.id}
              accent={a.accent}
              onTap={(rect) => onOpen(a.id, rect)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
