// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoutes";
import { UserContextProvider } from "./context/UserContext";
import Login from "./pages/Login";
import Inspection from "./pages/Inspection";
import CreateInspection from "./pages/CreateInspection";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/login2' element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Route>
        <Route path='/addinspection' element={<Inspection />} />
        <Route path='/createinspection' element={<CreateInspection />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
