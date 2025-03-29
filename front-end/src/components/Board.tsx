import React, { useEffect } from "react";
import Column from "./Column";
import BurnBarrel from "./BurnBarrel";
import { Card } from "../constant/types";
import { STATUS_CARD } from "../constant/typeCard";
interface BoadProps {
    cards: Card[];
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}
const Board: React.FC<BoadProps> = ( { cards, setCards }) => {
  useEffect(()=>{
    console.log(cards);
    
  },[cards])
  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      <Column title="Backlog" status={STATUS_CARD.BACKLOG} headingColor="text-neutral-500" cards={cards} setCards={setCards} />
      <Column title="Todo" status={STATUS_CARD.TODO} headingColor="text-yellow-200" cards={cards} setCards={setCards} />
      <Column title="In progress" status={STATUS_CARD.IN_PROGRESS}  headingColor="text-blue-200" cards={cards} setCards={setCards} />
      <Column title="Done" status={STATUS_CARD.DONE} headingColor="text-emerald-200" cards={cards} setCards={setCards} />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

export default Board;