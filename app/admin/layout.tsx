"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { logout } from "@/store/slices/authslice";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleGuard from "@/components/RoleGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-red-600 shadow">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-white">
                  Admin Dashboard
                </h1>
              </div>
              <div className="flex items-center space-x-4 text-white">
                <span>Welcome, {user?.name} (Admin)</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Users</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Manage system users
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Roles</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Configure user roles
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
                <p className="mt-2 text-sm text-gray-600">
                  View system analytics
                </p>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Settings</h3>
                <p className="mt-2 text-sm text-gray-600">
                  System configuration
                </p>
              </div>
            </div>
          </div>

          <RoleGuard allowedRoles={["admin"]}>{children}</RoleGuard>
        </main>
      </div>
    </>
  );
}
