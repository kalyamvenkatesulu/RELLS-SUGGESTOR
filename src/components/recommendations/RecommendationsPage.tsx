import React, { useState } from 'react';
import { 
  Sparkles, 
  Play, 
  Bookmark, 
  Heart, 
  BrainCircuit, 
  ShieldCheck, 
  SlidersHorizontal, 
  Layers, 
  GraduationCap, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ArrowRight,
  TrendingUp,
  Flame,
  X,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Recommendation } from '../../types';

export const RecommendationsPage: React.FC = () => {
  const { 
    recommendations, 
    openReelPlayer, 
    toggleSaveRecommendation, 
    toggleLikeRecommendation,
    categoryFilter,
    setCategoryFilter,
    difficultyFilter,
    setDifficultyFilter,
    minQualityThreshold,
    setMinQualityThreshold,
    activeExplanationRec,
    setActiveExplanationRec
  } = useApp();

  const [selectedRecForModal, setSelectedRecForModal] = useState<Recommendation | null>(activeExplanationRec);

  const categories = ['All', 'Data Structures & Algorithms', 'Artificial Intelligence', 'Software Engineering', 'System Design', 'Cloud & DevOps'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const heroRec = recommendations[0];
  const alternativeRecs = recommendations.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Multi-Signal Pedagogical Ranking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            AI Technology Recommendations
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Curated next learning leaps connecting your scrolling behaviors to structured software engineering mastery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-xs font-semibold text-cyan-300">
            {recommendations.length} Curated Recommendations
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
        
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty & Quality Filter */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-semibold">Difficulty:</span>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs text-white rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              {difficulties.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Min Quality:</span>
            <span className="text-xs font-mono text-cyan-400 font-bold">{minQualityThreshold}/100</span>
            <input
              type="range"
              min="0"
              max="90"
              step="10"
              value={minQualityThreshold}
              onChange={(e) => setMinQualityThreshold(Number(e.target.value))}
              className="w-20 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>
        </div>

      </div>

      {/* 1. Large Featured "Hero" Recommendation Card */}
      {heroRec && (
        <div className="p-6 sm:p-9 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-2 border-indigo-500/40 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Card Top Badge Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-extrabold shadow-md uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Rank #1 Primary Recommendation</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-cyan-300 text-xs font-semibold">
                {heroRec.category}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                {heroRec.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Match Score</span>
                <p className="text-lg font-extrabold text-cyan-300 font-mono">{heroRec.matchScore}%</p>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-['Outfit'] leading-tight mb-4 max-w-4xl">
            {heroRec.reel.title}
          </h2>

          <p className="text-sm text-slate-300 mb-6 max-w-3xl leading-relaxed">
            {heroRec.reel.description}
          </p>

          {/* Key Learning Takeaways */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {heroRec.reel.takeaways.map((takeaway, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-750 text-left flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-slate-200">{takeaway}</span>
              </div>
            ))}
          </div>

          {/* Explainable AI Transparent Rationale Drawer */}
          <div className="p-5 sm:p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 mb-6 text-left space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                <BrainCircuit className="w-4 h-4 text-cyan-400" />
                <span>Why We Recommended This (Explainable AI Engine)</span>
              </div>
              <span className="text-xs font-bold font-mono text-indigo-300">
                Confidence: {heroRec.explanation.confidence}%
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {heroRec.explanation.whyRecommended}
            </p>

            {/* Evidence Checklist */}
            <div className="pt-2 border-t border-indigo-900/50 space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Observed Signal Evidence:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {heroRec.explanation.evidence.map((ev, idx) => (
                  <div key={idx} className="text-xs text-slate-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{ev}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quality Breakdown Strip & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
            
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => openReelPlayer(heroRec.reel)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Watch Reel Simulation</span>
              </button>

              <button
                onClick={() => toggleSaveRecommendation(heroRec.id)}
                className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs font-bold transition-all border ${
                  heroRec.isSaved
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${heroRec.isSaved ? 'fill-current' : ''}`} />
                <span>{heroRec.isSaved ? 'Saved to Library' : 'Save for Later'}</span>
              </button>

              <button
                onClick={() => toggleLikeRecommendation(heroRec.id)}
                className={`p-3 rounded-xl border transition-all ${
                  heroRec.isLiked
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${heroRec.isLiked ? 'fill-current text-rose-400' : ''}`} />
              </button>
            </div>

            {/* Quality Score Indicator */}
            <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Content Quality Score</span>
                <p className="text-xs font-bold text-emerald-400">
                  {heroRec.qualityScore}/100 <span className="text-slate-500 font-normal">(Technical Depth: 94%)</span>
                </p>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 2. "Hype Filter" / Content Quality Inspector Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Outfit']">
                The "Hype Filter" Quality Engine
              </h3>
              <p className="text-xs text-slate-400">
                TechReel AI evaluates content across 4 quality pillars and demotes clickbait scams.
              </p>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            Average Recommended Quality: 95.2 / 100
          </div>
        </div>

        {/* 4 Quality Factor Meters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-750 text-left">
            <span className="text-[11px] text-slate-400 font-semibold">Technical Depth</span>
            <p className="text-lg font-mono font-bold text-indigo-400 mt-1">94%</p>
            <div className="w-full h-1.5 rounded-full bg-slate-700 mt-2">
              <div className="h-full rounded-full bg-indigo-500" style={{ width: '94%' }} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-750 text-left">
            <span className="text-[11px] text-slate-400 font-semibold">Educational Value</span>
            <p className="text-lg font-mono font-bold text-cyan-400 mt-1">97%</p>
            <div className="w-full h-1.5 rounded-full bg-slate-700 mt-2">
              <div className="h-full rounded-full bg-cyan-400" style={{ width: '97%' }} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-750 text-left">
            <span className="text-[11px] text-slate-400 font-semibold">Credibility Index</span>
            <p className="text-lg font-mono font-bold text-emerald-400 mt-1">98%</p>
            <div className="w-full h-1.5 rounded-full bg-slate-700 mt-2">
              <div className="h-full rounded-full bg-emerald-400" style={{ width: '98%' }} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-750 text-left">
            <span className="text-[11px] text-slate-400 font-semibold">Clickbait Risk Penalty</span>
            <p className="text-lg font-mono font-bold text-rose-400 mt-1">6% <span className="text-xs font-normal text-slate-400">(Low)</span></p>
            <div className="w-full h-1.5 rounded-full bg-slate-700 mt-2">
              <div className="h-full rounded-full bg-rose-500" style={{ width: '6%' }} />
            </div>
          </div>

        </div>
      </div>

      {/* 3. Alternative Recommendations Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Alternative Curriculum Recommendations
            </h3>
          </div>
          <span className="text-xs text-slate-400">Ranked by composite affinity score</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alternativeRecs.map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-cyan-300 border border-slate-700">
                    Rank #{rec.rank} • {rec.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {rec.matchScore}% Match
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-white font-['Outfit'] mb-2 line-clamp-2">
                  {rec.reel.title}
                </h4>

                <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                  {rec.reel.description}
                </p>

                {/* Short Rationale */}
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-750 text-left mb-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-300 uppercase mb-1">
                    <BrainCircuit className="w-3 h-3" />
                    <span>AI Bridge Rationale</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {rec.explanation.whyRecommended}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-2">
                <button
                  onClick={() => openReelPlayer(rec.reel)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Watch</span>
                </button>

                <button
                  onClick={() => setSelectedRecForModal(rec)}
                  className="text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  Deep Rationale
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleSaveRecommendation(rec.id)}
                    className={`p-2 rounded-lg border transition-all ${
                      rec.isSaved
                        ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                        : 'text-slate-500 hover:text-slate-300 border-transparent'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${rec.isSaved ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={() => toggleLikeRecommendation(rec.id)}
                    className={`p-2 rounded-lg border transition-all ${
                      rec.isLiked
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                        : 'text-slate-500 hover:text-slate-300 border-transparent'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${rec.isLiked ? 'fill-current text-rose-400' : ''}`} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Deep Rationale Modal */}
      {selectedRecForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="max-w-2xl w-full p-6 sm:p-8 rounded-3xl bg-slate-900 border border-indigo-500/40 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-['Outfit']">Explainable Recommendation Dossier</h3>
              </div>
              <button
                onClick={() => setSelectedRecForModal(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-indigo-400">
                {selectedRecForModal.category} • {selectedRecForModal.difficulty}
              </span>
              <h2 className="text-xl font-extrabold text-white font-['Outfit'] mt-1">
                {selectedRecForModal.reel.title}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
              <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider">AI Recommendation Rationale</p>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {selectedRecForModal.explanation.whyRecommended}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Behavioral Evidence Trail</p>
              <div className="space-y-1.5">
                {selectedRecForModal.explanation.evidence.map((ev, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{ev}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-750">
                <span className="text-slate-400 text-[11px] block">Career Relevance:</span>
                <span className="text-slate-200 font-medium">{selectedRecForModal.explanation.careerRelevance}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-750">
                <span className="text-slate-400 text-[11px] block">Connected Bridge From:</span>
                <span className="text-cyan-300 font-medium">{selectedRecForModal.explanation.connectedFrom}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedRecForModal(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const target = selectedRecForModal.reel;
                  setSelectedRecForModal(null);
                  openReelPlayer(target);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Reel Now</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
