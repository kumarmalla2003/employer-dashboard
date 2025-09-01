// src/components/SettingsModal.jsx
import React, { useState, useEffect } from "react";
import Button from "./Button";
import PropTypes from "prop-types";

const SettingsModal = ({ show, onClose }) => {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // This hook runs whenever the 'show' prop changes.
  // When 'show' becomes true, it resets the success and error messages.
  useEffect(() => {
    if (show) {
      setError("");
      setSuccess("");
    }
  }, [show]);

  const handleUpdate = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // In a production app, you would send this data to a backend API
    // For this simple project, we'll just log the change
    console.log("Updating credentials...");
    console.log("New Email:", newEmail);
    console.log("New Password:", newPassword);

    // Simulate a successful update
    setSuccess("Credentials updated successfully!");
    setNewEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => {
      onClose(); // Close the modal after a few seconds
    }, 2000);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background overlay with blur effect */}
      <div
        className="fixed inset-0 bg-black opacity-75 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md relative transform transition-transform duration-300 scale-100">
        <h3 className="text-xl font-bold text-gray-50 mb-4 text-center">
          Change Login Credentials
        </h3>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {error && (
          <div className="p-3 mb-4 text-sm text-center  text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 mb-4 text-sm text-center text-green-700 bg-green-100 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label
              htmlFor="newEmail"
              className="block text-sm font-medium text-gray-300"
            >
              New Email
            </label>
            <input
              id="newEmail"
              type="email"
              value={newEmail}
              placeholder="Enter new email"
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-300"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              placeholder="Enter new password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              placeholder="Confirm new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full text-gray-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

SettingsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsModal;
