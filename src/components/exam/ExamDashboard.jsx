import React, { useState, useEffect } from 'react';
import { 
  TrophyIcon, 
  ClockIcon, 
  TargetIcon, 
  TrendingUpIcon,
  CalendarIcon,
  AwardIcon
} from 'lucide-react';
import { examService } from '../../services/examService';

export function ExamDashboard() {
  const [stats, setStats] = useState(null);
  const [recentResults, setRecentResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    try {
      const userStats = examService.getUserStats();
      const history = examService.getExamHistory();
      
      setStats(userStats);
      setRecentResults(history.slice(0, 5)); // Show last 5 exams
      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-100';
    if (percentage >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading your progress...</p>
      </div>
    );
  }

  if (!stats || stats.totalExams === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <TrophyIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">No Exams Taken Yet</h3>
        <p className="text-gray-600 mb-6">
          Start your learning journey by taking a practice exam!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800">Mathematics</h4>
            <p className="text-sm text-blue-600">Test your math skills</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-800">Science</h4>
            <p className="text-sm text-green-600">Explore the world</p>
          </div>
          <div className="bg-pink-50 rounded-lg p-4">
            <h4 className="font-semibold text-pink-800">Sign Language</h4>
            <p className="text-sm text-pink-600">Learn to communicate</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <TrophyIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Exams</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalExams}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <TargetIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full">
              <AwardIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Best Score</p>
              <p className="text-2xl font-bold text-gray-900">{stats.bestScore}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <ClockIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Time Spent</p>
              <p className="text-2xl font-bold text-gray-900">{formatTime(stats.totalTimeSpent)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Module Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(stats.moduleStats).map(([moduleName, moduleStats]) => (
            <div key={moduleName} className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">{moduleName}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Attempts:</span>
                  <span className="font-medium">{moduleStats.attempts}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Best Score:</span>
                  <span className={`font-medium ${getScoreColor(moduleStats.bestScore)}`}>
                    {moduleStats.bestScore}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Average:</span>
                  <span className="font-medium">{moduleStats.averageScore}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Attempt:</span>
                  <span className="font-medium text-xs">
                    {formatDate(moduleStats.lastAttempt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Results */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Exam Results</h3>
        {recentResults.length > 0 ? (
          <div className="space-y-3">
            {recentResults.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${getScoreBgColor(result.results.percentage)}`}></div>
                  <div>
                    <p className="font-medium text-gray-800">{result.moduleName}</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(result.timestamp)} • {formatTime(result.results.completionTime)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${getScoreColor(result.results.percentage)}`}>
                    {result.results.percentage}%
                  </p>
                  <p className="text-sm text-gray-600">
                    {result.results.correctAnswers}/{result.results.totalQuestions}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-4">No recent exam results</p>
        )}
      </div>

      {/* Achievement Badges */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.totalExams >= 1 && (
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <TrophyIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-yellow-800">First Exam</p>
            </div>
          )}
          {stats.bestScore >= 80 && (
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <AwardIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-800">High Achiever</p>
            </div>
          )}
          {stats.modulesCompleted >= 3 && (
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <TargetIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-800">All Modules</p>
            </div>
          )}
          {stats.totalExams >= 5 && (
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <TrendingUpIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-purple-800">Dedicated Learner</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
