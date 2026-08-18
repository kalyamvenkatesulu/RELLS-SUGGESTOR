import React from 'react';
import { 
  Sparkles, 
  Activity, 
  Cpu, 
  Flame, 
  PlaySquare, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  BrainCircuit, 
  Clock, 
  Bookmark, 
  BarChart3, 
  ShieldAlert, 
  Share2, 
  ThumbsUp, 
  ChevronRight,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Dashboard: React.FC = () => {
  const { 
    user, 
    interactions, 
    interests, 
    recommendations, 
    setActiveTab, 
    openReelPlayer, 
    startAIDemo,
    setActiveExplanationRec
  } = useApp();

  const primaryInterest = interests[0] || { domain: 'Software Engineering', score: 92, confidence: 94 };
  const featuredRec = recommendations[0];
  const recentInteractions = interactions.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/50 shadow-xl"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-slate-900 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                  Welcome back, {user.name}
                </h1>
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 border border-indigo-500/40 text-cyan-300">
                  {user.academicYear}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                AI Agent active: Synthesizing your short-form tech video signals into a structured curriculum.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => startAIDemo()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Run AI Demo</span>
            </button>
            <button
              onClick={() => setActiveTab('interactions')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-sm font-semibold transition-all"
            >
              <PlaySquare className="w-4 h-4 text-slate-400" />
              <span>View All ({interactions.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Primary Interest */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all shadow-lg group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Primary Interest</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-white font-['Outfit'] truncate">
            {primaryInterest.domain}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold text-indigo-400">{primaryInterest.score}% Affinity</span>
            <span className="text-[11px] text-slate-500">• Inferred from 4 signals</span>
          </div>
        </div>

        {/* Metric 2: Engagement Level */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all shadow-lg group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Engagement Depth</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Activity className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-white font-['Outfit']">
            {user.overallEngagement}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold text-emerald-400">82.4% avg completion</span>
            <span className="text-[11px] text-slate-500">• 2 rewatches</span>
          </div>
        </div>

        {/* Metric 3: Technology Interests Count */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition-all shadow-lg group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Technology Domains</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <Layers className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-white font-['Outfit']">
            {interests.length} Mapped
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold text-purple-400">DSA + AI + Cloud</span>
            <span className="text-[11px] text-slate-500">• In network</span>
          </div>
        </div>

        {/* Metric 4: AI Confidence */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 transition-all shadow-lg group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Confidence</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-white font-['Outfit']">
            {user.aiConfidence}%
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold text-emerald-400">High Reliability</span>
            <span className="text-[11px] text-slate-500">• Noise filtered</span>
          </div>
        </div>

      </div>

      {/* 3. Main Dashboard Body: Featured Recommendation & Interest Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Featured AI Recommendation Spotlight */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white font-['Outfit']">Recommended For You</h2>
            </div>
            <button
              onClick={() => setActiveTab('recommendations')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>View all ({recommendations.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {featuredRec && (
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-indigo-500/30 backdrop-blur-xl relative shadow-xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold">
                    {featuredRec.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                    {featuredRec.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Match Relevance:</span>
                  <span className="text-sm font-extrabold text-cyan-300 font-mono">
                    {featuredRec.matchScore}%
                  </span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit'] leading-tight mb-3">
                {featuredRec.reel.title}
              </h3>

              {/* Explainable Rationale Preview */}
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 mb-5 text-left">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 mb-1.5">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span>Why We Recommended This (Explainable AI)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {featuredRec.explanation.whyRecommended}
                </p>
                <div className="mt-2.5 pt-2.5 border-t border-indigo-900/40 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Bridge: <strong className="text-slate-300">{featuredRec.explanation.connectedFrom}</strong></span>
                  <span className="text-indigo-400 font-semibold">AI Confidence: {featuredRec.explanation.confidence}%</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openReelPlayer(featuredRec.reel)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Reel Simulation</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveExplanationRec(featuredRec);
                      setActiveTab('recommendations');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 text-xs font-semibold transition-all border border-slate-700"
                  >
                    Deep Rationale & Hype Breakdown
                  </button>
                </div>

                <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Content Quality: {featuredRec.qualityScore}/100</span>
                </div>
              </div>

            </div>
          )}

          {/* Recent Interaction History Preview */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PlaySquare className="w-4 h-4 text-indigo-400" />
                <h3 className="text-base font-bold text-white font-['Outfit']">Recent Reel Interactions</h3>
              </div>
              <button
                onClick={() => setActiveTab('interactions')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>Manage interactions</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {recentInteractions.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-750 hover:bg-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-200 truncate">{item.reelTitle}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-semibold text-slate-400">{item.category}</span>
                      <span className="text-[10px] text-slate-600">•</span>
                      <span className={`text-[10px] font-bold ${
                        item.engagement === 'Very High' ? 'text-emerald-400' :
                        item.engagement === 'High' ? 'text-cyan-400' : 'text-slate-400'
                      }`}>
                        {item.engagement} Engagement
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-mono font-bold text-slate-300">
                      {item.watchPercentage}%
                    </span>
                    {item.saved && (
                      <span className="p-1 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                        Saved
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Interest Profile & Roadmap Progress */}
        <div className="space-y-6">
          
          {/* Technology Interest Profile Snapshot */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-white font-['Outfit']">Interest Affinity Breakdown</h3>
              </div>
              <button
                onClick={() => setActiveTab('interests')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Radar View
              </button>
            </div>

            <div className="space-y-4">
              {interests.slice(0, 6).map((item) => (
                <div key={item.domain} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300 truncate max-w-[170px]">{item.domain}</span>
                    <span className="font-mono font-bold text-cyan-300">{item.score}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800/80">
              <button
                onClick={() => setActiveTab('interests')}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Explore Full Interest Graph</span>
              </button>
            </div>
          </div>

          {/* Technology Learning Journey Quick Status */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base font-bold text-white font-['Outfit']">Your Learning Journey</h3>
            </div>
            
            <p className="text-xs text-slate-400 mb-4">
              Current Stage: <strong className="text-cyan-300 font-semibold">{user.currentRoadmapStage}</strong>
            </p>

            <div className="space-y-3">
              {[
                { title: 'Programming & OOP', status: 'Completed', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
                { title: 'Data Structures & Algorithms', status: 'Recommended Next', color: 'text-cyan-300 bg-cyan-500/20 border-cyan-500/40' },
                { title: 'Technical Interviews', status: 'In Progress', color: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/30' },
                { title: 'System Design', status: 'Upcoming', color: 'text-slate-400 bg-slate-800/50 border-slate-700' },
              ].map((step, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-800/40 border border-slate-750">
                  <span className="font-semibold text-slate-200">{step.title}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${step.color}`}>
                    {step.status}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('journey')}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
            >
              <span>View Full Visual Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
