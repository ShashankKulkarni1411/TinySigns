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

export function StudentProgressPage() {
  const { id } = useParams();
  const { user } = useAuth();
  
  // Use email from params or current user
  const studentEmail = id ? decodeURIComponent(id) : (user?.email);
  const [progressData, setProgressData] = useState(null);
  const [subjectProgress, setSubjectProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

    // Load progress data
    const emailToUse = id ? decodeURIComponent(id) : (user?.email);
    if (emailToUse) {
      loadProgressData(emailToUse);
    }
  }, [user, id]);

  const loadProgressData = async (emailToUse) => {
    try {
      setLoading(true);
      setError(null);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      if (!emailToUse) {
        emailToUse = studentEmail || user?.email;
      }
      
      if (!emailToUse) {
        throw new Error('Student email not found');
      }
      
      // Fetch student progress
      const progressResponse = await fetch(`${API_URL}/api/student/progress/${encodeURIComponent(emailToUse)}`, {
        credentials: 'include'
      });
      
      if (!progressResponse.ok) {
        throw new Error('Failed to fetch progress data');
      }
      
      const progress = await progressResponse.json();
      
      // Fetch per-subject progress
      const subjectsResponse = await fetch(`${API_URL}/api/student/${encodeURIComponent(emailToUse)}/subjects/progress`, {
        credentials: 'include'
      });
      
      let subjects = [];
      if (subjectsResponse.ok) {
        subjects = await subjectsResponse.json();
      }
      
      setProgressData(progress);
      setSubjectProgress(subjects);
    } catch (error) {
      console.error('Error loading progress data:', error);
      setError(error.message || 'Failed to load progress data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-2xl">Loading progress...</div>
        </div>
      </div>
    );
  }

  if (error || !progressData) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
        <Header />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="text-center">
            <div className="text-4xl mb-4">😔</div>
            <h2 className="text-2xl font-bold mb-2">No progress data available yet</h2>
            <p className="text-white/80 mb-6">{error || 'Start learning to see your progress!'}</p>
            <Link
              to="/home"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-full transition-all"
            >
              Start Learning →
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'from-green-400 to-emerald-500';
    if (percentage >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const overallProgress = subjectProgress.length > 0
    ? Math.round(subjectProgress.reduce((sum, s) => sum + s.percentage, 0) / subjectProgress.length)
    : 0;

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

      <Header />

      <main className="flex-grow relative z-10 p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Back Button */}
          <Link
            to="/home"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold px-6 py-3 rounded-full mb-6 transition-all border-2 border-white/30"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Home
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 mb-8 shadow-2xl"
          >
            <div className="flex items-center gap-6 flex-wrap">
              <div className="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full w-24 h-24 flex items-center justify-center shadow-2xl border-4 border-white/30">
                <span className="text-white font-black text-4xl">{user?.name?.charAt(0).toUpperCase() || 'S'}</span>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  My Progress 🌟
                </h1>
                <p className="text-xl text-white/90 font-medium mb-2">
                  Student • {user?.email}
                </p>
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
              { icon: BookOpenIcon, label: 'Lessons Completed', value: progressData.numberOfLessonsCompleted || 0, color: 'from-blue-400 to-indigo-500', emoji: '📚' },
              { icon: ClockIcon, label: 'Hours Spent', value: `${Math.floor((progressData.timeSpent || 0) / 60)}h`, color: 'from-purple-400 to-pink-500', emoji: '⏱️' },
              { icon: TrophyIcon, label: 'Exams Taken', value: progressData.totalExams || 0, color: 'from-yellow-400 to-orange-500', emoji: '🏆' },
              { icon: TargetIcon, label: 'Avg Score', value: `${progressData.averageScore || 0}%`, color: 'from-green-400 to-emerald-500', emoji: '🎯' }
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

          {/* Subject Progress */}
          {subjectProgress.length > 0 && (
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
                <h2 className="text-3xl font-black">Subject Progress 📊</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subjectProgress.map((subject, idx) => {
                  const moduleEmoji = subject.module === 'isl' ? '🤟' : subject.module === 'mathematics' ? '➕' : '🔬';
                  return (
                    <div key={idx} className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border-2 border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl">{moduleEmoji}</span>
                          <h3 className="text-xl font-black">{subject.name}</h3>
                        </div>
                        <div className="bg-white/20 rounded-full px-4 py-2">
                          <span className="font-black">{subject.completedLessons}/{subject.totalLessons}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                          <div
                            className={`h-4 rounded-full bg-gradient-to-r ${getProgressColor(subject.percentage)} shadow-lg transition-all`}
                            style={{ width: `${subject.percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-white/70 mt-2 font-bold text-right">{subject.percentage}% Complete</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 rounded-xl p-3">
                          <div className="text-sm text-white/70 font-bold mb-1">Score</div>
                          <div className="text-2xl font-black">{subject.averageScore}% ⭐</div>
                        </div>
                        <div className="bg-white/10 rounded-xl p-3">
                          <div className="text-sm text-white/70 font-bold mb-1">Lessons</div>
                          <div className="text-2xl font-black">{subject.completedLessons}/{subject.totalLessons}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Exam Results */}
          {progressData.totalExams > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-2xl">
                  <AwardIcon className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black">Exam Results 🎯</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-sm text-white/70 font-bold mb-2">Average Score</div>
                  <div className="text-4xl font-black">{progressData.averageScore || 0}%</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-sm text-white/70 font-bold mb-2">Best Score</div>
                  <div className="text-4xl font-black">{progressData.bestScore || 0}%</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="text-sm text-white/70 font-bold mb-2">Total Exams</div>
                  <div className="text-4xl font-black">{progressData.totalExams || 0}</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

