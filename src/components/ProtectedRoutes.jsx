// src/components/ProtectedRoutes.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "./Navbar";

function ProtectedRoute() {
  const { user, isTokenExpired } = useAuthContext();
  console.log("user", user);
  if (!user) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
