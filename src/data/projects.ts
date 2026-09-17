import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'sifs-simulator',
    title: 'Student Investment Fund Simulator (SIFS)',
    tagline: 'Our flagship web-based paper trading platform engineered specifically for Rwandan student traders.',
    description:
      'A real-time portfolio management and simulated execution engine. SIFS pulls tick data from global markets, enforces strict 1% maximum risk-per-trade guardrails, and feeds real-time performance analytics straight into the ENTS club leaderboard.',
    status: 'Live',
    featured: true,
    category: 'Fintech',
    tags: ['Next.js', 'WebSockets', 'Financial APIs', 'PostgreSQL', 'Risk Engine'],
    imageUrl: '/projects/sifs-dashboard.jpg',
    metrics: [
      { label: 'Simulated AUM', value: '$250,000' },
      { label: 'Active Portfolios', value: '48' },
      { label: 'Paper Orders Processed', value: '1,420+' },
      { label: 'Latency', value: '< 120ms' },
    ],
    links: {
      demo: '/leaderboard',
      github: 'https://github.com/ents-rca/sifs-engine',
    },
  },
  {
    id: 'rca-mart',
    title: 'RCA Campus Commerce Grid',
    tagline: 'Internal student marketplace streamlining snack, laundry, and equipment logistics on campus.',
    description:
      'A cashless micro-store web app built by the Business Handlers track. Solves on-campus procurement bottlenecks by enabling peer-to-peer pre-orders and inventory tracking within dorm clusters.',
    status: 'Live',
    category: 'Venture',
    tags: ['Next.js', 'Tailwind CSS', 'Mobile First', 'Inventory Sync'],
    imageUrl: '/projects/rca-mart.jpg',
    metrics: [
      { label: 'Monthly Transactions', value: '380+' },
      { label: 'Fulfillment Time', value: '15 mins' },
      { label: 'Student Repeat Rate', value: '82%' },
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
    metrics: [
      { label: 'Strategies Tested', value: '14' },
      { label: 'Historical Ticks', value: '1.2M+' },
      { label: 'Max Win Rate Identified', value: '61.4%' },
    ],
  },
  {
    id: 'venture-fund-ledger',
    title: 'ENTS Micro-Grant Ledger',
    tagline: 'Transparent student treasury tracker for seed funding campus software MVPs.',
    description:
      'A public financial ledger tracking club dues, sponsorship funds, and micro-grants distributed to student teams during quarterly pitch competitions.',
    status: 'In Development',
    category: 'Platform',
    tags: ['TypeScript', 'Supabase', 'Accounting Schema', 'Audit Trail'],
    imageUrl: '/projects/ledger.jpg',
    metrics: [
      { label: 'Capital Allocated', value: '1,200,000 RWF' },
      { label: 'Ventures Seeded', value: '4' },
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
  },
];
