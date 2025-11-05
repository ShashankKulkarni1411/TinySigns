import React, { useState, useEffect } from 'react';
import { TeacherHeader } from '../components/TeacherHeader';
import { Footer } from '../components/Footer';
import { AddStudentModal } from '../components/AddStudentModal';
import { useAuth } from '../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
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
  AlertTriangleIcon,
  PlusIcon,
  FileTextIcon,
  EyeIcon
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function TeacherDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [teacherData, setTeacherData] = useState(null);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [classStats, setClassStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    averageScore: 0,
    lessonsCompleted: 0,
  });

  useEffect(() => {
    if (user && user.email) {
      loadTeacherData();
    }
  }, [user]);

  const loadTeacherData = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      // Fetch teacher data
      const response = await fetch(`${API_URL}/api/teacher/${user.email}`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch teacher data');
      const data = await response.json();
      setTeacherData(data);

      // Set class stats from teacher data
      setClassStats({
        totalStudents: data.totalStudents || 0,
        activeStudents: data.activeToday || 0,
        averageScore: data.classAverage || 0,
        lessonsCompleted: data.lessonsCompleted || 0,
      });

      // Fetch teacher's students list
      const studentsResponse = await fetch(`${API_URL}/api/teacher/${user.email}/students`, {
        credentials: 'include'
      });
      if (studentsResponse.ok) {
        const studentsData = await studentsResponse.json();
        setStudents(studentsData);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error('Error loading teacher data:', error);
      setClassStats({
        totalStudents: 0,
        activeStudents: 0,
        averageScore: 0,
        lessonsCompleted: 0,
      });
      setStudents([]);
    }
  };

  const handleAddStudentSuccess = (data) => {
    // Refresh teacher data and students list
    loadTeacherData();
    toast.success('Student added successfully!');
  };

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

  const handleAddStudent = () => {
    setShowAddStudentModal(true);
  };

  const handleGenerateReport = () => {
    navigate('/teacher/reports');
  };

  const handleViewProgress = (studentId) => {
    navigate(`/teacher/student-progress/${studentId}`);
  };

  const handleMessage = (studentId) => {
    navigate(`/teacher/messages/${studentId}`);
  };

  const handleLessonPlans = () => {
    navigate('/teacher/lesson-plans');
  };

  const handleAssessments = () => {
    navigate('/teacher/assessments');
  };

  const handleMessages = () => {
    navigate('/teacher/messages');
  };

  const handleSettings = () => {
    navigate('/teacher/settings');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Toaster position="top-right" />
      <TeacherHeader />
      <AddStudentModal
        isOpen={showAddStudentModal}
        onClose={() => setShowAddStudentModal(false)}
        onSuccess={handleAddStudentSuccess}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 text-white py-16 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome Back, {user?.name || 'Teacher'}! 👋
              </h1>
              <p className="text-xl text-green-100">
                Monitor your students' progress and manage your classroom
              </p>
            </div>
            <div className="hidden md:block bg-white/20 rounded-full p-6 backdrop-blur-sm">
              <BookOpenIcon className="w-16 h-16" />
            </div>
          </div>
        </div>
      </section>

      <main className="flex-grow py-12">
        <div className="container mx-auto px-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4">
                  <UsersIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900">{classStats.totalStudents || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-green-100">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-4">
                  <TrendingUpIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Today</p>
                  <p className="text-3xl font-bold text-gray-900">{classStats.activeStudents || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-4">
                  <BookOpenIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Lessons Completed</p>
                  <p className="text-3xl font-bold text-gray-900">{classStats.lessonsCompleted || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-yellow-100">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-4">
                  <BarChartIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Class Average</p>
                  <p className="text-3xl font-bold text-gray-900">{classStats.averageScore || 0}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Students Needing Help Alert */}
          {studentsNeedingHelp.length > 0 && (
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6 mb-8 shadow-md">
              <div className="flex items-start">
                <div className="bg-yellow-100 rounded-full p-3">
                  <AlertTriangleIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-xl font-bold text-yellow-800 mb-2">
                    Students Need Attention
                  </h3>
                  <p className="text-yellow-700 text-lg">
                    {studentsNeedingHelp.length} student(s) are struggling with certain modules and may need additional support.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Students List */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-indigo-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Your Students 📚</h2>
              <div className="flex gap-3">
                <button 
                  onClick={handleAddStudent}
                  className="flex items-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-md"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Add Student
                </button>
                <button 
                  onClick={handleGenerateReport}
                  className="flex items-center bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-md"
                >
                  <FileTextIcon className="w-5 h-5 mr-2" />
                  Generate Report
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {students.map((student) => (
                <div key={student.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-300 transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                    <div className="flex items-center mb-4 lg:mb-0">
                      <div className="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center mr-4 shadow-md">
                        <span className="text-white font-bold text-2xl">{student.avatar}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
                        <p className="text-gray-600 text-lg">{student.grade}</p>
                        <p className="text-sm text-gray-500">Last active: {student.lastActive}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-sm text-gray-600 mr-4 font-medium">
                            Attendance: {student.attendance}%
                          </span>
                          <span className={`text-sm px-3 py-1 rounded-full font-semibold ${getBehaviorColor(student.behavior)}`}>
                            {student.behavior}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleViewProgress(student.id)}
                        className="flex items-center bg-blue-100 hover:bg-blue-200 text-blue-700 px-5 py-3 rounded-xl transition-colors font-semibold shadow-sm"
                      >
                        <EyeIcon className="w-5 h-5 mr-2" />
                        View Progress
                      </button>
                      <button 
                        onClick={() => handleMessage(student.id)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl transition-colors shadow-sm"
                      >
                        <MessageCircleIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(student.progress).map(([module, data]) => (
                      <div key={module} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-bold text-gray-800 capitalize">
                            {module === 'isl' ? 'ISL' : module}
                          </span>
                          <div className="flex items-center">
                            {data.needsHelp && (
                              <AlertTriangleIcon className="w-5 h-5 text-yellow-500 mr-2" />
                            )}
                            <span className="text-sm text-gray-600 font-semibold">
                              {data.completed}/{data.total}
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-3 mb-2">
                          <div
                            className={`h-3 rounded-full transition-all ${getProgressColor(data.completed, data.total)}`}
                            style={{ width: `${getProgressWidth(data.completed, data.total)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 font-medium">Score: {data.score}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button 
              onClick={handleLessonPlans}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-indigo-100 text-left"
            >
              <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl p-4 inline-block mb-4">
                <CalendarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Lesson Plans</h3>
              <p className="text-gray-600 mb-4">Create and manage your lesson plans</p>
              <span className="text-indigo-600 font-semibold">Manage Plans →</span>
            </button>

            <button 
              onClick={handleAssessments}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-yellow-100 text-left"
            >
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-4 inline-block mb-4">
                <AwardIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Assessments</h3>
              <p className="text-gray-600 mb-4">Create and grade assessments</p>
              <span className="text-yellow-600 font-semibold">View Assessments →</span>
            </button>

            <button 
              onClick={handleMessages}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-green-100 text-left"
            >
              <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-4 inline-block mb-4">
                <MessageCircleIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Messages</h3>
              <p className="text-gray-600 mb-4">Message parents and students</p>
              <span className="text-green-600 font-semibold">Open Messages →</span>
            </button>

            <button 
              onClick={handleSettings}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-gray-200 text-left"
            >
              <div className="bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl p-4 inline-block mb-4">
                <SettingsIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Settings</h3>
              <p className="text-gray-600 mb-4">Manage your classroom settings</p>
              <span className="text-gray-600 font-semibold">Settings →</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}