import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Window, type WindowChrome } from "../Window";
import { windowTitle } from "../apps";
import { buildSequence } from "../../../data/typetest";

const ACCENT = "#e2b714";
const MUTED = "#565b66";
const CORRECT = "#d7dce3";
const INCORRECT = "#ff8a7a";

const TIME_OPTIONS = [15, 30, 60];
const WORD_OPTIONS = [25, 50];
const TIME_BUFFER = 80; // starting word buffer for timed mode (extended as needed)

interface Mode {
  kind: "time" | "words";
  value: number;
}
interface Stats {
  wpm: number;
  raw: number;
  acc: number;
  seconds: number;
  correct: number;
  incorrect: number;
}

function gen(mode: Mode): string[] {
  return buildSequence(mode.kind === "words" ? mode.value : TIME_BUFFER);
}

function computeStats(
  words: string[],
  committed: string[],
  input: string,
  index: number,
  elapsedSec: number,
): Stats {
  let charCorrect = 0;
  let charWrong = 0;
  let spaces = 0;
  let typedChars = 0;
  for (let i = 0; i < index; i++) {
    const target = words[i] ?? "";
    const got = committed[i] ?? "";
    typedChars += got.length;
    for (let j = 0; j < got.length; j++) {
      if (got[j] === target[j]) charCorrect++;
      else charWrong++;
    }
    spaces += 1; // a space was pressed to commit this word
  }
  const cur = words[index] ?? "";
  typedChars += input.length;
  for (let j = 0; j < input.length; j++) {
    if (input[j] === cur[j]) charCorrect++;
    else charWrong++;
  }
  const minutes = Math.max(elapsedSec, 0.001) / 60;
  const wpm = Math.max(0, Math.round((charCorrect + spaces) / 5 / minutes));
  const raw = Math.max(0, Math.round((typedChars + spaces) / 5 / minutes));
  const acc =
    charCorrect + charWrong > 0 ? Math.round((charCorrect / (charCorrect + charWrong)) * 100) : 100;
  return {
    wpm,
    raw,
    acc,
    seconds: Math.round(elapsedSec),
    correct: charCorrect,
    incorrect: charWrong,
  };
}

