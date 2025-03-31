"use client";

export default function HighScoreList({ highscores }) {
  if (!highscores) {
    return <div>Loading highscores...</div>;
  }


  
  return (
    <div className="highscore-list">
      <h2>🏆 Top Scores</h2>
      <ol className="highscores-list">
        {highscores.map((score, index) => (
          <li key={score.id || index} className="highscore-item">
            <span className="player-name">{score.playerName}</span>
            <span className="player-score">|{score.score}</span>
            <span className="game-stats">
              |{score.time}s | {score.clicks} clicks
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
