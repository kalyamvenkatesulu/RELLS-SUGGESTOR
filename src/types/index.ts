export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type ReelCategory = 
  | 'Programming'
  | 'Software Engineering'
  | 'Data Structures & Algorithms'
  | 'Artificial Intelligence'
  | 'System Design'
  | 'Cloud & DevOps'
  | 'Cybersecurity'
  | 'Hardware & Architecture'
  | 'Developer Lifestyle & Career'
  | 'Web Development'
  | 'Gaming & Tech Entertainment';

export interface Reel {
  id: string;
  title: string;
  creator: string;
  creatorHandle: string;
  avatarUrl: string;
  thumbnailColor: string;
  category: ReelCategory;
  topics: string[];
  difficulty: DifficultyLevel;
  durationSeconds: number;
  description: string;
  takeaways: string[];
  keyTakeaway: string;
  codeSnippet?: string;
  audioTrack: string;
  likesCount: number;
  viewsCount: number;
  // Quality & Hype metrics (0-100)
  educationalValue: number;
  technicalDepth: number;
  credibility: number;
  clickbaitRisk: number;
  // Computed overall quality score (0-100)
  overallQualityScore: number;
  technologyTags: string[];
}

export interface Interaction {
  id: string;
  userId: string;
  reelId: string;
  reelTitle: string;
  category: ReelCategory;
  watchPercentage: number; // 0 - 100
  liked: boolean;
  saved: boolean;
  shared: boolean;
  rewatches: number; // e.g. 0, 1, 2
  skipped: boolean;
  timestamp: string;
  engagement: 'Low' | 'Medium' | 'High' | 'Very High';
  signalsSummary: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  academicYear: string;
  avatar: string;
  primaryInterest: string;
  aiConfidence: number;
  overallEngagement: 'High' | 'Very High' | 'Medium';
  totalReelsAnalyzed: number;
  savedReelsCount: number;
  currentRoadmapStage: string;
}

export interface InterestDimension {
  domain: string;
  score: number; // 0 - 100
  confidence: number; // 0 - 100
  signalCount: number;
  trend: 'rising' | 'stable' | 'emerging';
  evidence: string[];
  relatedTopics: string[];
}

export interface RecommendationExplanation {
  headline: string;
  detectedInterest: string;
  whyRecommended: string;
  evidence: string[];
  careerRelevance: string;
  connectedFrom: string;
  confidence: number;
  prerequisiteConcepts: string[];
}

export interface RecommendationScoreBreakdown {
  interestMatch: number; // 0-100
  engagementPattern: number; // 0-100
  topicRelationship: number; // 0-100
  learningValue: number; // 0-100
  difficultyFit: number; // 0-100
  noveltyBonus: number; // 0-100
  qualityMultiplier: number; // e.g. 0.85 - 1.2
}

export interface Recommendation {
  id: string;
  reelId: string;
  reel: Reel;
  matchScore: number; // 0 - 100
  rank: number;
  category: ReelCategory;
  difficulty: DifficultyLevel;
  detectedInterest: string;
  explanation: RecommendationExplanation;
  scoreBreakdown: RecommendationScoreBreakdown;
  qualityScore: number;
  isSaved?: boolean;
  isLiked?: boolean;
}

export interface AIAnalysisStep {
  stepNumber: number;
  stageName: string;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed';
  durationMs: number;
  findings: string[];
  signals: Array<{ label: string; value: string; impact: 'positive' | 'neutral' | 'high' }>;
  highlightedNodes?: string[];
}

export interface LearningJourneyNode {
  id: string;
  title: string;
  category: ReelCategory;
  status: 'completed' | 'in_progress' | 'recommended_next' | 'future';
  level: string;
  description: string;
  keySkills: string[];
  estimatedHours: number;
  recommendedReelTitle?: string;
  prerequisites: string[];
}
