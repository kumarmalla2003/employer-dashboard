// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const AuthContext = createContext(null);

// Create a provider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for the authentication cookie on initial load
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Check if user performed a normal navigation (not a refresh)
        const wasNavigating = sessionStorage.getItem("isNavigating");

        if (!wasNavigating) {
          // This is a page refresh - user should be logged out
          console.log("Page refresh detected - logging out user");
          setIsLoggedIn(false);
          setIsLoading(false);
          return;
        }

        // Clear the navigation flag since we've used it
        sessionStorage.removeItem("isNavigating");

        // Check with server if the cookie is still valid
        const response = await fetch("http://localhost:8000/api/check-auth", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // This is crucial for sending cookies
        });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Failed to check auth status:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();

    // Set up event listeners to detect navigation vs refresh
    const handleNavigation = () => {
      if (isLoggedIn) {
        sessionStorage.setItem("isNavigating", "true");
      }
    };

    // Listen for navigation events (but not refresh)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function () {
      handleNavigation();
      return originalPushState.apply(history, arguments);
    };

    history.replaceState = function () {
      handleNavigation();
      return originalReplaceState.apply(history, arguments);
    };

    window.addEventListener("popstate", handleNavigation);

    // Cleanup
    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", handleNavigation);
    };
  }, [isLoggedIn]);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials for cookies
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        // Set navigation flag so user stays logged in during normal navigation
        sessionStorage.setItem("isNavigating", "true");
        return { success: true, message: "Login successful" };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.error };
      }
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: "Failed to connect to the server." };
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        credentials: "include", // Include credentials for cookies
      });

      // Always update local state regardless of server response
      setIsLoggedIn(false);
      sessionStorage.removeItem("isNavigating");

      if (!response.ok) {
        console.error("Server logout failed, but local state cleared");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Always clear local state even if server request fails
      setIsLoggedIn(false);
      sessionStorage.removeItem("isNavigating");
    }
  };

  const value = { isLoggedIn, login, logout, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context easily
export const useAuth = () => {
  return useContext(AuthContext);
};
