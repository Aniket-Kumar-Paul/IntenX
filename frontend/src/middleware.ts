import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('user')?.value;
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Define public routes
  const publicRoutes = ['/'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Redirect authenticated users from public routes to dashboard
  if (token && isPublicRoute) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // Handle NEAR callback
  const isNearCallback = url.searchParams.has('account_id') && 
                        url.searchParams.has('public_key') && 
                        url.searchParams.has('all_keys');

  // Allow access to public routes or if authenticated or during NEAR callback
  if (isPublicRoute || token || isNearCallback) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to landing page
  url.pathname = '/';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};