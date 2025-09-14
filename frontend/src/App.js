import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function AppWrapper() {
  const [isLogged, setIsLogged] = useState(() => !!localStorage.getItem("token"));
  const location = useLocation();

  // ✅ Re-check token every time route changes
  useEffect(() => {
    setIsLogged(!!localStorage.getItem("token"));
  }, [location.pathname]);

  const handleLogin = () => setIsLogged(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route
        path="/dashboard"
        element={isLogged ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />}
      />
      <Route
        path="*"
        element={<Navigate to={isLogged ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
