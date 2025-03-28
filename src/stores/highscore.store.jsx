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
    console.log("Attempting to fetch highscores...");
    try {
      const response = await fetch("/api/highscores");
      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("Recieved data:", data);

      set({ highscores: Array.isArray(data) ? data : [] });
    } catch (error) {
      console.error("Error fetching highscores", error);
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

      // Update local state with the server response
      set((state) => ({
        highscores: [...(state.highscores || []), savedScore]
          .sort((a, b) => b.score - a.score)
          .slice(0, 30),
      }));

      return savedScore;
    } catch (error) {
      console.error("Error saving highscore:", error);
      throw error;
    }
  },
}));

export default useHighscoreStore;
