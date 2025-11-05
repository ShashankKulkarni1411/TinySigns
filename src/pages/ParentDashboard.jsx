import React, { useState, useEffect } from 'react';
import { ParentHeader } from '../components/ParentHeader';
import { Footer } from '../components/Footer';
import { AddChildModal } from '../components/AddChildModal';
import { useAuth } from '../contexts/AuthContext';
import { lessonService } from '../services/lessonService';
import toast, { Toaster } from 'react-hot-toast';
import { 
  UsersIcon, 
  BookOpenIcon, 
  BarChartIcon, 
  TrendingUpIcon,
  CalendarIcon,
  MessageCircleIcon,
  SettingsIcon,
  SparklesIcon,
  HeartIcon,
  StarIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function ParentDashboard() {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [parentData, setParentData] = useState(null);
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [userProgress, setUserProgress] = useState({
    progress: 0,
    individualProgress: {
      mathematics: 0,
      science: 0,
      isl: 0
    }
  });
  const [overallStats, setOverallStats] = useState({
    totalChildren: 0,
    activeChildren: 0,
    totalLessonsCompleted: 0,
    averageScore: 0,
  });
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      loadParentData();
    }

    // Generate floating emoji
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: ['👨‍👩‍👧‍👦', '❤️', '⭐', '🎓', '📚', '🏆', '💝', '🌟', '✨', '🎯', '👪', '💫', '🎉', '🌈', '🎊'][i],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 25 + Math.random() * 15,
      delay: Math.random() * 10,
      scale: 0.4 + Math.random() * 0.4
    }));
    setFloatingElements(elements);

    // Listen for real-time progress updates
    const handleProgressUpdate = (event) => {
      const { studentEmail } = event.detail;
      // Reload parent data to get updated progress for any child
      loadParentData();
    };

    window.addEventListener('progressUpdated', handleProgressUpdate);
    return () => {
      window.removeEventListener('progressUpdated', handleProgressUpdate);
    };
  }, [user]);

  const loadParentData = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      // Fetch parent data and children list
      const response = await fetch(`${API_URL}/api/parent/${user.email}`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch parent data');
      const data = await response.json();
      setParentData(data);

      // Fetch child progress summary
      const progressResponse = await fetch(`${API_URL}/api/parent/child/${encodeURIComponent(user.email)}`, {
        credentials: 'include'
      });
      
      if (progressResponse.ok) {
        const progressData = await progressResponse.json();
        
        // Update user progress with real data
        if (progressData.progress) {
          setUserProgress({
            progress: progressData.progress.overall || 0,
            individualProgress: {
              mathematics: progressData.progress.individualProgress?.mathematics || 0,
              science: progressData.progress.individualProgress?.science || 0,
              isl: progressData.progress.individualProgress?.isl || 0
            }
          });
        }
      }

      // Process children data
      if (data.childrenData && data.childrenData.length > 0) {
        const processedChildren = data.childrenData
          .filter(child => !child.notFound)
          .map((child, index) => {
            const completed = child.numberOfLessonsCompleted || 0;
            const avgScore = child.averageScore || 0;
            return {
              id: child.email, // Use email as ID for routing
              email: child.email,
              name: child.email.split('@')[0] || 'Child',
              avatar: child.email.charAt(0).toUpperCase(),
              lastActive: child.updatedAt ? new Date(child.updatedAt).toLocaleString() : 'Never',
              progress: {
                isl: { completed: Math.floor(completed / 3), total: 4, score: avgScore },
                mathematics: { completed: Math.floor(completed / 3), total: 4, score: avgScore },
                science: { completed: Math.floor(completed / 3), total: 4, score: avgScore }
              }
            };
          });
        setChildren(processedChildren);
        
        // Calculate overall stats from real data
        const totalLessons = processedChildren.reduce((acc, child) => {
          return acc + (child.progress.isl.completed + child.progress.mathematics.completed + child.progress.science.completed);
        }, 0);

        const totalScores = processedChildren.reduce((acc, child) => {
          return acc + (child.progress.isl.score + child.progress.mathematics.score + child.progress.science.score);
        }, 0);

        const totalModules = processedChildren.length * 3;

        setOverallStats({
          totalChildren: processedChildren.length || data.children?.length || 0,
          activeChildren: processedChildren.length || 0,
          totalLessonsCompleted: totalLessons || data.totalChildrenActivity || 0,
          averageScore: totalModules > 0 ? Math.round(totalScores / totalModules) : (data.avgScore || 0),
        });
      } else {
        // No children yet
        setOverallStats({
          totalChildren: data.children?.length || 0,
          activeChildren: 0,
          totalLessonsCompleted: data.totalChildrenActivity || 0,
          averageScore: data.avgScore || 0,
        });
      }
    } catch (error) {
      console.error('Error loading parent data:', error);
      // Fallback to empty state
      setOverallStats({
        totalChildren: 0,
        activeChildren: 0,
        totalLessonsCompleted: 0,
        averageScore: 0,
      });
    }
  };

  const handleAddChildSuccess = (data) => {
    // Refresh parent data
    loadParentData();
  };

  const getProgressColor = (completed, total) => {
    const percentage = (completed / total) * 100;
    if (percentage >= 80) return 'from-green-400 to-emerald-500';
    if (percentage >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const getProgressWidth = (completed, total) => {
    return (completed / total) * 100;
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
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      <ParentHeader />
      <Toaster position="top-right" />
      <AddChildModal
        isOpen={showAddChildModal}
        onClose={() => setShowAddChildModal(false)}
        onSuccess={handleAddChildSuccess}
      />
      
      <main className="flex-grow relative z-10 p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 md:p-10 mb-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300/10 rounded-full blur-2xl"></div>
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Welcome Back, {user?.name || 'Parent'}! 👋
                </h1>
                <p className="text-xl text-white/90 font-medium">
                  Track your children's amazing learning journey! 🌟
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full p-6 shadow-xl">
                <HeartIcon className="w-12 h-12" />
              </div>
            </div>
          </motion.div>

          {/* Your Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 mb-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-3 rounded-2xl">
                <SparklesIcon className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black">Your Progress ✨</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Overall', value: userProgress.progress, color: 'from-indigo-400 to-purple-500', emoji: '🎯' },
                { label: 'Mathematics', value: userProgress.individualProgress.mathematics, color: 'from-blue-400 to-cyan-500', emoji: '➕' },
                { label: 'Science', value: userProgress.individualProgress.science, color: 'from-green-400 to-emerald-500', emoji: '🔬' },
                { label: 'ISL', value: userProgress.individualProgress.isl, color: 'from-pink-400 to-rose-500', emoji: '🤟' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <div className={`text-4xl font-black mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.value}%
                  </div>
                  <div className="text-sm text-white/80 font-bold">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
          >
            {[
              { icon: UsersIcon, label: 'Total Children', value: overallStats.totalChildren, color: 'from-blue-400 to-indigo-500', emoji: '👨‍👩‍👧‍👦' },
              { icon: TrendingUpIcon, label: 'Active Today', value: overallStats.activeChildren, color: 'from-green-400 to-emerald-500', emoji: '🚀' },
              { icon: BookOpenIcon, label: 'Lessons Done', value: overallStats.totalLessonsCompleted, color: 'from-purple-400 to-pink-500', emoji: '📚' },
              { icon: StarIcon, label: 'Avg Score', value: `${overallStats.averageScore}%`, color: 'from-yellow-400 to-orange-500', emoji: '⭐' }
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

          {/* Children List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 mb-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-pink-400 to-purple-500 p-3 rounded-2xl">
                  <UsersIcon className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black">Your Amazing Kids! 🎉</h2>
              </div>
              <button
                onClick={() => setShowAddChildModal(true)}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-gray-900 font-black px-6 py-3 rounded-full transition-all shadow-lg hover:shadow-2xl transform hover:scale-105"
              >
                + Add Child
              </button>
            </div>

            <div className="space-y-6">
              {children.map((child) => (
                <div key={child.id} className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-3xl p-6 hover:bg-white/15 transition-all shadow-lg">
                  <div className="flex items-center justify-between flex-wrap gap-6 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center shadow-xl border-2 border-white/30">
                        <span className="text-white font-black text-2xl">{child.avatar}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-black mb-1">{child.name}</h3>
                        <p className="text-white/80 font-medium">{child.grade} • Age {child.age}</p>
                        <p className="text-sm text-white/60 font-medium">🕐 Last active: {child.lastActive}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/child-progress/${encodeURIComponent(child.email)}`}
                        className="bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-300 hover:to-cyan-300 text-white font-black px-6 py-3 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        View Progress 📊
                      </Link>
                      <button className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all border-2 border-white/30">
                        <MessageCircleIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(child.progress).map(([module, data]) => {
                      const moduleEmoji = module === 'isl' ? '🤟' : module === 'mathematics' ? '➕' : '🔬';
                      return (
                        <div key={module} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-black capitalize flex items-center gap-2">
                              {moduleEmoji} {module === 'isl' ? 'ISL' : module}
                            </span>
                            <span className="text-sm font-bold text-white/80">
                              {data.completed}/{data.total}
                            </span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                            <div
                              className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor(data.completed, data.total)} shadow-lg`}
                              style={{ width: `${getProgressWidth(data.completed, data.total)}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-white/70 mt-2 font-bold">Score: {data.score}% ⭐</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: CalendarIcon,
                title: 'Schedule',
                desc: 'Manage learning schedules',
                color: 'from-indigo-500 to-purple-500',
                emoji: '📅',
                link: '/schedule'
              },
              {
                icon: MessageCircleIcon,
                title: 'Messages',
                desc: 'Chat with teachers',
                color: 'from-green-500 to-emerald-500',
                emoji: '💬',
                link: '/messages'
              },
              {
                icon: SettingsIcon,
                title: 'Settings',
                desc: 'Account preferences',
                color: 'from-pink-500 to-rose-500',
                emoji: '⚙️',
                link: '/settings'
              }
            ].map((action, idx) => {
              const Icon = action.icon;
              return (
                <div key={idx} className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform">
                  <div className="absolute top-4 right-4 text-4xl opacity-50 group-hover:scale-110 transition-transform">
                    {action.emoji}
                  </div>
                  <div className={`bg-gradient-to-br ${action.color} p-4 rounded-2xl w-fit mb-4 shadow-lg`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black mb-3">{action.title}</h3>
                  <p className="text-white/80 mb-6 font-medium">{action.desc}</p>
                  <Link
                    to={action.link}
                    className="inline-block bg-white/20 hover:bg-white/30 text-white font-black px-6 py-3 rounded-full transition-all border-2 border-white/30"
                  >
                    Open →
                  </Link>
                </div>
              );
            })}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}