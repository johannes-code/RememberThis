// src/components/MemoryCard.jsx

export default function MemoryCard({
  emojis,
  flippedCards,
  matchedCards,
  onCardClick,
}) {
  return (
    <ul className="card-container">
      {emojis.map((emoji, index) => (
        <li
          key={index}
          className={`card-item ${
            flippedCards.includes(index) || matchedCards.includes(index)
              ? "card-item--selected"
              : ""
          }`}
        >
          <button
            className="btn btn--emoji"
            onClick={() => onCardClick(index)}
            disabled={
              flippedCards.includes(index) || matchedCards.includes(index)
            }
          >
            {flippedCards.includes(index) || matchedCards.includes(index)
              ? emoji
              : "?"}
          </button>
        </li>
      ))}
    </ul>
  );
}
