import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  ActivityIcon,
  FlaskConicalIcon,
  TrendingUpIcon,
} from "lucide-react";
import { ProgressBar } from "../components/progress/ProgressBar";
import { lessonService } from "../services/lessonService";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

export function Home() {
  const [overallProgress, setOverallProgress] = useState(null);
  const { user, isAuthenticated, syncUserProgress } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      syncUserProgress();
      loadOverallProgress();
    }
  }, [isAuthenticated, user]);

  const loadOverallProgress = () => {
    const moduleConfigs = [
      { name: "Mathematics", totalLessons: 4 },
      { name: "Science", totalLessons: 4 },
      { name: "Indian Sign Language", totalLessons: 4 },
    ];
    const progress = lessonService.getOverallProgress(moduleConfigs);
    setOverallProgress(progress);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative text-center py-24 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="container mx-auto px-6"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-yellow-300 via-pink-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-md">
              Learning Made Visual
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
              Fun, interactive lessons in Indian Sign Language for pre-primary
              students
            </p>
          </motion.div>

          {/* Animated background glow */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-500/20 via-purple-600/20 to-indigo-500/20 blur-3xl"></div>
        </section>

        {/* Overall Progress Section */}
        {isAuthenticated &&
          overallProgress &&
          overallProgress.totalLessons > 0 && (
            <section className="py-10 px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto"
              >
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                    <div className="flex items-center">
                      <TrendingUpIcon className="w-10 h-10 text-yellow-300 mr-4" />
                      <div>
                        <h3 className="text-2xl font-bold">
                          Your Learning Progress
                        </h3>
                        <p className="text-white/70">
                          {overallProgress.completedLessons} of{" "}
                          {overallProgress.totalLessons} lessons completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-extrabold text-yellow-300">
                        {overallProgress.overallCompletionPercentage}%
                      </div>
                      <div className="text-sm text-white/70">Complete</div>
                    </div>
                  </div>
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
              </motion.div>
            </section>
          )}

        {/* Learning Modules */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Our Learning Modules
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "Indian Sign Language",
                  icon: <BookOpenIcon className="w-16 h-16 text-pink-300" />,
                  color: "from-pink-500 to-rose-600",
                  desc: "Learn basic signs through fun, interactive games and videos.",
                  link: "/isl",
                  progress:
                    overallProgress?.moduleStats["Indian Sign Language"]
                      ?.completedLessons || 0,
                },
                {
                  title: "Mathematics",
                  icon: <ActivityIcon className="w-16 h-16 text-blue-300" />,
                  color: "from-blue-500 to-indigo-600",
                  desc: "Visual counting, shapes, and basic number concepts.",
                  link: "/mathematics",
                  progress:
                    overallProgress?.moduleStats["Mathematics"]
                      ?.completedLessons || 0,
                },
                {
                  title: "Science",
                  icon: <FlaskConicalIcon className="w-16 h-16 text-green-300" />,
                  color: "from-green-500 to-emerald-600",
                  desc: "Discover plants, animals, and our world through visual learning.",
                  link: "/science",
                  progress:
                    overallProgress?.moduleStats["Science"]?.completedLessons ||
                    0,
                },
              ].map((module, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className={`rounded-3xl p-8 bg-gradient-to-br ${module.color} shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 backdrop-blur-md`}
                >
                  <div className="flex justify-center mb-6">
                    {module.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white text-center">
                    {module.title}
                  </h3>
                  <p className="text-white/90 mb-6 text-center">
                    {module.desc}
                  </p>
                  {isAuthenticated && (
                    <div className="mb-4">
                      <ProgressBar
                        progress={module.progress}
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
                      className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-full transition-all"
                    >
                      Explore
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Features */}
        <section className="relative py-20 px-6 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-md">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16 text-white">
              Special Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: "Sign to Text",
                  desc: "Use your webcam to translate sign language gestures into text in real-time.",
                  icon: "https://cdn-icons-png.flaticon.com/512/4406/4406319.png",
                  color: "bg-yellow-400/30",
                },
                {
                  title: "Text to Sign",
                  desc: "Convert text into sign language videos and animations.",
                  icon: "https://cdn-icons-png.flaticon.com/512/3426/3426653.png",
                  color: "bg-teal-400/30",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-white/20"
                >
                  <div
                    className={`${feature.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-12 h-12"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 max-w-md mx-auto">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
