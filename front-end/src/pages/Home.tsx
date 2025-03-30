import React, { useEffect, useState } from "react";
import Board from "../components/Board";
import { Card } from "../constant/types";
import { STATUS_CARD, PRIORITY } from "../constant/typeCard";
import DropdownCust from "../components/DropdownCust";

const Home: React.FC = () => {

  const [cards, setCards] = useState<Card[]>([]);
  const [filtercards, setFilterCards] = useState<Card[]>([]);
  const [filterStatus,setFilterStatus] = useState<string>("");
  const [filterPriority,setFilterPriority] = useState<string>("");


  const statusOptions = [
    {value: "", label:"ALL"},
    { value: STATUS_CARD.BACKLOG, label: "Backlog" },
    { value: STATUS_CARD.TODO, label: "To Do" },
    { value: STATUS_CARD.IN_PROGRESS, label: "In Progress" },
    { value: STATUS_CARD.DONE, label: "Done" },
  ];
  const priorityOptions = [
    {value: "", label:"ALL"},
    { value: PRIORITY.LOW, label: "Low" },
    { value: PRIORITY.MEDIUM, label: "Medium" },
    { value: PRIORITY.HIGH, label: "High" },
  ];
  useEffect(()=>{
    const mockCards: Card[] = [
      { id: '1', title: 'พี่น้ำไม่มีเเฟน', status: STATUS_CARD.BACKLOG, priority: PRIORITY.LOW , startDate: '2025-03-01', endDate: '2025-03-10' },
      { id: '2', title: 'เป้ ขออนุญาตไปอ้วกครับ', status: STATUS_CARD.TODO, priority: PRIORITY.HIGH, startDate: '2025-03-05', endDate: '2025-03-12' },
      { id: '3', title: 'ไอ้กิฟเด็กเปรต', status: STATUS_CARD.IN_PROGRESS, priority: PRIORITY.MEDIUM, startDate: '2025-03-08', endDate: '2025-03-15' },
      { id: '4', title: 'ไบร์ทมีเเฟนหลายคน', status: STATUS_CARD.DONE, priority: PRIORITY.HIGH, startDate: '2025-02-20', endDate: '2025-03-01' },
      { id: '5', title: 'อนุญาติ ไม่มี สระ อิ', status: STATUS_CARD.TODO, priority: PRIORITY.LOW, startDate: '2025-03-10', endDate: '2025-03-18' },
      { id: '6', title: 'นัท ไม่เท่ากับ นัทเล็ก', status: STATUS_CARD.DONE, priority: PRIORITY.HIGH, startDate: '2025-03-02', endDate: '2025-03-09' },
    ];
    setCards(mockCards)
    setFilterCards(mockCards)
  },[])

  useEffect(()=>{
    if ( filterStatus !=="" || filterPriority !== "") {
      var tempFilter = cards
      if (filterStatus !=="") {
        console.log("filterStatus",filterStatus);
        tempFilter =  cards.filter((c)=> (c.status === filterStatus) )
      } 
      if (filterPriority !=="") {
        console.log("filterPriority",filterPriority);
        tempFilter =  tempFilter.filter((c)=> (c.priority === filterPriority) )
      }
      setFilterCards(tempFilter);
    }
    else{
      setFilterCards(cards);
    }
    
  },[filterStatus,cards,filterPriority])
  return (
      <div className="min-h-screen w-full bg-neutral-900 text-neutral-50">
        <div className="p-4 flex space-x-4">
        <DropdownCust label="Status" options={statusOptions} onSelect={(value) => setFilterStatus(value)} defaultValue="" />
        <DropdownCust label="Priority" options={priorityOptions} onSelect={(value) => setFilterPriority(value)} defaultValue="" />
      </div>
      <Board cards={filtercards} setCards={setCards}/>
    </div>
  );
};

export default Home;