import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Compass, 
  Cpu, 
  Flame, 
  PlaySquare, 
  RotateCcw, 
  Sun, 
  Moon, 
  BrainCircuit,
  Activity,
  Home,
  CheckCircle2,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { useApp, NavigationTab } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { 
    user, 
    activeTab, 
    setActiveTab, 
    startAIDemo, 
    isDemoRunning, 
    interactions, 
    recommendations,
    resetToAlexDefault,
    isDarkMode,
    toggleTheme
  } = useApp();

  const navItems: { id: NavigationTab; label: string; icon: React.FC<{ className?: string }>; count?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'interactions', label: 'Interactions', icon: PlaySquare, count: interactions.length },
    { id: 'interests', label: 'Interest Profile', icon: Cpu },
    { id: 'analysis', label: 'AI Reasoning', icon: BrainCircuit },
    { id: 'recommendations', label: 'Recommendations', icon: Sparkles, count: recommendations.length },
    { id: 'journey', label: 'Learning Journey', icon: TrendingUp },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-cyan-400 animate-pulse-slow" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300 font-['Outfit']">
                  TechReel<span className="text-indigo-400 font-black">AI</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                  Agent v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Turn scrolling into a personalized learning journey
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
            <button
              onClick={() => setActiveTab('landing')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeTab === 'landing'
                  ? 'bg-indigo-600/90 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.count !== undefined && (
                    <span className={`px-1.5 py-0.2 text-[10px] rounded-md font-bold ${
                      isActive ? 'bg-indigo-900/80 text-cyan-200' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            {/* Run AI Demo CTA */}
            <button
              onClick={() => startAIDemo()}
              disabled={isDemoRunning}
              className="relative group overflow-hidden flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-cyan-200 animate-spin-slow" />
              <span>{isDemoRunning ? 'Simulating Agent...' : 'Run AI Demo'}</span>
              <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            </button>

            {/* Reset data */}
            <button
              onClick={resetToAlexDefault}
              title="Reset to Alex Rivera default dataset"
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle theme mode"
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Student Profile Pill */}
            <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-slate-800">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500/40"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#090d16]" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-200 leading-tight">{user.name}</p>
                <p className="text-[10px] text-cyan-400 font-medium">{user.role}</p>
              </div>
            </div>

          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2.5 border-t border-slate-800/60 no-scrollbar">
          <button
            onClick={() => setActiveTab('landing')}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeTab === 'landing' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
