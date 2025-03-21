"use client"

import { useState, useRef, useEffect } from "react";
import { emojiArrays } from "../data/emojiArray";
import { useClickCounter } from "./ClickCounter";
import { shuffleArray } from "./ShuffleArray";
import { CategorySelector } from "./CategorySelector";
import { GameControls } from "./GameControls";
import { CardCounter } from "./CardCounter";
import { GameBoard } from "./GameBoard";
import { HighScoreList } from "./HighScoreList";
import { GameTimer } from "./GameTimer";
import { EndGameModal } from "./EndGameModal";

export default function App() {
  const [hasGameEnded, setHasGameEnded] = useState(false);
  const [isGameOn, setIsGameOn] = useState(false);
  const [highscores, setHighscores] = useState([]);
  const timerRef = useRef(null);
  const { count, increment, startCounting, stopCounting, resetCount } = useClickCounter();
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [numberOfCards, setNumberOfCards] = useState(10);

  const handleCategoryChange = (category) => {
    console.log("Selected category:", category === null ? "random" : category);
    setCurrentCategory(category);
  };

  const handleNumberCardsChange = (int) => {
    setNumberOfCards(int);
  };

  const fetchHighscores = async () => {
    try {
      const response = await fetch("/api/highscores");
      const data = await response.json();
      setHighscores(data);
    } catch (error) {
      console.error("Error fetching highscores:", error);
    }
  };

  const saveHighscore = async (newScore) => {
    try {
      await fetch("/api/highscores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newScore),
      });
      fetchHighscores();
    } catch (error) {
      console.error("Error saving highscore:", error);
    }
  };

  useEffect(() => {
    if (isGameOn) {
      timerRef.current.startTimer();
    } else {
      timerRef.current.stopTimer();
    }
    return () => {
      timerRef.current.stopTimer();
    };
  }, [isGameOn]);

  useEffect(() => {
    fetchHighscores();
  }, []);

  function startGame() {
    console.log("Starting game...");
    setHasGameEnded(false);
    timerRef.current.resetTimer();
    setIsGameOn(true);

    let selectedArray;
    if (currentCategory === null) {
      const allCategories = Object.keys(emojiArrays);
      const randomCategories = shuffleArray(allCategories).slice(0, 3);
      selectedArray = randomCategories.flatMap((category) => emojiArrays[category]);
    } else {
      selectedArray = emojiArrays[currentCategory];
    }
    const shuffledEmojis = shuffleArray(selectedArray).slice(0, numberOfCards / 2);
    setSelectedEmojis([...shuffledEmojis, ...shuffledEmojis].sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMatchedCards([]);
    resetCount();
    startCounting();

    console.log("Game started, isGameOn", true);
    console.log(count);
  }

  function turnCard(index) {
    if (flippedCards.length === 2 || matchedCards.includes(index)) return;

    increment();

    setFlippedCards((prev) => {
      const newFlippedCards = [...prev, index];
      if (newFlippedCards.length === 2) {
        checkMatch(newFlippedCards);
      }
      return newFlippedCards;
    });
  }

  function checkMatch(currentFlippedCards) {
    const [first, second] = currentFlippedCards;
    console.log(`Comparing cards: ${first} and ${second}`);
    console.log(`Emojis: ${selectedEmojis[first]} and ${selectedEmojis[second]}`);

    if (selectedEmojis[first] === selectedEmojis[second]) {
      console.log(`Match found! Emoji: ${selectedEmojis[first]}`);
      const newMatchedCards = [...matchedCards, first, second];
      setMatchedCards(newMatchedCards);
      setFlippedCards([]);

      if (newMatchedCards.length === selectedEmojis.length && !hasGameEnded) {
        setHasGameEnded(true);
        stopCounting();
        console.log("All cards matched! GG.");
        endGame();
      }
    } else {
      console.log("No match. Flipping cards back.");
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  }

  function endGame() {
    if (hasGameEnded) return;
    console.log("endGame called. current count:", count);
    timerRef.current?.stopTimer();
    const finalTime = timerRef.current?.formatTime(timerRef.current.time);
    stopCounting();
    const newScore = {
      score: 10,
      clicks: count + 1,
      time: finalTime,
      cardCount: numberOfCards,
      timestamp: new Date().toISOString(),
    };
    saveHighscore(newScore);
  }

  return (
    <main>
      <h1>Memory</h1>
      <GameTimer ref={timerRef} />
      {!isGameOn ? (
        <>
          <CardCounter 
            numberOfCards={numberOfCards} 
            onNumberCardsChange={handleNumberCardsChange} 
          />
          <CategorySelector
            categories={emojiArrays}
            onSelect={handleCategoryChange}
            currentCategory={currentCategory}
          />
          <GameControls
            onStartGame={startGame}
            onRestartGame={() => {
              timerRef.current.resetTimer();
              startGame();
            }}
          />
        </>
      ) : (
        <>
          <GameBoard
            emojis={selectedEmojis}
            flippedCards={flippedCards}
            matchedCards={matchedCards}
            handleCardClick={turnCard}
          />
          <GameControls
            onStartGame={startGame}
            onRestartGame={() => {
              timerRef.current.resetTimer();
              startGame();
            }}
          />
          <HighScoreList highscores={highscores} />
          <p>Clicks: {count}</p>
        </>
      )}
      <EndGameModal 
        hasGameEnded={hasGameEnded} 
        clicks={count} 
        finalTime={timerRef.current?.formatTime(timerRef.current.time)} 
      />
    </main>
  );
}
