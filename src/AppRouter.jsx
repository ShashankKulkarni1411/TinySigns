import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { SignUp } from './pages/SignUp';
import { MathematicsModule } from './pages/MathematicsModule';
import { IndianSignLanguage } from './pages/IndianSignLanguage';
import { Science } from './pages/Science';
import { MathematicsExam } from './pages/MathematicsExam';
import { ScienceExam } from './pages/ScienceExam';
import { ISLExam } from './pages/ISLExam';
import { ExamDashboardPage } from './pages/ExamDashboard';
import { ReviewLessons } from './pages/ReviewLessons';
import { LessonPage } from './pages/LessonPage';

export function AppRouter() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mathematics" element={<MathematicsModule />} />
        <Route path="/mathematics/exam" element={<MathematicsExam />} />
        <Route path="/isl" element={<IndianSignLanguage />} />
        <Route path="/isl/exam" element={<ISLExam />} />
        <Route path="/science" element={<Science />} />
        <Route path="/science/exam" element={<ScienceExam />} />
        <Route path="/dashboard" element={<ExamDashboardPage />} />
        <Route path="/review/:moduleName" element={<ReviewLessons />} />
        <Route path="/:moduleName/lesson/:lessonId" element={<LessonPage />} />
      </Routes>
    </BrowserRouter>;
}