"use client";

import { useState } from "react";
import Step1Welcome from "./Step1Welcome";
import Step2HowItWorks from "./Step2HowItWorks";
import Step3Motivation from "./Step3Motivation";
import Step7Permissions from "./Step7Permissions";
import Step10Paywall from "./Step10Paywall";
import EmptyStateHome from "./EmptyStateHome";
import HomeWithGoal from "./HomeWithGoal";
import Step5MoneyLock from "./Step5MoneyLock";
import Step4StepGoal from "./Step4StepGoal";
import Step4Duration from "./Step4Duration";
import Step6Consequence from "./Step6Consequence";
import Step8Summary from "./Step8Summary";
import Step9GoalCreated from "./Step9GoalCreated";
import type { MotivationType } from "./Step3Motivation";
import type { DurationType } from "./Step4Duration";

const imgPaywallHero = "/paywall-hero.webp";

interface OnboardingState {
  motivation?: MotivationType;
  lockAmount?: number;
  stepGoal?: number;
  duration?: DurationType;
  consequence?: "extend" | "penalty";
}

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [goalStep, setGoalStep] = useState(1);
  const [hasActiveGoal, setHasActiveGoal] = useState(false);
  const [state, setState] = useState<OnboardingState>({});

  const next = () => setStep((s) => Math.min(s + 1, 6));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="w-full h-full">
      {/* Preload the paywall hero early to avoid visible image pop-in on step transition. */}
      <img src={imgPaywallHero} alt="" aria-hidden="true" className="hidden" loading="eager" />

      {/* 1 — Welcome */}
      {step === 1 && <Step1Welcome onNext={next} />}

      {/* 2 — How It Works */}
      {step === 2 && <Step2HowItWorks onNext={next} onBack={back} />}

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

      {/* 4 — Permissions */}
      {step === 4 && (
        <Step7Permissions
          onBack={back}
          onNext={next}
          onSkip={next}
        />
      )}

      {/* 5 — Subscription Paywall */}
      {step === 5 && (
        <Step10Paywall
          onClose={() => setStep(6)}
          onUpgrade={() => {
            // TODO: wire purchase flow and then route to app.
            alert("Pro upgrade started! 🚀");
          }}
        />
      )}

      {/* 6 — Home Empty State */}
      {step === 6 && (
        hasActiveGoal ? (
          <HomeWithGoal
            lockAmount={state.lockAmount ?? 10000}
            stepGoal={state.stepGoal ?? 8000}
            duration={state.duration}
            consequence={state.consequence}
          />
        ) : (
          <EmptyStateHome
            onSetGoals={() => {
              setState((s) => ({
                ...s,
                lockAmount: undefined,
                stepGoal: undefined,
                duration: undefined,
                consequence: undefined,
              }));
              setHasActiveGoal(false);
              setGoalStep(1);
              setStep(7);
            }}
          />
        )
      )}

      {/* 7 — Set Goal Flow */}
      {step === 7 && goalStep === 1 && (
        <Step5MoneyLock
          defaultValue={state.lockAmount}
          onBack={() => setStep(6)}
          onNext={(lockAmount) => {
            setState((s) => ({ ...s, lockAmount }));
            setGoalStep(2);
          }}
        />
      )}

      {step === 7 && goalStep === 2 && (
        <Step4StepGoal
          defaultValue={state.stepGoal}
          onBack={() => setGoalStep(1)}
          onNext={(stepGoal) => {
            setState((s) => ({ ...s, stepGoal }));
            setGoalStep(3);
          }}
        />
      )}

      {step === 7 && goalStep === 3 && (
        <Step4Duration
          defaultValue={state.duration}
          onBack={() => setGoalStep(2)}
          onNext={(duration) => {
            setState((s) => ({ ...s, duration }));
            setGoalStep(4);
          }}
        />
      )}

      {step === 7 && goalStep === 4 && (
        <Step6Consequence
          onBack={() => setGoalStep(3)}
          onNext={(consequence) => {
            setState((s) => ({ ...s, consequence }));
            setGoalStep(5);
          }}
        />
      )}

      {step === 7 && goalStep === 5 && (
        <Step8Summary
          lockAmount={state.lockAmount ?? 10000}
          stepGoal={state.stepGoal ?? 8000}
          duration={state.duration}
          onBack={() => setGoalStep(4)}
          onStart={() => setGoalStep(6)}
        />
      )}

      {step === 7 && goalStep === 6 && (
        <Step9GoalCreated
          lockAmount={state.lockAmount ?? 10000}
          stepGoal={state.stepGoal ?? 8000}
          duration={state.duration}
          onNext={() => {
            setHasActiveGoal(true);
            setStep(6);
          }}
        />
      )}
    </div>
  );
}
