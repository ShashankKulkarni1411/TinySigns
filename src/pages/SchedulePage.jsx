import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  PlusIcon,
  EditIcon,
  TrashIcon
} from 'lucide-react';

export function SchedulePage() {
  const [schedules, setSchedules] = useState([]);
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    // Generate floating emoji
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: ['📅', '⏰', '📚', '✏️', '🎯', '⭐', '📖', '🕐', '✨', '🎓', '📝', '🗓️'][i],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 25 + Math.random() * 15,
      delay: Math.random() * 10,
      scale: 0.4 + Math.random() * 0.4
    }));
    setFloatingElements(elements);

    // Mock schedule data
    setSchedules([
      {
        id: 1,
        childName: 'Emma Johnson',
        day: 'Monday',
        time: '4:00 PM - 5:00 PM',
        subject: 'Mathematics',
        emoji: '➕',
        color: 'from-blue-400 to-indigo-500'
      },
      {
        id: 2,
        childName: 'Emma Johnson',
        day: 'Wednesday',
        time: '3:30 PM - 4:30 PM',
        subject: 'ISL',
        emoji: '🤟',
        color: 'from-pink-400 to-rose-500'
      },
      {
        id: 3,
        childName: 'Alex Johnson',
        day: 'Tuesday',
        time: '5:00 PM - 6:00 PM',
        subject: 'Science',
        emoji: '🔬',
        color: 'from-green-400 to-emerald-500'
      },
      {
        id: 4,
        childName: 'Alex Johnson',
        day: 'Thursday',
        time: '4:00 PM - 5:00 PM',
        subject: 'Mathematics',
        emoji: '➕',
        color: 'from-blue-400 to-indigo-500'
      },
      {
        id: 5,
        childName: 'Emma Johnson',
        day: 'Friday',
        time: '3:00 PM - 4:00 PM',
        subject: 'Science',
        emoji: '🔬',
        color: 'from-green-400 to-emerald-500'
      }
    ]);
  }, []);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 mb-8 shadow-2xl"
          >
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-indigo-400 to-purple-500 p-4 rounded-2xl shadow-xl">
                  <CalendarIcon className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                    Learning Schedule 📅
                  </h1>
                  <p className="text-xl text-white/90 font-medium">
                    Manage your children's weekly learning times
                  </p>
                </div>
              </div>
              <button className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-gray-900 font-black px-6 py-4 rounded-full transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center gap-2">
                <PlusIcon className="w-5 h-5" />
                Add Schedule
              </button>
            </div>
          </motion.div>

          {/* Weekly Schedule Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 shadow-2xl"
          >
            <div className="space-y-6">
              {daysOfWeek.map((day) => {
                const daySchedules = schedules.filter(s => s.day === day);
                return (
                  <div key={day} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-2 rounded-full">
                        {day}
                      </span>
                      {daySchedules.length > 0 && (
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                          {daySchedules.length} {daySchedules.length === 1 ? 'session' : 'sessions'}
                        </span>
                      )}
                    </h3>

                    {daySchedules.length > 0 ? (
                      <div className="space-y-3">
                        {daySchedules.map((schedule) => (
                          <div
                            key={schedule.id}
                            className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-4 flex-1">
                              <div className={`bg-gradient-to-br ${schedule.color} p-3 rounded-xl shadow-lg`}>
                                <span className="text-2xl">{schedule.emoji}</span>
                              </div>
                              <div className="flex-1">
                                <div className="font-black text-lg mb-1">{schedule.subject}</div>
                                <div className="text-sm text-white/80 font-medium">{schedule.childName}</div>
                              </div>
                              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                                <ClockIcon className="w-4 h-4" />
                                <span className="font-bold text-sm">{schedule.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="bg-blue-500/30 hover:bg-blue-500/50 p-2 rounded-lg transition-all">
                                <EditIcon className="w-4 h-4" />
                              </button>
                              <button className="bg-red-500/30 hover:bg-red-500/50 p-2 rounded-lg transition-all">
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-white/60 font-medium">
                        No sessions scheduled for this day
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border-2 border-yellow-400/30 rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
              💡 Scheduling Tips
            </h3>
            <ul className="space-y-2 text-white/90 font-medium">
              <li>✨ Schedule shorter sessions (30-45 mins) for better focus</li>
              <li>🎯 Plan sessions at consistent times each week</li>
              <li>🌟 Leave breaks between different subjects</li>
              <li>📚 Consider your child's energy levels throughout the day</li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}