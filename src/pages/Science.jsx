import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BookOpenIcon, AwardIcon, StarIcon, ChevronRightIcon, FlaskConicalIcon, ClockIcon, CheckCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProgressBar } from '../components/progress/ProgressBar';
import { lessonService } from '../services/lessonService';
// video playback is handled in LessonPage; no per-card video button
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
  const lessons = [{
    id: 1,
    title: 'Plants & Trees',
    description: 'Learn about different types of plants and trees',
    // Replace with your preferred image for Plants & Trees
    image: 'https://img.freepik.com/free-vector/hand-drawn-plant-life-cycle-illustration_23-2148975374.jpg',
    duration: '15 min',
    completed: true
  }, {
    id: 2,
    title: 'Animals & Birds',
    description: 'Discover various animals, birds and their habitats',
    // Replace with your preferred image for Animals & Birds
    image: 'https://img.freepik.com/free-vector/wild-animals-habitat-illustration_1308-26616.jpg',
    duration: '20 min',
    completed: false
  }, {
    id: 3,
    title: 'Water & Weather',
    description: 'Explore water cycle and different weather conditions',
    // Replace with your preferred image for Water & Weather
    image: 'https://img.freepik.com/free-vector/water-cycle-nature-flat-diagram_1308-52315.jpg',
    duration: '15 min',
    completed: false
  }, {
    id: 4,
    title: 'Day & Night',
    description: 'Learn about sun, moon, stars and day-night cycle',
    // Replace with your preferred image for Day & Night
    image: 'https://img.freepik.com/free-vector/flat-design-day-night-cycle-illustrated_23-2148929132.jpg',
    duration: '15 min',
    completed: false
  }];
  return <div className="flex flex-col min-h-screen bg-blue-50">
      <Header />
      <main className="flex-grow">
        {/* Module Header */}
        <section className="bg-green-600 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-4">
              <Link to="/" className="text-green-100 hover:text-white">
                Home
              </Link>
              <ChevronRightIcon className="w-4 h-4 mx-2" />
              <span>Science</span>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-white p-3 rounded-full mr-4">
                  <FlaskConicalIcon className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Science</h1>
                  <p className="text-green-100">
                    Discover the world around you
                  </p>
                </div>
              </div>
              <div className="bg-green-700 rounded-lg p-3">
                <div className="flex items-center">
                  <AwardIcon className="w-6 h-6 mr-2" />
                  <div>
                    <p className="text-sm text-green-200">Your Progress</p>
                    <p className="font-bold">
                      {moduleStats ? `${moduleStats.completedLessons}/4 Lessons Completed` : 'Loading...'}
                    </p>
                    {moduleStats && (
                      <div className="mt-2">
                        <ProgressBar
                          progress={moduleStats.completedLessons}
                          total={4}
                          label=""
                          color="green"
                          size="small"
                          showCount={false}
                          showPercentage={false}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Tab Navigation */}
        <div className="bg-white shadow">
          <div className="container mx-auto">
            <div className="flex">
              <button className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'lessons' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-600'}`} onClick={() => setActiveTab('lessons')}>
                Lessons
              </button>
              <button className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'experiments' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-600'}`} onClick={() => setActiveTab('experiments')}>
                Experiments
              </button>
              <button className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'exam' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-600'}`} onClick={() => setActiveTab('exam')}>
                Practice Exam
              </button>
              <button className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'resources' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-600'}`} onClick={() => setActiveTab('resources')}>
                Resources
              </button>
            </div>
          </div>
        </div>
        {/* Lessons Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {activeTab === 'lessons' && <>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Science Lessons
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {lessons.map(lesson => <div key={lesson.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-48 overflow-hidden">
                        <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-xl font-bold text-gray-800">
                            {lesson.title}
                          </h3>
                          {lesson.completed && <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                              <CheckCircleIcon className="w-3 h-3 mr-1" />
                              Completed
                            </div>}
                        </div>
                        <p className="text-gray-600 mb-4">
                          {lesson.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            <ClockIcon className="w-4 h-4 inline mr-1" />
                            {lesson.duration}
                          </span>
                          <div className="flex gap-2">
                            <Link to={`/science/lesson/${lesson.id}`} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                              Start Lesson
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>
              </>}
            {activeTab === 'experiments' && <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <FlaskConicalIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Simple Experiments
                </h3>
                <p className="text-gray-600 mb-4">
                  Fun and safe science experiments you can try at home
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Complete more lessons to unlock experiments
                </p>
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors opacity-50 cursor-not-allowed" disabled>
                  Coming Soon
                </button>
              </div>}
            {activeTab === 'exam' && <div className="bg-white rounded-xl shadow-md p-8">
                <div className="text-center mb-8">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FlaskConicalIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Science Practice Exam</h3>
                  <p className="text-gray-600 mb-6">
                    Test your knowledge of plants, animals, and the world around us
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-semibold text-green-800 mb-2">Exam Details</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• 8 multiple-choice questions</li>
                      <li>• 15 minutes time limit</li>
                      <li>• Covers all lesson topics</li>
                      <li>• Instant results and feedback</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-800 mb-2">What You'll Learn</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Plants and their needs</li>
                      <li>• Animals and their sounds</li>
                      <li>• Weather and water cycle</li>
                      <li>• Day and night cycle</li>
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/science/exam" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center">
                      <FlaskConicalIcon className="w-5 h-5 mr-2" />
                      Start Practice Exam
                    </Link>
                    <Link
                      to="/review/science"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center"
                    >
                      <BookOpenIcon className="w-5 h-5 mr-2" />
                      Review Lessons
                    </Link>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    No time limit for practice - take your time to think through each question
                  </p>
                </div>
              </div>}
            {activeTab === 'resources' && <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <BookOpenIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Learning Resources</h3>
                <p className="text-gray-600 mb-4">
                  Additional materials to support your science learning
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Complete more lessons to unlock resources
                </p>
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors opacity-50 cursor-not-allowed" disabled>
                  Coming Soon
                </button>
              </div>}
          </div>
        </section>
        {/* Next Steps */}
        <section className="bg-green-100 py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Recommended Next Steps
            </h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="bg-green-500 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
                  <StarIcon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-grow text-center md:text-left mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-800">
                    Continue Learning
                  </h3>
                  <p className="text-gray-600">
                    Start exploring "Animals & Birds"
                  </p>
                </div>
                <Link to="/science/lesson/2" className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors">
                  Continue Learning
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
}