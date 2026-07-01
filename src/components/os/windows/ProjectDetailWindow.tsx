import { Window, type WindowChrome } from "../Window";
import { projectAccent, type Project } from "../../../data/projects";

const MONO = "'JetBrains Mono',monospace";

export function ProjectDetailWindow({
  chrome,
  project,
}: {
  chrome: WindowChrome;
  project: Project;
}) {
  const accent = projectAccent(project.id);
  const paragraphs = project.longDescription.split("\n\n");

  return (
    <Window chrome={chrome} title={`~/projects/${project.id} — README.md`} titleColor={accent}>
      <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px", background: "#15171b" }}>
        <div style={{ color: "#6b707b", fontSize: 12, marginBottom: 14 }}>
          $ cat ~/projects/{project.id}/README.md
        </div>

        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 24,
            lineHeight: 1.1,
            color: "#e9ebef",
            letterSpacing: 0.3,
          }}
        >
          {project.title}
        </div>
        <div style={{ color: accent, margin: "6px 0 18px", fontSize: 12.5 }}>
          {project.ref} · {project.category}
        </div>

        {paragraphs.map((para, i) => (
          <p
            key={i}
            style={{
              color: "#b7bcc5",
              fontSize: 13.5,
              lineHeight: 1.65,
              margin: i === paragraphs.length - 1 ? "0 0 18px" : "0 0 14px",
            }}
          >
            {para}
          </p>
        ))}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
          {project.tags.map((tag) => (
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

        {project.links.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 4 }}>
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="jhos-linkcard"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1px solid #262a31",
                  borderRadius: 6,
                  padding: "9px 14px",
                  background: "#16181c",
                  color: "#e9ebef",
                  fontSize: 12.5,
                }}
              >
                <span style={{ color: accent }}>›</span>
                {l.label}
                <span style={{ color: "#6ea8fe" }}>↗</span>
              </a>
            ))}
          </div>
        )}

        {project.images.length > 0 && (
          <div style={{ marginTop: 22 }}>
            <div style={{ color: "#6b707b", fontSize: 12, marginBottom: 10 }}>
              $ ls screenshots/
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))",
                gap: 10,
              }}
            >
              {project.images.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    border: "1px solid #262a31",
                    borderRadius: 6,
                    background: "#0f1115",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Window>
  );
}
