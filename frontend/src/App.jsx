import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import OnboardingWizard from './components/OnboardingWizard';
import LoadingAnalysis from './components/LoadingAnalysis';
import Dashboard from './components/Dashboard';
import EmptyGraphState from './components/EmptyGraphState';

import { 
  fetchDemoSkillTwin, 
  analyzeSkillTwin, 
  updateTaskProgress, 
  fetchDashboard, 
  fetchHealth,
  liveSwitchRole,
  liveAddSkill,
  liveAddProject,
  DEFAULT_SUDHARSANA_PROFILE
} from './services/api';

const STORAGE_KEY = 'active_skilltwin_profile';

export default function App() {
  // Check if user already built a profile previously
  const [currentView, setCurrentView] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? 'dashboard' : 'landing';
  });

  const [dashboardData, setDashboardData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not parse saved profile:", e);
    }
    return null;
  });

  const [onboardingInitialStep, setOnboardingInitialStep] = useState(1);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
  const [errorBanner, setErrorBanner] = useState(null);

  // Check backend health on mount
  useEffect(() => {
    fetchHealth().catch(() => {});
  }, []);

  // 1-Click Interactive Demo Mode (Instant AI Engineer twin for judges)
  const handleTryDemo = async () => {
    setErrorBanner(null);
    setCurrentView('loading');
    try {
      const demoData = await fetchDemoSkillTwin();
      setDashboardData(demoData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoData));
      setCurrentView('dashboard');
    } catch (err) {
      console.error("Demo fetch error:", err);
      setDashboardData(DEFAULT_SUDHARSANA_PROFILE);
      setCurrentView('dashboard');
    }
  };

  // Submit Real User Onboarding Form
  const handleSubmitOnboarding = async (payload) => {
    setErrorBanner(null);
    setCurrentView('loading');
    try {
      const analyzedData = await analyzeSkillTwin(payload);
      setDashboardData(analyzedData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(analyzedData));
      setCurrentView('dashboard');
    } catch (err) {
      console.error("Analysis pipeline error:", err);
      setErrorBanner(err.message || "Failed to analyze SkillTwin profile. Please verify backend connection.");
      setCurrentView('onboarding');
    }
  };

  // Dynamic Task Completion Recalibration
  const handleToggleTask = async (taskId, isCompleted) => {
    if (!dashboardData) return;
    setIsUpdatingProgress(true);

    try {
      const res = await updateTaskProgress(dashboardData.user_id, taskId, isCompleted);
      
      if (res && res.success) {
        // Fetch fresh full dashboard state from backend
        const refreshedDashboard = await fetchDashboard(dashboardData.user_id);
        setDashboardData(refreshedDashboard);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(refreshedDashboard));
      }
    } catch (err) {
      console.error("Progress update error:", err);
      // Local optimistic update
      setDashboardData(prev => {
        const updated = {
          ...prev,
          alignment_score: Math.min(100, (prev.alignment_score || 68) + 4.5)
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } finally {
      setIsUpdatingProgress(false);
    }
  };

  // Live Role Switcher (re-runs 6-agent calibration)
  const handleLiveSwitchRole = async (newRole) => {
    if (!dashboardData?.user_id) return;
    setIsUpdatingProgress(true);
    try {
      const updated = await liveSwitchRole(dashboardData.user_id, newRole);
      setDashboardData(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to switch role dynamically:", err);
    } finally {
      setIsUpdatingProgress(false);
    }
  };

  // Live Skill Addition (re-runs 6-agent calibration)
  const handleLiveAddSkill = async (skillData) => {
    if (!dashboardData?.user_id) return;
    setIsUpdatingProgress(true);
    try {
      const updated = await liveAddSkill(dashboardData.user_id, skillData);
      setDashboardData(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to add skill dynamically:", err);
    } finally {
      setIsUpdatingProgress(false);
    }
  };

  const handleRefreshDashboard = async () => {
    if (!dashboardData?.user_id) return;
    try {
      const refreshed = await fetchDashboard(dashboardData.user_id);
      setDashboardData(refreshed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(refreshed));
    } catch (err) {
      console.error("Failed to refresh dashboard:", err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Landing / Onboarding Navigation */}
      {currentView !== 'dashboard' && (
        <Navbar 
          onStartOnboarding={() => { setErrorBanner(null); setCurrentView('onboarding'); }}
          onTryDemo={handleTryDemo}
          onGoHome={() => setCurrentView('landing')}
          currentView={currentView}
        />
      )}

      {/* Global Alert Banner */}
      {errorBanner && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.95)',
          color: '#ffffff',
          padding: '12px 20px',
          textAlign: 'center',
          fontSize: '0.88rem',
          fontWeight: 600,
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {errorBanner}
        </div>
      )}

      {/* Primary View Router */}
      <div style={{ flex: 1 }}>
        {currentView === 'landing' && (
          <LandingPage 
            onStartOnboarding={() => { 
              setErrorBanner(null); 
              setOnboardingInitialStep(1); 
              setCurrentView('onboarding'); 
            }}
            onTryDemo={handleTryDemo}
          />
        )}

        {currentView === 'onboarding' && (
          <OnboardingWizard 
            initialStep={onboardingInitialStep}
            onSubmit={handleSubmitOnboarding}
            onCancel={() => {
              if (dashboardData) setCurrentView('dashboard');
              else setCurrentView('landing');
            }}
            onTryDemo={handleTryDemo}
          />
        )}

        {currentView === 'loading' && (
          <LoadingAnalysis />
        )}

        {currentView === 'dashboard' && dashboardData && (
          <Dashboard 
            data={dashboardData}
            onToggleTask={handleToggleTask}
            onRefreshDashboard={handleRefreshDashboard}
            isUpdatingProgress={isUpdatingProgress}
            onResetToDemo={handleTryDemo}
            onNewProfile={() => {
              setOnboardingInitialStep(1);
              setCurrentView('onboarding');
            }}
            onClearProfile={() => {
              localStorage.removeItem(STORAGE_KEY);
              setDashboardData(null);
            }}
            onGoHome={() => setCurrentView('landing')}
            onLiveSwitchRole={handleLiveSwitchRole}
            onLiveAddSkill={handleLiveAddSkill}
          />
        )}

        {/* Proper Empty State when no profile is created or user resets */}
        {currentView === 'dashboard' && !dashboardData && (
          <div className="container" style={{ padding: '40px 16px' }}>
            <EmptyGraphState 
              onAddSkills={() => {
                setErrorBanner(null);
                setOnboardingInitialStep(2);
                setCurrentView('onboarding');
              }}
              onAddProject={() => {
                setErrorBanner(null);
                setOnboardingInitialStep(3);
                setCurrentView('onboarding');
              }}
              onSetCareerGoal={() => {
                setErrorBanner(null);
                setOnboardingInitialStep(1);
                setCurrentView('onboarding');
              }}
              onUploadResume={() => {
                setErrorBanner(null);
                setOnboardingInitialStep(1);
                setCurrentView('onboarding');
              }}
              onLoadDemo={handleTryDemo}
            />
          </div>
        )}
      </div>
    </div>
  );
}
