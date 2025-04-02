
export interface ColumnProps {
  title: string;
  headingColor: string;
  status: string;
  cards: Card[];
  setDragLock: React.Dispatch<React.SetStateAction<boolean>>;
  dragLock: boolean;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}
export interface Card {
  id: string;
  title: string;
  status: string;
  priority: string;
  startDate: string;
  endDate: string;
  createBy?:string;
}



export interface Login {
  username:string;
  password:string;
}

export interface Register {
  username :string ;
	email    :string ;
	roleName :string ;
	password :string ;
};