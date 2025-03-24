import { create } from "zustand";
import { data } from "../data/data";
import { emojiArrays } from "../data/emojiArray";
import { shuffleArray } from "../utils/ShuffleArray";

const useGameStore = create((set, get) => ({
  // Initial State
  categories: data.category,
  numbers: data.numbers,
  emojiArrays: emojiArrays,
  currentCategory: null,
  numberOfCards: 10,
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
  setSelectedNumber: (number) => {
    const adjustedNumber = Math.max(2, parseInt(number, 10));
    const evenNumber =
      adjustedNumber % 2 === 0 ? adjustedNumber : adjustedNumber + 1;
    set({
      selectedNumber: evenNumber.toString(),
      numberOfCards: evenNumber,
    });
  },

  setSelectedEmojis: (emojis) => set({ selectedEmojis: emojis }),
  setFlippedCards: (cards) => set({ flippedCards: cards }),
  setMatchedCards: (cards) => set({ matchedCards: cards }),
  setHasGameEnded: (ended) => set({ hasGameEnded: ended }),
  setIsGameOn: (gameOn) => set({ isGameOn: gameOn }),

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
    get().startCounting(); // Start the timer when the game starts
  },

  checkWinCondition: () => {
    const { matchedCards, numberOfCards, stopCounting } = get();
    if (matchedCards.length === numberOfCards) {
      set({ hasGameEnded: true, isGameOn: false });
      stopCounting();
      console.log("Game Won!");
      // You can add more end-game logic here if needed
    }
  },

  flipCard: (index) => {
    const { flippedCards, selectedEmojis, matchedCards } = get();

    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    ) {
      return;
    }

    set((state) => ({
      flippedCards: [...state.flippedCards, index],
    }));

    if (flippedCards.length === 1) {
      setTimeout(() => {
        const [first, second] = [...flippedCards, index];
        if (selectedEmojis[first] === selectedEmojis[second]) {
          set((state) => ({
            matchedCards: [...state.matchedCards, first, second],
            flippedCards: [],
          }));
          get().checkWinCondition(); // Check for win after successful match
        } else {
          set({ flippedCards: [] });
        }
      }, 1000);
    }
  },

  endGame: () => {
    set({ hasGameEnded: true, isGameOn: false });
    get().stopCounting();
    // Additional end-game logic can be added here
  },

  resetGame: () => {
    set({
      currentCategory: null,
      selectedNumber: "10",
      numberOfCards: 10,
      selectedEmojis: [],
      flippedCards: [],
      matchedCards: [],
      hasGameEnded: false,
      isGameOn: false,
      finalTime: null,
      count: 0,
      isCountingActive: false,
    });
  },
}));

export default useGameStore;
