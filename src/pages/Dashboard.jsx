import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";

function Dashboard() {
  const { logout, user } = useAuthContext();

  return (
    <>
      <h1>Welcome {user.username}</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default Dashboard;
