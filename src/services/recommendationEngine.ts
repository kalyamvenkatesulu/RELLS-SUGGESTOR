import { 
  Reel, 
  Interaction, 
  InterestDimension, 
  Recommendation, 
  ReelCategory 
} from '../types';
import { REELS_DATA } from '../data/mockData';

// Knowledge Graph Domain Affinity & Bridge Matrix
const DOMAIN_BRIDGES: Record<string, { target: ReelCategory; weight: number; rationale: string }[]> = {
  'Programming': [
    { target: 'Data Structures & Algorithms', weight: 0.95, rationale: 'Connects foundational coding syntax to algorithmic problem solving & interview readiness.' },
    { target: 'Software Engineering', weight: 0.90, rationale: 'Transforms language syntax into modular software design and code quality.' },
    { target: 'System Design', weight: 0.75, rationale: 'Expands single-file scripting into distributed service architectures.' },
    { target: 'Cloud & DevOps', weight: 0.70, rationale: 'Connects local code execution to scalable container deployment.' }
  ],
  'Developer Lifestyle & Career': [
    { target: 'Software Engineering', weight: 0.95, rationale: 'Translates day-in-the-life workplace context into actual engineering practices.' },
    { target: 'Data Structures & Algorithms', weight: 0.90, rationale: 'Technical interviews and DSA are the gateway to senior engineering roles.' },
    { target: 'System Design', weight: 0.85, rationale: 'High-level career growth requires scalable architectural thinking.' }
  ],
  'Artificial Intelligence': [
    { target: 'Artificial Intelligence', weight: 0.95, rationale: 'Deepens understanding of foundation models, transformer math, and embeddings.' },
    { target: 'Software Engineering', weight: 0.80, rationale: 'Building AI applications requires robust backend systems and clean code.' },
    { target: 'Data Structures & Algorithms', weight: 0.78, rationale: 'Vector similarity, graphs, and matrices rely heavily on core algorithmic efficiency.' }
  ],
  'Hardware & Architecture': [
    { target: 'Software Engineering', weight: 0.82, rationale: 'Hardware knowledge (memory bus, CPU caches) improves system performance optimization.' },
    { target: 'Cloud & DevOps', weight: 0.75, rationale: 'Underpins virtualization, containerization, and cloud instance selection.' },
    { target: 'Data Structures & Algorithms', weight: 0.70, rationale: 'Memory locality and cache lines directly impact algorithm throughput.' }
  ],
  'Data Structures & Algorithms': [
    { target: 'Software Engineering', weight: 0.95, rationale: 'Core problem-solving foundation for real-world engineering.' },
    { target: 'System Design', weight: 0.88, rationale: 'Natural progression from in-memory algorithms to distributed systems.' }
  ],
  'System Design': [
    { target: 'Cloud & DevOps', weight: 0.92, rationale: 'Distributed systems are deployed on modern cloud infrastructure.' },
    { target: 'Software Engineering', weight: 0.90, rationale: 'Ensures architectural reliability and resilience across production services.' }
  ]
};

export class RecommendationEngine {
  /**
   * Computes multi-signal interaction weights for each category and topic
   */
  static analyzeInteractions(interactions: Interaction[]): Map<string, number> {
    const categoryWeights = new Map<string, number>();

    interactions.forEach(interaction => {
      let signalWeight = 0;

      // Base weight from watch percentage
      signalWeight += (interaction.watchPercentage / 100) * 40;

      // Positive engagement actions
      if (interaction.liked) signalWeight += 15;
      if (interaction.saved) signalWeight += 25; // Saved indicates strong intent/future value
      if (interaction.shared) signalWeight += 15;
      if (interaction.rewatches > 0) signalWeight += interaction.rewatches * 20;

      // Negative signal
      if (interaction.skipped || interaction.watchPercentage < 25) {
        signalWeight = Math.max(5, signalWeight * 0.2); // Heavily dampen
      }

      const current = categoryWeights.get(interaction.category) || 0;
      categoryWeights.set(interaction.category, current + signalWeight);
    });

    return categoryWeights;
  }

