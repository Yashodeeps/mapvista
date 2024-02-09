import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: {},
  reducers: {
    setMap: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMap } = mapSlice.actions;

export default mapSlice.reducer;
