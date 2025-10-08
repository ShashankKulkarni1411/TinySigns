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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow p-6">
        <div className="container mx-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-red-600 to-purple-600 rounded-lg p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome, {user?.name || 'Admin'}
                </h1>
                <p className="text-red-100">
                  Monitor system performance and manage the platform
                </p>
              </div>
              <div className="bg-white/20 rounded-full p-4">
                <ShieldIcon className="w-12 h-12" />
              </div>
            </div>
          </div>

          {/* System Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-lg p-3">
                  <UsersIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-lg p-3">
                  <ActivityIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold">{systemStats.activeUsers.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-lg p-3">
                  <BookOpenIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Lessons</p>
                  <p className="text-2xl font-bold">{systemStats.totalLessons}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <div className="bg-yellow-100 rounded-lg p-3">
                  <BarChartIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">System Health</p>
                  <p className="text-2xl font-bold">{systemStats.systemHealth}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className={`bg-white rounded-full p-2 mr-4`}>
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">System Alerts</h2>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {systemAlerts.map((alert) => {
                  const AlertIcon = getAlertIcon(alert.type);
                  return (
                    <div key={alert.id} className={`border rounded-lg p-4 ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start">
                        <AlertIcon className="w-5 h-5 mt-0.5 mr-3 text-gray-600" />
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-800">{alert.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Management Tools */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Management Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <UsersIcon className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">User Management</h3>
                <p className="text-gray-600 text-sm mb-4">Manage users, roles, and permissions</p>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Manage Users
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <BookOpenIcon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Content Management</h3>
                <p className="text-gray-600 text-sm mb-4">Manage lessons, courses, and materials</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Manage Content
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <BarChartIcon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Analytics</h3>
                <p className="text-gray-600 text-sm mb-4">View detailed analytics and reports</p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                  View Analytics
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <SettingsIcon className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">System Settings</h3>
                <p className="text-gray-600 text-sm mb-4">Configure system settings and preferences</p>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Settings
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <DatabaseIcon className="w-6 h-6 text-indigo-600 mr-3" />
                <h3 className="text-lg font-semibold">Database</h3>
              </div>
              <p className="text-gray-600 mb-4">Manage database backups and maintenance</p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                Database Tools
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <ShieldIcon className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold">Security</h3>
              </div>
              <p className="text-gray-600 mb-4">Monitor security logs and manage access</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                Security Center
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <ActivityIcon className="w-6 h-6 text-yellow-600 mr-3" />
                <h3 className="text-lg font-semibold">Monitoring</h3>
              </div>
              <p className="text-gray-600 mb-4">Monitor system performance and health</p>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors">
                System Monitor
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
