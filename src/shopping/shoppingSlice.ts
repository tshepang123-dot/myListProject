import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ShoppingList, ShoppingItem } from "../types";

interface ShoppingState {
  lists: ShoppingList[];
  items: ShoppingItem[];
}

const initialState: ShoppingState = {
  lists: [],
  items: [],
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    setLists: (state, action: PayloadAction<ShoppingList[]>) => {
      state.lists = action.payload;
    },
    setItems: (state, action: PayloadAction<ShoppingItem[]>) => {
      state.items = action.payload;
    },
    addList: (state, action: PayloadAction<ShoppingList>) => {
      state.lists.push(action.payload);
    },
    addItem: (state, action: PayloadAction<ShoppingItem>) => {
      state.items.push(action.payload);
    },
    deleteList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter(
        (list) => list.id !== action.payload
      );
      state.items = state.items.filter(
        (item) => item.listId !== action.payload
      );
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setLists,
  setItems,
  addList,
  addItem,
  deleteList,
  deleteItem,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;