import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface authState {
  accessToken: string;
  refreshToken: string;
  name: string;
  userId: string;
  image: string;
}

const initialState: authState = {
  accessToken: "",
  refreshToken: "",
  name: "",
  userId: "",
  image: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<authState>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
      state.image = action.payload.image;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
