import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeftIcon, CalendarIcon, PlusIcon, EditIcon, TrashIcon, BookOpenIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

export function TeacherLessonPlans() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [lessonPlans, setLessonPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: 'ISL',
    date: new Date().toISOString().split('T')[0],
    description: '',
    status: 'Upcoming'
  });

  useEffect(() => {
    if (user && user.email) {
      fetchLessons();
    }
  }, [user]);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/teacher/${encodeURIComponent(user.email)}/lessons`, {
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to fetch lessons');
      
      const data = await response.json();
      
      // Transform data to match UI format
      const transformedLessons = data.map(lesson => ({
        id: lesson._id,
        title: lesson.title,
        module: lesson.subject,
        date: new Date(lesson.date).toISOString().split('T')[0],
        status: lesson.status || 'Upcoming',
        description: lesson.description,
        _id: lesson._id
      }));
      
      setLessonPlans(transformedLessons);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      toast.error('Failed to load lessons');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      if (!formData.title || !formData.date) {
        toast.error('Please fill in title and date');
        return;
      }

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/teacher/schedule-lesson`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to schedule lesson');
      }

      toast.success('Lesson scheduled successfully!');
      setShowAddModal(false);
      setFormData({
        title: '',
        subject: 'ISL',
        date: new Date().toISOString().split('T')[0],
        description: '',
        status: 'Upcoming'
      });
      fetchLessons();
    } catch (error) {
      console.error('Error scheduling lesson:', error);
      toast.error(error.message || 'Failed to schedule lesson');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this lesson plan?')) {
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/teacher/lesson/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to delete lesson');

      toast.success('Lesson deleted successfully!');
      fetchLessons();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      toast.error('Failed to delete lesson');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Upcoming': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <button
            onClick={() => navigate('/teacher-dashboard')}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-semibold"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl p-4 mr-4">
                  <CalendarIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Lesson Plans</h1>
                  <p className="text-gray-600">Create and manage your lesson plans</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-md"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Schedule New Lesson
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading lessons...</p>
              </div>
            ) : lessonPlans.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-xl font-bold text-gray-800 mb-2">No lessons scheduled yet</p>
                <p className="text-gray-600 mb-6">Click "Schedule New Lesson" to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {lessonPlans.map(plan => (
                <div key={plan.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{plan.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(plan.status)}`}>
                          {plan.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-gray-600">
                        <p className="flex items-center">
                          <BookOpenIcon className="w-4 h-4 mr-2" />
                          {plan.module}
                        </p>
                        <p className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          {plan.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-xl transition-colors">
                        <EditIcon className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(plan._id || plan.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-xl transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Lesson Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule New Lesson</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g., Introduction to ISL Alphabet"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="ISL">Indian Sign Language</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Description (Optional)</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      rows="3"
                      placeholder="Lesson description..."
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAdd}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Schedule Lesson
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Toaster position="top-right" />
      <Footer />
    </div>
  );
}