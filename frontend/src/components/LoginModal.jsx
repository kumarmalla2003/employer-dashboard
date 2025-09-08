import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";
import Message from "./Message";

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setError("");
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      console.log("Login successful!");
      onClose(); // Close modal on successful login
    } else {
      setError(result.message);
    }
    setIsLoading(false);
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
            Log In
          </h2>
          <p className="mt-2 text-md text-gray-400">Enter your credentials.</p>
        </div>
        <hr className="border-gray-700" />
        <form onSubmit={handleLogin} className="space-y-6">
          <Message message={error} type="error" />
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              placeholder="Enter email"
              required
              className="text-gray-300 bg-gray-800 w-full px-4 py-2 mt-1 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              required
              className="text-gray-300 bg-gray-800 w-full px-4 py-2 mt-1 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <Button
              type="submit"
              className="w-full text-gray-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </Button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            className="font-medium text-blue-400 hover:text-blue-300 focus:outline-none focus:underline cursor-pointer"
          >
            Sign up first!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
