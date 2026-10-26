
export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  cellNumber: string;
}

export interface ShoppingList {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
}

export interface ShoppingItem {
  id: string;
  listId: string;
  userId: string;
  name: string;
  quantity: number;
  notes: string;
  category: string;
  imageUrl: string;
  createdAt: string;
}

export type SortOption = "name" | "category" | "date";
