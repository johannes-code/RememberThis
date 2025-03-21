import MemoryCard from "./MemoryCard";

export function GameBoard({
  emojis,
  flippedCards,
  matchedCards,
  handleCardClick,
}) {
  return (
    <MemoryCard
      emojis={emojis}
      flippedCards={flippedCards}
      matchedCards={matchedCards}
      handleClick={handleCardClick}
    />
  );
}