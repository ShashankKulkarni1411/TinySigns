import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ExamDashboard } from '../components/exam/ExamDashboard';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';

export function ExamDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />

      {/* Hero section (matches Home page style) */}
      <section className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-16 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Learning Progress
          </h1>
          <p className="text-xl text-indigo-100">
            Track your exams, monitor achievements, and keep improving every day
          </p>
        </div>
      </section>

      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header / Navigation */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-indigo-100">
            <Link 
              to="/" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-3 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-indigo-800 mb-2">
              Your Learning Progress
            </h1>
            <p className="text-gray-600">
              Track your exam results and learning achievements
            </p>
          </div>

          {/* Dashboard Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-indigo-100">
            <ExamDashboard />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
