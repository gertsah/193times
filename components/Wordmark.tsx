import { CSSProperties } from "react";
import { asset } from "@/lib/asset";

const LOGO_SRC = asset("/media/logo.png");
const LOGO_ASPECT = 1013 / 489;

type WordmarkProps = {
  className?: string;
  style?: CSSProperties;
  overlap?: string;
};

/**
 * 193Times wordmark — full brand lockup image. Height is driven by
 * the CSS font-size on the wrapper (1em on the img), so existing
 * `text-[24px]` / `text-[12vw]` classes still control sizing.
 */
export function Wordmark({ className = "", style }: WordmarkProps) {
  return (
    <span
      role="img"
      aria-label="193 Times"
      className={`inline-flex items-center leading-none whitespace-nowrap ${className}`}
      style={style}
    >
      <img
        src={LOGO_SRC}
        alt=""
        aria-hidden
        draggable={false}
        style={{ height: "1em", width: `calc(1em * ${LOGO_ASPECT})` }}
      />
    </span>
  );
}

/**
 * Square mark — same logo, framed in a small rounded box. Used as a
 * compact decorative element next to captions in Footer / Manifesto.
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
        src={LOGO_SRC}
        alt=""
        aria-hidden
        draggable={false}
        className="max-h-[78%] max-w-[78%] object-contain"
        style={invert ? { filter: "invert(1)" } : undefined}
      />
    </span>
  );
}

export default Wordmark;
