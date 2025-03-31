import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getIdToken,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";
import { resetAuthState } from "./slice.js";

// Реєстрація користувача
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: user.displayName,
      };
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Логінізація користувача
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: user.displayName,
      };
    } catch (error) {
      toast.error("Something went wrong");
      return rejectWithValue(error.message);
    }
  }
);

// Вихід з акаунту
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Оновлення стану користувача при перезавантаженні сторінки
export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        return rejectWithValue("No user is currently signed in");
      }

      const token = await getIdToken(user, true);
      return {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "User",
        token,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Автоматичне оновлення токену кожні 30 хв
export const autoRefreshToken = () => {
  return (dispatch) => {
    setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const token = await getIdToken(user, true);
          console.log("Token refreshed:", token);
          // Тут можно обновить стейт, если нужно
        } catch (error) {
          console.error("Error refreshing token:", error.message);
        }
      }
    }, 30 * 60 * 1000); // оновлення кожні 30 хв
  };
};

// Обробник стану аутентифікації
export const authStateListener = () => {
  return (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(refreshUser());
      } else {
        dispatch(resetAuthState()); // Очищаємо стейт, якщо юзер вийшов
        console.log("User signed out");
      }
    });
  };
};
