import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [roles, setRoles] = useState(localStorage.getItem("roles") || null);

  const login = (token, roles) => {
    localStorage.setItem("authToken", token); // Save token to localStorage
    setToken(token);
    localStorage.setItem("roles", roles);
    setRoles(roles);
  };

  const logout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    setToken(null);
    localStorage.removeItem("roles");
    setRoles(null);
  };

  return (
    <AuthContext.Provider value={{ token, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};