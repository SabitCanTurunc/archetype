import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authSession = request.cookies.get('auth_session');

  // If trying to access /admin without being logged in, redirect to /login
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!authSession || authSession.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If trying to access /login while already logged in, redirect to /admin
  if (request.nextUrl.pathname === '/login') {
    if (authSession && authSession.value === 'authenticated') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
