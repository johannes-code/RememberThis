// src/stores/cardCounter.store.js
import { create } from "zustand";

const useCardCounterStore = create((set) => ({
  numberOfCards: 16, // Default value, could be different
  setNumberOfCards: (count) => set({ numberOfCards: count }),
  // ... possibly other actions related to card counting
}));

export default useCardCounterStore;
