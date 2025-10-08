import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HandMetalIcon,
  ArrowRightIcon,
  SparklesIcon,
  MessagesSquareIcon,
  BrainCircuitIcon,
  AccessibilityIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  QuoteIcon
} from "lucide-react";
import "./LandingPage.css"; // 👈 import the CSS below

export function LandingPage() {
  const signupRef = useRef(null);
  const scrollToSignup = () =>
    signupRef.current?.scrollIntoView({ behavior: "smooth" });
  const [flipped, setFlipped] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: MessagesSquareIcon,
      title: "Sign-to-Text Conversion",
      desc: "Translate gestures into text instantly."
    },
    {
      icon: HandMetalIcon,
      title: "Text-to-Sign Visualization",
      desc: "Watch your words come alive in sign animations."
    },
    {
      icon: BrainCircuitIcon,
      title: "AI-based Gesture Recognition",
      desc: "Smart models that understand your signs."
    },
    {
      icon: AccessibilityIcon,
      title: "Accessible UI",
      desc: "Inclusive design that’s easy for everyone."
    }
  ];

  const testimonials = [
    {
      name: "Aarav Patel",
      role: "Student",
      avatar: "https://i.pravatar.cc/120?img=12",
      text: "TinySigns made learning sign language fun and easy! ✨"
    },
    {
      name: "Neha Sharma",
      role: "Parent",
      avatar: "https://i.pravatar.cc/120?img=32",
      text: "My child loves using this app every day. It’s so colorful and engaging! 💖"
    },
    {
      name: "Rahul Mehta",
      role: "Teacher",
      avatar: "https://i.pravatar.cc/120?img=27",
      text: "A perfect way to make communication inclusive and joyful 🎉"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-purple-100 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-40 bg-white/80 backdrop-blur-xl border-b border-pink-200/40 shadow-md">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <HandMetalIcon className="w-8 h-8 text-pink-500" />
            <span className="text-xl font-extrabold text-gray-800">
              TinySigns
            </span>
          </motion.div>
          <Link
            to="/login"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-105 transition-transform"
          >
            Login / Signup
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, ease: "easeOut" }}
            variants={fadeIn}
          >
            <span className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-1 rounded-full text-sm font-semibold">
              <SparklesIcon className="w-4 h-4" /> Fun & Inclusive Learning
            </span>
            <h1 className="mt-4 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 leading-tight">
              Bridging Communication <br /> Through TinySigns 💬✨
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Empowering Deaf and Mute learners with playful, interactive
              sign-to-text and text-to-sign learning.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={scrollToSignup}
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
              >
                Get Started
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white border-2 border-blue-300 text-blue-700 font-semibold hover:bg-blue-50 transition-colors"
              >
                Login
              </Link>
            </div>
          </motion.div>

          {/* Flippable Icon Card */}
          <div
            className="flip-card w-64 h-64 mx-auto cursor-pointer"
            onClick={() => setFlipped(!flipped)}
          >
            <motion.div
              className={`flip-card-inner ${flipped ? "flipped" : ""}`}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* FRONT */}
              <div className="flip-card-front bg-gradient-to-tr from-pink-200 via-purple-200 to-blue-200">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1209/1209182.png"
                  alt="Sign Language Learning"
                  className="w-32 h-32 drop-shadow-xl"
                />
                <h2 className="text-xl font-bold text-purple-800 mt-3">
                  TinySigns
                </h2>
              </div>

              {/* BACK */}
              <div className="flip-card-back bg-gradient-to-tr from-blue-100 via-pink-100 to-purple-100">
                <h3 className="text-xl font-bold text-purple-700 mb-2">
                  About TinySigns 💫
                </h3>
                <p className="text-sm text-gray-700 px-4">
                  Learn sign language interactively through AI-powered
                  recognition and visualization. Making communication inclusive
                  and joyful for everyone!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600"
          >
            Magical Features ✨
          </motion.h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, idx) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/80 rounded-3xl p-6 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform border border-pink-100"
              >
                <div className="p-4 bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 rounded-2xl inline-flex">
                  <f.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
          >
            What Learners Say 💬
          </motion.h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-6 border border-blue-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full border-2 border-pink-300 object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                  <QuoteIcon className="w-4 h-4 inline text-pink-500 mr-2" />
                  {t.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={signupRef}
        className="py-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-center"
      >
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold"
        >
          Join the movement toward inclusive learning 🌍💖
        </motion.h2>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-3 rounded-full bg-white text-blue-700 font-semibold shadow hover:scale-105 transition-transform"
          >
            Sign Up Now
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center px-8 py-3 rounded-full bg-blue-600/40 text-white font-semibold hover:bg-blue-600/60 transition"
          >
            I already have an account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-blue-600"
            >
              About
            </a>
            <Link to="/" className="hover:text-blue-600">
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500"
            >
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
