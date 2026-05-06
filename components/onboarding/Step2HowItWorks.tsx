"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ProgressBar from "./ProgressBar";

// ─── Slide data ────────────────────────────────────────────────────────────

const SLIDES = [
  {
    lottie: "/lottie/lock-money.lottie",
    title: "Lock Your Money",
    subtext: "Choose an amount to lock. It's yours, but untouchable until earned.",
  },
  {
    lottie: "/lottie/hit-steps.lottie",
    title: "Hit Your Steps",
    subtext: "Set a daily goal. Your phone tracks progress automatically.",
  },
  {
    lottie: "/lottie/unlock-cash.lottie",
    title: "Unlock Your Cash",
    subtext: "Complete your challenge and your money is released back to you.",
  },
];

const AUTO_ADVANCE_MS = 4000;

// ─── Props ─────────────────────────────────────────────────────────────────

interface Props {
  onNext: () => void;
  /** Skip the rest of onboarding and open the subscription screen. */
  onSkip: () => void;
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function Step2HowItWorks({ onNext, onSkip }: Props) {
  const [current, setCurrent]   = useState(0);
  const timerRef                = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX             = useRef<number | null>(null);

  // ── Go to slide ──────────────────────────────────────────────────────────
  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  // ── Auto-advance ─────────────────────────────────────────────────────────
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, resetTimer]);

  // ── Swipe handling ───────────────────────────────────────────────────────
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < 40) return;

    if (delta < 0) {
      goTo((current + 1) % SLIDES.length);
    } else {
      goTo((current - 1 + SLIDES.length) % SLIDES.length);
    }
    resetTimer();
  }

  // ── Dot tap ──────────────────────────────────────────────────────────────
  function handleDotTap(index: number) {
    goTo(index);
    resetTimer();
  }

  return (
    <div
      className="flex h-full min-h-0 flex-col bg-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="shrink-0 px-4" style={{ paddingTop: "max(2.5rem, calc(env(safe-area-inset-top) + 10px))" }}>
        <ProgressBar step={3} total={5} progressGroup="intro" />
      </div>

      <div className="min-h-0 flex-1 flex flex-col overflow-y-auto overscroll-y-contain">
        <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-8">

        {/* Lottie animations — all preloaded, crossfade via opacity */}
        <div className="relative w-full max-w-[280px] h-[250px] shrink-0">
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-500 ease-in-out will-change-[opacity]"
              style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
            >
              <DotLottieReact
                src={slide.lottie}
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </div>

        {/* Title + subtext — all preloaded, crossfade via opacity */}
        <div className="relative w-full max-w-[280px] h-[100px] mt-6 shrink-0">
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-500 ease-in-out will-change-[opacity]"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              <h2 className="font-[family-name:var(--font-manrope)] font-semibold text-[24px] leading-8 tracking-[-0.5px] text-[#5e160a] text-center">
                {slide.title}
              </h2>
              <p
                className={`mx-auto mt-3 font-[family-name:var(--font-manrope)] text-[14px] leading-6 text-[#444459] text-center text-balance ${
                  i === 0 ? "max-w-[250px]" : "max-w-[220px]"
                }`}
              >
                {slide.subtext}
              </p>
            </div>
          ))}
        </div>
        </div>

        <div className="shrink-0 flex items-center justify-center gap-2 pb-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotTap(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width:      i === current ? 20 : 8,
              height:     8,
              background: i === current ? "#f16746" : "#e0e0e5",
            }}
          />
        ))}
      </div>
      </div>

      <div className="sticky bottom-0 z-20 flex shrink-0 items-center gap-3 border-t border-transparent bg-white px-4 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]">
        {/* Skip */}
        <button
          type="button"
          onClick={onSkip}
          className="h-[52px] px-6 flex items-center justify-center font-[family-name:var(--font-manrope)] font-semibold text-[16px] text-[#5e160a]"
          style={{ touchAction: "manipulation" }}
        >
          Skip
        </button>

        {/* Continue */}
        <button
          onClick={onNext}
          className="flex-1 h-[52px] flex items-center justify-center rounded-full bg-[#f16746] border border-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] font-[family-name:var(--font-manrope)] font-semibold text-[16px] text-white active:opacity-80"
          style={{ touchAction: "manipulation" }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
