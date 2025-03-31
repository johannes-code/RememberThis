// src/components/EndGameModal.jsx

import { useGameStore, useTimerStore } from "../stores/index.jsx";

export function EndGameModal() {
  const hasGameEnded = useGameStore((state) => state.hasGameEnded);
  const finalTime = useTimerStore((state) => state.formatTime());

  if (!hasGameEnded) return null;

  return (
    <div className="modal">
      <h2>Congratulations!</h2>
      <p>You finished the game!</p>
      <p>Time: {finalTime}</p>
    </div>
  );
}
