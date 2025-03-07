export function ScoreBoard({ count, time }) {
  const timestamp = new Date().toISOString();
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
      <p>Score set on: {timestamp}</p>
    </div>
  );
}
