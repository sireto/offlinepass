import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@app/store/store";

export const selectPasswordProvider = createSelector(
  (state: RootState) => state.password,
  (passwordProvider) => passwordProvider
);
