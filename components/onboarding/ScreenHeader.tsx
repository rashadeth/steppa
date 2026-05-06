"use client";

import { useContext } from "react";
import ProgressBar from "./ProgressBar";
import { GoalProgressRunContext } from "./GoalProgressRunContext";

interface ScreenHeaderProps {
  step: number;
  total: number;
  onBack: () => void;
  /** `intro` = name + early onboarding; `goal` = set-goal flow (uses goal run id for bar reset). */
  progressGroup?: "intro" | "goal";
}

export default function ScreenHeader({
  step,
  total,
  onBack,
  progressGroup = "goal",
}: ScreenHeaderProps) {
  const goalRun = useContext(GoalProgressRunContext);
  const progressRunId = progressGroup === "goal" ? goalRun : 0;
  return (
    // flex flex-col makes back-button and progress bar stack vertically.
    // gap-6 (24px) is the guaranteed space between them — no absolute positioning.
    <div
      className="flex flex-col gap-6 px-4"
      style={{ paddingTop: "max(2.5rem, calc(env(safe-area-inset-top) + 10px))" }}
    >
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

      <ProgressBar
        step={step}
        total={total}
        progressGroup={progressGroup}
        progressRunId={progressRunId}
      />
    </div>
  );
}
