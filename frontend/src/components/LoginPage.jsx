// src/components/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button"; // Import the new Button component

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Predefined credentials for single-user authentication
    const correctEmail = "admin@example.com";
    const correctPassword = "password123";

    if (email === correctEmail && password === correctPassword) {
      console.log("Login successful!");
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-12 space-y-6 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-50">
          Employer Dashboard
        </h2>
        <h3 className="text-xl text-center text-gray-100">Login</h3>
        {error && (
          <div
            className="p-3 text-sm text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleLogin}>
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
              autoComplete="off"
              placeholder="Enter email"
              required
              className="text-gray-300 bg-gray-700 w-full px-3 py-2 mt-1 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="text-gray-300 bg-gray-700 w-full px-3 py-2 mt-1 border border-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button
              type="submit"
              className="w-full text-gray-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
