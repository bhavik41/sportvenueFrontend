"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: ("admin" | "user")[];
  fallback?: React.ReactNode;
}

export default function RoleGuard({
  children,
  allowedRoles,
  fallback = <div>Access Denied</div>,
}: RoleGuardProps) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
