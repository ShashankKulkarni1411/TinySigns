import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  ActivityIcon,
  FlaskConicalIcon,
  TrendingUpIcon,
  RocketIcon,
} from "lucide-react";
import { ProgressBar } from "../components/progress/ProgressBar";
import { lessonService } from "../services/lessonService";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

export function Home() {
  const [overallProgress, setOverallProgress] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const { user, isAuthenticated, syncUserProgress } = useAuth();
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user && user.email) {
      syncUserProgress();
      loadStudentData();
    }

    // Generate slow floating emoji
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: ['⭐', '✨', '💫', '🌟', '🎨', '🎯', '🎪', '🎭', '🚀', '🌈', '💝', '🎵', '🦋', '🌺', '🎈'][i],
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
      // If this is the current student, reload data
      if (user?.email === studentEmail) {
        loadStudentData();
      }
    };

    window.addEventListener('progressUpdated', handleProgressUpdate);
    return () => {
      window.removeEventListener('progressUpdated', handleProgressUpdate);
    };
  }, [isAuthenticated, user]);

  const loadStudentData = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/student/${user.email}`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch student data');
      const data = await response.json();
      setStudentData(data);
      
      // Calculate overall progress from student data
      const moduleConfigs = [
        { name: "Mathematics", totalLessons: 4 },
        { name: "Science", totalLessons: 4 },
        { name: "Indian Sign Language", totalLessons: 4 },
      ];
      
      // Use student data to calculate progress dynamically
      const completedLessons = data.numberOfLessonsCompleted || 0;
      const totalLessons = moduleConfigs.reduce((sum, m) => sum + m.totalLessons, 0);
      const overallCompletionPercentage = totalLessons > 0 
        ? Math.round((completedLessons / totalLessons) * 100) 
        : 0;
      
      // Calculate module progress (distribute evenly across modules)
      const moduleStats = {};
      moduleConfigs.forEach(module => {
        // Calculate progress per module (assuming even distribution)
        const lessonsPerModule = completedLessons / moduleConfigs.length;
        const moduleProgress = Math.min(Math.floor(lessonsPerModule), module.totalLessons);
        moduleStats[module.name] = {
          completedLessons: moduleProgress,
          totalLessons: module.totalLessons
        };
      });
      
      setOverallProgress({
        completedLessons,
        totalLessons,
        overallCompletionPercentage,
        moduleStats
      });
    } catch (error) {
      console.error('Error loading student data:', error);
      // Fallback to lessonService if API fails
      const moduleConfigs = [
        { name: "Mathematics", totalLessons: 4 },
        { name: "Science", totalLessons: 4 },
        { name: "Indian Sign Language", totalLessons: 4 },
      ];
      const progress = lessonService.getOverallProgress(moduleConfigs);
      setOverallProgress(progress);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white relative overflow-hidden">
      {/* Slow floating emoji in background */}
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

      {/* Slow animated gradient orbs in background */}
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
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        />
      </div>

      <Header />

      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="relative text-center py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-black mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl inline-block">
                Learning Made
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-200 via-indigo-300 to-pink-300 bg-clip-text text-transparent drop-shadow-2xl inline-block">
                Visual & Fun! 
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
            >
              Interactive lessons in Indian Sign Language designed especially for amazing kids like you! 👋✨
            </motion.p>
          </div>
        </section>

        {/* Overall Progress Section */}
        {isAuthenticated &&
          overallProgress &&
          overallProgress.totalLessons > 0 && (
            <section className="py-10 px-6">
              <div className="container mx-auto max-w-4xl">
                <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-300/10 rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between flex-wrap gap-6 mb-8">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-400 p-4 rounded-2xl mr-4 shadow-lg">
                          <TrendingUpIcon className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-black mb-1">
                            Your Learning Progress 🌟
                          </h3>
                          <p className="text-white/80 text-lg font-medium">
                            {overallProgress.completedLessons} of {overallProgress.totalLessons} lessons completed
                          </p>
                        </div>
                      </div>
                      <div className="text-center bg-white/20 rounded-2xl px-8 py-4 backdrop-blur-md border border-white/30">
                        <div className="text-5xl font-black bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                          {overallProgress.overallCompletionPercentage}%
                        </div>
                        <div className="text-sm text-white/90 font-bold mt-1">Complete 🎉</div>
                      </div>
                    </div>
                    <div className="relative">
                      <ProgressBar
                        progress={overallProgress.completedLessons}
                        total={overallProgress.totalLessons}
                        label=""
                        color="white"
                        size="medium"
                        showCount={false}
                        showPercentage={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

        {/* Learning Modules */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white via-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Choose Your Adventure! 🚀
              </h2>
              <p className="text-xl text-white/80 font-medium">Pick a module and start learning today!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {[
                {
                  title: "Indian Sign Language",
                  icon: <BookOpenIcon className="w-20 h-20" />,
                  color: "from-pink-500 via-rose-500 to-red-500",
                  desc: "Learn basic signs through fun, interactive games and videos! 👋",
                  link: "/isl",
                  emoji: "🤟",
                  progress:
                    overallProgress?.moduleStats["Indian Sign Language"]
                      ?.completedLessons || 0,
                },
                {
                  title: "Mathematics",
                  icon: <ActivityIcon className="w-20 h-20" />,
                  color: "from-blue-500 via-indigo-500 to-purple-500",
                  desc: "Visual counting, shapes, and basic number concepts! 🔢",
                  link: "/mathematics",
                  emoji: "➕",
                  progress:
                    overallProgress?.moduleStats["Mathematics"]
                      ?.completedLessons || 0,
                },
                {
                  title: "Science",
                  icon: <FlaskConicalIcon className="w-20 h-20" />,
                  color: "from-green-500 via-emerald-500 to-teal-500",
                  desc: "Discover plants, animals, and our world through visual learning! 🌍",
                  link: "/science",
                  emoji: "🔬",
                  progress:
                    overallProgress?.moduleStats["Science"]?.completedLessons || 0,
                },
              ].map((module, i) => (
                <div
                  key={i}
                  className="relative group transform transition-transform hover:scale-105"
                >
                  <div className={`relative rounded-3xl p-8 bg-gradient-to-br ${module.color} shadow-2xl border-4 border-white/20 overflow-hidden backdrop-blur-md`}>
                    {/* Emoji badge */}
                    <div className="absolute top-4 right-4 text-5xl">
                      {module.emoji}
                    </div>

                    <div className="relative z-10">
                      <div className="bg-white/20 backdrop-blur-md w-28 h-28 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border-2 border-white/30">
                        {module.icon}
                      </div>

                      <h3 className="text-3xl font-black mb-4 text-white text-center leading-tight">
                        {module.title}
                      </h3>

                      <p className="text-white/90 text-lg mb-6 text-center font-medium leading-relaxed">
                        {module.desc}
                      </p>

                      {isAuthenticated && (
                        <div className="mb-6 bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-white">Progress</span>
                            <span className="text-sm font-bold text-white">
                              {overallProgress?.moduleStats[module.title]?.completedLessons || 0}/4 ⭐
                            </span>
                          </div>
                          <ProgressBar
                            progress={overallProgress?.moduleStats[module.title]?.completedLessons || 0}
                            total={4}
                            label=""
                            color="white"
                            size="small"
                            showCount={false}
                            showPercentage={false}
                          />
                        </div>
                      )}

                      <div className="text-center">
                        <Link
                          to={module.link}
                          className="inline-flex items-center gap-2 bg-white text-gray-800 hover:bg-yellow-300 font-black py-4 px-8 rounded-full text-lg transition-all shadow-lg hover:shadow-2xl transform hover:scale-105"
                        >
                          Start Learning 
                          <RocketIcon className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Features */}
        <section className="relative py-24 px-6 bg-gradient-to-br from-indigo-900/60 to-purple-900/60 backdrop-blur-md">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                Amazing Features! ✨
              </h2>
              <p className="text-xl text-white/80 font-medium">Try our special learning tools!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                {
                  title: "Sign to Text",
                  desc: "Use your webcam to translate sign language gestures into text in real-time! 📸",
                  icon: "https://cdn-icons-png.flaticon.com/512/4406/4406319.png",
                  color: "from-yellow-400 to-orange-500",
                  emoji: "🤳"
                },
                {
                  title: "Text to Sign",
                  desc: "Convert text into sign language videos and animations! 🎬",
                  icon: "https://cdn-icons-png.flaticon.com/512/3426/3426653.png",
                  color: "from-teal-400 to-cyan-500",
                  emoji: "✍️"
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="relative group transform transition-transform hover:scale-105"
                >
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl transition-all border-2 border-white/20 overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 text-4xl">
                      {feature.emoji}
                    </div>

                    <div className={`bg-gradient-to-br ${feature.color} w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                      <img
                        src={feature.icon}
                        alt={feature.title}
                        className="w-14 h-14 drop-shadow-lg"
                      />
                    </div>

                    <h3 className="text-3xl font-black mb-4 text-white text-center">
                      {feature.title}
                    </h3>

                    <p className="text-white/90 text-lg text-center leading-relaxed font-medium">
                      {feature.desc}
                    </p>

                    <div className="text-center mt-6">
                      <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-full transition-all border-2 border-white/30">
                        Coming Soon! 🎉
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}