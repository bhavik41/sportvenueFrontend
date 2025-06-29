import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import Cookies from "js-cookie";

interface Booking {
  createdAt: string | number | Date;
  id: string;
  date: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  totalAmount: number;
  groundId: string;
  timeSlotId: string;
  ground: {
    name: string;
    location: any;
    groundType: string;
  };
  timeSlot: {
    startTime: string;
    endTime: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

// Create booking
export const createBooking = createAsyncThunk(
  "bookings/create",
  async (bookingData: {
    groundId: string;
    timeSlotId: string;
    date: Date;
    totalAmount: number;
  }) => {
    const token = Cookies.get("token");
    console.log(token);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
      bookingData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return response.data;
  }
);

// Fetch user's bookings
export const fetchAdminBookings = createAsyncThunk(
  "bookings/fetchAdminBookings",
  async () => {
    const token = Cookies.get("token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/admin`,
      {
        headers: {
          Authorization: token ? `Bearer ${Cookies.get("token")}` : "",
        },
      }
    );
    return response.data;
  }
);

export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUserBookings",
  async () => {
    const token = Cookies.get("token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/user`,
      {
        headers: {
          Authorization: token ? `Bearer ${Cookies.get("token")}` : "",
        },
      }
    );
    return response.data;
  }
);

// Cancel booking
export const cancelBooking = createAsyncThunk(
  "bookings/cancel",
  async (bookingId: string) => {
    const response = await axios.patch(`/api/bookings/${bookingId}/cancel`);
    return response.data;
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create booking
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.unshift(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create booking";
      });

    // Fetch bookings
    builder
      .addCase(fetchAdminBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminBookings.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.bookings = action.payload;
      })
      .addCase(fetchAdminBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch bookings";
      });

    // Cancel booking
    builder
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookings.findIndex(
          (b) => b.id === action.payload.id
        );
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to cancel booking";
      });

    // Fetch user's bookings
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user's bookings";
      });
  },
});

export default bookingSlice.reducer;
