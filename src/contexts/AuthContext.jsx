import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('tinySignsUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('tinySignsUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    try {
      // Initialize progress fields if they don't exist
      const userWithProgress = {
        ...userData,
        progress: userData.progress || 0,
        individualProgress: userData.individualProgress || {
          mathematics: 0,
          science: 0,
          isl: 0
        }
      };
      
      // Save user data to localStorage
      localStorage.setItem('tinySignsUser', JSON.stringify(userWithProgress));
      setUser(userWithProgress);
      return userWithProgress;
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('tinySignsUser');
    setUser(null);
  };

  const updateUser = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData };
    localStorage.setItem('tinySignsUser', JSON.stringify(newUserData));
    setUser(newUserData);
  };

  const syncUserProgress = () => {
    // Sync user progress from localStorage
    const savedUser = localStorage.getItem('tinySignsUser');
    if (savedUser && user) {
      try {
        const updatedUser = JSON.parse(savedUser);
        setUser(updatedUser);
      } catch (error) {
        console.error('Error syncing user progress:', error);
      }
    }
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    syncUserProgress,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
