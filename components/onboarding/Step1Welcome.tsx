"use client";

import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

const WORDS = [
  { text: "discipline", color: "#FFFFFF"  },
  { text: "patience",   color: "#FFE4D6"  },
  { text: "hardwork",   color: "#FFFFFF"  },
];

const imgHero = "https://www.figma.com/api/mcp/asset/1fb6fe31-5631-429b-ac30-30cb648b65f9";
const imgDots = "https://www.figma.com/api/mcp/asset/d650960f-f64a-46ce-9265-32a899c5479c";

interface Props {
  onNext: () => void;
}

export default function Step1Welcome({ onNext }: Props) {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out
      setVisible(false);
      setTimeout(() => {
        // swap word then fade in
        setWordIdx((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 350);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-[#16141a] overflow-hidden">
      {/* Hero image — oscillates horizontally + bobs + breathes */}
      <img
        src={imgHero}
        alt="Person running with credit card"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Orange tint overlay — static */}
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
        <ProgressBar step={1} total={10} light />
      </div>

      {/* Headline + subtext — positioned at ~56% down */}
      <div
        className="absolute left-0 right-0 z-10 px-4 backdrop-blur-[0.75px] bg-[rgba(0,0,0,0.05)]"
        style={{ top: "475px" }}
      >
        <div className="pt-[7px]">
          <h1 className="font-[family-name:var(--font-alice)] text-[52px] leading-[49px] tracking-[-3.2px] text-white">
            Turn{" "}
            <span
              style={{
                color: WORDS[wordIdx].color,
                opacity: visible ? 1 : 0,
                transition: "opacity 0.35s ease-in-out",
                display: "inline",
              }}
            >
              {WORDS[wordIdx].text}
            </span>
            <br />
            into money
          </h1>
          <p
            className="mt-3 font-[family-name:var(--font-manrope)] font-medium text-[17px] leading-7 text-white"
            style={{ textShadow: "0 2px 20px #505050" }}
          >
            Lock your money. Unlock it with effort.
          </p>
        </div>
        {/* spacer to push footer clear of text */}
        <div className="h-[90px]" />
      </div>

      {/* CTA footer */}
      <div className="absolute bottom-0 left-0 right-0 z-10 backdrop-blur-[2px] bg-[rgba(23,20,20,0.02)] px-4 pb-10 pt-9">
        <button
          onClick={onNext}
          className="w-full h-[52px] flex items-center justify-center rounded-full bg-[#F16746] border border-[#f78b68] shadow-[inset_0px_3px_12px_0px_rgba(0,0,0,0.11)] font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 text-white active:opacity-80"
          style={{ touchAction: "manipulation" }}
        >
          Start challenge
        </button>
      </div>
    </div>
  );
}
