// src/components/CardCounter.jsx

import { useGameStore } from "../stores/index.jsx";

export function CardCounter() {
  const { numberOfCards, setSelectedNumber } = useGameStore();

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setSelectedNumber(value);
  };

  return (
    <div>
      <label htmlFor="cardNumber">Number of cards: </label>
      <input
        id="cardNumber"
        type="number"
        value={numberOfCards}
        onChange={handleChange}
        min="2"
        step="2"
      />
    </div>
  );
}
