import { createSlice } from "@reduxjs/toolkit";
import {
  saveFavoritesToDatabase,
  loadFavoritesFromDatabase,
} from "../../services/firebaseOperations.js";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    setFavorites: (state, action) => {
      state.items = action.payload;
      saveFavoritesToDatabase(state.items);
    },
    addToFavorites: (state, action) => {
      state.items.push(action.payload);
      saveFavoritesToDatabase(state.items);
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter((fav) => fav.id !== action.payload);
      saveFavoritesToDatabase(state.items);
    },
    resetFavorites: (state) => {
      state.items = [];
      saveFavoritesToDatabase(state.items);
    },
  },
});

export const {
  setFavorites,
  addToFavorites,
  removeFromFavorites,
  resetFavorites,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;

export const loadFavorites = () => async (dispatch) => {
  const favorites = await loadFavoritesFromDatabase();
  dispatch(setFavorites(favorites));
};
