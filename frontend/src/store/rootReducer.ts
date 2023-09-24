import { combineReducers } from "@reduxjs/toolkit";
import counter from "./slices/counterSlice";
import test from "./slices/testSlice";
import router from "./slices/routerSlice";
import token from "./slices/tokenSlice";
import auth from "./slices/authSlice";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: "root",

  storage : storage,

  whitelist: ["auth", "counter"],
}

const reducer = combineReducers({
  counter,
  test,
  router,
  token,
  auth,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export type ReducerType = ReturnType<typeof reducer>;
export default persistedReducer;
