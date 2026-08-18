import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  BrainCircuit, 
  Info, 
  ArrowUpRight,
  GitBranch,
  Shield,
  Zap,
  Target
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InterestsPage: React.FC = () => {
  const { interests, user } = useApp();
  const [selectedDimension, setSelectedDimension] = useState(interests[0]);

  // Format data for Recharts Radar Chart
  const radarData = interests.map(item => ({
    subject: item.domain.replace(' & Architecture', '').replace(' & Algorithms', '').replace(' & DevOps', ''),
    fullSubject: item.domain,
    score: item.score,
    confidence: item.confidence,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>AI Dynamic Inference Profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            Your Technology Interest Profile
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Continuous Bayesian inference synthesizing watch depth, code familiarity, saves, and rewatches.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-right">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Primary Inferred Domain</p>
            <p className="text-sm font-extrabold text-cyan-300 font-['Outfit']">{user.primaryInterest}</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Interest Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Cols: Interactive Radar Visualization */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white font-['Outfit']">Multi-Dimensional Interest Radar</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                8 Domains Tracked
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Visual representation of inferred knowledge domains vs. noise suppression.
            </p>
          </div>

          {/* Radar Chart Container */}
          <div className="w-full h-80 sm:h-96 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} 
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  stroke="#475569" 
                  tick={{ fill: '#64748b', fontSize: 9 }} 
                />
                <Radar
                  name="Affinity Score"
                  dataKey="score"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.4}
                />
                <Radar
                  name="AI Confidence"
                  dataKey="confidence"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.2}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                    fontSize: '12px',
                    color: '#f8fafc'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-800 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500" />
              <span className="text-slate-300">Interest Affinity Score</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400" />
              <span className="text-slate-300">AI Confidence Index</span>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Ranked Dimensions & Selected Inspector */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white font-['Outfit']">Ranked Technology Affinities</h3>
              <span className="text-[11px] text-slate-400">Click to inspect signals</span>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {interests.map((item) => {
                const isSelected = selectedDimension?.domain === item.domain;
                return (
                  <div
                    key={item.domain}
                    onClick={() => setSelectedDimension(item)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-500/50 shadow-md shadow-indigo-950'
                        : 'bg-slate-800/40 border-slate-750 hover:bg-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-200">{item.domain}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.trend === 'rising' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          item.trend === 'emerging' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                          'bg-slate-700 text-slate-300'
                        }`}>
                          {item.trend}
                        </span>
                        <span className="text-xs font-extrabold text-cyan-300 font-mono">{item.score}%</span>
                      </div>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Inspector Box */}
          {selectedDimension && (
            <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Evidence Trail: {selectedDimension.domain}
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-300">
                  Confidence: {selectedDimension.confidence}%
                </span>
              </div>

              <div className="space-y-2 mb-3">
                {selectedDimension.evidence.map((ev, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{ev}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-indigo-900/50">
                <p className="text-[11px] font-semibold text-slate-400 mb-1.5">Latent Semantic Nodes:</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDimension.relatedTopics.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-900/80 border border-indigo-800/40 text-[10px] font-medium text-cyan-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Connected Domain Knowledge Network Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">
              <GitBranch className="w-4 h-4 text-purple-400" />
              <span>Latent Knowledge Graph</span>
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Cross-Domain Bridge & Semantic Discovery
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              How the AI bridges casual short-form interactions into structured technical mastery.
            </p>
          </div>
        </div>

        {/* Visual Graph Bridges */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700 text-left relative">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Watched Trigger</span>
            <h4 className="text-sm font-bold text-white mt-1">Java Meme & OOP</h4>
            <p className="text-xs text-slate-400 mt-1">NPE Debugging, OOP syntax</p>
            <div className="mt-3 text-[10px] font-bold text-slate-500">Weight: 40%</div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 text-left relative">
            <span className="text-[10px] font-mono text-indigo-300 font-bold uppercase">Semantic Bridge</span>
            <h4 className="text-sm font-bold text-cyan-300 mt-1">SWE Practice & Lifestyle</h4>
            <p className="text-xs text-slate-400 mt-1">Code reviews, sprint planning</p>
            <div className="mt-3 text-[10px] font-bold text-indigo-400">Affinity: 92%</div>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/60 text-left relative">
            <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase">Next High-Value Leap</span>
            <h4 className="text-sm font-bold text-white mt-1">DSA & Interview Prep</h4>
            <p className="text-xs text-slate-400 mt-1">Tree recursion, sliding window</p>
            <div className="mt-3 text-[10px] font-bold text-cyan-400">Relevance: 94%</div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/60 text-left relative">
            <span className="text-[10px] font-mono text-purple-300 font-bold uppercase">Future Horizon</span>
            <h4 className="text-sm font-bold text-purple-200 mt-1">System Design & Cloud</h4>
            <p className="text-xs text-slate-400 mt-1">Distributed queues & caching</p>
            <div className="mt-3 text-[10px] font-bold text-purple-400">Expansion: 74%</div>
          </div>

        </div>

      </div>

    </div>
  );
};
