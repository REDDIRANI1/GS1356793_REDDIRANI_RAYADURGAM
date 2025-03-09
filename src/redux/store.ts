import { configureStore } from "@reduxjs/toolkit";
import skuReducer from "./slice/skuSlice";
import storeReducer from "./slice/storeSlice";

export const store = configureStore({
  reducer: {
    stores: storeReducer,
    skus: skuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
