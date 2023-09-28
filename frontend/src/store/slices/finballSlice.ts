import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface finballState {
  ballunit: number;
  ballcnt: number;
  // changed:number;
  // prebalance:number;
}

const initialState: finballState = {
  ballunit: 1000,
  ballcnt: 0,
  // changed: 0,
  // prebalance:0,
};

const finballSlice = createSlice({
  name: "finball",
  initialState,
  reducers: {
    setFinball: (state, action: PayloadAction<finballState>) => {
      state.ballunit = action.payload.ballunit;
      state.ballcnt = action.payload.ballcnt;
      // state.prebalance = action.payload.prebalance;
      // state.changed = action.payload.prebalance;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setFinball} = finballSlice.actions;
export default finballSlice.reducer;
