import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { user } = useAuthContext();

  return (
    <div>
      <Navbar />
      <h1>Welcome {user.user.name}</h1>
    </div>
  );
}

export default Dashboard;
