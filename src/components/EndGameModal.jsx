// src/components/EndGameModal.jsx

import {
  useGameStore,
  useClickStore,
  useTimerStore,
} from "../stores/index.jsx";

export function EndGameModal() {
  const hasGameEnded = useGameStore((state) => state.hasGameEnded);
  const clicks = useClickStore((state) => state.count);
  const finalTime = useTimerStore((state) => state.formatTime());

  if (!hasGameEnded) return null;

  return (
    <div className="modal">
      <h2>Congratulations!</h2>
      <p>You finished the game!</p>
      <p>Clicks: {clicks}</p>
      <p>Time: {finalTime}</p>
    </div>
  );
}
