"use client";

import { useState } from "react";
import ScreenHeader from "./ScreenHeader";
import CTAButton from "./CTAButton";
import { TrophyIcon, ShieldIcon } from "./icons";

type MotivationType = "rewards" | "losses";

interface Props {
  onNext: (motivation: MotivationType) => void;
  onBack: () => void;
  defaultValue?: MotivationType;
}

export default function Step3Motivation({ onNext, onBack, defaultValue }: Props) {
  // null = nothing selected yet → CTA stays disabled
  const [selected, setSelected] = useState<MotivationType | null>(defaultValue ?? null);

  const options: {
    id: MotivationType;
    Icon: React.ComponentType<{ size?: number; className?: string }>;
    title: string;
    titleSize: string;
    body: string;
  }[] = [
    {
      id: "rewards",
      Icon: TrophyIcon,
      title: "Earning rewards",
      titleSize: "text-[18px] leading-5 tracking-[-0.025rem]",
      body: "The thrill of reaching a target and getting a bonus.",
    },
    {
      id: "losses",
      Icon: ShieldIcon,
      title: "Avoiding losses",
      titleSize: "text-[22px] leading-7 tracking-[-0.0375rem]",
      body: "The discipline of keeping what is already yours.",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 pb-6 shrink-0">
        <ScreenHeader step={3} total={10} onBack={onBack} />
        <div className="px-4 flex flex-col gap-4">
          <h2 className="font-[family-name:var(--font-manrope)] font-semibold text-[26px] leading-8 tracking-[-0.05rem] text-[#5e160a]">
            What motivates you more?
          </h2>
          <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#444459]">
            Psychology shows we respond differently to gains and losses.
          </p>
        </div>
      </div>

      {/* ── Options ── */}
      <div className="flex-1 flex flex-col gap-6 px-4 overflow-y-auto">
        {options.map((opt) => {
          const active = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`flex flex-col gap-4 p-6 rounded-[32px] border text-left ${
                active
                  ? "bg-[#fff3ef] border-[#b83a1f] shadow-[0px_6px_18px_0px_rgba(11,18,32,0.06)]"
                  : "bg-[#fafafa] border-[#e0e0e8]"
              }`}
            >
              {/* Icon — greyscale when unselected */}
              <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-[3px_3px_10px_0px_rgba(255,217,204,0.5),-3px_-3px_4px_0px_rgba(0,0,0,0.02)] shrink-0">
                <opt.Icon
                  size={24}
                  className={active ? "text-[#F16746]" : "text-[#a0a8b8]"}
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-4">
                <p className={`font-[family-name:var(--font-manrope)] font-semibold ${opt.titleSize} ${
                  active ? "text-[#5e160a]" : "text-[#080814]"
                }`}>
                  {opt.title}
                </p>
                <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#64748b]">
                  {opt.body}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Footer ── */}
      <div className="px-4 pb-12 pt-6 shrink-0">
        <CTAButton
          onClick={() => selected && onNext(selected)}
          disabled={selected === null}
        />
      </div>
    </div>
  );
}
