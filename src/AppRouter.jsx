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
import { AdminAnalytics } from './pages/AdminAnalytics';
import { AdminUserManagement } from './pages/AdminUserManagement';
import { AdminContentManagement } from './pages/AdminContentManagement';
import { AdminSettings } from './pages/AdminSettings';
import { AdminDatabase } from './pages/AdminDatabase';
import { AdminSecurity } from './pages/AdminSecurity';
import { AdminMonitoring } from './pages/AdminMonitoring';
import { TeacherAddStudent } from './pages/TeacherAddStudent';
import { TeacherAssessments } from './pages/TeacherAssessments';
import { TeacherLessonPlans } from './pages/TeacherLessonPlans';
import { TeacherMessages } from './pages/TeacherMessages';
import { TeacherReports } from './pages/TeacherReports';
import { TeacherSettings } from './pages/TeacherSettings';
import { TeacherStudentProgress } from './pages/TeacherStudentProgress';
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
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/users" element={<AdminUserManagement />} />
          <Route path="/admin/content" element={<AdminContentManagement />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/database" element={<AdminDatabase />} />
          <Route path="/admin/security" element={<AdminSecurity />} />
          <Route path="/admin/monitoring" element={<AdminMonitoring />} />
          <Route path="/teacher/add-student" element={<TeacherAddStudent />} />
          <Route path="/teacher/reports" element={<TeacherReports />} />
          <Route path="/teacher/student-progress/:studentId" element={<TeacherStudentProgress />} />
          <Route path="/teacher/messages" element={<TeacherMessages />} />
          <Route path="/teacher/messages/:studentId" element={<TeacherMessages />} />
          <Route path="/teacher/lesson-plans" element={<TeacherLessonPlans />} />
          <Route path="/teacher/assessments" element={<TeacherAssessments />} />
          <Route path="/teacher/settings" element={<TeacherSettings />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}