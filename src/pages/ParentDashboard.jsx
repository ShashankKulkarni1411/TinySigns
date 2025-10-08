import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { lessonService } from '../services/lessonService';
import { 
  UsersIcon, 
  BookOpenIcon, 
  BarChartIcon, 
  ClockIcon,
  TrendingUpIcon,
  CalendarIcon,
  MessageCircleIcon,
  SettingsIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function ParentDashboard() {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [userProgress, setUserProgress] = useState({
    progress: 0,
    individualProgress: {
      mathematics: 0,
      science: 0,
      isl: 0
    }
  });
  const [overallStats, setOverallStats] = useState({
    totalChildren: 0,
    activeChildren: 0,
    totalLessonsCompleted: 0,
    averageScore: 0,
  });

  useEffect(() => {
    // Load user's progress
    if (user) {
      const progress = lessonService.getUserProgress();
      setUserProgress(progress);
    }

    // Mock data for children
    const mockChildren = [
      {
        id: 1,
        name: 'Emma Johnson',
        age: 8,
        grade: '3rd Grade',
        avatar: 'E',
        lastActive: '2 hours ago',
        progress: {
          isl: { completed: 3, total: 4, score: 85 },
          mathematics: { completed: 2, total: 5, score: 78 },
          science: { completed: 1, total: 3, score: 92 }
        }
      },
      {
        id: 2,
        name: 'Alex Johnson',
        age: 10,
        grade: '5th Grade',
        avatar: 'A',
        lastActive: '1 day ago',
        progress: {
          isl: { completed: 4, total: 4, score: 95 },
          mathematics: { completed: 4, total: 5, score: 88 },
          science: { completed: 2, total: 3, score: 85 }
        }
      }
    ];

    setChildren(mockChildren);
    
    // Calculate overall stats
    const totalLessons = mockChildren.reduce((acc, child) => {
      return acc + Object.values(child.progress).reduce((childAcc, module) => {
        return childAcc + module.completed;
      }, 0);
    }, 0);

    const totalScores = mockChildren.reduce((acc, child) => {
      return acc + Object.values(child.progress).reduce((childAcc, module) => {
        return childAcc + module.score;
      }, 0);
    }, 0);

    const totalModules = mockChildren.length * 3; // 3 modules per child

    setOverallStats({
      totalChildren: mockChildren.length,
      activeChildren: mockChildren.filter(child => child.lastActive.includes('hour')).length,
      totalLessonsCompleted: totalLessons,
      averageScore: Math.round(totalScores / totalModules),
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow p-6">
        <div className="container mx-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome, {user?.name || 'Parent'}
                </h1>
                <p className="text-indigo-100">
                  Monitor your children's learning progress and achievements
                </p>
              </div>
              <div className="bg-white/20 rounded-full p-4">
                <UsersIcon className="w-12 h-12" />
              </div>
            </div>
          </div>

          {/* User Progress Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">{userProgress.progress}%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{userProgress.individualProgress.mathematics}%</div>
                <div className="text-sm text-gray-600">Mathematics</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userProgress.individualProgress.science}%</div>
                <div className="text-sm text-gray-600">Science</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">{userProgress.individualProgress.isl}%</div>
                <div className="text-sm text-gray-600">ISL</div>
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
                  <p className="text-sm text-gray-600">Total Children</p>
                  <p className="text-2xl font-bold">{overallStats.totalChildren}</p>
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
                  <p className="text-2xl font-bold">{overallStats.activeChildren}</p>
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
                  <p className="text-2xl font-bold">{overallStats.totalLessonsCompleted}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <div className="bg-yellow-100 rounded-lg p-3">
                  <BarChartIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold">{overallStats.averageScore}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Children List */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Children</h2>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                Add Child
              </button>
            </div>

            <div className="space-y-4">
              {children.map((child) => (
                <div key={child.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <span className="text-indigo-600 font-bold text-lg">{child.avatar}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{child.name}</h3>
                        <p className="text-gray-600">{child.grade} • Age {child.age}</p>
                        <p className="text-sm text-gray-500">Last active: {child.lastActive}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Link
                        to={`/child-progress/${child.id}`}
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
                    {Object.entries(child.progress).map(([module, data]) => (
                      <div key={module} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {module === 'isl' ? 'ISL' : module}
                          </span>
                          <span className="text-sm text-gray-600">
                            {data.completed}/{data.total}
                          </span>
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
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <CalendarIcon className="w-6 h-6 text-indigo-600 mr-3" />
                <h3 className="text-lg font-semibold">Schedule</h3>
              </div>
              <p className="text-gray-600 mb-4">View and manage your children's learning schedule</p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                View Schedule
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <MessageCircleIcon className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold">Communicate</h3>
              </div>
              <p className="text-gray-600 mb-4">Message teachers and get updates</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                Open Messages
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <SettingsIcon className="w-6 h-6 text-gray-600 mr-3" />
                <h3 className="text-lg font-semibold">Settings</h3>
              </div>
              <p className="text-gray-600 mb-4">Manage account and notification preferences</p>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                Account Settings
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
