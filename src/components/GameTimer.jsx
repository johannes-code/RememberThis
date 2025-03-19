import { useState, useRef, useEffect } from "react";

export function GameTimer({ ref: timerRef }) {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timeInterval = useRef(null);

  const formatTime = (timer) => {
    const hours = Math.floor(timer / 3600000)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timer / 60000) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((timer / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const milliseconds = (timer % 1000).toString().padStart(3, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimer(0);
  };

  if (timerRef && "current" in timerRef) {
    timerRef.current = {
      startTimer,
      stopTimer,
      resetTimer,
      formatTime,
      time: timer,
    };
  }

  useEffect(() => {
    if (isRunning) {
      timeInterval.current = setInterval(() => {
        setTimer((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(timeInterval.current);
    }
    return () => clearInterval(timeInterval.current);
  }, [isRunning]);

  return (
    <div className="timer">
      <p>Time: {formatTime(timer)}</p>
    </div>
  );
}
