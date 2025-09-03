import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import EmployeeListPage from "./pages/EmployeeListPage.jsx";
import AddEditEmployeePage from "./pages/AddEditEmployeePage.jsx";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx"; // Import AuthProvider and useAuth

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Use the state from AuthContext

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {" "}
        {/* Wrap the app with the AuthProvider */}
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Protected routes wrapped in the ProtectedRoute component */}
          <Route
            element={
              <ProtectedRoute>
                {" "}
                <Layout />{" "}
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/employees" element={<EmployeeListPage />} />
            <Route path="/add-employee" element={<AddEditEmployeePage />} />
            <Route
              path="/employees/edit/:id"
              element={<AddEditEmployeePage />}
            />
            <Route path="/employees/:id" element={<EmployeeDetailsPage />} />
          </Route>

          {/* Catch-all route for unmatched paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
