"use client";

import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

const imgHero = "https://www.figma.com/api/mcp/asset/c5254281-3a51-4227-857b-0840f7d0b5eb";
const imgDots = "https://www.figma.com/api/mcp/asset/00411cac-8cd0-44ca-a759-2f1ebc6ea101";
const STEP2_LOTTIES = [
  "https://lottie.host/673c83b0-6903-48c6-bb53-c4f7f517b493/dnUxbVvaJU.lottie",
  "https://lottie.host/53c6648d-f405-4e58-93a4-3662c84442de/wGn4IFqTGD.lottie",
  "https://lottie.host/62ae93a0-a38c-43e2-9b04-533ac812f293/q7u4Hv3Jck.lottie",
];

const FLIP_WORDS = ["discipline", "patience", "hardwork"];
const HOLD_MS    = 2500;
const FLIP_MS    = 500;

// Line-height of the h1 in px — must match leading-[49px]
const LINE_H = 49;

interface Props {
  onNext: () => void;
}

export default function Step1Welcome({ onNext }: Props) {
  const [wordIndex, setWordIndex] = useState(0);

  // Advance word every HOLD_MS; CSS transition handles the 500ms flip
  useEffect(() => {
    const timer = setTimeout(() => {
      setWordIndex((i) => (i + 1) % FLIP_WORDS.length);
    }, HOLD_MS);
    return () => clearTimeout(timer);
  }, [wordIndex]);

  // Warm Step 2 animation assets so the first slide appears faster after tap.
  useEffect(() => {
    STEP2_LOTTIES.forEach((url) => {
      void fetch(url).catch(() => {
        // Ignore preload failures; Step 2 still loads assets normally.
      });
    });
  }, []);

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#16141a]">
      {/* ── Ticker styles ──────────────────────────────────────────────── */}
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

      {/* Hero image */}
      <img
        src={imgHero}
        alt="Person running with credit card"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Orange tint overlay */}
      <div className="absolute inset-0 bg-[rgba(239,93,62,0.25)] pointer-events-none" />

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('${imgDots}')`,
          backgroundSize: "2.54px 2.54px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 px-4 pt-10 z-10">
        <ProgressBar step={1} total={4} light />
      </div>

      {/* Headline + subtext */}
      <div
        className="absolute left-0 right-0 z-10 px-4 backdrop-blur-[0.75px] bg-[rgba(0,0,0,0.02)]"
        style={{ top: "475px" }}
      >
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
          <div className="h-[90px] flex items-start pt-2">
            <p
              className="font-[family-name:var(--font-manrope)] font-medium text-[17px] leading-7 text-white"
              style={{ textShadow: "0 2px 20px #505050" }}
            >
              Lock your money. Unlock it with effort.
            </p>
          </div>
        </div>
      </div>

      {/* CTA footer */}
      <div className="absolute bottom-0 left-0 right-0 z-10 backdrop-blur-[2px] bg-[rgba(23,20,20,0.02)] px-4 pt-6 pb-[max(2.5rem,calc(env(safe-area-inset-bottom,0px)+1.5rem))]">
        <button
          onClick={onNext}
          className="w-full h-[52px] flex items-center justify-center rounded-full bg-[#F16746] border border-[#ffb89e] shadow-[0px_5.566px_13.915px_0px_rgba(0,0,0,0.25)] font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 text-white active:opacity-80"
          style={{ touchAction: "manipulation" }}
        >
          Continue progress
        </button>
      </div>
    </div>
  );
}
