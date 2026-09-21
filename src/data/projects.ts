import { Project } from '@/types';

export interface IncubationProject extends Project {
  stage?: string;
  stageProgress?: number;
  targetRelease?: string;
}

export const projectsData: IncubationProject[] = [
  {
    id: 'sifs-simulator',
    title: 'Student Investment Fund Simulator (SIFS)',
    tagline: 'Our flagship web-based paper trading platform engineered specifically for Rwandan student traders.',
    description:
      'A real-time portfolio management and simulated execution engine. SIFS pulls tick data from global markets, enforces strict 1% maximum risk-per-trade guardrails, and feeds real-time performance analytics straight into the ENTS club leaderboard.',
    status: 'In Development',
    featured: true,
    category: 'Fintech',
    tags: ['Next.js', 'WebSockets', 'Financial APIs', 'PostgreSQL', 'Risk Engine'],
    imageUrl: '/projects/sifs-dashboard.jpg',
    stage: 'Phase 02 · Core Engine Build',
    stageProgress: 72,
    targetRelease: 'Coming Soon · Season 01 Alpha',
    metrics: [
      { label: 'Target Demo AUM', value: '$250,000' },
      { label: 'Pilot Accounts', value: '48 Planned' },
      { label: 'Risk Guardrail', value: '1.0% Fixed' },
      { label: 'Target Latency', value: '< 80ms' },
    ],
  },
  {
    id: 'rca-mart',
    title: 'RCA Campus Commerce Grid',
    tagline: 'Internal student marketplace streamlining snack, laundry, and equipment logistics on campus.',
    description:
      'A cashless micro-store web app designed by the Business Handlers track. Solves on-campus procurement bottlenecks by enabling peer-to-peer pre-orders and inventory tracking within dorm clusters.',
    status: 'Planned',
    category: 'Venture',
    tags: ['Next.js', 'Tailwind CSS', 'Mobile First', 'Inventory Sync'],
    imageUrl: '/projects/rca-mart.jpg',
    stage: 'Phase 01 · Thesis & Scoping',
    stageProgress: 45,
    targetRelease: 'Coming Soon · Campus Beta',
    metrics: [
      { label: 'Pilot Dorm Clusters', value: '6' },
      { label: 'Target Fulfillment', value: '< 15 mins' },
      { label: 'Currency Rail', value: 'Cashless Escrow' },
    ],
  },
  {
    id: 'algo-bot-backtester',
    title: 'AlphaStream Backtester',
    tagline: 'Python-driven statistical backtesting suite for automated Forex breakout strategies.',
    description:
      'A quantitative research workspace created by senior club members to backtest Moving Average Envelopes and London Breakout strategies over 5 years of tick data, evaluating Sharpe and Sortino ratios.',
    status: 'In Development',
    category: 'Quantitative',
    tags: ['Python', 'FastAPI', 'Pandas', 'TimescaleDB', 'Backtrader'],
    imageUrl: '/projects/alphastream.jpg',
    stage: 'Phase 02 · Tick Pipeline',
    stageProgress: 58,
    targetRelease: 'Coming Soon · Quant Lab Preview',
    metrics: [
      { label: 'Target Tick Dataset', value: '5M+ Bars' },
      { label: 'Benchmark Models', value: '8 Strategies' },
      { label: 'Metric Focus', value: 'Sharpe & Sortino' },
    ],
  },
  {
    id: 'venture-fund-ledger',
    title: 'ENTS Micro-Grant Ledger',
    tagline: 'Transparent student treasury tracker for seed funding campus software MVPs.',
    description:
      'A public financial ledger tracking club dues, sponsorship funds, and micro-grants distributed to student teams during quarterly pitch competitions.',
    status: 'Planned',
    category: 'Platform',
    tags: ['TypeScript', 'Supabase', 'Accounting Schema', 'Audit Trail'],
    imageUrl: '/projects/ledger.jpg',
    stage: 'Phase 01 · Accounting Schema',
    stageProgress: 35,
    targetRelease: 'Coming Soon · Treasury Release',
    metrics: [
      { label: 'Grant Pool Model', value: 'Seed Escrow' },
      { label: 'Governance Rule', value: 'Dual Sign-Off' },
    ],
  },
  {
    id: 'macro-pulse-terminal',
    title: 'MacroPulse Terminal',
    tagline: 'Lightweight financial news and central bank sentiment aggregator for high-school analysts.',
    description:
      'A minimalist terminal dashboard summarizing key macroeconomic calendar events, central bank speeches, and currency correlations for the weekly Traders track briefing.',
    status: 'Planned',
    category: 'Fintech',
    tags: ['NLP', 'RSS Scraping', 'Financial News', 'Sentiment Score'],
    imageUrl: '/projects/macropulse.jpg',
    stage: 'Phase 01 · NLP Model Spec',
    stageProgress: 25,
    targetRelease: 'Coming Soon · Research Terminal',
  },
  {
    id: 'rca-dev-agency',
    title: 'RCA Freelance Business Unit',
    tagline: 'Client-facing agency pipeline connecting top RCA software engineers with local businesses.',
    description:
      'A structured business conduit where Business Handlers source web and mobile software contracts from SMEs in Musanze and Kigali, managing scopes, contracts, and delivery.',
    status: 'Planned',
    category: 'Venture',
    tags: ['Contracts', 'Client Management', 'SLA', 'Revenue Share'],
    imageUrl: '/projects/agency.jpg',
    stage: 'Phase 01 · Legal & SOW Templates',
    stageProgress: 40,
    targetRelease: 'Coming Soon · Client Conduit',
  },
];
