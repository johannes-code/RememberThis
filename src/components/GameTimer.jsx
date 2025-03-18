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
  const [gameEnded, setGameEnded] = useState(0);

  useImperativeHandle(ref, () => ({
    startTimer,
    resetTimer,
    stopTimer,
    pauseTimer: () => {
      if (!isRunning) return;
      setIsRunning(false);
      clearInterval(timeInterval.current);
    },
    formatTime,
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

  const stopTimer = () => {
    setIsRunning(false);
    setGameEnded(true);
    clearInterval(timeInterval.current);
    return timer;
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
    let interval;
    if (isRunning && !gameEnded) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 10);
      }, 10);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning, gameEnded]);

  useEffect(() => {
    if (!props.isGameOn) {
      stopTimer();
    }
  }, [props.isGameOn]);

  return (
    <div>
      <p>Time: {formatTime(timer)}</p>
    </div>
  );
});
