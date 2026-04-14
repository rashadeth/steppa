"use client";

import { useState } from "react";
import { House, SneakerMove, Bank, UserCircle, PencilSimple } from "@phosphor-icons/react";
import { useTimeOfDayGreeting } from "@/hooks/useTimeOfDayGreeting";
import type { DurationType } from "./Step4Duration";
import ProfilePhotoPicker from "./ProfilePhotoPicker";
import ChallengeManageSheet from "./ChallengeManageSheet";

interface Props {
  /** Shown under the time-based greeting on the home header. */
  greetingName: string;
  profileImageUrl?: string | null;
  onProfileImageChange: (url: string | null) => void;
  /** Voluntary abort: clears active goal and returns user to empty home (after penalty copy in UI). */
  onAbortChallenge: () => void;
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

export default function HomeWithGoal({
  greetingName,
  profileImageUrl,
  onProfileImageChange,
  onAbortChallenge,
  lockAmount,
  stepGoal,
  duration,
  consequence,
}: Props) {
  const [manageOpen, setManageOpen] = useState(false);
  const timeGreeting = useTimeOfDayGreeting();
  const daysLeft = durationDays(duration);
  const weeks = Math.max(1, Math.round(daysLeft / 7));
  const weeklyTarget = stepGoal * 7;
  const totalTarget = weeklyTarget * weeks;

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="flex shrink-0 items-center justify-between px-4 pt-[74px] pb-6">
        <div className="flex flex-col gap-[2px]">
          <p className="font-[family-name:var(--font-manrope)] font-medium text-[14px] leading-[14px] tracking-[-0.7px] text-[#444459]">
            {timeGreeting} 👋
          </p>
          <h2 className="font-[family-name:var(--font-manrope)] font-semibold text-[26px] leading-8 tracking-[-0.8px] text-[#080814]">
            {greetingName}
          </h2>
        </div>
        <ProfilePhotoPicker imageUrl={profileImageUrl} onChange={onProfileImageChange} />
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-y-contain px-4 pb-4">
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
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <span aria-hidden className="inline-block" />
            <p className="text-center font-[family-name:var(--font-manrope)] font-medium text-[17px] leading-7 text-[#5e160a]">
              Active challenge
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setManageOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e6e9ef] bg-white text-[#5e160a] shadow-sm transition-opacity active:opacity-70"
                aria-label="Edit or end challenge"
              >
                <PencilSimple size={20} weight="bold" />
              </button>
            </div>
          </div>
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

      <ChallengeManageSheet
        open={manageOpen}
        onClose={() => setManageOpen(false)}
        lockAmount={lockAmount}
        consequence={consequence}
        onAbortChallenge={onAbortChallenge}
      />

      <div className="sticky bottom-0 z-10 mt-3 shrink-0 border-t border-[#e6e9ef] bg-white px-4 pt-3 pb-[max(1rem,calc(env(safe-area-inset-bottom,0px)+0.75rem))]">
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
