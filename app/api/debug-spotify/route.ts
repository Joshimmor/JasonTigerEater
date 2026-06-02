// app/api/debug-spotify/route.ts
// TEMPORARY — delete after debugging. Visit /api/debug-spotify to see what Spotify returns.
import { NextResponse } from 'next/server';

export async function GET() {
  const CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const ARTIST_ID     = process.env.SPOTIFY_ARTIST_ID;

  const envCheck = {
    SPOTIFY_CLIENT_ID:     CLIENT_ID     ? '✓ set' : '✗ MISSING',
    SPOTIFY_CLIENT_SECRET: CLIENT_SECRET ? '✓ set' : '✗ MISSING',
    SPOTIFY_ARTIST_ID:     ARTIST_ID     ? `✓ set (${ARTIST_ID})` : '✗ MISSING',
  };

  if (!CLIENT_ID || !CLIENT_SECRET || !ARTIST_ID) {
    return NextResponse.json({ envCheck, error: 'Missing env vars' }, { status: 500 });
  }

  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${credentials}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });

  if (!tokenRes.ok) {
    return NextResponse.json({ envCheck, tokenError: await tokenRes.text() }, { status: 500 });
  }

  const { access_token } = await tokenRes.json();

  const tracksRes = await fetch(
    `https://api.spotify.com/v1/artists/${ARTIST_ID}/top-tracks?market=US`,
    { headers: { Authorization: `Bearer ${access_token}` }, cache: 'no-store' }
  );

  if (!tracksRes.ok) {
    return NextResponse.json({ envCheck, tracksError: await tracksRes.text() }, { status: 500 });
  }

  const data = await tracksRes.json();
  const summary = (data.tracks ?? []).map((t: any) => ({
    name: t.name,
    preview_url: t.preview_url ?? 'NULL',
    album: t.album?.name,
  }));

  return NextResponse.json({ envCheck, trackCount: summary.length, tracks: summary });
}
