import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HandMetalIcon,
  ArrowRightIcon,
  SparklesIcon,
  MessagesSquareIcon,
  LanguagesIcon,
  BrainCircuitIcon,
  AccessibilityIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  QuoteIcon
} from 'lucide-react';

export function LandingPage() {
  const signupRef = useRef(null);

  const scrollToSignup = () => {
    if (signupRef.current) {
      signupRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: MessagesSquareIcon,
      title: 'Sign-to-Text Conversion',
      desc: 'Translate gestures into understandable text in real time.'
    },
    {
      icon: HandMetalIcon,
      title: 'Text-to-Sign Visualization',
      desc: 'See text translated back into clear sign animations.'
    },
    {
      icon: LanguagesIcon,
      title: 'Bilingual Support',
      desc: 'Learn in English and Gujarati with ease.'
    },
    {
      icon: BrainCircuitIcon,
      title: 'AI-based Gesture Recognition',
      desc: 'Powered by intelligent models for accurate recognition.'
    },
    {
      icon: AccessibilityIcon,
      title: 'Accessible UI',
      desc: 'Designed for all learners with inclusive patterns.'
    }
  ];

  const testimonials = [
    {
      name: 'Aarav Patel',
      role: 'Student',
      avatar: 'https://i.pravatar.cc/120?img=12',
      text: 'This platform helped me communicate with confidence. The lessons are friendly and effective.'
    },
    {
      name: 'Neha Sharma',
      role: 'Parent',
      avatar: 'https://i.pravatar.cc/120?img=32',
      text: 'A beautiful experience for my child. Easy to use and genuinely helpful.'
    },
    {
      name: 'Rahul Mehta',
      role: 'Teacher',
      avatar: 'https://i.pravatar.cc/120?img=27',
      text: 'The bilingual support and clear visuals make teaching accessible and fun.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HandMetalIcon className="w-7 h-7 text-blue-600" />
            <span className="text-lg font-bold text-gray-800">TinySigns</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
              Login / Signup
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 md:pt-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, ease: 'easeOut' }}
              variants={fadeIn}
            >
              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                <SparklesIcon className="w-4 h-4" /> Inclusive Learning
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                Bridging Communication Through Sign Language
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Empowering Deaf and Mute learners with an interactive sign-to-text and text-to-sign learning experience.
              </p>
              <div className="mt-6 flex gap-3">
                <button onClick={scrollToSignup} className="inline-flex items-center px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                  Get Started
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
                <Link to="/login" className="inline-flex items-center px-6 py-3 rounded-xl bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-colors">
                  Login
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-blue-200/40 rounded-3xl blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1618677366787-431f2f1a3030?q=80&w=1600&auto=format&fit=crop"
                alt="Sign Language Learning"
                className="relative w-full rounded-3xl shadow-xl border border-blue-100"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">Learn and Translate Seamlessly</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              TinySigns enables learners to translate between sign and spoken language with intuitive tools and guided lessons. Explore
              sign-to-text conversion, visualize text as signs, and build confidence with inclusive, bilingual support.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center"
          >
            <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 inline-flex items-center gap-3">
              <HandMetalIcon className="w-10 h-10 text-blue-600" />
              <span className="text-lg font-semibold text-gray-800">Interactive and Inclusive</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 text-center"
          >
            Powerful Features
          </motion.h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, idx) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-blue-50 rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <f.icon className="w-8 h-8 text-blue-600" />
                <h3 className="mt-4 font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-blue-900/80">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 text-center"
          >
            What Learners Say
          </motion.h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <div className="mt-4 text-gray-700 text-sm leading-relaxed">
                  <QuoteIcon className="w-4 h-4 inline text-blue-600 mr-2" />
                  {t.text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Signup anchor */}
      <section ref={signupRef} className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold text-white"
          >
            Join the movement toward inclusive learning.
          </motion.h2>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="inline-flex items-center px-6 py-3 rounded-xl bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-colors">
              Sign Up Now
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/login" className="inline-flex items-center px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-400 transition-colors">
              I already have an account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <a href="#about" className="hover:text-gray-900" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>About</a>
            <Link to="/" className="hover:text-gray-900">Contact</Link>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-gray-700"><TwitterIcon className="w-5 h-5" /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gray-700"><FacebookIcon className="w-5 h-5" /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gray-700"><InstagramIcon className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;


