// src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role') || 'usuario');

  const login = async (email, password) => {
    const result = await authService.login(email, password);

    if (result.success) {
      setToken(result.token);
      setRole(result.role);
    }

    // 🔁 Devolvemos siempre el objeto completo para que LoginPage maneje el resultado
    return result;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};