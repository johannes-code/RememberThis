import React from "react";

export default function MemoryCard({ emojis, flippedCards, handleClick }) {
  return (
    <ul className="card-container">
      {emojis.map((emoji, index) => (
        <li
          key={index}
          className={`card-item ${
            flippedCards.includes(index) ? "card-item--selected" : ""
          }`}
        >
          <button
            className="btn btn--emoji"
            onClick={() => handleClick(index)}
            disabled={flippedCards.includes(index)}
          >
            {flippedCards.includes(index) ? emoji : "?"}
          </button>
        </li>
      ))}
    </ul>
  );
}
