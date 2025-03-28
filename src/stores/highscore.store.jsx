import { create } from "zustand";

const useHighscoreStore = create((set) => ({
  highscores: [],

  calculateHighscore: ({ clicks, time, cardCount, isPerfectGame }) => {
    const MIN_CLICKS = cardCount;
    const baseScore =
      (1000 * (cardCount / Math.max(clicks, 1)) * (1 + cardCount / 100)) /
      Math.max(time, 1);
    const perfectBonus = isPerfectGame ? 1000 : 0;
    const timeBonus = 500 / Math.max(time, 1);
    return Math.round(baseScore + perfectBonus + timeBonus);
  },

  addHighscore: (newScore) =>
    set((state) => {
      const scoreWithId = {
        ...newScore,
        id: Date.now(),
      };
      const currentScores = Array.isArray(state.highscores)
        ? state.highscores
        : [];
      const updatedScores = [...currentScores, scoreWithId]
        .sort((a, b) => b.score - a.score)
        .slice(0, 30);
      return { highscores: updatedScores };
    }),

  fetchHighscores: async () => {
    try {
      const response = await fetch("/api/highscores");
      const data = await response.json();
      set({ highscores: Array.isArray(data) ? data : [] });
    } catch (error) {
      console.error("Error saving highscore", error);
      set({ highscores: [] });
    }
  },

  saveHighscore: async (newScore) => {
    try {
      const scoreToSave = {
        playerName: newScore.playerName || "Anonymous",
        score: newScore.score,
        time: newScore.time,
        clicks: newScore.clicks,
        cardCount: newScore.cardCount,
        isPerfectGame: newScore.isPerfectGame || false,
        date: new Date().toISOString(),
      };

      const response = await fetch("/api/highscores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scoreToSave),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save highscore");
      }
      const savedScore = await response.json();

      set((state) => {
        const currentScores = Array.isArray(state.highscores)
          ? state.highscores
          : [];
        return { highscores: [...currentScores, newScore] };
      });
      return savedScore;
    } catch (error) {
      console.error("Error saving highscore:", error);
      throw error;
    }
  },
}));

export default useHighscoreStore;
