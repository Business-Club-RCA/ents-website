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
  track?: 'Business Handlers' | 'Traders' | 'Engineering';
  classYear?: string;
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

