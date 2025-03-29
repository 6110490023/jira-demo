// export interface Card {
//   title: string;
//   id: string;
//   column: string;
// }
export interface Card {
  id: string;
  title: string;
  status: string;
  priority: string;
  startDate: string;
  endDate: string;
  // column: string;
}

export interface ColumnProps {
  title: string;
  headingColor: string;
  status: string;
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}