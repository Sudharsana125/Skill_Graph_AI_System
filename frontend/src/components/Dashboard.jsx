import React, { useState } from 'react';
import TopNavbar from './TopNavbar';
import Sidebar from './Sidebar';
import OverviewCockpit from './OverviewCockpit';
import AssistantDrawer from './AssistantDrawer';
import CommandPalette from './CommandPalette';
import GoalEditorModal from './GoalEditorModal';

// Existing Sub-Components
import RoadmapTimeline from './RoadmapTimeline';
import SkillEvolutionTimeline from './SkillEvolutionTimeline';
import CareerWhatIfSimulator from './CareerWhatIfSimulator';
import SkillTransferPanel from './SkillTransferPanel';
import EvidenceGraphPanel from './EvidenceGraphPanel';
import SkillMap from './SkillMap';
import SkillGapPanel from './SkillGapPanel';
import ProjectCards from './ProjectCards';
import SkillTwinProfile from './SkillTwinProfile';
import JobMarketPanel from './JobMarketPanel';
import NextBestMoveCard from './NextBestMoveCard';

export default function Dashboard({ 
  data, 
  onToggleTask, 
  onRefreshDashboard,
  isUpdatingProgress,
  onResetToDemo,
  onNewProfile,
  onClearProfile,
  onGoHome,
  onLiveSwitchRole,
  onLiveAddSkill
}) {
  const [activeNav, setActiveNav] = useState('overview');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isGoalEditorOpen, setIsGoalEditorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  if (!data) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCompleteNextMove = async () => {
    if (data.next_best_move?.task_id) {
      await onToggleTask(data.next_best_move.task_id, true);
      showToast("Next move marked as completed! Alignment recalibrated.");
    } else {
      // Local progression
      showToast("High-impact sprint marked complete! Recalibrating readiness score.");
      if (data.roadmap && data.roadmap[0]) {
        await onToggleTask(data.roadmap[0].id, true);
      }
    }
  };

  const handleSaveGoals = async ({ targetRole, weeklyHours, timelineMonths }) => {
    setIsGoalEditorOpen(false);
    showToast(`Recalibrating target ambition for: ${targetRole}...`);
    if (onLiveSwitchRole && targetRole !== data.target_role) {
      await onLiveSwitchRole(targetRole);
      showToast(`Profile dynamically recalibrated for ${targetRole}!`);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar with Dynamic User Information */}
      <TopNavbar
        userName={data.name || "Real-Time Engineer"}
        userRole={data.status || "Student"}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onProfileClick={() => setActiveNav('twin')}
        onGoHome={onGoHome}
        onNewProfile={onNewProfile}
      />

      {/* Main Shell: Sidebar + Cockpit Content */}
      <div className="app-shell-layout">
        {/* Left Sidebar */}
        <Sidebar
          activeNav={activeNav}
          onSelectNav={(navId) => setActiveNav(navId)}
          onGrowthCardClick={() => {
            setActiveNav('insights');
            showToast("Inspecting skill growth velocity and compounding milestones.");
          }}
        />

        {/* Cockpit Workspace View */}
        <main className="cockpit-main">
          {/* Back to Overview Breadcrumb when in deeper tabs */}
          {activeNav !== 'overview' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <button
                onClick={() => setActiveNav('overview')}
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                id="back-to-overview-btn"
              >
                ← Return to Overview Cockpit
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="live-pulse"></span>
                <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 700 }}>LIVE AGENT RECALIBRATION</span>
              </div>
            </div>
          )}

          {/* 1. OVERVIEW */}
          {activeNav === 'overview' && (
            <OverviewCockpit
              data={data}
              onNavigateTab={(tab) => setActiveNav(tab)}
              onEditGoals={() => setIsGoalEditorOpen(true)}
              onCompleteNextMove={handleCompleteNextMove}
              isUpdatingProgress={isUpdatingProgress}
            />
          )}

          {/* 2. MY SKILLTWIN PROFILE */}
          {activeNav === 'twin' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <SkillTwinProfile 
                profile={data}
                skills={data.skills || []}
                highPriorityGaps={data.high_priority_gaps || []}
                mediumPriorityGaps={data.medium_priority_gaps || []}
                roadmap={data.roadmap || []}
              />
              <SkillMap skills={data.skills || []} />
            </div>
          )}

          {/* 3. CAREER EXPLORER */}
          {activeNav === 'explorer' && (
            <JobMarketPanel 
              jobStats={data.job_market_frequencies || []}
              marketNote={data.market_note || ""}
              targetRole={data.target_role}
            />
          )}

          {/* 4. LEARNING PATH / ROADMAP */}
          {activeNav === 'learning' && (
            <RoadmapTimeline 
              roadmap={data.roadmap || []}
              onToggleTask={onToggleTask}
              isUpdatingProgress={isUpdatingProgress}
            />
          )}

          {/* 5. PROJECTS */}
          {activeNav === 'projects' && (
            <ProjectCards recommendations={data.project_recommendations || []} />
          )}

          {/* 6. ASSESSMENTS & GAPS */}
          {activeNav === 'assessments' && (
            <SkillGapPanel 
              highPriorityGaps={data.high_priority_gaps || []}
              mediumPriorityGaps={data.medium_priority_gaps || []}
              strongAreas={data.strong_areas || []}
              onNavigateToRoadmap={() => setActiveNav('learning')}
            />
          )}

          {/* 7. EVIDENCE GRAPH */}
          {activeNav === 'evidence' && (
            <EvidenceGraphPanel evidenceGraph={data.evidence_graph || []} />
          )}

          {/* 8. WHAT-IF SIMULATOR */}
          {activeNav === 'whatif' && (
            <CareerWhatIfSimulator 
              userId={data.user_id}
              currentRole={data.target_role}
            />
          )}

          {/* 9. NEXT BEST MOVE */}
          {activeNav === 'nextmove' && data.next_best_move && (
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
              <NextBestMoveCard 
                nextMove={data.next_best_move}
                onCompleteMove={(taskId) => onToggleTask(taskId, true)}
                isUpdating={isUpdatingProgress}
              />
            </div>
          )}

          {/* 10. OPPORTUNITIES & TRANSFER */}
          {activeNav === 'opportunities' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <SkillTransferPanel 
                transferableSkills={data.transferable_skills || []}
                targetRole={data.target_role}
              />
              <JobMarketPanel 
                jobStats={data.job_market_frequencies || []}
                marketNote={data.market_note || ""}
                targetRole={data.target_role}
              />
            </div>
          )}

          {/* 11. INSIGHTS & EVOLUTION */}
          {activeNav === 'insights' && (
            <SkillEvolutionTimeline 
              timeline={data.evolution_timeline || []}
              userId={data.user_id}
              onEvolutionLogged={onRefreshDashboard}
            />
          )}

          {/* 12. SETTINGS */}
          {activeNav === 'settings' && (
            <div className="glass-panel" style={{ padding: '30px', maxWidth: '640px' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#ffffff' }}>Profile & Simulation Preferences</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '24px' }}>
                Re-assess your baseline skill matrix, launch the onboarding wizard, or inspect the clean empty state.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button onClick={onNewProfile} className="btn-primary">
                  Build New SkillGraph
                </button>
                <button onClick={onResetToDemo} className="btn-demo">
                  Load Controlled Demo Profile
                </button>
                {onClearProfile && (
                  <button 
                    onClick={onClearProfile} 
                    className="btn-secondary"
                    style={{ borderColor: 'rgba(244, 63, 94, 0.4)', color: '#fda4af' }}
                  >
                    Reset to Empty State
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Floating Real-Time Recalibration Toast Notification */}
      {toastMessage && (
        <div className="toast-popup">
          <span className="live-pulse"></span>
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f8fafc' }}>
            {toastMessage}
          </span>
        </div>
      )}

      {/* Slide-Out AI Assistant Drawer */}
      <AssistantDrawer 
        userId={data.user_id}
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />

      {/* Ctrl + K Command Palette */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={(tab) => setActiveNav(tab)}
        onAskAssistant={(msg) => {
          setIsAssistantOpen(true);
        }}
      />

      {/* Goal Editor Modal */}
      <GoalEditorModal 
        isOpen={isGoalEditorOpen}
        onClose={() => setIsGoalEditorOpen(false)}
        currentRole={data.target_role || "AI Engineer"}
        weeklyHours={data.weekly_hours || 10}
        timelineMonths={data.timeline_months || 5}
        onSave={handleSaveGoals}
      />
    </div>
  );
}
