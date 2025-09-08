// src/components/ResetPasswordModal.jsx
import React, { useState } from "react";
import Button from "./Button.jsx";
import Message from "./Message";

const ResetPasswordModal = ({ show, onClose }) => {
  const [email, setEmail] = useState(""); // Add this line
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match. Please try again.");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, // Add this line
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        setEmail("");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 overflow-y-auto">
      {/* Semi-transparent backdrop with blur effect */}
      <div className="fixed inset-0 backdrop-blur-md" onClick={onClose}></div>

      {/* Modal content container */}
      <div className="relative w-full max-w-sm sm:max-w-md p-6 sm:p-12 my-8 space-y-6 bg-gray-900 rounded-lg shadow-2xl border border-gray-800 z-50">
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
            Enter your current and new password.
          </p>
        </div>
        <hr className="border-gray-700" />
        <form onSubmit={handlePasswordReset} className="space-y-6">
          <Message message={error} type="error" />
          <Message message={success} type="success" />
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              className="text-gray-300 bg-gray-800 w-full px-4 py-2 mt-1 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || success}
            />
          </div>
          <div>
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-200"
            >
              Old Password
            </label>
            <input
              id="oldPassword"
              name="oldPassword"
              type="password"
              placeholder="Enter old password"
              required
              className="text-gray-300 bg-gray-800 w-full px-4 py-2 mt-1 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              disabled={isLoading || success}
            />
          </div>
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
              disabled={isLoading || success}
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
              disabled={isLoading || success}
            />
          </div>
          <div>
            <Button
              type="submit"
              className="w-full text-gray-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
              disabled={isLoading || success}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
