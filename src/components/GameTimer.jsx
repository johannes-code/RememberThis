// src/components/GameTimer.jsx
import React from 'react';
import useTimerStore from '../stores/timer.store';

export function GameTimer() {
  const { formatTime } = useTimerStore();

  return (
    <div className="timer">
      <p>Time: {formatTime()}</p>
    </div>
  );
}
