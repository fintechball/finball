import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface finBallAccountState {
  company: object;
  account: object;
}

const initialState: finBallAccountState = {
  company: {},
  account: {},
};

const finBallAccountSlice = createSlice({
  name: "finBallAccount",
  initialState,
  reducers: {
    setFinBallAccount: (state, action: PayloadAction<finBallAccountState>) => {
      state.account = action.payload.account;
      state.company = action.payload.company;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setFinBallAccount } = finBallAccountSlice.actions;
export default finBallAccountSlice.reducer;
