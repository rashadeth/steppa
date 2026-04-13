"use client";

import { useEffect, useState } from "react";
import { getTimeOfDayGreeting } from "@/lib/timeGreeting";

/** Re-evaluates on mount and every minute so the line matches the device clock over time. */
export function useTimeOfDayGreeting(): string {
  const [text, setText] = useState(() => getTimeOfDayGreeting());

  useEffect(() => {
    const update = () => setText(getTimeOfDayGreeting());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return text;
}
