"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  IndianRupee,
  Filter,
  ChevronDown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchUserBookings } from "@/store/slices/bookingSlice";
import { Booking } from "@/types/ground";

const BookingHistory = () => {
  const [sortBy, setSortBy] = useState("date");
  const [filterStatus, setFilterStatus] = useState("all");

  const dispatch = useDispatch<AppDispatch>();
  const { bookings } = useSelector((state: RootState) => state.bookings);

  useEffect(() => {
    dispatch(fetchUserBookings());
    console.log(bookings);
  }, [dispatch]);
  // Sample booking data

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}:00`).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filterStatus === "all") return true;
    return booking.status === filterStatus;
  });

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "amount") {
      return b.totalAmount - a.totalAmount;
    }
    return 0;
  });

  return (
    <div className="max-w-4xl sm:w-full sm:p-6 mx-auto p-0 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Booking History</h1>
          <p className="text-blue-100 mt-1">Track all your ground bookings</p>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Filters:
              </span>
            </div>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="divide-y divide-gray-200">
          {sortedBookings.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No bookings found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or make a new booking.
              </p>
            </div>
          ) : (
            sortedBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {booking.ground.name}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          ₹{booking.totalAmount}
                        </p>
                        <p className="text-sm text-gray-600">Total Amount</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="font-medium">Date:</span>
                          <span className="ml-1">
                            {formatDate(booking.date)}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="font-medium">Time:</span>
                          <span className="ml-1">
                            {formatTime(booking.timeSlot.startTime)} -{" "}
                            {formatTime(booking.timeSlot.endTime)}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                          <div>
                            <span className="font-medium">Location:</span>
                            <p className="ml-1 leading-tight">
                              {booking.ground.location.address},{" "}
                              {booking.ground.location.city},{" "}
                              {booking.ground.location.state} -{" "}
                              {booking.ground.location.pincode}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium">Sport:</span>
                          <span className="ml-1 capitalize">
                            {booking.ground.groundType.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        Booking ID: {booking.id} • Booked on{" "}
                        {formatDate(booking.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
