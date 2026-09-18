import React from 'react';
import { readDB } from '@/lib/db';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const db = await readDB();

  return (
    <AdminDashboard
      initialData={{
        siteConfig: db.siteConfig,
        stats: db.stats,
        projects: db.projects,
        updates: db.updates,
        tracks: db.tracks,
        team: db.team,
        clubMembers: db.clubMembers || [],
        leaderboard: db.leaderboard,
        testimonials: db.testimonials || [],
        applications: db.applications || [],
      }}
    />
  );
}

