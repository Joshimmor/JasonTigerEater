// lib/bandsintown.ts
import type { BandsintownEvent } from '@/types/api';

const APP_ID = process.env.BANDSINTOWN_APP_ID!;
// Artist name must match exactly as it appears on Bandsintown
const ARTIST_NAME = process.env.BANDSINTOWN_ARTIST_NAME!;

function getTwoMonthDateRange(): string {
  const now = new Date();
  
  const twoMonthsFromNow = new Date(now);
  twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);

  const format = (d: Date): string => d.toISOString().split('T')[0];

  return `${format(now)},${format(twoMonthsFromNow)}`;
}

export async function getUpcomingShows(): Promise<BandsintownEvent[]> {
  const encodedArtist = encodeURIComponent(ARTIST_NAME);
  console.log(`Fetching upcoming shows for ${ARTIST_NAME} from Bandsintown...`);
  const res = await fetch(
    `https://rest.bandsintown.com/artists/${encodedArtist}/events?app_id=${APP_ID}&date=${getTwoMonthDateRange()}`,
    {
      next: { revalidate: 3600 }, // revalidate every hour
    }
  );

  if (!res.ok) throw new Error(`Bandsintown error: ${res.status}`);

  const data: BandsintownEvent[] = await res.json();
  console.log(`Fetched ${data.length} upcoming shows from Bandsintown.`);
  // Bandsintown returns an object with error key if artist not found
  if (!Array.isArray(data)) return [];

  return data;
}

export async function getShowById(id: string): Promise<BandsintownEvent | null> {
  // Check upcoming shows first (cheap, already cached)
  const upcoming = await getUpcomingShows();
  const found = upcoming.find(s => s.id === id);
  if (found) return found;

  // Fall back: wider ±6-month window to cover recently-past shows
  const encodedArtist = encodeURIComponent(ARTIST_NAME);
  const now = new Date();
  const past = new Date(now); past.setMonth(past.getMonth() - 6);
  const future = new Date(now); future.setMonth(future.getMonth() + 6);
  const fmt = (d: Date) => d.toISOString().split('T')[0];

  const res = await fetch(
    `https://rest.bandsintown.com/artists/${encodedArtist}/events?app_id=${APP_ID}&date=${fmt(past)},${fmt(future)}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;

  const data: BandsintownEvent[] = await res.json();
  if (!Array.isArray(data)) return null;
  return data.find(s => s.id === id) ?? null;
}

export function formatShowDate(isoString: string): { day: string; month: string; full: string } {
  const date = new Date(isoString);
  return {
    day: date.toLocaleDateString('en-US', { day: '2-digit' }),
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    full: date.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }),
  };
}
