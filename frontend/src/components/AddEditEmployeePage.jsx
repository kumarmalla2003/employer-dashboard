// src/components/AddEditEmployeePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";

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
        address: "123 Main St",
        city: "Anytown",
        postalCode: "12345",
        state: "CA",
        country: "USA",
        emergencyContactName: "Jane Doe",
        emergencyContactPhone: "987-654-3210",
      };
      setEmployee(dummyEmployeeData);
      setLoading(false);
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!employee.firstName || !employee.lastName || !employee.email) {
      setError("First Name, Last Name, and Email are required fields.");
      return;
    }

    try {
      if (isEditing) {
        console.log("Updating employee:", employee);
        // Implement PUT API call here
      } else {
        console.log("Adding new employee:", employee);
        // Implement POST API call here
      }
      navigate("/employees");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-8 bg-gray-900 rounded-lg shadow-md p-6 sm:p-10">
        <header className="flex flex-col sm:flex-row justify-between items-center pb-4 border-b border-gray-800">
          <h1 className="text-3xl font-bold text-gray-50 mb-4 sm:mb-0">
            {isEditing ? "Edit Employee" : "Add New Employee"}
          </h1>
          <Button
            onClick={() => navigate("/employees")}
            className="text-gray-50 bg-gray-700 hover:bg-gray-600 focus:ring-blue-500 focus:ring-offset-gray-900"
          >
            Back to List
          </Button>
        </header>

        {error && (
          <div
            className="p-3 text-sm text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Personal Information */}
          <div className="col-span-full">
            <h2 className="text-xl font-semibold text-gray-50 border-b border-gray-700 pb-2 mb-4">
              Personal Information
            </h2>
          </div>
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-200"
            >
              First Name*
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={employee.firstName}
              onChange={handleChange}
              required
              placeholder="e.g., John"
              className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-200"
            >
              Last Name*
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={employee.lastName}
              onChange={handleChange}
              required
              placeholder="e.g., Doe"
              className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
              placeholder="e.g., john.doe@example.com"
              className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            />
          </div>
          <div className="col-span-full">
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
              placeholder="dd/mm/yyyy"
              className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Professional Information */}
          <div className="col-span-full">
            <h2 className="text-xl font-semibold text-gray-50 border-b border-gray-700 pb-2 mb-4">
              Professional Information
            </h2>
          </div>
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
              placeholder="dd/mm/yyyy"
              className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Address Information */}
          <div className="col-span-full">
            <h2 className="text-xl font-semibold text-gray-50 border-b border-gray-700 pb-2 mb-4">
              Address
            </h2>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-200"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={employee.address}
              onChange={handleChange}
              placeholder="e.g., 123 Main St"
              className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              placeholder="e.g., Anytown"
              className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              placeholder="e.g., 12345"
              className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              placeholder="e.g., CA"
              className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              placeholder="e.g., USA"
              className="mt-1 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Emergency Contact */}
          <div className="col-span-full">
            <h2 className="text-xl font-semibold text-gray-50 border-b border-gray-700 pb-2 mb-4">
              Emergency Contact
            </h2>
          </div>
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

          <div className="col-span-full pt-4">
            <Button
              type="submit"
              className="w-full text-gray-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
            >
              {isEditing ? "Update Employee" : "Add Employee"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditEmployeePage;
