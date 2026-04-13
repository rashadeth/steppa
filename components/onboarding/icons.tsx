// Inline SVG icon library — no external URLs, renders instantly.
// All icons use currentColor so callers control color via className/style.
// Radio controls use fixed colors (grey / orange) since they're stateful primitives.

interface P { className?: string; size?: number }

// ─── Radio controls ──────────────────────────────────────────

export function RadioEmpty({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#d1d5db" strokeWidth="1.5" />
    </svg>
  );
}

export function RadioFilled({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#F16746" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" fill="#F16746" />
    </svg>
  );
}

// ─── Step 2 – Goal Selection ─────────────────────────────────

export function WalkingIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      {/* head */}
      <circle cx="13" cy="4.5" r="1.75" fill="currentColor" stroke="none" />
      {/* torso, leaning into stride */}
      <line x1="13" y1="6.25" x2="11.5" y2="11.5" />
      {/* arms */}
      <line x1="12.5" y1="8.5" x2="9.5" y2="10.5" />
      <line x1="12.5" y1="8" x2="15.5" y2="9.5" />
      {/* legs */}
      <line x1="11.5" y1="11.5" x2="9" y2="17" />
      <line x1="11.5" y1="11.5" x2="14.5" y2="16.5" />
      {/* feet */}
      <line x1="9" y1="17" x2="7" y2="20" />
      <line x1="14.5" y1="16.5" x2="17" y2="19.5" />
    </svg>
  );
}

export function DumbbellIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      {/* outer weight plates */}
      <rect x="2" y="9.5" width="3" height="5" rx="1" />
      <rect x="19" y="9.5" width="3" height="5" rx="1" />
      {/* inner collars */}
      <rect x="5" y="10.5" width="2.5" height="3" rx="0.5" />
      <rect x="16.5" y="10.5" width="2.5" height="3" rx="0.5" />
      {/* bar */}
      <line x1="7.5" y1="12" x2="16.5" y2="12" />
    </svg>
  );
}

export function SavingIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      {/* wallet body */}
      <path d="M20 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" />
      {/* pocket */}
      <path d="M22 12h-4a2 2 0 0 0 0 4h4v-4z" />
      {/* coin slot line */}
      <line x1="4" y1="6" x2="5.5" y2="3" />
      <line x1="8" y1="6" x2="9.5" y2="3" />
    </svg>
  );
}

// ─── Step 3 – Motivation ─────────────────────────────────────

export function TrophyIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      {/* cup */}
      <path d="M8 3h8l2 7a6 6 0 0 1-12 0L8 3z" />
      {/* handles */}
      <path d="M8 3H5.5a2 2 0 0 0 0 4H8" />
      <path d="M16 3h2.5a2 2 0 0 1 0 4H16" />
      {/* stem + base */}
      <line x1="12" y1="16" x2="12" y2="20" />
      <line x1="8" y1="20" x2="16" y2="20" />
    </svg>
  );
}

export function ShieldIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      {/* lock shackle inside */}
      <rect x="9" y="11" width="6" height="5" rx="1" />
      <path d="M10 11V9a2 2 0 0 1 4 0v2" />
    </svg>
  );
}

// ─── Step 6 – Consequence ────────────────────────────────────

export function ClockLockIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      {/* clock face */}
      <circle cx="10" cy="12" r="8" />
      <polyline points="10 7 10 12 13.5 14" />
      {/* small lock badge bottom-right */}
      <rect x="15.5" y="16" width="5" height="4" rx="1" />
      <path d="M16.5 16v-1.5a1.5 1.5 0 0 1 3 0V16" />
    </svg>
  );
}

export function SendMoneyIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      {/* hand */}
      <path d="M14.5 15H9a4 4 0 0 1 0-8h7.5" />
      {/* coin */}
      <circle cx="17" cy="7" r="3" />
      <line x1="17" y1="5.5" x2="17" y2="8.5" />
      <line x1="15.5" y1="7" x2="18.5" y2="7" />
      {/* send arrow */}
      <path d="M2 19l5-3-5-3v6z" />
      <line x1="7" y1="16" x2="13" y2="16" />
    </svg>
  );
}

// ─── Step 7 – Permissions ────────────────────────────────────

