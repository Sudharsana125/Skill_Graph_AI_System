import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import OnboardingWizard from './components/OnboardingWizard';
import LoadingAnalysis from './components/LoadingAnalysis';
import Dashboard from './components/Dashboard';

import { 
  fetchDemoSkillTwin, 
  analyzeSkillTwin, 
  updateTaskProgress, 
  fetchDashboard,
  fetchHealth,
  DEFAULT_SUDHARSANA_PROFILE
} from './services/api';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'landing', 'onboarding', 'loading', 'dashboard'
  const [dashboardData, setDashboardData] = useState(DEFAULT_SUDHARSANA_PROFILE);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
  const [errorBanner, setErrorBanner] = useState(null);

  // Load live backend data on initial mount
  useEffect(() => {
    fetchHealth().catch(() => {});
    fetchDemoSkillTwin()
      .then(data => {
        if (data) {
          setDashboardData(data);
        }
      })
      .catch((err) => {
        console.warn("Using offline fallback profile:", err);
      });
  }, []);

  // 1-Click Interactive Demo Mode
  const handleTryDemo = async () => {
    setErrorBanner(null);
    setCurrentView('loading');
    try {
      const demoData = await fetchDemoSkillTwin();
      setDashboardData(demoData);
      setCurrentView('dashboard');
    } catch (err) {
      console.error(err);
      setDashboardData(DEFAULT_SUDHARSANA_PROFILE);
      setCurrentView('dashboard');
    }
  };

  // Submit custom Onboarding Flow
  const handleSubmitOnboarding = async (payload) => {
    setErrorBanner(null);
    setCurrentView('loading');
    try {
      const analyzedData = await analyzeSkillTwin(payload);
      setDashboardData(analyzedData);
      setCurrentView('dashboard');
    } catch (err) {
      console.error(err);
      setErrorBanner(err.message || "Failed to analyze SkillTwin profile. Please check inputs and retry.");
      setCurrentView('onboarding');
    }
  };

  // Dynamic Task Completion Recalibration
  const handleToggleTask = async (taskId, isCompleted) => {
    if (!dashboardData) return;
    setIsUpdatingProgress(true);

    try {
      const res = await updateTaskProgress(dashboardData.user_id, taskId, isCompleted);
      
      if (res.success) {
        // Fetch fresh full dashboard state from backend
        const refreshedDashboard = await fetchDashboard(dashboardData.user_id);
        setDashboardData(refreshedDashboard);
      }
    } catch (err) {
      console.error("Progress update error:", err);
      // Local optimistic update
      setDashboardData(prev => ({
        ...prev,
        alignment_score: Math.min(100, (prev.alignment_score || 68) + 4.5)
      }));
    } finally {
      setIsUpdatingProgress(false);
    }
  };

  const handleRefreshDashboard = async () => {
    if (!dashboardData?.user_id) return;
    try {
      const refreshed = await fetchDashboard(dashboardData.user_id);
      setDashboardData(refreshed);
    } catch (err) {
      console.error("Failed to refresh dashboard:", err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#07090e' }}>
      {/* Only show standard landing Navbar if not on dashboard */}
      {currentView !== 'dashboard' && (
        <Navbar 
          onStartOnboarding={() => { setErrorBanner(null); setCurrentView('onboarding'); }}
          onTryDemo={handleTryDemo}
          onGoHome={() => setCurrentView('landing')}
          currentView={currentView}
        />
      )}

      {/* Global Error Alert Banner */}
      {errorBanner && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.92)',
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
            onStartOnboarding={() => { setErrorBanner(null); setCurrentView('onboarding'); }}
            onTryDemo={handleTryDemo}
          />
        )}

        {currentView === 'onboarding' && (
          <OnboardingWizard 
            onSubmit={handleSubmitOnboarding}
            onCancel={() => setCurrentView('dashboard')}
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
            onNewProfile={() => setCurrentView('onboarding')}
          />
        )}
      </div>
    </div>
  );
}
