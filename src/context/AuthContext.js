import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await authService.getProfile();
          setUser(response.data.user);
          setFavorites(response.data.user.favorites || []);
        } catch (error) {
          console.error('Failed to fetch profile', error);
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    const { token, user } = response.data;
    localStorage.setItem('authToken', token);
    setUser(user);
    setFavorites(user.favorites || []);
    return response.data;
  };

  const signup = async (userData) => {
    const response = await authService.signup(userData);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setFavorites([]);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout, loading, favorites, setFavorites }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => useContext(AuthContext);