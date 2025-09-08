import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Message from "../components/Message";

const EmployeeDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:8000/api/employees/${id}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch employee details.");
        }
        const data = await response.json();
        setEmployee(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/employees/${id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete employee.");
        }

        // ✅ Navigate back with success message
        navigate("/employees", {
          state: { message: "Employee deleted successfully!" },
        });
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950 text-gray-100">
        <p className="text-xl text-blue-400">Loading employee details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-950 text-gray-100">
        <Message message={error} type="error" />
        <Button
          onClick={() => navigate("/employees")}
          className="mt-4 text-gray-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
        >
          Back to Employee List
        </Button>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950 text-gray-100">
        <p className="text-xl text-gray-400">Employee not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-50">
          Employee Details
        </h1>
        <div className="flex space-x-2">
          <Button
            onClick={() => navigate(`/employees/edit/${employee.id}`)}
            className="text-gray-50 bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500 focus:ring-offset-gray-900"
          >
            Edit
          </Button>
        </div>
      </div>
      <hr className="border-gray-700 mb-6" />

      <div className="bg-gray-900 rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-50 border-b border-gray-700 pb-2">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <p className="text-sm font-medium text-gray-400">Date of Birth</p>
              <p className="text-gray-200">
                {new Date(employee.dateOfBirth)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, "-")}
              </p>
            </div>
          </div>
        </div>

        {/* Employment Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-50 border-b border-gray-700 pb-2">
            Employment Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-800 rounded-lg">
              <p className="text-sm font-medium text-gray-400">Department</p>
              <p className="text-gray-200">{employee.department}</p>
            </div>
            <div className="p-3 bg-gray-800 rounded-lg">
              <p className="text-sm font-medium text-gray-400">Designation</p>
              <p className="text-gray-200">{employee.designation}</p>
            </div>
            <div className="p-3 bg-gray-800 rounded-lg">
              <p className="text-sm font-medium text-gray-400">Salary</p>
              <p className="text-gray-200">&#8377;{employee.salary}</p>
            </div>
            <div className="p-3 bg-gray-800 rounded-lg">
              <p className="text-sm font-medium text-gray-400">Hire Date</p>
              <p className="text-gray-200">{employee.hireDate}</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-4 col-span-full">
          <h2 className="text-xl font-semibold text-gray-50 border-b border-gray-700 pb-2">
            Address
          </h2>
          <div className="p-3 bg-gray-800 rounded-lg">
            <p className="text-sm font-medium text-gray-400">Full Address</p>
            <p className="text-gray-200">
              {employee.address}, {employee.city}-{employee.postalCode},{" "}
              {employee.state}, {employee.country}
            </p>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-4 col-span-full">
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
              <p className="text-gray-200">{employee.emergencyContactPhone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleDelete}
          className="w-full sm:w-auto text-gray-50 bg-red-600 hover:bg-red-700 focus:ring-red-600 focus:ring-offset-gray-900"
        >
          Delete Employee
        </Button>
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;
