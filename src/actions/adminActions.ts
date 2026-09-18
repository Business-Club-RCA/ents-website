'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import {
  verifyPassword,
  setAdminSession,
  clearAdminSession,
  isAuthenticated,
  checkRateLimit,
  recordFailedAttempt,
  clearFailedAttempts,
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

async function getClientIp(): Promise<string> {
  try {
    const headersList = await headers();
    const forwarded = headersList.get('x-forwarded-for');
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    return headersList.get('x-real-ip') || '127.0.0.1';
  } catch {
    return '127.0.0.1';
  }
}

export async function loginAction(
  prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const clientIp = await getClientIp();

  // Check rate limit & brute force lockout
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return {
      error: `Too many failed attempts. Security lockout active. Please wait ${rateLimit.remainingSeconds}s before retrying.`,
    };
  }

  const passcode = formData.get('passcode') as string;
  if (!passcode) {
    return { error: 'Passcode is required.' };
  }

  const isValid = await verifyPassword(passcode);
  if (!isValid) {
    recordFailedAttempt(clientIp);
    const updatedLimit = checkRateLimit(clientIp);
    if (!updatedLimit.allowed) {
      return {
        error: `Invalid admin passcode. Security lockout triggered for 15 minutes.`,
      };
    }
    return { error: 'Invalid admin passcode. Access denied.' };
  }

  // Clear failed attempts upon successful authentication
  clearFailedAttempts(clientIp);
  await setAdminSession();
  redirect('/admin');
}

export async function logoutAction() {
  await clearAdminSession();
  redirect('/admin/login');
}

// Helper to ensure action callers are authenticated
export async function requireAuth() {
  const authed = await isAuthenticated();
  if (!authed) {
    throw new Error('Unauthorized. Valid admin session required.');
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
  if (!eventId || typeof eventId !== 'string' || eventId.length > 100) {
    return { success: false, error: 'Invalid event ID' };
  }
  const cleanName = attendee?.fullName?.trim() || '';
  const cleanEmail = attendee?.email?.trim() || '';
  const cleanClass = attendee?.classYear?.trim() || '';

  if (!cleanName || cleanName.length > 100) {
    return { success: false, error: 'Name must be between 1 and 100 characters' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail) || cleanEmail.length > 120) {
    return { success: false, error: 'Invalid email address' };
  }

  const success = await registerEventAttendance(eventId, {
    fullName: cleanName,
    email: cleanEmail,
    classYear: cleanClass.slice(0, 50),
  });
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

