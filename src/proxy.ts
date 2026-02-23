import { NextRequest, NextResponse } from 'next/server';

const ADMIN_ROUTES = ['/admin'];
const USER_ROUTES = ['/user'];
const AUTH_ROUTES = ['/login', '/register'];
const ADMIN_ROLES = ['superadmin', 'admin', 'staff'];

function getAuthFromRequest(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;
  const role = req.cookies.get('auth-role')?.value;
  return { token, role };
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const { token, role } = getAuthFromRequest(req);

  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r));
  const isUserRoute = USER_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  if (isAuthRoute && token) {
    if (role && ADMIN_ROLES.includes(role)) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }
    return NextResponse.redirect(new URL('/user/dashboard', req.url));
  }

  if (isAdminRoute) {
    if (!token) return NextResponse.redirect(new URL('/login', req.url));
    if (!role || !ADMIN_ROLES.includes(role)) {
      return NextResponse.redirect(new URL('/user/dashboard', req.url));
    }
  }

  if (isUserRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/login', '/register'],
};
