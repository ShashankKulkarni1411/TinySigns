import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { 
  ShieldIcon, 
  LockIcon,
  KeyIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  EyeIcon,
  UserXIcon,
  ActivityIcon
} from 'lucide-react';

export function AdminSecurity() {
  const [securityLogs, setSecurityLogs] = useState([
    { id: 1, type: 'login', user: 'admin@example.com', action: 'Successful login', ip: '192.168.1.1', time: '2 mins ago', severity: 'info' },
    { id: 2, type: 'failed_login', user: 'unknown@example.com', action: 'Failed login attempt', ip: '192.168.1.50', time: '15 mins ago', severity: 'warning' },
    { id: 3, type: 'password_change', user: 'user@example.com', action: 'Password changed', ip: '192.168.1.25', time: '1 hour ago', severity: 'info' },
    { id: 4, type: 'suspicious', user: 'test@example.com', action: 'Multiple failed login attempts', ip: '192.168.1.100', time: '2 hours ago', severity: 'danger' },
  ]);

  const [blockedIPs, setBlockedIPs] = useState([
    { ip: '192.168.1.100', reason: 'Multiple failed login attempts', blockedAt: '2024-11-05 10:30 AM' },
    { ip: '10.0.0.50', reason: 'Suspicious activity', blockedAt: '2024-11-04 08:15 PM' },
  ]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'danger': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'danger': return AlertTriangleIcon;
      case 'warning': return AlertTriangleIcon;
      default: return CheckCircleIcon;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
      <Header />
      <main className="flex-grow p-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Link to="/admin" className="inline-flex items-center text-yellow-300 hover:text-yellow-200 mb-4 font-bold">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-2xl">
              <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Security Center 🔒
              </h1>
              <p className="text-xl text-white/80 font-medium">
                Monitor security logs and manage access control
              </p>
            </div>
          </div>

          {/* Security Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl text-center">
              <div className="bg-gradient-to-br from-green-400 to-green-600 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-black mb-1">Secure</div>
              <div className="text-white/70 font-bold text-sm">System Status</div>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl text-center">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <ActivityIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-black mb-1">{securityLogs.length}</div>
              <div className="text-white/70 font-bold text-sm">Recent Events</div>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl text-center">
              <div className="bg-gradient-to-br from-red-400 to-red-600 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <UserXIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-black mb-1">{blockedIPs.length}</div>
              <div className="text-white/70 font-bold text-sm">Blocked IPs</div>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl text-center">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-600 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangleIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-black mb-1">
                {securityLogs.filter(l => l.severity === 'warning' || l.severity === 'danger').length}
              </div>
              <div className="text-white/70 font-bold text-sm">Warnings</div>
            </div>
          </div>

          {/* Security Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button className="bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-3xl p-8 shadow-xl hover:scale-105 transition-transform border-2 border-white/30">
              <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <LockIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-2">Password Policy</h3>
              <p className="text-white/80 font-medium">Configure password requirements</p>
            </button>

            <button className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-3xl p-8 shadow-xl hover:scale-105 transition-transform border-2 border-white/30">
              <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <KeyIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-2">2FA Settings</h3>
              <p className="text-white/80 font-medium">Manage two-factor authentication</p>
            </button>

            <button className="bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-3xl p-8 shadow-xl hover:scale-105 transition-transform border-2 border-white/30">
              <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <ShieldIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-2">Firewall Rules</h3>
              <p className="text-white/80 font-medium">Configure firewall settings</p>
            </button>
          </div>

          {/* Security Logs */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-xl mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black">Security Logs 📋</h2>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full font-bold transition-colors border border-white/30">
                View All Logs
              </button>
            </div>
            <div className="space-y-4">
              {securityLogs.map((log) => {
                const SeverityIcon = getSeverityIcon(log.severity);
                return (
                  <div key={log.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`${getSeverityColor(log.severity)} w-12 h-12 rounded-2xl flex items-center justify-center`}>
                          <SeverityIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-black text-lg mb-1">{log.action}</div>
                          <div className="text-white/70 text-sm font-medium">
                            User: {log.user} • IP: {log.ip}
                          </div>
                          <div className="text-white/60 text-xs font-medium mt-1">{log.time}</div>
                        </div>
                      </div>
                      <span className={`${getSeverityColor(log.severity)} px-3 py-1 rounded-full text-xs font-black`}>
                        {log.severity}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Blocked IPs */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black">Blocked IP Addresses 🚫</h2>
              <button className="bg-white text-red-600 hover:bg-yellow-300 hover:text-gray-800 font-black px-6 py-3 rounded-full transition-all shadow-lg">
                Add IP to Blocklist
              </button>
            </div>
            <div className="space-y-4">
              {blockedIPs.map((blocked, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex items-center justify-between">
                  <div>
                    <div className="font-black text-lg mb-1">{blocked.ip}</div>
                    <div className="text-white/70 text-sm font-medium">
                      Reason: {blocked.reason}
                    </div>
                    <div className="text-white/60 text-xs font-medium mt-1">
                      Blocked at: {blocked.blockedAt}
                    </div>
                  </div>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-black px-6 py-2 rounded-full transition-colors">
                    Unblock
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}