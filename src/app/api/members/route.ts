import { NextRequest, NextResponse } from 'next/server';
import { getClubMembers, saveClubMember } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { ClubMember } from '@/types';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const track = searchParams.get('track');

    let members = await getClubMembers();

    if (track) {
      members = members.filter(
        (m) => m.track?.toLowerCase() === track.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      count: members.length,
      data: members,
    });
    return NextResponse.json(
      {
        success: true,
        count: members.length,
        data: members,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin credentials required.' },
        { status: 401 }
      );
    }

    const body = (await request.json()) as Partial<ClubMember>;

    if (!body.name || !body.role) {
      return NextResponse.json(
        { success: false, error: 'Member "name" and "role" are required fields.' },
        { status: 400 }
      );
    }

    const member: ClubMember = {
      id: body.id || `member-${Date.now()}`,
      name: body.name.trim(),
      role: body.role.trim(),
      track: body.track || 'Business Handlers',
      classYear: body.classYear || 'Year 1',
      bio: body.bio?.trim() || '',
      specialization: body.specialization?.trim() || '',
      avatarUrl: body.avatarUrl || '',
      initials:
        body.initials ||
        body.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2),
      socials: body.socials || {},
    };

    const saved = await saveClubMember(member);
    revalidatePath('/about');
    revalidatePath('/admin');

    return NextResponse.json({
      success: true,
      data: saved,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

