import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

const MobileNav = ({
  isOpen,
  onClose,
  openLoginModal,
  openSignupModal,
  openResetPasswordModal,
}) => {
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 backdrop-blur-md z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3 text-3xl font-bold text-blue-500">
            <img src="../../logo.png" alt="Employd" className="w-10 h-10" />
            <span>Employd</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
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
        <nav className="flex flex-col p-4 space-y-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/"
                onClick={onClose}
                className={`block px-4 py-2 text-md rounded transition-colors ${
                  location.pathname === "/" ? "text-blue-500" : "text-gray-50"
                } hover:bg-gray-800`}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                onClick={onClose}
                className={`block px-4 py-2 text-md rounded transition-colors ${
                  location.pathname === "/dashboard"
                    ? "text-blue-500"
                    : "text-gray-50"
                } hover:bg-gray-800`}
              >
                Dashboard
              </Link>
              <Link
                to="/employees"
                onClick={onClose}
                className={`block px-4 py-2 text-md rounded transition-colors ${
                  location.pathname === "/employees"
                    ? "text-blue-500"
                    : "text-gray-50"
                } hover:bg-gray-800`}
              >
                Employees
              </Link>
              <div className="border-t border-gray-700 mt-4 pt-4">
                <button
                  onClick={() => {
                    if (openResetPasswordModal) {
                      openResetPasswordModal();
                      onClose();
                    }
                  }}
                  className="block px-4 py-2 text-md text-gray-300 w-full text-left rounded hover:bg-gray-800 transition-colors"
                >
                  Reset Password
                </button>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-md text-red-400 w-full text-left rounded hover:bg-gray-800 transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="border-t border-gray-700 mt-4 pt-4 flex flex-col space-y-2">
              <Button
                onClick={() => {
                  if (openLoginModal) {
                    openLoginModal();
                    onClose();
                  }
                }}
                className="w-full text-left text-gray-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
              >
                Log In
              </Button>
              <Button
                onClick={() => {
                  if (openSignupModal) {
                    openSignupModal();
                    onClose();
                  }
                }}
                className="w-full text-left text-gray-50 bg-gray-700 hover:bg-blue-500 focus:ring-blue-600 focus:ring-offset-gray-900"
              >
                Sign Up
              </Button>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default MobileNav;
