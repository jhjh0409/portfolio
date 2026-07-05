import type { ReactNode } from "react";
import type { AppDef } from "../apps";
import { MobileHome } from "./MobileHome";
import { MobileAppView } from "./MobileAppView";
import { MobileStatusBar } from "./MobileStatusBar";

const MONO = "'JetBrains Mono',monospace";

/** The phone shell: springboard when the stack is empty, otherwise the top app full-screen. */
export function MobileShell({
  time,
  apps,
  dockApps,
  stack,
  onOpen,
  onBack,
  onHome,
  renderApp,
  metaOf,
}: {
  time: string;
  apps: AppDef[];
  dockApps: AppDef[];
  stack: string[];
  onOpen: (id: string) => void;
  onBack: () => void;
  onHome: () => void;
  renderApp: (id: string) => ReactNode;
  metaOf: (id: string) => { text: string; color: string };
}) {
  const current = stack[stack.length - 1];
  const inApp = stack.length > 0;
  const meta = current ? metaOf(current) : null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background: "#0c0d10",
        fontFamily: MONO,
        color: "#c7ccd4",
      }}
    >
      {inApp && meta ? (
        <MobileAppView
          key={current}
          title={meta.text}
          accent={meta.color}
          canBack={stack.length > 1}
          onBack={onBack}
          onHome={onHome}
        >
          {renderApp(current)}
        </MobileAppView>
      ) : (
        <MobileHome apps={apps} dockApps={dockApps} onOpen={onOpen} />
      )}

      <MobileStatusBar time={time} />

      <div
        onClick={inApp ? onHome : undefined}
        style={{
          position: "absolute",
          left: "50%",
          bottom: 8,
          transform: "translateX(-50%)",
          width: 120,
          height: 5,
          borderRadius: 3,
          background: "rgba(255,255,255,.55)",
          zIndex: 11,
          cursor: inApp ? "pointer" : "default",
        }}
      />
    </div>
  );
}
