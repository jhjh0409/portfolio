export type AppId = "terminal" | "about" | "experience" | "projects" | "tech" | "blog" | "contact";

export interface AppDef {
  id: AppId;
  title: string;
  accent: string;
  /** default window geometry (desktop) */
  def: { x: number; y: number; w: number; h: number };
}

/** Registry — order drives dock + desktop-icon layout. */
export const apps: AppDef[] = [
  { id: "terminal", title: "Terminal", accent: "#3ddc91", def: { x: 54, y: 64, w: 640, h: 430 } },
  { id: "about", title: "About", accent: "#6ea8fe", def: { x: 150, y: 104, w: 600, h: 470 } },
  { id: "experience", title: "Work", accent: "#f2b65c", def: { x: 200, y: 84, w: 660, h: 500 } },
  { id: "projects", title: "Projects", accent: "#b08cff", def: { x: 250, y: 118, w: 700, h: 500 } },
  { id: "tech", title: "Stack", accent: "#34d3c8", def: { x: 180, y: 128, w: 640, h: 460 } },
  { id: "blog", title: "Blog", accent: "#fb7aa0", def: { x: 230, y: 96, w: 600, h: 460 } },
  { id: "contact", title: "Contact", accent: "#3ddc91", def: { x: 300, y: 150, w: 520, h: 430 } },
];

export const appById = Object.fromEntries(apps.map((a) => [a.id, a])) as Record<AppId, AppDef>;

/** Titlebar caption + colour for each window, matching the design. */
export const windowTitle: Record<AppId, { text: string; color: string }> = {
  terminal: { text: "tjh@jinghuan — terminal — 80×24", color: "#3ddc91" },
  about: { text: "about_me.txt — less", color: "#6ea8fe" },
  experience: { text: "~/experience — git log", color: "#f2b65c" },
  projects: { text: "~/projects — ls -la", color: "#b08cff" },
  tech: { text: "neofetch — stack", color: "#34d3c8" },
  blog: { text: "~/blog — cat *.md", color: "#fb7aa0" },
  contact: { text: "~/contact — ssh", color: "#3ddc91" },
};
