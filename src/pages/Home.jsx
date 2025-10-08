import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { BookOpenIcon, ActivityIcon, FlaskConicalIcon, ArrowRightIcon, TrendingUpIcon } from 'lucide-react';
import { ProgressBar } from '../components/progress/ProgressBar';
import { lessonService } from '../services/lessonService';
import { useAuth } from '../contexts/AuthContext';

export function Home() {
  const [overallProgress, setOverallProgress] = useState(null);
  const { user, isAuthenticated, syncUserProgress } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      syncUserProgress();
      loadOverallProgress();
    }
  }, [isAuthenticated, user]);

  const loadOverallProgress = () => {
    const moduleConfigs = [
      { name: 'Mathematics', totalLessons: 4 },
      { name: 'Science', totalLessons: 4 },
      { name: 'Indian Sign Language', totalLessons: 4 }
    ];
    const progress = lessonService.getOverallProgress(moduleConfigs);
    setOverallProgress(progress);
  };

  return <div className="flex flex-col min-h-screen bg-blue-50">
      <Header />
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Learning Made Visual
            </h1>
            <p className="text-xl mb-8">
              Fun, interactive lessons in Indian Sign Language for pre-primary
              students
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-bold py-3 px-6 rounded-full text-lg inline-flex items-center transition-colors">
                Start Learning Now
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg inline-flex items-center transition-colors">
                View Progress
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
        {/* Overall Progress Section - Only show for authenticated users */}
        {isAuthenticated && overallProgress && overallProgress.totalLessons > 0 && (
          <section className="py-8 px-4 bg-white">
            <div className="container mx-auto">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <TrendingUpIcon className="w-8 h-8 mr-3" />
                    <div>
                      <h3 className="text-xl font-bold">Your Learning Progress</h3>
                      <p className="text-blue-100">
                        {overallProgress.completedLessons} of {overallProgress.totalLessons} lessons completed
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{overallProgress.overallCompletionPercentage}%</div>
                    <div className="text-sm text-blue-100">Complete</div>
                  </div>
                </div>
                <ProgressBar
                  progress={overallProgress.completedLessons}
                  total={overallProgress.totalLessons}
                  label=""
                  color="white"
                  size="medium"
                  showCount={false}
                  showPercentage={false}
                />
              </div>
            </div>
          </section>
        )}

        {/* Learning modules section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-indigo-800">
              Our Learning Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* ISL Module */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-pink-500 p-6 flex justify-center">
                  <BookOpenIcon className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-pink-600">
                      Indian Sign Language
                    </h3>
                    {isAuthenticated && overallProgress && (
                      <span className="text-sm font-medium text-gray-500">
                        {overallProgress.moduleStats['Indian Sign Language']?.completedLessons || 0}/4
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">
                    Learn basic signs through fun, interactive games and videos
                  </p>
                  {isAuthenticated && overallProgress && (
                    <div className="mb-4">
                      <ProgressBar
                        progress={overallProgress.moduleStats['Indian Sign Language']?.completedLessons || 0}
                        total={4}
                        label=""
                        color="pink"
                        size="small"
                        showCount={false}
                        showPercentage={false}
                      />
                    </div>
                  )}
                  <Link to="/isl" className="inline-block bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Explore ISL
                  </Link>
                </div>
              </div>
              {/* Mathematics Module */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-blue-500 p-6 flex justify-center">
                  <ActivityIcon className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-blue-600">
                      Mathematics
                    </h3>
                    {isAuthenticated && overallProgress && (
                      <span className="text-sm font-medium text-gray-500">
                        {overallProgress.moduleStats['Mathematics']?.completedLessons || 0}/4
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">
                    Visual counting, shapes, and basic number concepts
                  </p>
                  {isAuthenticated && overallProgress && (
                    <div className="mb-4">
                      <ProgressBar
                        progress={overallProgress.moduleStats['Mathematics']?.completedLessons || 0}
                        total={4}
                        label=""
                        color="blue"
                        size="small"
                        showCount={false}
                        showPercentage={false}
                      />
                    </div>
                  )}
                  <Link to="/mathematics" className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Explore Math
                  </Link>
                </div>
              </div>
              {/* Science Module */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-green-500 p-6 flex justify-center">
                  <FlaskConicalIcon className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-green-600">
                      Science
                    </h3>
                    {isAuthenticated && overallProgress && (
                      <span className="text-sm font-medium text-gray-500">
                        {overallProgress.moduleStats['Science']?.completedLessons || 0}/4
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">
                    Discover plants, animals, and our world through visual
                    learning
                  </p>
                  {isAuthenticated && overallProgress && (
                    <div className="mb-4">
                      <ProgressBar
                        progress={overallProgress.moduleStats['Science']?.completedLessons || 0}
                        total={4}
                        label=""
                        color="green"
                        size="small"
                        showCount={false}
                        showPercentage={false}
                      />
                    </div>
                  )}
                  <Link to="/science" className="inline-block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Explore Science
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Features section */}
        <section className="bg-indigo-100 py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 text-indigo-800">
              Special Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src="https://cdn-icons-png.flaticon.com/512/4406/4406319.png" alt="Sign to Text" className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sign to Text</h3>
                <p className="text-gray-600">
                  Use your webcam to translate sign language gestures into text
                  in real-time
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="bg-teal-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src="https://cdn-icons-png.flaticon.com/512/3426/3426653.png" alt="Text to Sign" className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">Text to Sign</h3>
                <p className="text-gray-600">
                  Convert text into sign language videos and animations
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
}