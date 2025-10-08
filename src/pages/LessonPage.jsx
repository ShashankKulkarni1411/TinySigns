import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { lessonService } from '../services/lessonService';
import { getVideoForLesson } from '../services/videoLinkService';
import { 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  CheckCircleIcon, 
  ClockIcon,
  PlayIcon,
  HomeIcon,
  SparklesIcon
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export function LessonPage() {
  const { moduleName, lessonId } = useParams();
  const navigate = useNavigate();
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const lessonData = {
    'mathematics': {
      name: 'Mathematics',
      color: 'purple',
      gradient: 'from-purple-400 via-pink-400 to-red-400',
      bgGradient: 'from-purple-50 to-pink-50',
      lessons: {
        1: { title: 'Counting Numbers 1-5', content: 'Learn to count from 1 to 5 with fun visual examples', emoji: '🔢' },
        2: { title: 'Shapes and Colors', content: 'Explore basic shapes and colors through interactive activities', emoji: '🔷' },
        3: { title: 'Counting Numbers 6-10', content: 'Continue learning numbers from 6 to 10 with engaging examples', emoji: '🔟' },
        4: { title: 'Basic Addition', content: 'Start learning addition with visual counting methods', emoji: '➕' }
      }
    },
    'science': {
      name: 'Science',
      color: 'green',
      gradient: 'from-green-400 via-emerald-400 to-teal-400',
      bgGradient: 'from-green-50 to-emerald-50',
      lessons: {
        1: { title: 'Plants & Trees', content: 'Learn about different types of plants and trees', emoji: '🌳' },
        2: { title: 'Animals & Birds', content: 'Discover various animals, birds and their habitats', emoji: '🦜' },
        3: { title: 'Water & Weather', content: 'Explore water cycle and different weather conditions', emoji: '🌧️' },
        4: { title: 'Day & Night', content: 'Learn about sun, moon, stars and day-night cycle', emoji: '🌙' }
      }
    },
    'isl': {
      name: 'Indian Sign Language',
      color: 'blue',
      gradient: 'from-blue-400 via-indigo-400 to-purple-400',
      bgGradient: 'from-blue-50 to-indigo-50',
      lessons: {
        1: { title: 'Basic Greetings', content: 'Learn everyday greetings in Indian Sign Language', emoji: '👋' },
        2: { title: 'Alphabet A-J', content: 'Learn to sign the first 10 letters of the alphabet in ISL', emoji: '🔤' },
        3: { title: 'Alphabet K-T', content: 'Continue learning the alphabet with letters K through T', emoji: '✋' },
        4: { title: 'Alphabet U-Z & Numbers', content: 'Complete the alphabet and learn numbers 1-10 in ISL', emoji: '🤟' }
      }
    }
  };

  const currentModule = lessonData[moduleName];
  const currentLesson = currentModule?.lessons[lessonId];
  const lessonNum = parseInt(lessonId);
  const totalLessons = Object.keys(currentModule?.lessons || {}).length;

  const videoSrc = useMemo(() => {
    if (!currentModule || !currentLesson) return null;
    return getVideoForLesson(currentModule.name, currentLesson.title);
  }, [currentModule, currentLesson]);

  const videoRef = useRef(null);

  useEffect(() => {
    const startTime = Date.now();
    return () => {
      const endTime = Date.now();
      const timeSpentMs = endTime - startTime;
      setTimeSpent(Math.floor(timeSpentMs / 1000));
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      try {
        videoRef.current.play().catch(() => {});
      } catch (_) {}
    }
  }, [videoSrc]);

  const handleCompleteLesson = async () => {
    if (lessonCompleted) return;
    
    setIsLoading(true);
    try {
      await lessonService.completeLesson(currentModule.name, lessonNum, timeSpent);
      setLessonCompleted(true);
    } catch (error) {
      console.error('Error completing lesson:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextLesson = () => {
    if (lessonNum < totalLessons) {
      navigate(`/${moduleName}/lesson/${lessonNum + 1}`);
    } else {
      navigate(`/review/${moduleName}`);
    }
  };

  const handlePreviousLesson = () => {
    if (lessonNum > 1) {
      navigate(`/${moduleName}/lesson/${lessonNum - 1}`);
    }
  };

  if (!currentModule || !currentLesson) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="text-center bg-white rounded-3xl shadow-2xl p-12 max-w-md">
            <div className="text-8xl mb-6">😕</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops! Lesson Not Found</h1>
            <Link to="/home" className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all">
              <HomeIcon className="w-6 h-6 mr-2" />
              Go Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const colorClasses = {
    purple: {
      badge: 'bg-purple-100 text-purple-800 border-purple-300',
      button: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      iconBg: 'bg-gradient-to-br from-purple-400 to-pink-400',
      videoBg: 'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200'
    },
    green: {
      badge: 'bg-green-100 text-green-800 border-green-300',
      button: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
      iconBg: 'bg-gradient-to-br from-green-400 to-emerald-400',
      videoBg: 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-200'
    },
    blue: {
      badge: 'bg-blue-100 text-blue-800 border-blue-300',
      button: 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600',
      iconBg: 'bg-gradient-to-br from-blue-400 to-indigo-400',
      videoBg: 'bg-gradient-to-br from-blue-100 to-indigo-100 border-blue-200'
    }
  };

  const colors = colorClasses[currentModule.color];

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-br ${currentModule.bgGradient}`}>
      <Header />
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Link 
              to={`/${moduleName}`}
              className="inline-flex items-center bg-white text-gray-700 hover:text-gray-900 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all font-semibold text-lg"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to {currentModule.name}
            </Link>
          </div>

          {/* Hero Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border-4 border-white">
            <div className="flex flex-col items-center text-center mb-8">
              {/* Large Emoji Icon */}
              <div className={`w-32 h-32 rounded-full ${colors.iconBg} flex items-center justify-center mb-6 shadow-xl transform hover:scale-110 transition-transform`}>
                <span className="text-7xl">{currentLesson.emoji}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 leading-tight">
                {currentLesson.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                <span className={`px-6 py-3 rounded-full border-2 ${colors.badge} font-bold text-lg shadow-md`}>
                  Lesson {lessonId} of {totalLessons}
                </span>
                <div className="flex items-center bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-bold text-lg shadow-md">
                  <ClockIcon className="w-6 h-6 mr-2" />
                  <span>{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
                </div>
                {lessonCompleted && (
                  <div className="flex items-center bg-green-100 text-green-700 border-2 border-green-300 px-6 py-3 rounded-full font-bold text-lg shadow-md animate-pulse">
                    <CheckCircleIcon className="w-6 h-6 mr-2" />
                    <span>Completed! 🎉</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xl text-gray-600 max-w-3xl leading-relaxed font-medium">
                {currentLesson.content}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-600">Module Progress</span>
                <span className="text-sm font-bold text-gray-600">{lessonNum}/{totalLessons} Lessons</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                <div 
                  className={`h-full bg-gradient-to-r ${currentModule.gradient} rounded-full transition-all duration-500 shadow-md`}
                  style={{ width: `${(lessonNum / totalLessons) * 100}%` }}
                />
              </div>
            </div>

            {/* Video Section */}
            <div className={`p-8 rounded-2xl ${colors.videoBg} border-4 shadow-lg`}>
              <div className="flex items-center justify-center mb-6">
                <PlayIcon className="w-8 h-8 mr-3 text-gray-700" />
                <h3 className="text-3xl font-black text-gray-800">
                  Watch & Learn 📺
                </h3>
              </div>
              <div className="bg-white p-2 rounded-xl shadow-xl">
                {videoSrc ? (
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    controls
                    autoPlay
                    className="w-full rounded-lg shadow-md"
                  />
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex flex-col items-center justify-center p-12">
                    <PlayIcon className="w-20 h-20 text-gray-400 mb-4" />
                    <p className="text-gray-500 font-bold text-xl text-center">
                      Video coming soon! 🎬
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons - Mobile Optimized */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border-4 border-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Navigation Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handlePreviousLesson}
                  disabled={lessonNum === 1}
                  className={`flex-1 flex items-center justify-center px-6 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${
                    lessonNum === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600 transform hover:scale-105'
                  }`}
                >
                  <ArrowLeftIcon className="w-6 h-6 mr-2" />
                  Previous
                </button>

                <button
                  onClick={handleNextLesson}
                  className={`flex-1 flex items-center justify-center ${colors.button} text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg transform hover:scale-105`}
                >
                  {lessonNum < totalLessons ? (
                    <>
                      Next
                      <ArrowRightIcon className="w-6 h-6 ml-2" />
                    </>
                  ) : (
                    <>
                      Finish 🎓
                      <SparklesIcon className="w-6 h-6 ml-2" />
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {!lessonCompleted && (
                  <button
                    onClick={handleCompleteLesson}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg disabled:opacity-50 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-6 h-6 mr-2" />
                        Complete ✓
                      </>
                    )}
                  </button>
                )}

                <Link
                  to="/home"
                  className="flex-1 flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg transform hover:scale-105"
                >
                  <HomeIcon className="w-6 h-6 mr-2" />
                  Home 🏠
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}