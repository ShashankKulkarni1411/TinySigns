import React from 'react';
import { PracticeExam } from '../components/exam/PracticeExam';
import { scienceExamData } from '../data/examData';
import { useNavigate } from 'react-router-dom';

export function ScienceExam() {
  const navigate = useNavigate();

  const handleCompleteExam = (results) => {
    console.log('Science exam completed:', results);
    // You can add additional logic here, like updating user progress
  };

  const handleBackToModule = () => {
    navigate('/science');
  };

  return (
    <PracticeExam
      examData={scienceExamData}
      moduleName="Science"
      onCompleteExam={handleCompleteExam}
      onBackToModule={handleBackToModule}
    />
  );
}
