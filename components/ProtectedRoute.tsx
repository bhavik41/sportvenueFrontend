"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/store/store";
import { verifyToken } from "@/store/slices/authslice";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "user")[];
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles = ["user", "admin"],
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  // Initial token check and verification
  useEffect(() => {
    const token = Cookies.get("token");

    // If we have a token but aren't authenticated, verify it
    if (token && !isAuthenticated && !isLoading) {
      dispatch(verifyToken());
    }
    // If no token and not loading, redirect to login
    else if (!token && !isLoading) {
      router.push(redirectTo);
    }
  }, [dispatch, isAuthenticated, isLoading, router, redirectTo]);

  // Handle role-based access after authentication
  useEffect(() => {
    if (isAuthenticated && user && !allowedRoles.includes(user.role)) {
      router.push("/unauthorized");
    }
  }, [isAuthenticated, user, allowedRoles, router]);

  // Show loading while verifying token
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Don't render if not authenticated or user doesn't exist
  if (!isAuthenticated || !user) {
    return null;
  }

  // Don't render if user doesn't have required role
  if (!allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