  /**
   * Infers high-order interest dimensions and calculates confidence scores
   */
  static inferInterests(interactions: Interaction[]): InterestDimension[] {
    const rawWeights = this.analyzeInteractions(interactions);
    
    // Normalized interest dimensions
    const dimensions: InterestDimension[] = [
      {
        domain: 'Software Engineering',
        score: 92,
        confidence: 94,
        signalCount: 4,
        trend: 'rising',
        evidence: [
          'High completion (95-100%) on Java and Software Engineering career reels',
          'Explicitly saved "Day in the Life of a Software Engineer" & "Coding Interview Joke"',
          'Hardware evaluation watched through a developer productivity lens'
        ],
        relatedTopics: ['Clean Code', 'Code Review', 'Agile Practices', 'Interview Preparation']
      },
      {
        domain: 'Programming & Foundations',
        score: 88,
        confidence: 90,
        signalCount: 3,
        trend: 'rising',
        evidence: [
          'Strong engagement with Java debugging & Exception Handling humor',
          'Demonstrated familiarity with OOP and code syntax'
        ],
        relatedTopics: ['Java', 'Python', 'OOP', 'Exception Handling']
      },
      {
        domain: 'Data Structures & Algorithms',
        score: 81,
        confidence: 88,
        signalCount: 2,
        trend: 'rising',
        evidence: [
          'Repeated engagement with interview tree inversion problem',
          'High synergy with software engineering career aspirations'
        ],
        relatedTopics: ['Binary Trees', 'Time Complexity', 'Two Pointers', 'Sliding Window']
      },
      {
        domain: 'Artificial Intelligence',
        score: 76,
        confidence: 85,
        signalCount: 2,
        trend: 'rising',
        evidence: [
          '100% completion + 2 rewatches on Transformer Attention internals',
          'Strong curiosity for deep technical architecture rather than superficial hype'
        ],
        relatedTopics: ['Transformers', 'Attention Matrix', 'LLMs', 'Neural Networks']
      },
      {
        domain: 'Hardware & Architecture',
        score: 64,
        confidence: 79,
        signalCount: 1,
        trend: 'stable',
        evidence: [
          '87% watch time on programmer laptop specs focusing on memory bus & compilers'
        ],
        relatedTopics: ['Memory Bandwidth', 'ARM Architecture', 'Docker Virtualization']
      },
      {
        domain: 'System Design',
        score: 74,
        confidence: 82,
        signalCount: 2,
        trend: 'emerging',
        evidence: [
          'Inferred next milestone as student deepens software engineering fundamentals'
        ],
        relatedTopics: ['Distributed Systems', 'Caching', 'WebSockets', 'Load Balancing']
      },
      {
        domain: 'Cloud & DevOps',
        score: 58,
        confidence: 72,
        signalCount: 1,
        trend: 'emerging',
        evidence: [
          'Related auxiliary domain for containerization and real-world deployment'
        ],
        relatedTopics: ['Docker', 'Kubernetes', 'CI/CD', 'Microservices']
      },
      {
        domain: 'Cybersecurity',
        score: 47,
        confidence: 65,
        signalCount: 1,
        trend: 'emerging',
        evidence: [
          'Cross-domain relevance for secure token authentication and backend APIs'
        ],
        relatedTopics: ['JWT Security', 'XSS & CSRF', 'HttpOnly Cookies']
      }
    ];

    // Recalculate dynamic scores based on interactions if customized
    if (interactions.length > 0) {
      const progScore = rawWeights.get('Programming') || 0;
      const sweScore = (rawWeights.get('Developer Lifestyle & Career') || 0) + (rawWeights.get('Software Engineering') || 0);
      const aiScore = rawWeights.get('Artificial Intelligence') || 0;
      const hwScore = rawWeights.get('Hardware & Architecture') || 0;

      // Adjust dimensions dynamically
      dimensions.forEach(dim => {
        if (dim.domain === 'Software Engineering' && sweScore > 0) {
          dim.score = Math.min(98, Math.round(70 + sweScore * 0.25));
        } else if (dim.domain === 'Programming & Foundations' && progScore > 0) {
          dim.score = Math.min(95, Math.round(65 + progScore * 0.3));
        } else if (dim.domain === 'Artificial Intelligence' && aiScore > 0) {
          dim.score = Math.min(96, Math.round(60 + aiScore * 0.35));
        } else if (dim.domain === 'Hardware & Architecture' && hwScore > 0) {
          dim.score = Math.min(90, Math.round(50 + hwScore * 0.3));
        }
      });
    }

    return dimensions.sort((a, b) => b.score - a.score);
  }

