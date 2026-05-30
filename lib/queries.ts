// lib/queries.ts
// GROQ queries for fetching content from Sanity.
// Import alongside the typed fetch helper from sanity.ts.

export const bioQuery = `*[_type == "bio"][0] {
  shortBio,
  longBio,
  pullQuote,
  bandPhotos[] {
    asset->{ url },
    alt,
    caption,
    credit
  },
  members[] {
    name,
    role,
    photo { asset->{ url } }
  }
}` as const;

export const aboutQuery = `*[_type == "about"][0] {
  originStory,
  influences,
  soundDescription,
  city,
  yearFormed,
  liveShowDescription,
  featuredImage {
    asset->{ url },
    alt
  }
}` as const;

export const pressKitQuery = `*[_type == "pressKit"][0] {
  pressBio,
  epkPdf { asset->{ url } },
  logos[] {
    asset->{ url },
    label
  },
  pressQuotes[] {
    quote,
    publication,
    url,
    year
  },
  pressPhotos[] {
    asset->{ url },
    alt,
    credit
  },
  techRider { asset->{ url } },
  stagePlot { asset->{ url } },
  streamingStats {
    monthlyListeners,
    totalStreams,
    instagramFollowers,
    tiktokFollowers,
    statsAsOf
  },
  bookingContact {
    name,
    email,
    phone
  }
}` as const;

export const socialLinksQuery = `*[_type == "socialLinks"][0] {
  instagram,
  tiktok,
  spotify,
  appleMusic,
  youtube,
  bandcamp,
  shopify,
  bookingEmail
}` as const;

export const homepageQuery = `{
  "bio": *[_type == "bio"][0] {
    shortBio,
    pullQuote,
    "bandPhotos": bandPhotos[0..0] { asset->{ url }, alt }
  },
  "social": *[_type == "socialLinks"][0] {
    instagram, tiktok, spotify, appleMusic, bookingEmail
  }
}` as const;
