import Card from "./card";
import novels from "./novels.json";

// Fisher-Yates Shuffle
function Shuffle(arr) {
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
  const allCards = novels.value.map((novel, index) => (
    <Card key={novel.value} index={index} />
  ));

  return <div className="board">{Shuffle(allCards)}</div>;
}

export default Board;
