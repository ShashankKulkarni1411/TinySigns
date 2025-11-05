import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

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
  const socketRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Check session on mount
    checkSession();
  }, []);

  // Initialize Socket.IO when user is authenticated
  useEffect(() => {
    if (user && !socketRef.current) {
      socketRef.current = io(API_URL, {
        withCredentials: true,
        transports: ['websocket', 'polling']
      });

      socketRef.current.on('connect', () => {
        console.log('Socket connected');
      });

      // Listen for real-time updates
      socketRef.current.on('teacher-updated', (data) => {
        if (user.role === 'teacher' && user.email === data.email) {
          // Refresh teacher data
          fetchUserData(user.role, user.email);
        }
      });

      socketRef.current.on('parent-updated', (data) => {
        if (user.role === 'parent' && user.email === data.email) {
          // Refresh parent data
          fetchUserData(user.role, user.email);
        }
      });

      socketRef.current.on('student-created', () => {
        // Refresh if needed
        if (user.role === 'admin' || user.role === 'teacher') {
          fetchUserData(user.role, user.email);
        }
      });

      socketRef.current.on('student-updated', (data) => {
        if (user.role === 'student' && user.email === data.email) {
          // Refresh student data
          fetchUserData(user.role, user.email);
        }
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user]);

  const checkSession = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/check-session`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (role, email) => {
    try {
      const response = await fetch(`${API_URL}/api/${role}/${email}`, {
        credentials: 'include'
      });
      if (response.ok) {
        // Data fetched, can trigger UI update if needed
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const login = async (userData) => {
    try {
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setUser(null);
    }
  };

  const updateUser = (updatedUserData) => {
    setUser(prev => ({ ...prev, ...updatedUserData }));
  };

  const syncUserProgress = async () => {
    if (user && user.email) {
      await checkSession();
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
    socket: socketRef.current,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
