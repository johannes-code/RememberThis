import { useState } from "react";
import MemoryCard from "./components/MemoryCard";
import RegularButton from "./components/RegularButton";
import { emojiArrays } from "./data/emojiArray";

export default function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);

  function startGame() {
    const selectedArray = emojiArrays.smily; // You can change this to any array you want
    const shuffledEmojis = shuffleArray(selectedArray).slice(0, 10);
    setSelectedEmojis(
      [...shuffledEmojis, ...shuffledEmojis].sort(() => Math.random() - 0.5)
    );
    setFlippedCards([]);
    setIsGameOn(true);
  }

  function turnCard(index) {
    if (flippedCards.length === 2) return;
    setFlippedCards([...flippedCards, index]);

    if (flippedCards.length === 1) {
      setTimeout(() => checkMatch(), 1000);
    }
  }

  function checkMatch() {
    const [first, second] = flippedCards;
    if (selectedEmojis[first] === selectedEmojis[second]) {
      // Cards match, keep them flipped
    } else {
      // Cards don't match, flip back
      setFlippedCards([]);
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
        <MemoryCard
          emojis={selectedEmojis}
          flippedCards={flippedCards}
          handleClick={turnCard}
        />
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
