# TechReel AI — AI-Powered Technology Reel Recommendation Agent

> **Tagline:** Turn scrolling into a personalized technology learning journey.

![TechReel AI](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80)

---

## 1. Project Overview

**TechReel AI** is an intelligent full-stack recommendation agent that observes student interactions with short-form technical content (Instagram Reels, YouTube Shorts, TikToks) and infers their holistic, higher-order technology interests. 

Rather than repeating shallow keyword echoes (e.g., watching a Java meme $\rightarrow$ recommending only Java videos), TechReel AI understands conceptual semantics and pedagogical bridges. It discovers that a student watching **Java Debugging Memes**, **Software Engineer Startup Lifestyles**, **Coding Interview Jokes**, and **Programmer Laptop Specs** is exhibiting a strong latent ambition toward **Software Engineering & Technical Interview Mastery**.

The agent then curates high-leverage, explainable next learning leaps (e.g., **Data Structures & Algorithms Concepts for Technical Interviews**) and arranges them into a structured visual **Technology Learning Journey**.

---

## 2. The Core Problem

Students spend hours daily consuming short-form video feeds. The fundamental issue is **content randomness and naive recommendation loops**:

$$\text{Coding Reel} \longrightarrow \text{Gaming Setup} \longrightarrow \text{Meme} \longrightarrow \text{Laptop Review} \longrightarrow \text{Entertainment}$$

Traditional social algorithms optimize purely for dopamine engagement or shallow 1:1 keyword duplication. They fail to:
1. Infer broader academic or career intent.
2. Bridge casual curiosity into structured prerequisite learning.
3. Filter out low-effort clickbait and deceptive "AI Hype" videos.
4. Explain *why* a piece of content is recommended in relation to user goals.

---

## 3. The TechReel AI Solution

TechReel AI introduces an intelligent, transparent 5-stage inference engine:

```
Reel Interactions  ──►  Content Understanding  ──►  Interest Inference  ──►  Candidate & Hype Filter  ──►  Explainable Recommendation
```

### Traditional Recommender vs. TechReel AI Agent

| Dimension | Traditional Keyword Recommender | TechReel AI Agent |
| :--- | :--- | :--- |
| **Observation** | Watched Java NullPointerException meme | Java meme + SWE Lifestyle + Interview Joke + Laptop Specs |
| **Inference** | "User wants Java videos" | "User is preparing for Software Engineering internships & interviews" |
| **Recommendation** | Another generic Java syntax video | DSA Patterns for Technical Interviews |
| **Quality Filter** | Promotes viral clickbait | Filters out hype; scores technical depth and credibility |
| **Explainability** | Black-box algorithm | Transparent evidence trail with prerequisite concepts |

---

## 4. Key Features

- **Multi-Signal Behavioral Telemetry**: Evaluates watch completion percentage, explicit likes, high-intent saves/bookmarks, shares, rewatches, and fast bounces (skips).
- **Latent Interest Detection**: Recharts Radar visualization and dynamic affinity scoring across 8 technology domains (*Software Engineering*, *Programming*, *DSA*, *Artificial Intelligence*, *System Design*, *Cloud & DevOps*, *Hardware & Architecture*, *Cybersecurity*).
- **The "Hype Filter" Quality Gate**: Multi-dimensional quality scoring:
  - Technical Depth (0–100)
  - Educational Value (0–100)
  - Credibility Index (0–100)
  - Clickbait Risk Penalty (Demotes viral get-rich-quick content)
- **Explainable AI (XAI)**: Every recommendation provides a complete rationale dossier citing observed behavioral evidence, career relevance, and connected bridge topics.
- **Interactive 6-Stage AI Demo Runner**: Live animated walkthrough with step-by-step progress, active telemetry, and confetti payoff.
- **Simulated 9:16 Vertical Reel Player**: Mobile-inspired vertical video player simulation with interactive syntax-highlighted code snippets, audio wave visualizer, like/save controls, and real-time state recalculation.
- **Visual Technology Learning Journey**: Interactive milestone roadmap tracking progress from foundational OOP to DSA, Technical Interviews, System Design, and Cloud DevOps.

---

## 5. Recommendation Algorithm & Multi-Signal Scoring

The recommendation engine implements a hybrid heuristic-graph affinity scoring model:

### 1. Interaction Signal Weighting ($S_i$)
$$S_i = \left(\frac{\text{WatchPercentage}}{100} \times 40\right) + (15 \times \text{Liked}) + (25 \times \text{Saved}) + (15 \times \text{Shared}) + (20 \times \text{Rewatches}) - \text{SkipPenalty}$$

