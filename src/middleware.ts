import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedPaths = [
  '/component/makeup-recommendations',
  '/component/outfit-analyzer',
  '/component/face-analyzer-front',
  '/component/usage-dashboard',
];

function isProtectedRoute(pathname: string): boolean {
  return protectedPaths.some((path) => pathname.startsWith(path));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isProtectedRoute(pathname)) {
    // Check for Better Auth session cookie
    // Better Auth uses "better-auth.session_token" by default
    // In production with HTTPS, it may be prefixed with __Secure-
    const sessionCookie =
      req.cookies.get('better-auth.session_token') ||
      req.cookies.get('__Secure-better-auth.session_token');

    if (!sessionCookie) {
      // Redirect to home page — components also show sign-in prompts
      // but this prevents direct URL access to protected pages
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except Next.js internals, static files, and API routes
    '/((?!_next|api|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
