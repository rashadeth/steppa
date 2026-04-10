"use client";

import { useState } from "react";
import ScreenHeader from "./ScreenHeader";
import CTAButton from "./CTAButton";

const PRESETS = [5000, 10000, 20000];

interface Props {
  onNext: (amount: number) => void;
  onBack: () => void;
  defaultValue?: number;
}

export default function Step5MoneyLock({ onNext, onBack, defaultValue }: Props) {
  const [amount, setAmount] = useState<number | null>(defaultValue ?? null);
  const [inputStr, setInputStr] = useState(defaultValue ? defaultValue.toLocaleString() : "");
  const [editing, setEditing] = useState(false);

  const handlePreset = (val: number) => {
    setAmount(val);
    setInputStr(val.toLocaleString());
    setEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const num = Number(raw);
    setInputStr(raw ? Number(raw).toLocaleString() : "");
    if (num > 0) setAmount(num);
    else setAmount(null);
  };

  const displayAmount = amount !== null
    ? (editing ? `₦${inputStr}` : `₦${amount.toLocaleString()}`)
    : "₦– – –";

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="pb-6 flex flex-col gap-4 shrink-0">
        <ScreenHeader step={6} total={10} onBack={onBack} />
        <div className="px-4 flex flex-col gap-4">
          <h2 className="font-[family-name:var(--font-manrope)] font-semibold text-[26px] leading-8 tracking-[-0.05rem] text-[#5e160a]">
            How much do you want to lock?
          </h2>
          <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#444459]">
            You&apos;ll unlock this after completing your challenge.
          </p>
        </div>
      </div>

      {/* Amount input area */}
      <div className="flex-1 flex flex-col items-center pt-12 px-8 gap-8">
        {/* Big amount display */}
        <div className="w-[239px] flex items-center justify-center h-[77px]">
          {editing ? (
            <input
              type="text"
              inputMode="numeric"
              value={`₦${inputStr}`}
              onChange={handleInputChange}
              onBlur={() => setEditing(false)}
              autoFocus
              className="font-[family-name:var(--font-dm-sans)] font-semibold text-[64px] leading-6 tracking-[-0.125rem] text-[#F16746] text-center w-full bg-transparent border-none outline-none focus:ring-0"
            />
          ) : (
            <button
              onClick={() => setEditing(true)}
              className={`font-[family-name:var(--font-dm-sans)] font-semibold text-[64px] leading-6 tracking-[-0.125rem] text-center ${amount !== null ? "text-[#F16746]" : "text-[#e0e0e8]"}`}
            >
              {displayAmount}
            </button>
          )}
        </div>

        {/* Quick select buttons */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {PRESETS.map((p) => {
            const isActive = amount !== null && amount === p && !editing;
            return (
              <button
                key={p}
                onClick={() => handlePreset(p)}
                className={`h-[60px] flex items-center justify-center rounded-full border font-[family-name:var(--font-manrope)] font-medium text-[17px] leading-7 ${
                  isActive
                    ? "bg-[#5e160a] text-white border-[#5e160a]"
                    : "bg-white text-[#444459] border-[#9898ac]"
                }`}
              >
                ₦{p.toLocaleString()}
              </button>
            );
          })}
        </div>

        {/* Security note */}
        <p className="font-[family-name:var(--font-manrope)] text-[15px] leading-6 text-[#444459] text-center max-w-[240px]">
          Funds are held securely in a smart-lock vault until verification.
        </p>
      </div>

      {/* Footer CTA */}
      <div className="px-4 pb-12 pt-6 shrink-0">
        <CTAButton onClick={() => amount !== null && onNext(amount)} disabled={amount === null} />
      </div>
    </div>
  );
}
