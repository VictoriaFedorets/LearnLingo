import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTeachersFromDB } from "../../services/firebaseOperations";

export const fetchTeachersFromFirebase = createAsyncThunk(
  "teachers/fetchTeachers",
  async (_, { rejectWithValue }) => {
    try {
      const teachers = await fetchTeachersFromDB();
      return teachers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
