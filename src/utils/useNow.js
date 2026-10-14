import { useEffect, useState } from "react";

// Current timestamp, refreshed every `intervalMs` while `active` is true.
export const useNow = (intervalMs = 1000, active = true) => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, active]);
  return now;
};
