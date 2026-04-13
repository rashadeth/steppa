"use client";

import { useState } from "react";
import ScreenHeader from "./ScreenHeader";
import CTAButton from "./CTAButton";
import ScreenWithStickyFooter from "./ScreenWithStickyFooter";

const PRESETS = [5000, 10000, 20000];
const AVAILABLE_BALANCE = 30000;

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
  const amountCharCount = displayAmount.replace(/\s/g, "").length;
  const shortfall = amount !== null && amount > AVAILABLE_BALANCE ? amount - AVAILABLE_BALANCE : 0;
  const exceedsBalance = shortfall > 0;

  function getAmountFontSize(count: number): string {
    if (count >= 11) return "32px";
    if (count >= 10) return "36px";
    if (count >= 9) return "40px";
    if (count >= 8) return "46px";
    return "64px";
  }

  return (
    <ScreenWithStickyFooter
      footer={
        <div className="flex flex-col gap-3">
          {exceedsBalance && (
            <button
              onClick={() => alert(`Deposit flow: add ₦${shortfall.toLocaleString()} to your vault.`)}
              className="w-full h-[52px] flex items-center justify-center rounded-full border border-[#d4481f] bg-white font-[family-name:var(--font-manrope)] font-semibold text-[16px] leading-5 text-[#d4481f]"
            >
              Deposit ₦{shortfall.toLocaleString()}
            </button>
          )}
          <CTAButton onClick={() => amount !== null && onNext(amount)} disabled={amount === null || exceedsBalance} />
        </div>
      }
    >
      <div className="pb-6 flex flex-col gap-4">
        <ScreenHeader step={1} total={5} onBack={onBack} />
        <div className="px-4 flex flex-col gap-4">
          <h2 className="font-[family-name:var(--font-manrope)] font-semibold text-[26px] leading-8 tracking-[-0.05rem] text-[#5e160a]">
            How much do you want to lock?
          </h2>
          <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#444459]">
            You&apos;ll unlock this after completing your challenge.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center px-8 pt-6 pb-8 gap-6">
        <div className={`w-full rounded-[24px] border px-5 py-6 ${exceedsBalance ? "border-[#d4481f] bg-[#fef2f2]" : "border-[#e6e9ef] bg-[#fafafc]"}`}>
          <p className="text-center font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#9898ac]">
            Available balance: ₦{AVAILABLE_BALANCE.toLocaleString()}
          </p>
          <div className="mt-2 w-full max-w-[320px] px-2 mx-auto flex items-center justify-center h-[77px]">
            {editing ? (
              <input
                type="text"
                inputMode="numeric"
                value={`₦${inputStr}`}
                onChange={handleInputChange}
                onBlur={() => setEditing(false)}
                autoFocus
                className="font-[family-name:var(--font-dm-sans)] font-semibold leading-none tracking-[-0.125rem] text-[#F16746] text-center w-full bg-transparent border-none outline-none focus:ring-0 whitespace-nowrap"
                style={{ fontSize: getAmountFontSize(amountCharCount) }}
              />
            ) : (
              <button
                onClick={() => setEditing(true)}
                className={`font-[family-name:var(--font-dm-sans)] font-semibold leading-none tracking-[-0.125rem] text-center whitespace-nowrap ${amount !== null ? "text-[#F16746]" : "text-[#e0e0e8]"}`}
                style={{ fontSize: getAmountFontSize(amountCharCount) }}
              >
                {displayAmount}
              </button>
            )}
          </div>
          {exceedsBalance && (
            <p className="mt-1 text-center font-[family-name:var(--font-manrope)] font-medium text-[13px] leading-5 text-[#d4481f]">
              Insufficient balance. Deposit ₦{shortfall.toLocaleString()} to continue.
            </p>
          )}
        </div>

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

        <p className="font-[family-name:var(--font-manrope)] text-[15px] leading-6 text-[#444459] text-center max-w-[240px]">
          Funds are held securely in a smart-lock vault until verification.
        </p>
      </div>
    </ScreenWithStickyFooter>
  );
}
