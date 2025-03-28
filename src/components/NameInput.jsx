"use client";
import useGameStore from "../stores/game.store";

export default function NameInput() {
  const {
    showNameInput,
    pendingHighscore,
    playerName,
    setPlayerName,
    savePlayerScore,
    cancelScoreSave,
  } = useGameStore();

  if (!showNameInput) return null;

  const handleSave = () => {
    if (!playerName.trim()) {
      alert("Please enter your name: ");
      return;
    }
    savePlayerScore();
  };

  console.log("Rendering NameInput", {
    showNameInput,
    pendingHighscore,
    playerName,
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-2">New High Score!</h2>
        <p className="mb-4">Your score: {pendingHighscore?.score}</p>

        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-2 border mb-4 rounded"
          maxLength={20}
          autoFocus
        />

        <div className="flex gap-2">
          <button
            onClick={cancelScoreSave}
            className="flex-1 bg-gray-300 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={savePlayerScore}
            className="flex-1 bg-blue-500 text-white py-2 rounded"
          >
            Save Score
          </button>
        </div>
      </div>
    </div>
  );
}
