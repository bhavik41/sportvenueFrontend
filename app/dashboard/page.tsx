"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import AllGround from "@/components/user/AllGround";

export default function DashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      {/* <AllGround /> */}
      <AllGround />
    </ProtectedRoute>
  );
}
