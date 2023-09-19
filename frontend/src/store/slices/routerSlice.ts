import { createSlice } from "@reduxjs/toolkit";

interface RouterState {
  currentUrl: string;
}

const initialState: RouterState = {
  currentUrl: window.location.pathname, // 초기 URL 설정
};

const routerSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    setCurrentUrl: (state, action) => {
      state.currentUrl = action.payload;
    },
  },
});

export const { setCurrentUrl } = routerSlice.actions;
export default routerSlice.reducer;
