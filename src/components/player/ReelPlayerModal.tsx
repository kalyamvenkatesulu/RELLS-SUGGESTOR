import React, { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  Bookmark, 
  Share2, 
  RotateCw, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Code2, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Sliders,
  Send,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReelPlayerModal: React.FC = () => {
  const { 
    selectedReelForPlayer, 
    closeReelPlayer, 
    recordSimulatedInteraction, 
    user 
  } = useApp();

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [watchProgress, setWatchProgress] = useState<number>(85);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [rewatchCount, setRewatchCount] = useState<number>(0);
  const [showTakeaways, setShowTakeaways] = useState<boolean>(false);
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const [simulatedComments, setSimulatedComments] = useState<Array<{ user: string; text: string; time: string }>>([
    { user: 'algo_enthusiast', text: 'This explanation of sliding window clicked instantly for me!', time: '2h ago' },
    { user: 'junior_dev_mike', text: 'Whiteboard interview anxiety cured. Adding to my prep playlist.', time: '4h ago' }
  ]);

  useEffect(() => {
    if (selectedReelForPlayer) {
      setIsPlaying(true);
      setWatchProgress(95);
      setIsLiked(false);
      setIsSaved(false);
      setRewatchCount(0);
    }
  }, [selectedReelForPlayer]);

  if (!selectedReelForPlayer) return null;

  const reel = selectedReelForPlayer;

  const handleClose = () => {
    // Record interaction telemetry when user leaves the player
    recordSimulatedInteraction({
      reelId: reel.id,
      watchPercentage: watchProgress,
      liked: isLiked,
      saved: isSaved,
      shared: false,
      rewatches: rewatchCount
    });
    closeReelPlayer();
  };

  const handleRewatch = () => {
    setRewatchCount(prev => prev + 1);
    setWatchProgress(100);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSimulatedComments(prev => [{ user: user.name.toLowerCase().replace(' ', '_'), text: commentText, time: 'Just now' }, ...prev]);
    setCommentText('');
    setIsLiked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      
      {/* Container: Vertical Phone Aspect Ratio */}
      <div className="relative w-full max-w-sm sm:max-w-md h-[88vh] max-h-[820px] rounded-3xl bg-slate-950 border-2 border-indigo-500/50 shadow-2xl overflow-hidden flex flex-col justify-between">
        
        {/* Dynamic Animated Video Simulation Canvas */}
        <div className={`absolute inset-0 bg-gradient-to-br ${reel.thumbnailColor} opacity-70 pointer-events-none`} />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#090d16]/70 to-[#090d16] pointer-events-none" />

        {/* Top Header Controls */}
        <div className="relative z-20 p-4 flex items-center justify-between text-white bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600/80 text-white backdrop-blur-md">
              {reel.category}
            </span>
            <span className="text-[10px] text-slate-300 font-medium">
              {reel.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Middle Body: Interactive Simulated Content & Code View */}
        <div className="relative z-10 p-5 flex-1 flex flex-col justify-center space-y-4">
          
          {/* Animated Audio Equalizer Visualizer */}
          <div className="flex items-center justify-center gap-1 my-2">
            {[40, 75, 90, 60, 100, 45, 80, 65, 95, 50, 85, 30].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-cyan-400/80 rounded-full transition-all duration-300"
                style={{
                  height: isPlaying ? `${Math.max(12, h * 0.4)}px` : '6px',
                  opacity: isPlaying ? 0.9 : 0.3
                }}
              />
            ))}
          </div>

          {/* Key Insight Card */}
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md text-left">
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Takeaway</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
              "{reel.keyTakeaway}"
            </p>
          </div>

          {/* Code Snippet Card (if present) */}
          {reel.codeSnippet && (
            <div className="p-3 rounded-xl bg-slate-900/90 border border-indigo-500/30 backdrop-blur-md text-left font-mono">
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5 pb-1 border-b border-slate-800">
                <span className="flex items-center gap-1 text-indigo-300">
                  <Code2 className="w-3 h-3" />
                  <span>Interactive Code Snippet</span>
                </span>
                <span>{reel.technologyTags[0]}</span>
              </div>
              <pre className="text-[11px] text-cyan-200 overflow-x-auto p-1 leading-snug">
                {reel.codeSnippet}
              </pre>
            </div>
          )}

          {/* Play/Pause Central Overlay */}
          <div className="text-center pt-1">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all hover:scale-110 shadow-lg"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>
          </div>

        </div>

        {/* Bottom Area: Creator info, Title, Controls, Interactions */}
        <div className="relative z-20 p-5 bg-gradient-to-t from-black via-black/80 to-transparent space-y-4">
          
          {/* Creator Profile */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={reel.avatarUrl}
                alt={reel.creator}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500"
              />
              <div className="text-left">
                <p className="text-xs font-bold text-white leading-tight">{reel.creator}</p>
                <p className="text-[10px] text-cyan-400 font-medium">{reel.creatorHandle}</p>
              </div>
            </div>

            {/* Quality badge */}
            <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>{reel.overallQualityScore}/100</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-white text-left line-clamp-2">
            {reel.title}
          </h3>

          {/* Watch Progress Scrubber */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Telemetry Watch Progress</span>
              <span className="text-cyan-300 font-bold">{watchProgress}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={watchProgress}
              onChange={(e) => setWatchProgress(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Social Interaction Buttons Strip (Updates AI Engine) */}
          <div className="flex items-center justify-around pt-2 border-t border-white/10 text-xs">
            
            {/* Like */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <div className={`p-2 rounded-full ${isLiked ? 'bg-rose-600 text-white' : 'bg-white/10 text-white'}`}>
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </div>
              <span className="text-[10px] font-semibold">{isLiked ? 'Liked' : 'Like'}</span>
            </button>

            {/* Save */}
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <div className={`p-2 rounded-full ${isSaved ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white'}`}>
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </div>
              <span className="text-[10px] font-semibold">{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            {/* Rewatch (Increments AI weight) */}
            <button
              onClick={handleRewatch}
              className="flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <div className="p-2 rounded-full bg-white/10 hover:bg-cyan-500/30 text-white relative">
                <RotateCw className="w-4 h-4" />
                {rewatchCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 text-slate-900 rounded-full text-[9px] font-extrabold flex items-center justify-center">
                    {rewatchCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold">Rewatch</span>
            </button>

            {/* Done / Commit to AI */}
            <button
              onClick={handleClose}
              className="flex flex-col items-center gap-1 text-cyan-300 hover:text-cyan-200 transition-colors"
            >
              <div className="p-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold">Log to AI</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
