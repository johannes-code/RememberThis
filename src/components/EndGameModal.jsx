export function EndGameModal({ hasGameEnded, clicks, finalTime }) {
    if (!hasGameEnded) return null;
  
    return (
      <div className="modal">
        <h2>Congratulations!</h2>
        <p>You finished the game!</p>
        <p>Clicks: {clicks}</p>
        <p>Time: {finalTime}</p>
      </div>
    );
  }