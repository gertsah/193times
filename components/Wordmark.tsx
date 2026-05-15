import { CSSProperties } from "react";

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
 * 193T — square brand mark. Two color variants (default ink-on-bg, or
 * invert) and a wrapper container with rounded corners. Use as a small
 * "favicon-like" icon next to the wordmark or as a hover affordance.
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
      aria-label="193Times mark"
      style={{ width: size, height: size }}
      className={`group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[10px] ${
        invert ? "bg-ink text-bg" : "bg-bg text-ink"
      } border border-line ${className}`}
    >
      <span className="font-sans font-black tracking-[-0.06em] leading-none">
        <span className="text-[14px] md:text-[15px]">193</span>
        <span className="-ml-[1px] text-[14px] md:text-[15px]">T</span>
      </span>
    </span>
  );
}

export default Wordmark;
