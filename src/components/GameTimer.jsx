import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

export const GameTimer = forwardRef((props, ref) => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timeInterval = useRef(null);

  useImperativeHandle(ref, () => ({
    startTimer,
    resetTimer,
    pauseTimer: () => {
      if (!isRunning) return;
      setIsRunning(false);
      clearInterval(timeInterval.current);
    },
  }));

  const startTimer = () => {
    if (isRunning) return; // Prevent multiple intervals
    setIsRunning(true);
    timeInterval.current = setInterval(() => {
      setTimer((prev) => prev + 10); // Increment by 10ms
    }, 10);
  };

  const pauseTimer = () => {
    if (!isRunning) return; // Do nothing if not running
    setIsRunning(false);
    clearInterval(timeInterval.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(timeInterval.current);
    setTimer(0);
  };

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

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      clearInterval(timeInterval.current);
    };
  }, []);

  return (
    <div>
      <p>Time: {formatTime(timer)}</p>
    </div>
  );
});
