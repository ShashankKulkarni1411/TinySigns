import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ExamDashboard } from '../components/exam/ExamDashboard';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';

export function ExamDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Your Learning Progress</h1>
            <p className="text-gray-600 mt-2">
              Track your exam results and learning achievements
            </p>
          </div>

          {/* Dashboard Content */}
          <ExamDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
