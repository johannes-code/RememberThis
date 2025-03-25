// src/components/GameTimer.jsx
import { useTimerStore } from "../stores/index.jsx";

export function GameTimer() {
  const formatTime = useTimerStore((state) => state.formatTime);

  return (
    <div className="timer">
      <p>Elapsed Time: {formatTime()}</p>
    </div>
  );
}
