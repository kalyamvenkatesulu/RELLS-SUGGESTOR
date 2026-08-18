import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { LandingPage } from './components/landing/LandingPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { InteractionsPage } from './components/interactions/InteractionsPage';
import { InterestsPage } from './components/interests/InterestsPage';
import { AnalysisPage } from './components/analysis/AnalysisPage';
import { RecommendationsPage } from './components/recommendations/RecommendationsPage';
import { JourneyPage } from './components/journey/JourneyPage';
import { AIDemoModal } from './components/demo/AIDemoModal';
import { ReelPlayerModal } from './components/player/ReelPlayerModal';
import { 
  BrainCircuit, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  Heart, 
  Github, 
  ExternalLink,
  Code2
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#080c14] text-slate-100 selection:bg-indigo-500 selection:text-white">
      
      {/* Sticky Top Header */}
      <Header />

      {/* Main Page Body */}
      <main className="flex-1">
        {activeTab === 'landing' && <LandingPage />}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'interactions' && <InteractionsPage />}
        {activeTab === 'interests' && <InterestsPage />}
        {activeTab === 'analysis' && <AnalysisPage />}
        {activeTab === 'recommendations' && <RecommendationsPage />}
        {activeTab === 'journey' && <JourneyPage />}
      </main>

      {/* Persistent Global Modals */}
      <AIDemoModal />
      <ReelPlayerModal />

      {/* Premium Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            
            {/* Col 1: Brand & Problem Statement */}
            <div className="md:col-span-2 space-y-3 text-left">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5 flex items-center justify-center">
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                    <BrainCircuit className="w-4 h-4 text-cyan-300" />
                  </div>
                </div>
                <span className="font-extrabold text-lg tracking-tight text-white font-['Outfit']">
                  TechReel<span className="text-indigo-400">AI</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                Transforming unstructured short-form technology scrolling (memes, dev lifestyle, interviews, hardware) into personalized, explainable learning journeys through multi-signal AI interest inference.
              </p>
              <div className="flex items-center gap-2 pt-2 text-[11px] text-cyan-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Simulated Privacy-Preserving Architecture (No private social scraping)</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="text-left space-y-2">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider font-['Outfit']">Pages & Views</p>
              <ul className="space-y-1 text-xs text-slate-400">
                <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-cyan-300 transition-colors">Analytics Dashboard</button></li>
                <li><button onClick={() => setActiveTab('interactions')} className="hover:text-cyan-300 transition-colors">Interaction Telemetry</button></li>
                <li><button onClick={() => setActiveTab('interests')} className="hover:text-cyan-300 transition-colors">Interest Radar</button></li>
                <li><button onClick={() => setActiveTab('recommendations')} className="hover:text-cyan-300 transition-colors">AI Recommendations</button></li>
                <li><button onClick={() => setActiveTab('journey')} className="hover:text-cyan-300 transition-colors">Learning Roadmap</button></li>
              </ul>
            </div>

            {/* Col 3: Core Algorithm Formulas */}
            <div className="text-left space-y-2">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider font-['Outfit']">Scoring Mechanism</p>
              <p className="text-[11px] text-slate-400 font-mono leading-relaxed bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                Score = (0.30·Interest + 0.15·Engagement + 0.25·TopicBridge + 0.15·LearningVal + 0.10·Diff + 0.05·Novelty) × QualityMultiplier
              </p>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 TechReel AI. Built with React, TypeScript, and Explainable AI Recommendation Agents.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-slate-400">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Deterministic Mock AI & LLM Ready</span>
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
