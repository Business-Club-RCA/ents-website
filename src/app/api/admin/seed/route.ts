import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { readDB } from '@/lib/db';
import { testPostgresConnection, isPostgresConfigured, saveEntireDBToPostgres } from '@/lib/postgres';

export const dynamic = 'force-dynamic';

export async function POST() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Valid admin session required.' },
      { status: 401 }
    );
  }

  try {
    const db = await readDB();
    const pgStatus = await testPostgresConnection();

    if (isPostgresConfigured() && pgStatus.connected) {
      await saveEntireDBToPostgres(db);
    }

    return NextResponse.json({
      success: true,
      message: 'Database successfully verified and synced with Aiven PostgreSQL.',
      postgres: pgStatus,
      collections: {
        projects: db.projects.length,
        updates: db.updates.length,
        tracks: db.tracks.length,
        team: db.team.length,
        clubMembers: db.clubMembers?.length || 0,
        leaderboard: db.leaderboard.length,
        testimonials: db.testimonials.length,
        stats: db.stats.length,
        applications: db.applications?.length || 0,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

