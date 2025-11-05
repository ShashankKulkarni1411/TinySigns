import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeftIcon, CalendarIcon, PlusIcon, EditIcon, TrashIcon, BookOpenIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TeacherLessonPlans() {
  const navigate = useNavigate();
  const [lessonPlans, setLessonPlans] = useState([
    { id: 1, title: 'Introduction to ISL Alphabet', module: 'ISL', date: '2025-01-15', status: 'Completed' },
    { id: 2, title: 'Counting Numbers 1-10', module: 'Mathematics', date: '2025-01-16', status: 'In Progress' },
    { id: 3, title: 'Plants and Trees', module: 'Science', date: '2025-01-17', status: 'Upcoming' }
  ]);

  const handleAdd = () => {
    const newPlan = {
      id: lessonPlans.length + 1,
      title: 'New Lesson Plan',
      module: 'ISL',
      date: new Date().toISOString().split('T')[0],
      status: 'Upcoming'
    };
    setLessonPlans([...lessonPlans, newPlan]);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this lesson plan?')) {
      setLessonPlans(lessonPlans.filter(plan => plan.id !== id));
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
                onClick={handleAdd}
                className="flex items-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-md"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                New Lesson Plan
              </button>
            </div>

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
                        onClick={() => handleDelete(plan.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-xl transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}