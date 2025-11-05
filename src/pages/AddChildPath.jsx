import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  UserPlusIcon,
  UserIcon,
  CakeIcon,
  BookOpenIcon,
  MailIcon,
  SaveIcon
} from 'lucide-react';

export function AddChildPath() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    grade: '',
    email: '',
    interests: []
  });

  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    // Generate floating emoji
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: ['👶', '👧', '👦', '🎓', '📚', '✨', '⭐', '🌟', '🎨', '🎯', '💝', '🌈'][i],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 25 + Math.random() * 15,
      delay: Math.random() * 10,
      scale: 0.4 + Math.random() * 0.4
    }));
    setFloatingElements(elements);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleInterestToggle = (interest) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interest)
        ? formData.interests.filter(i => i !== interest)
        : [...formData.interests, interest]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Navigate back to dashboard
    navigate('/parent-dashboard');
  };

  const grades = [
    'Pre-K', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade',
    '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade'
  ];

  const interests = [
    { name: 'Mathematics', emoji: '➕', color: 'from-blue-400 to-indigo-500' },
    { name: 'Science', emoji: '🔬', color: 'from-green-400 to-emerald-500' },
    { name: 'ISL', emoji: '🤟', color: 'from-pink-400 to-rose-500' },
    { name: 'Art', emoji: '🎨', color: 'from-purple-400 to-pink-500' },
    { name: 'Music', emoji: '🎵', color: 'from-yellow-400 to-orange-500' },
    { name: 'Reading', emoji: '📖', color: 'from-indigo-400 to-purple-500' }
  ];

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
        <div className="container mx-auto max-w-4xl">
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
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-xl">
                <UserPlusIcon className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Add a Child 👶
                </h1>
                <p className="text-xl text-white/90 font-medium">
                  Register your child to start their learning journey!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 shadow-2xl"
          >
            {/* Basic Information */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-3 rounded-2xl">
                  <UserIcon className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black">Basic Information 📝</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-white/80">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Enter first name"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-white/80">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Enter last name"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-white/80 flex items-center gap-2">
                    <CakeIcon className="w-4 h-4" />
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="3"
                    max="18"
                    placeholder="Enter age"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-white/80 flex items-center gap-2">
                    <BookOpenIcon className="w-4 h-4" />
                    Grade
                  </label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30 font-medium"
                  >
                    <option value="" className="bg-gray-800">Select grade</option>
                    {grades.map((grade) => (
                      <option key={grade} value={grade} className="bg-gray-800">
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2 text-white/80 flex items-center gap-2">
                    <MailIcon className="w-4 h-4" />
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="child@example.com"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-pink-400 to-purple-500 p-3 rounded-2xl">
                  <span className="text-2xl">🎯</span>
                </div>
                <h2 className="text-3xl font-black">Interests & Subjects ✨</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {interests.map((interest) => (
                  <button
                    key={interest.name}
                    type="button"
                    onClick={() => handleInterestToggle(interest.name)}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      formData.interests.includes(interest.name)
                        ? `bg-gradient-to-br ${interest.color} border-white/30 shadow-xl`
                        : 'bg-white/10 border-white/20 hover:bg-white/15'
                    }`}
                  >
                    <div className="text-3xl mb-2">{interest.emoji}</div>
                    <div className="font-black">{interest.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/parent-dashboard"
                className="bg-white/20 hover:bg-white/30 text-white font-black px-8 py-4 rounded-full transition-all border-2 border-white/30"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-gray-900 font-black px-12 py-4 rounded-full transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center gap-3"
              >
                <SaveIcon className="w-6 h-6" />
                Add Child
              </button>
            </div>
          </motion.form>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border-2 border-blue-400/30 rounded-3xl p-6 shadow-2xl"
          >
            <h3 className="text-xl font-black mb-3 flex items-center gap-2">
              ℹ️ What Happens Next?
            </h3>
            <ul className="space-y-2 text-white/90 font-medium">
              <li>✅ Your child will receive login credentials via email (if provided)</li>
              <li>📚 They can start exploring lessons immediately</li>
              <li>📊 You'll be able to track their progress in real-time</li>
              <li>👨‍🏫 Connect with teachers for personalized support</li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}