"use client";

import ProgressBar from "./ProgressBar";

interface ScreenHeaderProps {
  step: number;
  total: number;
  onBack: () => void;
}

export default function ScreenHeader({ step, total, onBack }: ScreenHeaderProps) {
  return (
    // flex flex-col makes back-button and progress bar stack vertically.
    // gap-6 (24px) is the guaranteed space between them — no absolute positioning.
    <div className="flex flex-col gap-6 pt-10 px-4">
      <button
        onClick={onBack}
        className="w-11 h-11 flex items-center justify-center rounded-full bg-[#fff3ef] self-start shrink-0"
        aria-label="Go back"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="#5e160a"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <ProgressBar step={step} total={total} />
    </div>
  );
}
