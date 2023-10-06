import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface quizState {
  date: String;
  index: number;
  quiz: Array<object>;
  resultScore: number;
  resultPoint: number;
}

const initialState: quizState = {
  date: "Tue Sep 26 2021",
  index: 6,
  quiz: [],
  resultScore: 0,
  resultPoint: 0,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuiz: (
      state,
      action: PayloadAction<{ date: string; index: number; quiz: object[] }>
    ) => {
      state.date = action.payload.date;
      state.index = action.payload.index;
      state.quiz = action.payload.quiz;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    setResultScore: (state, action) => {
      state.resultScore = action.payload;
    },
    setResultPoint: (state, action) => {
      state.resultPoint = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setQuiz, setDate, setIndex, setResultScore, setResultPoint } =
  quizSlice.actions;
export default quizSlice.reducer;
