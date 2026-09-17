import fs from 'fs/promises';
import path from 'path';
import {
  Project,
  FeedItem,
  TrackInfo,
  TeamMember,
  ClubMember,
  LeaderboardEntry,
  StatItem,
  Testimonial,
  CohortApplication,
} from '@/types';
import { projectsData } from '@/data/projects';
import { initialFeedItems } from '@/data/updates';
import { tracksData } from '@/data/tracks';
import { executiveTeam, clubMembers } from '@/data/team';
import { mockLeaderboardData } from '@/data/leaderboard';
import { statsData } from '@/data/stats';
import { siteConfig } from '@/data/site';
import {
  isPostgresConfigured,
  loadEntireDBFromPostgres,
  saveEntireDBToPostgres,
} from './postgres';

export interface SiteContentDB {
  siteConfig: typeof siteConfig;
  stats: StatItem[];
  projects: Project[];
  updates: FeedItem[];
  tracks: TrackInfo[];
  team: TeamMember[];
  clubMembers: ClubMember[];
  leaderboard: LeaderboardEntry[];
  testimonials: Testimonial[];
  applications: CohortApplication[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'content.json');

// In-memory cache for ultra-low latency reads
let cachedDB: SiteContentDB | null = null;
let writeQueue = Promise.resolve();

const initialTestimonials: Testimonial[] = [
  {
    id: 'aline',
    quote:
      '"From campus prototypes to live order routing 🚀, ENTS is a must-have society. I can\'t imagine analyzing markets without SIFS!"',
    author: 'Aline Umutoni',
    role: 'VP & Lead Quantitative Trader',
    avatarUrl: '/testimonials/aline.jpg',
    badgeBg: 'bg-neutral-900 text-white',
  },
  {
    id: 'david',
    quote:
      '"Strict 1% risk guardrails 🌐, automated backtesting, and top-notch peer audits. ENTS has it all."',
    author: 'David Nshimiyimana',
    role: 'Treasury Lead at KuraPay',
    avatarUrl: '/testimonials/david.jpg',
    badgeBg: 'bg-neutral-800 text-white',
  },
  {
    id: 'grace',
    quote:
      '"The weekly pitch teardowns and pro-forma forecasting ⚡ prepared our squad directly for institutional venture capital."',
    author: 'Grace Mukamana',
    role: 'Full-Stack Venture Engineer',
    avatarUrl: '/testimonials/grace.jpg',
    badgeBg: 'bg-neutral-700 text-white',
  },
  {
    id: 'kevine',
    quote:
      '"Trading simulated FX depth with real execution journals 📈 eliminated emotional bias from our algorithms entirely."',
    author: 'Kevine Ishimwe',
    role: 'Derivatives Analyst · Year 3',
    avatarUrl: '/testimonials/kevine.jpg',
    badgeBg: 'bg-neutral-900 text-white',
  },
  {
    id: 'patrick',
    quote:
      '"Campus micro-enterprises backed by student software 🤝 proved that RCA engineers can monetize while in school."',
    author: 'Patrick Cyusa',
    role: 'Market Depth & Arbitrage Lead',
    avatarUrl: '/testimonials/patrick.jpg',
    badgeBg: 'bg-neutral-800 text-white',
  },
];

function getInitialDB(): SiteContentDB {
  return {
    siteConfig,
    stats: statsData,
    projects: projectsData,
    updates: initialFeedItems,
    tracks: tracksData,
    team: executiveTeam,
    clubMembers,
    leaderboard: mockLeaderboardData,
    testimonials: initialTestimonials,
    applications: [],
  };
}

export async function readDB(): Promise<SiteContentDB> {
  if (cachedDB) return cachedDB;

  // 1. Try reading from Aiven PostgreSQL if configured
  if (isPostgresConfigured()) {
    try {
      const pgData = await loadEntireDBFromPostgres();
      if (pgData && Object.keys(pgData).length > 0) {
        const initial = getInitialDB();
        cachedDB = {
          ...initial,
          ...pgData,
          clubMembers: pgData.clubMembers || initial.clubMembers,
          applications: pgData.applications || [],
        } as SiteContentDB;
        return cachedDB;
      } else {
        // Postgres connected but database is fresh/empty -> auto-seed from local data
        let seedData = getInitialDB();
        try {
          const raw = await fs.readFile(DB_FILE, 'utf-8');
          seedData = { ...seedData, ...JSON.parse(raw) };
        } catch {
          // use initial
        }
        await saveEntireDBToPostgres(seedData);
        cachedDB = seedData;
        return cachedDB;
      }
    } catch (err) {
      console.warn('[DB] Falling back to local storage due to PostgreSQL read notice:', (err as Error).message);
    }
  }

  // 2. Local JSON file storage (fallback or default when DATABASE_URL is not provided)
  try {
    const raw = await fs.readFile(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    const initial = getInitialDB();
    const needsMigration = !parsed.clubMembers;
    cachedDB = {
      ...initial,
      ...parsed,
      clubMembers: parsed.clubMembers || initial.clubMembers,
      applications: parsed.applications || [],
    } as SiteContentDB;
    if (needsMigration) {
      await writeDB(cachedDB);
    }
    return cachedDB;
  } catch {
    // If file doesn't exist, create it with initial seed
    const initial = getInitialDB();
    await writeDB(initial);
    return initial;
  }
}

export async function writeDB(data: SiteContentDB): Promise<void> {
  cachedDB = data;
  writeQueue = writeQueue.then(async () => {
    // 1. Sync to Aiven PostgreSQL if configured
    if (isPostgresConfigured()) {
      try {
        await saveEntireDBToPostgres(data);
      } catch (err) {
        console.warn('[DB] Failed saving to PostgreSQL, falling back to local file storage:', (err as Error).message);
      }
    }

    // 2. Always persist atomic local backup to data/content.json
    try {
      await fs.mkdir(DB_DIR, { recursive: true });
      const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
      await fs.writeFile(tempFile, JSON.stringify(data, null, 2), 'utf-8');
      await fs.rename(tempFile, DB_FILE);
    } catch (err) {
      console.error('Failed writing DB to disk:', err);
    }
  });
  await writeQueue;
}

// -------------------------------------------------------------
// REPOSITORY METHODS
// -------------------------------------------------------------

// 1. Site Config
export async function getSiteConfig(): Promise<typeof siteConfig> {
  const db = await readDB();
  return db.siteConfig;
}

export async function updateSiteConfig(partial: Partial<typeof siteConfig>): Promise<typeof siteConfig> {
  const db = await readDB();
  db.siteConfig = { ...db.siteConfig, ...partial };
  await writeDB(db);
  return db.siteConfig;
}

// 2. Stats
export async function getStats(): Promise<StatItem[]> {
  const db = await readDB();
  return db.stats;
}

export async function updateStats(stats: StatItem[]): Promise<StatItem[]> {
  const db = await readDB();
  db.stats = stats;
  await writeDB(db);
  return db.stats;
}

// 3. Projects
export async function getProjects(): Promise<Project[]> {
  const db = await readDB();
  return db.projects;
}

export async function getProject(id: string): Promise<Project | null> {
  const db = await readDB();
  return db.projects.find((p) => p.id === id) || null;
}

export async function saveProject(project: Project): Promise<Project> {
  const db = await readDB();
  const existingIdx = db.projects.findIndex((p) => p.id === project.id);
  if (existingIdx >= 0) {
    db.projects[existingIdx] = project;
  } else {
    db.projects.push(project);
  }
  await writeDB(db);
  return project;
}

export async function deleteProject(id: string): Promise<boolean> {
  const db = await readDB();
  const initialLength = db.projects.length;
  db.projects = db.projects.filter((p) => p.id !== id);
  if (db.projects.length !== initialLength) {
    await writeDB(db);
    return true;
  }
  return false;
}

// 4. Updates & Events
export async function getUpdates(): Promise<FeedItem[]> {
  const db = await readDB();
  return db.updates;
}

export async function getUpdate(id: string): Promise<FeedItem | null> {
  const db = await readDB();
  return db.updates.find((u) => u.id === id) || null;
}

export async function saveUpdate(item: FeedItem): Promise<FeedItem> {
  const db = await readDB();
  const existingIdx = db.updates.findIndex((u) => u.id === item.id);
  if (existingIdx >= 0) {
    db.updates[existingIdx] = item;
  } else {
    db.updates.unshift(item);
  }
  await writeDB(db);
  return item;
}

export async function deleteUpdate(id: string): Promise<boolean> {
  const db = await readDB();
  const initialLength = db.updates.length;
  db.updates = db.updates.filter((u) => u.id !== id);
  if (db.updates.length !== initialLength) {
    await writeDB(db);
    return true;
  }
  return false;
}

export async function registerEventAttendance(
  eventId: string,
  attendee: { fullName: string; email: string; classYear: string }
): Promise<boolean> {
  const db = await readDB();
  const event = db.updates.find((u) => u.id === eventId);
  if (!event) return false;

  if (!event.attendees) {
    event.attendees = [];
  }

  // Avoid duplicate email registration for the same event
  const alreadyRegistered = event.attendees.some(
    (a) => a.email.toLowerCase() === attendee.email.toLowerCase()
  );
  if (alreadyRegistered) return true;

  event.attendees.push({
    id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    fullName: attendee.fullName,
    email: attendee.email,
    classYear: attendee.classYear,
    registeredAt: new Date().toISOString(),
  });

  await writeDB(db);
  return true;
}

// 5. Tracks
export async function getTracks(): Promise<TrackInfo[]> {
  const db = await readDB();
  return db.tracks;
}

export async function getTrack(id: string): Promise<TrackInfo | null> {
  const db = await readDB();
  return db.tracks.find((t) => t.id === id) || null;
}

export async function saveTrack(track: TrackInfo): Promise<TrackInfo> {
  const db = await readDB();
  const existingIdx = db.tracks.findIndex((t) => t.id === track.id);
  if (existingIdx >= 0) {
    db.tracks[existingIdx] = track;
  } else {
    db.tracks.push(track);
  }
  await writeDB(db);
  return track;
}

// 6. Team Members
export async function getTeam(): Promise<TeamMember[]> {
  const db = await readDB();
  return db.team;
}

export async function saveTeamMember(member: TeamMember): Promise<TeamMember> {
  const db = await readDB();
  const existingIdx = db.team.findIndex((m) => m.id === member.id);
  if (existingIdx >= 0) {
    db.team[existingIdx] = member;
  } else {
    db.team.push(member);
  }
  await writeDB(db);
  return member;
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  const db = await readDB();
  const initialLength = db.team.length;
  db.team = db.team.filter((m) => m.id !== id);
  if (db.team.length !== initialLength) {
    await writeDB(db);
    return true;
  }
  return false;
}

// 6b. Club Members
export async function getClubMembers(): Promise<ClubMember[]> {
  const db = await readDB();
  return db.clubMembers || [];
}

export async function getClubMember(id: string): Promise<ClubMember | null> {
  const db = await readDB();
  return db.clubMembers?.find((m) => m.id === id) || null;
}

export async function saveClubMember(member: ClubMember): Promise<ClubMember> {
  const db = await readDB();
  if (!db.clubMembers) db.clubMembers = [];
  const existingIdx = db.clubMembers.findIndex((m) => m.id === member.id);
  if (existingIdx >= 0) {
    db.clubMembers[existingIdx] = member;
  } else {
    db.clubMembers.push(member);
  }
  await writeDB(db);
  return member;
}

export async function deleteClubMember(id: string): Promise<boolean> {
  const db = await readDB();
  if (!db.clubMembers) return false;
  const initialLength = db.clubMembers.length;
  db.clubMembers = db.clubMembers.filter((m) => m.id !== id);
  if (db.clubMembers.length !== initialLength) {
    await writeDB(db);
    return true;
  }
  return false;
}

// 7. Leaderboard
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const db = await readDB();
  return db.leaderboard;
}

export async function saveLeaderboardEntry(entry: LeaderboardEntry): Promise<LeaderboardEntry> {
  const db = await readDB();
  const existingIdx = db.leaderboard.findIndex((e) => e.name.toLowerCase() === entry.name.toLowerCase());
  if (existingIdx >= 0) {
    db.leaderboard[existingIdx] = entry;
  } else {
    db.leaderboard.push(entry);
  }
  // Keep sorted by rank
  db.leaderboard.sort((a, b) => a.rank - b.rank);
  await writeDB(db);
  return entry;
}

export async function deleteLeaderboardEntry(name: string): Promise<boolean> {
  const db = await readDB();
  const initialLength = db.leaderboard.length;
  db.leaderboard = db.leaderboard.filter((e) => e.name.toLowerCase() !== name.toLowerCase());
  if (db.leaderboard.length !== initialLength) {
    // Re-index ranks
    db.leaderboard.forEach((e, idx) => {
      e.rank = idx + 1;
    });
    await writeDB(db);
    return true;
  }
  return false;
}

// 8. Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  const db = await readDB();
  return db.testimonials;
}

