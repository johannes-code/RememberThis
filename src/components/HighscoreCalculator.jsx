export function HighscoreCalculator(clicks, time, cardCount) {
  //Score = (1000 * (Cards / Clicks)) * (1 + (Cards / 100)) / (Time in seconds)
  //Bonus for perfect game
  const baseScore = (clicks * time) / cardCount;

  const difficultyMultiplier = 1 + cardCount / 100;

  const finalScore = Math.round(baseScore * difficultyMultiplier * 100) / 100;

  return finalScore;
}
