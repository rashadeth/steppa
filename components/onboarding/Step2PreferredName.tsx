"use client";

import { useState } from "react";
import ScreenHeader from "./ScreenHeader";
import CTAButton from "./CTAButton";
import ScreenWithStickyFooter from "./ScreenWithStickyFooter";

const MAX_LEN = 48;

interface Props {
  onNext: (name: string) => void;
  onBack: () => void;
  defaultValue?: string;
}

export default function Step2PreferredName({ onNext, onBack, defaultValue }: Props) {
  const [value, setValue] = useState(defaultValue ?? "");

  const trimmed = value.trim();
  const canContinue = trimmed.length > 0;

  return (
    <ScreenWithStickyFooter
      footer={
        <CTAButton
          label="Continue"
          onClick={() => canContinue && onNext(trimmed)}
          disabled={!canContinue}
        />
      }
    >
      <ScreenHeader step={2} total={5} onBack={onBack} progressGroup="intro" />

      <div className="px-4 pb-6 pt-2 flex flex-col gap-4">
        <h2 className="font-[family-name:var(--font-manrope)] font-semibold text-[26px] leading-8 tracking-[-0.05rem] text-[#5e160a]">
          What should Steppa call you?
        </h2>
        <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#444459]">
          This is how we&apos;ll greet you on your home screen.
        </p>
      </div>

      <div className="px-4 pb-10">
        <label htmlFor="preferred-name" className="sr-only">
          Preferred name
        </label>
        <input
          id="preferred-name"
          type="text"
          name="preferredName"
          autoComplete="name"
          autoCapitalize="words"
          spellCheck={false}
          maxLength={MAX_LEN}
          placeholder="e.g. Alex"
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, MAX_LEN))}
          className="w-full rounded-2xl border border-[#e6e9ef] bg-[#fafafc] px-5 py-4 font-[family-name:var(--font-manrope)] text-[17px] leading-7 text-[#080814] outline-none ring-0 transition-colors placeholder:text-[#9898ac] focus:border-[#f16746] focus:bg-white"
        />
      </div>
    </ScreenWithStickyFooter>
  );
}
