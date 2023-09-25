import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface tradeHistoryState {
  tradeHistory: Array<Object>;
}

const initialState: tradeHistoryState = {
  tradeHistory: [],
};

const tradeHistorySlice = createSlice({
  name: "tradeHistorys",
  initialState,
  reducers: {
    setTradeHistorys: (state, action: PayloadAction<tradeHistoryState>) => {
      state.tradeHistory = action.payload.tradeHistory;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setTradeHistorys } = tradeHistorySlice.actions;
export default tradeHistorySlice.reducer;
