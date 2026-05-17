import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * Sanity Webhook → Next.js Revalidation
 *
 * Setup in Sanity Manage:
 *   URL: https://your-domain.vercel.app/api/revalidate?secret=YOUR_SECRET
 *   Trigger: on create, update, delete
 *   Dataset: production
 *   Projection: { _type, _id }
 *
 * Add to .env.local:
 *   SANITY_REVALIDATE_SECRET=any-random-string-you-choose
 */

const PATH_MAP: Record<string, string[]> = {
  project:     ['/', '/admin', '/admin/projects'],
  experience:  ['/', '/admin', '/admin/experience'],
  testimonial: ['/', '/admin', '/admin/testimonials'],
};

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  // 1. Validate secret
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    console.warn('[revalidate] Unauthorized webhook attempt');
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    // 2. Parse Sanity payload
    const body = await req.json().catch(() => ({}));
    const type: string = body._type ?? 'unknown';

    // 3. Revalidate relevant paths
    const paths = PATH_MAP[type] ?? ['/', '/admin'];
    for (const path of paths) {
      revalidatePath(path);
    }

    console.log(`[revalidate] ✅ Revalidated paths for type "${type}":`, paths);

    return NextResponse.json({
      revalidated: true,
      type,
      paths,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('[revalidate] Error:', err);
    return NextResponse.json({ message: 'Revalidation failed', error: err.message }, { status: 500 });
  }
}

// Verify webhook is alive
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ status: 'Webhook endpoint is live ✅', timestamp: new Date().toISOString() });
}
