import React, { useState, useEffect } from "react";
import Button from "./Button";
import Message from "./Message";

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setError("");
      setSuccess("");
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message + " You can now log in.");
        setEmail("");
        setPassword("");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div
        className="fixed inset-0 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div className="relative w-full max-w-sm sm:max-w-md p-6 sm:p-12 space-y-6 bg-gray-900 rounded-lg shadow-2xl border border-gray-800 z-50">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
            Sign Up
          </h2>
          <p className="mt-2 text-md text-gray-400">
            Create an account to get started.
          </p>
        </div>
        <hr className="border-gray-700" />
        <form onSubmit={handleSignup} className="space-y-6">
          <Message message={error} type="error" />
          <Message message={success} type="success" />
          <div>
            <label
              htmlFor="signup-email"
              className="block text-sm font-medium text-gray-200"
            >
              Email address
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="off"
              placeholder="Enter email"
              required
              className="text-gray-300 bg-gray-800 w-full px-4 py-2 mt-1 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || !!success}
            />
          </div>
          <div>
            <label
              htmlFor="signup-password"
              className="block text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              placeholder="Enter password"
              required
              className="text-gray-300 bg-gray-800 w-full px-4 py-2 mt-1 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading || !!success}
            />
          </div>
          <div>
            <Button
              type="submit"
              className="w-full text-gray-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
              disabled={isLoading || !!success}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="font-medium text-blue-400 hover:text-blue-300 focus:outline-none focus:underline cursor-pointer"
          >
            Login!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
