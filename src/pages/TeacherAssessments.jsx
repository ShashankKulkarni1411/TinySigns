import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeftIcon, AwardIcon, PlusIcon, EyeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TeacherAssessments() {
  const navigate = useNavigate();
  const [assessments] = useState([
    { 
      id: 1, 
      title: 'ISL Alphabet Quiz', 
      module: 'ISL', 
      date: '2025-01-15',
      students: 3,
      avgScore: 85,
      status: 'Graded'
    },
    { 
      id: 2, 
      title: 'Math Counting Test', 
      module: 'Mathematics', 
      date: '2025-01-16',
      students: 3,
      avgScore: 78,
      status: 'Pending'
    },
    { 
      id: 3, 
      title: 'Science Plants Quiz', 
      module: 'Science', 
      date: '2025-01-17',
      students: 3,
      avgScore: 92,
      status: 'Graded'
    }
  ]);

  const handleCreateAssessment = () => {
    navigate('/teacher/create-assessment');
  };

  const handleViewAssessment = (id) => {
    alert(`Viewing assessment ${id}`);
  };

  const getStatusColor = (status) => {
    return status === 'Graded' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <button
            onClick={() => navigate('/teacher-dashboard')}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-semibold"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-4 mr-4">
                  <AwardIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Assessments</h1>
                  <p className="text-gray-600">Create and grade student assessments</p>
                </div>
              </div>
              <button
                onClick={handleCreateAssessment}
                className="flex items-center bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-md"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Create Assessment
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assessments.map(assessment => (
                <div key={assessment.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-yellow-300 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{assessment.title}</h3>
                      <p className="text-sm text-gray-600">{assessment.module}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(assessment.status)}`}>
                      {assessment.status}
                    </span>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Students</p>
                        <p className="text-2xl font-bold text-indigo-600">{assessment.students}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Avg Score</p>
                        <p className={`text-2xl font-bold ${getScoreColor(assessment.avgScore)}`}>
                          {assessment.avgScore}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">{assessment.date}</p>

                  <button
                    onClick={() => handleViewAssessment(assessment.id)}
                    className="w-full flex items-center justify-center bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <EyeIcon className="w-5 h-5 mr-2" />
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}