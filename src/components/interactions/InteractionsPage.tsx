import React, { useState } from 'react';
import { 
  PlaySquare, 
  Plus, 
  Heart, 
  Bookmark, 
  Share2, 
  RotateCw, 
  Flame, 
  Trash2, 
  Sparkles, 
  Filter, 
  Search, 
  Play, 
  CheckCircle2, 
  RotateCcw,
  Sliders,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { REELS_DATA } from '../../data/mockData';
import { Reel } from '../../types';

export const InteractionsPage: React.FC = () => {
  const { 
    interactions, 
    removeInteraction, 
    resetToAlexDefault, 
    recordSimulatedInteraction,
    openReelPlayer,
    startAIDemo
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSimulateDrawer, setShowSimulateDrawer] = useState<boolean>(false);

  // Simulation Form State
  const [simReelId, setSimReelId] = useState<string>(REELS_DATA[6].id);
  const [simWatchPercent, setSimWatchPercent] = useState<number>(90);
  const [simLiked, setSimLiked] = useState<boolean>(true);
  const [simSaved, setSimSaved] = useState<boolean>(false);
  const [simShared, setSimShared] = useState<boolean>(false);
  const [simRewatches, setSimRewatches] = useState<number>(0);

  const categories = ['All', 'Programming', 'Software Engineering', 'Developer Lifestyle & Career', 'Artificial Intelligence', 'Hardware & Architecture', 'Gaming & Tech Entertainment'];

  const filteredInteractions = interactions.filter(item => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (searchTerm && !item.reelTitle.toLowerCase().includes(searchTerm.toLowerCase()) && !item.category.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recordSimulatedInteraction({
      reelId: simReelId,
      watchPercentage: simWatchPercent,
      liked: simLiked,
      saved: simSaved,
      shared: simShared,
      rewatches: simRewatches
    });
    setShowSimulateDrawer(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
            <PlaySquare className="w-4 h-4 text-cyan-400" />
            <span>Behavioral Telemetry Log</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            Reel Interaction Analysis
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Simulated short-form video interactions used by the AI engine to infer holistic learning interests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSimulateDrawer(true)}
            className="flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Simulate New Watch</span>
          </button>
          
          <button
            onClick={resetToAlexDefault}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition-all"
            title="Reset to Alex Rivera default dataset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search interaction titles or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Interactions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInteractions.map((item, idx) => {
          const reelMeta = REELS_DATA.find(r => r.id === item.reelId);

          return (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Top Meta */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-cyan-300 border border-slate-700">
                    Reel {idx + 1} • {item.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">{item.timestamp}</span>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-white font-['Outfit'] mb-3 line-clamp-2">
                  {item.reelTitle}
                </h3>

                {/* Telemetry Progress Bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">Watch Completion</span>
                    <span className="font-mono font-bold text-cyan-300">{item.watchPercentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.watchPercentage >= 80 ? 'bg-gradient-to-r from-cyan-500 to-emerald-400' :
                        item.watchPercentage >= 40 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' :
                        'bg-rose-500'
                      }`}
                      style={{ width: `${item.watchPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Interaction Signals Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                    item.liked ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30' : 'bg-slate-800/60 text-slate-500'
                  }`}>
                    <Heart className={`w-3 h-3 ${item.liked ? 'fill-current' : ''}`} />
                    <span>{item.liked ? 'Liked' : 'No Like'}</span>
                  </span>

                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                    item.saved ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30' : 'bg-slate-800/60 text-slate-500'
                  }`}>
                    <Bookmark className={`w-3 h-3 ${item.saved ? 'fill-current' : ''}`} />
                    <span>{item.saved ? 'Saved' : 'Not Saved'}</span>
                  </span>

                  {item.rewatches > 0 && (
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                      <RotateCw className="w-3 h-3" />
                      <span>{item.rewatches}x Rewatch</span>
                    </span>
                  )}

                  {item.skipped && (
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      Fast Skip
                    </span>
                  )}
                </div>

                {/* Engagement Inference */}
                <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-750 text-left mb-4">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold mb-0.5">
                    Engagement Impact:
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${
                      item.engagement === 'Very High' ? 'text-emerald-400' :
                      item.engagement === 'High' ? 'text-cyan-400' :
                      item.engagement === 'Medium' ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {item.engagement}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate max-w-[150px]">
                      {item.signalsSummary}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                {reelMeta && (
                  <button
                    onClick={() => openReelPlayer(reelMeta)}
                    className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Simulation</span>
                  </button>
                )}

                <button
                  onClick={() => removeInteraction(item.id)}
                  title="Remove interaction from telemetry log"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Privacy Notice Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
        <span className="text-cyan-400 font-semibold">Privacy-Preserving Prototype:</span> This application uses simulated and anonymized interaction data and does not access private social media or YouTube accounts.
      </div>

      {/* Simulation Modal / Drawer */}
      {showSimulateDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="max-w-lg w-full p-6 sm:p-7 rounded-3xl bg-slate-900 border border-indigo-500/40 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-['Outfit']">Simulate Reel Interaction</h3>
              </div>
              <button
                onClick={() => setShowSimulateDrawer(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSimulateSubmit} className="space-y-4">
              
              {/* Select Reel */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Select Reel from Library
                </label>
                <select
                  value={simReelId}
                  onChange={(e) => setSimReelId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {REELS_DATA.map((reel) => (
                    <option key={reel.id} value={reel.id}>
                      [{reel.category}] {reel.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Watch Percentage Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
                  <span>Watch Percentage</span>
                  <span className="font-mono text-cyan-400 font-bold">{simWatchPercent}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={simWatchPercent}
                  onChange={(e) => setSimWatchPercent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Interaction Toggles */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/60 border border-slate-750 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simLiked}
                    onChange={(e) => setSimLiked(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-0"
                  />
                  <span className="text-xs text-slate-200 font-medium">Liked Reel</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/60 border border-slate-750 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simSaved}
                    onChange={(e) => setSimSaved(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-0"
                  />
                  <span className="text-xs text-slate-200 font-medium">Saved (High Intent)</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-800/60 border border-slate-750 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simShared}
                    onChange={(e) => setSimShared(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-0"
                  />
                  <span className="text-xs text-slate-200 font-medium">Shared with Friends</span>
                </label>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-750">
                  <span className="text-xs text-slate-200 font-medium">Rewatches</span>
                  <select
                    value={simRewatches}
                    onChange={(e) => setSimRewatches(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded p-1"
                  >
                    <option value="0">0</option>
                    <option value="1">1x</option>
                    <option value="2">2x</option>
                    <option value="3">3x</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all"
                >
                  Send Interaction to AI Engine
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
