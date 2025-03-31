import { createSlice } from "@reduxjs/toolkit";

const loadFavorites = () => {
  try {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    return Array.isArray(storedFavorites) ? storedFavorites : [];
  } catch (error) {
    console.error("Error loading favorites:", error);
    return [];
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: loadFavorites(), // Загружаем из localStorage с проверкой
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter((fav) => fav.id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
    resetFavorites: (state) => {
      state.items = []; // Очищаем state
      localStorage.removeItem("favorites"); // Удаляем из localStorage
    },
  },
});

export const { addToFavorites, removeFromFavorites, resetFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import {
//   fetchFavorites,
//   addToFavorites,
//   removeFromFavorites,
// } from "./operations";

// const favoritesSlice = createSlice({
//   name: "favorites",
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFavorites.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchFavorites.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchFavorites.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(addToFavorites.fulfilled, (state, action) => {
//         state.items.push(action.payload);
//       })
//       .addCase(removeFromFavorites.fulfilled, (state, action) => {
//         state.items = state.items.filter((fav) => fav.id !== action.payload);
//       });
//   },
// });

// export default favoritesSlice.reducer;
