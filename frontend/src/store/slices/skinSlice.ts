import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface skinState {
  skin: object;
}

const initialState: skinState = {
  skin: {},
};

const skinSlice = createSlice({
  name: "skin",
  initialState,
  reducers: {
    setSkin: (state, action: PayloadAction<skinState>) => {
      state.skin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setSkin } = skinSlice.actions;
export default skinSlice.reducer;
