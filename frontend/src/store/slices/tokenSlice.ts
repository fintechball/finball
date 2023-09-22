import { createSlice } from "@reduxjs/toolkit";

interface TokenState {
  accessToken: string;
  refreshToken: string;
}

const initialState = { accessToken: "", refreshToken: "" } as TokenState;

const tokenSlice = createSlice({
  name: "token",
  initialState, // 초기 상태
  reducers: {
    setTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { setTokens } = tokenSlice.actions;
export default tokenSlice.reducer;
