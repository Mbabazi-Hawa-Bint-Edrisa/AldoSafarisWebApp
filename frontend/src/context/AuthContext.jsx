import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Stores user details

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData); // Store user data (e.g., id, name, etc.)
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null); // Clear user data
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
