import { FormattedDate } from "react-intl";

export function GameTimer() {
  return (
    <FormattedDate
      value={new Date("2025-03-07T14:48:00")}
      year="numeric"
      month="long"
      day="2-digit"
      hour="2-digit"
      minute="2-digit"
      timeZone="Europe/Paris"
    />
  );
}

export function useGameTimer() {
  return {
    time: new Date(),
    startTimer: () => {},
    stopTimer: () => {},
    resetTimer: () => {},
  };
}
