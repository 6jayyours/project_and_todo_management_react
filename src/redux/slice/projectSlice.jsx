import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const PROJECT_URL = "http://localhost:8080/api/v1/project/";

// Async actions for each endpoint
export const createProject = createAsyncThunk(
  "project/createProject",
  async ({ userId, projectData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PROJECT_URL}${userId}`, projectData);
      return response.data; // Adjust based on your API response
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Project creation failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const editProject = createAsyncThunk(
  "project/editProject",
  async ({ projectId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${PROJECT_URL}${projectId}`, updatedData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Project update failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getAllProjects = createAsyncThunk(
  "project/getAllProjects",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${PROJECT_URL}${userId}`);
      return response.data; 
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Fetching projects failed";
      return rejectWithValue(errorMessage);
    }
  }
);

// Project slice
const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProjectError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload); // Append new project
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Edit Project
      .addCase(editProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(project => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload; // Update the edited project
        }
      })
      .addCase(editProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get All Projects
      .addCase(getAllProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload; // Replace with fetched projects
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProjectError } = projectSlice.actions;
export default projectSlice.reducer;
