import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to verify the token with the backend here and get user info
      setAuth({ token, user: {} }); // Placeholder for user
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ token, user: {} }); // Placeholder for user
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
