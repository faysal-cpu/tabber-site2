import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { apiRateLimiter } from '@/lib/utils/rate-limiter';

/**
 * Middleware for rate limiting API routes
 */
export function middleware(request: NextRequest) {
  // Only apply rate limiting to /api/client/* routes
  if (request.nextUrl.pathname.startsWith('/api/client/')) {
    // Get client IP address
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Check rate limit
    if (apiRateLimiter.shouldRateLimit(ip)) {
      const resetTime = apiRateLimiter.getResetTime(ip);
      const resetDate = new Date(resetTime);

      return NextResponse.json(
        {
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: resetDate.toISOString(),
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '20',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetDate.toISOString(),
          },
        }
      );
    }

    // Add rate limit headers to successful requests
    const remaining = apiRateLimiter.getRemainingRequests(ip);
    const resetTime = apiRateLimiter.getResetTime(ip);

    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', '20');
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', new Date(resetTime).toISOString());

    return response;
  }

  return NextResponse.next();
}

// Configure which routes to apply middleware to
export const config = {
  matcher: '/api/client/:path*',
};
