import useCountUp from "../hooks/useCountUp";

interface StatCardProps {
  endValue: number;
  suffix: string;
  label: string;
  delay?: number;
  icon: React.ReactNode;
}

export default function StatCard({ endValue, suffix, label, delay = 0, icon }: StatCardProps) {
  const { count, ref } = useCountUp({ end: endValue, duration: 2000, delay });

  return (
    <div
      ref={ref}
      className="stat-card px-5 py-4 rounded-2xl text-center flex flex-col items-center gap-2 min-w-[100px]"
      style={{
        background: "rgba(26,31,46,0.75)",
        border: "1px solid rgba(245,158,11,0.3)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Icon */}
      <span className="text-amber-400 opacity-70 text-lg">{icon}</span>

      {/* Animated number */}
      <div className="flex items-baseline gap-0.5">
        <span
          className="text-2xl font-extrabold tabular-nums"
          style={{
            background: "linear-gradient(135deg, #f59e0b, #10b981)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {count}
        </span>
        <span className="text-amber-400 font-bold text-base">{suffix}</span>
      </div>

      {/* Label */}
      <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
        {label}
      </p>

      {/* Bottom glow bar */}
      <div
        className="w-full h-0.5 rounded-full mt-1"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent)",
        }}
      />
    </div>
  );
}
