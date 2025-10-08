import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { 
  BookOpenIcon, 
  AwardIcon, 
  StarIcon, 
  ChevronRightIcon, 
  FlaskConicalIcon, 
  ClockIcon, 
  CheckCircleIcon,
  SparklesIcon,
  TrophyIcon,
  RocketIcon,
  BeakerIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProgressBar } from '../components/progress/ProgressBar';
import { lessonService } from '../services/lessonService';

export function Science() {
  const [activeTab, setActiveTab] = useState('lessons');
  const [moduleStats, setModuleStats] = useState(null);

  useEffect(() => {
    loadModuleStats();
  }, []);

  const loadModuleStats = () => {
    const stats = lessonService.getModuleStats('Science', 4);
    setModuleStats(stats);
  };

  const lessons = [
    {
      id: 1,
      title: 'Plants & Trees',
      description: 'Learn about different types of plants and trees',
      image: '', // 👉 Fill in your image URL here
      duration: '15 min',
      completed: true,
      emoji: '🌳'
    },
    {
      id: 2,
      title: 'Animals & Birds',
      description: 'Discover various animals, birds and their habitats',
      image: '', // 👉 Fill in your image URL here
      duration: '20 min',
      completed: false,
      emoji: '🦜'
    },
    {
      id: 3,
      title: 'Water & Weather',
      description: 'Explore water cycle and different weather conditions',
      image: '', // 👉 Fill in your image URL here
      duration: '15 min',
      completed: false,
      emoji: '🌧️'
    },
    {
      id: 4,
      title: 'Day & Night',
      description: 'Learn about sun, moon, stars and day-night cycle',
      image: '', // 👉 Fill in your image URL here
      duration: '15 min',
      completed: false,
      emoji: '🌙'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      <main className="flex-grow">
        {/* Module Header - Enhanced */}
        <section className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 text-white py-12 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-8xl">🌳</div>
            <div className="absolute bottom-10 right-20 text-7xl">🦜</div>
            <div className="absolute top-20 right-10 text-6xl">🌍</div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center mb-6">
              <Link to="/home" className="text-white/80 hover:text-white font-medium transition-colors">
                🏠 Home
              </Link>
              <ChevronRightIcon className="w-5 h-5 mx-2 text-white/60" />
              <span className="font-semibold">Science</span>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              {/* Module Title */}
              <div className="flex items-center mb-6 md:mb-0">
                <div className="bg-white p-4 rounded-2xl shadow-xl mr-4 transform hover:scale-110 transition-transform">
                  <FlaskConicalIcon className="w-12 h-12 text-green-600" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black mb-2">Science</h1>
                  <p className="text-xl text-white/90 font-medium">
                    Discover the amazing world around you! 🌍
                  </p>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border-2 border-white/30 min-w-[280px]">
                <div className="flex items-center">
                  <div className="bg-yellow-400 p-3 rounded-xl mr-4">
                    <AwardIcon className="w-8 h-8 text-yellow-900" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/80 font-medium mb-1">Your Progress</p>
                    <p className="font-black text-xl mb-2">
                      {moduleStats ? `${moduleStats.completedLessons}/4 Lessons ⭐` : 'Loading...'}
                    </p>
                    {moduleStats && (
                      <ProgressBar
                        progress={moduleStats.completedLessons}
                        total={4}
                        label=""
                        color="white"
                        size="small"
                        showCount={false}
                        showPercentage={false}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation - Enhanced */}
        <div className="bg-white shadow-lg sticky top-0 z-40">
          <div className="container mx-auto">
            <div className="flex overflow-x-auto">
              <button
                className={`px-8 py-4 font-bold text-base focus:outline-none transition-all relative ${
                  activeTab === 'lessons'
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50/50'
                }`}
                onClick={() => setActiveTab('lessons')}
              >
                📚 Lessons
                {activeTab === 'lessons' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-emerald-600"></div>
                )}
              </button>

              <button
                className={`px-8 py-4 font-bold text-base focus:outline-none transition-all relative ${
                  activeTab === 'experiments'
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50/50'
                }`}
                onClick={() => setActiveTab('experiments')}
              >
                🔬 Experiments
                {activeTab === 'experiments' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-emerald-600"></div>
                )}
              </button>
             
              <button
                className={`px-8 py-4 font-bold text-base focus:outline-none transition-all relative ${
                  activeTab === 'exam'
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50/50'
                }`}
                onClick={() => setActiveTab('exam')}
              >
                📝 Practice Exam
                {activeTab === 'exam' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-emerald-600"></div>
                )}
              </button>

              <button
                className={`px-8 py-4 font-bold text-base focus:outline-none transition-all relative ${
                  activeTab === 'resources'
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50/50'
                }`}
                onClick={() => setActiveTab('resources')}
              >
                📖 Resources
                {activeTab === 'resources' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-emerald-600"></div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Lessons Tab */}
            {activeTab === 'lessons' && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-4xl font-black text-gray-800 flex items-center gap-3">
                    <SparklesIcon className="w-10 h-10 text-green-600" />
                    Science Lessons
                  </h2>
                  <div className="bg-green-100 px-6 py-3 rounded-full">
                    <span className="font-bold text-green-800">4 Exciting Lessons!</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 border-4 border-white"
                    >
                      {/* Lesson Image */}
                      <div className="h-56 bg-gradient-to-br from-green-200 to-emerald-200 relative overflow-hidden">
                        {lesson.image ? (
                          <img
                            src={lesson.image}
                            alt={lesson.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-9xl">{lesson.emoji}</span>
                          </div>
                        )}
                        {/* Lesson Number Badge */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center font-black text-xl text-green-600 shadow-lg">
                          {lesson.id}
                        </div>
                      </div>

                      {/* Lesson Content */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-2xl font-black text-gray-800 flex-1">
                            {lesson.title}
                          </h3>
                          {lesson.completed && (
                            <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center font-bold shadow-md">
                              <CheckCircleIcon className="w-4 h-4 mr-1" />
                              Done! 🎉
                            </div>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                          {lesson.description}
                        </p>

                        <div className="flex justify-between items-center">
                          <span className="text-base text-gray-500 font-semibold flex items-center">
                            <ClockIcon className="w-5 h-5 mr-2 text-green-600" />
                            {lesson.duration}
                          </span>
                          <Link
                            to={`/science/lesson/${lesson.id}`}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 px-6 rounded-full text-base font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            Start Learning! 🚀
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Experiments Tab */}
            {activeTab === 'experiments' && (
              <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border-4 border-green-100">
                <div className="bg-gradient-to-br from-green-400 to-emerald-400 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <FlaskConicalIcon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-black mb-4 text-gray-800">Simple Experiments 🔬</h3>
                <p className="text-xl text-gray-600 mb-6 font-medium">
                  Fun and safe science experiments you can try at home
                </p>
                <div className="bg-yellow-50 rounded-2xl p-6 mb-8 inline-block border-2 border-yellow-200">
                  <p className="text-lg text-yellow-800 font-bold">
                    🌟 Complete more lessons to unlock amazing experiments! 🌟
                  </p>
                </div>
                <button
                  className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 font-bold py-4 px-10 rounded-full text-lg cursor-not-allowed opacity-75"
                  disabled
                >
                  Coming Soon! 🎁
                </button>
              </div>
            )}

            {/* Practice Exam Tab */}
            {activeTab === 'exam' && (
              <div className="bg-white rounded-3xl shadow-2xl p-10 border-4 border-green-100">
                <div className="text-center mb-10">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-400 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <FlaskConicalIcon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-4xl font-black mb-4 text-gray-800">Science Practice Exam 📝</h3>
                  <p className="text-xl text-gray-600 font-medium">
                    Test your knowledge of plants, animals, and nature!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
                    <h4 className="font-black text-green-800 mb-4 text-2xl flex items-center">
                      <span className="text-3xl mr-3">📋</span>
                      Exam Details
                    </h4>
                    <ul className="text-lg text-green-700 space-y-3 font-medium">
                      <li>• 8 multiple-choice questions</li>
                      <li>• 15 minutes time limit</li>
                      <li>• Covers all lesson topics</li>
                      <li>• Instant results and feedback</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
                    <h4 className="font-black text-blue-800 mb-4 text-2xl flex items-center">
                      <span className="text-3xl mr-3">🎯</span>
                      What You'll Learn
                    </h4>
                    <ul className="text-lg text-blue-700 space-y-3 font-medium">
                      <li>• Plants and their needs</li>
                      <li>• Animals and their sounds</li>
                      <li>• Weather and water cycle</li>
                      <li>• Day and night cycle</li>
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                    <Link
                      to="/science/exam"
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black py-4 px-10 rounded-full transition-all inline-flex items-center justify-center text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                      <RocketIcon className="w-6 h-6 mr-2" />
                      Start Practice Exam
                    </Link>
                    <Link
                      to="/review/science"
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-black py-4 px-10 rounded-full transition-all inline-flex items-center justify-center text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                      <BookOpenIcon className="w-6 h-6 mr-2" />
                      Review Lessons
                    </Link>
                  </div>
                  <p className="text-base text-gray-500 font-medium">
                    Take your time - there's no rush! 🎈
                  </p>
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border-4 border-green-100">
                <div className="bg-gradient-to-br from-green-400 to-emerald-400 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <BookOpenIcon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-black mb-4 text-gray-800">Learning Resources 📚</h3>
                <p className="text-xl text-gray-600 mb-6 font-medium">
                  Additional materials to support your science learning
                </p>
                <div className="bg-yellow-50 rounded-2xl p-6 mb-8 inline-block border-2 border-yellow-200">
                  <p className="text-lg text-yellow-800 font-bold">
                    🌟 Complete more lessons to unlock amazing resources! 🌟
                  </p>
                </div>
                <button
                  className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 font-bold py-4 px-10 rounded-full text-lg cursor-not-allowed opacity-75"
                  disabled
                >
                  Coming Soon! 🎁
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Next Steps Section - Enhanced */}
        <section className="bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-black mb-8 text-gray-800 flex items-center">
              <TrophyIcon className="w-10 h-10 mr-4 text-yellow-500" />
              What's Next? 🎯
            </h2>
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-white">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-2xl shadow-xl">
                  <StarIcon className="w-16 h-16 text-white" />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-3xl font-black text-gray-800 mb-2">
                    Continue Your Adventure! 🚀
                  </h3>
                  <p className="text-xl text-gray-600 font-medium">
                    Start exploring "Animals & Birds"
                  </p>
                </div>
                <Link
                  to="/science/lesson/2"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 px-8 rounded-full text-lg font-black transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 whitespace-nowrap"
                >
                  Let's Go! 🎉
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}