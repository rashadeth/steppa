"use client";

import { useCallback, useRef, useState } from "react";
import { Camera, UserCircle, X } from "@phosphor-icons/react";

async function fileToJpegDataUrl(file: File, maxEdge = 384, quality = 0.86): Promise<string> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(bmp.width, bmp.height));
  const w = Math.max(1, Math.round(bmp.width * scale));
  const h = Math.max(1, Math.round(bmp.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.drawImage(bmp, 0, 0, w, h);
  bmp.close();
  return canvas.toDataURL("image/jpeg", quality);
}

interface Props {
  imageUrl: string | null | undefined;
  onChange: (url: string | null) => void;
}

export default function ProfilePhotoPicker({ imageUrl, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setError(null);
  }, []);

  const onFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file || !file.type.startsWith("image/")) {
        setError("Please choose an image file.");
        return;
      }
      if (file.size > 12 * 1024 * 1024) {
        setError("Image is too large (max 12 MB).");
        return;
      }
      setBusy(true);
      setError(null);
      try {
        const dataUrl = await fileToJpegDataUrl(file);
        if (!dataUrl) throw new Error("Could not read image.");
        onChange(dataUrl);
        close();
      } catch {
        setError("Could not use this image. Try another photo.");
      } finally {
        setBusy(false);
      }
    },
    [onChange, close],
  );

  const hasPhoto = Boolean(imageUrl);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#e6e9ef] bg-white shadow-sm transition-opacity active:opacity-80"
        aria-label="Change profile photo"
      >
        {hasPhoto ? (
          <img src={imageUrl!} alt="" className="h-full w-full object-cover" />
        ) : (
          <UserCircle size={28} weight="regular" className="text-[#9898ac]" aria-hidden />
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[rgba(8,8,20,0.45)] p-0 sm:items-center sm:p-4"
          role="presentation"
          onClick={(ev) => {
            if (ev.target === ev.currentTarget) close();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-photo-title"
            className="flex max-h-[min(92dvh,720px)] w-full max-w-[400px] flex-col rounded-t-[24px] bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.12)] sm:rounded-[24px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#e6e9ef] px-5 py-4">
              <h2
                id="profile-photo-title"
                className="font-[family-name:var(--font-manrope)] font-semibold text-[18px] leading-6 text-[#5e160a]"
              >
                Profile photo
              </h2>
              <button
                type="button"
                onClick={close}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fafafc] text-[#444459]"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 pb-6 pt-4">
              <p className="font-[family-name:var(--font-manrope)] text-[13px] leading-5 text-[#64748b]">
                Upload a photo from your device. Your choice is saved on this device.
              </p>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFile}
              />

              <button
                type="button"
                disabled={busy}
                onClick={() => fileRef.current?.click()}
                className="mt-4 flex h-[52px] w-full items-center justify-center gap-2 rounded-full border border-[#e6e9ef] bg-[#fafafc] font-[family-name:var(--font-manrope)] font-semibold text-[15px] text-[#5e160a] disabled:opacity-60"
              >
                <Camera size={22} className="text-[#F16746]" />
                {busy ? "Working…" : "Upload from phone"}
              </button>

              {error && (
                <p className="mt-2 text-center font-[family-name:var(--font-manrope)] text-[13px] text-[#d4481f]">
                  {error}
                </p>
              )}

              {hasPhoto && (
                <button
                  type="button"
                  onClick={() => {
                    onChange(null);
                    close();
                  }}
                  className="mt-6 w-full py-2 font-[family-name:var(--font-manrope)] font-semibold text-[14px] text-[#64748b]"
                >
                  Remove photo
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
