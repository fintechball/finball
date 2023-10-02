import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface finballState {
  ballunit: number;
  ballcnt: number;
  balance: number;
  minbalance:number;
  isReady: boolean;
  change:number;
}

const initialState: finballState = {
  ballunit: 10000,
  ballcnt: 0,
  balance: 0,
  minbalance:0,
  isReady:false,
  change: 0,
};

const finballSlice = createSlice({
  name: "finball",
  initialState,
  reducers: {
    setFinball: (state, action: PayloadAction<finballState>) => {
      // state.ballunit = action.payload.ballunit;
      state.balance = action.payload.balance;
      state.ballcnt = action.payload.ballcnt;
      state.minbalance = action.payload.minbalance;
      state.isReady = action.payload.isReady;
      
    },
    setChange:(state, action: PayloadAction<finballState>) => {
      state.change = action.payload.change;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setFinball,setChange} = finballSlice.actions;
export default finballSlice.reducer;
