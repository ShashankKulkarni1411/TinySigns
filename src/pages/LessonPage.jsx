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
  HomeIcon
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
      lessons: {
        1: { title: 'Counting Numbers 1-5', content: 'Learn to count from 1 to 5 with fun visual examples' },
        2: { title: 'Shapes and Colors', content: 'Explore basic shapes and colors through interactive activities' },
        3: { title: 'Counting Numbers 6-10', content: 'Continue learning numbers from 6 to 10 with engaging examples' },
        4: { title: 'Basic Addition', content: 'Start learning addition with visual counting methods' }
      }
    },
    'science': {
      name: 'Science',
      lessons: {
        1: { title: 'Plants & Trees', content: 'Learn about different types of plants and trees' },
        2: { title: 'Animals & Birds', content: 'Discover various animals, birds and their habitats' },
        3: { title: 'Water & Weather', content: 'Explore water cycle and different weather conditions' },
        4: { title: 'Day & Night', content: 'Learn about sun, moon, stars and day-night cycle' }
      }
    },
    'isl': {
      name: 'Indian Sign Language',
      lessons: {
        1: { title: 'Basic Greetings', content: 'Learn everyday greetings in Indian Sign Language' },
        2: { title: 'Alphabet A-J', content: 'Learn to sign the first 10 letters of the alphabet in ISL' },
        3: { title: 'Alphabet K-T', content: 'Continue learning the alphabet with letters K through T' },
        4: { title: 'Alphabet U-Z & Numbers', content: 'Complete the alphabet and learn numbers 1-10 in ISL' }
      }
    }
  };

  const currentModule = lessonData[moduleName];
  const currentLesson = currentModule?.lessons[lessonId];
  const lessonNum = parseInt(lessonId);
  const totalLessons = Object.keys(currentModule?.lessons || {}).length;

  // Resolve video source based on module and lesson title using mapping rules
  const videoSrc = useMemo(() => {
    if (!currentModule || !currentLesson) return null;
    return getVideoForLesson(currentModule.name, currentLesson.title);
  }, [currentModule, currentLesson]);

  const videoRef = useRef(null);

  useEffect(() => {
    // Start tracking time when component mounts
    const startTime = Date.now();
    
    return () => {
      // Calculate time spent when component unmounts
      const endTime = Date.now();
      const timeSpentMs = endTime - startTime;
      setTimeSpent(Math.floor(timeSpentMs / 1000)); // Convert to seconds
    };
  }, []);

  useEffect(() => {
    // Auto-play when video source changes and element is ready
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
      // All lessons completed, go to review page
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
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Lesson Not Found</h1>
            <Link to="/" className="text-blue-600 hover:text-blue-800">
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
                  {currentLesson.title}
                </h1>
                <p className="text-gray-600">
                  Lesson {lessonId} of {totalLessons} • {currentModule.name}
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  <span>{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
                </div>
                {lessonCompleted && (
                  <div className="flex items-center text-green-600">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    <span className="font-medium">Completed</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="text-center mb-8">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlayIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {currentLesson.title}
              </h2>
            </div>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed">
                {currentLesson.content}
              </p>
              
              {/* Video placeholder (now auto-plays mapped video when available) */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">
                  Lesson Video
                </h3>
                <div className="bg-white p-4 rounded border border-blue-200">
                  {videoSrc ? (
                    <video
                      ref={videoRef}
                      src={videoSrc}
                      controls
                      autoPlay
                      className="w-full rounded"
                    />
                  ) : (
                    <p className="text-blue-600 font-medium text-center">
                      No video available for this lesson.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex gap-4">
                <button
                  onClick={handlePreviousLesson}
                  disabled={lessonNum === 1}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    lessonNum === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Previous
                </button>

                <button
                  onClick={handleNextLesson}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {lessonNum < totalLessons ? (
                    <>
                      Next
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Finish Module
                      <CheckCircleIcon className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex gap-4">
                {!lessonCompleted && (
                  <button
                    onClick={handleCompleteLesson}
                    disabled={isLoading}
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Completing...
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-4 h-4 mr-2" />
                        Mark Complete
                      </>
                    )}
                  </button>
                )}

                <Link
                  to="/"
                  className="flex items-center bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  <HomeIcon className="w-4 h-4 mr-2" />
                  Home
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
