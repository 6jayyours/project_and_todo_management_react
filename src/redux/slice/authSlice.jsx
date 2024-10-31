import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_URL = "http://localhost:8080/api/v1/auth/";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AUTH_URL}register`, formData);
      return response.data; 
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AUTH_URL}login`, formData);
      return response.data; 
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
      userId: null, 
      loading: false,
      error: null,
      isAuthenticated: false,
    },
    reducers: {
      clearError: (state) => {
        state.error = null;
      },
      logout: (state) => {
        state.userId = null; 
        state.isAuthenticated = false; 
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.userId = action.payload.id; 
          state.isAuthenticated = true; 
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
