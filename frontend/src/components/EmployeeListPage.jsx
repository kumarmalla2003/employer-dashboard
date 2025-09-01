// src/components/EmployeeListPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

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
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  const handleView = (id) => {
    // Navigate to the Employee Details page
    navigate(`/employees/${id}`);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center pb-4 border-b border-gray-800">
          <h1 className="text-3xl font-bold text-gray-50 mb-4 sm:mb-0">
            Employee List
          </h1>
          <nav className="flex space-x-2 sm:space-x-4">
            <Button
              onClick={() => navigate("/dashboard")}
              className="text-gray-50 bg-gray-700 hover:bg-gray-600 focus:ring-blue-500 focus:ring-offset-gray-900"
            >
              Dashboard
            </Button>
            <Button
              onClick={() => navigate("/add-employee")}
              className="text-gray-50 bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-gray-900"
            >
              Add New Employee
            </Button>
          </nav>
        </header>

        <section className="my-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name or ID..."
              className="w-full p-3 rounded-md bg-gray-900 text-gray-300 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee, index) => (
                    <tr
                      key={employee.id}
                      className={
                        index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200 text-center">
                        {employee.name}
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmployeeListPage;
