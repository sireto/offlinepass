import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface IPasswordState {
  msk: string;
  hosts: string[];
  usernameEmails: string[];
}

const initialState: IPasswordState = {
  msk: "",
  hosts: [],
  usernameEmails: [],
};

const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    setPasswordProvider(
      state = initialState,
      action: PayloadAction<IPasswordState>
    ) {
      state = { ...action.payload };
      return state;
    },
  },
});

const persistConfig = {
  key: "kPasswordProvider",
  storage,
};

const passwordReducer = persistReducer(persistConfig, passwordSlice.reducer);

const reducerObj = {
  reducerPath: passwordSlice.name,
  reducer: passwordReducer,
};

export const { setPasswordProvider } = passwordSlice.actions;
export default reducerObj;
