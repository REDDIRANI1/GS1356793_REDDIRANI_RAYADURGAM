import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SKU {
  id: number;
  name: string;
  price: string;
  cost: string;
}

const initialState: SKU[] = [
  { id: 1, name: "Crew Neck Merino Wool Sweater", price: " $114.99 ", cost: " $18.28 " },
  { id: 2, name: "Faux Leather Leggings", price: " $9.99 ", cost: " $8.45 " },
  { id: 3, name: "Fleece-Lined Parka", price: " $199.99 ", cost: " $17.80 " },
  { id: 4, name: "Cotton Polo Shirt", price: " $139.99 ", cost: " $10.78 " },
  { id: 5, name: "Foldable Travel Hat", price: " $44.99 ", cost: " $27.08 " },
  { id: 6, name: "Chic Quilted Wallet", price: " $14.99 ", cost: " $4.02 " },
  { id: 7, name: "High-Slit Maxi Dress", price: " $74.99 ", cost: " $47.47" },
];

export const skuSlice = createSlice({
  name: "skus",
  initialState,
  reducers: {
    addSku: (state, action: PayloadAction<SKU>) => {
      state.push(action.payload);
    },
    deleteSku: (state, action: PayloadAction<number>) => {
      return state.filter((sku) => sku.id !== action.payload);
    },
    editSku: (state, action: PayloadAction<SKU>) => {
      const index = state.findIndex((sku) => sku.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    reorderSkus: (_state, action: PayloadAction<SKU[]>) => {
      return action.payload;
    }
  }
});

export const { addSku,deleteSku, editSku, reorderSkus } = skuSlice.actions;
export default skuSlice.reducer;
