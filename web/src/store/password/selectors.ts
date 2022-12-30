import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectPasswordProvider = createSelector(
  (state: RootState) => state.password,
  (passwordProvider) => passwordProvider
);
