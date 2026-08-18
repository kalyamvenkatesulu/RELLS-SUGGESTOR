import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  GitMerge, 
  Layers, 
  CheckCircle2, 
  ArrowDown, 
  ArrowRight, 
  Zap, 
  Eye, 
  ShieldCheck, 
  BarChart2, 
  Compass,
  Cpu,
  ChevronDown,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AnalysisPage: React.FC = () => {
  const { interactions, startAIDemo, user } = useApp();
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      title: 'Interaction Signal Analysis',
      subtitle: 'Deconstruct raw watch time, completion rates, saves, and rewatches',
      icon: Eye,
      color: 'from-amber-500 to-orange-600',
      badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      summary: 'The student showed exceptional engagement across 5 core technology reels with high save-rates, while discarding low-effort gaming clickbait.',
      details: [
        { label: 'High Watch Completion', val: 'Java Meme (95%), SWE Lifestyle (100%), Tree Joke (92%), Laptop Specs (87%)' },
        { label: 'High Intent Saves', val: 'Explicit bookmarking on Software Engineer Startup Day & Coding Interview Joke' },
        { label: 'Deep Technical Rewatch', val: '2x consecutive rewatches on 30-second Transformer Attention internals' },
        { label: 'Noise Filter Triggered', val: 'Gaming setup skipped after 18% watch — suppressed from technology recommendations' }
      ]
    },
    {
      step: 2,
      title: 'Latent Pattern Detection',
      subtitle: 'Detecting cross-topic relationships beyond naive keyword matching',
      icon: GitMerge,
      color: 'from-cyan-500 to-blue-600',
      badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      summary: 'The system discovered repeated semantic convergence between coding syntax, lifestyle aspiration, and interview humor.',
      details: [
        { label: 'Cross-Topic Convergence', val: 'Java Syntax + Day-in-the-Life + Interview Joke $\\rightarrow$ Professional Engineering Readiness' },
        { label: 'Keyword Match Rejection', val: 'Rejected naive rule "Watched Java $\\rightarrow$ Recommend Java syntax". Inferred higher career intent.' },
        { label: 'Cognitive Depth', val: 'Prefers conceptual code understanding (ASTs, OOP, Memory) over surface-level trivia' }
      ]
    },
    {
      step: 3,
      title: 'Holistic Interest Inference',
      subtitle: 'Synthesizing dynamic multidimensional technology domain profile',
      icon: BrainCircuit,
      color: 'from-indigo-500 to-purple-600',
      badgeColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
      summary: 'AI Conclusion: The student is an ambitious sophomore Computer Science student preparing for software engineering careers & interviews.',
      details: [
        { label: 'Primary Interest Profile', val: 'Software Engineering (92% Affinity, 94% AI Confidence)' },
        { label: 'Supporting Pillar Domains', val: 'Programming & Foundations (88%), DSA (81%), Artificial Intelligence (76%)' },
        { label: 'System Maturity Score', val: 'Intermediate (ready for algorithmic problem solving and distributed architectures)' }
      ]
    },
    {
      step: 4,
      title: 'Related Interest Discovery & Pedagogical Bridge',
      subtitle: 'Mapping optimal learning leap in the technology curriculum',
      icon: Compass,
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      summary: 'The AI identifies the foundational gateway needed to unlock the student’s career ambitions: Data Structures & Algorithms.',
      details: [
        { label: 'Bridge Progression', val: 'Software Engineering $\\rightarrow$ Programming $\\rightarrow$ DSA $\\rightarrow$ Technical Interviews $\\rightarrow$ System Design' },
        { label: 'Recommended Leap', val: 'DSA Concepts for Software Engineering Interviews (Relevance: 94%)' },
        { label: 'Pedagogical Rationale', val: 'Connects language fluency to technical interview screening and runtime efficiency' }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <BrainCircuit className="w-4 h-4" />
            <span>Explainable AI Engine Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            AI Reasoning & Decision Pipeline
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Full transparency into how your short-form behavioral footprint is analyzed, synthesized, and transformed.
          </p>
        </div>

        <button
          onClick={() => startAIDemo()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-cyan-200" />
          <span>Launch Interactive Demo</span>
        </button>
      </div>

      {/* Visual Pipeline Interactive Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {steps.map((item) => {
          const Icon = item.icon;
          const isActive = activeStep === item.step;

          return (
            <div
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative group ${
                isActive
                  ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-950 glow-border'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold border ${item.badgeColor}`}>
                  Step 0{item.step}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              </div>

              <h3 className="text-sm font-bold text-white font-['Outfit'] mb-1">{item.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{item.subtitle}</p>

              {isActive && (
                <div className="mt-3 text-[11px] font-bold text-cyan-400 flex items-center gap-1">
                  <span>Currently Inspecting</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Step Detailed Visual Breakdown */}
      {(() => {
        const stepData = steps.find(s => s.step === activeStep) || steps[0];
        const Icon = stepData.icon;

        return (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-indigo-500/30 backdrop-blur-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${stepData.color} p-0.5 flex items-center justify-center shadow-lg`}>
                  <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-cyan-300" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-indigo-400">STAGE 0{stepData.step} OF 04</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit']">
                    {stepData.title}
                  </h2>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400">Agent Processing Status:</span>
                <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 justify-end">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Synthesized & Verified</span>
                </p>
              </div>
            </div>

            {/* Stage Summary */}
            <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-slate-200 text-sm leading-relaxed">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1.5">
                <Info className="w-4 h-4" />
                <span>Executive AI Insight</span>
              </div>
              <p>{stepData.summary}</p>
            </div>

            {/* Signal Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stepData.details.map((detail, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800/40 border border-slate-750 text-left space-y-1"
                >
                  <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider">{detail.label}</p>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">{detail.val}</p>
                </div>
              ))}
            </div>

          </div>
        );
      })()}

      {/* Visual Pipeline Bridge Graph */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
          End-to-End Pipeline Visualization
        </div>
        <h3 className="text-lg font-bold text-white font-['Outfit'] mb-6">
          From Fragmented Scrolling to Structured Software Engineering Curriculum
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
          
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-center w-full md:w-48">
            <p className="text-[10px] font-mono text-amber-400 font-bold">RAW SIGNALS</p>
            <p className="text-xs font-bold text-white mt-1">6 Tech Reels</p>
            <p className="text-[11px] text-slate-400">Java, Career, HW, AI</p>
          </div>

          <div className="text-cyan-400 font-mono font-bold text-xs md:rotate-0 rotate-90">→</div>

          <div className="p-3.5 rounded-xl bg-indigo-950/60 border border-indigo-600/50 text-center w-full md:w-48">
            <p className="text-[10px] font-mono text-indigo-300 font-bold">LATENT PROFILE</p>
            <p className="text-xs font-bold text-white mt-1">Software Engineering</p>
            <p className="text-[11px] text-indigo-300">92% Confidence</p>
          </div>

          <div className="text-cyan-400 font-mono font-bold text-xs md:rotate-0 rotate-90">→</div>

          <div className="p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-600/50 text-center w-full md:w-48">
            <p className="text-[10px] font-mono text-cyan-300 font-bold">HYPE FILTER</p>
            <p className="text-xs font-bold text-white mt-1">Quality Gate</p>
            <p className="text-[11px] text-cyan-300">97/100 Depth Score</p>
          </div>

          <div className="text-cyan-400 font-mono font-bold text-xs md:rotate-0 rotate-90">→</div>

          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-600/50 text-center w-full md:w-48">
            <p className="text-[10px] font-mono text-emerald-300 font-bold">EXPLAINABLE LEAP</p>
            <p className="text-xs font-bold text-white mt-1">DSA Masterclass</p>
            <p className="text-[11px] text-emerald-300">Interview Readiness</p>
          </div>

        </div>
      </div>

    </div>
  );
};
