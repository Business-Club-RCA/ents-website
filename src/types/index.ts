export type TrackId = 'business-handlers' | 'traders';

export interface TrackInfo {
  id: TrackId;
  title: string;
  shortTag: string;
  tagline: string;
  description: string;
  longDescription: string;
  targetAudience: string;
  weeklyCadence: {
    phase: string;
    description: string;
  }[];
  skillsGained: string[];
  keyDeliverables: string[];
  toolsUsed: string[];
}

export type ProjectStatus = 'Live' | 'In Development' | 'Planned';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  featured?: boolean;
  category: 'Fintech' | 'Venture' | 'Platform' | 'Quantitative';
  tags: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  links?: {
    demo?: string;
    github?: string;
  };
  imageUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  track?: 'Executive' | 'Business Handlers' | 'Traders' | 'Engineering' | 'Club Member' | 'Advisory';
  classYear?: string;
  bio?: string;
  specialization?: string;
  avatarUrl?: string;
  initials: string;
  socials?: {
    linkedin?: string;
    github?: string;
    x?: string;
    portfolio?: string;
  };
}

export interface ClubMember {
  id: string;
  name: string;
  role: string;
  track?: 'Business Handlers' | 'Traders' | 'Engineering' | 'Executive' | 'Advisory' | string;
  classYear?: string;
  bio?: string;
  specialization?: string;
  avatarUrl?: string;
  initials: string;
  socials?: {
    linkedin?: string;
    x?: string;
    portfolio?: string;
    github?: string;
  };
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  classYear: string;
  track: 'Traders' | 'Business Handlers';
  assetClass: string; // e.g., 'Forex / Commodities', 'Indices / Synthetics'
  portfolioValue: number; // in USD
  initialValue: number;
  pnlPercent: number; // e.g., 28.4
  tradesCount: number;
  winRate: number; // percentage
  status: 'Active' | 'Under Review';
}

export interface StatItem {
  value: string;
  label: string;
  detail: string;
}

export interface JoinApplication {
  fullName: string;
  email: string;
  classYear: string;
  preferredTrack: TrackId | 'undecided';
  reason: string;
  experienceOrSkills?: string;
}

export type UpdateType = 'announcement' | 'article' | 'event';

export interface FeedItem {
  id: string;
  type: UpdateType;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  readTime?: string;
  tags: string[];
  isCustom?: boolean;
  featured?: boolean;

  // External Article metadata (e.g. BBC News)
  sourceUrl?: string;
  sourceName?: string;
  imageUrl?: string;

  // Event metadata
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  rsvpLink?: string;
  speakers?: string[];
  attendees?: {
    id: string;
    fullName: string;
    email: string;
    classYear: string;
    registeredAt: string;
  }[];
}

export interface Testimonial {
  id: string;
  quote: string; // feedback
  author: string; // name
  role: string; // role
  avatarUrl: string; // photo
  badgeBg?: string; // badge background color / accent
  badgeIcon?: string; // optional badge text or icon
  rating?: number; // rate (1-5 stars, default 5)
  featured?: boolean; // whether this is the featured showcase testimonial
}

export interface CohortApplication {
  id: string;
  fullName: string;
  email: string;
  classYear: string;
  preferredTrack: string;
  reason: string;
  experienceOrSkills?: string;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
}


