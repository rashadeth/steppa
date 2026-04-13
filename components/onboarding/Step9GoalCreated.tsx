"use client";

import { useEffect, useState } from "react";
import {
  LockFilledIcon,
  SneakerFilledIcon,
  CalendarFilledIcon,
  RunnerFilledIcon,
} from "./icons";

const goalSuccessIllustration = "/goal-success.svg";

interface Props {
  stepGoal: number;
  lockAmount: number;
  duration?: number | "custom";
  onNext: () => void;
}

// ─── Confetti ────────────────────────────────────────────────

const COLORS = [
  "#f16746", "#ffdd57", "#57e5a0", "#ffb89e",
  "#ffd9cc", "#ffffff", "#f7c59f", "#a8edbe",
  "#ffc2e0", "#b5d5ff",
];
const SHAPES = ["rect", "square", "circle"] as const;

interface Piece {
  id: number;
  x: number;       // left % across screen
  dx: number;      // total horizontal drift (px) over the fall
  r0: number;      // start rotation (deg)
  spin: number;    // total spin (deg)
  dur: number;     // fall duration (s)
  delay: number;   // stagger (s)
  w: number;
  h: number;
  color: string;
  shape: (typeof SHAPES)[number];
}

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function makePieces(n: number): Piece[] {
  return Array.from({ length: n }, (_, i) => {
    const shape = SHAPES[i % 3];
    const base = rand(6, 14);
    return {
      id: i,
      x: rand(0, 100),
      dx: rand(-80, 80),
      r0: rand(-180, 180),
      spin: rand(360, 1080) * (Math.random() > 0.5 ? 1 : -1),
      dur: rand(2.2, 5.0),
      delay: rand(0, 3.5),
      w: shape === "rect" ? rand(3, 5) : base,
      h: shape === "rect" ? rand(14, 28) : base,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape,
    };
  });
}

function durationLabel(d?: number | "custom") {
  if (!d || d === "custom") return "Custom";
  return `${d} days`;
}

function durationDays(d?: number | "custom") {
  if (!d || d === "custom") return 28;
  return d;
}

// ─── Component ────────────────────────────────────────────────

