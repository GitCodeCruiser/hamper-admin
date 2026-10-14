import { NextResponse } from 'next/server';

import packageInfo from '../../../../package.json';

export const dynamic = 'force-dynamic';

// function formatMemory(bytes: number): string {
//   return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
// }

export async function GET() {
  const timestamp = new Date().toISOString();
  const uptime = process.uptime();
  // const environment = process.env.NODE_ENV || 'development';
  const version = packageInfo.version || '1.0.0';

  // const memoryUsage = process.memoryUsage();
  // const memory = {
  //   rss: formatMemory(memoryUsage.rss),
  //   heapTotal: formatMemory(memoryUsage.heapTotal),
  //   heapUsed: formatMemory(memoryUsage.heapUsed),
  //   external: formatMemory(memoryUsage.external),
  // };

  // const apiUrl = process.env.NEXT_APP_BASE_URL;
  // let apiStatus: 'UP' | 'DOWN' = 'DOWN';
  // let apiLatencyMs: number | null = null;
  // let apiError: string | null = null;

  // if (apiUrl) {
  //   const start = Date.now();
  //   const controller = new AbortController();
  //   const timeoutId = setTimeout(() => controller.abort(), 3000); // 3-second timeout

  //   try {
  //     // Perform a HEAD or GET request to probe the backend API.
  //     // We use the root endpoint of the API as a general check.
  //     const response = await fetch(apiUrl, {
  //       method: 'GET',
  //       signal: controller.signal,
  //       next: { revalidate: 0 }, // Prevent next/fetch caching
  //     });

  //     apiLatencyMs = Date.now() - start;
  //     // If the API server responds (even 401/404), it's UP.
  //     // 5xx errors or network failures mark it DOWN.
  //     apiStatus = response.status >= 500 ? 'DOWN' : 'UP';
  //     if (response.status >= 500) {
  //       apiError = `Downstream service returned server error: ${response.status}`;
  //     }
  //   } catch (err: unknown) {
  //     apiStatus = 'DOWN';
  //     apiError = err instanceof Error ? err.message : String(err);
  //     if (err instanceof Error && err.name === 'AbortError') {
  //       apiError = 'Request timed out after 3000ms';
  //     }
  //   } finally {
  //     clearTimeout(timeoutId);
  //   }
  // } else {
  //   apiError = 'NEXT_APP_BASE_URL environment variable is not configured';
  // }

  // Define overall system health
  // const overallStatus = apiStatus === 'UP' ? 'UP' : 'DEGRADED';

  const healthData = {
    status: 'success',
    message: 'Server is running',
    timestamp,
    uptime: `${uptime.toFixed(2)}s`,
    version,

    // status: overallStatus,
    // timestamp,
    // uptime: `${uptime.toFixed(2)}s`,
    // environment,
    // version,
    // details: {
    //   server: {
    //     status: 'UP',
    //   },
    //   memory,
    //   api: {
    //     status: apiStatus,
    //     url: apiUrl || 'not-configured',
    //     latencyMs: apiLatencyMs !== null ? `${apiLatencyMs}ms` : null,
    //     error: apiError,
    //   },
    // },
  };

  // Industry standard headers: prevent any caching of the health response
  const headers = new Headers({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
    'Surrogate-Control': 'no-store',
  });

  // Return 200 OK even if degraded, representing the server itself is responsive
  return NextResponse.json(healthData, {
    status: 200,
    headers,
  });
}