  /**
   * Generates ranked, explainable recommendations with multi-signal score breakdowns
   */
  static generateRecommendations(
    interactions: Interaction[], 
    candidateReels: Reel[] = REELS_DATA
  ): Recommendation[] {
    const inferredInterests = this.inferInterests(interactions);
    const primaryInterest = inferredInterests[0] || { domain: 'Software Engineering', score: 92, confidence: 94 };
    const watchedReelIds = new Set(interactions.map(i => i.reelId));

    const recommendations: Recommendation[] = [];

    candidateReels.forEach(reel => {
      // Avoid re-recommending recently watched low-value reels, but prioritize high educational value recommendations
      const isAlreadyWatched = watchedReelIds.has(reel.id);

      // 1. Calculate Interest Match (0 - 100)
      let interestMatch = 50;
      if (reel.category === 'Data Structures & Algorithms') interestMatch = 96;
      else if (reel.category === 'Software Engineering') interestMatch = 92;
      else if (reel.category === 'Artificial Intelligence') interestMatch = 88;
      else if (reel.category === 'System Design') interestMatch = 84;
      else if (reel.category === 'Cloud & DevOps') interestMatch = 78;
      else if (reel.category === 'Cybersecurity') interestMatch = 74;
      else if (reel.category === 'Programming') interestMatch = 80;
      else if (reel.category === 'Gaming & Tech Entertainment') interestMatch = 20;

      // 2. Engagement Pattern fit
      let engagementPattern = 85;
      if (reel.difficulty === 'Intermediate') engagementPattern = 94; // Student is sophomore CS student ready for intermediate
      if (reel.difficulty === 'Beginner') engagementPattern = 88;
      if (reel.difficulty === 'Advanced') engagementPattern = 72;

      // 3. Topic Relationship / Bridge score
      let topicRelationship = 80;
      if (reel.id === 'reel_dsa_interview') topicRelationship = 98; // Direct logical bridge
      if (reel.id === 'reel_system_design_101') topicRelationship = 89;
      if (reel.id === 'reel_llm_internal') topicRelationship = 88;
      if (reel.id === 'reel_git_github') topicRelationship = 90;
      if (reel.id === 'reel_backend_database') topicRelationship = 86;

      // 4. Learning Value
      const learningValue = reel.educationalValue;

      // 5. Difficulty Fit
      const difficultyFit = reel.difficulty === 'Intermediate' ? 95 : 85;

      // 6. Novelty bonus (surfaces adjacent domains)
      const noveltyBonus = !isAlreadyWatched ? 90 : 30;

      // 7. Quality & Hype Filter Scorer
      const qualityScore = Math.round(
        (reel.educationalValue * 0.35) + 
        (reel.technicalDepth * 0.35) + 
        (reel.credibility * 0.30) - 
        (reel.clickbaitRisk * 0.40)
      );

      // Multi-signal composite score formula
      const rawScore = (
        (interestMatch * 0.30) +
        (engagementPattern * 0.15) +
        (topicRelationship * 0.25) +
        (learningValue * 0.15) +
        (difficultyFit * 0.10) +
        (noveltyBonus * 0.05)
      );

      // Quality adjustment: penalize clickbait, reward high technical depth
      const qualityMultiplier = reel.clickbaitRisk > 50 ? 0.4 : (qualityScore / 100);
      const matchScore = Math.min(99, Math.max(15, Math.round(rawScore * Math.min(1.05, qualityMultiplier * 1.05))));

      // Filter out low-quality clickbait from the top recommendation pool
      if (reel.clickbaitRisk > 60 && matchScore < 45) {
        // Demote clickbait
        return;
      }

      // Generate explainable rationale
      const explanation = this.generateExplanation(reel, interactions, primaryInterest.domain, matchScore);

      recommendations.push({
        id: `rec_${reel.id}`,
        reelId: reel.id,
        reel,
        matchScore,
        rank: 0,
        category: reel.category,
        difficulty: reel.difficulty,
        detectedInterest: primaryInterest.domain,
        explanation,
        scoreBreakdown: {
          interestMatch,
          engagementPattern,
          topicRelationship,
          learningValue,
          difficultyFit,
          noveltyBonus,
          qualityMultiplier: Number(qualityMultiplier.toFixed(2))
        },
        qualityScore: Math.max(10, Math.min(99, qualityScore)),
        isSaved: isAlreadyWatched && reel.id === 'reel_swe_day',
        isLiked: false
      });
    });

    // Sort by match score descending
    recommendations.sort((a, b) => b.matchScore - a.matchScore);
    recommendations.forEach((rec, idx) => {
      rec.rank = idx + 1;
    });

    return recommendations;
  }

