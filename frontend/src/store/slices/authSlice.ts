import { createSlice } from "@reduxjs/toolkit";

interface authState {
  currentUrl: string;
}

const initialState: authState = {
  currentUrl: window.location.pathname, // 초기 URL 설정
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.currentUrl = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
