import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Ground } from "@/types/ground";
import { RootState } from "@/store/store";
import axios from "axios";
import Cookies from "js-cookie";

interface UserGroundState {
  grounds: Ground[];
  currentGround: Ground | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    groundType: string;
    city: string;
    priceRange: [number, number];
  };
  totalGrounds: number;
  page: number;
  limit: number;
}

const initialState: UserGroundState = {
  grounds: [],
  currentGround: null,
  isLoading: false,
  error: null,
  filters: {
    groundType: "",
    city: "",
    priceRange: [0, 10000],
  },
  totalGrounds: 0,
  page: 1,
  limit: 10,
};

// export const fetchGrounds = createAsyncThunk(
//   "grounds/fetchGrounds",
//   async (page: number, { getState }) => {
//     console.log("Fetching ground:", page);
//     const skip = (page - 1) * initialState.limit;
//     const response = await axios.get(
//       `http://localhost:3000/user/grounds?skip=${skip}&limit=${initialState.limit}`
//     );
//     return response.data; // Assumes API returns a list of products
//   }
// );

interface FetchGroundsParams {
  page: number;
  searchTerm?: string;
  groundType?: string;
  priceRange?: string;
}

export const fetchGrounds = createAsyncThunk(
  "grounds/fetchGrounds",
  async ({ page, searchTerm, groundType, priceRange }: FetchGroundsParams) => {
    const skip = (page - 1) * initialState.limit; // Assuming 9 items per page

    const token = Cookies.get("token");
    console.log(token);
    const response = await axios.get(`http://localhost:3000/user/grounds`, {
      params: {
        skip,
        limit: initialState.limit,
        searchTerm,
        groundType,
        priceRange,
      },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  }
);

export const fetchGroundById = createAsyncThunk(
  "grounds/fetchGroundById",
  async (groundId: string, { getState }) => {
    console.log("Fetching ground by id:", groundId);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/grounds/${groundId}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response.data; // Assumes API returns a list of products
  }
);

const userGroundSlice = createSlice({
  name: "userGround",
  initialState,
  reducers: {
    setCurrentGround: (state, action: PayloadAction<Ground | null>) => {
      state.currentGround = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<UserGroundState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // resetProducts: (state) => {
    //     state.products = [];
    //     state.page = 1;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrounds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchGrounds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.grounds = action.payload.grounds;
        state.totalGrounds = action.payload.totalGrounds;
      })

      .addCase(fetchGrounds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch grounds";
      })

      .addCase(fetchGroundById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGroundById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentGround = action.payload;
      })
      .addCase(fetchGroundById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch ground";
      });
  },
});

export const { setCurrentGround, setFilters, setLoading, setError } =
  userGroundSlice.actions;
export default userGroundSlice.reducer;
