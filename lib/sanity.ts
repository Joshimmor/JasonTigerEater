// lib/sanity.ts
// Sanity client — reads credentials from your .env.local
//
// Required env variables:
//   NEXT_PUBLIC_SANITY_PROJECT_ID
//   NEXT_PUBLIC_SANITY_DATASET
//   SANITY_API_TOKEN  (server-side only, never expose to the browser)

import { createClient, type QueryParams } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // set to false if you need always-fresh data (slightly slower)
});

// --- Image URL helper ---
const builder = imageUrlBuilder(client);

export function urlFor(source: Image) {
  return builder.image(source);
}

// --- Typed fetch helper ---
// Usage: const data = await sanityFetch<Bio>(bioQuery)
export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {}
): Promise<T> {
  return client.fetch<T>(query, params);
}
