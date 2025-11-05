import React, { useState, useEffect } from 'react';
import { XIcon, UsersIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export function AddChildModal({ isOpen, onClose, onSuccess }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (isOpen) {
      fetchAvailableStudents();
    }
  }, [isOpen]);

  const fetchAvailableStudents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/parent/students/available`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load students');
    }
  };

  const handleAddChild = async (studentEmail) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/parent/add-child`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ studentEmail })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add child');
      }
      
      const data = await response.json();
      toast.success('Child added successfully!');
      onSuccess && onSuccess(data);
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to add child');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <UsersIcon className="w-6 h-6" />
            Add Child
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-3">
          {students.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No students available to add</p>
          ) : (
            students.map((student) => (
              <div
                key={student.email}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <p className="font-semibold text-gray-800">{student.name || student.email}</p>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>
                <button
                  onClick={() => handleAddChild(student.email)}
                  disabled={loading}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

