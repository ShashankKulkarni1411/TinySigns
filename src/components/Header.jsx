import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, UserIcon, BarChartIcon, HandMetalIcon, LogOutIcon, ChevronDownIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  };

  // ✅ Adjusted dashboard paths
  const getDashboardPath = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'student': return '/home';
      case 'parent': return '/parent-dashboard';
      case 'teacher': return '/teacher-dashboard';
      case 'admin': return '/admin-dashboard';
      default: return '/';
    }
  };

  return (
    <header className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <HandMetalIcon className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold">TINY SIGNS</h1>
        </div>

        <div className="flex items-center space-x-4">
          <nav className="flex space-x-4">
            {/* ✅ Dynamic Home Link */}
            <Link 
              to={isAuthenticated ? getDashboardPath() : '/'} 
              className="flex items-center hover:bg-indigo-700 px-3 py-2 rounded-lg transition-colors"
            >
              <HomeIcon className="w-5 h-5 mr-1" />
              <span>Home</span>
            </Link>

          

            <Link to="/Dashboard" className="flex items-center hover:bg-indigo-700 px-3 py-2 rounded-lg transition-colors">
              <BarChartIcon className="w-5 h-5 mr-1" />
              <span>Progress</span>
            </Link>
          </nav>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center hover:bg-indigo-700 px-3 py-2 rounded-lg transition-colors"
              >
                <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <span className="text-sm font-bold">{getInitials(user.name)}</span>
                </div>
                <span className="hidden md:block">Welcome, {user.name}</span>
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to={getDashboardPath()}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                  >
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center hover:bg-indigo-700 px-3 py-2 rounded-lg transition-colors">
              <UserIcon className="w-5 h-5 mr-1" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
