import { withAuth } from './components/with-auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserRole } from './types';

export function middleware(request: NextRequest) {
  const user = request.cookies.get('user')?.value;
  const userRole = user ? (JSON.parse(user).role as UserRole) : undefined;

  const hospitalRoutes = ['/hospital', '/hospital/(.*)'];
  const pharmacyRoutes = ['/pharmacy', '/pharmacy/(.*)'];
  const adminRoutes = ['/admin', '/admin/(.*)'];
  const dispatcherRoutes = ['/dispatcher', '/dispatcher/(.*)'];

  const isHospitalRoute = hospitalRoutes.some(route => new RegExp(`^${route}$`).test(request.nextUrl.pathname));
  const isPharmacyRoute = pharmacyRoutes.some(route => new RegExp(`^${route}$`).test(request.nextUrl.pathname));
  const isAdminRoute = adminRoutes.some(route => new RegExp(`^${route}$`).test(request.nextUrl.pathname));
  const isDispatcherRoute = dispatcherRoutes.some(route => new RegExp(`^${route}$`).test(request.nextUrl.pathname));

  if (isHospitalRoute && userRole !== 'hospital') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isPharmacyRoute && userRole !== 'pharmacy') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAdminRoute && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

   if (isDispatcherRoute && userRole !== 'dispatcher') {
    return NextResponse.redirect(new URL('/login', request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    '/hospital/:path*', '/pharmacy/:path*', '/admin/:path*', '/dispatcher/:path*'
  ],
};
