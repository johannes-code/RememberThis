import RegularButton from "./RegularButton";

export function CategorySelector({ categories, onSelect, currentCategory }) {
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
      {/* <ScoreBoard /> */}
    </div>
  );
}