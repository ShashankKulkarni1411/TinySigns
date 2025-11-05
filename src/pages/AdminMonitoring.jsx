import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { 
  ActivityIcon, 
  CpuIcon,
  HardDriveIcon,
  WifiIcon,
  ServerIcon,
  ArrowLeftIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ZapIcon
} from 'lucide-react';

export function AdminMonitoring() {
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 45,
    memory: 62,
    disk: 38,
    network: 28,
  });

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setSystemMetrics({
        cpu: Math.floor(Math.random() * 30) + 35,
        memory: Math.floor(Math.random() * 20) + 55,
        disk: Math.floor(Math.random() * 10) + 35,
        network: Math.floor(Math.random() * 40) + 15,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getStatusColor = (value) => {
    if (value < 50) return 'from-green-400 to-emerald-600';
    if (value < 75) return 'from-yellow-400 to-orange-600';
    return 'from-red-400 to-red-600';
  };

  const getStatusText = (value) => {
    if (value < 50) return 'Good';
    if (value < 75) return 'Warning';
    return 'Critical';
  };

  const serverStatus = [
    { name: 'Web Server', status: 'online', uptime: '99.9%', location: 'US-East' },
    { name: 'Database Server', status: 'online', uptime: '99.8%', location: 'US-West' },
    { name: 'API Server', status: 'online', uptime: '99.7%', location: 'EU-Central' },
    { name: 'Backup Server', status: 'online', uptime: '99.9%', location: 'Asia-Pacific' },
  ];

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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                    System Monitoring 📡
                  </h1>
                  <p className="text-xl text-white/80 font-medium">
                    Real-time system performance and health monitoring
                  </p>
                </div>
                <button 
                  onClick={() => setIsLive(!isLive)}
                  className={`${isLive ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} text-white font-black px-6 py-3 rounded-full transition-all shadow-lg flex items-center gap-2`}
                >
                  <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-white animate-pulse' : 'bg-white/50'}`} />
                  {isLive ? 'Live' : 'Paused'}
                </button>
              </div>
            </div>
          </div>

          {/* System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <CpuIcon className="w-6 h-6 text-white" />
                </div>
                <span className={`bg-gradient-to-r ${getStatusColor(systemMetrics.cpu)} px-3 py-1 rounded-full text-xs font-black`}>
                  {getStatusText(systemMetrics.cpu)}
                </span>
              </div>
              <div className="text-4xl font-black mb-2">{systemMetrics.cpu}%</div>
              <div className="text-white/70 font-bold text-sm mb-4">CPU Usage</div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <div 
                  className={`bg-gradient-to-r ${getStatusColor(systemMetrics.cpu)} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${systemMetrics.cpu}%` }}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <ZapIcon className="w-6 h-6 text-white" />
                </div>
                <span className={`bg-gradient-to-r ${getStatusColor(systemMetrics.memory)} px-3 py-1 rounded-full text-xs font-black`}>
                  {getStatusText(systemMetrics.memory)}
                </span>
              </div>
              <div className="text-4xl font-black mb-2">{systemMetrics.memory}%</div>
              <div className="text-white/70 font-bold text-sm mb-4">Memory Usage</div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <div 
                  className={`bg-gradient-to-r ${getStatusColor(systemMetrics.memory)} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${systemMetrics.memory}%` }}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-green-400 to-green-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <HardDriveIcon className="w-6 h-6 text-white" />
                </div>
                <span className={`bg-gradient-to-r ${getStatusColor(systemMetrics.disk)} px-3 py-1 rounded-full text-xs font-black`}>
                  {getStatusText(systemMetrics.disk)}
                </span>
              </div>
              <div className="text-4xl font-black mb-2">{systemMetrics.disk}%</div>
              <div className="text-white/70 font-bold text-sm mb-4">Disk Usage</div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <div 
                  className={`bg-gradient-to-r ${getStatusColor(systemMetrics.disk)} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${systemMetrics.disk}%` }}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-orange-400 to-red-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <WifiIcon className="w-6 h-6 text-white" />
                </div>
                <span className={`bg-gradient-to-r ${getStatusColor(systemMetrics.network)} px-3 py-1 rounded-full text-xs font-black`}>
                  {getStatusText(systemMetrics.network)}
                </span>
              </div>
              <div className="text-4xl font-black mb-2">{systemMetrics.network}%</div>
              <div className="text-white/70 font-bold text-sm mb-4">Network Usage</div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <div 
                  className={`bg-gradient-to-r ${getStatusColor(systemMetrics.network)} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${systemMetrics.network}%` }}
                />
              </div>
            </div>
          </div>

          {/* Server Status */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-xl mb-8">
            <h2 className="text-3xl font-black mb-6">Server Status 🖥️</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serverStatus.map((server, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-green-400 to-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center">
                        <ServerIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-black text-lg">{server.name}</div>
                        <div className="text-white/60 text-sm font-medium">{server.location}</div>
                      </div>
                    </div>
                    <span className="bg-green-500 px-3 py-1 rounded-full text-xs font-black uppercase">
                      {server.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-white/70 text-sm font-bold">Uptime</div>
                    <div className="flex items-center gap-2">
                      <TrendingUpIcon className="w-4 h-4 text-green-400" />
                      <span className="font-black">{server.uptime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-blue-400 to-purple-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <ActivityIcon className="w-6 h-6 text-white" />
                </div>
                <TrendingUpIcon className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-black mb-1">2.4s</div>
              <div className="text-white/70 font-bold text-sm">Avg Response Time</div>
              <div className="text-green-400 text-xs font-bold mt-2">↓ 15% faster</div>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-green-400 to-emerald-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <ZapIcon className="w-6 h-6 text-white" />
                </div>
                <TrendingUpIcon className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-black mb-1">98.5%</div>
              <div className="text-white/70 font-bold text-sm">Uptime (30 days)</div>
              <div className="text-green-400 text-xs font-bold mt-2">↑ 0.3% better</div>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-orange-400 to-red-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <WifiIcon className="w-6 h-6 text-white" />
                </div>
                <TrendingDownIcon className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-black mb-1">124ms</div>
              <div className="text-white/70 font-bold text-sm">Avg Latency</div>
              <div className="text-green-400 text-xs font-bold mt-2">↓ 8ms lower</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}