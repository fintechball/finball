import { combineReducers } from "@reduxjs/toolkit";
import counter from "./slices/counterSlice";
import test from "./slices/testSlice";
import router from "./slices/routerSlice";
import auth from "./slices/authSlice";
import logged from "./slices/loggedSlice";
import user from "./slices/userInfoSlice";
import account from "./slices/accountSlice";
import tradeHistory from "./slices/tradeHistorySlice";
import opposite from "./slices/oppositeSlice";
import accountbook from "./slices/accountBookSlice";
import inviteGroupAccount from "./slices/inviteGroupAccountSlice";
import quiz from "./slices/quizSlice";
import finBallAccount from "./slices/finBallAccountSlice";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [
    "auth",
    "account",
    "tradeHistory",
    "opposite",
    "quiz",
    "finBallAccount",
  ],
};

const reducer = combineReducers({
  counter,
  test,
  router,
  auth,
  logged,
  user,
  account,
  tradeHistory,
  opposite,
  accountbook,
  inviteGroupAccount,
  quiz,
  finBallAccount,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export type ReducerType = ReturnType<typeof reducer>;
export default persistedReducer;
