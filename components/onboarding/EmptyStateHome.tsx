"use client";

import { VaultIcon } from "./icons";
import { House, SneakerMove, Bank, UserCircle, Info } from "@phosphor-icons/react";
import { useTimeOfDayGreeting } from "@/hooks/useTimeOfDayGreeting";
import ProfilePhotoPicker from "./ProfilePhotoPicker";

interface Props {
  /** Shown under the time-based greeting on the home header. */
  greetingName: string;
  profileImageUrl?: string | null;
  onProfileImageChange: (url: string | null) => void;
  onSetGoals: () => void;
}

export default function EmptyStateHome({
  greetingName,
  profileImageUrl,
  onProfileImageChange,
  onSetGoals,
}: Props) {
  const timeGreeting = useTimeOfDayGreeting();

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
        <div
          className="flex gap-3 rounded-2xl border border-[#ffb89e] bg-[#fff3ef] px-4 py-3"
          role="note"
          aria-label="Trial balance information"
        >
          <Info size={22} weight="fill" className="shrink-0 text-[#F16746]" aria-hidden="true" />
          <p className="font-[family-name:var(--font-manrope)] text-[12px] leading-[18px] text-[#444459]">
            You have a dummy available balance of{" "}
            <span className="font-semibold text-[#5e160a]">₦30,000</span> for a{" "}
            <span className="font-semibold text-[#5e160a]">7-day</span> free trial. After that,
            you will be required to deposit real money and commit.
          </p>
        </div>

        {/* Steps empty card */}
        <div className="rounded-[32px] border border-[#e6e9ef] bg-white px-5 pt-[25px] pb-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-[family-name:var(--font-manrope)] text-[15px] leading-6 text-[#444459]">
              Today&apos;s Steps
            </p>
            <p className="font-[family-name:var(--font-manrope)] text-[15px] leading-6 text-[#9898ac]">
              No goal set
            </p>
          </div>
          <p className="mb-3 text-center font-[family-name:var(--font-dm-sans)] font-semibold text-[48px] leading-[54px] tracking-[-2px] text-[#ffd9cc]">—</p>
          <div className="h-[6px] rounded-[6px] bg-[#fafafc]" />
          <p className="mt-3 text-center font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#9898ac]">
            Set a goal to start tracking your steps
          </p>
        </div>

        {/* Goal empty card */}
        <div className="rounded-[32px] bg-[#fafafc] px-5 py-6">
          <div className="mx-auto flex h-[84px] w-[84px] items-center justify-center rounded-[30px] bg-[#fff3ef]">
            <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[20px] border border-[#ffb89e] bg-white">
              <VaultIcon size={30} className="text-[#f16746]" />
            </div>
          </div>
          <p className="mt-4 text-center font-[family-name:var(--font-manrope)] font-medium text-[17px] leading-7 tracking-[0px] text-[#5e160a]">
            No active goal yet
          </p>
          <p className="mt-2 text-center font-[family-name:var(--font-manrope)] font-normal text-[13px] leading-5 tracking-[0px] text-[#444459]">
            Lock money and unlock it by hitting your
            <br />
            step goal every day.
          </p>
          <button
            onClick={onSetGoals}
            className="mt-5 h-[52px] w-full rounded-full border border-white bg-[#F16746] font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 text-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]"
          >
            Set goals
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {["Streak", "Days Left", "Locked"].map((label) => (
            <div key={label} className="rounded-2xl border-[0.6px] border-dashed border-[#e6e9ef] bg-[#fafafc] py-[14px] text-center">
              <p className="font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 text-[#e0e0e8]">—</p>
              <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#9898ac]">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 z-10 mt-3 shrink-0 border-t border-[#e6e9ef] bg-white px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
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
