"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { logout } from "@/store/slices/authslice";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleGuard from "@/components/RoleGuard";
import GroundsList from "@/components/admin/GroundsList";

export default function AdminPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <RoleGuard allowedRoles={["admin"]}>
        <div className="min-h-screen bg-gray-50">
          <GroundsList />
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}
