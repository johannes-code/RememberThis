import { create } from 'zustand';
import { data } from '../data/data';
import { emojiArrays } from '../data/emojiArray';
import { shuffleArray } from '../utils/ShuffleArray'; // Import shuffleArray

const useGameStore = create((set, get) => ({
  // Initial State
  categories: data.category,
  numbers: data.numbers,
  emojiArrays: emojiArrays,
  currentCategory: null,
  selectedNumber: "10",
  numberOfCards: 10, // Default number of cards
  selectedEmojis: [],
  flippedCards: [],
  matchedCards: [],
  hasGameEnded: false,
  isGameOn: false,
  highscores: [],
  finalTime: null,
  count: 0,
  isCountingActive: false,

  // Actions
  increment: () => {
    if (get().isCountingActive) {
      set((state) => ({ count: state.count + 1 }));
    }
  },
  
  setCurrentCategory: (category) => set({ currentCategory: category }),
  setSelectedNumber: (number) => set({ selectedNumber: number }),
  setSelectedEmojis: (emojis) => set({ selectedEmojis: emojis }),
  setFlippedCards: (cards) => set({ flippedCards: cards }),
  setMatchedCards: (cards) => set({ matchedCards: cards }),
  setHasGameEnded: (ended) => set({ hasGameEnded: ended }),
  setIsGameOn : (gameOn) => set({ isGameOn: gameOn }),
  
  startCounting: () => set({ isCountingActive: true }),
  stopCounting: () => set({ isCountingActive: false }),
  
  resetCount: () => set({ count: 0, isCountingActive: false }),
  
  incrementCount: () => set((state) => ({ count: state.count + 1 })),
  
  setFinalTime: (time) => set({ finalTime: time }),

  startGame: () => {
    console.log("Starting game...");
    const state = get();

    // Reset state
    set({
      hasGameEnded: false,
      isGameOn: true,
      flippedCards: [],
      matchedCards: [],
      count: 0,
    });

    // Game setup logic
    let selectedArray;
    if (state.currentCategory === null) {
      const allCategories = Object.keys(emojiArrays);
      const randomCategories = shuffleArray(allCategories).slice(0, 3);
      selectedArray = randomCategories.flatMap((category) => emojiArrays[category]);
    } else {
      selectedArray = emojiArrays[state.currentCategory];
    }

    const shuffledEmojis = shuffleArray(selectedArray).slice(0, state.numberOfCards / 2);
    const gameEmojis = [...shuffledEmojis, ...shuffledEmojis].sort(() => Math.random() - 0.5);

    set({ selectedEmojis: gameEmojis });
  },
}));

export default useGameStore;
