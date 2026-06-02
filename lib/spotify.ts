// lib/spotify.ts
import type { SpotifyTokenResponse, SpotifyAlbumsResponse, SpotifyAlbum } from '@/types/api';

const CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const ARTIST_ID     = process.env.SPOTIFY_ARTIST_ID!;

async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Spotify token error: ${res.status}`);
  const data: SpotifyTokenResponse = await res.json();
  return data.access_token;
}

export async function getArtistReleases(): Promise<SpotifyAlbum[]> {
  const token = await getAccessToken();
  const res = await fetch(
    `https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?include_groups=album,single&market=US&limit=10`,
    { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error(`Spotify albums error: ${res.status}`);
  const data: SpotifyAlbumsResponse = await res.json();
  return data.items;
}

export interface Track {
  name: string;
  artist: string;
  spotifyUri: string;   // spotify:track:abc123 — used by iframe Embed API
  spotifyUrl: string;   // https://open.spotify.com/track/abc123 — used as link
  albumArt: string;
}

// Returns all top tracks shaped for the MiniPlayer
export async function getArtistTopTracks(): Promise<Track[]> {
  try {
    const token = await getAccessToken();
    const res = await fetch(
      `https://api.spotify.com/v1/artists/${ARTIST_ID}/top-tracks?market=US`,
      { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 86400 } }
    );
    if (!res.ok) return [];
    const data = await res.json();

    return (data.tracks ?? []).map((t: any) => ({
      name:       t.name,
      artist:     t.artists?.[0]?.name ?? 'Jason Tiger Eater',
      spotifyUri: t.uri,
      spotifyUrl: t.external_urls?.spotify ?? '#',
      albumArt:   t.album?.images?.[2]?.url ?? t.album?.images?.[0]?.url ?? '',
    }));
  } catch {
    return [];
  }
}

export async function getArtistTopTrack(): Promise<Track | null> {
  const tracks = await getArtistTopTracks();
  return tracks[0] ?? null;
}