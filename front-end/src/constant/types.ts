export interface Card {
    title: string;
    id: string;
    column: string;
  }
  
  export interface ColumnProps {
    title: string;
    headingColor: string;
    column: string;
    cards: Card[];
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  }