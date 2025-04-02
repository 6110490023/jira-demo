import React, { useEffect, useState } from "react";
import Board from "../components/Board";
import { Card } from "../constant/types";
import { STATUS_CARD, PRIORITY } from "../constant/typeCard";
import DropdownCust from "../components/DropdownCust";
import { UseTask } from "../hook/useTask";
import { getCookies, removeCookies } from "../store/useCookies";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { task, getAllTask } = UseTask();
  const [cards, setCards] = useState<Card[]>([]);
  const [filtercards, setFilterCards] = useState<Card[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterPriority, setFilterPriority] = useState<string>("");
  const statusOptions = [
    { value: "", label: "ALL" },
    { value: STATUS_CARD.BACKLOG, label: "Backlog" },
    { value: STATUS_CARD.TODO, label: "To Do" },
    { value: STATUS_CARD.IN_PROGRESS, label: "In Progress" },
    { value: STATUS_CARD.DONE, label: "Done" },
  ];
  const priorityOptions = [
    { value: "", label: "ALL" },
    { value: PRIORITY.LOW, label: "Low" },
    { value: PRIORITY.MEDIUM, label: "Medium" },
    { value: PRIORITY.HIGH, label: "High" },
  ];
  useEffect(() => {
    const token = getCookies("authToken");
    if (!token) {
      navigate("/login");
    } else {
      getAllTask();
    }
  }, [navigate]);

  useEffect(() => {
    console.log("task", task);
    setCards(task)
    setFilterCards(task)
  }, [task])
  useEffect(() => {
    if (filterStatus !== "" || filterPriority !== "") {
      var tempFilter = cards
      if (filterStatus !== "") {
        console.log("filterStatus", filterStatus);
        tempFilter = cards.filter((c) => (c.status === filterStatus))
      }
      if (filterPriority !== "") {
        console.log("filterPriority", filterPriority);
        tempFilter = tempFilter.filter((c) => (c.priority === filterPriority))
      }
      setFilterCards(tempFilter);
    }
    else {
      setFilterCards(cards);
    }

  }, [filterStatus, cards, filterPriority])

  return (

    <div className="min-h-screen h-full w-full text-neutral-50">
      <div className="p-4 flex space-x-4 justify-between items-center">
        <div className=" flex space-x-4">
          <DropdownCust label="Status" options={statusOptions} onSelect={(value) => setFilterStatus(value)} defaultValue="" />
          <DropdownCust label="Priority" options={priorityOptions} onSelect={(value) => setFilterPriority(value)} defaultValue="" />
        </div>
        <div>
          <button className="bg-gray-500 h-10 text-black rounded-md w-20 mr-10 hover:bg-gray-700 hover:text-white"
          onClick={()=>{removeCookies("authToken"); navigate("/login")}}
           >logout</button>
        </div>
      </div>
      <Board cards={filtercards} setCards={setCards} />
    </div>
  );
};

export default Home;