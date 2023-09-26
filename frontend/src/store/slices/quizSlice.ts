import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface quizState {
  date: String;
  index: number;
  quiz: Array<object>;
}

const initialState: quizState = {
  date: "Tue Sep 26 2021",
  index: 6,
  quiz: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuiz: (state, action: PayloadAction<quizState>) => {
      state.date = action.payload.date;
      state.index = action.payload.index;
      state.quiz = action.payload.quiz;
    },
    setIndex: (state, action) => {
      state.index = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setQuiz, setIndex } = quizSlice.actions;
export default quizSlice.reducer;
