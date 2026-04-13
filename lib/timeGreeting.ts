/**
 * Local-time greeting for the home header (device clock).
 * Bands: morning 5–11, afternoon 12–16, evening 17–21, night 22–4.
 */
export function getTimeOfDayGreeting(date: Date = new Date()): string {
  const h = date.getHours();
  if (h >= 5 && h < 12) return "Good morning";
  if (h >= 12 && h < 17) return "Good afternoon";
  if (h >= 17 && h < 22) return "Good evening";
  return "Good night";
}
