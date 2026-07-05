import {
  useEffect,
  useRef,
  type RefObject,
  type KeyboardEvent,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { Window, type WindowChrome } from "../Window";
import { windowTitle, appById, type SectionId } from "../apps";

export interface TermText {
  text: string;
  color: string;
}
export interface TermBlock {
  block: SectionId;
}
/** A terminal output item: a coloured text line, or an inline-rendered app section. */
export type TermItem = TermText | TermBlock;
/** Text-line alias (used by the orchestrator's line helpers). */
export type TermLine = TermText;

export interface TermChip {
  label: string;
  run: () => void;
}

interface TerminalContentProps {
  items: TermItem[];
  cmd: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onCmdChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCmdKey: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocusInput: () => void;
  renderSection: (section: SectionId) => ReactNode;
  chips: TermChip[];
}

/** The terminal body — reused inside a desktop window and full-screen on mobile. */
export function TerminalContent({
  items,
  cmd,
  inputRef,
  onCmdChange,
  onCmdKey,
  onFocusInput,
  renderSection,
  chips,
}: TerminalContentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // keep the newest output (and the prompt) in view as items are appended
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [items]);

  return (
    <>
      <div
        ref={scrollRef}
        onClick={onFocusInput}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 16px",
          background: "#15171b",
          fontSize: 13.5,
        }}
      >
        {items.map((it, i) =>
          "block" in it ? (
            <div
              key={i}
              onClick={(e) => e.stopPropagation()}
              style={{
                margin: "6px 0 12px",
                borderLeft: `2px solid ${appById[it.block].accent}`,
                borderRadius: "0 6px 6px 0",
                background: "rgba(255,255,255,.015)",
              }}
            >
              {renderSection(it.block)}
            </div>
          ) : (
            <div
              key={i}
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                color: it.color,
                minHeight: 20,
              }}
            >
              {it.text}
            </div>
          ),
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 2 }}>
          <span style={{ color: "#3ddc91", whiteSpace: "nowrap" }}>tjh@jinghuan</span>
          <span style={{ color: "#6b707b" }}>:</span>
          <span style={{ color: "#6ea8fe" }}>~</span>
          <span style={{ color: "#3ddc91" }}>$</span>
          <input
            ref={inputRef}
            value={cmd}
            onChange={onCmdChange}
            onKeyDown={onCmdKey}
            spellCheck={false}
            autoComplete="off"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#c7ccd4",
              fontSize: 13.5,
              caretColor: "#3ddc91",
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          padding: "8px 12px",
          borderTop: "1px solid #1f232a",
          background: "#16181c",
        }}
      >
        {chips.map((ch) => (
          <span
            key={ch.label}
            className="jhos-chip"
            onClick={ch.run}
            style={{
              fontSize: 11.5,
              padding: "3px 9px",
              border: "1px solid #2b2f37",
              borderRadius: 3,
              color: "#aeb4be",
              cursor: "default",
              background: "rgba(255,255,255,.03)",
            }}
          >
            {ch.label}
          </span>
        ))}
      </div>
    </>
  );
}

export function TerminalWindow({
  chrome,
  ...rest
}: { chrome: WindowChrome } & TerminalContentProps) {
  const t = windowTitle.terminal;
  return (
    <Window chrome={chrome} title={t.text} titleColor={t.color}>
      <TerminalContent {...rest} />
    </Window>
  );
}
