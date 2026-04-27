import { RootState } from "@app/store/store";

export const selectPasswordProvider = (state: RootState) => state.password;
