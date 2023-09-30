import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface groupfinballState {
  ballunit: number;
  members:Array<object>;
  result:Array<object>;
  // changed:number;
  // prebalance:number;
}

const initialState: groupfinballState = {
  ballunit: 1000,
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
      state.result = action.payload.result;
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

export const { setGroupFinball} = groupfinballSlice.actions;
export default groupfinballSlice.reducer;
