// src/stores/timer.store.js
import { create } from "zustand";

const useTimerStore = create((set, get) => ({
  timer: 0,
  isRunning: false,
  intervalId: null,

  startTimer: () => {
    if (!get().isRunning) {
      const intervalId = setInterval(() => {
        set((state) => ({ timer: state.timer + 10 }));
      }, 10);
      set({ isRunning: true, intervalId });
    }
  },

  stopTimer: () => {
    clearInterval(get().intervalId);
    set({ isRunning: false, intervalId: null });
  },

  resetTimer: () => {
    clearInterval(get().intervalId);
    set({ timer: 0, isRunning: false, intervalId: null });
  },

  formatTime: () => {
    const timer = get().timer;
    const hours = Math.floor(timer / 3600000)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timer / 60000) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((timer / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const milliseconds = (timer % 1000).toString().padStart(3, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  },
}));

export default useTimerStore;
