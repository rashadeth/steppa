"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1500);
    const goneTimer = setTimeout(() => setGone(true), 1900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(goneTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#16141a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fading ? 0 : 1,
        transition: fading ? "opacity 400ms ease-out" : "none",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <Image
        src="/icons/steppa.png"
        alt="Steppa"
        width={110}
        height={110}
        priority
        style={{ borderRadius: 24 }}
      />
    </div>
  );
}
