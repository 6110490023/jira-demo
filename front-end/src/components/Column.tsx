
import React, { useState } from "react";
import { ColumnProps, Card } from "../constant/types";
import CardComponent from "./Card";
import DropIndicator from "./DropIndicator"
import AddCard from "./AddCard";
import { UseTask } from "../hook/useTask";
import { useAlert } from "../context/AlertContext";

const Column: React.FC<ColumnProps> = ({ title, headingColor, cards, status, setCards, dragLock, setDragLock }) => {
  const [active, setActive] = useState(false);
  const { updateTask } = UseTask();
  const { showAlert } = useAlert();


  const handleSaveChange = async (card: Card) => {
    let copy = [...cards];
    copy = copy.map((c) => {
      return (c.id === card.id) ? card : c
    })
    try {
      const response = await updateTask(card)
      if (response.success) {
        showAlert(response.message, "success")
        setCards(copy);
      } else {
        showAlert(response.message, "error")
      }
    } catch (err) {
      showAlert("การเชื่อมต่อมีปัญหา", "error")
    }
  };

  const handleDragStart = (e: React.DragEvent, card: Card) => {
    e.dataTransfer.setData("cardId", card.id);
  };
  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-status="${status}"]`)); // Get all drop indicators for the column
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
  const handleDragEnd = async (e: React.DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights(null);

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      const oldStatus = cardToTransfer.status
      cardToTransfer = { ...cardToTransfer, status };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }
      if (oldStatus != status) {
        try {

          const response = await updateTask(cardToTransfer)
          if (response.success) {
            showAlert(response.message, "success")
            setCards(copy);
          } else {
            showAlert(response.message, "error")
          }
        } catch (error) {
          showAlert("การเชื่อมต่อมีปัญหา", "error")
        }
      }else{
        setCards(copy);
      }

    }
  };

  const highlightIndicator = (e: any) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const clearHighlights = (els: any) => {
    const indicators = els || getIndicators();

    indicators.forEach((i: any) => {
      i.style.opacity = "0";
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const handleDragLeave = () => {
    clearHighlights(null);
    setActive(false);
  };



  const filteredCards = cards.filter((c) => c.status === status);

  return (

    <div className="w-full h-screen xs:h-full min-w-48">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">{filteredCards.length}</span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"
          }`}
      >
        {filteredCards.map((c) => (
          <CardComponent key={c.id} {...c}
            handleDragStart={handleDragStart}
            handleSaveChange={handleSaveChange}
            setDragLock={setDragLock}
            dragLock={dragLock}
          />
        ))}
        <DropIndicator beforeId={null} status={status} />
        <AddCard status={status} setCards={setCards} />
      </div>

    </div>
  );
};

export default Column;
