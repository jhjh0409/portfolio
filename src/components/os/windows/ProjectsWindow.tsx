import { Window, type WindowChrome } from "../Window";
import { windowTitle } from "../apps";
import { projects, projectAccent } from "../../../data/projects";

export function ProjectsWindow({
  chrome,
  onOpenProject,
}: {
  chrome: WindowChrome;
  onOpenProject: (id: string) => void;
}) {
  const t = windowTitle.projects;
  return (
    <Window chrome={chrome} title={t.text} titleColor={t.color}>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px", background: "#15171b" }}>
        <div style={{ color: "#6b707b", marginBottom: 16, fontSize: 13 }}>
          $ ls ~/projects
          <span style={{ color: "#5a5f6a", marginLeft: 10 }}>
            # drwxr-xr-x · {projects.length} items
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(248px,1fr))",
            gap: 14,
          }}
        >
          {projects.map((p) => {
            const accent = projectAccent(p.id);
            return (
              <div
                key={p.id}
                role="button"
                tabIndex={0}
                onClick={() => onOpenProject(p.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpenProject(p.id);
                  }
                }}
                className="jhos-card"
                style={{
                  border: "1px solid #262a31",
                  borderRadius: 8,
                  padding: 16,
                  background: "#16181c",
                  cursor: "default",
                  outline: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <span style={{ color: accent, fontWeight: 700, fontSize: 15 }}>{p.title}</span>
                  <span style={{ color: "#6ea8fe", fontSize: 12 }}>→ details</span>
                </div>
                <p
                  style={{
                    color: "#b7bcc5",
                    fontSize: 12.5,
                    lineHeight: 1.55,
                    margin: "0 0 12px",
                  }}
                >
                  {p.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {p.tags.map((tag) => (
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
            );
          })}
        </div>
      </div>
    </Window>
  );
}
