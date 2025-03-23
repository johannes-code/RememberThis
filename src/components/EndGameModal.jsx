// src/components/EndGameModal.jsx

import useGameStore from '../stores/game.store';
import useClickStore from '../stores/click.store';
import useTimerStore from '../stores/timer.store';

export function EndGameModal() {
  const hasGameEnded = useGameStore(state => state.hasGameEnded);
  const clicks = useClickStore(state => state.count);
  const finalTime = useTimerStore(state => state.formatTime());

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
