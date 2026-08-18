import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Cpu, 
  PlaySquare, 
  TrendingUp, 
  ShieldCheck, 
  BrainCircuit, 
  Zap, 
  Layers, 
  GraduationCap, 
  Compass, 
  ChevronRight,
  Eye,
  BookmarkCheck,
  Flame,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC = () => {
  const { setActiveTab, startAIDemo, recommendations, user } = useApp();
  const topRec = recommendations[0];

  return (
    <div className="min-h-screen pb-20 overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Glow ambient spots */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse-slow">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Next-Gen AI Tech Recommender</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-['Outfit'] text-white max-w-4xl mx-auto leading-[1.15]">
            Make Your Scrolling <br className="hidden sm:inline" />
            <span className="gradient-text-blue">Smarter.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            AI understands what you're truly interested in and transforms random technology scrolling into a personalized learning journey.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('recommendations')}
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-xl shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-5 h-5 text-cyan-200" />
              <span>Try AI Recommendation</span>
              <ArrowRight className="w-4 h-4 text-cyan-200" />
            </button>

            <button
              onClick={() => startAIDemo()}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-indigo-500/40 shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <BrainCircuit className="w-5 h-5 text-indigo-400" />
              <span>Explore 6-Stage Demo</span>
            </button>
          </div>

          {/* Visual Flow Indicator */}
          <div className="mt-16 max-w-4xl mx-auto p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 text-left flex items-center justify-between">
              <span>The TechReel AI Intelligence Flow</span>
              <span className="text-cyan-400 font-mono">Simulated for {user.name}</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative">
              {[
                { step: '01', title: 'Scroll', desc: 'Random Reels & Memes', icon: PlaySquare, color: 'text-amber-400' },
                { step: '02', title: 'Understand', desc: 'Syntax, Code & Semantics', icon: Eye, color: 'text-cyan-400' },
                { step: '03', title: 'Infer', desc: 'Holistic Tech Interests', icon: BrainCircuit, color: 'text-indigo-400' },
                { step: '04', title: 'Recommend', desc: 'High-Value Next Leap', icon: Sparkles, color: 'text-purple-400' },
                { step: '05', title: 'Learn', desc: 'Structured Roadmap', icon: GraduationCap, color: 'text-emerald-400' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-left relative group hover:border-indigo-500/50 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-slate-500">{item.step}</span>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <h4 className="text-xs font-bold text-white mb-0.5">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-tight">{item.desc}</p>
                    {idx < 4 && (
                      <ChevronRight className="hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 z-10" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 2. Why It Is Different: Side-by-Side Comparison */}
      <section className="py-16 bg-slate-950/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
              Why TechReel AI Is Fundamentally Different
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              Traditional social feeds lock you in shallow keyword echo chambers. Our agent infers your higher-order engineering potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            
            {/* Traditional Recommender Box */}
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-800/30 relative">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-4">
                <XCircle className="w-5 h-5" />
                <span>Traditional Keyword Recommender</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-4 text-left">
                <p className="text-xs font-mono text-slate-400 mb-1">User Watched:</p>
                <p className="text-sm font-semibold text-slate-200">"Java Programming Meme: NullPointerException"</p>
              </div>
              <div className="text-center my-3 text-slate-500 font-bold text-xs">
                ↓ Naive 1:1 Keyword String Match
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-rose-900/40 text-left">
                <p className="text-xs font-mono text-rose-400 mb-1">Resulting Recommendation:</p>
                <p className="text-sm font-semibold text-slate-300">"Another Java Syntax Joke" or "Random Java Quiz"</p>
                <p className="text-xs text-rose-400/80 mt-2">
                  ❌ Trapped in repetitive loop without educational progression or career context.
                </p>
              </div>
            </div>

            {/* TechReel AI Intelligent Box */}
            <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/40 relative glow-border">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm mb-4">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                <span>TechReel AI Inference Agent</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-indigo-900/50 mb-4 text-left">
                <p className="text-xs font-mono text-indigo-300 mb-1">Observed Behavioral Footprint:</p>
                <p className="text-xs font-medium text-slate-300 leading-relaxed">
                  Java Meme (95% watch) + SWE Startup Day (100% + Save) + Interview Tree Joke (92% + Save) + Laptop Specs (87%)
                </p>
              </div>
              <div className="text-center my-3 text-cyan-400 font-bold text-xs">
                ↓ Multi-Signal Domain Inference (92% Confidence)
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/80 to-slate-900/90 border border-cyan-500/30 text-left">
                <p className="text-xs font-mono text-cyan-300 mb-1">Curated Next Learning Leap:</p>
                <p className="text-sm font-bold text-white">
                  "DSA Concepts Every Aspiring Software Engineer Must Master for Technical Interviews"
                </p>
                <p className="text-xs text-cyan-300/90 mt-2">
                  ✓ Connects programming fluency with technical interview mastery and career ambition.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Core Features Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Built for Modern Tech Learners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Intelligent Features Behind TechReel AI
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {[
            {
              icon: BrainCircuit,
              title: 'AI Interest Detection',
              desc: 'Infers multi-dimensional domain affinities across 8+ technical disciplines using watch time, likes, saves, and rewatches.',
              color: 'from-indigo-500 to-indigo-700',
              accent: 'text-indigo-400'
            },
            {
              icon: ShieldCheck,
              title: 'Hype & Quality Filter',
              desc: 'Filters out low-effort clickbait (e.g. "Get Rich with AI in 2026") while prioritizing technical depth, credibility, and code clarity.',
              color: 'from-cyan-500 to-blue-600',
              accent: 'text-cyan-400'
            },
            {
              icon: Compass,
              title: 'Explainable AI Rationale',
              desc: 'Transparent reasoning explaining WHY every single recommendation is made, citing interaction evidence and career relevance.',
              color: 'from-purple-500 to-pink-600',
              accent: 'text-purple-400'
            },
            {
              icon: TrendingUp,
              title: 'Technology Learning Roadmap',
              desc: 'Guides students progressively from programming syntax to DSA, System Design, and Cloud DevOps architectures.',
              color: 'from-emerald-500 to-teal-600',
              accent: 'text-emerald-400'
            },
            {
              icon: PlaySquare,
              title: 'Interactive Reel Simulator',
              desc: 'Simulate short-form video consumption with real-time feedback loops that recompute the AI interest graph on the fly.',
              color: 'from-amber-500 to-orange-600',
              accent: 'text-amber-400'
            },
            {
              icon: Award,
              title: 'Privacy-First Architecture',
              desc: 'Simulates local student behavior safely without intrusive private account scraping or non-consensual tracking.',
              color: 'from-sky-500 to-indigo-600',
              accent: 'text-sky-400'
            }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/50 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feature.color} p-0.5 mb-5 flex items-center justify-center shadow-lg shadow-indigo-900/30`}>
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${feature.accent}`} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-['Outfit']">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}

        </div>
      </section>

      {/* 4. Live Spotlight Teaser */}
      {topRec && (
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-indigo-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Current Top Recommendation for Alex Rivera</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit'] max-w-2xl">
                  {topRec.reel.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
                  {topRec.explanation.whyRecommended}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold">
                    {topRec.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                    Quality: {topRec.qualityScore}/100
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
                    Match: {topRec.matchScore}%
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('recommendations')}
                className="flex-shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
              >
                <span>View Full Recommendation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
