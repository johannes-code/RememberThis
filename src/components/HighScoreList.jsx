import { useHighscoreStore } from "../stores/index.jsx";

export function HighScoreList() {
  const { highscores } = useHighscoreStore();
  if (!highscores || !Array.isArray(highscores)) {
    return <div>Loading highscores...</div>;
  }

  if (highscores.length === 0) {
    return <div>No high score available yet</div>;
  }

  return (
    <div className="highscore-list">
      <h2>🏆 Top Scores</h2>
      {highscores.map((score, index) => (
        <div key={score.id} className="score-entry">
          <div className="rank-badge">#{index + 1}</div>
          <div className="score-details">
            <p>Score: {score.score}</p>
            <p>
              Cards: {score.cardCount} | Time: {score.time}s | Clicks:{" "}
              {score.clicks}
            </p>
            <p className="score-date">
              {new Date(score.timestamp).toLocaleDateString()}
              {score.isPerfect && " 🌟 Perfect Game!"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
