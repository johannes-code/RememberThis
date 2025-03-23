// src/stores/click.store.js
import { create } from 'zustand';

const useClickStore = create((set) => ({
  count: 0,
  isCountingActive: false,

  increment: () => set((state) => ({
    count: state.isCountingActive ? state.count + 1 : state.count,
  })),

  startCounting: () => set({ isCountingActive: true }),

  stopCounting: () => set({ isCountingActive: false }),

  resetCount: () => set({ count: 0, isCountingActive: false }),
}));

export default useClickStore;
