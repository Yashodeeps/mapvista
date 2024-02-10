import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./mapSlice";
export const appStore = configureStore({
  reducer: {
    map: mapReducer,
  },
});
