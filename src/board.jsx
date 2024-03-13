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
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedCards, setClickedCards] = useState(() => []);
  const [message, setMessage] = useState(() => '')
  const [cards, setCards] = useState(() =>
    shuffle(
      novels.value.map((isbn, index) => (
        <Card key={isbn} index={index} onClick={() => handleCardClick(isbn)} />
      )),
    ),
  );

  const handleCardClick = (key) => {
    setClickedCards((prevClickedCards) => {
      // Check if the card was already clicked
      if (prevClickedCards.includes(key)) {
        setMessage((prevMessage) => 'Oops! Try Again!')
        setTimeout(() => {
          setMessage((prevMessage) => '');
        }, 3000)
        // Reset the game by reshuffling the cards, setting score to 0, and clearing clicked cards
        setCards((prevCards) => shuffle([...prevCards]));
        setScore(0);
        return []; // Clear clicked cards
      } else {
        // Increment score by 1
        setScore((prevScore) => prevScore + 1);

        // Shuffle the cards again
        setCards((prevCards) => shuffle([...prevCards]));

        // Update clicked cards
        return [...prevClickedCards, key];
      }
    });
  };

  // Set highscore
  if (score > highScore) {
    setHighScore(score);
    setMessage((prevMessage) => 'New high score!')
    setTimeout(() => {
      setMessage((prevMessage) => '');
    }, 700)
  }

  return (
    <div>
      <div id="scores">
        <h2>Score: {score}</h2>
        <h2 className={message === '' ? "no-message" : "message" }>{message}</h2>
        <h2>High Score: {highScore}</h2>
      </div>

      <div className="board">{cards}</div>
    </div>
  );
}

export default Board;
