// lib/spotify.ts
import type { SpotifyTokenResponse, SpotifyAlbumsResponse, SpotifyAlbum } from '@/types/api';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const ARTIST_ID = process.env.SPOTIFY_ARTIST_ID!;

async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    next: { revalidate: 3600 }, // cache token for 1 hour
  });

  if (!res.ok) throw new Error(`Spotify token error: ${res.status}`);

  const data: SpotifyTokenResponse = await res.json();
  return data.access_token;
}

export async function getArtistReleases(): Promise<SpotifyAlbum[]> {
  const token = await getAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?include_groups=album,single&market=US&limit=10`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 86400 }, // revalidate every 24 hours
    }
  );

  if (!res.ok) throw new Error(`Spotify albums error: ${res.status}`);

  const data: SpotifyAlbumsResponse = await res.json();
  return data.items;
}

export async function getArtistTopTrackUri(): Promise<string | null> {
  const token = await getAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/artists/${ARTIST_ID}/top-tracks?market=US`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 86400 },
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  const topTrack = data.tracks?.[0];
  return topTrack?.uri ?? null;
}
