// import { database } from "../../../firebase.js";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { ref, get, set, remove } from "firebase/database";

// // Загрузка избранных преподавателей
// export const fetchFavorites = createAsyncThunk(
//   "favorites/fetchFavorites",
//   async (_, { rejectWithValue }) => {
//     try {
//       const favoritesRef = ref(database, "favorites"); // Ссылка на избранное в БД
//       const snapshot = await get(favoritesRef);

//       if (snapshot.exists()) {
//         return Object.values(snapshot.val()); // Получаем массив объектов
//       } else {
//         return []; // Если ничего нет, возвращаем пустой массив
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
// export const addToFavorites = createAsyncThunk(
//   "favorites/addToFavorites",
//   async (teacher, { rejectWithValue }) => {
//     try {
//       if (!teacher.id) throw new Error("Teacher ID is missing");

//       const teacherRef = ref(database, `favorites/${teacher.id}`);
//       await set(teacherRef, teacher);

//       return teacher;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const removeFromFavorites = createAsyncThunk(
//   "favorites/removeFromFavorites",
//   async (teacherId, { rejectWithValue }) => {
//     try {
//       const teacherRef = ref(database, `favorites/${teacherId}`);
//       await remove(teacherRef);
//       return teacherId; // Возвращаем ID, чтобы убрать из Redux
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
