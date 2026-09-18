import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Guard all /admin routes
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
    const isLoginPage = pathname === '/admin/login';

    const authResult = await verifySessionToken(sessionCookie?.value);
    const isAuthed = authResult.valid;

    // If attempting to access /admin (and not /admin/login) without a valid HMAC session, redirect to /admin/login
    if (!isAuthed && !isLoginPage) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If already authenticated and visiting /admin/login, redirect to /admin
    if (isAuthed && isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

