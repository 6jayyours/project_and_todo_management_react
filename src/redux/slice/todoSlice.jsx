import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const TODO_URL = "http://localhost:8080/api/v1/todo/";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${TODO_URL}${projectId}`);
      return response.data; // Adjust based on your API response
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch todos";
      return rejectWithValue(errorMessage);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ projectId, todoData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${TODO_URL}${projectId}`, todoData);
      return response.data; // Adjust based on your API response
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to add todo";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ todoId, todoData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${TODO_URL}${todoId}`, todoData);
      return response.data; // Adjust based on your API response
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update todo";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${TODO_URL}${todoId}`);
      return response.data; // Adjust based on your API response
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to delete todo";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateTodoStatus = createAsyncThunk(
  "todos/updateTodoStatus",
  async (todoId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${TODO_URL}status/${todoId}`);
      return response.data; 
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update todo status";
      return rejectWithValue(errorMessage);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload; // Assuming the payload contains the array of todos
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload); // Assuming the payload contains the new todo
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTodoStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodoStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = { ...state.todos[index], status: true }; // Assuming the payload updates the status
        }
      })
      .addCase(updateTodoStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter(todo => todo.id !== action.payload.id); 
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = todosSlice.actions;

export default todosSlice.reducer;
