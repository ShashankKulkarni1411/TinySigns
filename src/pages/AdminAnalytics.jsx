import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChartIcon, 
  TrendingUpIcon, 
  UsersIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  DownloadIcon,
  CalendarIcon,
  ActivityIcon
} from 'lucide-react';

export function AdminAnalytics() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('7days');
  const [adminData, setAdminData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState({
    userGrowth: [],
    modulePopularity: [],
    engagementMetrics: {
      avgSessionTime: '0 mins',
      completionRate: '0%',
      activeUsers: 0,
      totalLessons: 0
    }
  });

  useEffect(() => {
    if (user && user.email) {
      loadAdminData();
    }
  }, [user]);

  const loadAdminData = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/admin/${user.email}`);
      if (!response.ok) throw new Error('Failed to fetch admin data');
      const data = await response.json();
      setAdminData(data);

      // Process analytics data
      const analytics = data.analytics || {};
      const modulePop = analytics.modulePopularity || {};
      
      setAnalyticsData({
        userGrowth: [
          { period: 'Week 1', users: Math.floor((analytics.userGrowth || 0) * 0.3) },
          { period: 'Week 2', users: Math.floor((analytics.userGrowth || 0) * 0.5) },
          { period: 'Week 3', users: Math.floor((analytics.userGrowth || 0) * 0.75) },
          { period: 'Week 4', users: analytics.userGrowth || 0 },
        ],
        modulePopularity: [
          { name: 'Indian Sign Language', completions: modulePop.isl || 0, color: 'from-pink-500 to-red-500' },
          { name: 'Mathematics', completions: modulePop.mathematics || 0, color: 'from-blue-500 to-purple-500' },
          { name: 'Science', completions: modulePop.science || 0, color: 'from-green-500 to-teal-500' },
        ],
        engagementMetrics: {
          avgSessionTime: `${analytics.avgSessionTime || 0} mins`,
          completionRate: `${analytics.completionRate || 0}%`,
          activeUsers: analytics.activeUsers || 0,
          totalLessons: analytics.lessonsCompleted || 0
        }
      });
    } catch (error) {
      console.error('Error loading admin analytics:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
      <Header />
      <main className="flex-grow p-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/admin-dashboard" className="inline-flex items-center text-yellow-300 hover:text-yellow-200 mb-4 font-bold">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                    Analytics Dashboard 📊
                  </h1>
                  <p className="text-xl text-white/80 font-medium">
                    View detailed analytics and performance reports
                  </p>
                </div>
                <div className="flex gap-4">
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-2xl px-6 py-3 font-bold focus:outline-none focus:border-yellow-300"
                  >
                    <option value="7days" className="bg-purple-800">Last 7 Days</option>
                    <option value="30days" className="bg-purple-800">Last 30 Days</option>
                    <option value="90days" className="bg-purple-800">Last 90 Days</option>
                    <option value="1year" className="bg-purple-800">Last Year</option>
                  </select>
                  <button className="bg-white text-purple-600 hover:bg-yellow-300 hover:text-gray-800 font-black px-6 py-3 rounded-full transition-all shadow-lg flex items-center gap-2">
                    <DownloadIcon className="w-5 h-5" />
                    Export Report
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <UsersIcon className="w-6 h-6 text-white" />
                </div>
                <TrendingUpIcon className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-4xl font-black mb-1">{analyticsData.engagementMetrics.activeUsers}</div>
              <div className="text-white/70 font-bold text-sm">Active Users</div>
              <div className="text-green-400 text-xs font-bold mt-2">↑ 12% from last week</div>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <BookOpenIcon className="w-6 h-6 text-white" />
                </div>
                <TrendingUpIcon className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-4xl font-black mb-1">{analyticsData.engagementMetrics.totalLessons}</div>
              <div className="text-white/70 font-bold text-sm">Lessons Completed</div>
              <div className="text-green-400 text-xs font-bold mt-2">↑ 8% from last week</div>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-green-400 to-green-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <ActivityIcon className="w-6 h-6 text-white" />
                </div>
                <TrendingUpIcon className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-4xl font-black mb-1">{analyticsData.engagementMetrics.avgSessionTime}</div>
              <div className="text-white/70 font-bold text-sm">Avg Session Time</div>
              <div className="text-green-400 text-xs font-bold mt-2">↑ 5% from last week</div>
            </div>

            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <BarChartIcon className="w-6 h-6 text-white" />
                </div>
                <TrendingUpIcon className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-4xl font-black mb-1">{analyticsData.engagementMetrics.completionRate}</div>
              <div className="text-white/70 font-bold text-sm">Completion Rate</div>
              <div className="text-green-400 text-xs font-bold mt-2">↑ 3% from last week</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* User Growth Chart */}
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-black mb-6">User Growth 📈</h2>
              <div className="space-y-4">
                {analyticsData.userGrowth.map((data, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">{data.period}</span>
                      <span className="font-black">{data.users} users</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-purple-600 h-full rounded-full transition-all"
                        style={{ width: `${(data.users / 500) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Module Popularity */}
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-black mb-6">Module Popularity 🎯</h2>
              <div className="space-y-6">
                {analyticsData.modulePopularity.map((module, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">{module.name}</span>
                      <span className="font-black">{module.completions} completions</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r ${module.color} h-full rounded-full transition-all`}
                        style={{ width: `${(module.completions / 500) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-xl">
            <h2 className="text-3xl font-black mb-6">Detailed Statistics 📋</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-sm text-white/70 font-bold mb-2">Peak Usage Hours</div>
                <div className="text-3xl font-black mb-1">2 PM - 5 PM</div>
                <div className="text-xs text-white/60 font-medium">Most active learning time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-sm text-white/70 font-bold mb-2">Most Popular Lesson</div>
                <div className="text-3xl font-black mb-1">ISL Alphabet</div>
                <div className="text-xs text-white/60 font-medium">1,234 completions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-sm text-white/70 font-bold mb-2">Average Quiz Score</div>
                <div className="text-3xl font-black mb-1">85%</div>
                <div className="text-xs text-white/60 font-medium">Across all modules</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}