import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('auth_token');
    if (stored) {
      setToken(stored);
      axios.defaults.headers.common.Authorization = `Bearer ${stored}`;
    }
    setInitializing(false);
  }, []);

  const login = useCallback(
    (newToken) => {
      setToken(newToken);
      localStorage.setItem('auth_token', newToken);
      axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('auth_token');
    delete axios.defaults.headers.common.Authorization;
  }, []);

  const value = {
    token,
    isAuthenticated: !!token,
    initializing,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
