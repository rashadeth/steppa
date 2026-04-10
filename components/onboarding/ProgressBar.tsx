"use client";

interface ProgressBarProps {
  step: number;
  total: number;
  light?: boolean; // light variant for dark backgrounds
}

export default function ProgressBar({ step, total, light = false }: ProgressBarProps) {
  const pct = Math.round((step / total) * 100);

  return (
    <div className="flex items-center gap-2 w-full">
      <span
        className={`font-[family-name:var(--font-manrope)] font-bold text-[13px] leading-5 text-center whitespace-nowrap shrink-0 ${
          light ? "text-white" : "text-[#5e160a]"
        }`}
      >
        {String(step).padStart(2, "0")}
      </span>

      <div className="flex-1 h-[6px] relative rounded-full overflow-hidden">
        <div
          className={`absolute inset-0 rounded-full ${
            light ? "bg-[rgba(255,243,239,0.49)]" : "bg-[#fff3ef]"
          }`}
        />
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: light ? "#ffb89e" : "#F16746",
          }}
        />
      </div>

      <span
        className={`font-[family-name:var(--font-manrope)] font-bold text-[13px] leading-5 text-center whitespace-nowrap shrink-0 ${
          light ? "text-white" : "text-[#9898ac]"
        }`}
      >
        {total}
      </span>
    </div>
  );
}
