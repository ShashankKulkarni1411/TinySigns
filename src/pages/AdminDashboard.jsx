import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { 
  UsersIcon, 
  BookOpenIcon, 
  BarChartIcon, 
  ClockIcon,
  TrendingUpIcon,
  CalendarIcon,
  SettingsIcon,
  ShieldIcon,
  DatabaseIcon,
  ActivityIcon,
  AlertTriangleIcon,
  CheckCircleIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminDashboard() {
  const { user } = useAuth();
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalLessons: 0,
    systemHealth: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);

  useEffect(() => {
    // Mock system stats
    setSystemStats({
      totalUsers: 1247,
      activeUsers: 892,
      totalLessons: 156,
      systemHealth: 98,
    });

    // Mock recent activity
    const mockActivity = [
      {
        id: 1,
        type: 'user_registration',
        message: 'New student registered: Emma Johnson',
        timestamp: '2 minutes ago',
        icon: UsersIcon,
        color: 'text-blue-600'
      },
      {
        id: 2,
        type: 'lesson_completion',
        message: 'Alex completed Mathematics Lesson 3',
        timestamp: '5 minutes ago',
        icon: BookOpenIcon,
        color: 'text-green-600'
      },
      {
        id: 3,
        type: 'system_update',
        message: 'System backup completed successfully',
        timestamp: '1 hour ago',
        icon: DatabaseIcon,
        color: 'text-purple-600'
      },
      {
        id: 4,
        type: 'alert',
        message: 'High server load detected',
        timestamp: '2 hours ago',
        icon: AlertTriangleIcon,
        color: 'text-yellow-600'
      }
    ];

    setRecentActivity(mockActivity);

    // Mock system alerts
    const mockAlerts = [
      {
        id: 1,
        type: 'warning',
        title: 'Server Load High',
        message: 'Server load is at 85%. Consider scaling resources.',
        timestamp: '2 hours ago'
      },
      {
        id: 2,
        type: 'info',
        title: 'Backup Completed',
        message: 'Daily backup completed successfully at 3:00 AM.',
        timestamp: '6 hours ago'
      }
    ];

    setSystemAlerts(mockAlerts);
  }, []);

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'error': return 'border-red-200 bg-red-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return AlertTriangleIcon;
      case 'error': return AlertTriangleIcon;
      case 'info': return CheckCircleIcon;
      default: return CheckCircleIcon;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
      <Header />
      <main className="flex-grow p-6">
        <div className="container mx-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 mb-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Welcome, {user?.name || 'Admin'} 👋
                </h1>
                <p className="text-xl text-white/80 font-medium">
                  Monitor system performance and manage the platform
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full p-6 shadow-xl">
                <ShieldIcon className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          {/* System Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-4 shadow-lg">
                  <UsersIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-white/70 font-bold">Total Users</p>
                  <p className="text-4xl font-black">{systemStats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-4 shadow-lg">
                  <ActivityIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-white/70 font-bold">Active Users</p>
                  <p className="text-4xl font-black">{systemStats.activeUsers.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-4 shadow-lg">
                  <BookOpenIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-white/70 font-bold">Total Lessons</p>
                  <p className="text-4xl font-black">{systemStats.totalLessons}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-4 shadow-lg">
                  <BarChartIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-white/70 font-bold">System Health</p>
                  <p className="text-4xl font-black">{systemStats.systemHealth}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black">Recent Activity 📊</h2>
                <Link to="/admin/activity" className="text-yellow-300 hover:text-yellow-200 text-sm font-bold transition-colors">
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                    <div className="bg-white/20 rounded-full p-3 mr-4">
                      <activity.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white">{activity.message}</p>
                      <p className="text-xs text-white/60 font-medium">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black">System Alerts ⚠️</h2>
                <Link to="/admin/alerts" className="text-yellow-300 hover:text-yellow-200 text-sm font-bold transition-colors">
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {systemAlerts.map((alert) => {
                  const AlertIcon = getAlertIcon(alert.type);
                  return (
                    <div key={alert.id} className="border-2 border-white/30 rounded-2xl p-4 bg-white/10 backdrop-blur-md">
                      <div className="flex items-start">
                        <AlertIcon className="w-6 h-6 mt-0.5 mr-3 text-yellow-300" />
                        <div className="flex-1">
                          <h3 className="text-sm font-black text-white">{alert.title}</h3>
                          <p className="text-sm text-white/80 mt-1 font-medium">{alert.message}</p>
                          <p className="text-xs text-white/60 mt-2 font-medium">{alert.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Management Tools */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-4xl font-black mb-8 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
              Management Tools 🛠️
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border-2 border-white/20 hover:scale-105 transition-transform">
                <div className="bg-gradient-to-br from-blue-400 to-indigo-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <UsersIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-black mb-2">User Management</h3>
                <p className="text-white/70 text-sm mb-4 font-medium">Manage users, roles, and permissions</p>
                <Link to="/admin/users">
                  <button className="bg-white text-indigo-600 hover:bg-yellow-300 hover:text-gray-800 font-black px-6 py-3 rounded-full transition-all shadow-lg">
                    Manage Users
                  </button>
                </Link>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border-2 border-white/20 hover:scale-105 transition-transform">
                <div className="bg-gradient-to-br from-green-400 to-emerald-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <BookOpenIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-black mb-2">Content Management</h3>
                <p className="text-white/70 text-sm mb-4 font-medium">Manage lessons, courses, and materials</p>
                <Link to="/admin/content">
                  <button className="bg-white text-green-600 hover:bg-yellow-300 hover:text-gray-800 font-black px-6 py-3 rounded-full transition-all shadow-lg">
                    Manage Content
                  </button>
                </Link>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border-2 border-white/20 hover:scale-105 transition-transform">
                <div className="bg-gradient-to-br from-purple-400 to-pink-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <BarChartIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-black mb-2">Analytics</h3>
                <p className="text-white/70 text-sm mb-4 font-medium">View detailed analytics and reports</p>
                <Link to="/admin/analytics">
                  <button className="bg-white text-purple-600 hover:bg-yellow-300 hover:text-gray-800 font-black px-6 py-3 rounded-full transition-all shadow-lg">
                    View Analytics
                  </button>
                </Link>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border-2 border-white/20 hover:scale-105 transition-transform">
                <div className="bg-gradient-to-br from-orange-400 to-red-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <SettingsIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-black mb-2">System Settings</h3>
                <p className="text-white/70 text-sm mb-4 font-medium">Configure system settings and preferences</p>
                <Link to="/admin/settings">
                  <button className="bg-white text-orange-600 hover:bg-yellow-300 hover:text-gray-800 font-black px-6 py-3 rounded-full transition-all shadow-lg">
                    Settings
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-xl hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-indigo-400 to-blue-600 rounded-2xl p-3 mr-4 shadow-lg">
                  <DatabaseIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black">Database</h3>
              </div>
              <p className="text-white/80 mb-6 font-medium">Manage database backups and maintenance</p>
              <Link to="/admin/database">
                <button className="bg-white text-indigo-600 hover:bg-yellow-300 hover:text-gray-800 font-black px-6 py-3 rounded-full transition-all shadow-lg w-full">
                  Database Tools
                </button>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-xl hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl p-3 mr-4 shadow-lg">
                  <ShieldIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black">Security</h3>
              </div>
              <p className="text-white/80 mb-6 font-medium">Monitor security logs and manage access</p>
              <Link to="/admin/security">
                <button className="bg-white text-green-600 hover:bg-yellow-300 hover:text-gray-800 font-black px-6 py-3 rounded-full transition-all shadow-lg w-full">
                  Security Center
                </button>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-xl hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-600 rounded-2xl p-3 mr-4 shadow-lg">
                  <ActivityIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black">Monitoring</h3>
              </div>
              <p className="text-white/80 mb-6 font-medium">Monitor system performance and health</p>
              <Link to="/admin/monitoring">
                <button className="bg-white text-yellow-600 hover:bg-yellow-300 hover:text-gray-800 font-black px-6 py-3 rounded-full transition-all shadow-lg w-full">
                  System Monitor
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}