"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import AllGround from "@/components/user/ground";

export default function DashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      {/* <AllGround /> */}
      <AllGround />
    </ProtectedRoute>
  );
}
