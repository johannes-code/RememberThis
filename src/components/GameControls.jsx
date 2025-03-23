// src/components/GameControls.jsx
import React from 'react';
import RegularButton from "./common/RegularButton";
import useGameStore from '../stores/game.store';

export function GameControls() {
  const { startGame, restartGame } = useGameStore();

  return (
    <div>
      <RegularButton type="button" onClick={startGame}>
        Start Game
      </RegularButton>
      <RegularButton type="button" onClick={restartGame}>
        Restart Game
      </RegularButton>
    </div>
  );
}
