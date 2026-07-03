import { Window, type WindowChrome } from "../Window";
import { windowTitle } from "../apps";
import { experiences } from "../../../data/experience";

/** Inner content — reused standalone in a window and inline in the terminal. */
export function ExperienceContent() {
  return (
    <div style={{ padding: "22px 24px", fontSize: 13 }}>
      <div style={{ color: "#6b707b", marginBottom: 18 }}>
        $ git log --oneline --author=&quot;jinghuan&quot;
      </div>
      {experiences.map((exp, i) => {
        const last = i === experiences.length - 1;
        return (
          <div key={exp.company} style={{ display: "flex", gap: 14, marginBottom: last ? 0 : 24 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 4,
              }}
            >
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#f2b65c" }} />
              {!last && <span style={{ flex: 1, width: 1, background: "#262a31", marginTop: 4 }} />}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: 6,
                }}
              >
                <span style={{ color: "#f2b65c", fontWeight: 700, fontSize: 15 }}>
                  {exp.company}
                </span>
                <span style={{ color: "#7d828c", fontSize: 12 }}>{exp.period}</span>
              </div>
              <div style={{ color: "#f2b65c", fontSize: 12.5, margin: "2px 0 8px" }}>
                {exp.role}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  margin: "0 0 10px",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {exp.highlights.map((h, hi) => (
                  <li
                    key={hi}
                    style={{
                      display: "flex",
                      gap: 8,
                      color: "#b7bcc5",
                      lineHeight: 1.55,
                    }}
                  >
                    <span aria-hidden style={{ color: "#f2b65c", flexShrink: 0 }}>
                      ▸
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 10.5,
                      padding: "2px 7px",
                      border: "1px solid #34405a",
                      borderRadius: 3,
                      color: "#9db4d8",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ExperienceWindow({ chrome }: { chrome: WindowChrome }) {
  const t = windowTitle.experience;
  return (
    <Window chrome={chrome} title={t.text} titleColor={t.color}>
      <div style={{ flex: 1, overflowY: "auto", background: "#15171b" }}>
        <ExperienceContent />
      </div>
    </Window>
  );
}
