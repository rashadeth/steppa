"use client";

import { useState } from "react";
import { WarningCircle, X } from "@phosphor-icons/react";

type SheetView = "menu" | "abort-confirm" | "dispute";

function breakFeeNaira(lockAmount: number): number {
  return Math.max(500, Math.round(lockAmount * 0.15));
}

interface Props {
  open: boolean;
  onClose: () => void;
  lockAmount: number;
  consequence?: "extend" | "penalty";
  onAbortChallenge: () => void;
}

export default function ChallengeManageSheet({
  open,
  onClose,
  lockAmount,
  consequence,
  onAbortChallenge,
}: Props) {
  const [view, setView] = useState<SheetView>("menu");
  const [acceptedPenalty, setAcceptedPenalty] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");

  const fee = breakFeeNaira(lockAmount);
  const remainder = Math.max(0, lockAmount - fee);

  const resetAndClose = () => {
    setView("menu");
    setAcceptedPenalty(false);
    setDisputeReason("");
    onClose();
  };

  if (!open) return null;

  const consequenceHint =
    consequence === "penalty"
      ? "Your challenge rules also include charity penalties for missed days."
      : "Your challenge rules include extending the lock if you miss goals.";

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-[rgba(8,8,20,0.45)] p-0 sm:items-center sm:p-4"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) resetAndClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="challenge-sheet-title"
        className="flex max-h-[min(90dvh,640px)] w-full max-w-[400px] flex-col rounded-t-[24px] bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.12)] sm:rounded-[24px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#e6e9ef] px-5 py-4">
          <h2
            id="challenge-sheet-title"
            className="font-[family-name:var(--font-manrope)] font-semibold text-[18px] leading-6 text-[#5e160a]"
          >
            {view === "menu" && "Challenge options"}
            {view === "abort-confirm" && "Abort challenge"}
            {view === "dispute" && "Settle a dispute"}
          </h2>
          <button
            type="button"
            onClick={resetAndClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fafafc] text-[#444459]"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 pb-6 pt-4">
          {view === "menu" && (
            <>
              <div className="flex gap-3 rounded-2xl border border-[#ffd9cc] bg-[#fff3ef] px-4 py-3">
                <WarningCircle size={24} weight="fill" className="shrink-0 text-[#F16746]" />
                <div>
                  <p className="font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-5 text-[#5e160a]">
                    Ending early has a cost
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#444459]">
                    If you <strong className="text-[#5e160a]">abort</strong> this challenge, a{" "}
                    <strong className="text-[#5e160a]">break fee of ₦{fee.toLocaleString()}</strong>{" "}
                    (15% of your lock, minimum ₦500) is kept by Steppa. The remaining{" "}
                    <strong className="text-[#5e160a]">₦{remainder.toLocaleString()}</strong> is queued
                    for release after a short review (typically 5–7 days). {consequenceHint}
                  </p>
                </div>
              </div>

              <p className="mt-4 font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#64748b]">
                If something went wrong and you should not be penalised, open a dispute instead of
                aborting—we will review your case.
              </p>

              <button
                type="button"
                onClick={() => setView("dispute")}
                className="mt-4 h-[52px] w-full rounded-full border border-[#e6e9ef] bg-white font-[family-name:var(--font-manrope)] font-semibold text-[16px] text-[#5e160a]"
              >
                Settle dispute
              </button>

              <button
                type="button"
                onClick={() => {
                  setAcceptedPenalty(false);
                  setView("abort-confirm");
                }}
                className="mt-3 h-[52px] w-full rounded-full border border-[#d4481f] bg-white font-[family-name:var(--font-manrope)] font-semibold text-[16px] text-[#d4481f]"
              >
                Abort challenge…
              </button>
            </>
          )}

          {view === "abort-confirm" && (
            <>
              <p className="font-[family-name:var(--font-manrope)] text-[14px] leading-6 text-[#444459]">
                You are about to end this challenge early. The{" "}
                <strong className="text-[#5e160a]">₦{fee.toLocaleString()}</strong> break fee applies
                immediately; <strong className="text-[#5e160a]">₦{remainder.toLocaleString()}</strong>{" "}
                will follow after review. This cannot be undone from the app.
              </p>

              <label className="mt-5 flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={acceptedPenalty}
                  onChange={(e) => setAcceptedPenalty(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-[#e0e0e8] text-[#F16746] focus:ring-[#F16746]"
                />
                <span className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#444459]">
                  I understand the break fee and that my challenge will end.
                </span>
              </label>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  disabled={!acceptedPenalty}
                  onClick={() => {
                    onAbortChallenge();
                  }}
                  className="h-[52px] w-full rounded-full bg-[#d4481f] font-[family-name:var(--font-manrope)] font-semibold text-[16px] text-white shadow-sm disabled:cursor-not-allowed disabled:bg-[#e0e0e8] disabled:text-[#a0a8b8]"
                >
                  Confirm abort
                </button>
                <button
                  type="button"
                  onClick={() => setView("menu")}
                  className="h-12 font-[family-name:var(--font-manrope)] font-semibold text-[15px] text-[#64748b]"
                >
                  Back
                </button>
              </div>
            </>
          )}

          {view === "dispute" && (
            <>
              <p className="font-[family-name:var(--font-manrope)] text-[14px] leading-6 text-[#444459]">
                Tell us what happened. If we accept your dispute, we may waive or reduce penalties
                instead of treating this as a voluntary abort.
              </p>
              <label htmlFor="dispute-reason" className="sr-only">
                Reason for dispute
              </label>
              <textarea
                id="dispute-reason"
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value.slice(0, 1200))}
                rows={6}
                placeholder="e.g. Injury with doctor’s note, bank failed top-up, app didn’t record steps…"
                className="mt-3 w-full resize-none rounded-2xl border border-[#e6e9ef] bg-[#fafafc] px-4 py-3 font-[family-name:var(--font-manrope)] text-[15px] leading-6 text-[#080814] outline-none placeholder:text-[#9898ac] focus:border-[#F16746] focus:bg-white"
              />
              <p className="mt-2 text-right font-[family-name:var(--font-manrope)] text-[12px] text-[#9898ac]">
                {disputeReason.trim().length}/1200
              </p>

              <button
                type="button"
                disabled={disputeReason.trim().length < 20}
                onClick={() => {
                  // TODO: POST to disputes API
                  alert(
                    "Dispute submitted. Our team will review your case and contact you within 2–3 business days.",
                  );
                  resetAndClose();
                }}
                className="mt-4 h-[52px] w-full rounded-full bg-[#F16746] font-[family-name:var(--font-manrope)] font-semibold text-[16px] text-white shadow-sm disabled:cursor-not-allowed disabled:bg-[#e0e0e8] disabled:text-[#a0a8b8]"
              >
                Submit dispute
              </button>
              <button
                type="button"
                onClick={() => setView("menu")}
                className="mt-2 h-12 font-[family-name:var(--font-manrope)] font-semibold text-[15px] text-[#64748b]"
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
