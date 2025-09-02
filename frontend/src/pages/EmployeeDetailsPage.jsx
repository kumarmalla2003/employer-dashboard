import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";

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
          postalCode: "535002",
          state: "Andhra Pradesh",
          country: "India",
          emergencyContactName: "Jane Doe",
          emergencyContactPhone: "987-654-3210",
        };

        if (id !== dummyEmployeeData.id) {
          throw new Error("Employee not found.");
        }

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

  const handleDelete = () => {
    // In a real application, you would make an API call here.
    console.log(`Deleting employee with ID: ${id}`);
    // Simulating API call success
    alert(`Employee with ID ${id} deleted successfully!`);
    navigate("/employees");
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
      <div className="flex justify-center items-center min-h-screen bg-gray-950 text-gray-100">
        <p className="text-xl text-red-400">{error}</p>
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
              <p className="text-gray-200">{employee.dateOfBirth}</p>
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
              <p className="text-gray-200">${employee.salary}</p>
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
