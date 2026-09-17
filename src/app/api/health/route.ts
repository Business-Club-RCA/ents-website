import { NextResponse } from 'next/server';
import { testPostgresConnection, isPostgresConfigured } from '@/lib/postgres';
import { isCloudinaryConfigured } from '@/lib/cloudinary';
import { readDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const pgConfigured = isPostgresConfigured();
  let pgStatus: { connected: boolean; message: string; version?: string } = {
    connected: false,
    message: 'PostgreSQL not configured (running in local storage fallback mode)',
  };

  if (pgConfigured) {
    pgStatus = await testPostgresConnection();
  }

  const cloudinaryReady = isCloudinaryConfigured();
  const db = await readDB();

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: {
      type: pgStatus.connected ? 'Aiven PostgreSQL' : 'Local JSON Fallback',
      configured: pgConfigured,
      connected: pgStatus.connected,
      message: pgStatus.message,
      version: pgStatus.version,
    },
    media: {
      provider: 'Cloudinary',
      configured: cloudinaryReady,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || null,
    },
    telemetry: {
      projectsCount: db.projects?.length || 0,
      updatesCount: db.updates?.length || 0,
      clubMembersCount: db.clubMembers?.length || 0,
      executiveTeamCount: db.team?.length || 0,
      applicationsCount: db.applications?.length || 0,
    },
  });
}

