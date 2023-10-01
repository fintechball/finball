import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface finballState {
  ballunit: number;
  ballcnt: number;
  minbalance: number;
  isReady: boolean;
  // changed:number;
  // prebalance:number;
}

const initialState: finballState = {
  ballunit: 1000,
  ballcnt: 0,
  minbalance: 0,
  isReady: false,
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
      state.minbalance = action.payload.minbalance;
      state.isReady = action.payload.isReady;
      // state.prebalance = action.payload.prebalance;
      // state.changed = action.payload.prebalance;
    },
    setIsReady: (state, action) => {
      state.isReady = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setFinball, setIsReady } = finballSlice.actions;
export default finballSlice.reducer;
