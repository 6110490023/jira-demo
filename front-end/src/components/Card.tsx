// src/components/Card.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../constant/types";
import DropIndicator from "./DropIndicator";
import { FaEdit } from "react-icons/fa";
import { PRIORITY } from "../constant/typeCard";

interface CardProps extends Card {
  handleDragStart: (e: React.DragEvent, card: Card) => void;
  handleSaveChange: (card: Card) => void;
  setDragLock: React.Dispatch<React.SetStateAction<boolean>>;
  dragLock: boolean;

}

const CardComponent: React.FC<CardProps> = (
  { title, id, status, priority, startDate, endDate,
    handleDragStart,
    handleSaveChange,
    setDragLock,
    dragLock

  }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [card, setCard] = useState<Card>(
    {
      id: id,
      title: title,
      status: status,
      priority: priority,
      startDate: startDate,
      endDate: endDate
    }
  )
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };
  const onSave = () => {
    setIsEdit(false)
    setDragLock(false)
    handleSaveChange(card)
  }
  const onCancel = () => {
    setIsEdit(false)
    setDragLock(false)
    setCard({
      id: id,
      title: title,
      status: status,
      priority: priority,
      startDate: startDate,
      endDate: endDate
    })

  }
  return (
    <>
      <DropIndicator beforeId={id} status={status} />
      <motion.div
        layout
        layoutId={id}
        draggable={!dragLock}
        onDragStart={(e: any) => handleDragStart(e, { id, title, status, priority, startDate, endDate })}
        className="mt-[3px] cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        {isEdit ? <>
          <input
            type="text"
            name="title"
            autoFocus
            placeholder="title"
            value={card.title}
            onChange={handleChangeInput}
            className="text-sm text-neutral-100 font-bold p-1 bg-neutral-700 rounded mb-2"
          />
          <p className="text-sm text-gray-400pl-3 pt-1 pb-1">Status: {status}</p>
          <div >
            <label htmlFor="priority" className="text-sm text-yellow-400">Priority: </label>
            <select
              id="priority"
              name="priority"
              value={card.priority}
              onChange={handleChangeSelect}
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
              value={card.startDate}
              onChange={handleChangeInput}
              className="text-sm text-green-400 p-1 bg-neutral-700 rounded mb-2"
            />
          </div>
          <div>
            <input
              type="date"
              name="endDate"
              placeholder="endDate"
              value={card.endDate}
              onChange={handleChangeInput}
              className="text-sm text-red-400 p-1 bg-neutral-700 rounded mb-2"
            />
          </div>

          <div className="flex justify-end">
            <button
              className="mt-2 mr-2 text-sm text-red-400"
              onClick={() => onCancel()} // ปิดโหมดแก้ไข
            >
              cancel
            </button>
            <button
              className="mt-2 text-sm text-green-400"
              onClick={() => onSave()} // ปิดโหมดแก้ไข
            >
              Save
            </button>
          </div>
        </> :
          <>
            <div className="flex items-center justify-between">
              <button
                onClick={() => { setIsEdit(true); setDragLock(true) }} // เปิดโหมดแก้ไข
                className="text-sm text-blue-500 flex items-center"
              >
                <FaEdit className="mr-1" />
                Edit
              </button>
            </div>
            <p className="text-m text-neutral-100 font-bold">{title}</p>
            <p className="text-sm text-gray-400">📌 Status: {status}</p>
            <p className="text-sm text-yellow-400">⚡ Priority: {priority}</p>
            <p className="text-sm text-green-400">📅 Start: {startDate}</p>
            <p className="text-sm text-red-400">⏳ End: {endDate}</p>
          </>
        }


      </motion.div>

    </>
  );
};



export default CardComponent;
