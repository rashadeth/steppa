export default function PhonePreview({ children }: { children: React.ReactNode }) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="w-[375px] h-[812px] scale-[0.75] origin-center rounded-[32px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.2)] bg-white">
          {children}
        </div>
      </div>
    );
  }
  