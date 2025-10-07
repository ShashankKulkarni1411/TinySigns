import React, { useState, useEffect } from 'react';
import { Question } from './Question';
import { ExamTimer } from './ExamTimer';
import { ExamResults } from './ExamResults';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from 'lucide-react';
import { examService } from '../../services/examService';

export function PracticeExam({ 
  examData, 
  moduleName, 
  onCompleteExam,
  onBackToModule 
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [examStartTime, setExamStartTime] = useState(null);
  const [examEndTime, setExamEndTime] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { questions, timeLimit = 30 } = examData;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  useEffect(() => {
    setExamStartTime(Date.now());
  }, []);

  const handleAnswerSelect = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitExam = () => {
    if (answeredQuestions < totalQuestions) {
      const unanswered = totalQuestions - answeredQuestions;
      const confirmSubmit = window.confirm(
        `You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}. Are you sure you want to submit the exam?`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitted(true);
    setExamEndTime(Date.now());
    setShowResults(true);
    
    // Calculate results
    const results = calculateResults();
    
    // Save to database (simulated)
    saveExamResults(results);
    
    // Notify parent component
    if (onCompleteExam) {
      onCompleteExam(results);
    }
  };

  const handleTimeUp = () => {
    if (!isSubmitted) {
      handleSubmitExam();
    }
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    const questionResults = [];

    questions.forEach((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correctAnswers++;
      }

      questionResults.push({
        questionIndex: index,
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      });
    });

    const score = correctAnswers;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const completionTime = Math.floor((examEndTime - examStartTime) / 1000);
    const passed = percentage >= 60; // 60% passing grade

    return {
      score,
      totalQuestions,
      correctAnswers,
      incorrectAnswers: totalQuestions - correctAnswers,
      percentage,
      passed,
      completionTime,
      questionResults,
      examStartTime,
      examEndTime
    };
  };

  const saveExamResults = async (results) => {
    try {
      const examRecord = await examService.saveExamResults({
        moduleName,
        results
      });
      console.log('Exam results saved successfully:', examRecord);
    } catch (error) {
      console.error('Failed to save exam results:', error);
      // Still continue with the exam flow even if saving fails
    }
  };

  const handleRetakeExam = () => {
    // Reset exam state
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setExamStartTime(Date.now());
    setExamEndTime(null);
    setIsSubmitted(false);
  };

  const getQuestionStatus = (index) => {
    if (answers[index]) {
      return 'answered';
    }
    if (index === currentQuestionIndex) {
      return 'current';
    }
    return 'unanswered';
  };

  if (showResults) {
    const results = calculateResults();
    return (
      <ExamResults
        results={results}
        moduleName={moduleName}
        onRetakeExam={handleRetakeExam}
        onBackToModule={onBackToModule}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Exam Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {moduleName} Practice Exam
              </h1>
              <p className="text-gray-600">
                {totalQuestions} questions • {timeLimit} minutes
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <ExamTimer
                timeLimit={timeLimit}
                onTimeUp={handleTimeUp}
                isActive={!isSubmitted}
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress: {answeredQuestions}/{totalQuestions} answered</span>
              <span>{Math.round((answeredQuestions / totalQuestions) * 100)}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Navigation */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {questions.map((_, index) => {
                const status = getQuestionStatus(index);
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                      status === 'answered' 
                        ? 'bg-green-500 text-white' 
                        : status === 'current'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Question */}
        <Question
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          selectedAnswer={answers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          showResult={false}
        />

        {/* Navigation Buttons */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousQuestion}
              disabled={isFirstQuestion}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                isFirstQuestion
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Previous
            </button>

            <div className="flex gap-3">
              {!isLastQuestion ? (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Next
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitExam}
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Submit Exam
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
