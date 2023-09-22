import { combineReducers } from "@reduxjs/toolkit";
import counter from "./slices/counterSlice";
import test from "./slices/testSlice";
import router from "./slices/routerSlice";
import token from "./slices/tokenSlice";

const reducer = combineReducers({
  counter,
  test,
  router,
  token,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
