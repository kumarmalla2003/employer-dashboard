// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const AuthContext = createContext(null);

// Create a provider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for the authentication cookie on initial load
  useEffect(() => {
    const checkLoginStatus = async () => {
      // In a real app, you would have a /check-auth endpoint
      // For now, we'll assume a successful login sets the cookie,
      // and a simple page reload with the cookie means the user is still authenticated.
      // This is a simplified check for the demo.
      try {
        const response = await fetch("http://localhost:8000/api/check-auth", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Failed to check auth status:", error);
        setIsLoggedIn(false);
      }
    };
    // Let's add an empty dependency array to run only once.
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
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
      });
      if (response.ok) {
        setIsLoggedIn(false);
        // Optional: Redirect to landing page after logout
        // navigate('/');
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = { isLoggedIn, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context easily
export const useAuth = () => {
  return useContext(AuthContext);
};
