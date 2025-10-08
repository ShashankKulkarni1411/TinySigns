import React from 'react';
import { Link } from 'react-router-dom';
import { HandMetalIcon } from 'lucide-react';

export function HeaderSignup() {
  return (
    <header className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <HandMetalIcon className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold">TINY SIGNS</h1>
        </div>

        {/* Right side (optional links) */}
        <div>
          <Link
            to="/login"
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
