"use client";

import ScreenHeader from "./ScreenHeader";
import CTAButton from "./CTAButton";
import { HeartIllustration, CheckIcon } from "./icons";

const perms = [
  "We only access step data",
  "Encrypted end-to-end",
  "Automatic goal verification",
];

interface Props {
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
}

export default function Step7Permissions({ onNext, onSkip, onBack }: Props) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="pb-9 flex flex-col gap-6 shrink-0">
        <ScreenHeader step={8} total={10} onBack={onBack} />
        <div className="px-4">
          <h2 className="font-[family-name:var(--font-manrope)] font-semibold text-[26px] leading-8 tracking-[-0.05rem] text-[#5e160a]">
            Track your steps
          </h2>
        </div>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center px-9">
        <div className="flex flex-col items-center gap-4 w-[304px]">
          {/* Heart icon in circle */}
          <div className="pb-6">
            <div className="w-48 h-48 rounded-full bg-[#fff3ef] flex items-center justify-center">
              <HeartIllustration size={130} />
            </div>
          </div>

          {/* Title */}
          <h3 className="font-[family-name:var(--font-manrope)] font-semibold text-[26px] leading-8 tracking-[-0.05rem] text-[#5e160a] text-center w-[286px]">
            Connect to Apple Health
          </h3>

          {/* Permissions list */}
          <div className="flex flex-col gap-4 w-[205px]">
            {perms.map((p) => (
              <div key={p} className="flex items-center gap-3">
                <CheckIcon size={24} className="text-[#F16746] shrink-0" />
                <p className="font-[family-name:var(--font-manrope)] text-[14px] leading-[21px] text-[#444459]">
                  {p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pt-6 pb-7 flex flex-col gap-2 shrink-0">
        <CTAButton onClick={onNext} />
        <CTAButton onClick={onSkip} label="Skip for now" variant="ghost" />
      </div>
    </div>
  );
}
