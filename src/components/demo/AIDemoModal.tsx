import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  X, 
  BrainCircuit, 
  CheckCircle2, 
  Clock, 
  Play, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Eye, 
  RotateCcw,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AIDemoModal: React.FC = () => {
  const { 
    showDemoModal, 
    closeDemoModal, 
    isDemoRunning, 
    demoProgress, 
    demoCurrentStep, 
    demoSteps, 
    startAIDemo,
    openReelPlayer,
    recommendations,
    setActiveTab
  } = useApp();

  const topRec = recommendations[0];

  useEffect(() => {
    if (demoProgress === 100 && !isDemoRunning) {
      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }
    }
  }, [demoProgress, isDemoRunning]);

  if (!showDemoModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fade-in overflow-y-auto">
      <div className="max-w-3xl w-full my-8 p-6 sm:p-8 rounded-3xl bg-[#0b0f19] border-2 border-indigo-500/50 shadow-2xl shadow-indigo-950 space-y-6 relative overflow-hidden">
        
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5">
              <div className="w-full h-full bg-slate-900 rounded-[10px] p-1.5">
                <BrainCircuit className="w-5 h-5 text-cyan-300" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white font-['Outfit']">
                AI Recommendation Agent Live Demo
              </h2>
              <p className="text-xs text-slate-400">
                Simulating autonomous multi-signal analysis and interest synthesis in real time.
              </p>
            </div>
          </div>

          <button
            onClick={closeDemoModal}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master Progress Bar */}
        <div className="space-y-2 relative z-10">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300 flex items-center gap-2">
              {isDemoRunning ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-cyan-300">Agent Processing Stage {demoCurrentStep + 1} of 6...</span>
                </>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Agent Synthesis Complete (100%)</span>
                </span>
              )}
            </span>
            <span className="font-mono text-cyan-400 font-extrabold">{demoProgress}%</span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-500/50"
              style={{ width: `${demoProgress}%` }}
            />
          </div>
        </div>

        {/* 6 Stage Stepper Cards */}
        <div className="space-y-3 relative z-10 max-h-[340px] overflow-y-auto pr-1">
          {demoSteps.map((step, idx) => {
            const isDone = step.status === 'completed';
            const isCurrent = step.status === 'running';

            return (
              <div
                key={step.stepNumber}
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  isCurrent
                    ? 'bg-indigo-950/70 border-cyan-400/80 shadow-lg shadow-indigo-950 glow-border-cyan scale-[1.01]'
                    : isDone
                    ? 'bg-slate-900/90 border-emerald-500/30'
                    : 'bg-slate-900/40 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center ${
                      isDone ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                      isCurrent ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse' :
                      'bg-slate-800 text-slate-500'
                    }`}>
                      0{step.stepNumber}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white font-['Outfit']">{step.title}</h4>
                  </div>

                  {isDone && (
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Synthesized</span>
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-[11px] font-bold text-cyan-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span>Evaluating...</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 ml-8 mb-2 leading-relaxed">{step.description}</p>

                {/* Key Findings Preview */}
                {step.findings && step.findings.length > 0 && (isCurrent || isDone) && (
                  <div className="ml-8 pt-2 border-t border-slate-800 space-y-1">
                    {step.findings.slice(0, 2).map((finding, fIdx) => (
                      <div key={fIdx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span>{finding}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final Conclusion Box (Revealed when 100% complete) */}
        {demoProgress === 100 && topRec && (
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-950/90 via-slate-900 to-slate-950 border-2 border-cyan-400/60 shadow-2xl relative z-10 space-y-4 animate-scale-up">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold">
                🎯 Detected Primary Interest: Software Engineering (92% Confidence)
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                Match Score: {topRec.matchScore}%
              </span>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white font-['Outfit']">
                Recommended: {topRec.reel.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {topRec.explanation.whyRecommended}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-indigo-900/50">
              <button
                onClick={() => {
                  closeDemoModal();
                  openReelPlayer(topRec.reel);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Recommended Reel</span>
              </button>

              <button
                onClick={() => {
                  closeDemoModal();
                  setActiveTab('recommendations');
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                <span>View Full Recommendation Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 relative z-10 text-xs">
          <button
            onClick={() => startAIDemo()}
            disabled={isDemoRunning}
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-300 font-semibold disabled:opacity-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-run Agent Simulation</span>
          </button>

          <button
            onClick={closeDemoModal}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
