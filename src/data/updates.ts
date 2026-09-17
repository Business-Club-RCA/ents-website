import { FeedItem } from '@/types';

export const initialFeedItems: FeedItem[] = [
  // 1. News Article
  {
    id: 'news-rca-leaders-2026',
    type: 'article',
    title: 'Inside Rwanda Coding Academy: Training Africa\'s Next Generation of Venture Engineers',
    excerpt:
      'Students in Nyabihu combine software engineering with venture building, testing digital cash flows and algorithmic market models in real-time.',
    author: 'Tech & Markets Editorial',
    date: 'March 14, 2026',
    readTime: '4 min read',
    tags: ['News', 'RCA', 'Ventures'],
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
    author: 'Quant Committee',
    date: 'March 22, 2026',
    readTime: '2 hours',
    tags: ['Competition', 'Trading'],
    eventDate: 'Saturday, March 28, 2026',
    eventTime: '15:00 - 17:30 CAT',
    eventLocation: 'RCA Innovation Lab',
    rsvpLink: '/join',
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
    author: 'Executive Committee',
    date: 'March 10, 2026',
    readTime: '3 hours',
    tags: ['Pitch Day', 'Ventures'],
    eventDate: 'Friday, April 03, 2026',
    eventTime: '17:00 - 19:30 CAT',
    eventLocation: 'RCA Main Amphitheater',
    rsvpLink: '/join',
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
    author: 'Advisory Board',
    date: 'February 20, 2026',
    readTime: '2 hours',
    tags: ['Workshop', 'Economics'],
    eventDate: 'Saturday, April 11, 2026',
    eventTime: '10:00 - 12:00 CAT',
    eventLocation: 'Virtual Session Room',
    rsvpLink: '/join',
    imageUrl: '/events/masterclass.jpg',
    speakers: ['Aline Umutoni'],
  },
];
