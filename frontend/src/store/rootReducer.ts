import { combineReducers } from "@reduxjs/toolkit";
import counter from "./slices/counterSlice";
import test from "./slices/testSlice";
import router from "./slices/routerSlice";
import auth from "./slices/authSlice";
import logged from "./slices/loggedSlice";
import account from "./slices/accountSlice";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
};

const reducer = combineReducers({
  counter,
  test,
  router,
  auth,
  logged,
  account,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export type ReducerType = ReturnType<typeof reducer>;
export default persistedReducer;
