import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  AwardIcon,
  StarIcon,
  ChevronRightIcon,
  HandMetalIcon,
  ClockIcon,
  CheckCircleIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ProgressBar } from "../components/progress/ProgressBar";
import { lessonService } from "../services/lessonService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function IndianSignLanguage() {
  const [activeTab, setActiveTab] = useState("lessons");
  const [moduleStats, setModuleStats] = useState(null);

  useEffect(() => {
    const stats = lessonService.getModuleStats("Indian Sign Language", 4);
    setModuleStats(stats);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const lessons = [
    {
      id: 1,
      title: "Basic Greetings",
      description: "Learn everyday greetings in Indian Sign Language.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTevNcVaTpHfpefFF2oHOsugpcIBIUIwapvDQ&s",
      duration: "10 min",
      completed: true,
    },
    {
      id: 2,
      title: "Alphabet A–J",
      description: "Learn to sign the first 10 letters of the alphabet in ISL.",
      image: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
      duration: "20 min",
      completed: true,
    },
    {
      id: 3,
      title: "Alphabet K–T",
      description: "Continue learning the alphabet with letters K through T.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3v09WvcXchAZjyeCGVpb_PlOCCx1gkELh1Q&s",
      duration: "20 min",
      completed: false,
    },
    {
      id: 4,
      title: "Alphabet U–Z & Numbers",
      description:
        "Complete the alphabet and learn numbers 1–10 in ISL.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlO5fCYqAyUktJYN75iuDMSV8nAlSOvzsdJg&s",
      duration: "25 min",
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 flex flex-col font-inter">
      <Header />

      {/* Module Header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-14 shadow-lg">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/soft-wallpaper.png')] opacity-20"></div>
        <div className="container relative mx-auto px-6">
          <div className="flex items-center mb-4 text-sm">
            <Link to="/" className="text-pink-100 hover:text-white">
              Home
            </Link>
            <ChevronRightIcon className="w-4 h-4 mx-2" />
            <span className="font-medium">Indian Sign Language</span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6 }}
              className="flex items-center gap-5"
            >
              <div className="bg-white p-5 rounded-full shadow-2xl ring-2 ring-pink-300/50 hover:rotate-3 transition-transform">
                <HandMetalIcon className="w-12 h-12 text-pink-600" />
              </div>
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight">
                  Indian Sign Language
                </h1>
                <p className="text-pink-100 text-sm md:text-base">
                  Learn to communicate through expressive gestures 🤟✨
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white/20 rounded-2xl p-5 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="flex items-center gap-3">
                <AwardIcon className="w-7 h-7 text-yellow-300" />
                <div>
                  <p className="text-sm text-pink-100">Your Progress</p>
                  <p className="font-semibold">
                    {moduleStats
                      ? `${moduleStats.completedLessons}/4 Lessons Completed`
                      : "Loading..."}
                  </p>
                  {moduleStats && (
                    <div className="mt-2">
                      <ProgressBar
                        progress={moduleStats.completedLessons}
                        total={4}
                        color="pink"
                        size="small"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md shadow-md border-b border-pink-100">
        <div className="container mx-auto flex justify-center">
          {["lessons", "exam"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 text-sm md:text-base font-semibold tracking-wide transition-all duration-300 ${
                activeTab === tab
                  ? "text-pink-600 border-b-4 border-pink-600"
                  : "text-gray-500 hover:text-pink-600"
              }`}
            >
              {tab === "lessons" ? "Lessons" : "Practice Exam"}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons / Exam Section */}
      <main className="flex-grow">
        <section className="py-14">
          <div className="container mx-auto px-6">
            {activeTab === "lessons" && (
              <>
                <motion.h2
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.6 }}
                  className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 text-center mb-12"
                >
                  Explore ISL Lessons 💫
                </motion.h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {lessons.map((lesson, idx) => (
                    <motion.div
                      key={lesson.id}
                      variants={fadeIn}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ delay: idx * 0.1 }}
                      className="group relative bg-white/90 border border-pink-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                    >
                      <div className="h-52 overflow-hidden">
                        <img
                          src={lesson.image}
                          alt={lesson.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-bold text-gray-800">
                            {lesson.title}
                          </h3>
                          {lesson.completed && (
                            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                              <CheckCircleIcon className="w-3 h-3 mr-1" />
                              Completed
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {lesson.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {lesson.duration}
                          </span>
                          <Link
                            to={`/isl/lesson/${lesson.id}`}
                            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition-transform text-white py-2 px-4 rounded-full text-sm font-semibold shadow-md"
                          >
                            Start Lesson
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "exam" && (
              <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.6 }}
                className="bg-white/90 border border-blue-100 rounded-3xl shadow-xl p-10 text-center max-w-3xl mx-auto backdrop-blur-lg"
              >
                <div className="bg-gradient-to-br from-pink-100 to-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <HandMetalIcon className="w-10 h-10 text-pink-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  ISL Practice Exam
                </h3>
                <p className="text-gray-600 mb-8">
                  Test your knowledge of Indian Sign Language basics 🧠
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/isl/exam"
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition-transform text-white py-3 px-6 rounded-full text-sm font-semibold shadow-md inline-flex items-center justify-center"
                  >
                    <HandMetalIcon className="w-5 h-5 mr-2" />
                    Start Practice Exam
                  </Link>
                  <Link
                    to="/review/isl"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition-transform text-white py-3 px-6 rounded-full text-sm font-semibold shadow-md inline-flex items-center justify-center"
                  >
                    <BookOpenIcon className="w-5 h-5 mr-2" />
                    Review Lessons
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Next Steps */}
        <section className="py-20 bg-gradient-to-r from-blue-100 via-pink-50 to-purple-100">
          <div className="container mx-auto px-6 text-center">
            <motion.h2
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 mb-8"
            >
              Keep the Magic Going ✨
            </motion.h2>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-3xl p-10 shadow-2xl inline-flex flex-col md:flex-row items-center gap-8 border border-pink-100 hover:shadow-pink-200/50 transition-all"
            >
              <div className="bg-gradient-to-br from-pink-400 to-purple-400 p-5 rounded-full shadow-md animate-pulse-slow">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-xl font-bold text-gray-800">
                  Continue Learning
                </h3>
                <p className="text-gray-600">
                  Pick up where you left off with <b>“Alphabet K–T”</b>
                </p>
              </div>
              <Link
                to="/isl/lesson/3"
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition-transform text-white py-3 px-8 rounded-full text-sm font-semibold shadow-md"
              >
                Continue
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
