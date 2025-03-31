import { createSelector } from "@reduxjs/toolkit";

export const selectFavoritesState = (state) => state.favorites;

// Теперь селектор возвращает массив, а не весь объект
export const selectFavorites = createSelector(
  [selectFavoritesState],
  (favoritesState) => favoritesState.items || [] // Предотвращаем undefined
);
