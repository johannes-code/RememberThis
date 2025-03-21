export function HighScoreList({ highscores }) {
    return (
        <div>
            <h2>Highscores</h2>
            {highscores.map((score, index) => (
                <div key={index} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                    <p><strong>Rank #{index + 1}</strong></p>
                    <p>Name: {score.playerName || "No name"}</p>
                    <p>Score: {score.score}</p>
                    <p>Clicks: {score.clicks}</p>
                    <p>Time: {score.time}</p>
                    <p>Cards: {score.cardCount}</p>
                    <p>Date: {new Date(score.timestamp).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
}