import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProgressBar, CircularProgress } from '../components/progress/ProgressBar';
import { lessonService } from '../services/lessonService';
import { examService } from '../services/examService';
import { 
  ClockIcon, 
  TrophyIcon, 
  TargetIcon, 
  PlayIcon, 
  RotateCcwIcon,
  ArrowLeftIcon,
  HomeIcon,
  TrendingUpIcon,
  BookOpenIcon
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export function ReviewLessons() {
  const { moduleName } = useParams();
  const navigate = useNavigate();
  const [moduleStats, setModuleStats] = useState(null);
  const [examResults, setExamResults] = useState(null);
  const [improvementAreas, setImprovementAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  const moduleConfig = {
    'mathematics': { 
      name: 'Mathematics', 
      totalLessons: 4, 
      color: 'blue',
      lessons: [
        { id: 1, title: 'Counting Numbers 1-5', duration: '15 min' },
        { id: 2, title: 'Shapes and Colors', duration: '20 min' },
        { id: 3, title: 'Counting Numbers 6-10', duration: '15 min' },
        { id: 4, title: 'Basic Addition', duration: '25 min' }
      ]
    },
    'science': { 
      name: 'Science', 
      totalLessons: 4, 
      color: 'green',
      lessons: [
        { id: 1, title: 'Plants & Trees', duration: '15 min' },
        { id: 2, title: 'Animals & Birds', duration: '20 min' },
        { id: 3, title: 'Water & Weather', duration: '15 min' },
        { id: 4, title: 'Day & Night', duration: '15 min' }
      ]
    },
    'isl': { 
      name: 'Indian Sign Language', 
      totalLessons: 4, 
      color: 'pink',
      lessons: [
        { id: 1, title: 'Basic Greetings', duration: '10 min' },
        { id: 2, title: 'Alphabet A-J', duration: '20 min' },
        { id: 3, title: 'Alphabet K-T', duration: '20 min' },
        { id: 4, title: 'Alphabet U-Z & Numbers', duration: '25 min' }
      ]
    }
  };

  const currentModule = moduleConfig[moduleName];

  useEffect(() => {
    if (currentModule) {
      loadReviewData();
    }
  }, [moduleName]);

  const loadReviewData = () => {
    try {
      // Get module statistics
      const stats = lessonService.getModuleStats(currentModule.name, currentModule.totalLessons);
      setModuleStats(stats);

      // Get latest exam results
      const moduleExamResults = examService.getModuleExamResults(currentModule.name);
      if (moduleExamResults.length > 0) {
        const latestExam = moduleExamResults[moduleExamResults.length - 1];
        setExamResults(latestExam.results);
      }

      // Get improvement areas
      const areas = lessonService.getImprovementAreas(currentModule.name, examResults);
      setImprovementAreas(areas);

      setLoading(false);
    } catch (error) {
      console.error('Error loading review data:', error);
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

  const handleRewatchLesson = async (lessonId) => {
    try {
      await lessonService.rewatchLesson(currentModule.name, lessonId, 0);
      // Navigate to the lesson
      navigate(`/${moduleName}/lesson/${lessonId}`);
    } catch (error) {
      console.error('Error rewatching lesson:', error);
    }
  };

  const handleRewatchAllLessons = () => {
    // Navigate to the first lesson
    navigate(`/${moduleName}/lesson/1`);
  };

  const handleRetakeExam = () => {
    navigate(`/${moduleName}/exam`);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your review data...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!currentModule) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Module Not Found</h1>
            <Link to="/home" className="text-blue-600 hover:text-blue-800">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Link 
                to={`/${moduleName}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to {currentModule.name}
              </Link>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {currentModule.name} Review
                </h1>
                <p className="text-gray-600">
                  Review your progress and identify areas for improvement
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <CircularProgress
                  progress={moduleStats.completedLessons}
                  total={currentModule.totalLessons}
                  color={currentModule.color}
                  size={100}
                />
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className={`bg-${currentModule.color}-100 p-3 rounded-full`}>
                  <BookOpenIcon className={`w-6 h-6 text-${currentModule.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Lessons Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {moduleStats.completedLessons}/{currentModule.totalLessons}
                  </p>
                </div>
              </div>
              <ProgressBar
                progress={moduleStats.completedLessons}
                total={currentModule.totalLessons}
                label=""
                color={currentModule.color}
                size="small"
                showCount={false}
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <ClockIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Time Spent</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatTime(moduleStats.totalTimeSpent)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Average: {moduleStats.averageWatchCount}x per lesson
              </p>
            </div>

            {examResults && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <TrophyIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Latest Exam Score</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {examResults.percentage}%
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {examResults.correctAnswers}/{examResults.totalQuestions} correct
                </p>
              </div>
            )}
          </div>

          {/* Improvement Areas */}
          {improvementAreas.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center mb-4">
                <TrendingUpIcon className="w-6 h-6 text-orange-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">Areas for Improvement</h2>
              </div>
              
              <div className="space-y-3">
                {improvementAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-orange-800">{area.area}</h3>
                      <p className="text-sm text-orange-700">{area.suggestion}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      area.priority === 'high' ? 'bg-red-100 text-red-800' :
                      area.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {area.priority} priority
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lesson Review Options */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Review Options</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={handleRewatchAllLessons}
                className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <PlayIcon className="w-6 h-6 text-blue-600 mr-3" />
                <div className="text-left">
                  <h3 className="font-semibold text-blue-800">Rewatch All Lessons</h3>
                  <p className="text-sm text-blue-600">Start from the beginning</p>
                </div>
              </button>

              {examResults && (
                <button
                  onClick={handleRetakeExam}
                  className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <RotateCcwIcon className="w-6 h-6 text-green-600 mr-3" />
                  <div className="text-left">
                    <h3 className="font-semibold text-green-800">Retake Practice Exam</h3>
                    <p className="text-sm text-green-600">Test your knowledge again</p>
                  </div>
                </button>
              )}
            </div>

            {/* Individual Lessons */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Individual Lessons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentModule.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleRewatchLesson(lesson.id)}
                    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                  >
                    <div>
                      <h4 className="font-medium text-gray-800">{lesson.title}</h4>
                      <p className="text-sm text-gray-600">{lesson.duration}</p>
                    </div>
                    <PlayIcon className="w-5 h-5 text-gray-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`/${moduleName}`}
              className="flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Module
            </Link>
            
            <Link
              to="/home"
              className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
