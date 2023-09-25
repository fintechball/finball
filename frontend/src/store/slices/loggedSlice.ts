import { createSlice } from "@reduxjs/toolkit";

interface loggedState {
  isLogged: boolean;
}

const initialState: loggedState = {
  isLogged: false,
};

const loggedSlice = createSlice({
  name: "logged",
  initialState,
  reducers: {
    setLogged: (state, action) => {
      state.isLogged = action.payload;
    },
  },
});

export const { setLogged } = loggedSlice.actions;
export default loggedSlice.reducer;