export default function Step9GoalCreated({ stepGoal, lockAmount, duration, onNext }: Props) {
  const [pieces] = useState<Piece[]>(() => makePieces(90));
  const [mounted, setMounted] = useState(false);
  const days = durationDays(duration);
  const weeks = Math.max(1, Math.round(days / 7));
  const weeklyTarget = stepGoal * 7;
  const totalTarget = weeklyTarget * weeks;

  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-[#5e160a]">

      {/* Keyframes */}
      <style>{`
        @keyframes confetti-rain {
          0% {
            transform: translateY(-50px) translateX(0px) rotate(var(--r0)) scale(0);
            opacity: 0;
          }
          6% {
            transform: translateY(5px) translateX(0px) rotate(var(--r0)) scale(1.12);
            opacity: 1;
          }
          12% {
            transform: translateY(15px) translateX(calc(var(--dx) * 0.08px)) rotate(calc(var(--r0) + var(--spin) * 0.1deg)) scale(1);
          }
          100% {
            transform: translateY(115vh) translateX(calc(var(--dx) * 1px)) rotate(calc(var(--r0) + var(--spin) * 1deg)) scale(0.85);
            opacity: 0;
          }
        }
        .crain {
          position: absolute;
          top: 0;
          will-change: transform, opacity;
          animation: confetti-rain var(--dur) var(--delay) cubic-bezier(0.45, 0, 0.9, 0.6) both infinite;
        }

        @keyframes hero-pop {
          0%   { transform: scale(0.35) rotate(-12deg); opacity: 0; }
          50%  { transform: scale(1.15) rotate(5deg);   opacity: 1; }
          72%  { transform: scale(0.94) rotate(-2deg); }
          100% { transform: scale(1)    rotate(0deg);   opacity: 1; }
        }
        .hero-pop { animation: hero-pop 0.6s 0.05s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .su1 { animation: slide-up 0.46s 0.20s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .su2 { animation: slide-up 0.46s 0.32s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .su3 { animation: slide-up 0.46s 0.44s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .su4 { animation: slide-up 0.46s 0.56s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .su5 { animation: slide-up 0.46s 0.68s cubic-bezier(0.22, 1, 0.36, 1) both; }
      `}</style>

      {/* Confetti layer */}
      {mounted && (
        <div className="pointer-events-none absolute inset-0 z-10">
          {pieces.map((p) => (
            <div
              key={p.id}
              className="crain"
              style={{
                left: `${p.x}%`,
                width: p.w,
                height: p.h,
                backgroundColor: p.color,
                borderRadius: p.shape === "circle" ? "50%" : "2px",
                ["--r0" as string]: `${p.r0}deg`,
                ["--spin" as string]: p.spin,
                ["--dx" as string]: p.dx,
                ["--dur" as string]: `${p.dur}s`,
                ["--delay" as string]: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 flex flex-col h-full">

        {/* Status bar */}
        <div className="flex items-center justify-between px-5 py-[14px] text-white shrink-0">
          <span className="font-[family-name:var(--font-manrope)] font-semibold text-[15px] leading-5">
            9:41
          </span>
          <span className="font-[family-name:var(--font-manrope)] text-[11px] leading-4 opacity-60">
            ●●● ▌
          </span>
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-7 overflow-y-auto">

          <div className="hero-pop w-[170px] h-[120px] flex items-center justify-center shrink-0">
            <img
              src={goalSuccessIllustration}
              alt="Goal success illustration"
              className="max-h-full max-w-full object-contain"
              loading="eager"
            />
          </div>

          <h1 className="su1 font-[family-name:var(--font-manrope)] font-extrabold text-[30px] leading-[38px] tracking-[-0.04em] text-white text-center">
            Goal Locked In!
          </h1>

          <p className="su2 font-[family-name:var(--font-manrope)] text-[14px] leading-[22px] text-[#ffd9cc] text-center opacity-90">
            Your first challenge starts now.
            <br />
            Walk your steps, unlock your money.
          </p>

          {/* Goal card */}
          <div className="su3 w-full border border-[#ffb89e] bg-[rgba(255,184,153,0.12)] rounded-[22px] p-5 flex flex-col gap-[14px]">
            <GoalRow Icon={LockFilledIcon}     label="Locked"     value={`₦${lockAmount.toLocaleString()}`} />
            <GoalRow Icon={SneakerFilledIcon}  label="Daily Goal" value={`${stepGoal.toLocaleString()} steps`} />
            <GoalRow Icon={CalendarFilledIcon} label="Weekly Goal" value={`${weeklyTarget.toLocaleString()} steps`} />
            <GoalRow Icon={CalendarFilledIcon} label="Total Target" value={`${totalTarget.toLocaleString()} steps`} />
          </div>

          {/* Warning */}
          <div className="su4 w-full bg-[rgba(242,102,71,0.22)] rounded-[14px] px-4 py-[10px]">
            <p className="font-[family-name:var(--font-manrope)] text-[12px] leading-[18px] text-[#ffd9cc] text-center">
              Miss a day and your lock extends. Hit all {durationLabel(duration)} and your ₦
              {lockAmount.toLocaleString()} comes back.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="su5 px-6 pb-10 pt-4 shrink-0">
          <button
            onClick={onNext}
            className="w-full h-[54px] flex items-center justify-center gap-2 rounded-full bg-[#f16746] shadow-[0px_4px_12px_0px_rgba(242,105,71,0.28)] font-[family-name:var(--font-manrope)] font-extrabold text-[17px] text-white active:scale-[0.97] transition-transform cursor-pointer"
          >
            Let&apos;s Go
            <RunnerFilledIcon size={20} className="text-white" />
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── GoalRow ─────────────────────────────────────────────────

function GoalRow({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-[14px] items-center">
      <div className="w-[38px] h-[38px] rounded-[12px] bg-[rgba(255,184,153,0.18)] flex items-center justify-center shrink-0">
        <Icon size={18} className="text-white" />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="font-[family-name:var(--font-manrope)] text-[12px] leading-4 text-[#ffb89e]">
          {label}
        </p>
        <p className="font-[family-name:var(--font-manrope)] font-bold text-[15px] leading-5 text-white">
          {value}
        </p>
      </div>
    </div>
  );
}
