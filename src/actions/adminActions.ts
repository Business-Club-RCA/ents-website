'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  verifyPassword,
  setAdminSession,
  clearAdminSession,
  isAuthenticated,
} from '@/lib/auth';
import {
  saveProject,
  deleteProject,
  saveUpdate,
  deleteUpdate,
  registerEventAttendance,
  saveTrack,
  saveTeamMember,
  deleteTeamMember,
  saveClubMember,
  deleteClubMember,
  saveLeaderboardEntry,
  deleteLeaderboardEntry,
  updateStats,
  updateSiteConfig,
  submitApplication,
  updateApplicationStatus,
} from '@/lib/db';
import {
  Project,
  FeedItem,
  TrackInfo,
  TeamMember,
  ClubMember,
  LeaderboardEntry,
  StatItem,
  CohortApplication,
} from '@/types';
import { uploadImageBuffer, isCloudinaryConfigured } from '@/lib/cloudinary';

// -------------------------------------------------------------
// 1. AUTHENTICATION ACTIONS
// -------------------------------------------------------------

export async function loginAction(
  prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const passcode = formData.get('passcode') as string;
  if (!passcode) {
    return { error: 'Passcode is required.' };
  }

  const isValid = await verifyPassword(passcode);
  if (!isValid) {
    return { error: 'Invalid admin passcode. Access denied.' };
  }

  await setAdminSession();
  redirect('/admin');
}

export async function logoutAction() {
  await clearAdminSession();
  redirect('/admin/login');
}

// Helper to ensure action callers are authenticated
async function requireAuth() {
  const authed = await isAuthenticated();
  if (!authed) {
    throw new Error('Unauthorized');
  }
}

// -------------------------------------------------------------
// 2. PROJECTS CMS
// -------------------------------------------------------------

export async function saveProjectAction(project: Project) {
  await requireAuth();
  await saveProject(project);
  revalidatePath('/projects');
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteProjectAction(id: string) {
  await requireAuth();
  await deleteProject(id);
  revalidatePath('/projects');
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

// -------------------------------------------------------------
// 3. UPDATES & EVENTS CMS
// -------------------------------------------------------------

export async function saveUpdateAction(item: FeedItem) {
  await requireAuth();
  await saveUpdate(item);
  revalidatePath('/updates');
  revalidatePath(`/updates/${item.id}`);
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteUpdateAction(id: string) {
  await requireAuth();
  await deleteUpdate(id);
  revalidatePath('/updates');
  revalidatePath('/admin');
  return { success: true };
}

export async function registerAttendanceAction(eventId: string, attendee: {
  fullName: string;
  email: string;
  classYear: string;
}) {
  const success = await registerEventAttendance(eventId, attendee);
  revalidatePath('/updates');
  revalidatePath('/admin');
  return { success };
}

// -------------------------------------------------------------
// 4. LEADERBOARD CMS
// -------------------------------------------------------------

export async function saveLeaderboardAction(entry: LeaderboardEntry) {
  await requireAuth();
  await saveLeaderboardEntry(entry);
  revalidatePath('/leaderboard');
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteLeaderboardAction(name: string) {
  await requireAuth();
  await deleteLeaderboardEntry(name);
  revalidatePath('/leaderboard');
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

// -------------------------------------------------------------
// 5. TRACKS & CURRICULUM CMS
// -------------------------------------------------------------

export async function saveTrackAction(track: TrackInfo) {
  await requireAuth();
  await saveTrack(track);
  revalidatePath('/tracks');
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

// -------------------------------------------------------------
// 6. TEAM CMS
// -------------------------------------------------------------

export async function saveTeamMemberAction(member: TeamMember) {
  await requireAuth();
  await saveTeamMember(member);
  revalidatePath('/about');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteTeamMemberAction(id: string) {
  await requireAuth();
  await deleteTeamMember(id);
  revalidatePath('/about');
  revalidatePath('/admin');
  return { success: true };
}

// 6b. CLUB MEMBERS CMS
export async function saveClubMemberAction(member: ClubMember) {
  await requireAuth();
  await saveClubMember(member);
  revalidatePath('/about');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteClubMemberAction(id: string) {
  await requireAuth();
  await deleteClubMember(id);
  revalidatePath('/about');
  revalidatePath('/admin');
  return { success: true };
}

// MEDIA UPLOAD ACTION (CLOUDINARY)
export async function uploadImageAction(formData: FormData): Promise<{
  success: boolean;
  url?: string;
  error?: string;
}> {
  await requireAuth();

  const file = formData.get('file') as File | null;
  const folder = (formData.get('folder') as string) || 'ents';

  if (!file) {
    return { success: false, error: 'No file was provided.' };
  }

  if (!isCloudinaryConfigured()) {
    return {
      success: false,
      error:
        'Cloudinary credentials not set in .env.local. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.',
    };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = await uploadImageBuffer(buffer, folder);

    if (!result.success) {
      return { success: false, error: result.error || 'Upload to Cloudinary failed.' };
    }

    return { success: true, url: result.url };
  } catch (err) {
    return { success: false, error: (err as Error).message || 'Failed to process image.' };
  }
}

// -------------------------------------------------------------
// 7. STATS & BRANDING CMS
// -------------------------------------------------------------

export async function saveStatsAction(stats: StatItem[]) {
  await requireAuth();
  await updateStats(stats);
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function saveSiteConfigAction(config: Parameters<typeof updateSiteConfig>[0]) {
  await requireAuth();
  await updateSiteConfig(config);
  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/admin');
  return { success: true };
}

// -------------------------------------------------------------
// 8. COHORT APPLICATIONS
// -------------------------------------------------------------

export async function submitApplicationAction(data: {
  fullName: string;
  email: string;
  classYear: string;
  preferredTrack: string;
  reason: string;
  experienceOrSkills?: string;
}) {
  const application = await submitApplication(data);
  revalidatePath('/admin');
  return { success: true, application };
}

export async function updateApplicationStatusAction(
  id: string,
  status: CohortApplication['status']
) {
  await requireAuth();
  await updateApplicationStatus(id, status);
  revalidatePath('/admin');
  return { success: true };
}