*High-intent saves ($+25$) and rewatches ($+20\times$) are weighted heavily as indicators of deep technical curiosity.*

### 2. Content Quality / Hype Filter Formula ($Q$)
$$Q = (0.35 \times \text{EducationalValue}) + (0.35 \times \text{TechnicalDepth}) + (0.30 \times \text{Credibility}) - (0.40 \times \text{ClickbaitRisk})$$

### 3. Composite Recommendation Rank Score ($R$)
$$R = \Big( (0.30 \times \text{InterestMatch}) + (0.15 \times \text{EngagementPattern}) + (0.25 \times \text{TopicRelationship}) + (0.15 \times \text{LearningValue}) + (0.10 \times \text{DifficultyFit}) + (0.05 \times \text{Novelty}) \Big) \times \min(1.05, Q / 100)$$

---

## 6. Preloaded Student Demo Dataset: Alex Rivera

The application is preloaded with a realistic sophomore CS student profile (**Alex Rivera**) and 6 initial interactions:

1. **Java Programming Meme** (*Programming* | 95% watch, Liked)
2. **Day in the Life of a Software Engineer** (*Career & SWE* | 100% watch, Liked, Saved, Shared)
3. **Extreme RGB Gaming Rig 2026** (*Gaming Entertainment* | 18% watch, Fast Skip)
4. **Transformer Attention Mechanism in 30s** (*AI Internals* | 100% watch, Liked, 2 Rewatches)
5. **Coding Interview Joke: Inverting Binary Tree** (*Software Engineering* | 92% watch, Liked, Saved)
6. **Best Laptop for Programmers** (*Hardware Architecture* | 87% watch, Liked)

**Inferred Primary Interest:** Software Engineering ($92\%$ Affinity, $94\%$ AI Confidence)  
**Top Curated Recommendation:** *DSA Concepts Every Aspiring Software Engineer Must Master for Technical Interviews* ($94\%$ Match Score, $97/100$ Quality Score)

---

## 7. Technology Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS with custom glassmorphism design system & gradients
- **Data Visualization:** Recharts (Radar charts, Polar coordinates, Bar charts)
- **Icons:** Lucide React
- **Micro-Interactions & FX:** Canvas-Confetti, Tailwind Keyframe Animations
- **Engine Architecture:** Decoupled `RecommendationEngine` and `AIPipelineService` with deterministic simulation and LLM-ready service boundaries.

---

## 8. Installation & Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Steps to Run Locally

1. Clone the repository or navigate to the project directory:
   ```bash
   cd c:\Users\ADMIN\Desktop\venky
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

5. To build for production:
   ```bash
   npm run build
   ```

---

## 9. Environment Variables (Optional)

The application includes a built-in deterministic AI recommendation engine that functions with **100% fidelity out-of-the-box with zero API keys required**. 

If connecting to an external LLM endpoint in the future, create a `.env` file in the root directory:

```env
# Optional LLM Bridge
VITE_AI_API_ENDPOINT=https://api.example.com/v1/recommendations
VITE_AI_API_KEY=your_api_key_here
```

*Note: Secrets are never exposed to the client bundle.*

---

## 10. Privacy & Ethics Statement

> [!NOTE]
> **Privacy-Preserving Prototype:** This application uses simulated and anonymized interaction data. It **does not** access, track, or scrape private Instagram, YouTube, or TikTok user accounts without authorization. All behavioral signals are computed securely in-memory.

---

## 11. Presentation & Demo Guide

For a live demo or hackathon evaluation:
1. **Open Landing Page (`/`)**: Walk through the problem statement, visual pipeline, and side-by-side comparison.
2. **Click "Run AI Demo"**: Showcase the 6-stage animated telemetry runner from signal extraction to explainable recommendation reveal.
3. **Open Dashboard (`/dashboard`)**: Highlight the 4 KPI cards and recommendation spotlight.
4. **Open Interest Profile (`/interests`)**: Show the interactive Recharts Radar chart and inspect evidence trails.
5. **Open Interactions (`/interactions`)**: Click "Simulate New Watch", test watch percentage slider, and observe the AI engine update dynamically.
6. **Open Reel Simulation Player**: Click "Watch Simulation" on any reel, toggle like/save/rewatch, and log telemetry.
7. **Open Recommendations (`/recommendations`)**: Highlight the "Why We Recommended This" drawer and "Hype Filter" 4-factor meters.
8. **Open Learning Journey (`/journey`)**: Walk through the sequential roadmap from OOP to DSA, System Design, and Cloud.

---

## 12. License

MIT License © 2026 TechReel AI Team.
