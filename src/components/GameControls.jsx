// src/components/GameControls.jsx
import RegularButton from "./common/RegularButton";
import { useGameStore } from "../stores/index.jsx";

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
