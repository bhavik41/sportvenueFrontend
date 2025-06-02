import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Ground } from "@/types/ground";
import axios from "axios";
import Cookies from "js-cookie";

interface AdminGroundState {
  grounds: Ground[];
  currentGround: Ground | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    groundType: string;
    city: string;
    priceRange: [number, number];
  };
}

const initialState: AdminGroundState = {
  grounds: [],
  currentGround: null,
  isLoading: false,
  error: null,
  filters: {
    groundType: "",
    city: "",
    priceRange: [0, 10000],
  },
};

// Async thunks
export const fetchGrounds = createAsyncThunk(
  "grounds/fetchGrounds",
  async (adminId?: string) => {
    const token = Cookies.get("token");
    const url = adminId
      ? `http://localhost:3000/grounds?adminId=${adminId}`
      : "http://localhost:3000/grounds";
    const response = await axios.get(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  }
);

export const createGround = createAsyncThunk(
  "grounds/createGround",
  async (groundData: FormData) => {
    const token = Cookies.get("token");
    if (!token) return null;
    const response = await axios.post(
      "http://localhost:3000/grounds",
      groundData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const updateGround = createAsyncThunk(
  "grounds/updateGround",
  async ({ id, data }: { id: string; data: FormData }) => {
    const token = Cookies.get("token");
    const response = await axios.put(
      `http://localhost:3000/grounds/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteGround = createAsyncThunk(
  "grounds/deleteGround",
  async (id: string) => {
    await axios.delete(`/api/grounds/${id}`);
    return id;
  }
);

const adminGroundSlice = createSlice({
  name: "AdminGrounds",
  initialState,
  reducers: {
    setCurrentGround: (state, action: PayloadAction<Ground | null>) => {
      state.currentGround = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<AdminGroundState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch grounds
      .addCase(fetchGrounds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGrounds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.grounds = action.payload;
      })
      .addCase(fetchGrounds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch grounds";
      })
      // Create ground
      .addCase(createGround.fulfilled, (state, action) => {
        state.grounds.push(action.payload);
      })
      // Update ground
      .addCase(updateGround.fulfilled, (state, action) => {
        const index = state.grounds.findIndex(
          (g) => g.id === action.payload.id
        );
        if (index !== -1) {
          state.grounds[index] = action.payload;
        }
      })
      // Delete ground
      .addCase(deleteGround.fulfilled, (state, action) => {
        state.grounds = state.grounds.filter((g) => g.id !== action.payload);
      });
  },
});

export const { setCurrentGround, setFilters, clearError } =
  adminGroundSlice.actions;
export default adminGroundSlice.reducer;
