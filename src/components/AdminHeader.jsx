import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, UsersIcon, BarChartIcon, HandMetalIcon, LogOutIcon, ChevronDownIcon, DatabaseIcon, ShieldIcon, SettingsIcon, ActivityIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function AdminHeader() {
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'A';
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <header className="bg-purple-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <HandMetalIcon className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold">TINY SIGNS - Admin</h1>
        </div>

        <div className="flex items-center space-x-4">
          <nav className="flex space-x-2">
            <Link to="/admin-dashboard" className="flex items-center hover:bg-purple-700 px-3 py-2 rounded-lg transition-colors">
              <HomeIcon className="w-5 h-5 mr-1" />
              <span>Dashboard</span>
            </Link>
            <Link to="/admin/users" className="flex items-center hover:bg-purple-700 px-3 py-2 rounded-lg transition-colors">
              <UsersIcon className="w-5 h-5 mr-1" />
              <span>Users</span>
            </Link>
            <Link to="/admin/analytics" className="flex items-center hover:bg-purple-700 px-3 py-2 rounded-lg transition-colors">
              <BarChartIcon className="w-5 h-5 mr-1" />
              <span>Analytics</span>
            </Link>
            <Link to="/admin/content" className="flex items-center hover:bg-purple-700 px-3 py-2 rounded-lg transition-colors">
              <DatabaseIcon className="w-5 h-5 mr-1" />
              <span>Content</span>
            </Link>
            <Link to="/admin/security" className="flex items-center hover:bg-purple-700 px-3 py-2 rounded-lg transition-colors">
              <ShieldIcon className="w-5 h-5 mr-1" />
              <span>Security</span>
            </Link>
            <Link to="/admin/monitoring" className="flex items-center hover:bg-purple-700 px-3 py-2 rounded-lg transition-colors">
              <ActivityIcon className="w-5 h-5 mr-1" />
              <span>Monitor</span>
            </Link>
            <Link to="/admin/settings" className="flex items-center hover:bg-purple-700 px-3 py-2 rounded-lg transition-colors">
              <SettingsIcon className="w-5 h-5 mr-1" />
              <span>Settings</span>
            </Link>
          </nav>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center hover:bg-purple-700 px-3 py-2 rounded-lg transition-colors"
            >
              <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                <span className="text-sm font-bold">{getInitials(user?.name)}</span>
              </div>
              <span className="hidden md:block">Welcome, {user?.name || 'Admin'}</span>
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