export async function saveTestimonial(testimonial: Testimonial): Promise<Testimonial> {
  const db = await readDB();
  const existingIdx = db.testimonials.findIndex((t) => t.id === testimonial.id);
  if (existingIdx >= 0) {
    db.testimonials[existingIdx] = testimonial;
  } else {
    db.testimonials.push(testimonial);
  }
  await writeDB(db);
  return testimonial;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const db = await readDB();
  const initialLength = db.testimonials.length;
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  if (db.testimonials.length !== initialLength) {
    await writeDB(db);
    return true;
  }
  return false;
}

// 9. Applications
export async function getApplications(): Promise<CohortApplication[]> {
  const db = await readDB();
  return db.applications || [];
}

export async function submitApplication(
  appData: Omit<CohortApplication, 'id' | 'submittedAt' | 'status'>
): Promise<CohortApplication> {
  const db = await readDB();
  if (!db.applications) db.applications = [];

  const newApp: CohortApplication = {
    ...appData,
    id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    submittedAt: new Date().toISOString(),
    status: 'pending',
  };

  db.applications.unshift(newApp);
  await writeDB(db);
  return newApp;
}

export async function updateApplicationStatus(
  id: string,
  status: CohortApplication['status']
): Promise<boolean> {
  const db = await readDB();
  if (!db.applications) return false;

  const app = db.applications.find((a) => a.id === id);
  if (app) {
    app.status = status;
    await writeDB(db);
    return true;
  }
  return false;
}

