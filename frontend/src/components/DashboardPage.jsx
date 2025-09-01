// src/components/DashboardPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  // Dummy data for demonstration
  const stats = [
    { name: "Total Employees", count: 150 },
    { name: "Active Employees", count: 140 },
    { name: "Employees on Leave", count: 10 },
  ];

  const recentEmployees = [
    { id: 1, name: "John Doe", position: "Software Engineer" },
    { id: 2, name: "Jane Smith", position: "Product Manager" },
    { id: 3, name: "Peter Jones", position: "UX Designer" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // In a real application, you would clear the user's session or token here.
    console.log("User logged out!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center pb-4 border-b border-gray-800">
          <h1 className="text-3xl font-bold text-gray-50">Dashboard</h1>
          <nav className="space-x-2 sm:space-x-4 flex items-center">
            <button
              onClick={() => handleNavigation("/settings")}
              className="px-4 py-2 text-sm font-medium text-gray-50 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-50 bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              Logout
            </button>
          </nav>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <h4 className="text-lg font-semibold text-gray-300">
                {stat.name}
              </h4>
              <p className="mt-2 text-4xl font-extrabold text-blue-400">
                {stat.count}
              </p>
            </div>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="bg-gray-900 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-50 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => handleNavigation("/add-employee")}
              className="px-6 py-3 text-base font-medium text-gray-50 bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              Add New Employee
            </button>
            <button
              onClick={() => handleNavigation("/employees")}
              className="px-6 py-3 text-base font-medium text-gray-50 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              Employee List
            </button>
          </div>
        </section>

        <section className="bg-gray-900 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-50">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentEmployees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-md transform transition-transform duration-300 hover:scale-103 hover:shadow-lg"
              >
                <div>
                  <p className="font-medium text-gray-200">{employee.name}</p>
                  <p className="text-sm text-gray-400">{employee.position}</p>
                </div>
                <button
                  onClick={() => handleNavigation(`/employee/${employee.id}`)}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
