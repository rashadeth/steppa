"use client";

import { useState } from "react";
import ScreenHeader from "./ScreenHeader";
import CTAButton from "./CTAButton";
import { RadioEmpty, RadioFilled } from "./icons";

export type DurationType = 7 | 14 | 21 | "custom";

const options: { id: DurationType; badge: string; title: string; sub: string }[] = [
  { id: 7,        badge: "7 days",  title: "One Week",         sub: "Great for testing the waters" },
  { id: 14,       badge: "14 days", title: "Two Weeks",        sub: "Build a solid foundation"     },
  { id: 21,       badge: "21 days", title: "Three Weeks",      sub: "Form a lasting habit"         },
  { id: "custom", badge: "Custom",  title: "Custom Duration",  sub: "Set your own timeline"        },
];

interface Props {
  onNext: (duration: DurationType) => void;
  onBack: () => void;
  defaultValue?: DurationType;
}

export default function Step4Duration({ onNext, onBack, defaultValue }: Props) {
  const [selected, setSelected] = useState<DurationType | null>(defaultValue ?? null);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex flex-col gap-4 pb-6 shrink-0">
        <ScreenHeader step={4} total={10} onBack={onBack} />
        <div className="px-4 flex flex-col gap-3">
          <h2 className="font-[family-name:var(--font-manrope)] font-bold text-[28px] leading-9 text-[#111827] text-center">
            How long is your<br />challenge?
          </h2>
          <p className="font-[family-name:var(--font-manrope)] text-[14px] leading-5 text-[#6b7280] text-center">
            Choose the duration for your step goal commitment
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="flex-1 flex flex-col gap-4 px-4 overflow-y-auto">
        {options.map((opt) => {
          const active = selected === opt.id;
          return (
            <button
              key={String(opt.id)}
              onClick={() => setSelected(opt.id)}
              className={`flex items-center gap-4 px-4 h-[80px] rounded-2xl border text-left ${
                active
                  ? "bg-[#fff3ef] border-[#d4481f] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]"
                  : "bg-white border-[#d1d5db]"
              }`}
            >
              {/* Badge */}
              <div className="bg-[#fff3ef] rounded-lg px-[10px] h-8 w-[70px] shrink-0 flex items-center justify-center">
                <span className="font-[family-name:var(--font-manrope)] font-semibold text-[13px] text-[#f16746] whitespace-nowrap">
                  {opt.badge}
                </span>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className={`font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 ${
                  active ? "text-[#5e160a]" : "text-[#111827]"
                }`}>
                  {opt.title}
                </p>
                <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#6b7280] mt-1">
                  {opt.sub}
                </p>
              </div>

              {/* Radio */}
              <div className="shrink-0">
                {active ? <RadioFilled size={24} /> : <RadioEmpty size={24} />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 pb-12 pt-6 shrink-0">
        <CTAButton
          onClick={() => selected !== null && onNext(selected)}
          disabled={selected === null}
        />
      </div>
    </div>
  );
}
