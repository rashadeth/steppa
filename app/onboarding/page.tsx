import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

export const metadata = {
  title: "Get Started — Steppa",
};

export default function OnboardingPage() {
  return (
    <main className="flex items-center justify-center bg-gray-100" style={{ minHeight: "100dvh" }}>
      {/* Phone shell for desktop — full screen on mobile */}
      <div className="w-full max-w-[393px] relative bg-white overflow-hidden shadow-2xl rounded-none sm:rounded-[48px]" style={{ height: "100dvh", maxHeight: "852px" }}>
        <OnboardingFlow />
      </div>
    </main>
  );
}
