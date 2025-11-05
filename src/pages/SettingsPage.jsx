import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  SettingsIcon,
  UserIcon,
  BellIcon,
  LockIcon,
  PaletteIcon,
  GlobeIcon,
  ShieldIcon,
  SaveIcon
} from 'lucide-react';

export function SettingsPage() {
  const [settings, setSettings] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    notifications: {
      email: true,
      push: true,
      progressUpdates: true,
      weeklyReports: true,
      teacherMessages: true
    },
    preferences: {
      language: 'en',
      theme: 'colorful',
      timezone: 'America/New_York'
    }
  });

  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    // Generate floating emoji
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: ['⚙️', '🔧', '✨', '🎨', '🔔', '🔒', '💫', '⭐', '🌟', '🎯', '🛠️', '📱'][i],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 25 + Math.random() * 15,
      delay: Math.random() * 10,
      scale: 0.4 + Math.random() * 0.4
    }));
    setFloatingElements(elements);
  }, []);

  const handleNotificationChange = (key) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key]
      }
    });
  };

  const handlePreferenceChange = (key, value) => {
    setSettings({
      ...settings,
      preferences: {
        ...settings.preferences,
        [key]: value
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white relative overflow-hidden">
      {/* Floating emoji background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {floatingElements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute text-4xl opacity-15"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              fontSize: `${el.scale * 2.5}rem`
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: el.duration,
              delay: el.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {el.emoji}
          </motion.div>
        ))}
      </div>

      {/* Animated gradient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <Header />

      <main className="flex-grow relative z-10 p-6">
        <div className="container mx-auto max-w-5xl">
          {/* Back Button */}
          <Link
            to="/parent-dashboard"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold px-6 py-3 rounded-full mb-6 transition-all border-2 border-white/30"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Dashboard
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 mb-8 shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-gray-400 to-gray-600 p-4 rounded-2xl shadow-xl">
                <SettingsIcon className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Account Settings ⚙️
                </h1>
                <p className="text-xl text-white/90 font-medium">
                  Manage your account and preferences
                </p>
              </div>
            </div>
          </motion.div>

          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 mb-6 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-3 rounded-2xl">
                <UserIcon className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black">Profile Information 👤</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 text-white/80">Full Name</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-white/80">Email Address</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-white/80">Phone Number</label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 font-medium"
                />
              </div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 mb-6 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-2xl">
                <BellIcon className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black">Notification Preferences 🔔</h2>
            </div>

            <div className="space-y-4">
              {[
                { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                { key: 'push', label: 'Push Notifications', desc: 'Get instant notifications on your device' },
                { key: 'progressUpdates', label: 'Progress Updates', desc: 'Weekly updates on children\'s progress' },
                { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Detailed weekly performance reports' },
                { key: 'teacherMessages', label: 'Teacher Messages', desc: 'Notifications for new messages from teachers' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/20">
                  <div>
                    <div className="font-black mb-1">{item.label}</div>
                    <div className="text-sm text-white/70 font-medium">{item.desc}</div>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(item.key)}
                    className={`relative w-14 h-8 rounded-full transition-all ${
                      settings.notifications[item.key]
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                        : 'bg-white/20'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all ${
                        settings.notifications[item.key] ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 mb-6 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-pink-400 to-purple-500 p-3 rounded-2xl">
                <PaletteIcon className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black">App Preferences 🎨</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 text-white/80">🌍 Language</label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30 font-medium"
                >
                  <option value="en" className="bg-gray-800">English</option>
                  <option value="es" className="bg-gray-800">Español</option>
                  <option value="fr" className="bg-gray-800">Français</option>
                  <option value="hi" className="bg-gray-800">हिन्दी</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-white/80">🎨 Theme</label>
                <select
                  value={settings.preferences.theme}
                  onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30 font-medium"
                >
                  <option value="colorful" className="bg-gray-800">Colorful (Current)</option>
                  <option value="light" className="bg-gray-800">Light</option>
                  <option value="dark" className="bg-gray-800">Dark</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-white/80">🕐 Timezone</label>
                <select
                  value={settings.preferences.timezone}
                  onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30 font-medium"
                >
                  <option value="America/New_York" className="bg-gray-800">Eastern Time (ET)</option>
                  <option value="America/Chicago" className="bg-gray-800">Central Time (CT)</option>
                  <option value="America/Denver" className="bg-gray-800">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles" className="bg-gray-800">Pacific Time (PT)</option>
                  <option value="Asia/Kolkata" className="bg-gray-800">India Standard Time (IST)</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 mb-6 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-red-400 to-pink-500 p-3 rounded-2xl">
                <ShieldIcon className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black">Security 🔒</h2>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-6 py-4 text-left transition-all flex items-center justify-between">
                <div>
                  <div className="font-black mb-1">Change Password</div>
                  <div className="text-sm text-white/70 font-medium">Update your account password</div>
                </div>
                <LockIcon className="w-5 h-5" />
              </button>

              <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-6 py-4 text-left transition-all flex items-center justify-between">
                <div>
                  <div className="font-black mb-1">Two-Factor Authentication</div>
                  <div className="text-sm text-white/70 font-medium">Add extra security to your account</div>
                </div>
                <ShieldIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center"
          >
            <button className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-gray-900 font-black px-12 py-4 rounded-full transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center gap-3">
              <SaveIcon className="w-6 h-6" />
              Save All Changes
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}