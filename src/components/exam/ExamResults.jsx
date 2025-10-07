import React from 'react';
import { 
  TrophyIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon, 
  RotateCcwIcon,
  HomeIcon,
  BookOpenIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function ExamResults({ 
  results, 
  moduleName, 
  onRetakeExam,
  onBackToModule 
}) {
  const { 
    score, 
    totalQuestions, 
    correctAnswers, 
    incorrectAnswers, 
    completionTime, 
    percentage,
    passed 
  } = results;

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = () => {
    if (percentage >= 80) return 'bg-green-100 border-green-300';
    if (percentage >= 60) return 'bg-yellow-100 border-yellow-300';
    return 'bg-red-100 border-red-300';
  };

  const getPassStatus = () => {
    if (percentage >= 80) return { text: 'Excellent!', color: 'text-green-600' };
    if (percentage >= 60) return { text: 'Good Job!', color: 'text-yellow-600' };
    return { text: 'Keep Practicing!', color: 'text-red-600' };
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  const passStatus = getPassStatus();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mb-4">
          {passed ? (
            <TrophyIcon className="w-16 h-16 text-yellow-500 mx-auto" />
          ) : (
            <XCircleIcon className="w-16 h-16 text-red-500 mx-auto" />
          )}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {moduleName} Exam Results
        </h2>
        <p className={`text-xl font-semibold ${passStatus.color}`}>
          {passStatus.text}
        </p>
      </div>

      {/* Score Card */}
      <div className={`rounded-lg border-2 p-6 mb-6 ${getScoreBgColor()}`}>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">
            <span className={getScoreColor()}>{score}</span>
            <span className="text-gray-500">/{totalQuestions}</span>
          </div>
          <div className={`text-2xl font-semibold ${getScoreColor()}`}>
            {percentage}%
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <CheckCircleIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
          <div className="text-sm text-green-700">Correct</div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <XCircleIcon className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-red-600">{incorrectAnswers}</div>
          <div className="text-sm text-red-700">Incorrect</div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <ClockIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-lg font-bold text-blue-600">
            {formatTime(completionTime)}
          </div>
          <div className="text-sm text-blue-700">Time Taken</div>
        </div>
      </div>

      {/* Performance Message */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">Performance Summary:</h3>
        {percentage >= 80 ? (
          <p className="text-gray-700">
            Outstanding work! You've mastered the {moduleName} concepts. 
            Consider exploring more advanced topics or helping others learn.
          </p>
        ) : percentage >= 60 ? (
          <p className="text-gray-700">
            Good progress! You're on the right track with {moduleName}. 
            Review the incorrect answers and try the exam again to improve your score.
          </p>
        ) : (
          <p className="text-gray-700">
            Don't worry! Learning takes time. Review the lessons again, 
            focus on the areas where you had difficulty, and try the exam once more.
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={onRetakeExam}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          <RotateCcwIcon className="w-5 h-5 mr-2" />
          Retake Exam
        </button>
        
        <Link
          to={`/review/${moduleName.toLowerCase().replace(' ', '')}`}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          <BookOpenIcon className="w-5 h-5 mr-2" />
          Review Lessons
        </Link>
        
        <button
          onClick={onBackToModule}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          <HomeIcon className="w-5 h-5 mr-2" />
          Back to {moduleName}
        </button>
      </div>

      {/* Study Tips */}
      {percentage < 80 && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Study Tips:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Review the lessons you found challenging</li>
            <li>• Practice with interactive activities</li>
            <li>• Take notes on key concepts</li>
            <li>• Ask for help if you need clarification</li>
            <li>• Take breaks between study sessions</li>
          </ul>
        </div>
      )}
    </div>
  );
}
