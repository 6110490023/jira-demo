
import React, { useState } from "react";
import { ColumnProps,Card } from "../constant/types";
import CardComponent from "./Card";
import  DropIndicator  from "./DropIndicator"
import AddCard from "./AddCard";

const Column: React.FC<ColumnProps> = ({ title, headingColor, cards, column, setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: React.DragEvent, card: Card) => {
    e.dataTransfer.setData("cardId", card.id);
    console.log(card.id);
    
  };
  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`)); // Get all drop indicators for the column
  };
  
  const getNearestIndicator = (e: React.DragEvent, indicators: any[]) => {
    const DISTANCE_OFFSET = 50; // Distance threshold to detect "before" or "after" positions
  
    const el = indicators.reduce(
      (closest, indicator) => {
        const box = indicator.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET); // Calculate the vertical distance from the indicator
  
        // We want to get the closest indicator based on the vertical position of the drag
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: indicator };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY, // Start with a very small offset
        element: indicators[indicators.length - 1], // Default to the last element if no suitable match
      }
    );
  
    return el; // Return the closest indicator
  };
  const handleDragEnd = (e: React.DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");
    const filterCard = cards.filter((c) => c.id !== cardId);
    const selectedCard = cards.find((c) => c.id === cardId);
  
    if (!selectedCard) return; 
  
    const indicators = getIndicators(); 
    const { element } = getNearestIndicator(e, indicators);
  
    const before = element?.dataset?.before || "-1"; 
  
    if (before !== cardId) {
      let newCards = [...filterCard];
        const moveToBack = before === "-1";
      if (moveToBack) {
        newCards.push(selectedCard); 
      } else {
        const insertAtIndex = newCards.findIndex((c) => c.id === before);
        if (insertAtIndex === -1) return;
        newCards.splice(insertAtIndex, 0, selectedCard);
      }
  
      setCards(newCards);
    }
  
    setActive(false);
  };
  

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const filteredCards = cards.filter((c) => c.column === column);
  
  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">{filteredCards.length}</span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => (
          <CardComponent key={c.id} {...c} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards}   />
      </div>
    </div>
  );
};

export default Column;
