import { AIAnalysisStep, Interaction } from '../types';

export const AI_PIPELINE_STAGES: AIAnalysisStep[] = [
  {
    stepNumber: 1,
    stageName: 'Interaction Analysis',
    title: 'Analyzing 6 Reel Interactions',
    description: 'Scanning telemetry signals across watch percentage, likes, saves, shares, rewatches, and skips.',
    status: 'pending',
    durationMs: 900,
    findings: [
      'High completion rate (95-100%) on programming and developer lifestyle reels',
      'Positive bookmark/save on "Day in the Life of a Software Engineer" & "Coding Interview Joke"',
      'Fast bounce (18% watch, skipped) on "Gaming Setup 2026"',
      '2 full rewatches on "Transformer Attention Mechanism in 30s"'
    ],
    signals: [
      { label: 'Watch Time Ratio', value: '82.4% avg', impact: 'high' },
      { label: 'High Intent Saves', value: '2 reels', impact: 'high' },
      { label: 'Rewatch Multiplier', value: '2x on AI internals', impact: 'high' },
      { label: 'Noise Filtering', value: '1 gaming skip', impact: 'neutral' }
    ],
    highlightedNodes: ['node_prog', 'node_career', 'node_ai', 'node_hw']
  },
  {
    stepNumber: 2,
    stageName: 'Content Understanding',
    title: 'Extracting Technical Semantics & Quality',
    description: 'Evaluating topic graphs, technical depth, educational value, and syntax complexity of watched content.',
    status: 'pending',
    durationMs: 1100,
    findings: [
      'Identified core themes: OOP, exception handling, code review practices, memory bus bandwidth',
      'Detected problem-solving humor: Whiteboard binary tree inversion',
      'Quality inspection: Watched reels average 84/100 educational value, 77/100 technical depth'
    ],
    signals: [
      { label: 'Domain Entities', value: 'Java, Big-O, Memory, PyTorch', impact: 'high' },
      { label: 'Quality Score Avg', value: '87/100', impact: 'high' },
      { label: 'Difficulty Level', value: 'Beginner to Intermediate', impact: 'neutral' }
    ]
  },
  {
    stepNumber: 3,
    stageName: 'Pattern Detection',
    title: 'Detecting Holistic Interest Patterns',
    description: 'Bypassing naive keyword matching by mapping multi-domain interactions into conceptual clusters.',
    status: 'pending',
    durationMs: 1000,
    findings: [
      'Discovered latent bridge: Java Meme + SWE Day-in-Life + Interview Joke $\\rightarrow$ Career-oriented Software Engineering',
      'Student is not merely looking for "more Java syntax videos"',
      'Demonstrates strong ambition toward professional software engineering interviews and foundational algorithms'
    ],
    signals: [
      { label: 'Semantic Convergence', value: 'Software Engineering (0.94)', impact: 'high' },
      { label: 'Naive Match Bypass', value: 'Rejected pure keyword echo', impact: 'high' },
      { label: 'Latent Intent', value: 'Career & System Mastery', impact: 'high' }
    ]
  },
  {
    stepNumber: 4,
    stageName: 'Profile Synthesis',
    title: 'Building Student Interest Profile',
    description: 'Updating dynamic multidimensional interest radar and calculating statistical confidence intervals.',
    status: 'pending',
    durationMs: 900,
    findings: [
      'Primary Interest: Software Engineering (92% affinity, 94% AI confidence)',
      'Secondary Interests: Programming (88%), DSA (81%), AI (76%), Hardware (64%), System Design (74%)',
      'Engagement Velocity: High / Accelerated learning curve'
    ],
    signals: [
      { label: 'Primary Domain', value: 'Software Engineering', impact: 'high' },
      { label: 'AI Confidence', value: '92%', impact: 'high' },
      { label: 'Active Topics', value: '6 domains mapped', impact: 'positive' }
    ]
  },
  {
    stepNumber: 5,
    stageName: 'Candidate & Hype Filtering',
    title: 'Executing Hype Filter & Quality Scoring',
    description: 'Evaluating candidate pool of 22+ technology reels, penalizing clickbait and prioritizing technical depth.',
    status: 'pending',
    durationMs: 950,
    findings: [
      'Suppressed "10 AI Tools to Get Rich Fast" (Clickbait risk: 94%, Score: 26/100)',
      'Promoted high-signal candidate "DSA Concepts Every Aspiring SWE Must Master" (Quality: 97/100)',
      'Evaluated career adjacency, pedagogical value, and prerequisite readiness'
    ],
    signals: [
      { label: 'Hype Filter Rejections', value: '1 clickbait demoted', impact: 'neutral' },
      { label: 'Top Candidate Score', value: '97/100 Quality', impact: 'high' },
      { label: 'Pedagogical Fit', value: 'Optimal Next Step', impact: 'high' }
    ]
  },
  {
    stepNumber: 6,
    stageName: 'Explainable Recommendation',
    title: 'Generating Transparent Recommendation & Rationale',
    description: 'Formulating human-readable evidence trail, career impact, and next roadmap milestones.',
    status: 'pending',
    durationMs: 800,
    findings: [
      'Top Recommended Reel: "DSA Concepts Every Aspiring Software Engineer Must Master"',
      'Why: Connects observed programming engagement and interview curiosity with structured interview prep',
      'Estimated Learning Impact: High (Prepares for upcoming technical internship screening)'
    ],
    signals: [
      { label: 'Final Match Score', value: '94% relevance', impact: 'high' },
      { label: 'Explainability Status', value: 'Full Evidence Trail', impact: 'high' }
    ]
  }
];

export class AIPipelineService {
  /**
   * Simulates running the full AI reasoning pipeline with progressive callbacks
   */
  static async runFullPipeline(
    _interactions: Interaction[],
    onStepChange: (stepIndex: number, steps: AIAnalysisStep[]) => void
  ): Promise<AIAnalysisStep[]> {
    const steps: AIAnalysisStep[] = JSON.parse(JSON.stringify(AI_PIPELINE_STAGES));

    for (let i = 0; i < steps.length; i++) {
      // Set current step to running
      steps[i].status = 'running';
      onStepChange(i, [...steps]);

      await new Promise(resolve => setTimeout(resolve, steps[i].durationMs));

      // Mark current step completed
      steps[i].status = 'completed';
      onStepChange(i, [...steps]);
    }

    return steps;
  }
}
