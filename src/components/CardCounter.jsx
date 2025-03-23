// src/components/CardCounter.jsx

import useCardCounterStore from '../stores/cardCounter.store';

export function CardCounter() {
  const { numberOfCards, availableNumbers, setNumberOfCards } = useCardCounterStore;

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setNumberOfCards(value);
  };

  return (
    <div>
      <p>Number of cards: {numberOfCards}</p>
      <select value={numberOfCards} onChange={handleChange}>
        {availableNumbers.map((number) => (
          <option key={number.value} value={number.value}>
            {number.label || number.value}
          </option>
        ))}
      </select>
    </div>
  );
}
