import React, { useState } from "react";
import Button from "./Button.jsx";

const ResetPasswordModal = ({ show, onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    console.log("Password reset successful!");
    setSuccess("Your password has been reset successfully!");
    setNewPassword("");
    setConfirmPassword("");

    // In a real app, you'd send this data to your backend API.
    // e.g., an API call to /reset-password
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      {/* Semi-transparent backdrop with blur effect */}
      <div className="fixed inset-0 backdrop-blur-md" onClick={onClose}></div>

      {/* Modal content container */}
      <div className="relative w-full max-w-sm sm:max-w-md p-6 sm:p-12 space-y-6 bg-gray-900 rounded-lg shadow-2xl border border-gray-800 z-50">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
          aria-label="Close"
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
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-50">
            Reset Password
          </h2>
          <p className="mt-2 text-md text-gray-400">
            Enter your new password below.
          </p>
        </div>
        <hr className="border-gray-700" />
        <form onSubmit={handlePasswordReset} className="space-y-6">
          {error && <div className="text-red-400 text-center">{error}</div>}
          {success && (
            <div className="text-green-400 text-center">{success}</div>
          )}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-200"
            >
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              required
              className="text-gray-300 bg-gray-800 w-full px-4 py-2 mt-1 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-200"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              required
              className="text-gray-300 bg-gray-800 w-full px-4 py-2 mt-1 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <Button
              type="submit"
              className="w-full text-gray-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
            >
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