export function TypeTestWindow({ chrome }: { chrome: WindowChrome }) {
  const t = windowTitle.typetest;

  const [mode, setMode] = useState<Mode>({ kind: "time", value: 30 });
  const [words, setWords] = useState<string[]>(() => gen({ kind: "time", value: 30 }));
  const [committed, setCommitted] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [finished, setFinished] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [best, setBest] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  const restart = useCallback((next: Mode) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setMode(next);
    setWords(gen(next));
    setCommitted([]);
    setInput("");
    setWordIndex(0);
    setStartedAt(null);
    setNow(0);
    setFinished(false);
    setStats(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  // focus on mount
  useEffect(() => {
    focusInput();
  }, [focusInput]);

  // load personal best for the current mode
  const bestKey = `jhos-typetest-best-${mode.kind}-${mode.value}`;
  useEffect(() => {
    try {
      const v = localStorage.getItem(bestKey);
      setBest(v ? Number(v) : null);
    } catch {
      setBest(null);
    }
  }, [bestKey]);

  const finishWith = useCallback(
    (finalCommitted: string[], finalInput: string, finalIndex: number) => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      const end = Date.now();
      const elapsed = mode.kind === "time" ? mode.value : startedAt ? (end - startedAt) / 1000 : 0;
      const s = computeStats(words, finalCommitted, finalInput, finalIndex, elapsed);
      setStats(s);
      setFinished(true);
      try {
        if (best == null || s.wpm > best) {
          localStorage.setItem(bestKey, String(s.wpm));
          setBest(s.wpm);
        }
      } catch {
        /* ignore */
      }
    },
    [mode, startedAt, words, best, bestKey],
  );

  // live ticker
  useEffect(() => {
    if (startedAt == null || finished) return;
    timerRef.current = setInterval(() => setNow(Date.now()), 100);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startedAt, finished]);

  // end timed runs
  useEffect(() => {
    if (startedAt == null || finished || mode.kind !== "time") return;
    if ((now - startedAt) / 1000 >= mode.value) {
      finishWith(committed, input, wordIndex);
    }
  }, [now, startedAt, finished, mode, committed, input, wordIndex, finishWith]);

  // keep the caret in view
  useEffect(() => {
    caretRef.current?.scrollIntoView({ block: "nearest" });
  }, [wordIndex, input, words]);

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      restart(mode);
      return;
    }
    if (finished || e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key === "Backspace") {
      e.preventDefault();
      if (input.length > 0) {
        setInput(input.slice(0, -1));
      } else if (wordIndex > 0) {
        const prev = wordIndex - 1;
        setWordIndex(prev);
        setInput(committed[prev] ?? "");
        setCommitted(committed.slice(0, prev));
      }
      return;
    }

    if (e.key === " ") {
      e.preventDefault();
      if (input.length === 0) return;
      const nextCommitted = [...committed];
      nextCommitted[wordIndex] = input;
      const nextIndex = wordIndex + 1;
      setCommitted(nextCommitted);
      setInput("");
      setWordIndex(nextIndex);
      if (mode.kind === "words" && nextIndex >= words.length) {
        finishWith(nextCommitted, "", nextIndex);
      } else if (mode.kind === "time" && nextIndex >= words.length - 8) {
        setWords((w) => [...w, ...buildSequence(40)]);
      }
      return;
    }

    if (e.key.length === 1) {
      e.preventDefault();
      if (startedAt == null) {
        const t0 = Date.now();
        setStartedAt(t0);
        setNow(t0);
      }
      setInput(input + e.key);
    }
  };

  // ----- derived (live) -----
  const elapsed = startedAt == null ? 0 : Math.max(0, (now - startedAt) / 1000);
  const live = computeStats(words, committed, input, wordIndex, elapsed);
  const remaining = mode.kind === "time" ? Math.max(0, Math.ceil(mode.value - elapsed)) : null;

  const Caret = ({ active }: { active: boolean }) => (
    <span
      ref={active ? caretRef : undefined}
      style={{
        display: "inline-block",
        width: 0,
        borderLeft: `2px solid ${ACCENT}`,
        height: "1.1em",
        margin: "0 -1px",
        verticalAlign: "text-bottom",
        animation: startedAt == null ? "blink 1s step-end infinite" : "none",
      }}
    />
  );

  const renderWord = (target: string, got: string, active: boolean, key: number) => {
    const len = Math.max(target.length, got.length);
    const chars = [];
    for (let j = 0; j < len; j++) {
      if (active && j === got.length) chars.push(<Caret key={`c${j}`} active />);
      const tc = target[j];
      const gc = got[j];
      let color = MUTED;
      if (gc !== undefined) color = tc === undefined ? INCORRECT : gc === tc ? CORRECT : INCORRECT;
      chars.push(
        <span key={j} style={{ color }}>
          {tc ?? gc}
        </span>,
      );
    }
    if (active && got.length >= len) chars.push(<Caret key="cend" active />);
    return (
      <span key={key} style={{ marginRight: "0.65ch", whiteSpace: "nowrap" }}>
        {chars}
      </span>
    );
  };

  const chip = (label: string, isActive: boolean, onClick: () => void) => (
    <span
      key={label}
      className="jhos-chip"
      onClick={onClick}
      style={{
        fontSize: 11.5,
        padding: "3px 9px",
        border: `1px solid ${isActive ? ACCENT : "#2b2f37"}`,
        borderRadius: 3,
        color: isActive ? ACCENT : "#aeb4be",
        cursor: "default",
        background: isActive ? "rgba(226,183,20,.08)" : "rgba(255,255,255,.03)",
      }}
    >
      {label}
    </span>
  );

  return (
    <Window chrome={chrome} title={t.text} titleColor={t.color}>
      <div
        onClick={focusInput}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "18px 22px",
          background: "#15171b",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* hidden capture input (keeps mobile keyboard available) */}
        <input
          ref={inputRef}
          value=""
          onChange={() => {}}
          onKeyDown={onKey}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="typing test input"
          style={{ position: "absolute", opacity: 0, width: 1, height: 1, pointerEvents: "none" }}
        />

        {/* mode selector */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 6,
            marginBottom: 16,
          }}
        >
          <span style={{ color: "#6b707b", fontSize: 11.5, marginRight: 2 }}>time</span>
          {TIME_OPTIONS.map((v) =>
            chip(String(v), mode.kind === "time" && mode.value === v, () =>
              restart({ kind: "time", value: v }),
            ),
          )}
          <span style={{ width: 10 }} />
          <span style={{ color: "#6b707b", fontSize: 11.5, marginRight: 2 }}>words</span>
          {WORD_OPTIONS.map((v) =>
            chip(String(v), mode.kind === "words" && mode.value === v, () =>
              restart({ kind: "words", value: v }),
            ),
          )}
        </div>

        {finished && stats ? (
          <div style={{ paddingTop: 10 }}>
            <div style={{ color: "#6b707b", fontSize: 12 }}>wpm</div>
            <div
              style={{
                fontFamily: "'VT323',monospace",
                fontSize: 74,
                lineHeight: 1,
                color: ACCENT,
                textShadow: "0 2px 14px rgba(226,183,20,.25)",
              }}
            >
              {stats.wpm}
            </div>
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 14, fontSize: 13 }}
            >
              <span style={{ color: "#aeb4be" }}>
                <span style={{ color: "#6b707b" }}>acc </span>
                {stats.acc}%
              </span>
              <span style={{ color: "#aeb4be" }}>
                <span style={{ color: "#6b707b" }}>raw </span>
                {stats.raw}
              </span>
              <span style={{ color: "#aeb4be" }}>
                <span style={{ color: "#6b707b" }}>time </span>
                {stats.seconds}s
              </span>
              <span style={{ color: "#aeb4be" }}>
                <span style={{ color: "#6b707b" }}>chars </span>
                <span style={{ color: "#3ddc91" }}>{stats.correct}</span>
                <span style={{ color: "#6b707b" }}>/</span>
                <span style={{ color: INCORRECT }}>{stats.incorrect}</span>
              </span>
              {best != null && (
                <span style={{ color: "#aeb4be" }}>
                  <span style={{ color: "#6b707b" }}>best </span>
                  {best}
                </span>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 20 }}>
              <span
                className="jhos-linkcard"
                onClick={() => restart(mode)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1px solid #262a31",
                  borderRadius: 6,
                  padding: "8px 16px",
                  background: "#16181c",
                  color: "#e9ebef",
                  fontSize: 13,
                  cursor: "default",
                }}
              >
                <span style={{ color: ACCENT }}>↻</span> restart
              </span>
              <span style={{ color: "#5a5f6a", fontSize: 12 }}>tab — restart</span>
            </div>
          </div>
        ) : (
          <>
            {/* live status */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 16,
                marginBottom: 12,
                height: 26,
              }}
            >
              <span
                style={{
                  color: ACCENT,
                  fontFamily: "'VT323',monospace",
                  fontSize: 26,
                  lineHeight: 1,
                }}
              >
                {mode.kind === "time" ? `${remaining}` : `${wordIndex}/${words.length}`}
              </span>
              {startedAt != null && (
                <span style={{ color: "#6b707b", fontSize: 12.5 }}>{live.wpm} wpm</span>
              )}
            </div>

            {/* words */}
            <div
              className="jhos-noscroll"
              style={{
                height: "5.4em",
                overflowY: "auto",
                fontSize: 21,
                lineHeight: 1.75,
                color: MUTED,
                letterSpacing: 0.2,
              }}
            >
              {words.map((w, wi) =>
                renderWord(
                  w,
                  wi < wordIndex ? (committed[wi] ?? "") : wi === wordIndex ? input : "",
                  wi === wordIndex,
                  wi,
                ),
              )}
            </div>

            <div style={{ color: "#5a5f6a", fontSize: 12, marginTop: 14 }}>
              {startedAt == null ? "click here and start typing" : "tab — restart"}
            </div>
          </>
        )}
      </div>
    </Window>
  );
}
