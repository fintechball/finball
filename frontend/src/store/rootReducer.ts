import { combineReducers } from "@reduxjs/toolkit";
import counter from "./slices/counterSlice";
import test from "./slices/testSlice";
import router from "./slices/routerSlice";

const reducer = combineReducers({
  counter,
  test,
  router,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
