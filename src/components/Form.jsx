// src/components/Form.jsx
import useGameStore from '../stores/game.store';
import RegularButton from "./common/RegularButton";

export default function Form() {
  const startGame = useGameStore(state => state.startGame);

  return (
    <div className="wrapper">
      <RegularButton type="button" onClick={startGame}>
        Start Game
      </RegularButton>
    </div>
  );
}
