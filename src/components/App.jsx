"use client";

import { useEffect, useState } from "react";
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
  const { highscores, fetchHighscores } = useHighscoreStore();
  const { isGameOn, hasGameEnded, count, startGame } =
    useGameStore();
  const { isLoading, setIsLoading} = useState(true);
  

  useEffect(() => {
    const loadHighscores = async () => {
      setIsLoading(true);
      await fetchHighscores();
      setIsLoading(false);
  };

  loadHighscores();
  }, [fetchHighscores]);

  if (isLoading) {
    return <div>Loading highscores...</div>
  }
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
      <HighScoreList highscores={highscores} />
      <EndGameModal hasEnded={hasGameEnded} />
      <p>Clicks Counted: {count}</p>
    </main>
  );
}
