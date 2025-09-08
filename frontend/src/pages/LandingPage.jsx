import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../layout/Footer";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import Header from "../layout/Header";
import { useAuth } from "../context/AuthContext";
import MobileNav from "../components/MobileNav";

const LandingPage = () => {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(null); // null, 'login', or 'signup'
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleOpenLoginModal = () => setModalState("login");
  const handleCloseModal = () => setModalState(null);
  const handleOpenSignupModal = () => setModalState("signup");
  const handleSwitchToSignup = () => setModalState("signup");
  const handleSwitchToLogin = () => setModalState("login");

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  const handleGoToEmployees = () => {
    navigate("/employees");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-200">
      {isLoggedIn ? (
        <Header />
      ) : (
        <header
          className="bg-gray-900 shadow-md sticky top-0 z-10 py-4"
          style={{ height: "5rem" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            {/* Desktop Logo and Navigation */}
            <Link
              to="/"
              className="hidden sm:flex items-center space-x-3 text-3xl font-bold text-blue-500 hover:text-blue-400 transition-colors"
            >
              <img
                src="../../logo.png"
                alt="Employer Dashboard"
                className="w-12 h-12"
              />
              <span className="inline">Employd</span>
            </Link>
            <nav className="hidden sm:flex items-center space-x-2 sm:space-x-4">
              <Button
                onClick={handleOpenLoginModal}
                className="text-gray-50 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
              >
                Log In
              </Button>
              <Button
                onClick={handleOpenSignupModal}
                className="text-gray-50 bg-gray-700 hover:bg-blue-500 focus:ring-blue-600 focus:ring-offset-gray-900"
              >
                Sign Up
              </Button>
            </nav>

            {/* Mobile Nav */}
            <div className="sm:hidden flex items-center justify-center relative w-full">
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="absolute left-0 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 transition-colors"
                aria-label="Open mobile menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
              <Link
                to="/"
                className="flex items-center space-x-3 text-3xl font-bold text-blue-500 hover:text-blue-400 transition-colors"
              >
                <img
                  src="../../logo.png"
                  alt="Employer Dashboard"
                  className="w-12 h-12"
                />
                <span className="inline">Employd</span>
              </Link>
            </div>
          </div>
        </header>
      )}

      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="py-16 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
                Welcome to Your Ultimate{" "}
                <span className="text-blue-500">Employee Management</span> Hub
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
                Streamline HR tasks, track employee data, and gain valuable
                insights with our simple, powerful, and production-ready
                dashboard.
              </p>
            </div>
          </section>

          <section className="py-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-50">
              Key Features & Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-800 transition-transform duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">
                  Comprehensive Dashboard
                </h3>
                <p className="text-gray-400">
                  Get a high-level overview of your workforce with real-time
                  statistics on total employees, departments, and new hires.
                </p>
              </div>
              <div className="bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-800 transition-transform duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">
                  Effortless Data Management
                </h3>
                <p className="text-gray-400">
                  Easily add, edit, and view detailed employee profiles.
                  Everything you need is at your fingertips, from personal to
                  professional details.
                </p>
              </div>
              <div className="bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-800 transition-transform duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">
                  Secure & Simple
                </h3>
                <p className="text-gray-400">
                  Our single-user application is built with security in mind,
                  providing a simple and protected gateway to your data via a
                  secure login.
                </p>
              </div>
            </div>
          </section>

          {isLoggedIn ? (
            <section className="py-16 text-center">
              <div className="max-w-3xl mx-auto bg-gray-900 p-10 rounded-lg shadow-2xl border border-gray-800 space-y-6">
                <h2 className="text-2xl sm:text-4xl font-bold text-white">
                  Welcome Back!
                </h2>
                <p className="text-lg text-gray-400">
                  Manage your workforce and view key metrics with ease.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button
                    onClick={handleGoToDashboard}
                    className="px-8 py-3 text-lg font-semibold w-full sm:w-auto bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
                  >
                    Go to Dashboard
                  </Button>
                  <Button
                    onClick={handleGoToEmployees}
                    className="px-8 py-3 text-lg font-semibold w-full sm:w-auto bg-gray-700 hover:bg-blue-500 focus:ring-blue-600 focus:ring-offset-gray-900"
                  >
                    Manage Employees
                  </Button>
                </div>
              </div>
            </section>
          ) : (
            <section className="py-16 text-center">
              <div className="max-w-3xl mx-auto bg-gray-900 p-10 rounded-lg shadow-2xl border border-gray-800 space-y-6">
                <h2 className="text-2xl sm:text-4xl font-bold text-white">
                  Ready to Get Started with{" "}
                  <span className="text-blue-500">Employd</span>?
                </h2>
                <p className="text-lg text-gray-400">
                  Join us to take control of your employee data and simplify
                  your HR workflow.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button
                    onClick={handleOpenLoginModal}
                    className="px-8 py-3 text-lg font-semibold w-full sm:w-auto bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={handleOpenSignupModal}
                    className="px-8 py-3 text-lg font-semibold w-full sm:w-auto bg-gray-700 hover:bg-blue-500 focus:ring-blue-600 focus:ring-offset-gray-900"
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
      {!isLoggedIn && (
        <>
          <LoginModal
            isOpen={modalState === "login"}
            onClose={handleCloseModal}
            onSwitchToSignup={handleSwitchToSignup}
          />
          <SignupModal
            isOpen={modalState === "signup"}
            onClose={handleCloseModal}
            onSwitchToLogin={handleSwitchToLogin}
          />
          <MobileNav
            isOpen={isMobileNavOpen}
            onClose={() => setIsMobileNavOpen(false)}
            openLoginModal={handleOpenLoginModal}
            openSignupModal={handleOpenSignupModal}
          />
        </>
      )}
    </div>
  );
};

export default LandingPage;
