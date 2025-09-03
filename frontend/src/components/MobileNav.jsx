import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

const MobileNav = ({ isOpen, onClose, openModal, openSignupModal }) => {
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 sm:hidden">
      {/* Semi-transparent backdrop with blur effect */}
      <div
        className="fixed inset-0 bg-gray-950 bg-opacity-80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Mobile menu container */}
      <div className="fixed right-0 top-0 w-3/4 max-w-sm h-full bg-gray-900 shadow-xl p-6 z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
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
        </div>

        <nav className="flex flex-col space-y-4 mt-8">
          {isLoggedIn ? (
            <>
              <Link
                to="/"
                onClick={onClose}
                className={`text-lg py-2 rounded-md ${
                  location.pathname === "/"
                    ? "text-blue-500 font-semibold"
                    : "text-gray-400 hover:text-gray-50"
                }`}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                onClick={onClose}
                className={`text-lg py-2 rounded-md ${
                  location.pathname === "/dashboard"
                    ? "text-blue-500 font-semibold"
                    : "text-gray-400 hover:text-gray-50"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/employees"
                onClick={onClose}
                className={`text-lg py-2 rounded-md ${
                  location.pathname === "/employees"
                    ? "text-blue-500 font-semibold"
                    : "text-gray-400 hover:text-gray-50"
                }`}
              >
                Employees
              </Link>
              <Button
                onClick={() => {
                  openModal();
                  onClose();
                }}
                className="w-full text-gray-50 bg-gray-700 hover:bg-gray-600 focus:ring-gray-500 focus:ring-offset-gray-900"
              >
                Reset Password
              </Button>
              <Button
                onClick={handleLogout}
                className="w-full text-red-400 border border-red-400 bg-transparent hover:bg-red-400 hover:text-gray-50 focus:ring-red-400 focus:ring-offset-gray-900 mt-4"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  openModal();
                  onClose();
                }}
                className="w-full text-gray-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  openSignupModal();
                  onClose();
                }}
                className="w-full text-gray-50 bg-gray-700 hover:bg-blue-500 focus:ring-blue-600 focus:ring-offset-gray-900"
              >
                Sign Up
              </Button>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
