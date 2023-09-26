import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface accountState {
  company: object;
  account: object;
}

const initialState: accountState = {
  company: {},
  account: {},
};

const accountSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<accountState>) => {
      state.account = action.payload.account;
      state.company = action.payload.company;
    },
    setBalance: (state, action) => {
      state.account.balance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setAccount, setBalance } = accountSlice.actions;
export default accountSlice.reducer;
