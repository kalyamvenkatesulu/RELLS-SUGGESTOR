import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  UserProfile, 
  Interaction, 
  Reel, 
  Recommendation, 
  InterestDimension,
  AIAnalysisStep,
  DifficultyLevel,
  ReelCategory
} from '../types';
import { INITIAL_USER, INITIAL_INTERACTIONS, REELS_DATA, LEARNING_JOURNEY_NODES } from '../data/mockData';
import { RecommendationEngine } from '../services/recommendationEngine';
import { AIPipelineService, AI_PIPELINE_STAGES } from '../services/aiPipelineService';

export type NavigationTab = 
  | 'landing' 
  | 'dashboard' 
  | 'interactions' 
  | 'interests' 
  | 'analysis' 
  | 'recommendations' 
  | 'journey';

interface AppContextType {
  user: UserProfile;
  interactions: Interaction[];
  reels: Reel[];
  recommendations: Recommendation[];
  interests: InterestDimension[];
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedReelForPlayer: Reel | null;
  openReelPlayer: (reel: Reel) => void;
  closeReelPlayer: () => void;
  
  // AI Demo Runner State
  isDemoRunning: boolean;
  demoProgress: number; // 0 - 100
  demoCurrentStep: number;
  demoSteps: AIAnalysisStep[];
  startAIDemo: () => Promise<void>;
  closeDemoModal: () => void;
  showDemoModal: boolean;
  setShowDemoModal: (show: boolean) => void;

  // Real-time interaction triggers
  recordSimulatedInteraction: (params: {
    reelId: string;
    watchPercentage: number;
    liked: boolean;
    saved: boolean;
    shared: boolean;
    rewatches: number;
  }) => void;
  removeInteraction: (interactionId: string) => void;
  resetToAlexDefault: () => void;

  // Recommendation Actions
  toggleSaveRecommendation: (recId: string) => void;
  toggleLikeRecommendation: (recId: string) => void;
  activeExplanationRec: Recommendation | null;
  setActiveExplanationRec: (rec: Recommendation | null) => void;

  // Filters
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (diff: string) => void;
  minQualityThreshold: number;
  setMinQualityThreshold: (val: number) => void;

  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [interactions, setInteractions] = useState<Interaction[]>(INITIAL_INTERACTIONS);
  const [activeTab, setActiveTab] = useState<NavigationTab>('landing');
  const [selectedReelForPlayer, setSelectedReelForPlayer] = useState<Reel | null>(null);
  
  // Demo Runner
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [demoCurrentStep, setDemoCurrentStep] = useState<number>(0);
  const [demoProgress, setDemoProgress] = useState<number>(0);
  const [demoSteps, setDemoSteps] = useState<AIAnalysisStep[]>(AI_PIPELINE_STAGES);

  // Inspector & Actions
  const [activeExplanationRec, setActiveExplanationRec] = useState<Recommendation | null>(null);
  const [savedRecIds, setSavedRecIds] = useState<Set<string>>(new Set(['rec_reel_swe_day']));
  const [likedRecIds, setLikedRecIds] = useState<Set<string>>(new Set());

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [minQualityThreshold, setMinQualityThreshold] = useState<number>(0);

  // Theme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Compute Interest Dimensions from current interactions
  const interests = useMemo(() => {
    return RecommendationEngine.inferInterests(interactions);
  }, [interactions]);

  // Compute Recommendations from current interactions
  const rawRecommendations = useMemo(() => {
    return RecommendationEngine.generateRecommendations(interactions, REELS_DATA);
  }, [interactions]);

  // Apply save/like state & filters to recommendations
  const recommendations = useMemo(() => {
    return rawRecommendations
      .map(rec => ({
        ...rec,
        isSaved: savedRecIds.has(rec.id),
        isLiked: likedRecIds.has(rec.id)
      }))
      .filter(rec => {
        if (categoryFilter !== 'All' && rec.category !== categoryFilter) return false;
        if (difficultyFilter !== 'All' && rec.difficulty !== difficultyFilter) return false;
        if (rec.qualityScore < minQualityThreshold) return false;
        return true;
      });
  }, [rawRecommendations, savedRecIds, likedRecIds, categoryFilter, difficultyFilter, minQualityThreshold]);

