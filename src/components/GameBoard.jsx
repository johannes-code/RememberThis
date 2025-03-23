// src/components/GameBoard.jsx
import useGameStore from '../stores/game.store';
import MemoryCard from './MemoryCard';

export default function GameBoard() {
  const { selectedEmojis, flippedCards, matchedCards, flipCard } = useGameStore();

  return (
    <MemoryCard
      emojis={selectedEmojis}
      flippedCards={flippedCards}
      matchedCards={matchedCards}
      onCardClick={flipCard}
    />
  );
}
