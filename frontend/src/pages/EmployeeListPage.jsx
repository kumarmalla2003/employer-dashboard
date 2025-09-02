// src/components/EmployeeListPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const EmployeeListPage = () => {
  const navigate = useNavigate();

  // Dummy employee data for demonstration.
  // In the final version, this data will be fetched from the backend.
  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      name: "John Doe",
      position: "Software Engineer",
      department: "Engineering",
    },
    {
      id: "EMP002",
      name: "Jane Smith",
      position: "Product Manager",
      department: "Product",
    },
    {
      id: "EMP003",
      name: "Peter Jones",
      position: "UX Designer",
      department: "Design",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (id) => {
    // Navigate to the Add/Edit page with the employee ID
    navigate(`/employees/edit/${id}`);
  };

  const handleDelete = (id) => {
    // In a real app, this would make a DELETE API call
    console.log(`Deleting employee with ID: ${id}`);
    const updatedEmployees = employees.filter((emp) => emp.id !== id);
    setEmployees(updatedEmployees);
  };

  const handleView = (id) => {
    navigate(`/employees/${id}`);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Updated Heading Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-50">
          Employees
        </h1>
        <Button
          onClick={() => navigate("/add-employee")}
          className="text-gray-50 bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-gray-900"
        >
          Add Employee
        </Button>
      </div>
      <hr className="border-gray-700 mb-6" />

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search employees by name or ID..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <section className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-lg font-bold text-gray-400 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-lg font-bold text-gray-400 uppercase tracking-wider"
                >
                  Employee ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-lg font-bold text-gray-400 uppercase tracking-wider"
                >
                  Position
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-lg font-bold text-gray-400 uppercase tracking-wider"
                >
                  Department
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-lg font-bold text-gray-400 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee, index) => (
                  <tr
                    key={employee.id}
                    className={`transition-colors duration-200 ${
                      index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <div className="text-sm font-medium text-gray-200">
                        {employee.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-center">
                      {employee.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-center">
                      {employee.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-center">
                      {employee.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <Button
                        onClick={() => handleView(employee.id)}
                        className="text-blue-400 hover:text-blue-300 mr-2"
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => handleEdit(employee.id)}
                        className="text-yellow-400 hover:text-yellow-300 mr-2"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(employee.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-400"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default EmployeeListPage;
