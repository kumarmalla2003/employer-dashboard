import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Message from "../components/Message";

const DashboardPage = () => {
  const navigate = useNavigate();

  // State for real data
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    newHiresThisMonth: 0,
  });
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all employees
        const employeesResponse = await fetch(
          "http://localhost:8000/api/employees",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!employeesResponse.ok) {
          throw new Error("Failed to fetch employees data");
        }

        const employeesData = await employeesResponse.json();

        // Calculate statistics
        const totalEmployees = employeesData.length;

        // Get unique departments
        const uniqueDepartments = [
          ...new Set(employeesData.map((emp) => emp.department)),
        ];
        const totalDepartments = uniqueDepartments.length;

        // Calculate new hires this month
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const newHiresThisMonth = employeesData.filter((emp) => {
          const hireDate = new Date(emp.hireDate);
          return (
            hireDate.getMonth() === currentMonth &&
            hireDate.getFullYear() === currentYear
          );
        }).length;

        // Get recent employees (last 5 hired, sorted by hire date descending)
        const sortedEmployees = employeesData.sort(
          (a, b) => new Date(b.hireDate) - new Date(a.hireDate)
        );
        const recentEmps = sortedEmployees.slice(0, 5).map((emp) => ({
          id: emp.id,
          name: `${emp.firstName} ${emp.lastName}`,
          position: emp.designation,
          department: emp.department,
          hireDate: emp.hireDate,
        }));

        // Update state
        setStats({
          totalEmployees,
          totalDepartments,
          newHiresThisMonth,
        });
        setRecentEmployees(recentEmps);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-950 text-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-blue-400">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-950 text-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <Message message={`Error loading dashboard: ${error}`} type="error" />
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 text-gray-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

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

      {/* Statistics Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <h2 className="text-lg font-medium text-gray-300">Total Employees</h2>
          <p className="mt-2 text-4xl font-extrabold text-blue-500">
            {stats.totalEmployees}
          </p>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <h2 className="text-lg font-medium text-gray-300">
            Total Departments
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-green-500">
            {stats.totalDepartments}
          </p>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <h2 className="text-lg font-medium text-gray-300">
            New Hires This Month
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-yellow-500">
            {stats.newHiresThisMonth}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6">
        <section className="bg-gray-900 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-50">
              Recent Employees
            </h3>
            <Button
              onClick={() => handleNavigation("/employees")}
              className="text-gray-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
            >
              View All
            </Button>
          </div>

          {recentEmployees.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No employees found</p>
              <Button
                onClick={() => handleNavigation("/add-employee")}
                className="text-gray-50 bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-gray-900"
              >
                Add First Employee
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center justify-between p-4 bg-gray-800 rounded-md transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-200">{employee.name}</p>
                    <p className="text-sm text-gray-400">{employee.position}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {employee.department} • Hired:{" "}
                      {formatDate(employee.hireDate)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        handleNavigation(`/employees/edit/${employee.id}`)
                      }
                      className="text-sm text-yellow-400 hover:text-yellow-300 px-3 py-1"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleNavigation("/employees")}
                      className="text-sm text-blue-400 hover:text-blue-300 px-3 py-1"
                    >
                      View All
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
