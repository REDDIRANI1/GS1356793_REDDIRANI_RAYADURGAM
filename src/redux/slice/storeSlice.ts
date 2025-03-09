import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Store {
  id: number;
  name: string;
  city: string;
  state: string;
}

interface StoreState {
  stores: Store[];
}

const initialState: StoreState = {
  stores: [
    { id: 1, name: "San Francisco Bay Trends", city: "San Francisco", state: "CA" },
    { id: 2, name: "Phoenix Sunwear", city: "Phoenix", state: "AZ" },
    { id: 3, name: "Dallas Ranch Supply", city: "Dallas", state: "TX" },
    { id: 4, name: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
    { id: 5, name: "Nashville Melody Music Store", city: "Nashville", state: "TN" },
    { id: 6, name: "New York Empire Eats", city: "New York", state: "NY" },
    { id: 7, name: "Denver Peaks Outdoor", city: "Denver", state: "CO" },
  ],
};

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Store>) => {
      state.stores.push(action.payload);
    },
    removeStore: (state, action: PayloadAction<number>) => {
      state.stores = state.stores.filter(store => store.id !== action.payload);
    },
    reorderStores: (state, action: PayloadAction<Store[]>) => {
      state.stores = action.payload;
    },
    updateStore: (state, action: PayloadAction<Store>) => {
      const index = state.stores.findIndex(store => store.id === action.payload.id);
      if (index !== -1) {
        state.stores[index] = action.payload;
      }
    },
  },
});

export const { addStore, removeStore, reorderStores, updateStore } = storeSlice.actions;

export default storeSlice.reducer;
