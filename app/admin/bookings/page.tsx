"use client";

import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminBookings } from "@/store/slices/bookingSlice";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CreditCard,
  Search,
  Filter,
  Eye,
} from "lucide-react";
import { Booking } from "@/types/ground";

const BookingVisualization = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Sample data - you can replace with your actual data
  const dispatch = useDispatch<AppDispatch>();
  const { bookings } = useSelector((state: RootState) => state.bookings);

  useEffect(() => {
    dispatch(fetchAdminBookings());
    console.log(bookings);
  }, [dispatch]);

  const getStatusColor = (status: Booking["status"]) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (time: string | undefined) => {
    return new Date(`2000-01-01T${time}:00`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: string | Date | undefined | null) => {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.ground.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const DetailModal = ({
    booking,
    onClose,
  }: {
    booking: Booking;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Booking Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Customer</h3>
            <p>
              <strong>Name:</strong> {booking.user?.name}
            </p>
            <p>
              <strong>Email:</strong> {booking.user?.email}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Ground</h3>
            <p>
              <strong>Name:</strong> {booking.ground?.name}
            </p>
            <p>
              <strong>Type:</strong> {booking.ground?.groundType}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Booking</h3>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(booking.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {formatTime(booking.timeSlot?.startTime)} -{" "}
              {formatTime(booking.timeSlot?.endTime)}
            </p>
            <p>
              <strong>Amount:</strong> ₹{booking.totalAmount}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Status</h3>
            <span
              className={`px-2 py-1 rounded text-xs ${getStatusColor(
                booking.status
              )}`}
            >
              {booking.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 bg-gray-50 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Booking Dashboard
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">
                {bookings.length}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">
                ₹{bookings.reduce((sum, b) => sum + b.totalAmount, 0)}
              </div>
              <div className="text-sm text-gray-600">Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-600">
                {bookings.filter((b) => b.status === "pending").length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">
                {bookings.filter((b) => b.status === "confirmed").length}
              </div>
              <div className="text-sm text-gray-600">Confirmed</div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by customer name, email, or ground..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ground
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date & Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-900">
                          {booking.user?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.user?.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-900">
                          {booking.ground.name}
                        </div>
                        <div className="text-sm text-gray-500 capitalize">
                          {booking.ground.groundType.replace("_", " ")}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-900">
                          {formatDate(booking.date)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatTime(booking.timeSlot.startTime)} -{" "}
                          {formatTime(booking.timeSlot.endTime)}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        ₹{booking.totalAmount}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No bookings found matching your criteria.
            </div>
          )}
        </div>

        {/* Pagination placeholder */}
        <div className="mt-4 flex justify-center">
          <div className="text-sm text-gray-500">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedBooking && (
        <DetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};

export default BookingVisualization;
