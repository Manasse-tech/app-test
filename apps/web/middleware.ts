import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] };
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || 'nsug.com';
  const currentHost =
    process.env.NODE_ENV === 'production'
      ? hostname.replace(`.nsug.com`, '')
      : hostname.replace(`.localhost:3000`, '');
  if (currentHost === 'nsug' || currentHost === 'localhost:3000' || currentHost === '')
    return NextResponse.next();
  url.pathname = `/_tenants/${currentHost}${url.pathname}`;
  return NextResponse.rewrite(url);
}
