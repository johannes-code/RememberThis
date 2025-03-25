export default function MemoryCard({
  emojis,
  flippedCards,
  matchedCards,
  handleClick,
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
            onClick={() => handleClick(index)}
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
