import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: {},
  reducers: {
    setMap: (state, action) => {
      return action.payload;
    },
    updateTaskState: (state, action) => {
      const { heading, taskIndex, checked } = action.payload;
      state[heading][taskIndex].checked = checked;
    },
  },
});

export const { setMap, updateTaskState } = mapSlice.actions;

export default mapSlice.reducer;
