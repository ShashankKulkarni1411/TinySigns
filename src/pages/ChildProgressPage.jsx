import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  TrophyIcon,
  BookOpenIcon,
  ClockIcon,
  TargetIcon,
  TrendingUpIcon,
  CalendarIcon,
  AwardIcon
} from 'lucide-react';

export function ChildProgressPage() {
  const { childId } = useParams(); // childId is the student email (URL encoded)
  const { user } = useAuth();
  const [childData, setChildData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    // Generate floating emoji
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: ['⭐', '🏆', '📚', '✨', '🎯', '💫', '🌟', '🎓', '👏', '🎉', '💪', '🚀'][i],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 25 + Math.random() * 15,
      delay: Math.random() * 10,
      scale: 0.4 + Math.random() * 0.4
    }));
    setFloatingElements(elements);

    // Fetch real child data from database
    if (childId) {
      loadChildData();
    }
  }, [childId]);

  const loadChildData = async () => {
    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const studentEmail = decodeURIComponent(childId); // Decode URL-encoded email
      
      // Fetch student data
      const response = await fetch(`${API_URL}/api/student/${encodeURIComponent(studentEmail)}`, {
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Failed to fetch student data');
      
      const studentData = await response.json();
      
      // Fetch user info for name
      const userResponse = await fetch(`${API_URL}/api/users/${encodeURIComponent(studentEmail)}`, {
        credentials: 'include'
      });
      const userData = userResponse.ok ? await userResponse.json() : null;
      
      // Calculate progress from student data
      const totalLessons = 12; // 4 per module (ISL, Math, Science)
      const completedLessons = studentData.numberOfLessonsCompleted || 0;
      
      // Calculate per-module progress (distribute evenly)
      const lessonsPerModule = completedLessons / 3;
      const moduleProgress = {
        isl: {
          completed: Math.min(Math.floor(lessonsPerModule), 4),
          total: 4,
          score: studentData.averageScore || 0,
          timeSpent: Math.floor((studentData.timeSpent || 0) / 3)
        },
        mathematics: {
          completed: Math.min(Math.floor(lessonsPerModule), 4),
          total: 4,
          score: studentData.averageScore || 0,
          timeSpent: Math.floor((studentData.timeSpent || 0) / 3)
        },
        science: {
          completed: Math.min(Math.floor(lessonsPerModule), 4),
          total: 4,
          score: studentData.averageScore || 0,
          timeSpent: Math.floor((studentData.timeSpent || 0) / 3)
        }
      };
      
      // Format student data
      const name = userData?.username || studentEmail.split('@')[0] || 'Student';
      const avatar = name.charAt(0).toUpperCase();
      const createdAt = studentData.createdAt ? new Date(studentData.createdAt) : new Date();
      const joinDate = createdAt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      
      setChildData({
        id: studentEmail,
        name: name,
        email: studentEmail,
        avatar: avatar,
        joinDate: joinDate,
        totalHours: Math.floor((studentData.timeSpent || 0) / 60),
        progress: moduleProgress,
        recentActivity: [
          { date: 'Recently', activity: `Completed ${completedLessons} lessons`, score: studentData.averageScore || 0 }
        ],
        achievements: studentData.totalExams > 0 ? [
          { title: 'First Exam', icon: '🎯', date: joinDate },
          ...(studentData.bestScore >= 80 ? [{ title: 'High Achiever', icon: '💯', date: joinDate }] : []),
          ...(completedLessons >= 5 ? [{ title: 'Dedicated Learner', icon: '🔥', date: joinDate }] : [])
        ] : []
      });
    } catch (error) {
      console.error('Error loading child data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !childData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-2xl">Loading progress...</div>
        </div>
      </div>
    );
  }

  const getProgressColor = (completed, total) => {
    const percentage = (completed / total) * 100;
    if (percentage >= 80) return 'from-green-400 to-emerald-500';
    if (percentage >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const getProgressWidth = (completed, total) => {
    return (completed / total) * 100;
  };

  const overallProgress = Math.round(
    (Object.values(childData.progress).reduce((acc, mod) => acc + mod.completed, 0) /
      Object.values(childData.progress).reduce((acc, mod) => acc + mod.total, 0)) * 100
  );

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
        <div className="container mx-auto max-w-7xl">
          {/* Back Button */}
          <Link
            to="/parent-dashboard"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold px-6 py-3 rounded-full mb-6 transition-all border-2 border-white/30"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Dashboard
          </Link>

          {/* Child Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 mb-8 shadow-2xl"
          >
            <div className="flex items-center gap-6 flex-wrap">
              <div className="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full w-24 h-24 flex items-center justify-center shadow-2xl border-4 border-white/30">
                <span className="text-white font-black text-4xl">{childData.avatar}</span>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  {childData.name}'s Progress 🌟
                </h1>
                <p className="text-xl text-white/90 font-medium mb-2">
                  Student • {childData.email}
                </p>
                <p className="text-white/70 font-medium">📅 Member since {childData.joinDate}</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl px-8 py-6 text-center shadow-xl">
                <div className="text-5xl font-black text-gray-900">{overallProgress}%</div>
                <div className="text-sm font-bold text-gray-900 mt-1">Overall</div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
          >
            {[
              { icon: BookOpenIcon, label: 'Total Lessons', value: Object.values(childData.progress).reduce((acc, mod) => acc + mod.completed, 0), color: 'from-blue-400 to-indigo-500', emoji: '📚' },
              { icon: ClockIcon, label: 'Hours Spent', value: `${childData.totalHours}h`, color: 'from-purple-400 to-pink-500', emoji: '⏱️' },
              { icon: TrophyIcon, label: 'Achievements', value: childData.achievements.length, color: 'from-yellow-400 to-orange-500', emoji: '🏆' },
              { icon: TargetIcon, label: 'Avg Score', value: `${Math.round(Object.values(childData.progress).reduce((acc, mod) => acc + mod.score, 0) / 3)}%`, color: 'from-green-400 to-emerald-500', emoji: '🎯' }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-3xl opacity-50">{stat.emoji}</div>
                  <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-2xl w-fit mb-4 shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-white/80 font-bold mb-1">{stat.label}</p>
                  <p className="text-3xl font-black">{stat.value}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Module Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 mb-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-indigo-400 to-purple-500 p-3 rounded-2xl">
                <TrendingUpIcon className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black">Module Progress 📊</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(childData.progress).map(([module, data]) => {
                const moduleEmoji = module === 'isl' ? '🤟' : module === 'mathematics' ? '➕' : '🔬';
                const moduleName = module === 'isl' ? 'ISL' : module.charAt(0).toUpperCase() + module.slice(1);
                return (
                  <div key={module} className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border-2 border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{moduleEmoji}</span>
                        <h3 className="text-xl font-black">{moduleName}</h3>
                      </div>
                      <div className="bg-white/20 rounded-full px-4 py-2">
                        <span className="font-black">{data.completed}/{data.total}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                        <div
                          className={`h-4 rounded-full bg-gradient-to-r ${getProgressColor(data.completed, data.total)} shadow-lg`}
                          style={{ width: `${getProgressWidth(data.completed, data.total)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-xl p-3">
                        <div className="text-sm text-white/70 font-bold mb-1">Score</div>
                        <div className="text-2xl font-black">{data.score}% ⭐</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3">
                        <div className="text-sm text-white/70 font-bold mb-1">Time</div>
                        <div className="text-2xl font-black">{data.timeSpent}h ⏱️</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-400 to-cyan-500 p-3 rounded-2xl">
                  <CalendarIcon className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black">Recent Activity 📝</h2>
              </div>

              <div className="space-y-4">
                {childData.recentActivity.map((activity, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold">{activity.activity}</div>
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-black px-3 py-1 rounded-full text-sm">
                        {activity.score}%
                      </div>
                    </div>
                    <div className="text-sm text-white/70 font-medium">🕐 {activity.date}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-2xl">
                  <AwardIcon className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black">Achievements 🏆</h2>
              </div>

              <div className="space-y-4">
                {childData.achievements.map((achievement, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-4">
                    <div className="text-5xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-black text-lg mb-1">{achievement.title}</div>
                      <div className="text-sm text-white/70 font-medium">📅 {achievement.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}