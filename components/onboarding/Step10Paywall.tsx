"use client";

import { BarChartIcon, TrendingUpIcon, UsersIcon, CloseIcon } from "./icons";

const imgHero = "/paywall-hero.webp";

const features = [
  {
    Icon: BarChartIcon,
    title: "Unlimited Challenges",
    description: "Lock any amount, any time with no limits.",
  },
  {
    Icon: TrendingUpIcon,
    title: "High-Yield Interest",
    description: "Earn up to 12% APY on your locked funds.",
  },
  {
    Icon: UsersIcon,
    title: "Group Staking",
    description: "Join elite circles and complete goals together.",
  },
];

interface Props {
  onUpgrade: () => void;
  onClose: () => void;
}

export default function Step10Paywall({ onUpgrade, onClose }: Props) {
  return (
    <div className="relative flex flex-col h-full bg-white overflow-y-auto">
      {/* Close button — absolute over hero */}
      <button
        onClick={onClose}
        className="absolute top-12 right-6 w-10 h-10 rounded-full backdrop-blur-[6px] bg-[rgba(255,255,255,0.8)] border border-[#e6e9ef] flex items-center justify-center z-10"
        aria-label="Close"
      >
        <CloseIcon size={20} className="text-[#444459]" />
      </button>

      {/* Hero image */}
      <div className="relative h-[240px] shrink-0 overflow-hidden">
        <img
          src={imgHero}
          alt="Premium vault"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Fade to white */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(0deg, #ffffff 0%, rgba(255,255,255,0) 57%)" }}
        />
      </div>

      {/* Body content */}
      <div className="flex flex-col gap-4 px-8 pb-6">
        {/* "Disciplined Pro" badge */}
        <div className="self-start bg-[#f16746] px-3 py-1 rounded-full">
          <span className="font-[family-name:var(--font-manrope)] font-medium text-[11px] text-white tracking-[-0.2px] uppercase">
            Disciplined Pro
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-[family-name:var(--font-manrope)] font-semibold text-[26px] leading-8 tracking-[-0.8px] text-[#5e160a]">
          Unlock your wealth<br />potential
        </h2>

        {/* Feature rows */}
        <div className="flex flex-col gap-6 pt-2 pb-6">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 items-start">
              <div className="pt-1 shrink-0">
                <f.Icon size={20} className="text-[#F16746]" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-[family-name:var(--font-manrope)] font-semibold text-[18px] leading-5 tracking-[-0.4px] text-[#080814]">
                  {f.title}
                </p>
                <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#444459]">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing card */}
        <div className="relative bg-[#fff3ef] border border-[#b83a1f] rounded-3xl p-[21px] shadow-[0px_6px_18px_0px_rgba(11,18,32,0.06)]">
          {/* BEST VALUE pill */}
          <div className="absolute -top-[11px] right-4 bg-[#f16746] rounded-full px-3 py-1">
            <span className="font-[family-name:var(--font-manrope)] font-bold text-[11px] text-white">
              BEST VALUE
            </span>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-[family-name:var(--font-manrope)] font-semibold text-[18px] leading-5 tracking-[-0.4px] text-[#0b1220]">
                Annual Plan
              </p>
              <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-[19.5px] text-[#444459]">
                ₦2,500 / month, billed yearly
              </p>
            </div>
            <p className="font-[family-name:var(--font-manrope)] font-bold text-[22px] leading-7 tracking-[-0.6px] text-[#0b1220]">
              ₦30,000
            </p>
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="mt-auto bg-white border-t border-[#e6e9ef] flex flex-col gap-4 px-4 pt-4 pb-12 shrink-0">
        <button
          onClick={onUpgrade}
          className="w-full h-[52px] flex items-center justify-center rounded-full bg-[#F16746] border border-white font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 text-white shadow-[0px_5.566px_13.915px_0px_rgba(0,0,0,0.25)] transition-opacity active:opacity-80"
        >
          Upgrade to Pro
        </button>
        <p className="font-[family-name:var(--font-manrope)] text-[12px] leading-[18px] text-[#64748b] text-center">
          Restore purchase · Terms of Service
        </p>
      </div>
    </div>
  );
}
