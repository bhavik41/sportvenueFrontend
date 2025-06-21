import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface User {
  id: string;
  email: string;
  role: "admin" | "user";
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Async thunks for auth actions
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post("http://localhost:3000/auth/signin", {
      email,
      password,
    });

    // Store token in cookie
    Cookies.set("token", response.data.token, { expires: 7 });

    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({
    email,
    password,
    name,
    role,
  }: {
    email: string;
    password: string;
    name: string;
    role?: "admin" | "user";
  }) => {
    const response = await axios.post("http://localhost:3000/auth/signup", {
      email,
      password,
      name,
      role: role || "user",
    });

    Cookies.set("token", response.data.token, { expires: 7 });

    return response.data;
  }
);

export const verifyToken = createAsyncThunk("auth/verify", async () => {
  const token = Cookies.get("token");
  if (!token) throw new Error("No token found");

  const response = await axios.get("http://localhost:3000/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  // Save token in cookie after successful verification
  // Cookies.set("token", token, { expires: 7 });

  return { ...response.data, token };
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        // state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        // state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Registration failed";
      })

      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Verify token cases
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        Cookies.remove("token");
        state.isLoading = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
