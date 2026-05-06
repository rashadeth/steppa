import sharp from "sharp";
import path from "path";
import { mkdirSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ICON = path.join(__dirname, "../public/icons/steppa.png");
const OUT = path.join(__dirname, "../public/splash");
const BG = { r: 0x5e, g: 0x16, b: 0x0a, alpha: 1 };

// Physical px → CSS viewport size + DPR for the <link media> query
const devices = [
  { w: 1320, h: 2868, cssW: 440, cssH: 956, dpr: 3 }, // iPhone 16 Pro Max
  { w: 1206, h: 2622, cssW: 402, cssH: 874, dpr: 3 }, // iPhone 16 Pro
  { w: 1290, h: 2796, cssW: 430, cssH: 932, dpr: 3 }, // iPhone 16 Plus / 15/14 Pro Max
  { w: 1179, h: 2556, cssW: 393, cssH: 852, dpr: 3 }, // iPhone 16 / 15/14 Pro
  { w: 1284, h: 2778, cssW: 428, cssH: 926, dpr: 3 }, // iPhone 14 Plus / 13/12 Pro Max
  { w: 1170, h: 2532, cssW: 390, cssH: 844, dpr: 3 }, // iPhone 14 / 13/12 Pro / 13
  { w: 1242, h: 2688, cssW: 414, cssH: 896, dpr: 3 }, // iPhone 11 Pro Max / XS Max
  { w: 1125, h: 2436, cssW: 375, cssH: 812, dpr: 3 }, // iPhone X / XS / 11 Pro
  { w: 828,  h: 1792, cssW: 414, cssH: 896, dpr: 2 }, // iPhone 11 / XR
  { w: 750,  h: 1334, cssW: 375, cssH: 667, dpr: 2 }, // iPhone SE (2nd/3rd gen)
  { w: 640,  h: 1136, cssW: 320, cssH: 568, dpr: 2 }, // iPhone SE (1st gen)
];

mkdirSync(OUT, { recursive: true });

for (const d of devices) {
  const iconSize = Math.round(d.w * 0.28);
  const icon = await sharp(ICON).resize(iconSize, iconSize).toBuffer();

  const file = path.join(OUT, `splash-${d.w}x${d.h}.png`);
  await sharp({ create: { width: d.w, height: d.h, channels: 4, background: BG } })
    .composite([{ input: icon, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toFile(file);

  console.log(`✓ splash-${d.w}x${d.h}.png  (icon ${iconSize}px, media ${d.cssW}×${d.cssH} @${d.dpr}x)`);
}

console.log("\nAll splash screens generated in public/splash/");
