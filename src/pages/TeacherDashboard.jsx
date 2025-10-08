import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { 
  UsersIcon, 
  BookOpenIcon, 
  BarChartIcon, 
  ClockIcon,
  TrendingUpIcon,
  CalendarIcon,
  MessageCircleIcon,
  SettingsIcon,
  AwardIcon,
  AlertTriangleIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function TeacherDashboard() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [classStats, setClassStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    averageScore: 0,
    lessonsCompleted: 0,
  });

  useEffect(() => {
    // Mock data for students
    const mockStudents = [
      {
        id: 1,
        name: 'Emma Johnson',
        grade: '3rd Grade',
        avatar: 'E',
        lastActive: '2 hours ago',
        progress: {
          isl: { completed: 3, total: 4, score: 85, needsHelp: false },
          mathematics: { completed: 2, total: 5, score: 78, needsHelp: true },
          science: { completed: 1, total: 3, score: 92, needsHelp: false }
        },
        attendance: 95,
        behavior: 'Excellent'
      },
      {
        id: 2,
        name: 'Alex Johnson',
        grade: '5th Grade',
        avatar: 'A',
        lastActive: '1 day ago',
        progress: {
          isl: { completed: 4, total: 4, score: 95, needsHelp: false },
          mathematics: { completed: 4, total: 5, score: 88, needsHelp: false },
          science: { completed: 2, total: 3, score: 85, needsHelp: false }
        },
        attendance: 98,
        behavior: 'Good'
      },
      {
        id: 3,
        name: 'Sarah Wilson',
        grade: '4th Grade',
        avatar: 'S',
        lastActive: '3 hours ago',
        progress: {
          isl: { completed: 2, total: 4, score: 65, needsHelp: true },
          mathematics: { completed: 1, total: 5, score: 72, needsHelp: true },
          science: { completed: 3, total: 3, score: 88, needsHelp: false }
        },
        attendance: 87,
        behavior: 'Needs Attention'
      }
    ];

    setStudents(mockStudents);
    
    // Calculate class stats
    const totalLessons = mockStudents.reduce((acc, student) => {
      return acc + Object.values(student.progress).reduce((studentAcc, module) => {
        return studentAcc + module.completed;
      }, 0);
    }, 0);

    const totalScores = mockStudents.reduce((acc, student) => {
      return acc + Object.values(student.progress).reduce((studentAcc, module) => {
        return studentAcc + module.score;
      }, 0);
    }, 0);

    const totalModules = mockStudents.length * 3; // 3 modules per student

    setClassStats({
      totalStudents: mockStudents.length,
      activeStudents: mockStudents.filter(student => student.lastActive.includes('hour')).length,
      averageScore: Math.round(totalScores / totalModules),
      lessonsCompleted: totalLessons,
    });
  }, []);

  const getProgressColor = (completed, total) => {
    const percentage = (completed / total) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressWidth = (completed, total) => {
    return (completed / total) * 100;
  };

  const getBehaviorColor = (behavior) => {
    switch (behavior) {
      case 'Excellent': return 'text-green-600 bg-green-100';
      case 'Good': return 'text-blue-600 bg-blue-100';
      case 'Needs Attention': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const studentsNeedingHelp = students.filter(student => 
    Object.values(student.progress).some(module => module.needsHelp)
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow p-6">
        <div className="container mx-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome, {user?.name || 'Teacher'}
                </h1>
                <p className="text-green-100">
                  Monitor your students' progress and manage your classroom
                </p>
              </div>
              <div className="bg-white/20 rounded-full p-4">
                <BookOpenIcon className="w-12 h-12" />
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-lg p-3">
                  <UsersIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold">{classStats.totalStudents}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-lg p-3">
                  <TrendingUpIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Active Today</p>
                  <p className="text-2xl font-bold">{classStats.activeStudents}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-lg p-3">
                  <BookOpenIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Lessons Completed</p>
                  <p className="text-2xl font-bold">{classStats.lessonsCompleted}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <div className="bg-yellow-100 rounded-lg p-3">
                  <BarChartIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Class Average</p>
                  <p className="text-2xl font-bold">{classStats.averageScore}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Students Needing Help Alert */}
          {studentsNeedingHelp.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertTriangleIcon className="w-6 h-6 text-yellow-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800">
                    Students Need Attention
                  </h3>
                  <p className="text-yellow-700">
                    {studentsNeedingHelp.length} student(s) are struggling with certain modules and may need additional support.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Students List */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Students</h2>
              <div className="flex space-x-2">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Add Student
                </button>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Generate Report
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <span className="text-indigo-600 font-bold text-lg">{student.avatar}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
                        <p className="text-gray-600">{student.grade}</p>
                        <p className="text-sm text-gray-500">Last active: {student.lastActive}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-600 mr-4">Attendance: {student.attendance}%</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getBehaviorColor(student.behavior)}`}>
                            {student.behavior}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Link
                        to={`/student-progress/${student.id}`}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-lg transition-colors"
                      >
                        View Progress
                      </Link>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg transition-colors">
                        <MessageCircleIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(student.progress).map(([module, data]) => (
                      <div key={module} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {module === 'isl' ? 'ISL' : module}
                          </span>
                          <div className="flex items-center">
                            {data.needsHelp && (
                              <AlertTriangleIcon className="w-4 h-4 text-yellow-500 mr-1" />
                            )}
                            <span className="text-sm text-gray-600">
                              {data.completed}/{data.total}
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(data.completed, data.total)}`}
                            style={{ width: `${getProgressWidth(data.completed, data.total)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Score: {data.score}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <CalendarIcon className="w-6 h-6 text-indigo-600 mr-3" />
                <h3 className="text-lg font-semibold">Lesson Plans</h3>
              </div>
              <p className="text-gray-600 mb-4">Create and manage your lesson plans</p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                Manage Plans
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <AwardIcon className="w-6 h-6 text-yellow-600 mr-3" />
                <h3 className="text-lg font-semibold">Assessments</h3>
              </div>
              <p className="text-gray-600 mb-4">Create and grade assessments</p>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors">
                View Assessments
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <MessageCircleIcon className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold">Communicate</h3>
              </div>
              <p className="text-gray-600 mb-4">Message parents and students</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                Open Messages
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <SettingsIcon className="w-6 h-6 text-gray-600 mr-3" />
                <h3 className="text-lg font-semibold">Settings</h3>
              </div>
              <p className="text-gray-600 mb-4">Manage your classroom settings</p>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
