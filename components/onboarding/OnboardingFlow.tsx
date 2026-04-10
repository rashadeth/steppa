"use client";

import { useState } from "react";
import Step1Welcome from "./Step1Welcome";
import Step2GoalSelection from "./Step2GoalSelection";
import Step3Motivation from "./Step3Motivation";
import Step4Duration from "./Step4Duration";
import Step4StepGoal from "./Step4StepGoal";
import Step5MoneyLock from "./Step5MoneyLock";
import Step6Consequence from "./Step6Consequence";
import Step7Permissions from "./Step7Permissions";
import Step8Summary from "./Step8Summary";
import Step10Paywall from "./Step10Paywall";
import type { DurationType } from "./Step4Duration";

type GoalType = "walking" | "fitness" | "saving";
type MotivationType = "rewards" | "losses";
type ConsequenceType = "extend" | "penalty";

interface OnboardingState {
  goal?: GoalType;
  motivation?: MotivationType;
  duration?: DurationType;
  stepGoal?: number;
  lockAmount?: number;
  consequence?: ConsequenceType;
}

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<OnboardingState>({});

  const next = () => setStep((s) => Math.min(s + 1, 10));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="w-full h-full">
      {/* 1 — Welcome */}
      {step === 1 && (
        <Step1Welcome onNext={next} />
      )}

      {/* 2 — Goal Selection */}
      {step === 2 && (
        <Step2GoalSelection
          defaultValue={state.goal}
          onBack={back}
          onNext={(goal) => {
            setState((s) => ({ ...s, goal }));
            next();
          }}
        />
      )}

      {/* 3 — Motivation */}
      {step === 3 && (
        <Step3Motivation
          defaultValue={state.motivation}
          onBack={back}
          onNext={(motivation) => {
            setState((s) => ({ ...s, motivation }));
            next();
          }}
        />
      )}

      {/* 4 — Duration (NEW) */}
      {step === 4 && (
        <Step4Duration
          defaultValue={state.duration}
          onBack={back}
          onNext={(duration) => {
            setState((s) => ({ ...s, duration }));
            next();
          }}
        />
      )}

      {/* 5 — Step Goal */}
      {step === 5 && (
        <Step4StepGoal
          defaultValue={state.stepGoal}
          onBack={back}
          onNext={(stepGoal) => {
            setState((s) => ({ ...s, stepGoal }));
            next();
          }}
        />
      )}

      {/* 6 — Money Lock */}
      {step === 6 && (
        <Step5MoneyLock
          defaultValue={state.lockAmount}
          onBack={back}
          onNext={(lockAmount) => {
            setState((s) => ({ ...s, lockAmount }));
            next();
          }}
        />
      )}

      {/* 7 — Consequence */}
      {step === 7 && (
        <Step6Consequence
          defaultValue={state.consequence}
          onBack={back}
          onNext={(consequence) => {
            setState((s) => ({ ...s, consequence }));
            next();
          }}
        />
      )}

      {/* 8 — Permissions */}
      {step === 8 && (
        <Step7Permissions
          onBack={back}
          onNext={next}
          onSkip={next}
        />
      )}

      {/* 9 — Summary */}
      {step === 9 && (
        <Step8Summary
          stepGoal={state.stepGoal ?? 0}
          lockAmount={state.lockAmount ?? 0}
          duration={state.duration}
          onBack={back}
          onStart={next}
        />
      )}

      {/* 10 — Premium Paywall (NEW) */}
      {step === 10 && (
        <Step10Paywall
          onUpgrade={() => {
            // TODO: trigger Supabase + payment flow
            alert("Upgrade to Pro! 🚀");
          }}
          onClose={() => {
            // Skip paywall → proceed to main app
            alert("Challenge started! 🎯");
          }}
        />
      )}
    </div>
  );
}
