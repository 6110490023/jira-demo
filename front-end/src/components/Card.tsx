// src/components/Card.tsx
import React from "react";
import { motion } from "framer-motion";
import { Card } from "../constant/types";
import DropIndicator from "./DropIndicator";

interface CardProps extends Card {
  handleDragStart: (e: any, card: Card) => void;
}

const CardComponent: React.FC<CardProps> = ({ title, id, column, handleDragStart }) => {
  return (
    <>
    {/* <DropIndicator beforeId={id} column={column} /> */}
    <motion.div
      layout
      layoutId={id}
      draggable="true"
      onDragStart={(e: any) => handleDragStart(e, { title, id, column })}
      className="mt-[3px] cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
    >
      <p className="text-sm text-neutral-100">{title}</p>
    </motion.div>

    </>
      );
};



export default CardComponent;
