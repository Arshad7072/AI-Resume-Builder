import React from "react";
import { Routes, Route } from "react-router-dom";

// before login pages
import LandingPage from "./pages/LandingPage/LandingPage";

// after login pages
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";

// sidebar my resumes pages
import MyResumes from "./pages/MyResumes/MyResumes";
import EditResume from "./pages/MyResumes/EditResume/EditResume";
import ResumePreview from "./pages/MyResumes/ResumePreview/ResumePreview";

// create resume page
import CreateResume from "./pages/CreateResume/CreateResume";

// templates page
import Templates from "./pages/TemplatesPage/TemplatesPage";

// template preview
import TemplatePreview from "./pages/TemplatesPage/TemplatePreview/TemplatePreview";

// AI Tools pages
import AITools from "./pages/AITools/AITools";
import SummaryGenerator from "./pages/AITools/SummaryGenerator/SummaryGenerator";
import ExperienceGenerator from "./pages/AITools/ExperienceGenerator/ExperienceGenerator";
import ProjectGenerator from "./pages/AITools/ProjectGenerator/ProjectGenerator";
import SkillsGenerator from "./pages/AITools/SkillsGenerator/SkillsGenerator";
import CoverLetterGenerator from "./pages/AITools/CoverLetterGenerator/CoverLetterGenerator";
import ResumeScore from "./pages/AITools/ResumeScore/ResumeScore";

// Ats checker page
import ATSChecker from "./pages/ATSChecker/ATSChecker";

// download history
import DownloadHistory from "./pages/DownloadHistory/DownloadHistory";

// profile pages
import Profile from "./pages/Profile/Profile";

// Settings
import Settings from "./pages/Settings/Settings";

// help & supports
import HelpSupport from "./pages/HelpSupport/HelpSupport";

// ===========================
// Admin Panel
// ===========================

import AdminRoute from "./admin/components/AdminRoute";
import AdminLayout from "./admin/layouts/AdminLayout";
import AdminDashboard from "./admin/pages/Dashboard";
import AdminUsers from "./admin/pages/Users";
import AdminResumes from "./admin/pages/Resumes";
import AdminSupport from "./admin/pages/Support";
import AdminAnalytics from "./admin/pages/Analytics";
import AdminSettings from "./admin/pages/Settings";

function App() {
  return (
    <>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* My Resumes */}
        <Route
          path="/my-resumes"
          element={
            <ProtectedRoute>
              <MyResumes />
            </ProtectedRoute>
          }
        />
        {/* Create Resume */}
        <Route
          path="/create-resume"
          element={
            <ProtectedRoute>
              <CreateResume />
            </ProtectedRoute>
          }
        />
        {/* Edit Resume */}
        <Route
          path="/edit-resume/:id"
          element={
            <ProtectedRoute>
              <EditResume />
            </ProtectedRoute>
          }
        />
        {/* resume preview */}
        <Route
          path="/resume-preview/:id"
          element={
            <ProtectedRoute>
              <ResumePreview />
            </ProtectedRoute>
          }
        />
        {/* Templates */}
        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <Templates />
            </ProtectedRoute>
          }
        />
        {/* template preview */}
        <Route
          path="/template-preview/:template"
          element={
            <ProtectedRoute>
              <TemplatePreview />
            </ProtectedRoute>
          }
        />
        {/* AI Tools */}
        <Route
          path="/ai-tools"
          element={
            <ProtectedRoute>
              <AITools />
            </ProtectedRoute>
          }
        />
        {/* AI Summary Generator */}
        <Route
          path="/ai-tools/summary"
          element={
            <ProtectedRoute>
              <SummaryGenerator />
            </ProtectedRoute>
          }
        />
        {/* AI Experience Generator */}
        <Route
          path="/ai-tools/experience"
          element={
            <ProtectedRoute>
              <ExperienceGenerator />
            </ProtectedRoute>
          }
        />
        {/* AI Project Generator */}
        <Route
          path="/ai-tools/projects"
          element={
            <ProtectedRoute>
              <ProjectGenerator />
            </ProtectedRoute>
          }
        />
        {/* AI Skills Generator */}
        <Route
          path="/ai-tools/skills"
          element={
            <ProtectedRoute>
              <SkillsGenerator />
            </ProtectedRoute>
          }
        />
        {/* AI Cover Letter Generator */}
        <Route
          path="/ai-tools/cover-letter"
          element={
            <ProtectedRoute>
              <CoverLetterGenerator />
            </ProtectedRoute>
          }
        />
        {/* AI Resume Score */}
        <Route
          path="/ai-tools/resume-score"
          element={
            <ProtectedRoute>
              <ResumeScore />
            </ProtectedRoute>
          }
        />
        {/* Ats checker page */}
        <Route
          path="/ats-checker"
          element={
            <ProtectedRoute>
              <ATSChecker />
            </ProtectedRoute>
          }
        />
        {/* Download history */}
        <Route
          path="/download-history"
          element={
            <ProtectedRoute>
              <DownloadHistory />
            </ProtectedRoute>
          }
        />
        {/* profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* settings */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        {/*Help &supports */}
        <Route
          path="/help"
          element={
            <ProtectedRoute>
              <HelpSupport />
            </ProtectedRoute>
          }
        />

        {/* ===========================
      Admin Panel
=========================== */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="resumes" element={<AdminResumes />} />
          <Route path="support" element={<AdminSupport />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        {/* 404 */}
        <Route
          path="*"
          element={
            <h1 style={{ textAlign: "center" }}>404 - Page Not Found</h1>
          }
        />
      </Routes>
    </>
  );
}

export default App;
