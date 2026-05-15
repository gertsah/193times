import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** "slow" doubles the loop time. */
  speed?: "default" | "slow";
  className?: string;
  /** Reverse direction. */
  reverse?: boolean;
};

export function Marquee({
  children,
  speed = "default",
  className = "",
  reverse = false,
}: Props) {
  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      role="marquee"
      aria-hidden
    >
      <div
        className={`flex w-max ${
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee"
        } ${reverse ? "[animation-direction:reverse]" : ""}
        group-hover:[animation-play-state:paused]`}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Marquee;
