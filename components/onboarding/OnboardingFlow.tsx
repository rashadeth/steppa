"use client";

import { useEffect, useState } from "react";
import Step1Welcome from "./Step1Welcome";
import Step2PreferredName from "./Step2PreferredName";
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
import { GoalProgressRunContext } from "./GoalProgressRunContext";
import type { MotivationType } from "./Step3Motivation";
import type { DurationType } from "./Step4Duration";

const imgPaywallHero = "/paywall-hero.webp";
const PROFILE_PHOTO_STORAGE_KEY = "steppa-profile-photo";

interface OnboardingState {
  preferredName?: string;
  /** Data URL (upload) or preset URL — shown on home avatar. */
  profileImageUrl?: string | null;
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
  const [goalProgressRun, setGoalProgressRun] = useState(0);
  const [state, setState] = useState<OnboardingState>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROFILE_PHOTO_STORAGE_KEY);
      if (raw)
        setState((s) => ({ ...s, profileImageUrl: raw }));
    } catch {
      /* ignore */
    }
  }, []);

  const setProfileImageUrl = (url: string | null) => {
    setState((s) => ({ ...s, profileImageUrl: url }));
    try {
      if (url) localStorage.setItem(PROFILE_PHOTO_STORAGE_KEY, url);
      else localStorage.removeItem(PROFILE_PHOTO_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  /** Intro + paywall: steps 1–6 (welcome → name → how → motivation → permissions → paywall). */
  const next = () => setStep((s) => Math.min(s + 1, 6));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const greetingName = state.preferredName?.trim() || "Friend";

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <img src={imgPaywallHero} alt="" aria-hidden="true" className="hidden" loading="eager" />

      {/* 1 — Welcome */}
      {step === 1 && <Step1Welcome onNext={next} />}

      {/* 2 — What should we call you */}
      {step === 2 && (
        <Step2PreferredName
          defaultValue={state.preferredName}
          onBack={back}
          onNext={(name) => {
            setState((s) => ({ ...s, preferredName: name }));
            next();
          }}
        />
      )}

      {/* 3 — How It Works */}
      {step === 3 && (
        <Step2HowItWorks
          onNext={next}
          onSkip={() => setStep(6)}
        />
      )}

      {/* 4 — Motivation */}
      {step === 4 && (
        <Step3Motivation
          defaultValue={state.motivation}
          onBack={back}
          onNext={(motivation) => {
            setState((s) => ({ ...s, motivation }));
            next();
          }}
        />
      )}

      {/* 5 — Permissions */}
      {step === 5 && (
        <Step7Permissions
          onBack={back}
          onNext={next}
          onSkip={next}
        />
      )}

      {/* 6 — Subscription Paywall */}
      {step === 6 && (
        <Step10Paywall
          onClose={() => {
            setHasActiveGoal(false);
            setGoalStep(1);
            setState((prev) => ({
              preferredName: prev.preferredName,
              profileImageUrl: prev.profileImageUrl,
            }));
            setStep(7);
          }}
          onUpgrade={() => {
            alert("Pro upgrade started! 🚀");
          }}
        />
      )}

      {/* 7 — Home */}
      {step === 7 && (
        hasActiveGoal ? (
          <HomeWithGoal
            greetingName={greetingName}
            profileImageUrl={state.profileImageUrl}
            onProfileImageChange={setProfileImageUrl}
            lockAmount={state.lockAmount ?? 10000}
            stepGoal={state.stepGoal ?? 8000}
            duration={state.duration}
            consequence={state.consequence}
          />
        ) : (
          <EmptyStateHome
            greetingName={greetingName}
            profileImageUrl={state.profileImageUrl}
            onProfileImageChange={setProfileImageUrl}
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
              setGoalProgressRun((n) => n + 1);
              setStep(8);
            }}
          />
        )
      )}

      {/* 8 — Set Goal Flow */}
      {step === 8 && (
        <GoalProgressRunContext.Provider value={goalProgressRun}>
          {goalStep === 1 && (
            <Step5MoneyLock
              defaultValue={state.lockAmount}
              onBack={() => setStep(7)}
              onNext={(lockAmount) => {
                setState((s) => ({ ...s, lockAmount }));
                setGoalStep(2);
              }}
            />
          )}

          {goalStep === 2 && (
            <Step4StepGoal
              defaultValue={state.stepGoal}
              onBack={() => setGoalStep(1)}
              onNext={(stepGoal) => {
                setState((s) => ({ ...s, stepGoal }));
                setGoalStep(3);
              }}
            />
          )}

          {goalStep === 3 && (
            <Step4Duration
              defaultValue={state.duration}
              onBack={() => setGoalStep(2)}
              onNext={(duration) => {
                setState((s) => ({ ...s, duration }));
                setGoalStep(4);
              }}
            />
          )}

          {goalStep === 4 && (
            <Step6Consequence
              onBack={() => setGoalStep(3)}
              onNext={(consequence) => {
                setState((s) => ({ ...s, consequence }));
                setGoalStep(5);
              }}
            />
          )}

          {goalStep === 5 && (
            <Step8Summary
              lockAmount={state.lockAmount ?? 10000}
              stepGoal={state.stepGoal ?? 8000}
              duration={state.duration}
              onBack={() => setGoalStep(4)}
              onStart={() => setGoalStep(6)}
            />
          )}

          {goalStep === 6 && (
            <Step9GoalCreated
              lockAmount={state.lockAmount ?? 10000}
              stepGoal={state.stepGoal ?? 8000}
              duration={state.duration}
              onNext={() => {
                setHasActiveGoal(true);
                setStep(7);
              }}
            />
          )}
        </GoalProgressRunContext.Provider>
      )}
    </div>
  );
}
