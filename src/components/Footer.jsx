import React from 'react';
import { HeartIcon } from 'lucide-react';
export function Footer() {
  return <footer className="bg-indigo-600 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="flex justify-center items-center">
          Made with <HeartIcon className="w-4 h-4 mx-1 text-red-400" /> for tiny
          learners
        </p>
        <p className="text-sm mt-2">
          © 2025 TINY SIGNS - Learning for Everyone
        </p>
      </div>
    </footer>;
}