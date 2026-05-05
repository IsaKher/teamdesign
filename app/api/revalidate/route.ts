import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

const SECRET = process.env.SANITY_REVALIDATE_SECRET;

// ─── POST /api/revalidate ─────────────────────────────────────────────────────
// Called by Sanity webhooks to purge the ISR cache after content changes.
//
// Authentication: pass the secret in the Authorization header, not the URL,
// so it never appears in server logs or Sanity webhook history.
//
//   Authorization: Bearer <SANITY_REVALIDATE_SECRET>
//
export async function POST(req: NextRequest) {
  // Accept secret via Authorization header OR ?secret= query param
  // (Sanity's webhook UI supports query params but not custom headers via API)
  const headerSecret =
    req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ?? null;
  const querySecret = req.nextUrl.searchParams.get('secret');
  const secret = headerSecret ?? querySecret;

  if (!SECRET || secret !== SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    revalidateTag('sanity');
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', err }, { status: 500 });
  }
}
