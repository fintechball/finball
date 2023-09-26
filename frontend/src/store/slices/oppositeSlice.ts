import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface oppositeState {
  opposite: object;
}

const initialState: oppositeState = {
  opposite: {},
};

const oppositeSlice = createSlice({
  name: "opposite",
  initialState,
  reducers: {
    setOpposite: (state, action: PayloadAction<oppositeState>) => {
      state.opposite = action.payload.opposite;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setOpposite } = oppositeSlice.actions;
export default oppositeSlice.reducer;
