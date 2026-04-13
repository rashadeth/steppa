"use client";

import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { RadioEmpty, RadioFilled, WalkingIcon, ShieldIcon, TargetIcon } from "./icons";

export type MotivationType = "fitness" | "saving" | "discipline";

interface Props {
  onNext: (motivation: MotivationType) => void;
  onBack: () => void;
  defaultValue?: MotivationType;
}

const options: {
  id: MotivationType;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  body: string;
}[] = [
  {
    id: "fitness",
    Icon: WalkingIcon,
    title: "Get Fit",
    body: "Build a consistent workout habit",
  },
  {
    id: "saving",
    Icon: ShieldIcon,
    title: "Save Money",
    body: "Use stakes to build discipline",
  },
  {
    id: "discipline",
    Icon: TargetIcon,
    title: "Stay Disciplined",
    body: "Prove I can commit to goals",
  },
];

export default function Step3Motivation({ onNext, onBack, defaultValue }: Props) {
  const [selected, setSelected] = useState<MotivationType | null>(defaultValue ?? null);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 pt-10 pb-0 shrink-0 flex flex-col gap-6">
        <ProgressBar step={3} total={4} />
        <div className="flex flex-col gap-4">
          <h2 className="font-[family-name:var(--font-manrope)] font-medium text-[32px] leading-10 tracking-[-0.5px] text-[#5e160a]">
            What&apos;s driving you?
          </h2>
          <p className="font-[family-name:var(--font-manrope)] font-medium text-[15px] leading-[18px] text-[#444459]">
            Pick the goal that matters most to you
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="flex-1 flex flex-col gap-6 px-4 pt-8 overflow-y-auto">
        {options.map((opt) => {
          const active = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`flex items-center justify-between p-5 rounded-3xl border-[1.5px] text-left transition-colors ${
                active
                  ? "bg-[#fff3ef] border-[#b83a1f]"
                  : "bg-[#fafafc] border-[#e6e9ef]"
              }`}
            >
              {/* Icon + text */}
              <div className="flex items-center gap-4">
                <opt.Icon
                  size={24}
                  className={active ? "text-[#F16746]" : "text-[#9898ac]"}
                />
                <div className="flex flex-col gap-2 w-48">
                  <p className="font-[family-name:var(--font-manrope)] font-medium text-[16px] leading-none text-[#080814]">
                    {opt.title}
                  </p>
                  <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#444459]">
                    {opt.body}
                  </p>
                </div>
              </div>

              {/* Radio */}
              {active ? <RadioFilled size={22} /> : <RadioEmpty size={22} />}
            </button>
          );
        })}
      </div>

      {/* Footer: Go Back + Continue */}
      <div className="px-4 pt-11 pb-9 flex items-end gap-[10px] shrink-0">
        {/* Go Back — peach ghost */}
        <button
          onClick={onBack}
          className="relative w-[130px] h-14 rounded-[32px] bg-[#ffd9cc] flex items-center justify-center shrink-0 overflow-hidden"
        >
          {/* white inner shadow layer */}
          <span className="absolute inset-0 rounded-[14px] bg-white" />
          <span className="relative font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 text-[#b83a1f]">
            Go Back
          </span>
        </button>

        {/* Continue */}
        <button
          onClick={() => selected && onNext(selected)}
          disabled={selected === null}
          className={`flex-1 h-[52px] flex items-center justify-center rounded-full border font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 transition-colors ${
            selected !== null
              ? "bg-[#F16746] border-white text-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] active:opacity-80 cursor-pointer"
              : "bg-[#e0e0e8] border-[#e0e0e8] text-[#a0a8b8] cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
