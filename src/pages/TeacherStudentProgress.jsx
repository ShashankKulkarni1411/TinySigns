import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeftIcon, TrendingUpIcon, BookOpenIcon, ClockIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export function TeacherStudentProgress() {
  const navigate = useNavigate();
  const { studentId } = useParams();

  // Mock student data
  const student = {
    id: studentId,
    name: 'Emma Johnson',
    grade: '3rd Grade',
    avatar: 'E',
    progress: {
      isl: { completed: 3, total: 4, score: 85, lessons: ['Basic Greetings', 'Alphabet A-J', 'Alphabet K-T'] },
      mathematics: { completed: 2, total: 5, score: 78, lessons: ['Counting Numbers 1-5', 'Shapes and Colors'] },
      science: { completed: 1, total: 3, score: 92, lessons: ['Plants & Trees'] }
    },
    recentActivity: [
      { date: '2 hours ago', activity: 'Completed ISL Alphabet K-T lesson', score: 88 },
      { date: '1 day ago', activity: 'Completed Math Shapes and Colors lesson', score: 82 },
      { date: '2 days ago', activity: 'Took Science Plants & Trees exam', score: 92 }
    ]
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
                  <p className="text-sm font-semibold text-gray-600 mb-2">Completed Lessons:</p>
                  <ul className="space-y-1">
                    {data.lessons.map((lesson, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {lesson}
                      </li>
                    ))}
                  </ul>
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