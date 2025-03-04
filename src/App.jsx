import { useState } from "react";
import MemoryCard from "./components/MemoryCard";
import RegularButton from "./components/RegularButton";
import { emojiArrays } from "./data/emojiArray";

export default function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  function startGame() {
    setFlippedCards([]);
    setMatchedCards([]);

    setTimeout(() => {
      const selectedArray = emojiArrays.smily;
      const shuffledEmojis = shuffleArray(selectedArray).slice(0, 10);
      setSelectedEmojis(
        [...shuffledEmojis, ...shuffledEmojis].sort(() => Math.random() - 0.5)
      );
      setFlippedCards([]);
      setIsGameOn(true);
    });
  }

  function turnCard(index) {
    if (flippedCards.length === 2 || matchedCards.includes(index)) return;

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
      setMatchedCards((prev) => [...prev, first, second]);
      setFlippedCards([]);
    } else {
      console.log("No match. Flipping cards back.");
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  }

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn ? (
        <RegularButton type="button" handleClick={startGame}>
          Start Game
        </RegularButton>
      ) : (
        <>
          <MemoryCard
            emojis={selectedEmojis}
            flippedCards={flippedCards}
            matchedCards={matchedCards}
            handleClick={turnCard}
          />

          <RegularButton type="button" handleClick={startGame}>
            Restart Game
          </RegularButton>
        </>
      )}
    </main>
  );
}

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
