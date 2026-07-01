import type { RefObject, KeyboardEvent, ChangeEvent } from "react";
import { Window, type WindowChrome } from "../Window";
import { windowTitle } from "../apps";

export interface TermLine {
  text: string;
  color: string;
}
export interface TermChip {
  label: string;
  run: () => void;
}

export function TerminalWindow({
  chrome,
  lines,
  cmd,
  inputRef,
  onCmdChange,
  onCmdKey,
  onFocusInput,
  chips,
}: {
  chrome: WindowChrome;
  lines: TermLine[];
  cmd: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onCmdChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCmdKey: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocusInput: () => void;
  chips: TermChip[];
}) {
  const t = windowTitle.terminal;
  return (
    <Window chrome={chrome} title={t.text} titleColor={t.color}>
      <div
        onClick={onFocusInput}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 16px",
          background: "#15171b",
          fontSize: 13.5,
        }}
      >
        {lines.map((ln, i) => (
          <div
            key={i}
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              color: ln.color,
              minHeight: 20,
            }}
          >
            {ln.text}
          </div>
        ))}
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
    </Window>
  );
}
