"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

/**
 * Raster hero shipped in repo: `public/onboarding/welcome-hero.png` → `/onboarding/welcome-hero.png`.
 * Root-absolute path only (no `./` / `../`); keep filename casing in sync with the file on disk.
 */
const ONBOARDING_WELCOME_HERO = "/onboarding/welcome-hero.png" as const;
const STEP2_LOTTIES = [
  "https://lottie.host/673c83b0-6903-48c6-bb53-c4f7f517b493/dnUxbVvaJU.lottie",
  "https://lottie.host/53c6648d-f405-4e58-93a4-3662c84442de/wGn4IFqTGD.lottie",
  "https://lottie.host/62ae93a0-a38c-43e2-9b04-533ac812f293/q7u4Hv3Jck.lottie",
];

const FLIP_WORDS = ["discipline", "patience", "hardwork"];
const HOLD_MS = 2500;
const FLIP_MS = 500;

// Line-height of the h1 in px — must match leading-[49px]
const LINE_H = 49;

const FOOTER_SAFE =
  "pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]";

interface Props {
  onNext: () => void;
}

export default function Step1Welcome({ onNext }: Props) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWordIndex((i) => (i + 1) % FLIP_WORDS.length);
    }, HOLD_MS);
    return () => clearTimeout(timer);
  }, [wordIndex]);

  useEffect(() => {
    STEP2_LOTTIES.forEach((url) => {
      void fetch(url).catch(() => {});
    });
  }, []);

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#16141a]">
      <style>{`
        .word-ticker {
          display: inline-block;
          overflow: hidden;
          height: ${LINE_H}px;
          vertical-align: bottom;
        }
        .word-ticker-inner {
          display: flex;
          flex-direction: column;
          transition: transform ${FLIP_MS}ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }
        .word-ticker-item {
          display: block;
          height: ${LINE_H}px;
          line-height: ${LINE_H}px;
          white-space: nowrap;
        }
      `}</style>

      {/* Full-bleed background (behind UI) — public/ is served from site root */}
      <Image
        src={ONBOARDING_WELCOME_HERO}
        alt="Runners in warm light at a group run"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none absolute inset-0 z-0 object-cover object-top"
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[rgba(239,93,62,0.25)]" />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-repeat"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.1) 0.55px, transparent 0.65px)",
          backgroundSize: "2.54px 2.54px",
        }}
      />

      {/* Foreground: progress + scroll + sticky CTA */}
      <div className="relative z-10 flex h-full min-h-0 flex-col">
        <div className="shrink-0 px-4 pt-10">
          <ProgressBar step={1} total={5} light progressGroup="intro" />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
          <div className="flex min-h-full flex-col justify-end px-4 pb-6">
            <div className="backdrop-blur-[0.75px] bg-[rgba(0,0,0,0.02)]">
              <div className="pt-[7px]">
                <h1 className="font-[family-name:var(--font-alice)] text-[52px] leading-[49px] tracking-[-3.2px] text-white">
                  Turn{" "}
                  <span className="word-ticker">
                    <span
                      className="word-ticker-inner"
                      style={{ transform: `translateY(-${wordIndex * LINE_H}px)` }}
                    >
                      {FLIP_WORDS.map((word) => (
                        <span key={word} className="word-ticker-item">
                          {word}
                        </span>
                      ))}
                    </span>
                  </span>
                  <br />
                  into money
                </h1>
                <div className="flex h-[90px] items-start pt-2">
                  <p
                    className="font-[family-name:var(--font-manrope)] font-medium text-[17px] leading-7 text-white"
                    style={{ textShadow: "0 2px 20px #505050" }}
                  >
                    Lock your money. Unlock it with effort.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`sticky bottom-0 z-20 shrink-0 border-t border-transparent bg-[rgba(12,10,14,0.72)] px-4 pt-6 backdrop-blur-md ${FOOTER_SAFE}`}
        >
          <button
            onClick={onNext}
            className="flex h-[52px] w-full items-center justify-center rounded-full border border-[#ffb89e] bg-[#F16746] font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 text-white shadow-[0px_5.566px_13.915px_0px_rgba(0,0,0,0.25)] active:opacity-80"
            style={{ touchAction: "manipulation" }}
          >
            Continue progress
          </button>
        </div>
      </div>
    </div>
  );
}
