// src/components/AddCard.tsx
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { Card } from "../constant/types";

import { PRIORITY } from "../constant/typeCard";

interface AddCardProps {
  status: string;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const AddCard: React.FC<AddCardProps> = ({ status, setCards }) => {
  const [text, setText] = useState<string>("");
  const [priority, setPriority] = useState<string>(PRIORITY.LOW);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [endDate, setEndDate] = useState<string>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setCards((prev) => [
      ...prev,
      {
        id: ((prev.length) + 1).toString(), // หรือใช้ uuid() ถ้าติดตั้งไลบรารี uuid
        title: text.trim(),
        status,
        priority: priority, // ค่าเริ่มต้น
        startDate: startDate, // วันที่ปัจจุบัน
        endDate: endDate, // +7 วัน
      }
    ]);
    setAdding(false);
    setText("")
    setPriority(PRIORITY.LOW)
    setStartDate(new Date().toISOString().split('T')[0])
    setEndDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
  };
  const handleClose=()=>{
    setAdding(false)
    setText("")
    setPriority(PRIORITY.LOW)
    setStartDate(new Date().toISOString().split('T')[0])
    setEndDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
  }

  return adding ? (
    <motion.form layout onSubmit={handleSubmit}
      className="mt-[10px]"
    >

      <div className="w-full rounded border border-violet-400 bg-violet-400/20 p-3" >
        <input
          type="text"
          autoFocus
          name="title"
          placeholder="title"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-sm text-neutral-100 font-bold p-1 bg-neutral-700 rounded mb-2"
        />
        <div>
          <p className="text-sm text-gray-400 pt-1 pb-1">Status: {status}</p>
          <label htmlFor="priority" className="text-sm text-yellow-400">Priority: </label>
          <select
            id="priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="text-sm text-yellow-400 p-1 bg-neutral-700 rounded mb-2"
          >
            <option value={PRIORITY.LOW}>{PRIORITY.LOW}</option>
            <option value={PRIORITY.MEDIUM}>{PRIORITY.MEDIUM}</option>
            <option value={PRIORITY.HIGH}>{PRIORITY.HIGH}</option>
          </select>

        </div>
        <div>
          <input
            type="date"
            name="startDate"
            placeholder="startDate"
            value={startDate}
            onChange={(e) => { setStartDate(e.target.value) }}
            className="text-sm text-green-400 p-1 bg-neutral-700 rounded mb-2"
          />

        </div>
        <div>
          <input
            type="date"
            name="endDate"
            placeholder="endDate"
            value={endDate}
            onChange={(e) => { setEndDate(e.target.value) }}
            className="text-sm text-red-400 p-1 bg-neutral-700 rounded mb-2"
          />

        </div>
      </div>
      <div className="mt-1.5 flex items-center justify-end gap-1.5">
        <button
          onClick={() =>{handleClose()} }
          className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          Close
        </button>
        <button
          type="submit"
          className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
        >
          <span>Add</span>
          <FiPlus />
        </button>
      </div>
    </motion.form>
  ) : (
    <motion.button layout onClick={() => setAdding(true)}
      className="mt-[10px] flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"

    >
      <FiPlus />
      <span>Add card </span></motion.button>
  );
};
export default AddCard;
