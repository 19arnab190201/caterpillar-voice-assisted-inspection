// src/components/ProtectedRoutes.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "./Navbar";

function ProtectedRoute() {
  const { user, isTokenExpired, logout } = useAuthContext();

  if (!user || isTokenExpired()) {
    logout();
    return <Navigate to='/' />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
