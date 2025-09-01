// src/components/EmployeeDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";

const EmployeeDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real application, you would make an API call to fetch employee data
    const fetchEmployeeDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulating a network request with a delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Dummy data for a specific employee based on ID
        const dummyEmployeeData = {
          id: id,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "123-456-7890",
          dateOfBirth: "1990-05-20",
          department: "Engineering",
          designation: "Software Engineer",
          salary: "85000.00",
          hireDate: "2022-03-15",
          address: "Near Rotary Blood Bank",
          city: "Vizianagaram",
          state: "Andhra Pradesh",
          postalCode: "535002",
          country: "India",
          emergencyContactName: "Jane Doe",
          emergencyContactPhone: "987-654-3210",
        };
        setEmployee(dummyEmployeeData);
      } catch (err) {
        setError("Failed to fetch employee details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-gray-100">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-red-400">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-gray-100">
        <p className="text-xl">Employee not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-gray-900 rounded-lg shadow-md p-6 sm:p-10">
        <header className="flex flex-col sm:flex-row justify-between items-center pb-4 border-b border-gray-800">
          <h1 className="text-3xl font-bold text-gray-50 mb-4 sm:mb-0">
            Employee Details
          </h1>
          <nav className="flex space-x-2 sm:space-x-4">
            <Button
              onClick={() => navigate(`/employees/edit/${employee.id}`)}
              className="text-gray-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
            >
              Edit
            </Button>
            <Button
              onClick={() => navigate("/employees")}
              className="text-gray-50 bg-gray-700 hover:bg-gray-600 focus:ring-blue-500 focus:ring-offset-gray-900"
            >
              Back to List
            </Button>
          </nav>
        </header>

        <section className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-50 border-b border-gray-700 pb-2">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-400">Full Name</p>
                <p className="text-gray-200">
                  {employee.firstName} {employee.lastName}
                </p>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-400">Email</p>
                <p className="text-gray-200">{employee.email}</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-400">Phone</p>
                <p className="text-gray-200">{employee.phone}</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-400">
                  Date of Birth
                </p>
                <p className="text-gray-200">{employee.dateOfBirth}</p>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-50 border-b border-gray-700 pb-2">
              Professional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-400">Designation</p>
                <p className="text-gray-200">{employee.designation}</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-400">Department</p>
                <p className="text-gray-200">{employee.department}</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-400">Salary</p>
                <p className="text-gray-200">${employee.salary}</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-400">Hire Date</p>
                <p className="text-gray-200">{employee.hireDate}</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-50 border-b border-gray-700 pb-2">
              Address
            </h2>
            <div className="p-3 bg-gray-800 rounded-lg">
              <p className="text-sm font-medium text-gray-400">Full Address</p>
              <p className="text-gray-200">
                {employee.address}, {employee.city}
                {"-"}
                {employee.postalCode}, {employee.state}, {employee.country}
              </p>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-50 border-b border-gray-700 pb-2">
              Emergency Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-400">Name</p>
                <p className="text-gray-200">{employee.emergencyContactName}</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-400">Phone</p>
                <p className="text-gray-200">
                  {employee.emergencyContactPhone}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;
