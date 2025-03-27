import { create } from "zustand";

const useHighscoreStore = create((set) => ({
  highscores: [],

  calculateHighscore: ({ clicks, time, cardCount, isPerfectGame }) => {
    const MIN_CLICKS = cardCount; // Minimum possible clicks (perfect game)

    // Base formula from your code with adjustments
    const baseScore =
      (1000 * (cardCount / Math.max(clicks, 1)) * (1 + cardCount / 100)) /
      Math.max(time, 1);

    // Perfect game bonus (no mismatches)
    const perfectBonus = isPerfectGame ? 1000 : 0;

    // Time bonus (faster = better)
    const timeBonus = 500 / Math.max(time, 1);

    const finalScore = Math.round(baseScore + perfectBonus + timeBonus);

    return finalScore;
  },

  addHighscore: (newScore) =>
    set((state) => {
      const scoreWithId = {
        ...newScore,
        id: Date.now(),
      };
      const updatedScores = [...state.highscores, scoreWithId]
        .sort((a, b) => b.score - a.score)
        .slice(0, 30); // Keep top 30 scores

      return { highscores: updatedScores };
    }),

  // Fetch Highscores
  fetchHighscores: async () => {
    try {
      const response = await fetch("/api/highscores");
      const data = await response.json();
      console.log("fetched highscores:", data);
      set({ highscores: data });
    } catch (error) {
      console.error("Error fetching highscores:", error);
    }
  },

  // Save Highscore
  saveHighscore: async (newScore) => {
    try {
      await fetch("/api/highscores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newScore),
      });
      console.log("saved highscore:", newScore);
      set((state) => ({ highscores: [...state.highscores, newScore] }));
    } catch (error) {
      console.error("Error saving highscore:", error);
    }
  },
}));

export default useHighscoreStore;