export function HeartIllustration({ size = 130 }: { size?: number }) {
  // Two-heart illustration matching the vuesax/linear/lovely Figma component.
  // Larger back heart slightly offset; smaller front heart overlapping.
  return (
    <svg width={size} height={size} viewBox="0 0 130 130" fill="none">
      {/* back heart — larger, offset up-left */}
      <path
        d="M55 28c-8-14-30-14-34 2-4 14 8 26 34 44 26-18 38-30 34-44-4-16-26-16-34-2z"
        fill="#F16746" stroke="white" strokeWidth="2"
      />
      {/* front heart — smaller, offset down-right */}
      <path
        d="M80 55c-6-10-22-10-25 1.5-3 10 6 19 25 32 19-13 28-22 25-32-3-11.5-19-11.5-25-1.5z"
        fill="#EF5D3E" stroke="white" strokeWidth="2"
      />
    </svg>
  );
}

export function CheckIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

// ─── Step 8 – Summary ────────────────────────────────────────

export function TargetIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CalendarIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      {/* date cells */}
      <line x1="8" y1="14" x2="8" y2="14" strokeWidth="2.5" />
      <line x1="12" y1="14" x2="12" y2="14" strokeWidth="2.5" />
      <line x1="16" y1="14" x2="16" y2="14" strokeWidth="2.5" />
      <line x1="8" y1="18" x2="8" y2="18" strokeWidth="2.5" />
      <line x1="12" y1="18" x2="12" y2="18" strokeWidth="2.5" />
    </svg>
  );
}

export function VaultIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      {/* safe body */}
      <rect x="2" y="3" width="18" height="18" rx="2" />
      {/* dial */}
      <circle cx="11" cy="12" r="4" />
      <line x1="11" y1="10" x2="11" y2="12" />
      {/* handle */}
      <line x1="20" y1="10" x2="22" y2="10" />
      <line x1="20" y1="14" x2="22" y2="14" />
      {/* hinges */}
      <line x1="2" y1="7" x2="5" y2="7" />
      <line x1="2" y1="17" x2="5" y2="17" />
    </svg>
  );
}

export function ShieldTickIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

// ─── Step 9 – Goal Created ───────────────────────────────────

// 4-pointed sparkle star — replaces 🎉
export function CelebrationIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2 L13.9 10.1 L22 12 L13.9 13.9 L12 22 L10.1 13.9 L2 12 L10.1 10.1 Z" />
      <circle cx="19.5" cy="4.5" r="1.3" />
      <circle cx="4.5" cy="19.5" r="1" />
      <circle cx="20" cy="18" r="0.8" />
    </svg>
  );
}

// Padlock (filled) — replaces 💰 "Locked"
export function LockFilledIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="4.5" y="11" width="15" height="11" rx="2.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Sneaker side view — replaces 👟
export function SneakerFilledIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3.5 15.5 C3.5 15.5 4 12.5 7.5 12 L11 12 L13.5 8.5 L16.5 8.5 C19 8.5 21.5 10 21.5 12.5 L21.5 13.5 C21.5 14.6 20.6 15.5 19.5 15.5 Z" />
      <rect x="3" y="15.5" width="19" height="3" rx="1.5" />
    </svg>
  );
}

// Calendar (filled) — replaces 📅
export function CalendarFilledIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="3" y="5.5" width="18" height="16" rx="2.5" />
      <rect x="8" y="2" width="2.2" height="5" rx="1.1" />
      <rect x="13.8" y="2" width="2.2" height="5" rx="1.1" />
      <rect x="3" y="9.5" width="18" height="1.5" fill="white" opacity="0.2" />
      <circle cx="8.5" cy="14.5" r="1.2" fill="white" opacity="0.65" />
      <circle cx="12" cy="14.5" r="1.2" fill="white" opacity="0.65" />
      <circle cx="15.5" cy="14.5" r="1.2" fill="white" opacity="0.65" />
      <circle cx="8.5" cy="18.5" r="1.2" fill="white" opacity="0.65" />
      <circle cx="12" cy="18.5" r="1.2" fill="white" opacity="0.65" />
    </svg>
  );
}

// Running figure — replaces 🏃 in CTA
export function RunnerFilledIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="14.5" cy="4" r="2" />
      {/* torso + arms */}
      <path d="M13 6.5 L10.5 12 L7 13.5 L8 15.5 L12.5 13.5 L15.5 8.5 L18 10.5 L19.5 9 L16 5.5 Z" />
      {/* front leg */}
      <path d="M10.5 12 L8.5 17 L6.5 20 L8.5 21 L11 18 L13 13.5 Z" />
      {/* back leg */}
      <path d="M12.5 13.5 L14 18 L16 20.5 L17.5 19 L16 17 L14.5 13 Z" />
    </svg>
  );
}

// ─── Step 10 – Paywall ───────────────────────────────────────

export function BarChartIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}

export function TrendingUpIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

export function UsersIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function CloseIcon({ size = 20, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
