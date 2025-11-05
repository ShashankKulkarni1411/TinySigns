import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { 
  UsersIcon, 
  SearchIcon, 
  FilterIcon, 
  PlusIcon,
  EditIcon,
  TrashIcon,
  MailIcon,
  ShieldIcon,
  ArrowLeftIcon
} from 'lucide-react';

export function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/admin/users`, {
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Failed to fetch users');
      
      const usersData = await response.json();
      
      // Transform user data to match the UI format
      const transformedUsers = usersData.map(user => ({
        id: user._id || user.email,
        name: user.username || user.name || user.email.split('@')[0],
        email: user.email,
        role: user.stakeholder ? user.stakeholder.charAt(0).toUpperCase() + user.stakeholder.slice(1) : 'Student',
        status: user.loggedIn ? 'Active' : 'Inactive',
        joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'
      }));
      
      setUsers(transformedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      // Fallback to empty array on error
      setUsers([]);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Student': return 'bg-blue-500';
      case 'Teacher': return 'bg-green-500';
      case 'Parent': return 'bg-purple-500';
      case 'Admin': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
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
                    User Management 👥
                  </h1>
                  <p className="text-xl text-white/80 font-medium">
                    Manage all users, roles, and permissions
                  </p>
                </div>
                <button className="bg-white text-indigo-600 hover:bg-yellow-300 hover:text-gray-800 font-black px-6 py-3 rounded-full transition-all shadow-lg flex items-center gap-2">
                  <PlusIcon className="w-5 h-5" />
                  Add New User
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white placeholder-white/60 font-medium focus:outline-none focus:border-yellow-300"
                />
              </div>
              <div className="relative">
                <FilterIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white font-medium focus:outline-none focus:border-yellow-300 appearance-none"
                >
                  <option value="all" className="bg-purple-800">All Roles</option>
                  <option value="Student" className="bg-purple-800">Students</option>
                  <option value="Teacher" className="bg-purple-800">Teachers</option>
                  <option value="Parent" className="bg-purple-800">Parents</option>
                  <option value="Admin" className="bg-purple-800">Admins</option>
                </select>
              </div>
            </div>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl text-center">
              <div className="text-5xl font-black mb-2">{users.length}</div>
              <div className="text-white/70 font-bold">Total Users</div>
            </div>
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl text-center">
              <div className="text-5xl font-black mb-2">{users.filter(u => u.role === 'Student').length}</div>
              <div className="text-white/70 font-bold">Students</div>
            </div>
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl text-center">
              <div className="text-5xl font-black mb-2">{users.filter(u => u.role === 'Teacher').length}</div>
              <div className="text-white/70 font-bold">Teachers</div>
            </div>
            <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl p-6 shadow-xl text-center">
              <div className="text-5xl font-black mb-2">{users.filter(u => u.status === 'Active').length}</div>
              <div className="text-white/70 font-bold">Active Users</div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border-2 border-white/30 rounded-3xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-white/30">
                    <th className="px-6 py-4 text-left font-black text-lg">Name</th>
                    <th className="px-6 py-4 text-left font-black text-lg">Email</th>
                    <th className="px-6 py-4 text-left font-black text-lg">Role</th>
                    <th className="px-6 py-4 text-left font-black text-lg">Status</th>
                    <th className="px-6 py-4 text-left font-black text-lg">Join Date</th>
                    <th className="px-6 py-4 text-left font-black text-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="bg-gradient-to-br from-blue-400 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center mr-3 font-black text-lg">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-bold">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-white/80">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`${getRoleBadgeColor(user.role)} px-3 py-1 rounded-full text-sm font-black`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'} px-3 py-1 rounded-full text-sm font-black`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-white/80">{user.joinDate}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="bg-blue-500 hover:bg-blue-600 p-2 rounded-lg transition-colors">
                            <EditIcon className="w-4 h-4" />
                          </button>
                          <button className="bg-green-500 hover:bg-green-600 p-2 rounded-lg transition-colors">
                            <MailIcon className="w-4 h-4" />
                          </button>
                          <button className="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition-colors">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}