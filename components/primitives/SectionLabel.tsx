import { ReactNode } from "react";

type Props = {
  index?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Editorial section marker — a paragraph-style label used at the top
 * of every block to give the page a publication/issue rhythm.
 */
export function SectionLabel({ index, children, className = "" }: Props) {
  return (
    <div
      className={`marginalia flex items-center gap-3 ${className}`}
    >
      {index && (
        <span className="text-ember/90">§{index}</span>
      )}
      <span className="h-px w-8 bg-line" aria-hidden />
      <span className="text-muted">{children}</span>
    </div>
  );
}

export default SectionLabel;
