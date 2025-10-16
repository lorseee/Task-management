import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  loading: false,
  error: null,
};

// Fetch all tasks (mocked)
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  await new Promise((res) => setTimeout(res, 300));
  return JSON.parse(localStorage.getItem("tasks") || "[]");
});

// Add new task (mocked)
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: Omit<Task, "id">) => {
    const newTask: Task = { id: Date.now().toString(), ...task };
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updated = [newTask, ...tasks];
    localStorage.setItem("tasks", JSON.stringify(updated));
    return newTask;
  }
);

// Update task (mocked)
export const updateTask = createAsyncThunk("tasks/updateTask", async (task: Task) => {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const updated = tasks.map((t: Task) => (t.id === task.id ? task : t));
  localStorage.setItem("tasks", JSON.stringify(updated));
  return task;
});

// Delete task (mocked)
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id: string) => {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const updated = tasks.filter((t: Task) => t.id !== id);
  localStorage.setItem("tasks", JSON.stringify(updated));
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export const { clearError } = tasksSlice.actions;
export default tasksSlice.reducer;
