"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { logout } from "@/store/slices/authslice";
import ProtectedRoute from "@/components/ProtectedRoute";
// import RoleGuard from "@/components/RoleGuard";
import GroundsList from "@/components/admin/GroundsList";

export default function AdminPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">Users</h3>
              <p className="mt-2 text-sm text-gray-600">Manage system users</p>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">Roles</h3>
              <p className="mt-2 text-sm text-gray-600">Configure user roles</p>
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
              <p className="mt-2 text-sm text-gray-600">System configuration</p>
            </div>
          </div>
        </div>
        <div className="min-h-screen bg-gray-50">
          <GroundsList />
        </div>
      </main>
    </ProtectedRoute>
  );
}
