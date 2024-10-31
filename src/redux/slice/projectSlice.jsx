import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const PROJECT_URL = "http://localhost:8080/api/v1/project/";

export const createProject = createAsyncThunk(
  "project/createProject",
  async ({ userId, projectData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PROJECT_URL}${userId}`, projectData);
      return response.data; 
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

export const getProject = createAsyncThunk(
  "project/getProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${PROJECT_URL}project/${projectId}`);
      return response.data; 
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Fetching project failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const exportAsGist = createAsyncThunk(
  "project/exportAsGist",
  async ({ project, markdownContent }, { rejectWithValue }) => {
    const gistData = {
      description: `Project Summary - ${project.title || "Project Title"}`,
      public: true,
      files: {
        [`${project.title || "Project"}.md`]: {
          content: markdownContent,
        },
      },
    };

    try {
      const response = await axios.post("https://api.github.com/gists", gistData, {
        headers: {
          Authorization: `Bearer my_token`, // Replace my_token with GitHub token
        },
      });
      return response.data; 
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to create gist";
      return rejectWithValue(errorMessage);
    }
  }
);


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
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload); 
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(project => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload; 
        }
      })
      .addCase(editProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload; 
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProjectError } = projectSlice.actions;
export default projectSlice.reducer;
