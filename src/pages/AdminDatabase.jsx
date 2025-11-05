import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { 
  DatabaseIcon, 
  DownloadIcon, 
  UploadIcon,
  RefreshCwIcon,
  TrashIcon,
  ArrowLeftIcon,
  HardDriveIcon,
  CheckCircleIcon,
  AlertTriangleIcon
} from 'lucide-react';

export function AdminDatabase() {
  const [backups, setBackups] = useState([
    { id: 1, name: 'backup_2024_11_05.sql', size: '45.2 MB', date: '2024-11-05 03:00 AM', status: 'completed' },
    { id: 2, name: 'backup_2024_11_04.sql', size: '44.8 MB', date: '2024-11-04 03:00 AM', status: 'completed' },
    { id: 3, name: 'backup_2024_11_03.sql', size: '44.5 MB', date: '2024-11-03 03:00 AM', status: 'completed' },
  ]);

  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleCreateBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      const newBackup = {
        id: backups.length + 1,
        name: `backup_manual_${Date.now()}.sql`,
        size: '45.5 MB',
        date: new Date().toLocaleString(),
        status: 'completed'
      };
      setBackups([newBackup, ...backups]);
      setIsBackingUp(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
      <Header />
      <main className="flex-grow p-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Link to="/admin-dashboard" className="inline-flex items-center text-yellow-300 hover:text-yellow-200 mb-4 font-bold">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-2xl">
              <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Database Management 🗄️
              </h1>
              <p className="text-xl text-white/80 font-medium">
                Manage database backups and maintenance
              </p>
            </div>
          </div>

          {/* Database Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <HardDriveIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-4xl font-black mb-1">256 MB</div>
              <div className="text-white/70 font-bold text-sm">Database Size</div>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-green-400 to-green-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-4xl font-black mb-1">{backups.length}</div>
              <div className="text-white/70 font-bold text-sm">Total Backups</div>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <DatabaseIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-4xl font-black mb-1">98%</div>
              <div className="text-white/70 font-bold text-sm">Database Health</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button 
              onClick={handleCreateBackup}
              disabled={isBackingUp}
              className="bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-3xl p-8 shadow-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/30"
            >
              <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <DownloadIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-2">
                {isBackingUp ? 'Creating Backup...' : 'Create Backup'}
              </h3>
              <p className="text-white/80 font-medium">
                Create a new database backup
              </p>
            </button>

            <button className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-3xl p-8 shadow-xl hover:scale-105 transition-transform border-2 border-white/30">
              <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <UploadIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-2">Restore Backup</h3>
              <p className="text-white/80 font-medium">
                Restore from existing backup
              </p>
            </button>

            <button className="bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-3xl p-8 shadow-xl hover:scale-105 transition-transform border-2 border-white/30">
              <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <RefreshCwIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-2">Optimize</h3>
              <p className="text-white/80 font-medium">
                Optimize database performance
              </p>
            </button>
          </div>

          {/* Backup History */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-xl">
            <h2 className="text-3xl font-black mb-6">Backup History 📋</h2>
            <div className="space-y-4">
              {backups.map((backup) => (
                <div key={backup.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-blue-400 to-purple-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                      <DatabaseIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-black text-lg">{backup.name}</div>
                      <div className="text-sm text-white/70 font-medium">
                        {backup.size} • {backup.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-green-500 px-3 py-1 rounded-full text-xs font-black">
                      {backup.status}
                    </span>
                    <button className="bg-blue-500 hover:bg-blue-600 p-3 rounded-xl transition-colors">
                      <DownloadIcon className="w-5 h-5" />
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 p-3 rounded-xl transition-colors">
                      <UploadIcon className="w-5 h-5" />
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 p-3 rounded-xl transition-colors">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Tasks */}
          <div className="mt-8 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-xl">
            <h2 className="text-3xl font-black mb-6">Maintenance Tasks 🔧</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="font-black text-xl mb-2">Clean Temporary Data</h3>
                <p className="text-white/70 text-sm mb-4 font-medium">
                  Remove temporary files and cached data
                </p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-black px-6 py-2 rounded-full transition-colors">
                  Run Cleanup
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="font-black text-xl mb-2">Analyze Tables</h3>
                <p className="text-white/70 text-sm mb-4 font-medium">
                  Analyze and optimize database tables
                </p>
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-black px-6 py-2 rounded-full transition-colors">
                  Run Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}