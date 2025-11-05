import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { 
  BookOpenIcon, 
  PlusIcon, 
  EditIcon, 
  TrashIcon,
  EyeIcon,
  UploadIcon,
  ArrowLeftIcon,
  VideoIcon,
  FileTextIcon
} from 'lucide-react';

export function AdminContentManagement() {
  const [lessons, setLessons] = useState([
    { id: 1, title: 'ISL Alphabet', module: 'Indian Sign Language', type: 'Video', status: 'Published', views: 1234 },
    { id: 2, title: 'Basic Greetings', module: 'Indian Sign Language', type: 'Video', status: 'Published', views: 987 },
    { id: 3, title: 'Counting Numbers', module: 'Mathematics', type: 'Interactive', status: 'Published', views: 1456 },
    { id: 4, title: 'Shapes and Colors', module: 'Mathematics', type: 'Interactive', status: 'Published', views: 876 },
    { id: 5, title: 'Plants and Trees', module: 'Science', type: 'Video', status: 'Draft', views: 0 },
    { id: 6, title: 'Water Cycle', module: 'Science', type: 'Video', status: 'Published', views: 654 },
  ]);

  const modules = ['All Modules', 'Indian Sign Language', 'Mathematics', 'Science'];
  const [selectedModule, setSelectedModule] = useState('All Modules');

  const filteredLessons = selectedModule === 'All Modules' 
    ? lessons 
    : lessons.filter(l => l.module === selectedModule);

  const getStatusColor = (status) => {
    return status === 'Published' ? 'bg-green-500' : 'bg-yellow-500';
  };

  const getTypeIcon = (type) => {
    return type === 'Video' ? VideoIcon : FileTextIcon;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
      <Header />
      <main className="flex-grow p-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/admin-dashboard" className="inline-flex items-center text-yellow-300 hover:text-yellow-200 mb-4 font-bold">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                    Content Management 📚
                  </h1>
                  <p className="text-xl text-white/80 font-medium">
                    Manage lessons, courses, and learning materials
                  </p>
                </div>
                <button className="bg-white text-green-600 hover:bg-yellow-300 hover:text-gray-800 font-black px-6 py-3 rounded-full transition-all shadow-lg flex items-center gap-2">
                  <PlusIcon className="w-5 h-5" />
                  Add New Lesson
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl text-center">
              <div className="text-5xl font-black mb-2">{lessons.length}</div>
              <div className="text-white/70 font-bold">Total Lessons</div>
            </div>
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl text-center">
              <div className="text-5xl font-black mb-2">{lessons.filter(l => l.status === 'Published').length}</div>
              <div className="text-white/70 font-bold">Published</div>
            </div>
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl text-center">
              <div className="text-5xl font-black mb-2">{lessons.filter(l => l.status === 'Draft').length}</div>
              <div className="text-white/70 font-bold">Drafts</div>
            </div>
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl text-center">
              <div className="text-5xl font-black mb-2">
                {lessons.reduce((sum, l) => sum + l.views, 0)}
              </div>
              <div className="text-white/70 font-bold">Total Views</div>
            </div>
          </div>

          {/* Module Filter */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl mb-8">
            <div className="flex flex-wrap gap-4">
              {modules.map((module) => (
                <button
                  key={module}
                  onClick={() => setSelectedModule(module)}
                  className={`px-6 py-3 rounded-full font-black transition-all ${
                    selectedModule === module
                      ? 'bg-white text-purple-600'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  {module}
                </button>
              ))}
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => {
              const TypeIcon = getTypeIcon(lesson.type);
              return (
                <div key={lesson.id} className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl hover:scale-105 transition-transform">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-br from-blue-400 to-purple-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                      <TypeIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`${getStatusColor(lesson.status)} px-3 py-1 rounded-full text-xs font-black`}>
                      {lesson.status}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-black mb-2">{lesson.title}</h3>
                  <p className="text-white/70 text-sm font-bold mb-1">{lesson.module}</p>
                  <p className="text-white/60 text-sm font-medium mb-4">{lesson.type} Lesson</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <EyeIcon className="w-4 h-4 text-white/60" />
                      <span className="text-sm font-bold">{lesson.views} views</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 py-2 rounded-xl font-black transition-colors flex items-center justify-center gap-2">
                      <EditIcon className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="flex-1 bg-red-500 hover:bg-red-600 py-2 rounded-xl font-black transition-colors flex items-center justify-center gap-2">
                      <TrashIcon className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upload Section */}
          <div className="mt-8 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-8 shadow-xl text-center">
            <UploadIcon className="w-16 h-16 mx-auto mb-4 text-white/60" />
            <h3 className="text-2xl font-black mb-2">Upload New Content</h3>
            <p className="text-white/70 font-medium mb-6">
              Drag and drop files here or click to browse
            </p>
            <button className="bg-white text-purple-600 hover:bg-yellow-300 hover:text-gray-800 font-black px-8 py-3 rounded-full transition-all shadow-lg">
              Choose Files
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}