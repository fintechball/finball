import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface groupfinballState {
  ballunit: number;
  balance: number;
  members:Array<object>;
  result:Array<object>;
  // changed:number;
  // prebalance:number;
}

const initialState: groupfinballState = {
  ballunit: 1000,
  balance:0,
  members:[],
  result:[],
  // changed: 0,
  // prebalance:0,
};

const groupfinballSlice = createSlice({
  name: "groupfinball",
  initialState,
  reducers: {
    setGroupFinball: (state, action: PayloadAction<groupfinballState>) => {
      state.ballunit = action.payload.ballunit;
      state.members = action.payload.members;
      state.balance = action.payload.balance;
      // state.prebalance = action.payload.prebalance;
      // state.changed = action.payload.prebalance;
    },
    setResult:(state, action: PayloadAction<groupfinballState>) => {
      state.result = action.payload.result;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setGroupFinball,setResult} = groupfinballSlice.actions;
export default groupfinballSlice.reducer;
