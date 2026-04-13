"use client";

import { House, SneakerMove, Bank, UserCircle } from "@phosphor-icons/react";
import type { DurationType } from "./Step4Duration";

interface Props {
  lockAmount: number;
  stepGoal: number;
  duration?: DurationType;
  consequence?: "extend" | "penalty";
}

function consequenceLabel(consequence?: "extend" | "penalty") {
  if (consequence === "penalty") return "₦500 charity donation per missed day";
  return "Lock extends by 1 day per missed goal";
}

function durationDays(duration?: DurationType) {
  if (!duration) return 7;
  if (duration === "custom") return 28;
  return duration;
}

export default function HomeWithGoal({ lockAmount, stepGoal, duration, consequence }: Props) {
  const daysLeft = durationDays(duration);
  const weeks = Math.max(1, Math.round(daysLeft / 7));
  const weeklyTarget = stepGoal * 7;
  const totalTarget = weeklyTarget * weeks;

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between px-4 pt-[74px] pb-6">
        <div className="flex flex-col gap-[2px]">
          <p className="font-[family-name:var(--font-manrope)] font-medium text-[14px] leading-[14px] tracking-[-0.7px] text-[#444459]">
            Good morning 👋
          </p>
          <h2 className="font-[family-name:var(--font-manrope)] font-semibold text-[26px] leading-8 tracking-[-0.8px] text-[#080814]">
            Ian
          </h2>
        </div>
        <div className="h-11 w-11 rounded-full border border-[#e6e9ef] bg-white" aria-hidden="true" />
      </div>

      <div className="flex-1 space-y-4 px-4">
        <div className="rounded-[32px] border border-[#e6e9ef] bg-white px-5 pt-[25px] pb-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-[family-name:var(--font-manrope)] text-[15px] leading-6 text-[#444459]">Today&apos;s Steps</p>
            <p className="font-[family-name:var(--font-manrope)] text-[15px] leading-6 text-[#9898ac]">0 / {stepGoal.toLocaleString()}</p>
          </div>
          <p className="mb-3 text-center font-[family-name:var(--font-dm-sans)] font-semibold text-[48px] leading-[54px] tracking-[-2px] text-[#F16746]">
            0
          </p>
          <div className="h-[6px] rounded-[6px] bg-[#fafafc] overflow-hidden">
            <div className="h-full w-[0%] bg-[#F16746]" />
          </div>
          <p className="mt-3 text-center font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#9898ac]">
            Keep walking to unlock your locked funds.
          </p>
        </div>

        <div className="rounded-[32px] bg-[#fafafc] px-5 py-6">
          <p className="text-center font-[family-name:var(--font-manrope)] font-medium text-[17px] leading-7 text-[#5e160a]">
            Active challenge
          </p>
          <div className="mt-4 space-y-2 rounded-2xl border border-[#e6e9ef] bg-white px-4 py-4">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#64748b]">Locked amount</span>
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[15px] leading-6 text-[#080814]">₦{lockAmount.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#64748b]">Daily goal</span>
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[15px] leading-6 text-[#080814]">{stepGoal.toLocaleString()} steps</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#64748b]">Weekly goal</span>
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[15px] leading-6 text-[#080814]">{weeklyTarget.toLocaleString()} steps</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#64748b]">Total target</span>
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[15px] leading-6 text-[#080814]">{totalTarget.toLocaleString()} steps</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#64748b]">Days left</span>
              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[15px] leading-6 text-[#080814]">{daysLeft}</span>
            </div>
            <p className="pt-1 font-[family-name:var(--font-manrope)] text-[12px] leading-[18px] text-[#9898ac]">
              If you fail: {consequenceLabel(consequence)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl border-[0.6px] border-dashed border-[#e6e9ef] bg-[#fafafc] py-[14px] text-center">
            <p className="font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 text-[#e0e0e8]">0</p>
            <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#9898ac]">Streak</p>
          </div>
          <div className="rounded-2xl border-[0.6px] border-dashed border-[#e6e9ef] bg-[#fafafc] py-[14px] text-center">
            <p className="font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 text-[#080814]">{daysLeft}</p>
            <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#9898ac]">Days Left</p>
          </div>
          <div className="rounded-2xl border-[0.6px] border-dashed border-[#e6e9ef] bg-[#fafafc] py-[14px] text-center">
            <p className="font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 text-[#080814]">{weeklyTarget.toLocaleString()}</p>
            <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#9898ac]">/ week</p>
          </div>
        </div>
      </div>

      <div className="mt-3 border-t border-[#e6e9ef] px-4 pt-3 pb-7">
        <div className="flex items-center justify-center gap-[55px]">
          <div className="flex flex-col items-center gap-2">
            <House size={20} weight="fill" color="#f16746" />
            <span className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#f16746]">Home</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <SneakerMove size={20} weight="regular" color="#9898ac" />
            <span className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#9898ac]">Steps</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Bank size={20} weight="regular" color="#9898ac" />
            <span className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#9898ac]">Vault</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <UserCircle size={20} weight="regular" color="#9898ac" />
            <span className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#9898ac]">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}
