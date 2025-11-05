import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, UsersIcon, CalendarIcon, MessageCircleIcon, HandMetalIcon, LogOutIcon, ChevronDownIcon, SettingsIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function ParentHeader() {
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'P';
  };

  if (!isAuthenticated || user?.role !== 'parent') {
    return null;
  }

  return (
    <header className="bg-pink-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <HandMetalIcon className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold">TINY SIGNS - Parent</h1>
        </div>

        <div className="flex items-center space-x-4">
          <nav className="flex space-x-2">
            <Link to="/parent-dashboard" className="flex items-center hover:bg-pink-700 px-3 py-2 rounded-lg transition-colors">
              <HomeIcon className="w-5 h-5 mr-1" />
              <span>Dashboard</span>
            </Link>
            <Link to="/add-child" className="flex items-center hover:bg-pink-700 px-3 py-2 rounded-lg transition-colors">
              <UsersIcon className="w-5 h-5 mr-1" />
              <span>Add Child</span>
            </Link>
            <Link to="/schedule" className="flex items-center hover:bg-pink-700 px-3 py-2 rounded-lg transition-colors">
              <CalendarIcon className="w-5 h-5 mr-1" />
              <span>Schedule</span>
            </Link>
            <Link to="/messages" className="flex items-center hover:bg-pink-700 px-3 py-2 rounded-lg transition-colors">
              <MessageCircleIcon className="w-5 h-5 mr-1" />
              <span>Messages</span>
            </Link>
            <Link to="/settings" className="flex items-center hover:bg-pink-700 px-3 py-2 rounded-lg transition-colors">
              <SettingsIcon className="w-5 h-5 mr-1" />
              <span>Settings</span>
            </Link>
          </nav>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center hover:bg-pink-700 px-3 py-2 rounded-lg transition-colors"
            >
              <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                <span className="text-sm font-bold">{getInitials(user?.name)}</span>
              </div>
              <span className="hidden md:block">Welcome, {user?.name || 'Parent'}</span>
              <ChevronDownIcon className="w-4 h-4 ml-1" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
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
        </div>
      </div>
    </header>
  );
}

