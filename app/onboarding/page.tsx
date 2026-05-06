import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

export const metadata = {
  title: "Get Started — Steppa",
};

export default function OnboardingPage() {
  return (
    <main className="m-0 flex h-dvh w-full min-w-0 flex-col overflow-hidden p-0 sm:items-center sm:justify-center sm:bg-gray-100">
      {/* Full-screen preview on mobile — edge to edge */}
      <div className="flex h-dvh w-full flex-col overflow-hidden sm:hidden">
        <OnboardingFlow />
      </div>

      {/* iPhone mockup frame on desktop for clean recording */}
      <div className="hidden sm:block sm:origin-center sm:scale-[0.62] md:scale-[0.72] lg:scale-[0.82] xl:scale-[0.9]">
        <div className="relative w-[430px] h-[900px] rounded-[62px] bg-[linear-gradient(160deg,#2a2a2f_0%,#0f1013_48%,#2d2f33_100%)] p-[9px] shadow-[0_35px_90px_rgba(0,0,0,0.3)] ring-1 ring-[#3a3d43]">
          {/* Side buttons */}
          <div className="absolute -left-[3px] top-[190px] h-10 w-[3px] rounded-l bg-[#2b2e33]" />
          <div className="absolute -left-[3px] top-[250px] h-16 w-[3px] rounded-l bg-[#2b2e33]" />
          <div className="absolute -left-[3px] top-[330px] h-16 w-[3px] rounded-l bg-[#2b2e33]" />
          <div className="absolute -right-[3px] top-[265px] h-24 w-[3px] rounded-r bg-[#2b2e33]" />

          <div className="relative w-full h-full rounded-[52px] bg-[#050506] p-[8px]">
            {/* Dynamic Island */}
            <div className="absolute top-[11px] left-1/2 -translate-x-1/2 z-20 h-[34px] w-[126px] rounded-[18px] bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
            <div className="absolute top-[22px] left-[calc(50%-46px)] z-30 h-[10px] w-[10px] rounded-full bg-[#16181d]" />
            <div className="absolute top-[22px] left-[calc(50%+35px)] z-30 h-[10px] w-[10px] rounded-full bg-[#1f2024]" />

            <div className="w-[393px] h-[852px] rounded-[44px] overflow-hidden bg-white">
              <OnboardingFlow />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
