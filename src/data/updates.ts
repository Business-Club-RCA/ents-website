import { FeedItem } from '@/types';

export const initialFeedItems: FeedItem[] = [
  // 1. News Article
  {
    id: 'news-rca-leaders-2026',
    type: 'article',
    title: 'Inside Rwanda Coding Academy: Training Africa\'s Next Generation of Venture Engineers',
    excerpt:
      'Students in Nyabihu combine software engineering with venture building, testing digital cash flows and algorithmic market models in real-time.',
    content: `At Rwanda Coding Academy, education does not pause at algorithmic syntax and distributed systems. Through the Entrepreneurs & Traders Society (ENTS), students are actively fusing software development with rigorous commercial viability.

In high-velocity weekly sprints, student engineering pods formulate product theses, build functional prototypes, and deploy them across campus micro-markets. The objective is not hypothetical case studies: it is the validation of real unit economics, user retention cohorts, and transactional reliability.

"We realized early on that software without distribution or financial discipline remains a school project," explains Cedric Mugisha, ENTS President. "By treating campus utilities as active testbeds for venture incubation, our members learn how capital flows before they ever pitch to an institutional angel investor."

From canteen billing escrows like KuraPay to full-stack quantitative simulators like SIFS, students are proving that secondary technical institutions can be powerful incubators of scalable fintech infrastructure.`,
    author: 'Tech & Markets Editorial',
    date: 'March 14, 2026',
    readTime: '4 min read',
    tags: ['News', 'RCA', 'Ventures', 'Incubation'],
    sourceName: 'News',
    sourceUrl: 'https://rca.ac.rw',
    imageUrl: '/news/coding-lab.jpg',
  },

  // 2. Upcoming Event: SIFS League Tournament
  {
    id: 'event-sifs-round-04',
    type: 'event',
    title: 'SIFS Simulated League Tournament: Round 04',
    excerpt:
      'Quant traders test momentum algorithms under strict 1% risk-per-trade rules on live campus feeds.',
    content: `Round 04 of the SIFS Paper Trading League brings together 24 qualified analysts to execute sub-50ms tick momentum strategies across synthetic foreign exchange and commodity pairs.

Participants must navigate dynamic volatility clusters while adhering strictly to the society's hard-coded 1% stop-loss guardrails. Any algorithm exceeding the maximum drawdown threshold is automatically disqualified by the matching engine.`,
    author: 'Quant Committee',
    date: 'March 22, 2026',
    readTime: '2 hours',
    tags: ['Competition', 'Trading'],
    eventDate: 'Saturday, March 28, 2026',
    eventTime: '15:00 - 17:30 CAT',
    eventLocation: 'RCA Innovation Lab',
    rsvpLink: '/about',
    imageUrl: '/events/trading-league.jpg',
    speakers: ['Aline Umutoni', 'David Nshimiyimana'],
  },

  // 3. News / Product Update
  {
    id: 'news-sifs-v24',
    type: 'announcement',
    title: 'SIFS v2.4 Engine Deployed with Low-Latency Order Books',
    excerpt:
      'Major architectural upgrades to the simulation engine introducing websocket streaming and automatic loss controls.',
    content: `The ENTS Engineering Squad has officially pushed SIFS v2.4 to the campus local network and cloud telemetry cluster. This release marks a significant milestone in our quest to bring institutional trading mechanics to secondary school analysts.

Key Architectural Enhancements:
- Sub-50ms Tick Ingestion: Websocket buffers now process multi-pair pricing with under 35ms latency.
- Hard-Coded 1% Maximum Drawdown Locks: Automated risk tripwires immediately freeze positions upon unexpected volatility spikes.
- Live Telemetry Leaderboard Sync: Every confirmed fill and liquidation updates the public league rankings instantaneously.

The platform is open to all registered club members across Cohorts 5, 6, and 7.`,
    author: 'Engineering Squad',
    date: 'March 11, 2026',
    readTime: '3 min read',
    tags: ['News', 'SIFS', 'Engineering'],
    imageUrl: '/news/trading-terminal.jpg',
  },

  // 4. Upcoming Event: Demo Day
  {
    id: 'event-venture-pitch-day',
    type: 'event',
    title: 'ENTS Cohort Venture Demo Day',
    excerpt:
      'Student founders pitch live software ventures and campus revenue models to faculty mentors.',
    content: `Join us for the flagship semester demo day where five student venture teams present working software, audited cash flows, and institutional roadmaps to faculty advisors and guest industry leaders.`,
    author: 'Executive Committee',
    date: 'March 10, 2026',
    readTime: '3 hours',
    tags: ['Pitch Day', 'Ventures'],
    eventDate: 'Friday, April 03, 2026',
    eventTime: '17:00 - 19:30 CAT',
    eventLocation: 'RCA Main Amphitheater',
    rsvpLink: '/about',
    imageUrl: '/events/demo-day.jpg',
    speakers: ['Cedric Mugisha', 'Eng. Christian Niyitegeka'],
  },

  // 5. News Article: Quantitative Discipline
  {
    id: 'news-quant-literacy',
    type: 'article',
    title: 'How Secondary Quantitative Societies Redefine Technical Literacy',
    excerpt:
      'Moving beyond theory to enforce statistical models and disciplined capital management before graduation.',
    content: `Traditional financial education often relies on textbook memorization of macroeconomic theory, leaving students unprepared for the fast-paced realities of algorithmic execution and risk management.

At ENTS, we take an engineering approach to financial literacy:
1. Probabilistic Reasoning: Traders learn to view market prices as stochastic processes rather than deterministic predictions.
2. The 1% Rule: Capital preservation is the core metric of success, enforced through automated telemetry rather than discretionary willpower.
3. Code as Strategy: Every hypothesis is backtested across historical tick datasets using Python before receiving live simulation rights.

This philosophy transforms students from passive spectators into disciplined analytical thinkers ready for global quantitative roles.`,
    author: 'Markets & Policy',
    date: 'February 28, 2026',
    readTime: '5 min read',
    tags: ['News', 'Quantitative'],
    sourceName: 'News',
    sourceUrl: 'https://rca.ac.rw',
    imageUrl: '/news/venture-sprint.jpg',
  },

  // 6. Upcoming Event: Masterclass
  {
    id: 'event-macro-masterclass',
    type: 'event',
    title: 'Macroeconomic & FX Volatility Masterclass',
    excerpt:
      'Weekend deep dive into central bank rate cycles, regional liquidity, and currency hedging.',
    content: `An intensive two-hour masterclass exploring how global macroeconomic indicators impact frontier market foreign exchange stability. Led by student quantitative researchers with curated case studies.`,
    author: 'Advisory Board',
    date: 'February 20, 2026',
    readTime: '2 hours',
    tags: ['Workshop', 'Economics'],
    eventDate: 'Saturday, April 11, 2026',
    eventTime: '10:00 - 12:00 CAT',
    eventLocation: 'Virtual Session Room',
    rsvpLink: '/about',
    imageUrl: '/events/masterclass.jpg',
    speakers: ['Aline Umutoni'],
  },
];
