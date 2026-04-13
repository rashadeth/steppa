"use client";

import ScreenHeader from "./ScreenHeader";
import CTAButton from "./CTAButton";
import { TargetIcon, CalendarIcon, VaultIcon, ShieldTickIcon } from "./icons";

type DurationType = 7 | 14 | 21 | number | "custom";

interface Props {
  stepGoal: number;
  lockAmount: number;
  duration?: DurationType;
  onStart: () => void;
  onBack: () => void;
}

function getReleaseDate(duration: DurationType = 7): string {
  const days = typeof duration === "number" ? duration : 30;
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function durationLabel(duration: DurationType = 7): string {
  if (duration === "custom") return "Custom Challenge";
  return `${duration} Day Challenge`;
}

function SummaryRow({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4 items-center">
      <div className="w-10 h-10 rounded-full bg-[#fff3ef] flex items-center justify-center shrink-0">
        <Icon size={24} className="text-[#F16746]" />
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <p className="font-[family-name:var(--font-manrope)] font-medium text-[15px] leading-[18px] text-[#444459]">
          {label}
        </p>
        <p className="font-[family-name:var(--font-manrope)] font-semibold text-[22px] leading-7 tracking-[-0.0375rem] text-[#080814]">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function Step8Summary({ stepGoal, lockAmount, duration, onStart, onBack }: Props) {
  const releaseDate = getReleaseDate(duration);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="pb-6 flex flex-col gap-3 shrink-0">
        <ScreenHeader step={5} total={5} onBack={onBack} />
        <div className="px-4 flex flex-col gap-3">
          <h2 className="font-[family-name:var(--font-manrope)] font-semibold text-[26px] leading-8 tracking-[-0.05rem] text-[#5e160a]">
            You&apos;re ready
          </h2>
          <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#444459]">
            Review your discipline contract before starting.
          </p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="flex-1 px-8 overflow-y-auto">
        <div className="bg-white border border-[#e0e0e8] rounded-[20px] shadow-[0px_6px_18px_0px_rgba(11,18,32,0.06)] p-6 flex flex-col gap-6">
          <SummaryRow
            Icon={TargetIcon}
            label="Daily Goal"
            value={`${stepGoal.toLocaleString()} Steps`}
          />
          <SummaryRow
            Icon={CalendarIcon}
            label="Duration"
            value={durationLabel(duration)}
          />
          <SummaryRow
            Icon={VaultIcon}
            label="Locked Amount"
            value={`₦${lockAmount.toLocaleString()}.00`}
          />

          {/* Divider + release date */}
          <div className="border-t border-[#e6e9ef] pt-4">
            <div className="flex gap-3 items-center">
              <ShieldTickIcon size={20} className="text-[#F16746] shrink-0" />
              <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-[19.5px] text-[#444459]">
                Funds will be released on{" "}
                <span className="font-bold text-[#F16746]">{releaseDate}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-4 pb-12 pt-6 shrink-0">
        <CTAButton onClick={onStart} label="Start my challenge" />
      </div>
    </div>
  );
}
