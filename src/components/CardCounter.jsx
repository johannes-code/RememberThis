export function CardCounter({ numberOfCards, onNumberCardsChange }) {
    return (
        <div>
        <p>Number of cards: {numberOfCards}</p>
        <input type="number" value={numberOfCards} onChange={(e) => onNumberCardsChange(parseInt(e.target.value))}
        />
        </div>
    );
}