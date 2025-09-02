// src/components/AddEditEmployeePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";

const AddEditEmployeePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    hireDate: "",
    dateOfBirth: "",
    address: "",
    city: "",
    postalCode: "",
    state: "",
    country: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      // Simulating a fetch call with dummy data
      const dummyEmployeeData = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        department: "Engineering",
        designation: "Software Engineer",
        salary: "85000.00",
        hireDate: "2022-03-15",
        dateOfBirth: "1990-05-20",
        address: "Near Rotary Blood Bank",
        city: "Vizianagaram",
        postalCode: "535002",
        state: "Andhra Pradesh",
        country: "India",
        emergencyContactName: "Jane Doe",
        emergencyContactPhone: "987-654-3210",
      };
      setEmployee(dummyEmployeeData);
      setLoading(false);
    }
  }, [isEditing, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // In a real application, you would make an API call here.
    const apiMethod = isEditing ? "PUT" : "POST";
    const apiUrl = isEditing ? `/api/employees/${id}` : "/api/employees";

    console.log(`${apiMethod} request to ${apiUrl} with data:`, employee);

    setTimeout(() => {
      setLoading(false);
      console.log(`Employee ${isEditing ? "updated" : "added"} successfully!`);
      navigate("/employees");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-50">
          {isEditing ? "Edit Employee" : "Add Employee"}
        </h1>
        <Button
          onClick={() => navigate("/employees")}
          className="text-gray-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
        >
          View All
        </Button>
      </div>
      <hr className="border-gray-700 mb-6" />

      {loading && <div className="text-center text-blue-400">Loading...</div>}
      {error && <div className="text-red-400 text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-50 border-b border-gray-700 pb-2">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-200"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={employee.firstName}
                onChange={handleChange}
                placeholder="e.g., John"
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-200"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={employee.lastName}
                onChange={handleChange}
                placeholder="e.g., Doe"
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                placeholder="e.g., john.doe@example.com"
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-200"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
                placeholder="e.g., 123-456-7890"
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-200"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={employee.dateOfBirth}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Employment Information */}
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-50 border-b border-gray-700 pb-2">
            Employment Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-200"
              >
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={employee.department}
                onChange={handleChange}
                placeholder="e.g., Engineering"
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="designation"
                className="block text-sm font-medium text-gray-200"
              >
                Designation
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={employee.designation}
                onChange={handleChange}
                placeholder="e.g., Software Engineer"
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-200"
              >
                Salary
              </label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
                placeholder="e.g., 85000.00"
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="hireDate"
                className="block text-sm font-medium text-gray-200"
              >
                Hire Date
              </label>
              <input
                type="date"
                id="hireDate"
                name="hireDate"
                value={employee.hireDate}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-50 border-b border-gray-700 pb-2">
            Address
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="col-span-full">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-200"
              >
                Street Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={employee.address}
                onChange={handleChange}
                placeholder="e.g., 123 Main St"
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-200"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={employee.city}
                onChange={handleChange}
                placeholder="e.g., Vizianagaram"
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-200"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={employee.state}
                onChange={handleChange}
                placeholder="e.g., Andhra Pradesh"
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-gray-200"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={employee.postalCode}
                onChange={handleChange}
                placeholder="e.g., 535002"
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-200"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={employee.country}
                onChange={handleChange}
                placeholder="e.g., India"
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-50 border-b border-gray-700 pb-2">
            Emergency Contact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="emergencyContactName"
                className="block text-sm font-medium text-gray-200"
              >
                Name
              </label>
              <input
                type="text"
                id="emergencyContactName"
                name="emergencyContactName"
                value={employee.emergencyContactName}
                onChange={handleChange}
                placeholder="e.g., Jane Doe"
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="emergencyContactPhone"
                className="block text-sm font-medium text-gray-200"
              >
                Phone
              </label>
              <input
                type="tel"
                id="emergencyContactPhone"
                name="emergencyContactPhone"
                value={employee.emergencyContactPhone}
                onChange={handleChange}
                placeholder="e.g., 987-654-3210"
                className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            className={
              isEditing
                ? "w-full sm:w-auto text-gray-50 bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500 focus:ring-offset-gray-900"
                : "w-full sm:w-auto text-gray-50 bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-gray-900"
            }
          >
            {isEditing ? "Update Employee" : "Add Employee"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEditEmployeePage;
