import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachersFromFirebase } from "./operations";

const initialState = {
  teachers: [],
  loading: false,
  error: null,
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachersFromFirebase.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTeachersFromFirebase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teachers = action.payload;
      })
      .addCase(fetchTeachersFromFirebase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default teachersSlice.reducer;
