import React from 'react';
import { PracticeExam } from '../components/exam/PracticeExam';
import { islExamData } from '../data/examData';
import { useNavigate } from 'react-router-dom';

export function ISLExam() {
  const navigate = useNavigate();

  const handleCompleteExam = (results) => {
    console.log('ISL exam completed:', results);
    // You can add additional logic here, like updating user progress
  };

  const handleBackToModule = () => {
    navigate('/isl');
  };

  return (
    <PracticeExam
      examData={islExamData}
      moduleName="Indian Sign Language"
      onCompleteExam={handleCompleteExam}
      onBackToModule={handleBackToModule}
    />
  );
}
