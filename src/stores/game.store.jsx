import { create } from "zustand";
import { emojiArrays } from "../data/emojiArray";
import { shuffleArray } from "../utils/ShuffleArray";
import { useCategoryStore, useHighscoreStore, useTimerStore } from "./index";

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
  showNameModal: false,
  pendingHighScore: null,
  playerName: "",

  // Actions
  setSelectedNumber: (number) => {
    const adjustedNumber = Math.max(2, parseInt(number, 10)); // Ensure minimum is 2
    const evenNumber =
      adjustedNumber % 2 === 0 ? adjustedNumber : adjustedNumber + 1; // Ensure it's even
    set({
      numberOfCards: evenNumber,
    });
  },

  startGame: () => {
    useTimerStore.getState().resetTimer();
    useTimerStore.getState().startTimer();
    get().setupGame();
    get().startCounting();

    set({
      hasGameEnded: false,
      isGameOn: true,
      flippedCards: [],
      matchedCards: [],
      count: 0,
      startTime: Date.now(),
    });
  },

  setupGame: () => {
    const currentCategory = useCategoryStore.getState().currentCategory;
    const numberOfCards = get().numberOfCards;
    let selectedArray;

    if (!currentCategory) {
      const allCategories = Object.keys(emojiArrays);
      const randomCategories = shuffleArray(allCategories).slice(0, 3);
      selectedArray = randomCategories.flatMap((cat) => emojiArrays[cat]);
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
      set((state) => ({ count: state.count + 1 }));
    }
  },

  // Game logic
  flipCard: (index) => {
    const { flippedCards, selectedEmojis, matchedCards, isCountingActive } =
      get();

    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    )
      return;

    // Increment the count when a card is flipped
    if (isCountingActive) {
      set((state) => ({ count: state.count + 1 }));
    }

    const newFlipped = [...flippedCards, index];
    set({ flippedCards: newFlipped });

    if (newFlipped.length === 2) {
      setTimeout(() => {
        const [first, second] = newFlipped;
        if (selectedEmojis[first] === selectedEmojis[second]) {
          set((state) => ({
            matchedCards: [...state.matchedCards, first, second],
            flippedCards: [],
          }));
          get().checkWinCondition();
        } else {
          set({ flippedCards: [] });
        }
      }, 1000);
    }
  },

  checkWinCondition: () => {
    const { matchedCards, numberOfCards, count } = get();

    if (matchedCards.length === numberOfCards) {
      set({ hasGameEnded: true, isGameOn: false });
      get().stopCounting();
      useTimerStore.getState().stopTimer();

      const elapsedTime = useTimerStore.getState().timer / 1000;
      const isPerfectGame = count === numberOfCards;
      const highscoreStore = useHighscoreStore.getState();
      const score = highscoreStore.calculateHighscore({
        clicks: count,
        time: elapsedTime,
        cardCount: numberOfCards,
        isPerfectGame,
      });

      set({
        showNameInput: true,
        isGameOn: false,
        pendingHighScore: {
          score,
          clicks: count,
          time: elapsedTime,
          cardCount: numberOfCards,
          isPerfectGame,
          timestamp: new Date().toISOString(),
        },
      });
      get().stopCounting();
      useTimerStore.getState().stopTimer();
    }
  },

  setPlayerName: (name) => set({ playerName: name }),
  savePlayerScore: () => {
    const { pendingHighScore, playerName } = get();

    if (!pendingHighScore) {
      console.error("No pending highscore to save! ");
      return;
    }

    useHighscoreStore.getState().saveHighscore({
      playerName: playerName || "Anonymous",
      ...pendingHighScore,
      date: new Date().toDateString(),
    });

    set({ showNameInput: false, pendingHighscore: null, playerName: "" });
  },
  cancelScoreSave: () => set({ showNameInput: false, pendingHighScore: null }),

  getGameTime: () => {
    return Math.floor((Date.now() - get().startTime) / 1000);
  },

  // Reset functionality
  resetGame: () => {
    const resetTimer = useTimerStore.getState().resetTimer;

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
    resetTimer();
  },
}));

export default useGameStore;
