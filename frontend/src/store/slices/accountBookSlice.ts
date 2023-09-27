import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface accountBookState {
    account:{},
    tradeHistoryList: Array<Object>;
    categoryList:Array<string>;
}

const initialState: accountBookState = {
    account:{},
    tradeHistoryList: [],
    categoryList:[]
};

const accountBookSlice = createSlice({
  name: "accountBooks",
  initialState,
  reducers: {
    setAccountBooks: (state, action: PayloadAction<accountBookState>) => {
        state.account = action.payload.account;
        state.tradeHistoryList = action.payload.tradeHistoryList;
        state.categoryList = action.payload.categoryList;

    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setAccountBooks } = accountBookSlice.actions;
export default accountBookSlice.reducer;
