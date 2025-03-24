import { create } from "zustand";
import { emojiArrays } from "../data/emojiArray";
import { shuffleArray } from "../utils/ShuffleArray";
import useCategoryStore from "./category.store";

const useGameStore = create((set, get) => ({
  // Game state
  numberOfCards: 10,
  selectedEmojis: [],
  flippedCards: [],
  matchedCards: [],
  hasGameEnded: false,
  isGameOn: false,
  count: 0,
  isCountingActive: false,

  // Actions
  setSelectedNumber: (number) => {
    const adjustedNumber = Math.max(2, parseInt(number, 10)); // Ensure minimum is 2
    const evenNumber = adjustedNumber % 2 === 0 ? adjustedNumber : adjustedNumber + 1; // Ensure it's even
    set({
      numberOfCards: evenNumber,
    });
    console.log("Number of cards updated:", evenNumber);
  },

  startGame: () => {
    set({
      hasGameEnded: false,
      isGameOn: true,
      flippedCards: [],
      matchedCards: [],
      count: 0,
    });
    get().setupGame();
    get().startCounting();
  },

  setupGame: () => {
    const currentCategory = useCategoryStore.getState().currentCategory;
    const numberOfCards = get().numberOfCards;
    let selectedArray;

    if (!currentCategory) {
      const allCategories = Object.keys(emojiArrays);
      const randomCategories = shuffleArray(allCategories).slice(0, 3);
      selectedArray = randomCategories.flatMap(cat => emojiArrays[cat]);
    } else {
      selectedArray = emojiArrays[currentCategory];
    }

    const baseEmojis = shuffleArray(selectedArray).slice(0, numberOfCards / 2);
    const gameEmojis = shuffleArray([...baseEmojis, ...baseEmojis]);
    
    set({ selectedEmojis: gameEmojis });
  },

  // Timer controls
  startCounting: () => set({ isCountingActive: true }),
  stopCounting: () => set({ isCountingActive: false }),
  incrementCount: () => {
    if (get().isCountingActive) {
      set(state => ({ count: state.count + 1 }));
    }
  },

  // Game logic
  flipCard: (index) => {
    const { flippedCards, selectedEmojis, matchedCards } = get();

    if (flippedCards.length === 2 || 
        flippedCards.includes(index) || 
        matchedCards.includes(index)) return;

    const newFlipped = [...flippedCards, index];
    set({ flippedCards: newFlipped });

    if (newFlipped.length === 2) {
      setTimeout(() => {
        const [first, second] = newFlipped;
        if (selectedEmojis[first] === selectedEmojis[second]) {
          set(state => ({
            matchedCards: [...state.matchedCards, first, second],
            flippedCards: []
          }));
          get().checkWinCondition();
        } else {
          set({ flippedCards: [] });
        }
      }, 1000);
    }
  },

  checkWinCondition: () => {
    const { matchedCards, numberOfCards } = get();
    if (matchedCards.length === numberOfCards) {
      set({ hasGameEnded: true, isGameOn: false });
      get().stopCounting();
    }
  },

  // Reset functionality
  resetGame: () => {
    set({
      selectedEmojis: [],
      flippedCards: [],
      matchedCards: [],
      hasGameEnded: false,
      isGameOn: false,
      count: 0,
      isCountingActive: false,
      numberOfCards: 10, // Reset to default number of cards
    });
    useCategoryStore.getState().selectCategory(null);
  }
}));

export default useGameStore;
