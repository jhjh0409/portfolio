import { Fragment } from "react";
import { Window, type WindowChrome } from "../Window";
import { windowTitle, type AppId } from "../apps";
import { about } from "../../../data/about";

const accentColor = { blue: "#6ea8fe", amber: "#f2b65c" } as const;

/** Inner content — reused standalone in a window and inline in the terminal. */
export function AboutContent({ onOpen }: { onOpen: (id: AppId) => void }) {
  return (
    <div style={{ padding: "22px 24px" }}>
      <div style={{ color: "#6b707b", fontSize: 12, marginBottom: 14 }}>
        tjh@jinghuan:~$ cat about_me.txt
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontWeight: 700,
          fontSize: 27,
          lineHeight: 1,
          color: "#e9ebef",
          letterSpacing: 0.3,
        }}
      >
        {about.name}
      </div>
      <div style={{ color: "#6ea8fe", margin: "6px 0 18px", fontSize: 13 }}>{about.tagline}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "4px 16px",
          fontSize: 13,
          marginBottom: 20,
          color: "#aeb4be",
        }}
      >
        {about.facts.map((f) => (
          <Fragment key={f.label}>
            <span style={{ color: "#6b707b" }}>{f.label}</span>
            <span style={f.online ? { color: "#3ddc91" } : undefined}>{f.value}</span>
          </Fragment>
        ))}
      </div>
      {about.bio.map((para, i) => (
        <p
          key={i}
          style={{
            color: "#b7bcc5",
            fontSize: 13.5,
            lineHeight: 1.65,
            margin: i === about.bio.length - 1 ? 0 : "0 0 14px",
          }}
        >
          {para.map((seg, j) => {
            if (seg.opens) {
              return (
                <span
                  key={j}
                  onClick={() => onOpen(seg.opens as AppId)}
                  style={{
                    color: accentColor[seg.accent ?? "blue"],
                    cursor: "default",
                    textDecoration: "underline",
                  }}
                >
                  {seg.text}
                </span>
              );
            }
            if (seg.accent) {
              return (
                <span key={j} style={{ color: accentColor[seg.accent] }}>
                  {seg.text}
                </span>
              );
            }
            return <span key={j}>{seg.text}</span>;
          })}
        </p>
      ))}
    </div>
  );
}

export function AboutWindow({
  chrome,
  onOpen,
}: {
  chrome: WindowChrome;
  onOpen: (id: AppId) => void;
}) {
  const t = windowTitle.about;
  return (
    <Window chrome={chrome} title={t.text} titleColor={t.color}>
      <div style={{ flex: 1, overflowY: "auto", background: "#15171b" }}>
        <AboutContent onOpen={onOpen} />
      </div>
    </Window>
  );
}
