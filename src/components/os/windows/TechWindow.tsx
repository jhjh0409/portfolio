import { Window, type WindowChrome } from "../Window";
import { windowTitle } from "../apps";
import { catArt, stackInfo, stackGroups } from "../../../data/stack";

export function TechWindow({ chrome }: { chrome: WindowChrome }) {
  const t = windowTitle.tech;
  return (
    <Window chrome={chrome} title={t.text} titleColor={t.color}>
      <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px", background: "#15171b" }}>
        <div style={{ display: "flex", gap: 22, flexWrap: "wrap", marginBottom: 18 }}>
          <pre
            style={{
              margin: 0,
              color: "#34d3c8",
              fontSize: 12,
              lineHeight: 1.1,
              fontFamily: "'JetBrains Mono',monospace",
            }}
          >
            {catArt}
          </pre>
          <div style={{ fontSize: 13, lineHeight: 1.7 }}>
            <div style={{ color: "#34d3c8", fontWeight: 700 }}>tjh@jinghuan</div>
            <div style={{ color: "#262a31" }}>--------------------</div>
            {stackInfo.map((info) => (
              <div key={info.label}>
                <span style={{ color: info.accent }}>{info.label}</span>
                <span style={{ color: "#6b707b" }}>: </span>
                {info.value}
              </div>
            ))}
          </div>
        </div>
        {stackGroups.map((g, i) => (
          <div key={g.label} style={{ marginBottom: i === stackGroups.length - 1 ? 0 : 14 }}>
            <div style={{ color: g.accent, fontSize: 12, marginBottom: 7 }}>› {g.label}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {g.items.map((it) => (
                <span
                  key={it.name}
                  className="jhos-tech-chip"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 11.5,
                    padding: "3px 9px",
                    border: "1px solid #2b3b44",
                    borderRadius: 3,
                    color: "#bfeae6",
                    background: "rgba(52,211,200,.06)",
                  }}
                >
                  {it.icon && (
                    <img
                      src={it.icon}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className={`jhos-tech-logo${it.dark ? " dark" : ""}`}
                      style={{ width: 15, height: 15, objectFit: "contain" }}
                    />
                  )}
                  {it.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Window>
  );
}
