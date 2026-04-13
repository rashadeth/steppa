"use client";

import { useState } from "react";
import ScreenHeader from "./ScreenHeader";
import CTAButton from "./CTAButton";
import ScreenWithStickyFooter from "./ScreenWithStickyFooter";
import { WalkingIcon, DumbbellIcon, SavingIcon, RadioEmpty, RadioFilled } from "./icons";

type GoalType = "walking" | "fitness" | "saving";

const options: { id: GoalType; label: string; sub: string; Icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: "walking", label: "Walking",      sub: "Workout and activity logs",  Icon: WalkingIcon  },
  { id: "fitness", label: "Fitness",      sub: "Workout and activity logs",  Icon: DumbbellIcon },
  { id: "saving",  label: "Saving Money", sub: "Automated savings streak",   Icon: SavingIcon   },
];

interface Props {
  onNext: (goal: GoalType) => void;
  onBack: () => void;
  defaultValue?: GoalType;
}

export default function Step2GoalSelection({ onNext, onBack, defaultValue }: Props) {
  // null = nothing selected yet → CTA stays disabled
  const [selected, setSelected] = useState<GoalType | null>(defaultValue ?? null);

  return (
    <ScreenWithStickyFooter
      footer={
        <CTAButton
          onClick={() => selected && onNext(selected)}
          disabled={selected === null}
        />
      }
    >
      <div className="flex flex-col gap-4 pb-6">
        <ScreenHeader step={2} total={10} onBack={onBack} />
        <div className="px-4 flex flex-col gap-4">
          <h2 className="font-[family-name:var(--font-manrope)] font-semibold text-[26px] leading-8 tracking-[-0.05rem] text-[#5e160a]">
            What do you want to<br />stay consistent with?
          </h2>
          <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#444459]">
            Select your primary focus area for this challenge.
          </p>
        </div>
      </div>

      <div className="px-4 pb-6">
        <div className="flex flex-col gap-6 py-4">
          {options.map((opt) => {
            const active = selected === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={`flex items-center gap-4 p-4 rounded-3xl border text-left ${
                  active
                    ? "bg-[#fff3ef] border-[#d4481f] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]"
                    : "bg-[#fafafa] border-[#e0e0e8]"
                }`}
              >
                {/* Icon — greyscale when unselected, full colour when selected */}
                <div className="bg-white rounded-3xl w-[50px] h-[50px] flex items-center justify-center shrink-0 overflow-hidden">
                  <opt.Icon
                    size={24}
                    className={active ? "text-[#F16746]" : "text-[#a0a8b8]"}
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className={`font-[family-name:var(--font-manrope)] font-semibold text-[18px] leading-5 tracking-[-0.025rem] ${
                    active ? "text-[#5e160a]" : "text-[#080814]"
                  }`}>
                    {opt.label}
                  </p>
                  <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#444459] mt-3">
                    {opt.sub}
                  </p>
                </div>

                {/* Radio indicator */}
                <div className="shrink-0">
                  {active ? <RadioFilled size={24} /> : <RadioEmpty size={24} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </ScreenWithStickyFooter>
  );
}
