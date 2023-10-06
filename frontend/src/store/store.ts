// import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
// import reducer, { ReducerType } from "./rootReducer";
import persistedReducer from "./rootReducer";
import { persistStore, PURGE, PERSIST } from "redux-persist";

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, PURGE],
      },
    }).concat(logger),
});

export const persistor = persistStore(store);

// export type AppThunkDispatch = ThunkDispatch<ReducerType, any, Action<string>>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export default store;
