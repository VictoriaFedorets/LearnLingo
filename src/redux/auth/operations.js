import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import toast from "react-hot-toast";

// Реєстрація користувача
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { uid: userCredential.user.uid, email: userCredential.user.email };
    } catch (error) {
      toast.error(error);
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
      return { uid: userCredential.user.uid, email: userCredential.user.email };
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
