import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface groupfinballState {
  balance: number;
  payment: string;
  members:Array<object>;
  result:Array<object>;
  accountno:string;
  history:Array<object>
  // changed:number;
  // prebalance:number;
}

const initialState: groupfinballState = {
  balance:0,
  payment:"0",
  members:[],
  result:[],
  accountno:"",
  history:[],
  // changed: 0,
  // prebalance:0,
};

const groupfinballSlice = createSlice({
  name: "groupfinball",
  initialState,
  reducers: {
    setGroupFinball: (state, action: PayloadAction<groupfinballState>) => {
      state.members = action.payload.members;
      state.balance = action.payload.balance;
      state.accountno = action.payload.accountno;
     
      // state.prebalance = action.payload.prebalance;
      // state.changed = action.payload.prebalance;
    },
    setResult:(state, action: PayloadAction<groupfinballState>) => {
      state.result = action.payload.result;
    },
    setPayment:(state, action: PayloadAction<groupfinballState>) => {
      state.payment = action.payload.payment;
    },
    setHistory:(state, action: PayloadAction<groupfinballState>) => {
      state.history = action.payload.history;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setGroupFinball,setResult,setPayment,setHistory} = groupfinballSlice.actions;
export default groupfinballSlice.reducer;
