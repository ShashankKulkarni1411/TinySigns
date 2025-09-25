import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { UserIcon, MailIcon, LockIcon, CheckCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export function SignUp() {
  const [formStep, setFormStep] = useState(1);
  const handleNext = e => {
    e.preventDefault();
    setFormStep(2);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setFormStep(3);
  };
  return <div className="flex flex-col min-h-screen bg-blue-50">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          {formStep === 1 && <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-indigo-700">
                  Join TINY SIGNS
                </h1>
                <p className="text-gray-600 mt-2">
                  Create your account to start learning
                </p>
              </div>
              <form onSubmit={handleNext}>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium" htmlFor="name">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="text" id="name" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your name" required />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
                    Parent's Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="email" id="email" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="parent@example.com" required />
                  </div>
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
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
            </>}
          {formStep === 2 && <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-indigo-700">
                  Create Password
                </h1>
                <p className="text-gray-600 mt-2">
                  Set a secure password for your account
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="password" id="password" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="Create a password" required />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="password" id="confirmPassword" className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="Confirm your password" required />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="flex items-center">
                    <input type="checkbox" className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" required />
                    <span className="ml-2 text-gray-700">
                      I agree to the{' '}
                      <Link to="/terms" className="text-indigo-600 hover:text-indigo-800">
                        Terms and Conditions
                      </Link>
                    </span>
                  </label>
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Create Account
                </button>
                <button type="button" onClick={() => setFormStep(1)} className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors">
                  Back
                </button>
              </form>
            </>}
          {formStep === 3 && <div className="text-center py-8">
              <div className="flex justify-center mb-6">
                <CheckCircleIcon className="h-16 w-16 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold text-green-600 mb-4">
                Success!
              </h1>
              <p className="text-gray-600 mb-8">
                Your account has been created successfully.
              </p>
              <Link to="/" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors inline-block">
                Go to Homepage
              </Link>
            </div>}
        </div>
      </main>
      <Footer />
    </div>;
}