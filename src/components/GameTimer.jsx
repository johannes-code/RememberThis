// src/components/GameTimer.jsx
"user client";

import { useTimerStore } from "../stores/index.jsx";
import { useState, useEffect } from "react";

function useTimer() {
  const [time, setTime] = useState();
  const { timer, isRunning } = useTimerStore();

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime(timer);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isRunning, timer]);

  return time;
}

export function GameTimer() {
  const formatTime = useTimerStore((state) => state.formatTime);
  const time = useTimer();

  return (
    <div className="timer">
      <p>Elapsed Time: {formatTime(time)}</p>
    </div>
  );
}
