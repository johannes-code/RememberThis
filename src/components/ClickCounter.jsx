import { useState, useCallback } from "react";

export function useClickCounter() {
  const [count, setCount] = useState(0);
  const [isCountingActive, setIsCountingActive] = useState(false);

  const increment = useCallback(() => {
    if (isCountingActive) {
      setCount((prevCount) => prevCount + 1);
    }
  }, [isCountingActive]);

  const startCounting = useCallback(() => {
    setIsCountingActive(true);
  }, []);

  const stopCounting = useCallback(() => {
    setIsCountingActive(false);
  }, []);

  const resetCount = useCallback(() => {
    setCount(0);
    setIsCountingActive(false);
  }, []);

  return { count, increment, startCounting, stopCounting, resetCount };
}
