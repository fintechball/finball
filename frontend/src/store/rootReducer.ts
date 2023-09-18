import { combineReducers } from "@reduxjs/toolkit";
import counter from "./slices/counterSlice";
import test from "./slices/testSlice";

const reducer = combineReducers({
  counter,
  test,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
