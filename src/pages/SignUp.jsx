import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { UserIcon, MailIcon, LockIcon, CheckCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SignUp() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
     
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Please fill all fields');
      return;
    }
    setError('');
    setFormStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        'https://68e5648d21dd31f22cc1a1d6.mockapi.io/api/users',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
            avatar: formData.avatar,
            progress: 0,
            individualProgress: {
              mathematics: 0,
              science: 0,
              isl: 0
            }
          }),
        }
      );

      if (!response.ok) throw new Error('Failed to create user');

      setFormStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic placeholder for email field based on role
  const emailPlaceholder =
    formData.role === 'student' ? "Parent's Email" : 'Your Email';

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          {formStep === 1 && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-indigo-700">Join TINY SIGNS</h1>
                <p className="text-gray-600 mt-2">Create your account to start learning</p>
              </div>
              {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleNext}>
                {/* Name */}
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>

                {/* Role selection */}
                <div className="mb-6">
                  <label htmlFor="role" className="block text-gray-700 mb-2 font-medium">
                    Role
                  </label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-lg py-3 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                    <option value="parent">Parent</option>
                  </select>
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                    {emailPlaceholder}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder={emailPlaceholder.toLowerCase()}
                      required
                    />
                  </div>
                </div>

                {/* Avatar upload */}
               

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  Continue
                </button>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      Log in
                    </Link>
                  </p>
                </div>
              </form>
            </>
          )}

          {formStep === 2 && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-indigo-700">Create Password</h1>
                <p className="text-gray-600 mt-2">Set a secure password for your account</p>
              </div>
              {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                {/* Password */}
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-gray-700 mb-2 font-medium">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    >
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      required
                    />
                    <span className="ml-2 text-gray-700">
                      I agree to the{' '}
                      <Link to="/terms" className="text-indigo-600 hover:text-indigo-800">
                        Terms and Conditions
                      </Link>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${
                    loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white font-bold py-3 px-4 rounded-lg transition-colors`}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>

                <button
                  type="button"
                  onClick={() => setFormStep(1)}
                  className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  Back
                </button>
              </form>
            </>
          )}

          {/* Success */}
          {formStep === 3 && (
            <div className="text-center py-8">
              <div className="flex justify-center mb-6">
                <CheckCircleIcon className="h-16 w-16 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold text-green-600 mb-4">Success!</h1>
              <p className="text-gray-600 mb-8">Your account has been created successfully.</p>
              <Link
                to="/login"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors inline-block"
              >
                Proceed to Login
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
