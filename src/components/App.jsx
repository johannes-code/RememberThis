"use client";

import { useEffect } from "react";
import { CategorySelector } from "./CategorySelector";
import { GameControls } from "./GameControls";
import { CardCounter } from "./CardCounter";
import GameBoard from "./GameBoard";
import HighScoreList from "./HighScoreList";
import { GameTimer } from "./GameTimer";
import { EndGameModal } from "./EndGameModal";

import { useGameStore, useHighscoreStore } from "../stores/index.jsx";
import NameInput from "./NameInput.jsx";

export default function App() {
  const { isGameOn, hasGameEnded, count, startGame } =
    useGameStore();
  const fetchHighscores = useHighscoreStore(state => state.fetchHighscores);
  const { highscores } = useHighscoreStore();

  useEffect(() => {
    console.log("Component mounted, fetching highscores")
    fetchHighscores();
    console.log(fetchHighscores)
  }, []);


  return (
    <main>
      <h1>Memory Game</h1>
      <GameTimer />
      {!isGameOn ? (
        <>
          <CardCounter />
          <CategorySelector />
          <GameControls onStart={startGame} />
          <NameInput />
        </>
      ) : (
        <>
          <GameBoard />
        </>
      )}
      <p>Clicks Counted: {count}</p>
      <EndGameModal hasEnded={hasGameEnded} />
      <HighScoreList highscores={highscores} />
    </main>
  );
}
