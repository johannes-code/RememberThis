import { useState } from "react";
import MemoryCard from "./components/MemoryCard";
import RegularButton from "./components/RegularButton";
import { emojiArrays } from "./data/emojiArray";

export default function App() {
  const [isGameOn, setIsGameOn] = useState(false);
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

  function startGame() {
    console.log("Starting game...");
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
    setIsGameOn(true);
    console.log("Game started, isGameOn", true);
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
          <RegularButton type="button" onClick={startGame}>
            Start Game
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
        </>
      )}
    </main>
  );

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
      </div>
    );
  }
}
