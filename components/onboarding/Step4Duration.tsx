"use client";

import { useState } from "react";
import ScreenHeader from "./ScreenHeader";
import CTAButton from "./CTAButton";
import { RadioEmpty, RadioFilled } from "./icons";

export type DurationType = 7 | 14 | 21 | number | "custom";

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
  const [isCustomPickerOpen, setIsCustomPickerOpen] = useState(false);
  const [customWeeks, setCustomWeeks] = useState(() => {
    if (typeof defaultValue === "number" && defaultValue > 21) return Math.round(defaultValue / 7);
    return 4;
  });

  function getOptionMeta(id: DurationType) {
    if (id === "custom") {
      return { badge: "Custom", title: "Custom Duration", sub: "Set your own timeline" };
    }
    if (typeof id === "number" && id > 21) {
      const weeks = Math.round(id / 7);
      return { badge: `${id} days`, title: `${weeks} Weeks`, sub: "Extended commitment window" };
    }
    const base = options.find((opt) => opt.id === id);
    return base ?? { badge: `${id} days`, title: `${id} Days`, sub: "Challenge duration" };
  }

  function handleSelect(id: DurationType) {
    if (id === "custom") {
      setIsCustomPickerOpen(true);
      return;
    }
    setSelected(id);
  }

  function applyCustomDuration() {
    setSelected(customWeeks * 7);
    setIsCustomPickerOpen(false);
  }

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-white">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
          <div className="flex flex-col gap-4 pb-6">
            <ScreenHeader step={3} total={5} onBack={onBack} />
            <div className="px-4 flex flex-col gap-3">
              <h2 className="font-[family-name:var(--font-manrope)] font-bold text-[28px] leading-9 text-[#111827] text-center">
                How long is your<br />challenge?
              </h2>
              <p className="font-[family-name:var(--font-manrope)] text-[14px] leading-5 text-[#6b7280] text-center">
                Choose the duration for your step goal commitment
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 px-4 pb-6">
        {options.map((opt) => {
          const active =
            opt.id === "custom"
              ? typeof selected === "number" && selected > 21
              : selected === opt.id;
          const display = active && opt.id === "custom" && typeof selected === "number" && selected > 21
            ? getOptionMeta(selected)
            : opt;
          return (
            <button
              key={String(opt.id)}
              onClick={() => handleSelect(opt.id)}
              className={`flex items-center gap-4 px-4 h-[80px] rounded-2xl border text-left ${
                active
                  ? "bg-[#fff3ef] border-[#d4481f] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]"
                  : "bg-white border-[#d1d5db]"
              }`}
            >
              {/* Badge */}
              <div className="bg-[#fff3ef] rounded-lg px-[10px] h-8 w-[70px] shrink-0 flex items-center justify-center">
                <span className="font-[family-name:var(--font-manrope)] font-semibold text-[13px] text-[#f16746] whitespace-nowrap">
                  {display.badge}
                </span>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className={`font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 ${
                  active ? "text-[#5e160a]" : "text-[#111827]"
                }`}>
                  {display.title}
                </p>
                <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#6b7280] mt-1">
                  {display.sub}
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
        </div>

        <div className="sticky bottom-0 z-10 shrink-0 border-t border-transparent bg-white px-4 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]">
          <CTAButton
            onClick={() => selected !== null && onNext(selected)}
            disabled={selected === null}
          />
        </div>
      </div>

      {isCustomPickerOpen && (
        <div className="absolute inset-0 z-20 flex items-end bg-[rgba(8,8,20,0.35)]">
          <div className="w-full rounded-t-[28px] bg-white px-5 pt-4 pb-8">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[#e0e0e8]" />
            <h3 className="font-[family-name:var(--font-manrope)] font-semibold text-[18px] leading-6 text-[#080814]">
              Select custom duration
            </h3>
            <p className="mt-1 font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#64748b]">
              Pick how many weeks you want for this challenge.
            </p>

            <div className="mt-5 rounded-2xl border border-[#e6e9ef] bg-[#fafafc] px-4 py-5">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-manrope)] text-[15px] leading-6 text-[#444459]">Duration</span>
                <span className="font-[family-name:var(--font-manrope)] font-semibold text-[17px] leading-7 text-[#5e160a]">
                  {customWeeks} week{customWeeks > 1 ? "s" : ""}
                </span>
              </div>
              <div className="mt-4 relative w-full">
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[4px] rounded-full bg-[#F16746] pointer-events-none"
                  style={{ width: `${((customWeeks - 4) / (12 - 4)) * 100}%` }}
                />
                <input
                  type="range"
                  min={4}
                  max={12}
                  step={1}
                  value={customWeeks}
                  onChange={(e) => setCustomWeeks(Number(e.target.value))}
                  className="relative w-full"
                />
              </div>
              <div className="mt-2 flex justify-between font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#9898ac]">
                <span>4w</span>
                <span>12w</span>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setIsCustomPickerOpen(false)}
                className="h-[52px] flex-1 rounded-full border border-[#e0e0e8] bg-white font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 text-[#444459]"
              >
                Cancel
              </button>
              <button
                onClick={applyCustomDuration}
                className="h-[52px] flex-1 rounded-full border border-white bg-[#F16746] font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 text-white"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
