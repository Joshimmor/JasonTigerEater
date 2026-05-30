// types/api.ts

// --- Spotify ---

export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  album_type: 'album' | 'single' | 'compilation';
  release_date: string;
  images: SpotifyImage[];
  external_urls: { spotify: string };
  total_tracks: number;
}

export interface SpotifyAlbumsResponse {
  items: SpotifyAlbum[];
  total: number;
  next: string | null;
}

// --- Bandsintown ---

export interface BandsintownOffer {
  type: string;
  url: string;
  status: string;
}

export interface BandsintownVenue {
  name: string;
  city: string;
  region: string;
  country: string;
  latitude: string;
  longitude: string;
}

export interface BandsintownEvent {
  id: string;
  datetime: string; // ISO string
  title: string;
  description?: string;
  venue: BandsintownVenue;
  offers: BandsintownOffer[];
  lineup: string[];
  on_sale_datetime?: string;
}
