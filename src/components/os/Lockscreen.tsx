const MONO = "'JetBrains Mono',monospace";

/** The boot lock screen — click the avatar to log in. */
export function Lockscreen({
  topClock,
  lockClock,
  lockDate,
  battery,
  exiting,
  onUnlock,
}: {
  topClock: string;
  lockClock: string;
  lockDate: string;
  battery: string;
  exiting: boolean;
  onUnlock: () => void;
}) {
  return (
    <div
      className={`lockscreen${exiting ? " exit" : ""}`}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 9500,
        overflow: "hidden",
        fontFamily: MONO,
      }}
    >
      {/* wallpaper */}
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
            "radial-gradient(ellipse 75% 60% at 50% 50%, rgba(6,10,18,.78) 0%, rgba(6,10,18,.55) 40%, rgba(6,10,18,.34) 75%), linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.3) 30%, rgba(0,0,0,.55))",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,.10) 0px, rgba(0,0,0,.10) 1px, transparent 1px, transparent 3px)",
          pointerEvents: "none",
          opacity: 0.4,
        }}
      />

      {/* top status strip */}
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
          padding: "0 16px",
          fontFamily: MONO,
          fontSize: 12.5,
          color: "rgba(255,255,255,.95)",
          textShadow: "0 1px 4px rgba(0,0,0,.7)",
          zIndex: 3,
        }}
      >
        <span style={{ fontWeight: 700 }}>◉ siteOS</span>
        <span style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <span>{battery}</span>
          <span>{topClock}</span>
        </span>
      </div>

      {/* centered login */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          zIndex: 3,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 13,
              letterSpacing: 3,
              color: "rgba(255,255,255,.85)",
              textTransform: "uppercase",
              textShadow: "0 1px 6px rgba(0,0,0,.7)",
            }}
          >
            {lockDate}
          </div>
          <div
            style={{
              fontFamily: "'VT323',monospace",
              fontSize: 108,
              lineHeight: 1,
              color: "#fff",
              textShadow: "0 3px 18px rgba(0,0,0,.65), 0 1px 2px rgba(0,0,0,.8)",
            }}
          >
            {lockClock}
          </div>
        </div>

        <div
          onClick={onUnlock}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 13,
            cursor: "default",
          }}
        >
          <div
            className="jhos-avatar"
            style={{
              width: 104,
              height: 104,
              borderRadius: "50%",
              background: "linear-gradient(160deg,#3a4670,#222a4a)",
              border: "2px solid rgba(255,255,255,.35)",
              boxShadow: "0 8px 30px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'VT323',monospace",
                fontSize: 54,
                color: "#cdd6ff",
                textShadow: "0 2px 10px rgba(120,150,255,.6)",
              }}
            >
              G
            </span>
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 16,
              fontWeight: 700,
              color: "#fff",
              textShadow: "0 1px 6px rgba(0,0,0,.7)",
            }}
          >
            Guest
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 12.5,
              color: "rgba(255,255,255,.75)",
              textShadow: "0 1px 5px rgba(0,0,0,.7)",
            }}
          >
            Click to log in
          </div>
        </div>
      </div>
    </div>
  );
}
