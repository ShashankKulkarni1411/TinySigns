import React from 'react';
import { PracticeExam } from '../components/exam/PracticeExam';
import { mathematicsExamData } from '../data/examData';
import { useNavigate } from 'react-router-dom';

export function MathematicsExam() {
  const navigate = useNavigate();

  const handleCompleteExam = (results) => {
    console.log('Mathematics exam completed:', results);
    // You can add additional logic here, like updating user progress
  };

  const handleBackToModule = () => {
    navigate('/mathematics');
  };

  return (
    <PracticeExam
      examData={mathematicsExamData}
      moduleName="Mathematics"
      onCompleteExam={handleCompleteExam}
      onBackToModule={handleBackToModule}
    />
  );
}
