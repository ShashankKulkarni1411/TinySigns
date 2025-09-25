import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, UserIcon, BarChartIcon, HandMetalIcon } from 'lucide-react';
export function Header() {
  return <header className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <HandMetalIcon className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold">TINY SIGNS</h1>
        </div>
        <nav className="flex space-x-4">
          <Link to="/" className="flex items-center hover:bg-indigo-700 px-3 py-2 rounded-lg transition-colors">
            <HomeIcon className="w-5 h-5 mr-1" />
            <span>Home</span>
          </Link>
          <Link to="/mathematics" className="flex items-center hover:bg-indigo-700 px-3 py-2 rounded-lg transition-colors">
            <BookOpenIcon className="w-5 h-5 mr-1" />
            <span>Learn</span>
          </Link>
          <Link to="/progress" className="flex items-center hover:bg-indigo-700 px-3 py-2 rounded-lg transition-colors">
            <BarChartIcon className="w-5 h-5 mr-1" />
            <span>Progress</span>
          </Link>
          <Link to="/signup" className="flex items-center hover:bg-indigo-700 px-3 py-2 rounded-lg transition-colors">
            <UserIcon className="w-5 h-5 mr-1" />
            <span>Sign Up</span>
          </Link>
        </nav>
      </div>
    </header>;
}