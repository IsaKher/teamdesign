import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

const SECRET = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

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
