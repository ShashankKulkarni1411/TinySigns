import React, { useState, useEffect } from 'react';
import { ClockIcon } from 'lucide-react';

export function ExamTimer({ 
  timeLimit, // in minutes
  onTimeUp,
  isActive = true 
}) {
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60); // Convert to seconds
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp]);

  useEffect(() => {
    // Show warning when 5 minutes or less remaining
    setIsWarning(timeRemaining <= 300 && timeRemaining > 0);
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeRemaining === 0) return 'text-red-600';
    if (isWarning) return 'text-orange-600';
    return 'text-gray-600';
  };

  const getTimerBgColor = () => {
    if (timeRemaining === 0) return 'bg-red-100 border-red-300';
    if (isWarning) return 'bg-orange-100 border-orange-300';
    return 'bg-blue-100 border-blue-300';
  };

  return (
    <div className={`flex items-center px-4 py-2 rounded-lg border-2 ${getTimerBgColor()}`}>
      <ClockIcon className={`w-5 h-5 mr-2 ${getTimerColor()}`} />
      <span className={`font-mono text-lg font-semibold ${getTimerColor()}`}>
        {formatTime(timeRemaining)}
      </span>
      {isWarning && timeRemaining > 0 && (
        <span className="ml-2 text-sm text-orange-600 font-medium">
          Time running out!
        </span>
      )}
      {timeRemaining === 0 && (
        <span className="ml-2 text-sm text-red-600 font-medium">
          Time's up!
        </span>
      )}
    </div>
  );
}
