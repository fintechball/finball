import { combineReducers } from "@reduxjs/toolkit";
import counter from "./slices/counterSlice";

const reducer = combineReducers({
  counter,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
