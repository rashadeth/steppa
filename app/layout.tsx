import type { Metadata } from "next";
import { Manrope, Alice, DM_Sans } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const alice = Alice({
  variable: "--font-alice",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Steppa — Turn Discipline into Money",
  description: "Lock your money. Unlock it with effort. Complete daily step goals to earn your money back.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${alice.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-gray-100">{children}</body>
    </html>
  );
}
