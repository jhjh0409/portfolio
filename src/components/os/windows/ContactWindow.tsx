import { Window, type WindowChrome } from "../Window";
import { windowTitle } from "../apps";
import { contactLinks } from "../../../data/contact";

const badge: Record<string, { text: string; color: string }> = {
  GitHub: { text: "GH", color: "#b08cff" },
  LinkedIn: { text: "in", color: "#6ea8fe" },
  Email: { text: "@", color: "#3ddc91" },
};

export function ContactWindow({ chrome }: { chrome: WindowChrome }) {
  const t = windowTitle.contact;
  return (
    <Window chrome={chrome} title={t.text} titleColor={t.color}>
      <div style={{ flex: 1, overflowY: "auto", padding: 24, background: "#15171b" }}>
        <div style={{ color: "#6b707b", marginBottom: 6, fontSize: 13 }}>$ whoami --contact</div>
        <div
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontWeight: 700,
            fontSize: 23,
            color: "#e9ebef",
            marginBottom: 4,
          }}
        >
          Let&apos;s build something.
        </div>
        <p style={{ color: "#b7bcc5", fontSize: 13, lineHeight: 1.6, margin: "0 0 22px" }}>
          Open to internships, collaborations, or a good chat about tech & design. Pick a channel:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {contactLinks.map((c) => {
            const b = badge[c.label] ?? { text: c.label.slice(0, 2), color: "#6ea8fe" };
            return (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="jhos-linkcard"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  border: "1px solid #262a31",
                  borderRadius: 8,
                  padding: "14px 16px",
                  background: "#16181c",
                }}
              >
                <span
                  style={{
                    width: 34,
                    height: 34,
                    border: "1px solid #2b2f37",
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: b.color,
                    fontWeight: 700,
                  }}
                >
                  {b.text}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#e9ebef", fontWeight: 700, fontSize: 14 }}>{c.label}</div>
                  <div style={{ color: "#9aa0ac", fontSize: 12 }}>{c.handle}</div>
                </div>
                <span style={{ color: "#6ea8fe" }}>↗</span>
              </a>
            );
          })}
        </div>
        <div style={{ marginTop: 22, color: "#5a5f6a", fontSize: 12.5, whiteSpace: "pre-wrap" }}>
          {'> echo "hi jing huan" | mail -s "let\'s talk" tjh\n'}
          <span style={{ color: "#3ddc91" }}>message queued ✓</span>
        </div>
      </div>
    </Window>
  );
}
