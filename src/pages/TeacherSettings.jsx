import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeftIcon, SettingsIcon, BellIcon, LockIcon, UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function TeacherSettings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    studentAlerts: true,
    name: user?.name || '',
    email: user?.email || '',
    className: '3rd Grade A'
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <button
            onClick={() => navigate('/teacher-dashboard')}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-semibold"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100 mb-6">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl p-4 mr-4">
                <SettingsIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
                <p className="text-gray-600">Manage your account and preferences</p>
              </div>
            </div>

            {/* Profile Settings */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <UserIcon className="w-6 h-6 text-indigo-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={settings.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Class Name</label>
                  <input
                    type="text"
                    name="className"
                    value={settings.className}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <BellIcon className="w-6 h-6 text-indigo-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-800">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <button
                    onClick={() => handleToggle('emailNotifications')}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      settings.emailNotifications ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                        settings.emailNotifications ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-800">Push Notifications</p>
                    <p className="text-sm text-gray-600">Get instant alerts</p>
                  </div>
                  <button
                    onClick={() => handleToggle('pushNotifications')}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      settings.pushNotifications ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                        settings.pushNotifications ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-800">Weekly Reports</p>
                    <p className="text-sm text-gray-600">Receive weekly class summaries</p>
                  </div>
                  <button
                    onClick={() => handleToggle('weeklyReports')}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      settings.weeklyReports ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                        settings.weeklyReports ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-800">Student Alerts</p>
                    <p className="text-sm text-gray-600">Get alerts about student issues</p>
                  </div>
                  <button
                    onClick={() => handleToggle('studentAlerts')}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      settings.studentAlerts ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                        settings.studentAlerts ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <LockIcon className="w-6 h-6 text-indigo-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">Password</h2>
              </div>
              <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-6 py-3 rounded-xl font-semibold transition-colors">
                Change Password
              </button>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-md"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}