export function checkMatch(
    currentFlippedCards,
    selectedEmojis,
    matchedCards,
    setMatchedCards,
    setFlippedCards,
    setHasGameEnded,
    stopCounting,
    endGame
  ) {
    const [first, second] = currentFlippedCards;
    console.log(`Comparing cards: ${first} and ${second}`);
    console.log(`Emojis: ${selectedEmojis[first]} and ${selectedEmojis[second]}`);
  
    if (selectedEmojis[first] === selectedEmojis[second]) {
      console.log(`Match found! Emoji: ${selectedEmojis[first]}`);
      const newMatchedCards = [...matchedCards, first, second];
      setMatchedCards(newMatchedCards);
      setFlippedCards([]);
  
      if (newMatchedCards.length === selectedEmojis.length) {
        setHasGameEnded(true);
        stopCounting();
        console.log("All cards matched! GG.");
        endGame();
      }
    } else {
      console.log("No match. Flipping cards back.");
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  }
  