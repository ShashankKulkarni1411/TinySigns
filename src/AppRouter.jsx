import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { LandingPage } from './pages/LandingPage';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import { MathematicsModule } from './pages/MathematicsModule';
import { IndianSignLanguage } from './pages/IndianSignLanguage';
import { Science } from './pages/Science';
import { MathematicsExam } from './pages/MathematicsExam';
import { ScienceExam } from './pages/ScienceExam';
import { ISLExam } from './pages/ISLExam';
import { ExamDashboardPage } from './pages/ExamDashboard';
import { ReviewLessons } from './pages/ReviewLessons';
import { LessonPage } from './pages/LessonPage';
import { ParentDashboard } from './pages/ParentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

export function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mathematics" element={<MathematicsModule />} />
          <Route path="/mathematics/exam" element={<MathematicsExam />} />
          <Route path="/isl" element={<IndianSignLanguage />} />
          <Route path="/isl/exam" element={<ISLExam />} />
          <Route path="/science" element={<Science />} />
          <Route path="/science/exam" element={<ScienceExam />} />
          <Route path="/dashboard" element={<ExamDashboardPage />} />
          <Route path="/review/:moduleName" element={<ReviewLessons />} />
          <Route path="/:moduleName/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}