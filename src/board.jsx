import { useState } from "react";
import Card from "./card";
import novels from "./novels.json";

// Fisher-Yates Shuffle
function shuffle(arr) {
  let m = arr.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);

    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}

function Board() {
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [clickedCards, setClickedCards] = useState(() => ([]))
  const [cards, setCards] = useState(() => (
    shuffle(novels.value.map((isbn, index) => (
      <Card
        key={isbn}
        index={index}
        onClick={() => handleCardClick(isbn)}
      />
    ))
  )))

  const handleCardClick = (key) => {
    setClickedCards((prevClickedCards) => {
      // Check if the card was already clicked
      if (prevClickedCards.includes(key)) {
        // Update high score
        setHighScore((prevHighScore) => Math.max(prevHighScore, score));

        // Reset the game by reshuffling the cards, setting score to 0, and clearing clicked cards
        setCards((prevCards) => shuffle([...prevCards]));
        setScore(0);
        return []; // Clear clicked cards
      } else {
        // Increment score by 1
        setScore((prevScore) => prevScore + 1);

        // Update high score using the functional form
        setHighScore((prevHighScore) => Math.max(prevHighScore, score));

        // Shuffle the cards again
        setCards((prevCards) => shuffle([...prevCards]));

        // Update clicked cards
        return [...prevClickedCards, key];
      }
    });
  };


  return (
    <div>
      <h2>Score: {score} - High Score: {highScore}</h2>
      <div className="board">
        {cards}
      </div>
    </div>
  );
}

export default Board;
