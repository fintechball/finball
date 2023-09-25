import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface userState {
  accessToken: string;
  refreshToken: string;
  name: string;
  userId: string;
}

const initialState: userState = {
  accessToken: "",
  refreshToken: "",
  name: "",
  userId: "",
};

const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userState>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
    },
  },
});

export const { setUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
