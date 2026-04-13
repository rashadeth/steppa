"use client";

import { useState } from "react";
import ScreenHeader from "./ScreenHeader";
import CTAButton from "./CTAButton";
import ScreenWithStickyFooter from "./ScreenWithStickyFooter";
import { ClockLockIcon, SendMoneyIcon } from "./icons";

type ConsequenceType = "extend" | "penalty";

interface Props {
  onNext: (consequence: ConsequenceType) => void;
  onBack: () => void;
}

const options: {
  id: ConsequenceType;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}[] = [
  {
    id: "extend",
    Icon: ClockLockIcon,
    title: "Extend lock period",
    description: "Money stays locked for an additional day per target missed",
  },
  {
    id: "penalty",
    Icon: SendMoneyIcon,
    title: "Small penalty",
    description: "₦500 donation to charity for every goal missed.",
  },
];

export default function Step6Consequence({ onNext, onBack }: Props) {
  // Always start unselected when entering this screen.
  const [selected, setSelected] = useState<ConsequenceType | null>(null);

  return (
    <ScreenWithStickyFooter footer={<CTAButton onClick={() => selected && onNext(selected)} disabled={selected === null} />}>
      <div className="pb-6 flex flex-col gap-4">
        <ScreenHeader step={4} total={5} onBack={onBack} />
        <div className="px-4 flex flex-col gap-4">
          <h2 className="font-[family-name:var(--font-manrope)] font-semibold text-[26px] leading-8 tracking-[-0.05rem] text-[#5e160a]">
            What happens if you miss your goal?
          </h2>
          <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#444459]">
            Adding a small stake increases your success rate by 42%.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-8 pb-8">
        {options.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`flex gap-4 items-start p-[21px] rounded-3xl border text-left ${
                isSelected
                  ? "bg-[#fff3ef] border-[#F16746] shadow-[0px_6px_18px_0px_rgba(11,18,32,0.06)]"
                  : "bg-[#fafafa] border-[#e0e0e8]"
              }`}
            >
              {/* Icon */}
              <div
                className={`rounded-full w-10 h-10 flex items-center justify-center shrink-0 ${
                  isSelected ? "bg-[#fff3ef]" : "bg-white"
                }`}
              >
                <opt.Icon
                  size={24}
                  className={isSelected ? "text-[#F16746]" : "text-[#a0a8b8]"}
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-4">
                <p
                  className={`font-[family-name:var(--font-manrope)] font-semibold text-[18px] leading-5 tracking-[-0.025rem] ${
                    isSelected ? "text-[#F16746]" : "text-[#0b1220]"
                  }`}
                >
                  {opt.title}
                </p>
                <p className={`font-[family-name:var(--font-manrope)] text-[13px] leading-[19.5px] ${isSelected ? "text-[#F16746]" : "text-[#64748b]"}`}>
                  {opt.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </ScreenWithStickyFooter>
  );
}
