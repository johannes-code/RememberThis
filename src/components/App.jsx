"use client";

import { useEffect } from "react";
import { CategorySelector } from "./CategorySelector";
import { GameControls } from "./GameControls";
import { CardCounter } from "./CardCounter";
import GameBoard from "./GameBoard";
import { HighScoreList } from "./HighScoreList";
import { GameTimer } from "./GameTimer";
import { EndGameModal } from "./EndGameModal";

import { useGameStore, useHighscoreStore } from "../stores/index.jsx";

export default function App() {
  const { isGameOn, hasGameEnded, count, highscores, startGame } =
    useGameStore();

  const { fetchHighscores } = useHighscoreStore();
  useEffect(() => {
    fetchHighscores();
  }, [fetchHighscores]);

  return (
    <main>
      <h1>Memory Game</h1>
      <GameTimer />
      {!isGameOn ? (
        <>
          <CardCounter />
          <CategorySelector />
          <GameControls onStart={startGame} />
        </>
      ) : (
        <>
          <GameBoard />
          <HighScoreList highscores={highscores} />
        </>
      )}
      <EndGameModal hasEnded={hasGameEnded} />
      <p>Clicks Counted: {count}</p>
    </main>
  );
}
