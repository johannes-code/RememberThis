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
  const { setIsLoading} = useState(true);
  

  useEffect(() => {
    let isMounted = true;
    const loadHighscores = async () => {
      try {
        setIsLoading(true);
        await fetchHighscores();
        if (isMounted) setIsLoading(false);
      } catch (error) {
        if (isMounted) {
          console.error("Loading failed:", error);
          setIsLoading(false);  // Add this line
        }
      }
    };
  
    loadHighscores();
    return () => { isMounted = false };
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
