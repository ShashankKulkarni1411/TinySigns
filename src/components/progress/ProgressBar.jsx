import React from 'react';
import { CheckCircleIcon } from 'lucide-react';

export function ProgressBar({ 
  progress, 
  total, 
  label, 
  showPercentage = true, 
  showCount = true,
  color = 'blue',
  size = 'medium',
  animated = true 
}) {
  const percentage = total > 0 ? Math.round((progress / total) * 100) : 0;
  
  const getColorClasses = () => {
    const colors = {
      blue: {
        bg: 'bg-blue-600',
        light: 'bg-blue-100',
        text: 'text-blue-600'
      },
      green: {
        bg: 'bg-green-600',
        light: 'bg-green-100',
        text: 'text-green-600'
      },
      pink: {
        bg: 'bg-pink-600',
        light: 'bg-pink-100',
        text: 'text-pink-600'
      },
      purple: {
        bg: 'bg-purple-600',
        light: 'bg-purple-100',
        text: 'text-purple-600'
      },
      yellow: {
        bg: 'bg-yellow-600',
        light: 'bg-yellow-100',
        text: 'text-yellow-600'
      }
    };
    return colors[color] || colors.blue;
  };

  const getSizeClasses = () => {
    const sizes = {
      small: {
        height: 'h-2',
        text: 'text-sm',
        padding: 'p-2'
      },
      medium: {
        height: 'h-3',
        text: 'text-base',
        padding: 'p-3'
      },
      large: {
        height: 'h-4',
        text: 'text-lg',
        padding: 'p-4'
      }
    };
    return sizes[size] || sizes.medium;
  };

  const colorClasses = getColorClasses();
  const sizeClasses = getSizeClasses();

  return (
    <div className={`${sizeClasses.padding} bg-white rounded-lg shadow-sm border`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span className={`font-medium text-gray-700 ${sizeClasses.text}`}>
            {label}
          </span>
          {progress === total && total > 0 && (
            <CheckCircleIcon className={`w-4 h-4 ml-2 ${colorClasses.text}`} />
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {showCount && (
            <span className={`text-sm font-medium ${colorClasses.text}`}>
              {progress}/{total}
            </span>
          )}
          {showPercentage && (
            <span className={`text-sm font-bold ${colorClasses.text}`}>
              {percentage}%
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`w-full ${colorClasses.light} rounded-full ${sizeClasses.height}`}>
        <div 
          className={`${colorClasses.bg} ${sizeClasses.height} rounded-full transition-all duration-500 ease-out ${
            animated ? 'transform translate-x-0' : ''
          }`}
          style={{ 
            width: `${percentage}%`,
            transition: animated ? 'width 0.5s ease-out' : 'none'
          }}
        ></div>
      </div>

      {/* Progress Text */}
      {progress === total && total > 0 && (
        <div className="mt-2 text-center">
          <span className={`text-sm font-medium ${colorClasses.text}`}>
            🎉 Completed!
          </span>
        </div>
      )}
    </div>
  );
}

// Specialized progress bar for module completion
export function ModuleProgressBar({ moduleName, progress, total, color }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">{moduleName}</h3>
        <span className="text-sm text-gray-500">
          {progress}/{total} lessons
        </span>
      </div>
      
      <ProgressBar
        progress={progress}
        total={total}
        label=""
        color={color}
        size="medium"
        showCount={false}
        showPercentage={true}
      />
      
      {progress === total && (
        <div className="mt-2 text-center">
          <span className="text-sm font-medium text-green-600">
            ✅ Module Complete
          </span>
        </div>
      )}
    </div>
  );
}

// Circular progress indicator
export function CircularProgress({ 
  progress, 
  total, 
  size = 120, 
  strokeWidth = 8,
  color = 'blue' 
}) {
  const percentage = total > 0 ? Math.round((progress / total) * 100) : 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    const colors = {
      blue: '#3B82F6',
      green: '#10B981',
      pink: '#EC4899',
      purple: '#8B5CF6',
      yellow: '#F59E0B'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">
          {percentage}%
        </span>
      </div>
    </div>
  );
}
