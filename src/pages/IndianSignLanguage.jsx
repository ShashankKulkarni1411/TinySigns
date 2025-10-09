import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { lessonService } from "../services/lessonService";
import {
  BookOpenIcon,
  AwardIcon,
  StarIcon,
  ChevronRightIcon,
  HandMetalIcon,
  ClockIcon,
  CheckCircleIcon,
  RocketIcon,
  SparklesIcon,
  TrophyIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ProgressBar } from "../components/progress/ProgressBar";

export function IndianSignLanguage() {
  const [activeTab, setActiveTab] = useState("lessons");
  const [moduleStats, setModuleStats] = useState(null);

  useEffect(() => {
    const stats = lessonService.getModuleStats("Indian Sign Language", 4);
    setModuleStats(stats);
  }, []);

  const lessons = [
    {
      id: 1,
      title: "Basic Greetings",
      description: "Learn everyday greetings in Indian Sign Language.",
      duration: "10 min",
      completed: true,
      emoji: "🤟",
    },
    {
      id: 2,
      title: "Alphabet A–J",
      description: "Learn to sign the first 10 letters of the alphabet in ISL.",
      duration: "20 min",
      completed: true,
      emoji: "🅰️",
    },
    {
      id: 3,
      title: "Alphabet K–T",
      description: "Continue learning the alphabet with letters K through T.",
      duration: "20 min",
      completed: false,
      emoji: "🔤",
    },
    {
      id: 4,
      title: "Alphabet U–Z & Numbers",
      description: "Complete the alphabet and learn numbers 1–10 in ISL.",
      duration: "25 min",
      completed: false,
      emoji: "🔢",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 font-inter">
      <Header />
      <main className="flex-grow">
        {/* HEADER SECTION */}
        <section className="bg-gradient-to-r from-pink-600 via-purple-500 to-blue-600 text-white py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-8xl">🤟</div>
            <div className="absolute bottom-10 right-20 text-7xl">👐</div>
            <div className="absolute top-20 right-10 text-6xl">👋</div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center mb-6">
              <Link
                to="/home"
                className="text-white/80 hover:text-white font-medium transition-colors"
              >
                🏠 Home
              </Link>
              <ChevronRightIcon className="w-5 h-5 mx-2 text-white/60" />
              <span className="font-semibold">Indian Sign Language</span>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              {/* Module Title */}
              <div className="flex items-center mb-6 md:mb-0">
                <div className="bg-white p-4 rounded-2xl shadow-xl mr-4 transform hover:scale-110 transition-transform">
                  <HandMetalIcon className="w-12 h-12 text-pink-600" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black mb-2">
                    Indian Sign Language
                  </h1>
                  <p className="text-xl text-white/90 font-medium">
                    Learn to communicate through expressive gestures ✨
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border-2 border-white/30 min-w-[280px]">
                <div className="flex items-center">
                  <div className="bg-yellow-400 p-3 rounded-xl mr-4">
                    <AwardIcon className="w-8 h-8 text-yellow-900" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/80 font-medium mb-1">
                      Your Progress
                    </p>
                    <p className="font-black text-xl mb-2">
                      {moduleStats
                        ? `${moduleStats.completedLessons}/4 Lessons ⭐`
                        : "Loading..."}
                    </p>
                    {moduleStats && (
                      <ProgressBar
                        progress={moduleStats.completedLessons}
                        total={4}
                        label=""
                        color="white"
                        size="small"
                        showCount={false}
                        showPercentage={false}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TAB NAVIGATION */}
        <div className="bg-white shadow-lg sticky top-0 z-40">
          <div className="container mx-auto">
            <div className="flex overflow-x-auto">
              <button
                className={`px-8 py-4 font-bold text-base focus:outline-none transition-all relative ${
                  activeTab === "lessons"
                    ? "text-pink-600 bg-pink-50"
                    : "text-gray-600 hover:text-pink-600 hover:bg-pink-50/50"
                }`}
                onClick={() => setActiveTab("lessons")}
              >
                📚 Lessons
                {activeTab === "lessons" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-600 to-purple-600"></div>
                )}
              </button>

              <button
                className={`px-8 py-4 font-bold text-base focus:outline-none transition-all relative ${
                  activeTab === "exam"
                    ? "text-pink-600 bg-pink-50"
                    : "text-gray-600 hover:text-pink-600 hover:bg-pink-50/50"
                }`}
                onClick={() => setActiveTab("exam")}
              >
                📝 Practice Exam
                {activeTab === "exam" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-600 to-purple-600"></div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Lessons Tab */}
            {activeTab === "lessons" && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-4xl font-black text-gray-800 flex items-center gap-3">
                    <SparklesIcon className="w-10 h-10 text-pink-600" />
                    Explore ISL Lessons
                  </h2>
                  <div className="bg-pink-100 px-6 py-3 rounded-full">
                    <span className="font-bold text-pink-800">
                      4 Engaging Lessons! 🤟
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 border-4 border-white"
                    >
                      {/* Lesson Image */}
                      <div className="h-56 bg-gradient-to-br from-pink-200 to-purple-200 relative overflow-hidden">
                        {lesson.image ? (
                          <img
                            src={lesson.image}
                            alt={lesson.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-9xl">{lesson.emoji}</span>
                          </div>
                        )}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center font-black text-xl text-pink-600 shadow-lg">
                          {lesson.id}
                        </div>
                      </div>

                      {/* Lesson Info */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-2xl font-black text-gray-800 flex-1">
                            {lesson.title}
                          </h3>
                          {lesson.completed && (
                            <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center font-bold shadow-md">
                              <CheckCircleIcon className="w-4 h-4 mr-1" />
                              Done! 🎉
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                          {lesson.description}
                        </p>

                        <div className="flex justify-between items-center">
                          <span className="text-base text-gray-500 font-semibold flex items-center">
                            <ClockIcon className="w-5 h-5 mr-2 text-pink-600" />
                            {lesson.duration}
                          </span>
                          <Link
                            to={`/isl/lesson/${lesson.id}`}
                            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 px-6 rounded-full text-base font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            Start Lesson 🚀
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Practice Exam Tab */}
            {activeTab === "exam" && (
              <div className="bg-white rounded-3xl shadow-2xl p-10 border-4 border-pink-100 text-center">
                <div className="bg-gradient-to-br from-pink-400 to-purple-400 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <HandMetalIcon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-4xl font-black mb-4 text-gray-800">
                  ISL Practice Exam 🧠
                </h3>
                <p className="text-xl text-gray-600 font-medium mb-10">
                  Test your knowledge of Indian Sign Language basics!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/isl/exam"
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-black py-4 px-10 rounded-full transition-all inline-flex items-center justify-center text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
                  >
                    <RocketIcon className="w-6 h-6 mr-2" />
                    Start Practice Exam
                  </Link>
                  <Link
                    to="/review/isl"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black py-4 px-10 rounded-full transition-all inline-flex items-center justify-center text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
                  >
                    <BookOpenIcon className="w-6 h-6 mr-2" />
                    Review Lessons
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* NEXT STEPS SECTION */}
        <section className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-black mb-8 text-gray-800 flex items-center">
              <TrophyIcon className="w-10 h-10 mr-4 text-yellow-500" />
              Keep the Magic Going ✨
            </h2>
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-white">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-6 rounded-2xl shadow-xl">
                  <StarIcon className="w-16 h-16 text-white" />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-3xl font-black text-gray-800 mb-2">
                    Continue Learning! 🚀
                  </h3>
                  <p className="text-xl text-gray-600 font-medium">
                    Pick up where you left off with “Alphabet K–T”
                  </p>
                </div>
                <Link
                  to="/isl/lesson/3"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-4 px-8 rounded-full text-lg font-black transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 whitespace-nowrap"
                >
                  Continue ✨
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
