// src/components/GameTimer.jsx
import { useTimerStore } from "../stores/index.jsx";

export function GameTimer() {
  const { formatTime } = useTimerStore();

  return (
    <div className="timer">
      <p>Time: {formatTime()}</p>
    </div>
  );
}
