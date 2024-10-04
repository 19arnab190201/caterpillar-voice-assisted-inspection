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
import ReportPage from "./pages/ReportPage";
import { ConfigProvider } from "antd";

function App() {
  return (
    <UserContextProvider>
      <ConfigProvider
        theme={{
          components: {
            Segmented: {
              itemActiveBg: "#F4C300",
              itemSelectedBg: "#F4C300",
              itemHoverBg: "#F4C300",
            },
          },
        }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/profile' element={<ProfilePage />} />
          </Route>
          <Route path='/addinspection' element={<Inspection />} />
          <Route path='/createinspection' element={<CreateInspection />} />
          <Route path='/reports' element={<ReportPage />} />
        </Routes>
      </ConfigProvider>
    </UserContextProvider>
  );
}

export default App;
