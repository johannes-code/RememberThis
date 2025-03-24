import { create } from "zustand";
import { data } from "../data/data";
import { emojiArrays } from "../data/emojiArray";
import { shuffleArray } from "../utils/ShuffleArray";

const useGameStore = create((set, get) => ({
  categories: data.category,
  numbers: data.numbers,
  emojiArrays: emojiArrays,
  currentCategory: null,
  selectedNumber: "10",
  selectedEmojis: [],
  flippedCards: [],
  matchedCards: [],
  hasGameEnded: false,
  isGameOn: false,
  highscores: [],
  finalTime: null,
  count: 0,
  itCountingActive: false,
  increment: () => {
    if (get().isCountingActive) {
      set((state) => ({ count: state.count + 1 }));
    }
  },

  //actions
  setCurrentCategory: (category) => set({ currentCategory: category }),
  setSelectedNumber: (number) => set({ selectedNumber: number }),
  setSelectedEmojis: (emojis) => set({ selectedEmojis: emojis }),
  setFlippedCards: (cards) => set({ flippedCards: cards }),
  setMatchedCards: (cards) => set({ matchedCards: cards }),
  setHasGameEnded: (ended) => set({ hasGameEnded: ended }),
  setIsGameOn: (gameOn) => set({ isGameOn: gameOn }),
  startCounting: () => set({ isCountingActive: true }),
  stopCounting: () => set({ isCountingActive: false }),
  resetCount: () => set({ count: 0, isCountingActive: false }),
  incrementCount: () => set((state) => ({ count: state.count + 1 })),
  setHighScores: (scores) => set({ highscores: scores }),
  setFinalTime: (time) => set({ finalTime: time }),

  setNumberOfCards: (number) => set({ numberOfCards: number }),

  startGame: () => {
    console.log("Starting game...");
    const state = get();

    //Reset state
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
      selectedArray = randomCategories.flatMap(
        (category) => emojiArrays[category]
      );
    } else {
      selectedArray = emojiArrays[state.currentCategory];
    }

    const shuffledEmojis = shuffleArray(selectedArray).slice(
      0,
      state.numberOfCards / 2
    );
    const gameEmojis = [...shuffledEmojis, ...shuffledEmojis].sort(
      () => Math.random() - 0.5
    );

    set({ selectedEmojis: gameEmojis });
  },
}));

export default useGameStore;
