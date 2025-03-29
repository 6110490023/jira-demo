// src/components/AddCard.tsx
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { Card } from "../constant/types";

interface AddCardProps {
  status: string;
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const AddCard: React.FC<AddCardProps> = ({ status, setCards }) => {
    const [text, setText] = useState("");
    const [adding, setAdding] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        setCards((prev) => [
          ...prev, 
          { 
            id: ((prev.length)+ 1).toString(), // หรือใช้ uuid() ถ้าติดตั้งไลบรารี uuid
            title: text.trim(), 
            status, 
            priority: 'Medium', // ค่าเริ่มต้น
            startDate: new Date().toISOString().split('T')[0], // วันที่ปัจจุบัน
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +7 วัน
          }
        ]);
        setAdding(false);
    };

    return adding ? (
        <motion.form layout onSubmit={handleSubmit}
           className="mt-[10px]"
        >
            <textarea
                onChange={(e) => setText(e.target.value)} autoFocus placeholder="Add new task..."
                className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            />
             <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
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