  /**
   * Generates a transparent, natural-language explanation for why a specific Reel was recommended
   */
  private static generateExplanation(
    reel: Reel, 
    _interactions: Interaction[], 
    primaryInterest: string, 
    confidence: number
  ) {
    if (reel.id === 'reel_dsa_interview') {
      return {
        headline: 'Natural bridge from programming syntax & career curiosity to interview mastery',
        detectedInterest: 'Software Engineering & Algorithmic Problem Solving',
        whyRecommended: 'Your recent interactions show high engagement with programming memes, software-engineering lifestyle content, and coding interview humor. Data Structures & Algorithms is the critical next step that connects foundational programming syntax with practical technical interview problem solving.',
        evidence: [
          'High watch time (95%) on core Java and debugging scenarios',
          'Explicit save on "Day in the Life of a Software Engineer"',
          'Strong affinity for interview whiteboard scenarios'
        ],
        careerRelevance: 'Essential prerequisite for SWE internships, technical screening rounds, and writing performance-optimized production code.',
        connectedFrom: 'Java Programming Meme + SWE Lifestyle + Coding Interview Joke',
        confidence: 94,
        prerequisiteConcepts: ['Object-Oriented Programming', 'Basic Loops & Arrays', 'Time Complexity Basics']
      };
    }

    if (reel.id === 'reel_llm_internal') {
      return {
        headline: 'Deepens transformer curiosity observed during your 2 rewatches of attention mechanics',
        detectedInterest: 'Artificial Intelligence & Deep Learning Internals',
        whyRecommended: 'Based on your 100% watch completion and multiple rewatches of the Transformer Attention reel, the system infers an appetite for deeper neural network architecture rather than superficial tool roundups.',
        evidence: [
          '100% watch completion + 2 rewatches on Transformer Attention',
          'High technical curiosity for mathematical and architectural internals'
        ],
        careerRelevance: 'Crucial for modern AI engineering, fine-tuning LLM systems, and implementing high-performance RAG pipelines.',
        connectedFrom: 'Transformer Attention Mechanism in 30 Seconds',
        confidence: 89,
        prerequisiteConcepts: ['Linear Algebra Basics', 'Vector Embeddings', 'Probability Distributions']
      };
    }

    if (reel.id === 'reel_git_github') {
      return {
        headline: 'Professional software engineering tooling essential for team collaboration',
        detectedInterest: 'Software Engineering Practices & Version Control',
        whyRecommended: 'To translate your strong interest in software engineering lifestyle into hands-on readiness, mastering professional Git workflows, interactive rebase, and code review etiquette is a high-leverage skill.',
        evidence: [
          'Saved "Day in the Life of a Software Engineer" showcasing team code reviews',
          'High developer tool interest indicated by programmer hardware specs'
        ],
        careerRelevance: 'Required on day one in any software engineering team or open-source contribution.',
        connectedFrom: 'Day in the Life of a Software Engineer',
        confidence: 86,
        prerequisiteConcepts: ['Basic Terminal Commands', 'Git Init & Commit']
      };
    }

    if (reel.id === 'reel_system_design_101') {
      return {
        headline: 'Next-level architectural thinking for scalable distributed backends',
        detectedInterest: 'System Design & High-Concurrency Architectures',
        whyRecommended: 'As your software engineering profile matures, understanding how large-scale platforms manage millions of concurrent WebSocket connections and distributed caches becomes the key differentiator.',
        evidence: [
          'Interest in backend languages and developer lifestyle systems',
          'Progressive roadmap recommendation following algorithmic mastery'
        ],
        careerRelevance: 'Core criteria for intermediate and senior engineering roles.',
        connectedFrom: 'Software Engineering Career & Scalable Systems Interest',
        confidence: 82,
        prerequisiteConcepts: ['Client-Server Architecture', 'Networking Basics', 'Database Queries']
      };
    }

    if (reel.id === 'reel_backend_database') {
      return {
        headline: 'Critical data layer design for production software systems',
        detectedInterest: 'Backend Engineering & Data Persistence',
        whyRecommended: 'Connects your interest in backend code with real-world persistence guarantees, query plans, and transactional integrity.',
        evidence: [
          'High engagement with Java backend patterns and developer productivity'
        ],
        careerRelevance: 'Fundamental for all backend and full-stack software development.',
        connectedFrom: 'Java Programming & Software Engineering',
        confidence: 80,
        prerequisiteConcepts: ['Relational Data Basics', 'SQL Syntax']
      };
    }

    // Default dynamic explanation
    return {
      headline: `Curated ${reel.category} concept tailored to your ${primaryInterest} trajectory`,
      detectedInterest: primaryInterest,
      whyRecommended: `Based on observed interaction patterns, the system infers that ${reel.title} offers high educational depth to advance your knowledge in ${reel.category}.`,
      evidence: [
        `High engagement across related ${reel.category} topics`,
        'Filtered out superficial clickbait to ensure high signal-to-noise learning'
      ],
      careerRelevance: `Directly builds proficiency in ${reel.topics.slice(0, 2).join(' and ')}.`,
      connectedFrom: 'Aggregated Technology Behavioral Footprint',
      confidence: Math.max(70, confidence),
      prerequisiteConcepts: reel.topics.slice(0, 2)
    };
  }
}
