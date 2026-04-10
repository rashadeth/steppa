"use client";

interface CTAButtonProps {
  onClick: () => void;
  label?: string;
  variant?: "primary" | "ghost";
  disabled?: boolean;
}

export default function CTAButton({
  onClick,
  label = "Continue progress",
  variant = "primary",
  disabled = false,
}: CTAButtonProps) {
  if (variant === "ghost") {
    return (
      <button
        onClick={onClick}
        className="w-full h-14 flex items-center justify-center font-[family-name:var(--font-manrope)] font-bold text-[15px] text-[#64748b] text-center"
      >
        {label}
      </button>
    );
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`w-full h-[52px] flex items-center justify-center rounded-full border font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 ${
        disabled
          ? "bg-[#e0e0e8] border-[#e0e0e8] text-[#a0a8b8] shadow-none cursor-not-allowed"
          : "bg-[#F16746] border-white text-white shadow-[0px_5.566px_13.915px_0px_rgba(0,0,0,0.25)] active:opacity-80 cursor-pointer"
      }`}
    >
      {label}
    </button>
  );
}
