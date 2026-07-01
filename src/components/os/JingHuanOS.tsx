import { Component, createRef, type MouseEvent as ReactMouseEvent } from "react";
import { apps, appById, type AppId } from "./apps";
import { Lockscreen } from "./Lockscreen";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { DesktopIcons } from "./DesktopIcons";
import type { WindowChrome } from "./Window";
import { TerminalWindow, type TermLine } from "./windows/TerminalWindow";
import { AboutWindow } from "./windows/AboutWindow";
import { ExperienceWindow } from "./windows/ExperienceWindow";
import { ProjectsWindow } from "./windows/ProjectsWindow";
import { TechWindow } from "./windows/TechWindow";
import { BlogWindow } from "./windows/BlogWindow";
import { ContactWindow } from "./windows/ContactWindow";
import { ProjectDetailWindow } from "./windows/ProjectDetailWindow";
import { TypeTestWindow } from "./windows/TypeTestWindow";
import { projects, getProjectById, projectAccent } from "../../data/projects";

const GITHUB_URL = "https://github.com/jhjh0409";
const LINKEDIN_URL = "https://www.linkedin.com/in/jinghuan/";
const MONO = "'JetBrains Mono',monospace";

interface WinState {
  open?: boolean;
  x?: number;
  y?: number;
  z?: number;
  max?: boolean;
}

interface Drag {
  id: string;
  kind?: "icon";
  sx: number;
  sy: number;
  ox: number;
  oy: number;
  moved?: boolean;
}

interface Props {
  lockScreen?: boolean;
  startupApp?: AppId | "none";
}

interface State {
  booting: boolean;
  lockExit: boolean;
  now: Date | null;
  windows: Record<string, WinState>;
  zTop: number;
  activeId: string | null;
  zoomId: string | null;
  iconPos: Partial<Record<AppId, { x: number; y: number }>>;
  isMobile: boolean;
  cmd: string;
  history: string[];
  histIdx: number;
  lines: TermLine[];
}

