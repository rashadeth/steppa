"use client";

import { useLayoutEffect, useState } from "react";

interface ProgressBarProps {
  step: number;
  total: number;
  light?: boolean;
  /** Separate fill animation chains (intro onboarding vs goal setup). */
  progressGroup?: "intro" | "goal";
  /** Only for `goal` — bump when starting a new goal-setup session (new key in map). */
  progressRunId?: number;
}

const lastPctByKey = new Map<string, number>();

function storageKey(
  group: "intro" | "goal",
  total: number,
  runId: number,
): string {
  const run = group === "intro" ? 0 : runId;
  return `${group}:${total}:${run}`;
}

function clampPct(step: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((step / total) * 100)));
}

export default function ProgressBar({
  step,
  total,
  light = false,
  progressGroup = "intro",
  progressRunId = 0,
}: ProgressBarProps) {
  const key = storageKey(progressGroup, total, progressRunId);
  const targetPct = clampPct(step, total);

  const [fillPct, setFillPct] = useState(() => {
    const prev = lastPctByKey.get(key);
    return prev === undefined ? 0 : prev;
  });

  useLayoutEffect(() => {
    let cancelled = false;
    let outer = 0;
    let inner = 0;

    const from = lastPctByKey.get(key);

    const commit = (next: number) => {
      lastPctByKey.set(key, next);
      setFillPct(next);
    };

    const animateFromTo = (fromW: number, toW: number) => {
      setFillPct(fromW);
      outer = requestAnimationFrame(() => {
        if (cancelled) return;
        inner = requestAnimationFrame(() => {
          if (cancelled) return;
          commit(toW);
        });
      });
    };

    if (from === undefined) {
      animateFromTo(0, targetPct);
    } else if (from !== targetPct) {
      animateFromTo(from, targetPct);
    } else {
      commit(targetPct);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [key, targetPct]);

  return (
    <div className="flex w-full items-center gap-2">
      <span
        className={`shrink-0 whitespace-nowrap text-center font-[family-name:var(--font-manrope)] text-[13px] font-bold leading-5 ${
          light ? "text-white" : "text-[#5e160a]"
        }`}
      >
        {String(step).padStart(2, "0")}
      </span>

      <div className="relative h-[6px] flex-1 overflow-hidden rounded-full">
        <div
          className={`absolute inset-0 rounded-full ${
            light ? "bg-[rgba(255,243,239,0.49)]" : "bg-[#fff3ef]"
          }`}
        />
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none"
          style={{
            width: `${fillPct}%`,
            background: light ? "#ffb89e" : "#F16746",
          }}
        />
      </div>

      <span
        className={`shrink-0 whitespace-nowrap text-center font-[family-name:var(--font-manrope)] text-[13px] font-bold leading-5 ${
          light ? "text-white" : "text-[#9898ac]"
        }`}
      >
        {total}
      </span>
    </div>
  );
}
