import React from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  GraduationCap, 
  Play, 
  Clock, 
  Award,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LEARNING_JOURNEY_NODES, REELS_DATA } from '../../data/mockData';

export const JourneyPage: React.FC = () => {
  const { user, openReelPlayer, setActiveTab } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Structured Tech Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            Your Technology Learning Journey
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Visual milestone roadmap connecting short-form engagement to full-stack engineering proficiency.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-right">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Current Milestone</p>
          <p className="text-sm font-extrabold text-cyan-300 font-['Outfit']">{user.currentRoadmapStage}</p>
        </div>
      </div>

      {/* Progress Milestone Strip */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl relative overflow-hidden">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
          Sequential Progression Pipeline
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 relative">
          {LEARNING_JOURNEY_NODES.map((node, idx) => {
            const isCompleted = node.status === 'completed';
            const isNext = node.status === 'recommended_next';
            const isInProgress = node.status === 'in_progress';

            return (
              <div
                key={node.id}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isNext
                    ? 'bg-indigo-950/70 border-cyan-400/80 shadow-lg shadow-indigo-950 glow-border-cyan'
                    : isCompleted
                    ? 'bg-emerald-950/30 border-emerald-500/40'
                    : isInProgress
                    ? 'bg-amber-950/30 border-amber-500/40'
                    : 'bg-slate-800/30 border-slate-750'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500">0{idx + 1}</span>
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {isNext && <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />}
                  {isInProgress && <Clock className="w-4 h-4 text-amber-400" />}
                  {node.status === 'future' && <Circle className="w-4 h-4 text-slate-600" />}
                </div>

                <h4 className="text-xs font-bold text-white mb-1 leading-tight">{node.title}</h4>
                <span className={`text-[10px] font-semibold block ${
                  isNext ? 'text-cyan-300 font-bold' : isCompleted ? 'text-emerald-400' : 'text-slate-400'
                }`}>
                  {isNext ? 'Recommended Next' : isCompleted ? 'Mastered' : isInProgress ? 'In Progress' : 'Future Milestone'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Milestone Roadmap Cards */}
      <div className="space-y-6">
        {LEARNING_JOURNEY_NODES.map((node, idx) => {
          const isNext = node.status === 'recommended_next';
          const isCompleted = node.status === 'completed';
          const connectedReel = REELS_DATA.find(r => r.title.includes(node.recommendedReelTitle || '___'));

          return (
            <div
              key={node.id}
              className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                isNext
                  ? 'bg-slate-900/90 border-2 border-indigo-500/60 shadow-xl shadow-indigo-950 glow-border'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                <div className="space-y-3 max-w-3xl">
                  
                  {/* Badge Row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                      STAGE 0{idx + 1}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      isCompleted ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' :
                      isNext ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white border-transparent' :
                      'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {node.level}
                    </span>
                    <span className="text-xs text-slate-400">~{node.estimatedHours} Hours of Curated Concept Mastery</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit']">
                    {node.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {node.description}
                  </p>

                  {/* Skills Grid */}
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Core Technical Skills:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {node.keySkills.map((skill) => (
                        <span key={skill} className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-cyan-300 font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {node.prerequisites.length > 0 && (
                    <div className="text-xs text-slate-400">
                      <span>Prerequisites: </span>
                      <strong className="text-slate-300">{node.prerequisites.join(', ')}</strong>
                    </div>
                  )}

                </div>

                {/* Right Action Box: Connected Reel */}
                <div className="flex-shrink-0 lg:w-72 p-4 rounded-2xl bg-slate-800/50 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-1">
                      Curated Milestone Reel
                    </span>
                    <p className="text-xs font-bold text-white line-clamp-2 mb-3">
                      {node.recommendedReelTitle || 'Fundamentals Overview'}
                    </p>
                  </div>

                  {connectedReel && (
                    <button
                      onClick={() => openReelPlayer(connectedReel)}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Watch Milestone Reel</span>
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
