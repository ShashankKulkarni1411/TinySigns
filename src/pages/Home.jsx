import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { BookOpenIcon, ActivityIcon, FlaskConicalIcon, ArrowRightIcon } from 'lucide-react';
export function Home() {
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
            <Link to="/signup" className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-bold py-3 px-6 rounded-full text-lg inline-flex items-center transition-colors">
              Start Learning Now
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
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
                  <h3 className="text-xl font-bold mb-2 text-pink-600">
                    Indian Sign Language
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Learn basic signs through fun, interactive games and videos
                  </p>
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
                  <h3 className="text-xl font-bold mb-2 text-blue-600">
                    Mathematics
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Visual counting, shapes, and basic number concepts
                  </p>
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
                  <h3 className="text-xl font-bold mb-2 text-green-600">
                    Science
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Discover plants, animals, and our world through visual
                    learning
                  </p>
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