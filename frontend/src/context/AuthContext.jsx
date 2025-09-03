import React, { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext(null);

// Create a provider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
    // In a real app, this is where you'd store a token (e.g., in localStorage)
    // localStorage.setItem('token', 'your-auth-token');
  };

  const logout = () => {
    setIsLoggedIn(false);
    // In a real app, this is where you'd remove the token
    // localStorage.removeItem('token');
  };

  // The value provided to children of this provider
  const value = { isLoggedIn, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context easily
export const useAuth = () => {
  return useContext(AuthContext);
};
