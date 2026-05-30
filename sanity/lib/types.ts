import { PortableTextBlock, Image } from 'sanity';

// --- Shared ---

export interface SanityImage extends Image {
  asset: { url: string };
  alt: string;
  caption?: string;
  credit?: string;
}

export interface SanityFile {
  asset: { url: string };
}

// --- Bio ---

export interface BandMember {
  name: string;
  role: string;
  photo?: SanityImage;
}

export interface Bio {
  shortBio: string;
  longBio: PortableTextBlock[];
  pullQuote?: string;
  bandPhotos: SanityImage[];
  members?: BandMember[];
}

// --- About ---

export interface About {
  originStory: PortableTextBlock[];
  influences?: string[];
  soundDescription?: string;
  city: string;
  yearFormed?: number;
  liveShowDescription?: string;
  featuredImage?: SanityImage;
}

// --- Press Kit ---

export interface PressQuote {
  quote: string;
  publication: string;
  url?: string;
  year?: number;
}

export interface StreamingStats {
  monthlyListeners?: number;
  totalStreams?: number;
  instagramFollowers?: number;
  tiktokFollowers?: number;
  statsAsOf?: string; // ISO date string
}

export interface BookingContact {
  name?: string;
  email?: string;
  phone?: string;
}

export interface PressLogo extends SanityImage {
  label: string;
}

export interface PressKit {
  pressBio: string;
  epkPdf?: SanityFile;
  logos?: PressLogo[];
  pressQuotes?: PressQuote[];
  pressPhotos?: SanityImage[];
  techRider?: SanityFile;
  stagePlot?: SanityFile;
  streamingStats?: StreamingStats;
  bookingContact?: BookingContact;
}

// --- Social Links ---

export interface SocialLinks {
  instagram?: string;
  tiktok?: string;
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
  bandcamp?: string;
  shopify?: string;
  bookingEmail: string;
}

// --- Homepage combined query result ---

export interface HomepageData {
  bio: Pick<Bio, 'shortBio' | 'pullQuote'> & {
    bandPhotos: [SanityImage] | [];
  };
  social: Pick<SocialLinks, 'instagram' | 'tiktok' | 'spotify' | 'appleMusic' | 'bookingEmail'>;
}
