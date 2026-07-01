import type { AppId } from "./apps";

/** Line-art app icons (ported from the design's iconFor). Inherit colour via currentColor. */
export function AppIcon({ id, size = 21 }: { id: AppId; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "terminal":
      return (
        <svg {...common}>
          <path d="M5 8l3.6 4L5 16" />
          <line x1={12} y1={16.2} x2={18} y2={16.2} />
        </svg>
      );
    case "about":
      return (
        <svg {...common}>
          <circle cx={12} cy={8} r={3.6} />
          <path d="M5 19.5c0-3.4 3-5.4 7-5.4s7 2 7 5.4" />
        </svg>
      );
    case "experience":
      return (
        <svg {...common}>
          <rect x={3} y={7.5} width={18} height={12} rx={2} />
          <path d="M8 7.5V5.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1={3} y1={12.5} x2={21} y2={12.5} />
        </svg>
      );
    case "projects":
      return (
        <svg {...common}>
          <path d="M12 3l8.5 4.7L12 12.4 3.5 7.7z" />
          <path d="M3.5 12l8.5 4.7 8.5-4.7" />
          <path d="M3.5 16.3l8.5 4.7 8.5-4.7" />
        </svg>
      );
    case "tech":
      return (
        <svg {...common}>
          <rect x={6.5} y={6.5} width={11} height={11} rx={1.5} />
          <rect x={10} y={10} width={4} height={4} rx={0.5} />
          <line x1={9.5} y1={3} x2={9.5} y2={5} />
          <line x1={14.5} y1={3} x2={14.5} y2={5} />
          <line x1={9.5} y1={19} x2={9.5} y2={21} />
          <line x1={14.5} y1={19} x2={14.5} y2={21} />
          <line x1={3} y1={9.5} x2={5} y2={9.5} />
          <line x1={3} y1={14.5} x2={5} y2={14.5} />
          <line x1={19} y1={9.5} x2={21} y2={9.5} />
          <line x1={19} y1={14.5} x2={21} y2={14.5} />
        </svg>
      );
    case "blog":
      return (
        <svg {...common}>
          <rect x={5} y={3} width={14} height={18} rx={2} />
          <line x1={9} y1={8} x2={15} y2={8} />
          <line x1={9} y1={12} x2={15} y2={12} />
          <line x1={9} y1={16} x2={13} y2={16} />
        </svg>
      );
    case "contact":
      return (
        <svg {...common}>
          <rect x={3} y={5} width={18} height={14} rx={2} />
          <path d="M3.6 7l8.4 5.6L20.4 7" />
        </svg>
      );
    default:
      return null;
  }
}
