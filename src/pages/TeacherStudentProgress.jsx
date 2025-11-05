import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeftIcon, TrendingUpIcon, BookOpenIcon, ClockIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function TeacherStudentProgress() {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (studentId) {
      loadStudentProgress();
    }

    // Listen for real-time progress updates
    const handleProgressUpdate = (event) => {
      const { studentId: updatedStudentId } = event.detail;
      // If this is the student we're viewing, reload data
      if (studentId === updatedStudentId || student?.email === event.detail.studentEmail) {
        loadStudentProgress();
      }
    };

    window.addEventListener('progressUpdated', handleProgressUpdate);
    return () => {
      window.removeEventListener('progressUpdated', handleProgressUpdate);
    };
  }, [studentId]);

  const loadStudentProgress = async () => {
    try {
      setLoading(true);
      setError(null);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${API_URL}/api/teacher/student/${encodeURIComponent(studentId)}/progress`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch student progress');
      }
      
      const data = await response.json();
      setStudent(data);
    } catch (error) {
      console.error('Error loading student progress:', error);
      setError(error.message || 'Failed to load student progress');
    } finally {
      setLoading(false);
    }
  };

  const getProgressWidth = (completed, total) => {
    return (completed / total) * 100;
  };

  const getProgressColor = (completed, total) => {
    const percentage = (completed / total) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <Header />
        <main className="flex-grow py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <div className="text-xl text-gray-600">Loading student progress...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <Header />
        <main className="flex-grow py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Failed to load student progress</h2>
            <p className="text-gray-600 mb-6">{error || 'Student not found'}</p>
            <button
              onClick={() => navigate('/teacher-dashboard')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Back to Dashboard
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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

          {/* Student Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-indigo-100">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full w-24 h-24 flex items-center justify-center mr-6 shadow-md">
                <span className="text-white font-bold text-4xl">{student.avatar}</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800">{student.name}</h1>
                <p className="text-xl text-gray-600">{student.grade}</p>
              </div>
            </div>
          </div>

          {/* Module Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.entries(student.progress).map(([module, data]) => (
              <div key={module} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <BookOpenIcon className="w-8 h-8 text-indigo-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800 capitalize">
                    {module === 'isl' ? 'ISL' : module}
                  </h3>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-600">Progress</span>
                    <span className="text-sm font-bold text-gray-800">
                      {data.completed}/{data.total} lessons
                    </span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${getProgressColor(data.completed, data.total)}`}
                      style={{ width: `${getProgressWidth(data.completed, data.total)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Average Score</p>
                    <p className="text-3xl font-bold text-indigo-600">{data.score}%</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">Progress Details:</p>
                  <p className="text-sm text-gray-700">
                    {data.completed} of {data.total} lessons completed
                  </p>
                  {data.needsHelp && (
                    <p className="text-xs text-yellow-600 mt-2 font-semibold">⚠️ May need additional support</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="flex items-center mb-6">
              <ClockIcon className="w-8 h-8 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
            </div>

            <div className="space-y-4">
              {student.recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-800">{activity.activity}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-indigo-600">{activity.score}%</p>
                    <p className="text-xs text-gray-500">Score</p>
                  </div>
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