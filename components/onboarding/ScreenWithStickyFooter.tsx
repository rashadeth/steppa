"use client";

import type { ReactNode } from "react";

/** Bottom padding clears iOS home indicator and reduces overlap with Safari’s bottom UI. */
const FOOTER_SAFE_PAD =
  "pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]";

type Props = {
  children: ReactNode;
  footer: ReactNode;
  /** Root column (default white background) */
  className?: string;
  /** Sticky footer strip — set background to match the screen */
  footerClassName?: string;
  scrollClassName?: string;
};

/**
 * Scrollable main region + primary actions pinned above the safe area.
 * Use on full-height onboarding steps so CTAs are not clipped on mobile.
 */
export default function ScreenWithStickyFooter({
  children,
  footer,
  className = "bg-white",
  footerClassName = "bg-white",
  scrollClassName = "",
}: Props) {
  return (
    <div className={`flex min-h-dvh flex-col ${className}`}>
      <div
        className={`min-h-0 flex-1 overflow-y-auto overscroll-y-contain ${scrollClassName}`}
      >
        {children}
      </div>
      <div
        className={`sticky bottom-0 z-20 shrink-0 px-4 pt-4 ${FOOTER_SAFE_PAD} ${footerClassName}`}
      >
        {footer}
      </div>
    </div>
  );
}
