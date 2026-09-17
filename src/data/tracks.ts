import { TrackInfo } from '@/types';

export const tracksData: TrackInfo[] = [
  {
    id: 'business-handlers',
    title: 'Business Handlers',
    shortTag: 'Ventures & Operations',
    tagline: 'Ideate, pitch, and operate sustainable student-led enterprises on campus and beyond.',
    description:
      'The incubator arm of ENTS. Members validate business models, design unit economics, run campus micro-services, and pitch real software ventures to mentors.',
    longDescription:
      'At Rwanda Coding Academy, technical brilliance is standard. Business Handlers bridges the crucial gap between writing clean code and shipping viable, revenue-generating products. Members take full ownership of the venture lifecycle — from user interviews and financial projections to live deployment, pricing strategy, and campus operations.',
    targetAudience:
      'Students interested in product strategy, venture capital, startup operations, marketing, unit economics, and building businesses around tech.',
    weeklyCadence: [
      {
        phase: 'Monday Strategy Briefing',
        description:
          'Review campus venture metrics, customer feedback, and unit cash flow. Set weekly sprint targets.',
      },
      {
        phase: 'Wednesday Pitch & Teardown',
        description:
          'Present slide decks and interactive prototypes for peer critique. Stress-test value propositions and revenue models.',
      },
      {
        phase: 'Friday Venture Workshop',
        description:
          'Hands-on execution: customer acquisition funnels, unit economics modeling, legal basics, and operational logistics.',
      },
      {
        phase: 'Weekend Sprint & Deployment',
        description:
          'Ship new features, test campus pilot offerings, and analyze engagement or payment conversion numbers.',
      },
    ],
    skillsGained: [
      'Financial Modeling & Cash Flow Projections',
      'Lean Canvas & Value Proposition Design',
      'Customer Discovery & User Interviews',
      'Pricing Architecture & Revenue Optimization',
      'Pitch Deck Crafting & Public Presentation',
      'Product Management & Operational Logistics',
    ],
    keyDeliverables: [
      'Validated Business Model Canvas for a real school problem',
      'Fully forecasted 12-month operational pro-forma spreadsheet',
      'Working campus pilot or software MVP with active user transactions',
      'Investment-ready pitch deck presented at the ENTS Demo Day',
    ],
    toolsUsed: ['Notion', 'Google Sheets', 'Figma', 'Stripe & Paypack APIs', 'Linear', 'Pitch'],
  },
  {
    id: 'traders',
    title: 'Traders',
    shortTag: 'Markets & Quantitative Analysis',
    tagline: 'Master technical analysis, macroeconomics, and disciplined risk management in our paper trading league.',
    description:
      'The quantitative and financial markets arm of ENTS. Members analyze global macro data, trade forex and indices, and compete in the weekly paper trading league.',
    longDescription:
      'Modern financial markets reward analytical rigor, emotional control, and mathematical probability. The Traders track transforms students into disciplined market participants. Operating strictly in simulated environments (paper trading), members study market structure, order book dynamics, liquidity zones, and risk-to-reward ratios while competing for the top spot on the league leaderboard.',
    targetAudience:
      'Students passionate about capital markets, macroeconomic indicators, quantitative trading, algorithmic backtesting, and disciplined probabilistic thinking.',
    weeklyCadence: [
      {
        phase: 'Monday Macro Watch & Economic Calendar',
        description:
          'Analyze central bank rate outlooks, US CPI & NFP data releases, and regional liquidity patterns for the trading week.',
      },
      {
        phase: 'Tuesday & Thursday Live Market Analysis',
        description:
          'Collaborative chart breakdown sessions on TradingView. Identify market structure shifts, order blocks, and key supply & demand levels.',
      },
      {
        phase: 'Wednesday Risk Audit',
        description:
          'Mandatory trade journal review. Analyze maximum drawdown, position sizing violations, and risk-adjusted Sharpe performance.',
      },
      {
        phase: 'Friday League Settlement & Debrief',
        description:
          'Weekly leaderboard reset, trade autopsy on winners and losers, and discussion of cognitive biases during execution.',
      },
    ],
    skillsGained: [
      'Technical Analysis & Market Structure Identification',
      'Strict Risk Management & Asymmetric R:R Sizing',
      'Macroeconomic Data Interpretation (Inflation, Rates, GDP)',
      'Trading Psychology & Emotional Execution Discipline',
      'Quantitative Backtesting & Performance Journaling',
      'Financial Derivatives & Forex Liquidity Mechanics',
    ],
    keyDeliverables: [
      'Verified 60-day simulated trading journal with strict risk parameters',
      'Algorithmic backtesting report or rule-based trading playbook',
      'Weekly economic digest contributions for the club terminal',
      'Active participation in the semester-long ENTS Trading Cup',
    ],
    toolsUsed: ['TradingView', 'MetaTrader 5 (Demo)', 'Python (Pandas, Backtrader)', 'Excel & Notion Trade Logs', 'Forex Factory'],
  },
];

