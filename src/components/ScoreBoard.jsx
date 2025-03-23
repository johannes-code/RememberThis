import useScoreStore from "../stores/score.store";

export function ScoreBoard() {
  
  const { count, time ,timestamp} = useScoreStore;
  //Best Month/ Week / Day

  // Name
  // Date
  // Time
  // Number of clicks
  // Number of cards

  return (
    <div>
      <p>Number of clicks{count}</p>
      <p>Time taken: {time} seconds</p>
      {timestamp && <p>Score set on: {timestamp}</p>}
    </div>
  );
}
