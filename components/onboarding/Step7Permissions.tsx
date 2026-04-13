"use client";

import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { CheckIcon, HeartIllustration } from "./icons";

const imgPaywallHero = "/paywall-hero.webp";

const perms = [
  "We only access step data",
  "Encrypted end-to-end",
  "Automatic goal verification",
];

interface Props {
  onNext: () => void | Promise<void>;
  onSkip: () => void;
  onBack: () => void;
}

export default function Step7Permissions({ onNext, onSkip, onBack }: Props) {
  const [isGrantingAccess, setIsGrantingAccess] = useState(false);

  useEffect(() => {
    const preloadedHero = new Image();
    preloadedHero.src = imgPaywallHero;
  }, []);

  async function handleGiveAccess() {
    if (isGrantingAccess) return;
    setIsGrantingAccess(true);

    try {
      // Show loader first, then continue to the next screen.
      await new Promise((resolve) => setTimeout(resolve, 900));
      await Promise.resolve(onNext());
    } finally {
      setIsGrantingAccess(false);
    }
  }

  return (
    <div className="relative flex flex-col h-full bg-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]">
      {isGrantingAccess && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[rgba(8,8,20,0.3)] backdrop-blur-[2px]">
          <div className="w-[240px] rounded-3xl bg-white px-6 py-5 shadow-[0px_12px_30px_rgba(11,18,32,0.15)] border border-[#e6e9ef]">
            <div className="flex items-center gap-3">
              <span
                className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-[#f16746]/30 border-t-[#f16746]"
                aria-hidden="true"
              />
              <p className="font-[family-name:var(--font-manrope)] font-medium text-[14px] leading-5 text-[#444459]">
                Connecting to Apple Health...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-4 pt-16 pb-6 flex flex-col gap-6 shrink-0">
        {/* ← Back text button */}
        <button
          onClick={onBack}
          className="self-start font-[family-name:var(--font-manrope)] font-semibold text-[13px] text-[#444459]"
        >
          ← Back
        </button>

        {/* Progress bar */}
        <ProgressBar step={4} total={4} />

        {/* Title */}
        <h2 className="font-[family-name:var(--font-manrope)] font-semibold text-[26px] leading-8 tracking-[-0.8px] text-[#5e160a]">
          Track your steps
        </h2>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center px-9">
        <div className="flex flex-col items-center w-[304px]">
          {/* Heart icon in soft orange circle */}
          <div className="pb-6">
            <div className="w-48 h-48 rounded-full bg-[#fff3ef] flex items-center justify-center">
              <HeartIllustration size={130} />
            </div>
          </div>

          {/* Sub-heading */}
          <h3 className="font-[family-name:var(--font-manrope)] font-semibold text-[26px] leading-8 tracking-[-0.8px] text-[#080814] text-center mb-4">
            Connect to Apple Health
          </h3>

          {/* Permissions list */}
          <div className="flex flex-col gap-4 w-[205px]">
            {perms.map((p) => (
              <div key={p} className="flex items-center gap-4">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#22c55e] bg-[#ecfdf3]">
                  <CheckIcon size={12} className="text-[#16a34a]" />
                </div>
                <p className="font-[family-name:var(--font-manrope)] font-medium text-[14px] leading-[1.21] tracking-[-0.7px] text-[#444459]">
                  {p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer: Skip For Now + Give Access */}
      <div className="px-4 pt-6 pb-7 flex items-center gap-2 shrink-0">
        {/* Skip For Now — peach ghost */}
        <button
          onClick={onSkip}
          disabled={isGrantingAccess}
          className="relative flex-1 h-14 rounded-[32px] bg-[#ffd9cc] flex items-center justify-center overflow-hidden"
        >
          <span className="absolute inset-0 rounded-[14px] bg-white" />
          <span className="relative font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 text-[#b83a1f]">
            Skip For Now
          </span>
        </button>

        {/* Give Access */}
        <button
          onClick={handleGiveAccess}
          disabled={isGrantingAccess}
          className="w-[203px] h-[52px] flex items-center justify-center gap-2 rounded-full border border-white bg-[#F16746] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 text-white active:opacity-80 shrink-0 disabled:cursor-not-allowed disabled:opacity-90"
          style={{ touchAction: "manipulation" }}
        >
          {isGrantingAccess && (
            <span
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              aria-hidden="true"
            />
          )}
          {isGrantingAccess ? "Granting Access..." : "Give Access"}
        </button>
      </div>
    </div>
  );
}
