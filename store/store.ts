import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice";
import AdminGroundReducer from "./slices/adminGroundSlice";
import UserGroundReducer from "./slices/userGroundSlice";
import bookingReducer from "./slices/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminGrounds: AdminGroundReducer,
    userGrounds: UserGroundReducer,
    bookings: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
