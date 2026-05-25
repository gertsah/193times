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

/* Animated node graph — floating centerpiece for "Автоматизации" */
export function AutomationGraph() {
  const nodes = [
    { x: 12, y: 22, label: "FORM" },
    { x: 50, y: 9, label: "AI" },
    { x: 88, y: 24, label: "CRM" },
    { x: 8, y: 64, label: "BOT" },
    { x: 92, y: 66, label: "MAIL" },
    { x: 50, y: 91, label: "DASH" },
  ];
  const center = { x: 50, y: 50 };
  return (
    <div className="relative aspect-square w-full">
      {/* soft glow behind the core */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,69,36,0.18), transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        {/* concentric rings */}
        {[20, 32, 44].map((r) => (
          <circle
            key={r}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="rgb(var(--c-ember))"
            strokeOpacity="0.12"
            strokeWidth="0.4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {/* connectors */}
        {nodes.map((n, i) => (
          <line
            key={i}
            x1={n.x}
            y1={n.y}
            x2={center.x}
            y2={center.y}
            stroke="rgb(var(--c-ember))"
            strokeOpacity="0.5"
            strokeWidth="1"
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
            style={{ animation: `dashFlow ${2 + i * 0.25}s linear infinite` }}
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
            className="block h-2.5 w-2.5 rounded-full bg-ember shadow-[0_0_10px_rgba(255,69,36,0.6)]"
            style={{ animation: `nodePulse ${2 + i * 0.35}s ease-in-out infinite` }}
          />
          <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.22em] text-faint">
            {n.label}
          </span>
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ember/50 bg-bg/60 font-mono text-[10px] text-ember backdrop-blur">
        193
      </div>
    </div>
  );
}
