import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import EmployeeListPage from "./pages/EmployeeListPage.jsx";
import AddEditEmployeePage from "./pages/AddEditEmployeePage.jsx";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";

// This check is a placeholder for a real authentication system
const isAuthenticated = () => {
  return (
    window.location.pathname !== "/" && window.location.pathname !== "/login"
  );
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Protected routes wrapped in the Layout component */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeeListPage />} />
          <Route path="/add-employee" element={<AddEditEmployeePage />} />
          <Route path="/employees/edit/:id" element={<AddEditEmployeePage />} />
          <Route path="/employees/:id" element={<EmployeeDetailsPage />} />
        </Route>

        {/* Catch-all route for unmatched paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
