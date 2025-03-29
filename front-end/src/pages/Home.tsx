import React, { useEffect, useState } from "react";
import Board from "../components/Board";
import { Card } from "../constant/types";
import { STATUS_CARD } from "../constant/typeCard";

const Home: React.FC = () => {

  const [cards, setCards] = useState<Card[]>([]);
  
  useEffect(()=>{
    const payload: Card[] = [
      { title: 'พี่น้ำไม่มีเเฟน', id: '1', column: STATUS_CARD.BACKLOG },
      { title: 'เป้ ขออนุญาตไปอ้วกครับ', id: '2', column: STATUS_CARD.TODO },
      { title: 'อนุญาติ ไม่มี สระ อิ', id: '5', column: STATUS_CARD.TODO },
      { title: 'ไอ้กิฟเด็กเปรต', id: '3', column: STATUS_CARD.IN_PROGRESS },
      { title: 'ไบร์ทมีเเฟนหลายคน', id: '4', column: STATUS_CARD.DONE },
      { title: 'นัท ไม่เท่ากับ นัทเล็ก', id: '6', column: STATUS_CARD.DONE },
    ];
    setCards(payload)
  },[])
  
  return (
      <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board cards={cards} setCards={setCards}/>
    </div>
  );
};

export default Home;