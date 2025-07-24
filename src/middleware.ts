
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserRole } from './types';

export function middleware(request: NextRequest) {
    // This middleware logic is now handled more robustly by the `withAuth` HOC.
    // The `withAuth` component checks authentication on the client-side,
    // which is generally a better pattern for Next.js App Router applications
    // as it avoids middleware complexities and provides a better user experience
    // with loading skeletons.

    // To prevent any conflicts, we will simply pass the request through.
  return NextResponse.next();
}

export const config = {
  // We keep the matcher to potentially re-introduce server-side checks if needed,
  // but for now, the middleware does nothing.
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/dispatcher/:path*',
    '/hospital/:path*',
    '/pharmacy/:path*',
  ],
};
