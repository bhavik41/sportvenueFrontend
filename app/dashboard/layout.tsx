"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { logout } from "@/store/slices/authslice";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUsers,
  FiSettings,
  FiBarChart2,
} from "react-icons/fi";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  // Sidebar links
  const navLinks = [
    { label: "Dashboard", icon: <FiHome />, href: "/dashboard" },
    { label: "Bookings", icon: <FiUsers />, href: "/dashboard/bookings" },
    { label: "Roles", icon: <FiSettings />, href: "/admin/roles" },
    { label: "Analytics", icon: <FiBarChart2 />, href: "/admin/analytics" },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar for desktop */}
        {/* <aside className="fixed h-full hidden lg:flex flex-col w-64  bg-gradient-to-b from-gray-800 to-black border-r-2 border-black-600 shadow-lg">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-blue-600">Admin Panel</h1>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                <span className="mr-3">{link.icon}</span>
                {link.label}
              </a>
            ))}
          </nav>
        </aside> */}

        {/* Sidebar for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="fixed inset-0 bg-black opacity-60 backdrop-blur-sm" />
            <aside
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                <h1 className="text-xl font-semibold text-blue-600">
                  Admin Panel
                </h1>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 px-4 py-6 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <span className="mr-3">{link.icon}</span>
                    {link.label}
                  </a>
                ))}
              </nav>
            </aside>
          </div>
        )}

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top nav */}
          <nav className="bg-gradient-to-r from-black to-gray-800 shadow border-b-1 border-slate-500">
            <div className="max-w-7xl my-1 mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  {/* Hamburger for mobile */}
                  <button
                    className="lg:hidden mr-3 text-white focus:outline-none"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <FiMenu className="h-6 w-6" />
                  </button>
                  <h1 className="text-xl font-semibold text-white">
                    Admin Dashboard
                  </h1>
                </div>
                <nav className="flex flex-row px-4 py-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center px-3 py-1 rounded-lg text-white hover:bg-white hover:text-black transition transform-3d"
                    >
                      <span className="mr-3 ">{link.icon}</span>
                      {link.label}
                    </a>
                  ))}
                </nav>
                <div className="flex items-center space-x-4 text-white">
                  <span>Welcome, {user?.name} (User)</span>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-black hover:bg-black hover:text-white hover:border-1 hover:border-white font-bold py-2 px-4 rounded"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </nav>
          {/* Page content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </>
  );
}
