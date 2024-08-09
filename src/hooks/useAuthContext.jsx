// src/hooks/useAuthContext.jsx
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useAuthContext = () => {
  const { user, logout } = useContext(UserContext);

  const isTokenExpired = () => {
    const token = user?.token;
    if (!token) return true;

    const expiry = JSON.parse(atob(token.split(".")[1])).exp;
    return expiry * 1000 < Date.now();
  };

  return { user, logout, isTokenExpired };
};
