// src/stores/score.store.js
import { create } from "zustand";

const useScoreStore = create((set) => ({
  count: 0,
  time: 0,
  timestamp: null,

  setScore: (count, time) =>
    set({
      count,
      time,
      timestamp: new Date().toISOString(),
    }),

  resetScore: () =>
    set({
      count: 0,
      time: 0,
      timestamp: null,
    }),
}));

export default useScoreStore;
