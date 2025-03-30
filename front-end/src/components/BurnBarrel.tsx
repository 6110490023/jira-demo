// src/components/BurnBarrel.tsx
import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { Card } from "../constant/types";

interface BurnBarrelProps {
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  dragLock: boolean;

}

const BurnBarrel: React.FC<BurnBarrelProps> = ({ setCards,dragLock }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");
    setCards((prev) => prev.filter((c) => c.id !== cardId));
    setActive(false);
  };

  const handleDragLeave = () => {
    setActive(false);
  };
  return (
    <div
      draggable= {!dragLock}
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 flex h-56 w-full max-w-[14rem] shrink-0 items-center justify-center rounded border text-3xl 
      transition-all duration-300 ease-in-out cursor-pointer
      ${
        active && !dragLock
          ? "border-red-800 bg-red-800/20 text-red-500 animate-pulse"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500 hover:bg-neutral-500/30"
      }`}
    >
      {active && !dragLock ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

export default BurnBarrel;
