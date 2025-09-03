import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ResetPasswordModal from "../components/ResetPasswordModal.jsx";
import MobileNav from "../components/MobileNav.jsx";
import Button from "../components/Button.jsx";
import { useAuth } from "../context/AuthContext.jsx"; // Import the useAuth hook

const Header = () => {
  const location = useLocation();
  const { logout } = useAuth(); // Use the logout function from the context

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({});

  const homeRef = useRef(null);
  const dashboardRef = useRef(null);
  const employeesRef = useRef(null);
  const profileMenuRef = useRef(null); // Ref for the profile menu container

  const navRefs = {
    "/": homeRef,
    "/dashboard": dashboardRef,
    "/employees": employeesRef,
  };

  // Determine the active path (defaults to /employees if not matched)
  const activePath = ["/", "/dashboard", "/employees"].includes(
    location.pathname
  )
    ? location.pathname
    : "/employees";

  const getTargetPosition = (path) => {
    const ref = navRefs[path];
    if (ref && ref.current) {
      return {
        left: ref.current.offsetLeft,
        width: ref.current.offsetWidth,
      };
    }
    return null;
  };

  useEffect(() => {
    const initialPosition = getTargetPosition(activePath);
    if (initialPosition) {
      setUnderlineStyle(initialPosition);
    }
  }, [activePath]);

  // UseEffect for handling clicks outside the profile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the profile menu if it's open and the click is outside the menu container
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    // Add the event listener when the profile menu is open
    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener when the component unmounts or the menu closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]); // Dependency on isProfileMenuOpen to add/remove listener

  const handleMouseEnter = (path) => {
    const hoverPosition = getTargetPosition(path);
    if (hoverPosition) {
      setUnderlineStyle(hoverPosition);
    }
  };

  const handleMouseLeave = () => {
    const activePosition = getTargetPosition(activePath);
    if (activePosition) {
      setUnderlineStyle(activePosition);
    }
  };

  const handleLogout = () => {
    console.log("User logged out!");
    logout(); // Call the logout function from AuthContext
    // The ProtectedRoute in App.jsx will automatically handle the redirection to the landing page
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleMobileNav = () => setIsMobileNavOpen(!isMobileNavOpen);

  return (
    <header
      className="bg-gray-900 shadow-md sticky top-0 z-10 py-4"
      style={{ height: "5rem" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Hamburger menu for mobile */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={toggleMobileNav}
            className="text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 transition-colors"
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
        </div>

        {/* Brand/Logo Link */}
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

        {/* Main Navigation - desktop only */}
        <nav
          className="relative hidden sm:flex items-center space-x-4"
          onMouseLeave={handleMouseLeave}
        >
          <Link
            to="/"
            className={`text-gray-50 transition-colors ${
              activePath === "/" ? "!text-blue-500" : ""
            }`}
            ref={homeRef}
            onMouseEnter={() => handleMouseEnter("/")}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`text-gray-50 transition-colors ${
              activePath === "/dashboard" ? "!text-blue-500" : ""
            }`}
            ref={dashboardRef}
            onMouseEnter={() => handleMouseEnter("/dashboard")}
          >
            Dashboard
          </Link>
          <Link
            to="/employees"
            className={`text-gray-50 transition-colors ${
              activePath === "/employees" ? "!text-blue-500" : ""
            }`}
            ref={employeesRef}
            onMouseEnter={() => handleMouseEnter("/employees")}
          >
            Employees
          </Link>
          {/* Animated Underline */}
          <span
            className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300"
            style={{ ...underlineStyle }}
          ></span>
        </nav>

        {/* Profile Menu Dropdown with SVG Icon */}
        <div className="relative" ref={profileMenuRef}>
          <Button
            onClick={toggleProfileMenu}
            className="p-2 rounded-full text-gray-50 bg-gray-700 hover:bg-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-colors"
            aria-label="User Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg px-2 py-2 z-20 ring-1 ring-black ring-opacity-5">
              <button
                onClick={() => {
                  openModal();
                  setIsProfileMenuOpen(false);
                }}
                className="block px-4 py-2 text-sm text-gray-300 w-full text-left hover:bg-gray-700 hover:text-gray-50 cursor-pointer"
              >
                Reset Password
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsProfileMenuOpen(false);
                }}
                className="block px-4 py-2 text-sm text-red-400 w-full text-left hover:bg-gray-700 hover:text-red-300 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <ResetPasswordModal show={isModalOpen} onClose={closeModal} />
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        openModal={openModal}
      />
    </header>
  );
};

export default Header;
