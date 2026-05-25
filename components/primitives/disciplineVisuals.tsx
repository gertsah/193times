import Image from "next/image";
import { asset } from "@/lib/asset";

/* Photo grid — for the "Визуалы и дизайн" block. */
const VISUALS = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];

export function VisualsTiles() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {VISUALS.map((n, i) => (
        <div
          key={n}
          className="group relative aspect-square overflow-hidden border border-line"
        >
          <Image
            src={asset(`/media/visuals/${n}.png`)}
            alt=""
            fill
            sizes="(min-width:768px) 18vw, 30vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        </div>
      ))}
    </div>
  );
}

/* Animated node graph — for the "Автоматизации" block */
export function AutomationGraph() {
  const nodes = [
    { x: 16, y: 26, label: "FORM" },
    { x: 50, y: 14, label: "AI" },
    { x: 84, y: 28, label: "CRM" },
    { x: 26, y: 76, label: "BOT" },
    { x: 76, y: 80, label: "MAIL" },
  ];
  const center = { x: 50, y: 50 };
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-card">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {nodes.map((n, i) => (
          <line
            key={i}
            x1={n.x}
            y1={n.y}
            x2={center.x}
            y2={center.y}
            stroke="rgb(var(--c-ember))"
            strokeOpacity="0.45"
            strokeWidth="1"
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
            style={{ animation: `dashFlow ${2 + i * 0.3}s linear infinite` }}
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <span
            className="block h-2 w-2 rounded-full bg-ember"
            style={{ animation: `nodePulse ${2 + i * 0.4}s ease-in-out infinite` }}
          />
          <span className="absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
            {n.label}
          </span>
        </div>
      ))}
      <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ember/50 bg-ember/10 font-mono text-[9px] text-ember">
        193
      </div>
      <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
        flow.run()
      </span>
    </div>
  );
}
