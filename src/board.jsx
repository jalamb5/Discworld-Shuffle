import Card from "./card";
import novels from './novels.json';

function Board() {
  const allCards = novels.value.map((novel, index) => (
    <Card key={novel.value} index={index} />
  ));

  return <div className="board">{allCards}</div>;
}

export default Board;
