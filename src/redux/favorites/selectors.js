import { createSelector } from "@reduxjs/toolkit";

export const selectFavoritesState = (state) => state.favorites;

export const selectFavorites = createSelector(
  [selectFavoritesState],
  (favoritesState) => favoritesState.items || [] // Запобігаємо undefined
);
