"use client";

import { useState } from "react";
import ScreenHeader from "./ScreenHeader";
import CTAButton from "./CTAButton";

const PRESETS = [5000, 8000, 10000];
const MIN = 2000;
const MAX = 20000;

interface Props {
  onNext: (steps: number) => void;
  onBack: () => void;
  defaultValue?: number;
}

export default function Step4StepGoal({ onNext, onBack, defaultValue }: Props) {
  const [steps, setSteps] = useState<number | null>(defaultValue ?? null);
  const [customMode, setCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const handlePreset = (val: number) => {
    setSteps(val);
    setCustomMode(false);
  };

  const handleCustom = () => {
    setCustomMode(true);
    if (steps === null) setSteps(8000);
  };

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSteps(Number(e.target.value));
    setCustomMode(false);
  };

  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, "");
    setCustomInput(v);
    if (v) setSteps(Math.min(Math.max(Number(v), MIN), MAX));
  };

  const sliderValue = steps ?? 8000;
  const pct = steps !== null ? ((steps - MIN) / (MAX - MIN)) * 100 : 0;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="pb-6 flex flex-col gap-3 shrink-0">
        <ScreenHeader step={5} total={10} onBack={onBack} />
        <div className="px-4 flex flex-col gap-3">
          <h2 className="font-[family-name:var(--font-manrope)] font-semibold text-[26px] leading-8 tracking-[-0.05rem] text-[#5e160a]">
            Choose your daily step goal
          </h2>
          <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#444459]">
            We recommend starting with 8,000 steps to build a solid foundation.
          </p>
        </div>
      </div>

      {/* Interaction area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-4">
        {/* Step display */}
        {customMode ? (
          <div className="flex flex-col items-center gap-1 pb-6">
            <input
              type="text"
              inputMode="numeric"
              value={customInput}
              onChange={handleCustomInput}
              placeholder="Enter steps"
              className="font-[family-name:var(--font-dm-sans)] font-semibold text-[64px] leading-[96px] tracking-[-0.125rem] text-[#F16746] text-center w-[214px] bg-transparent border-none outline-none focus:ring-0 placeholder:text-[#F16746]/40"
            />
            <p className="font-[family-name:var(--font-manrope)] font-medium text-[17px] leading-7 text-[#444459] text-center">
              Steps per day
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 pb-6">
            <p className={`font-[family-name:var(--font-dm-sans)] font-semibold text-[64px] leading-[96px] tracking-[-0.125rem] text-center ${steps !== null ? "text-[#F16746]" : "text-[#e0e0e8]"}`}>
              {steps !== null ? steps.toLocaleString() : "– – –"}
            </p>
            <p className="font-[family-name:var(--font-manrope)] font-medium text-[17px] leading-7 text-[#444459] text-center">
              Steps per day
            </p>
          </div>
        )}

        {/* Slider */}
        <div className="w-full px-4 pb-12 flex flex-col gap-4">
          <div className="relative w-full">
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[4px] rounded-full bg-[#F16746] pointer-events-none"
              style={{ width: `${pct}%` }}
            />
            <input
              type="range"
              min={MIN}
              max={MAX}
              step={500}
              value={sliderValue}
              onChange={handleSlider}
              className="relative w-full"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-[family-name:var(--font-manrope)] font-medium text-[17px] leading-7 text-[#444459]">2,000</span>
            <span className="font-[family-name:var(--font-manrope)] font-medium text-[17px] leading-7 text-[#444459]">20,000</span>
          </div>
        </div>

        {/* Preset chips */}
        <div className="flex flex-wrap items-center justify-center gap-4 px-5">
          {PRESETS.map((p) => {
            const isActive = !customMode && steps === p;
            return (
              <button
                key={p}
                onClick={() => handlePreset(p)}
                className={`h-[45px] px-[17px] rounded-full font-[family-name:var(--font-manrope)] text-[15px] leading-6 border ${
                  isActive
                    ? "bg-[#5e160a] text-[#fff3ef] border-[#5e160a]"
                    : "bg-white text-[#444459] border-[#e0e0e8]"
                }`}
              >
                {p.toLocaleString()}
              </button>
            );
          })}
          <button
            onClick={handleCustom}
            className={`h-[45px] px-[17px] rounded-full font-[family-name:var(--font-manrope)] font-medium text-[17px] leading-7 border ${
              customMode
                ? "bg-[#5e160a] text-[#fff3ef] border-[#5e160a]"
                : "bg-white text-[#444459] border-[#e0e0e8]"
            }`}
          >
            Custom
          </button>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-4 pb-12 pt-6 shrink-0">
        <CTAButton onClick={() => steps !== null && onNext(steps)} disabled={steps === null} />
      </div>
    </div>
  );
}
