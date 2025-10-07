import React from 'react';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';

export function Question({ 
  question, 
  questionNumber, 
  totalQuestions, 
  selectedAnswer, 
  onAnswerSelect, 
  showResult = false,
  isCorrect = null 
}) {
  const handleAnswerSelect = (answer) => {
    if (!showResult) {
      onAnswerSelect(answer);
    }
  };

  const getAnswerClass = (answer) => {
    if (!showResult) {
      return selectedAnswer === answer 
        ? 'bg-blue-100 border-blue-500 text-blue-700' 
        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50';
    }
    
    if (answer === question.correctAnswer) {
      return 'bg-green-100 border-green-500 text-green-700';
    }
    
    if (answer === selectedAnswer && answer !== question.correctAnswer) {
      return 'bg-red-100 border-red-500 text-red-700';
    }
    
    return 'bg-gray-100 border-gray-300 text-gray-500';
  };

  const getAnswerIcon = (answer) => {
    if (!showResult) return null;
    
    if (answer === question.correctAnswer) {
      return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
    }
    
    if (answer === selectedAnswer && answer !== question.correctAnswer) {
      return <XCircleIcon className="w-5 h-5 text-red-600" />;
    }
    
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Question Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </span>
        {showResult && (
          <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isCorrect ? (
              <>
                <CheckCircleIcon className="w-4 h-4 mr-1" />
                Correct
              </>
            ) : (
              <>
                <XCircleIcon className="w-4 h-4 mr-1" />
                Incorrect
              </>
            )}
          </div>
        )}
      </div>

      {/* Question Text */}
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {question.question}
      </h3>

      {/* Question Image (if available) */}
      {question.image && (
        <div className="mb-4">
          <img 
            src={question.image} 
            alt="Question illustration" 
            className="w-full max-w-md mx-auto rounded-lg"
          />
        </div>
      )}

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            disabled={showResult}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between ${
              getAnswerClass(option)
            } ${!showResult ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <span className="font-medium">{option}</span>
            {getAnswerIcon(option)}
          </button>
        ))}
      </div>

      {/* Explanation (shown after answer) */}
      {showResult && question.explanation && (
        <div className={`mt-4 p-4 rounded-lg ${
          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <h4 className="font-semibold text-gray-800 mb-2">Explanation:</h4>
          <p className="text-gray-700">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
