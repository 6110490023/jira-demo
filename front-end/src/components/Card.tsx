// src/components/Card.tsx
import React from "react";
import { motion } from "framer-motion";
import { Card } from "../constant/types";
import DropIndicator from "./DropIndicator";

interface CardProps extends Card {
  handleDragStart: (e: any, card: Card) => void;
}

const CardComponent: React.FC<CardProps> = ({ title, id, status,priority,startDate,endDate, handleDragStart }) => {
  return (
    <>
    <DropIndicator beforeId={id} status={status} />
    <motion.div
      layout
      layoutId={id}
      draggable="true"
      onDragStart={(e: any) => handleDragStart(e, { title, id, status,priority,startDate,endDate })}
      className="mt-[3px] cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
    >
      <p className="text-m text-neutral-100 font-bold">{title}</p>
        <p className="text-sm text-gray-400">📌 Status: {status}</p>
        <p className="text-sm text-yellow-400">⚡ Priority: {priority}</p>
        <p className="text-sm text-green-400">📅 Start: {startDate}</p>
        <p className="text-sm text-red-400">⏳ End: {endDate}</p>
    </motion.div>

    </>
      );
};



export default CardComponent;
