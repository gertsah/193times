import { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * Unified section shell. Every block on the page uses this so the whole
 * site shares one rhythm: a thin top rule, an index + mono label on the
 * left, a serif lead statement, and the content beneath.
 */
export default function Section({
  id,
  index,
  label,
  lead,
  intro,
  children,
  className = "",
}: {
  id?: string;
  index: string;
  label: string;
  /** Serif headline — can include <em> for the ember accent word. */
  lead?: ReactNode;
  /** Optional supporting paragraph shown to the right of the lead. */
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      <div className="edge">
        <div className="py-20 md:py-28 lg:py-32">
          {/* Header — oversized index + full-bleed serif lead */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-ember">{index}</span>
            <span className="h-px flex-1 bg-line/0" />
            <span className="label">{label}</span>
          </div>

          {lead && (
            <div className="mt-7">
              <Reveal y={40}>
                <h2 className="display text-pretty text-[3rem] leading-[0.95] sm:text-7xl lg:text-[7rem] xl:text-[8rem]">
                  {lead}
                </h2>
              </Reveal>
              {intro && (
                <Reveal delay={0.12}>
                  <p className="mt-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:ml-auto md:text-xl">
                    {intro}
                  </p>
                </Reveal>
              )}
            </div>
          )}

          {children && <div className="mt-16 md:mt-24">{children}</div>}
        </div>
      </div>
    </section>
  );
}
