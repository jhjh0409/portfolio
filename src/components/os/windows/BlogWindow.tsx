import { Window, type WindowChrome } from "../Window";
import { windowTitle } from "../apps";
import { blogPosts } from "../../../data/blog";

export function BlogWindow({ chrome }: { chrome: WindowChrome }) {
  const t = windowTitle.blog;
  return (
    <Window chrome={chrome} title={t.text} titleColor={t.color}>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "22px 24px",
          background: "#15171b",
          fontSize: 13,
        }}
      >
        <div style={{ color: "#6b707b", marginBottom: 18 }}>$ tail -f ~/blog/feed.log</div>
        {blogPosts.map((post, i) => (
          <div
            key={post.title}
            className="jhos-blog"
            style={{
              borderLeft: "2px solid #262a31",
              padding: "2px 0 2px 16px",
              marginBottom: i === blogPosts.length - 1 ? 0 : 18,
            }}
          >
            <div style={{ color: "#fb7aa0", fontSize: 11.5 }}>{post.date}</div>
            <div style={{ color: "#e9ebef", fontWeight: 700, fontSize: 14.5, margin: "2px 0 4px" }}>
              {post.title}
            </div>
            <div style={{ color: "#b7bcc5", lineHeight: 1.55 }}>{post.excerpt}</div>
          </div>
        ))}
        <div style={{ color: "#5a5f6a", marginTop: 20, fontSize: 12 }}>
          — more essays in the works —
        </div>
      </div>
    </Window>
  );
}
