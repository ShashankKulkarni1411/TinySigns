import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { 
  SettingsIcon, 
  BellIcon, 
  ShieldIcon,
  PaletteIcon,
  GlobeIcon,
  MailIcon,
  ArrowLeftIcon,
  SaveIcon,
  ToggleLeftIcon,
  ToggleRightIcon
} from 'lucide-react';

export function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Learning Platform',
    siteDescription: 'Interactive learning for amazing kids',
    emailNotifications: true,
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    enableAnalytics: true,
    language: 'en',
    theme: 'gradient',
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const ToggleSwitch = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
        enabled ? 'bg-green-500' : 'bg-gray-400'
      }`}
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
      <Header />
      <main className="flex-grow p-6">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <Link to="/admin" className="inline-flex items-center text-yellow-300 hover:text-yellow-200 mb-4 font-bold">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                    System Settings ⚙️
                  </h1>
                  <p className="text-xl text-white/80 font-medium">
                    Configure system settings and preferences
                  </p>
                </div>
                <button 
                  onClick={handleSave}
                  className="bg-white text-orange-600 hover:bg-yellow-300 hover:text-gray-800 font-black px-6 py-3 rounded-full transition-all shadow-lg flex items-center gap-2"
                >
                  <SaveIcon className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {saved && (
            <div className="bg-green-500 text-white px-6 py-4 rounded-3xl mb-8 font-bold text-center shadow-xl border-2 border-white/30">
              ✅ Settings saved successfully!
            </div>
          )}

          {/* General Settings */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-xl mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-blue-400 to-purple-600 w-12 h-12 rounded-2xl flex items-center justify-center mr-4">
                <GlobeIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black">General Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white font-medium focus:outline-none focus:border-yellow-300"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Site Description</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white font-medium focus:outline-none focus:border-yellow-300"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white font-medium focus:outline-none focus:border-yellow-300"
                >
                  <option value="en" className="bg-purple-800">English</option>
                  <option value="hi" className="bg-purple-800">Hindi</option>
                  <option value="mr" className="bg-purple-800">Marathi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-xl mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 w-12 h-12 rounded-2xl flex items-center justify-center mr-4">
                <ShieldIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black">Security Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div>
                  <div className="font-bold mb-1">Allow User Registration</div>
                  <div className="text-sm text-white/70 font-medium">Enable new users to register</div>
                </div>
                <ToggleSwitch 
                  enabled={settings.allowRegistration}
                  onToggle={() => handleToggle('allowRegistration')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div>
                  <div className="font-bold mb-1">Email Verification Required</div>
                  <div className="text-sm text-white/70 font-medium">Require email verification for new accounts</div>
                </div>
                <ToggleSwitch 
                  enabled={settings.requireEmailVerification}
                  onToggle={() => handleToggle('requireEmailVerification')}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div>
                  <div className="font-bold mb-1">Maintenance Mode</div>
                  <div className="text-sm text-white/70 font-medium">Put site in maintenance mode</div>
                </div>
                <ToggleSwitch 
                  enabled={settings.maintenanceMode}
                  onToggle={() => handleToggle('maintenanceMode')}
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-xl mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-600 w-12 h-12 rounded-2xl flex items-center justify-center mr-4">
                <BellIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black">Notification Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div>
                  <div className="font-bold mb-1">Email Notifications</div>
                  <div className="text-sm text-white/70 font-medium">Send email notifications for important events</div>
                </div>
                <ToggleSwitch 
                  enabled={settings.emailNotifications}
                  onToggle={() => handleToggle('emailNotifications')}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Admin Email</label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white font-medium focus:outline-none focus:border-yellow-300"
                />
              </div>
            </div>
          </div>

          {/* Analytics Settings */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-pink-400 to-purple-600 w-12 h-12 rounded-2xl flex items-center justify-center mr-4">
                <SettingsIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black">Analytics & Tracking</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div>
                  <div className="font-bold mb-1">Enable Analytics</div>
                  <div className="text-sm text-white/70 font-medium">Track user activity and system usage</div>
                </div>
                <ToggleSwitch 
                  enabled={settings.enableAnalytics}
                  onToggle={() => handleToggle('enableAnalytics')}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Google Analytics ID</label>
                <input
                  type="text"
                  placeholder="UA-XXXXXXXXX-X"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white font-medium focus:outline-none focus:border-yellow-300"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}