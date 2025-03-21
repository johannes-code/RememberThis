// GameControls.jsx
import RegularButton from "./RegularButton";

export function GameControls({ onStartGame, onRestartGame }) {
  return (
    <div>
      <RegularButton type="button" onClick={onStartGame}>
        Start Game
      </RegularButton>
      <RegularButton type="button" onClick={onRestartGame}>
        Restart Game
      </RegularButton>
    </div>
  );
}