  // Sync user profile stats
  useEffect(() => {
    if (interests.length > 0) {
      setUser(prev => ({
        ...prev,
        primaryInterest: interests[0].domain,
        aiConfidence: interests[0].confidence,
        totalReelsAnalyzed: interactions.length,
        savedReelsCount: savedRecIds.size
      }));
    }
  }, [interests, interactions.length, savedRecIds.size]);

  // Toggle Theme class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const openReelPlayer = (reel: Reel) => {
    setSelectedReelForPlayer(reel);
  };

  const closeReelPlayer = () => {
    setSelectedReelForPlayer(null);
  };

  const toggleSaveRecommendation = (recId: string) => {
    setSavedRecIds(prev => {
      const next = new Set(prev);
      if (next.has(recId)) next.delete(recId);
      else next.add(recId);
      return next;
    });
  };

  const toggleLikeRecommendation = (recId: string) => {
    setLikedRecIds(prev => {
      const next = new Set(prev);
      if (next.has(recId)) next.delete(recId);
      else next.add(recId);
      return next;
    });
  };

  const recordSimulatedInteraction = (params: {
    reelId: string;
    watchPercentage: number;
    liked: boolean;
    saved: boolean;
    shared: boolean;
    rewatches: number;
  }) => {
    const targetReel = REELS_DATA.find(r => r.id === params.reelId);
    if (!targetReel) return;

    let engagement: 'Low' | 'Medium' | 'High' | 'Very High' = 'Medium';
    if (params.watchPercentage >= 90 || params.saved || params.rewatches > 0) engagement = 'Very High';
    else if (params.watchPercentage >= 70 || params.liked) engagement = 'High';
    else if (params.watchPercentage < 30) engagement = 'Low';

    const newInteraction: Interaction = {
      id: `int_${Date.now()}`,
      userId: user.id,
      reelId: targetReel.id,
      reelTitle: targetReel.title,
      category: targetReel.category,
      watchPercentage: params.watchPercentage,
      liked: params.liked,
      saved: params.saved,
      shared: params.shared,
      rewatches: params.rewatches,
      skipped: params.watchPercentage < 25,
      timestamp: 'Just now',
      engagement,
      signalsSummary: `${params.watchPercentage}% Watch${params.liked ? ' + Liked' : ''}${params.saved ? ' + Saved' : ''}${params.rewatches > 0 ? ` + ${params.rewatches}x Rewatch` : ''}`
    };

    setInteractions(prev => [newInteraction, ...prev]);
  };

  const removeInteraction = (interactionId: string) => {
    setInteractions(prev => prev.filter(i => i.id !== interactionId));
  };

  const resetToAlexDefault = () => {
    setInteractions(INITIAL_INTERACTIONS);
    setUser(INITIAL_USER);
    setSavedRecIds(new Set(['rec_reel_swe_day']));
    setLikedRecIds(new Set());
  };

  const startAIDemo = async () => {
    setShowDemoModal(true);
    setIsDemoRunning(true);
    setDemoProgress(0);
    setDemoCurrentStep(0);

    const totalSteps = AI_PIPELINE_STAGES.length;

    await AIPipelineService.runFullPipeline(interactions, (stepIndex, updatedSteps) => {
      setDemoCurrentStep(stepIndex);
      setDemoSteps(updatedSteps);
      const progress = Math.round(((stepIndex + 1) / totalSteps) * 100);
      setDemoProgress(progress);
    });

    setIsDemoRunning(false);
  };

  const closeDemoModal = () => {
    setShowDemoModal(false);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        interactions,
        reels: REELS_DATA,
        recommendations,
        interests,
        activeTab,
        setActiveTab,
        selectedReelForPlayer,
        openReelPlayer,
        closeReelPlayer,
        isDemoRunning,
        demoProgress,
        demoCurrentStep,
        demoSteps,
        startAIDemo,
        closeDemoModal,
        showDemoModal,
        setShowDemoModal,
        recordSimulatedInteraction,
        removeInteraction,
        resetToAlexDefault,
        toggleSaveRecommendation,
        toggleLikeRecommendation,
        activeExplanationRec,
        setActiveExplanationRec,
        categoryFilter,
        setCategoryFilter,
        difficultyFilter,
        setDifficultyFilter,
        minQualityThreshold,
        setMinQualityThreshold,
        isDarkMode,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
