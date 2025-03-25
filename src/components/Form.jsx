import RegularButton from "./RegularButton";

export default function Form({ handleStart }) {
  return (
    <div className="wrapper">
      <RegularButton type="button" handleClick={handleStart}>
        Start Game
      </RegularButton>
    </div>
  );
}
