import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const DashboardPage = () => {
  const navigate = useNavigate();

  // Dummy data for demonstration with new metrics
  const stats = [
    { name: "Total Employees", count: 150 },
    { name: "Total Departments", count: 8 },
    { name: "New Hires This Month", count: 3 },
  ];

  const recentEmployees = [
    { id: 1, name: "John Doe", position: "Software Engineer" },
    { id: 2, name: "Jane Smith", position: "Product Manager" },
    { id: 3, name: "Peter Jones", position: "UX Designer" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Updated Heading Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-50">
          Dashboard
        </h1>
        <Button
          onClick={() => handleNavigation("/add-employee")}
          className="text-gray-50 bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-gray-900"
        >
          Add Employee
        </Button>
      </div>
      <hr className="border-gray-700 mb-6" />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-gray-900 rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-lg font-medium text-gray-300">{stat.name}</h2>
            <p className="mt-2 text-4xl font-extrabold text-blue-500">
              {stat.count}
            </p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-6">
        <section className="bg-gray-900 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-50">
              Recent Activity
            </h3>
            <Button
              onClick={() => handleNavigation("/employees")}
              className="text-gray-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
            >
              View All
            </Button>
          </div>
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
                <Button
                  onClick={() => handleNavigation(`/employees/${employee.id}`)}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
