import { useClickCounter } from "./ClickCounter";

export function ScoreBoard() {
  const { count } = useClickCounter();
  //Best Month/ Week / Day

  // Name
  // Date
  // Time
  // Number of clicks
  // Number of cards

  return <p>Number of clicks{count}</p>;
}
