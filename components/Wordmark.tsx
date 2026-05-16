import { CSSProperties } from "react";
import { asset } from "@/lib/asset";

type Props = {
  className?: string;
  style?: CSSProperties;
  /** Negative em between "193" and "Times". Default ~-0.04em (T just kisses 3). */
  overlap?: string;
};

/**
 * 193Times wordmark — bold geometric grotesk.
 *
 * Set in Geist Sans at its heaviest weight with tight negative tracking
 * so the typography reads as a custom mark. The "T" sits immediately
 * next to the "3" with a hair of overlap so the two glyphs touch but
 * don't crash into each other.
 */
export function Wordmark({
  className = "",
  style,
  overlap = "-0.04em",
}: Props) {
  return (
    <span
      role="img"
      aria-label="193Times"
      className={`inline-flex items-baseline whitespace-nowrap font-sans font-black leading-none tracking-[-0.05em] ${className}`}
      style={style}
    >
      <span className="inline-block">193</span>
      <span className="inline-block" style={{ marginLeft: overlap }}>
        Times
      </span>
    </span>
  );
}

/**
 * Square brand mark — the new Times logo lockup rendered inside a
 * rounded square frame. Has a default and an inverted (dark-on-light)
 * variant for use on light surfaces.
 */
export function Mark({
  className = "",
  invert = false,
  size = 36,
}: {
  className?: string;
  invert?: boolean;
  size?: number;
}) {
  return (
    <span
      role="img"
      aria-label="193 Times mark"
      style={{ width: size, height: size }}
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-line ${
        invert ? "bg-ink" : "bg-bg"
      } ${className}`}
    >
      <img
        src={asset("/media/logo.png")}
        alt=""
        aria-hidden
        draggable={false}
        className="h-full w-full object-contain"
        style={invert ? { filter: "invert(1)" } : undefined}
      />
    </span>
  );
}

export default Wordmark;
