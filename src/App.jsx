import { useState, useRef, useEffect } from "react";
import MemoryCard from "./components/MemoryCard";
import RegularButton from "./components/RegularButton";
import { emojiArrays } from "./data/emojiArray";
import { useClickCounter } from "./components/ClickCounter";
import { ScoreBoard } from "./components/ScoreBoard";
import { GameTimer } from "./components/GameTimer";

function shuffleArray(array) {
  if (!Array.isArray(array)) {
    console.error("Input is not an array: ", array);
    return [];
  }
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function CategorySelector({ categories, onSelect, currentCategory }) {
  return (
    <div>
      {Object.keys(categories).map((category) => (
        <RegularButton
          key={category}
          onClick={() => onSelect(category)}
          className={currentCategory === category ? "active" : ""}
        >
          {category}
        </RegularButton>
      ))}
      <RegularButton
        onClick={() => onSelect(null)}
        className={currentCategory === null ? "active" : ""}
      >
        Random
      </RegularButton>
      <ScoreBoard />
    </div>
  );
}

export default function App() {
  const [hasGameEnded, setHasGameEnded] = useState(false);
  const [isGameOn, setIsGameOn] = useState(false);
  const [highscores, setHighscores] = useState([]);
  const timerRef = useRef(null);
  const { count, increment, startCounting, stopCounting, resetCount } =
    useClickCounter();
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const handleCategoryChange = (category) => {
    console.log("Selected category:", category === null ? "random" : category);
    setCurrentCategory(category);
  };
  const [numberOfCards, setNumberOfCards] = useState(10);
  const handleNumberCardsChange = (int) => {
    setNumberOfCards(int);
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

  function startGame() {
    console.log("Starting game...");
    setHasGameEnded(false);
    hasUpdatedHighscore = false;
    timerRef.current.resetTimer();
    setIsGameOn(true);

    let selectedArray;
    if (currentCategory === null) {
      const allCategories = Object.keys(emojiArrays);
      const randomCategories = shuffleArray(allCategories).slice(0, 3);
      selectedArray = randomCategories.flatMap(
        (category) => emojiArrays[category]
      );
    } else {
      selectedArray = emojiArrays[currentCategory];
    }
    const shuffledEmojis = shuffleArray(selectedArray).slice(
      0,
      numberOfCards / 2
    );
    setSelectedEmojis(
      [...shuffledEmojis, ...shuffledEmojis].sort(() => Math.random() - 0.5)
    );
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
    console.log(
      `Emojis: ${selectedEmojis[first]} and ${selectedEmojis[second]}`
    );

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
  let hasUpdatedHighscore = false;

  function endGame() {
    if (hasUpdatedHighscore) return;
    hasUpdatedHighscore = true;
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
    
    
    setHighscores((prevScores) => {
      console.log("setHighscores called, current highscores:", prevScores);
      const newScoreWithId = { ...newScore, id: Date.now() };
      if (prevScores.some((score) => score.id === newScoreWithId.id)) {
        return prevScores;
      }
      const isNewHighScore =
        prevScores.length < 10 ||
        newScoreWithId.score > prevScores[prevScores.length - 1].score;
      if (isNewHighScore) {
        const playerName = prompt("New high score! Enter your name:");
        newScoreWithId.playerName = playerName || "No Name";
      }
      const updatedScores = [...prevScores, newScoreWithId]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      return updatedScores;
    });
  }

  return (
    <main>
      <h1>Memory</h1>
      <GameTimer ref={timerRef} />
      {!isGameOn ? (
        <>
          <p>Number of cards: {numberOfCards}</p>
          <input
            type="number"
            value={numberOfCards}
            onChange={(e) => {
              console.log("Input value:", e.target.value);
              handleNumberCardsChange(parseInt(e.target.value));
            }}
          />
          <CategorySelector
            categories={emojiArrays}
            onSelect={handleCategoryChange}
            currentCategory={currentCategory}
          />

          <RegularButton
            type="button"
            onClick={() => {
              startGame();
            }}
          >
            Start Game
          </RegularButton>

          <RegularButton
            type="button"
            onClick={() => {
              timerRef.current.resetTimer();
              startGame();
            }}
          >
            Restart Game
          </RegularButton>
        </>
      ) : (
        <>
          <MemoryCard
            emojis={selectedEmojis}
            flippedCards={flippedCards}
            matchedCards={matchedCards}
            handleClick={turnCard}
          />
          <RegularButton type="button" onClick={startGame}>
            Restart Game
          </RegularButton>

          <div>
            <h2>Highscores</h2>
            {highscores.map((score, index) => (
              <div
                key={index}
                style={{ borderBottom: "1px solid #ccc", padding: "10px" }}
              >
                <p>
                  <strong>Rank #{index + 1}</strong>
                </p>
                <p>Name: {score.playerName || "No Name"}</p>
                <p>Score: {score.score}</p>
                <p>Clicks: {score.clicks}</p>
                <p>Time: {score.time}</p>
                <p>Cards: {score.cardCount}</p>
                <p>Date: {new Date(score.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <p>Clicks: {count}</p>
        </>
      )}
    </main>
  );
}
