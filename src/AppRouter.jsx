import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
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

import { AddChildPath } from './pages/AddChildPath';
import { ChildProgressPage } from './pages/ChildProgressPage';
import { StudentProgressPage } from './pages/StudentProgressPage';
import { SchedulePage } from './pages/SchedulePage';
import { MessagesPage } from './pages/MessagesPage';
import { SettingsPage } from './pages/SettingsPage';

export function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute requiredRole="student"><Home /></ProtectedRoute>} />
          <Route path="/student/:id/progress" element={<ProtectedRoute requiredRole="student"><StudentProgressPage /></ProtectedRoute>} />
          <Route path="/mathematics" element={<ProtectedRoute><MathematicsModule /></ProtectedRoute>} />
          <Route path="/mathematics/exam" element={<ProtectedRoute><MathematicsExam /></ProtectedRoute>} />
          <Route path="/isl" element={<ProtectedRoute><IndianSignLanguage /></ProtectedRoute>} />
          <Route path="/isl/exam" element={<ProtectedRoute><ISLExam /></ProtectedRoute>} />
          <Route path="/science" element={<ProtectedRoute><Science /></ProtectedRoute>} />
          <Route path="/science/exam" element={<ProtectedRoute><ScienceExam /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><ExamDashboardPage /></ProtectedRoute>} />
          <Route path="/review/:moduleName" element={<ProtectedRoute><ReviewLessons /></ProtectedRoute>} />
          <Route path="/:moduleName/lesson/:lessonId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
          
          {/* Parent Routes */}
          <Route path="/parent-dashboard" element={<ProtectedRoute requiredRole="parent"><ParentDashboard /></ProtectedRoute>} />
          <Route path="/add-child" element={<ProtectedRoute requiredRole="parent"><AddChildPath /></ProtectedRoute>} />
          <Route path="/child-progress/:childId" element={<ProtectedRoute requiredRole="parent"><ChildProgressPage /></ProtectedRoute>} />
          <Route path="/schedule" element={<ProtectedRoute requiredRole="parent"><SchedulePage /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute requiredRole="parent"><MessagesPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          
          {/* Teacher Routes */}
          <Route path="/teacher-dashboard" element={<ProtectedRoute requiredRole="teacher"><TeacherDashboard /></ProtectedRoute>} />
          <Route path="/teacher/add-student" element={<ProtectedRoute requiredRole="teacher"><TeacherAddStudent /></ProtectedRoute>} />
          <Route path="/teacher/reports" element={<ProtectedRoute requiredRole="teacher"><TeacherReports /></ProtectedRoute>} />
          <Route path="/teacher/student-progress/:studentId" element={<ProtectedRoute requiredRole="teacher"><TeacherStudentProgress /></ProtectedRoute>} />
          <Route path="/teacher/messages" element={<ProtectedRoute requiredRole="teacher"><TeacherMessages /></ProtectedRoute>} />
          <Route path="/teacher/messages/:studentId" element={<ProtectedRoute requiredRole="teacher"><TeacherMessages /></ProtectedRoute>} />
          <Route path="/teacher/lesson-plans" element={<ProtectedRoute requiredRole="teacher"><TeacherLessonPlans /></ProtectedRoute>} />
          <Route path="/teacher/assessments" element={<ProtectedRoute requiredRole="teacher"><TeacherAssessments /></ProtectedRoute>} />
          <Route path="/teacher/settings" element={<ProtectedRoute requiredRole="teacher"><TeacherSettings /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute requiredRole="admin"><AdminAnalytics /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><AdminUserManagement /></ProtectedRoute>} />
          <Route path="/admin/content" element={<ProtectedRoute requiredRole="admin"><AdminContentManagement /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute requiredRole="admin"><AdminSettings /></ProtectedRoute>} />
          <Route path="/admin/database" element={<ProtectedRoute requiredRole="admin"><AdminDatabase /></ProtectedRoute>} />
          <Route path="/admin/security" element={<ProtectedRoute requiredRole="admin"><AdminSecurity /></ProtectedRoute>} />
          <Route path="/admin/monitoring" element={<ProtectedRoute requiredRole="admin"><AdminMonitoring /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}