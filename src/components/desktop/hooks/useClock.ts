import { useState, useEffect } from "react";

export function useClock() {
  const [clockTime, setClockTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClockTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);

    return () => clearInterval(interval);
  }, []);

  return clockTime;
}