/** JingHuanOS — a desktop-OS portfolio. Port of the Design-Composer DCLogic. */
export class JingHuanOS extends Component<Props, State> {
  private inputRef = createRef<HTMLInputElement>();
  private dragging: Drag | null = null;
  private clockT: ReturnType<typeof setInterval> | null = null;
  private zoomT: ReturnType<typeof setTimeout> | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      booting: true,
      lockExit: false,
      now: null,
      windows: {},
      zTop: 20,
      activeId: null,
      zoomId: null,
      iconPos: {},
      isMobile: false,
      cmd: "",
      history: [],
      histIdx: -1,
      lines: [],
    };
  }

  componentDidMount() {
    this.setState({ now: new Date() });
    this.detectMobile();
    window.addEventListener("resize", this.onResize);
    document.addEventListener("mousemove", this.onMove);
    document.addEventListener("mouseup", this.onUp);
    this.clockT = setInterval(() => this.setState({ now: new Date() }), 15000);
    if (this.props.lockScreen === false) this.finishBoot();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
    document.removeEventListener("mousemove", this.onMove);
    document.removeEventListener("mouseup", this.onUp);
    if (this.clockT) clearInterval(this.clockT);
    if (this.zoomT) clearTimeout(this.zoomT);
  }

  // ---- time helpers -------------------------------------------------------
  private fmtClock(d: Date) {
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, "0");
    const ap = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${m} ${ap}`;
  }

  // ---- responsiveness -----------------------------------------------------
  // Re-render on every resize so maximized windows (pixel-sized, for the zoom
  // animation) keep tracking the viewport.
  private onResize = () => this.setState({ isMobile: window.innerWidth < 760 });

  private detectMobile() {
    const m = window.innerWidth < 760;
    if (m !== this.state.isMobile) this.setState({ isMobile: m });
  }

  // ---- dragging -----------------------------------------------------------
  private onMove = (e: MouseEvent) => {
    const d = this.dragging;
    if (!d) return;
    const nx = d.ox + (e.clientX - d.sx);
    const ny = d.oy + (e.clientY - d.sy);
    if (Math.abs(e.clientX - d.sx) + Math.abs(e.clientY - d.sy) > 4) d.moved = true;
    if (d.kind === "icon") {
      const px = Math.max(2, Math.min(window.innerWidth - 78, nx));
      const py = Math.max(34, Math.min(window.innerHeight - 88, ny));
      this.setState((s) => ({ iconPos: { ...s.iconPos, [d.id]: { x: px, y: py } } }));
    } else {
      this.setState((s) => ({
        windows: { ...s.windows, [d.id]: { ...s.windows[d.id], x: nx, y: Math.max(32, ny) } },
      }));
    }
  };

  private onUp = () => {
    const d = this.dragging;
    this.dragging = null;
    if (d && d.kind === "icon" && !d.moved) this.openApp(d.id);
  };

  /** Geometry + accent for any window id — apps come from the registry, project:<id> is computed. */
  private winMeta(id: string): {
    def: { x: number; y: number; w: number; h: number };
    accent: string;
  } {
    if (id.startsWith("project:")) {
      const pid = id.slice("project:".length);
      const i = Math.max(
        0,
        projects.findIndex((p) => p.id === pid),
      );
      // cascade so stacked project windows don't perfectly overlap
      return {
        def: { x: 180 + i * 26, y: 70 + i * 22, w: 720, h: 560 },
        accent: projectAccent(pid),
      };
    }
    const app = appById[id as AppId];
    return { def: app.def, accent: app.accent };
  }

  private defaultPos(id: string) {
    const def = this.winMeta(id).def;
    if (id === "terminal") {
      return {
        x: Math.max(8, Math.round((window.innerWidth - def.w) / 2)),
        y: Math.max(42, Math.round((window.innerHeight - def.h) / 2 - 16)),
      };
    }
    return { x: def.x, y: def.y };
  }

  private startDrag(id: string, e: ReactMouseEvent) {
    if (this.state.isMobile) return;
    e.preventDefault();
    const cur = this.state.windows[id] || {};
    const def = this.defaultPos(id);
    this.dragging = { id, sx: e.clientX, sy: e.clientY, ox: cur.x ?? def.x, oy: cur.y ?? def.y };
  }

  private iconDefault(id: AppId) {
    const order = apps.filter((a) => a.id !== "terminal").map((a) => a.id);
    const i = order.indexOf(id);
    return { x: 14, y: 46 + i * 80 };
  }

  private startIconDrag = (id: AppId, e: ReactMouseEvent) => {
    if (this.state.isMobile) return;
    e.preventDefault();
    const cur = this.state.iconPos[id] || this.iconDefault(id);
    this.dragging = { id, kind: "icon", sx: e.clientX, sy: e.clientY, ox: cur.x, oy: cur.y };
  };

  // ---- lock / boot --------------------------------------------------------
  private unlock() {
    if (this.state.lockExit) return;
    this.setState({ lockExit: true });
    setTimeout(() => this.finishBoot(), 470);
  }

  private finishBoot() {
    if (!this.state.booting) return;
    const s0 = this.props.startupApp ?? "terminal";
    const start = (s0 === "work" ? "experience" : s0) as AppId | "none";
    this.setState(
      (s) => {
        const next: Partial<State> = {
          booting: false,
          lines: [
            { text: "JingHuanOS 2.6  (tty1)", color: "#e9ebef" },
            {
              text: "Type 'help' to list commands — or click any app in the dock.",
              color: "#9aa0ac",
            },
            { text: "Last login: today on tty1", color: "#6b707b" },
            { text: "", color: "#c7ccd4" },
          ],
        };
        if (start && start !== "none") {
          const z = s.zTop + 1;
          next.windows = { ...s.windows, [start]: { ...(s.windows[start] || {}), open: true, z } };
          next.zTop = z;
          next.activeId = start as AppId;
        }
        return next as State;
      },
      () => {
        if (start === "terminal") setTimeout(() => this.focusInput(), 30);
      },
    );
  }

  // ---- window management --------------------------------------------------
  private openApp(id: string) {
    this.setState(
      (s) => {
        const z = s.zTop + 1;
        return {
          windows: { ...s.windows, [id]: { ...s.windows[id], open: true, z } },
          zTop: z,
          activeId: id,
        };
      },
      () => {
        if (id === "terminal") setTimeout(() => this.focusInput(), 30);
      },
    );
  }

  private openProject(id: string) {
    this.openApp("project:" + id);
  }

  private closeApp(id: string) {
    this.setState((s) => ({ windows: { ...s.windows, [id]: { ...s.windows[id], open: false } } }));
  }

  private focusApp(id: string) {
    this.setState((s) => {
      const z = s.zTop + 1;
      return { windows: { ...s.windows, [id]: { ...s.windows[id], z } }, zTop: z, activeId: id };
    });
  }

  private toggleMax(id: string) {
    // Flip max + arm the zoom transition in one commit; the window is already
    // mounted, so CSS animates from its current rect to the new one. Disarm the
    // transition afterwards so it never lags dragging.
    this.setState((s) => {
      const z = s.zTop + 1;
      const cur = s.windows[id] || {};
      return {
        windows: { ...s.windows, [id]: { ...cur, max: !cur.max, z } },
        zTop: z,
        activeId: id,
        zoomId: id,
      };
    });
    if (this.zoomT) clearTimeout(this.zoomT);
    this.zoomT = setTimeout(() => this.setState({ zoomId: null }), 260);
  }

  private dockClick = (id: AppId) => {
    const cur = this.state.windows[id];
    if (cur && cur.open) {
      if (this.state.activeId === id) this.closeApp(id);
      else this.focusApp(id);
    } else this.openApp(id);
  };

  private buildStyle(id: string): React.CSSProperties {
    const s = this.state.windows[id] || {};
    const meta = this.winMeta(id);
    const def = meta.def;
    const accent = meta.accent;
    const base: React.CSSProperties = {
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      border: "1px solid #2b2f37",
      borderTop: `2px solid ${accent}`,
      borderRadius: 10,
      boxShadow: "0 16px 40px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.04)",
      zIndex: s.z || 10,
      transition:
        this.state.zoomId === id
          ? "left .22s ease, top .22s ease, width .22s ease, height .22s ease"
          : undefined,
    };
    if (this.state.isMobile || s.max) {
      // Pixel dimensions (not right/bottom + auto) so the zoom transition can interpolate.
      const pad = 8;
      const top = 38;
      const bottomGap = 86;
      return {
        ...base,
        left: pad,
        top,
        width: window.innerWidth - pad * 2,
        height: window.innerHeight - top - bottomGap,
      };
    }
    const def0 = this.defaultPos(id);
    return {
      ...base,
      left: s.x ?? def0.x,
      top: s.y ?? def0.y,
      width: def.w,
      height: def.h,
    };
  }

  private chromeFor(id: string): WindowChrome {
    return {
      style: this.buildStyle(id),
      onDrag: (e) => this.startDrag(id, e),
      onFocus: () => this.focusApp(id),
      onClose: () => this.closeApp(id),
      onMin: () => this.closeApp(id),
      onMax: () => this.toggleMax(id),
    };
  }

  // ---- terminal -----------------------------------------------------------
  private focusInput() {
    this.inputRef.current?.focus();
  }

  private out(text: string, color?: string): TermLine {
    return { text, color: color || "#c7ccd4" };
  }

  private pushLines(arr: TermLine[]) {
    this.setState((s) => ({ lines: [...s.lines, ...arr].slice(-260) }));
  }

  private runCommand = (raw: string) => {
    const input = (raw ?? "").trim();
    this.setState((s) => ({
      lines: [...s.lines, { text: "tjh@jinghuan:~$ " + input, color: "#e9ebef" }].slice(-260),
    }));
    if (!input) return;
    const parts = input.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = (parts[1] || "").toLowerCase();
    const O = (t: string, c?: string) => this.out(t, c);

    switch (cmd) {
      case "help":
      case "?":
        this.pushLines([
          O("Available commands:", "#7d828c"),
          O("  about        — who I am"),
          O("  experience   — work history (alias: work)"),
          O("  projects     — things I built"),
          O("  tech         — my stack (alias: neofetch)"),
          O("  blog         — recent writing"),
          O("  contact      — say hello"),
          O("  type         — typing speed test"),
          O("  open <app>   — launch a window"),
          O("  ls · clear · whoami · date · echo"),
          O("Tip: every app is clickable in the dock below.", "#6b707b"),
        ]);
        break;
      case "about":
      case "whoami":
        this.openApp("about");
        this.pushLines([
          O(
            "› Tok Jing Huan — aspiring SWE & former motion designer. Opening about_me.txt …",
            "#9aa0ac",
          ),
        ]);
        break;
      case "experience":
      case "work":
      case "exp":
        this.openApp("experience");
        this.pushLines([O("› CPF Board · GenVoice — opening work log …", "#9aa0ac")]);
        break;
      case "projects":
      case "project":
        if (arg && getProjectById(arg)) {
          this.openProject(arg);
          this.pushLines([O("› opening ~/projects/" + arg + " …", "#9aa0ac")]);
        } else {
          this.openApp("projects");
          this.pushLines([
            arg
              ? O("› no project '" + arg + "' — opening ~/projects …", "#9aa0ac")
              : O("› opening ~/projects …", "#9aa0ac"),
          ]);
        }
        break;
      case "tech":
      case "skills":
      case "stack":
      case "neofetch":
        this.openApp("tech");
        this.pushLines([O("› fetching system specs …", "#9aa0ac")]);
        break;
      case "blog":
      case "blogs":
        this.openApp("blog");
        this.pushLines([O("› tailing blog feed …", "#9aa0ac")]);
        break;
      case "contact":
      case "socials":
      case "social":
      case "email":
        this.openApp("contact");
        this.pushLines([O("› opening secure channel …", "#9aa0ac")]);
        break;
      case "type":
      case "typetest":
      case "mtype":
        this.openApp("typetest");
        this.pushLines([O("› launching typing test — go fast …", "#9aa0ac")]);
        break;
      case "open":
      case "launch": {
        const map: Record<string, AppId> = {
          terminal: "terminal",
          about: "about",
          work: "experience",
          experience: "experience",
          projects: "projects",
          project: "projects",
          tech: "tech",
          stack: "tech",
          blog: "blog",
          contact: "contact",
          type: "typetest",
          typetest: "typetest",
        };
        const target = map[arg];
        if (target) {
          this.openApp(target);
          this.pushLines([O("› launching " + target + " …", "#9aa0ac")]);
        } else if (getProjectById(arg)) {
          this.openProject(arg);
          this.pushLines([O("› launching project " + arg + " …", "#9aa0ac")]);
        } else {
          this.pushLines([
            O(
              "open: unknown app '" + arg + "'. try: about, projects, tech, blog, contact",
              "#ff8a7a",
            ),
          ]);
        }
        break;
      }
      case "ls":
      case "dir":
        this.pushLines([
          O("about/   experience/   projects/   tech/   blog/   contact/", "#6ea8fe"),
        ]);
        break;
      case "github":
        window.open(GITHUB_URL, "_blank");
        this.pushLines([O("› opening github.com/jhjh0409 …", "#9aa0ac")]);
        break;
      case "linkedin":
        window.open(LINKEDIN_URL, "_blank");
        this.pushLines([O("› opening linkedin.com/in/jinghuan …", "#9aa0ac")]);
        break;
      case "date":
        this.pushLines([O(new Date().toString())]);
        break;
      case "echo":
        this.pushLines([O(input.slice(5))]);
        break;
      case "clear":
      case "cls":
        this.setState({ lines: [] });
        break;
      case "sudo":
        this.pushLines([
          O("tjh is not in the sudoers file. This incident will be reported. 🙂", "#ff8a7a"),
        ]);
        break;
      case "pwd":
        this.pushLines([O("/home/tjh")]);
        break;
      case "history":
        this.pushLines(this.state.history.map((h) => O("  " + h, "#6b707b")));
        break;
      default:
        this.pushLines([O("command not found: " + cmd + " — type 'help' for options", "#ff8a7a")]);
    }
  };

  private onCmdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ cmd: e.target.value });
  };

  private onCmdKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const v = this.state.cmd;
      this.runCommand(v);
      this.setState((s) => ({
        cmd: "",
        history: [...s.history, v].filter(Boolean).slice(-60),
        histIdx: -1,
      }));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const h = this.state.history;
      if (!h.length) return;
      const idx = this.state.histIdx < 0 ? h.length - 1 : Math.max(0, this.state.histIdx - 1);
      this.setState({ histIdx: idx, cmd: h[idx] });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const h = this.state.history;
      if (this.state.histIdx < 0) return;
      const idx = this.state.histIdx + 1;
      if (idx >= h.length) this.setState({ histIdx: -1, cmd: "" });
      else this.setState({ histIdx: idx, cmd: h[idx] });
    }
  };

  render() {
    const { booting, lockExit, now, isMobile } = this.state;
    const unlocked = !booting;
    const showIcons = unlocked && !isMobile;

    const clock = now ? this.fmtClock(now) : "";
    const lockClock = clock.replace(/ (AM|PM)$/, "");
    const lockDate = now
      ? now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
      : "";
    const menuDate = now
      ? now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
      : "";

    const isOpen = Object.fromEntries(
      apps.map((a) => [a.id, !!this.state.windows[a.id]?.open]),
    ) as Record<AppId, boolean>;

    const desktopIcons = apps
      .filter((a) => a.id !== "terminal")
      .map((a) => {
        const pos = this.state.iconPos[a.id] || this.iconDefault(a.id);
        return { id: a.id, title: a.title, accent: a.accent, x: pos.x, y: pos.y };
      });

    const chipLabels = [
      "help",
      "about",
      "projects",
      "experience",
      "tech",
      "blog",
      "contact",
      "type",
      "clear",
    ];
    const chips = chipLabels.map((label) => ({
      label,
      run: () => {
        this.runCommand(label);
        this.focusInput();
      },
    }));

    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#0c0d10",
          color: "#c7ccd4",
          fontFamily: MONO,
          fontSize: 14,
          lineHeight: 1.5,
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        {/* desktop wallpaper */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/tahoe-8bit.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            imageRendering: "pixelated",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 70% at 50% 45%, rgba(6,10,18,.34) 0%, rgba(6,10,18,.22) 45%, rgba(6,10,18,.4) 100%), linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.26))",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg, rgba(0,0,0,.10) 0px, rgba(0,0,0,.10) 1px, transparent 1px, transparent 3px)",
            pointerEvents: "none",
            opacity: 0.35,
            zIndex: 0,
          }}
        />

        {unlocked && (
          <MenuBar onOpen={(id) => this.openApp(id)} menuDate={menuDate} clock={clock} />
        )}

        {showIcons && <DesktopIcons icons={desktopIcons} onIconDown={this.startIconDrag} />}

        {booting && (
          <Lockscreen
            topClock={clock}
            lockClock={lockClock}
            lockDate={lockDate}
            battery="100%"
            exiting={lockExit}
            onUnlock={() => this.unlock()}
          />
        )}

        {isOpen.terminal && (
          <TerminalWindow
            chrome={this.chromeFor("terminal")}
            lines={this.state.lines}
            cmd={this.state.cmd}
            inputRef={this.inputRef}
            onCmdChange={this.onCmdChange}
            onCmdKey={this.onCmdKey}
            onFocusInput={() => this.focusInput()}
            chips={chips}
          />
        )}
        {isOpen.about && (
          <AboutWindow chrome={this.chromeFor("about")} onOpen={(id) => this.openApp(id)} />
        )}
        {isOpen.experience && <ExperienceWindow chrome={this.chromeFor("experience")} />}
        {isOpen.projects && (
          <ProjectsWindow
            chrome={this.chromeFor("projects")}
            onOpenProject={(id) => this.openProject(id)}
          />
        )}
        {isOpen.tech && <TechWindow chrome={this.chromeFor("tech")} />}
        {isOpen.blog && <BlogWindow chrome={this.chromeFor("blog")} />}
        {isOpen.contact && <ContactWindow chrome={this.chromeFor("contact")} />}
        {isOpen.typetest && <TypeTestWindow chrome={this.chromeFor("typetest")} />}

        {Object.keys(this.state.windows)
          .filter((k) => k.startsWith("project:") && this.state.windows[k]?.open)
          .map((k) => {
            const project = getProjectById(k.slice("project:".length));
            if (!project) return null;
            return <ProjectDetailWindow key={k} project={project} chrome={this.chromeFor(k)} />;
          })}

        {unlocked && <Dock isOpen={isOpen} onDockClick={this.dockClick} />}
      </div>
    );
  }
}

export default JingHuanOS;
