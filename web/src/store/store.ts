import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import passwordSlice from "./password/passwordSlice";

const reducers = {
  [passwordSlice.reducerPath]: passwordSlice.reducer,
};

const combinedReducers = combineReducers<typeof reducers>(reducers);

const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof combinedReducers>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
function createLogger() {
  throw new Error("Function not implemented.");
}
