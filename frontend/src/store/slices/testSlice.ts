import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface TestData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface TestState {
  test: TestData[];
  isLoading: boolean;
  error: null | string;
}

const initialState: TestState = {
  test: [],
  isLoading: false,
  error: null,
};

export const fetchTest = createAsyncThunk("test/fetchTest", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const data = (await res.data) as TestData[];
  return data;
});

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.test = action.payload;
    });
    builder.addCase(fetchTest.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});

export default testSlice.reducer;
