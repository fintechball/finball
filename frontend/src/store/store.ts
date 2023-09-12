import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import logger from "redux-logger";
import reducer, { ReducerType } from "./rootReducer";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppThunkDispatch = ThunkDispatch<ReducerType, any, Action<string>>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
