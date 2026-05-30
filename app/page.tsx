import HeroSection from '@/components/HeroSection';
import MusicSection from '@/components/MusicSection';
import ShowsSection from '@/components/ShowsSection';
import { getArtistReleases } from '@/lib/spotify';
import { getUpcomingShows } from '@/lib/bandsintown';
import { sanityFetch } from '@/lib/sanity';
import { homepageQuery } from '@/lib/queries';
import { HomepageData } from '@/sanity/lib/types';

export const revalidate = 3600; // ISR — rebuild page every hour

export default async function HomePage() {
  const [releases, shows, cms] = await Promise.all([
    getArtistReleases(),
    getUpcomingShows(),
    sanityFetch<HomepageData>(homepageQuery),
  ]);

  const heroPhoto = cms?.bio?.bandPhotos?.[0]?.asset?.url;
  const spotifyArtistId = process.env.SPOTIFY_ARTIST_ID!;

  return (
    <main>
      <HeroSection photoUrl={heroPhoto} />
      <MusicSection releases={releases} spotifyArtistId={spotifyArtistId} />
      <ShowsSection shows={shows} />
    </main>
  );
}