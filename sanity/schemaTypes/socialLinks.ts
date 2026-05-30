import { defineType, defineField } from 'sanity';

export const socialLinksType = defineType({
  name: 'socialLinks',
  title: 'Social Links',
  type: 'document',
  fields: [
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      description: 'Full URL e.g. https://instagram.com/jasontigereater',
      validation: (Rule) =>
        Rule.uri({ scheme: ['https'] }).warning('Must be a valid https URL.'),
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok',
      type: 'url',
      description: 'Full URL e.g. https://tiktok.com/@jasontigereater',
      validation: (Rule) =>
        Rule.uri({ scheme: ['https'] }).warning('Must be a valid https URL.'),
    }),
    defineField({
      name: 'spotify',
      title: 'Spotify Artist Page',
      type: 'url',
      description: 'Full URL e.g. https://open.spotify.com/artist/...',
      validation: (Rule) =>
        Rule.uri({ scheme: ['https'] }).warning('Must be a valid https URL.'),
    }),
    defineField({
      name: 'appleMusic',
      title: 'Apple Music',
      type: 'url',
      description: 'Full URL e.g. https://music.apple.com/us/artist/...',
      validation: (Rule) =>
        Rule.uri({ scheme: ['https'] }).warning('Must be a valid https URL.'),
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube',
      type: 'url',
      description: 'Optional. Full channel URL.',
    }),
    defineField({
      name: 'bandcamp',
      title: 'Bandcamp',
      type: 'url',
      description: 'Optional. Full URL to Bandcamp store.',
    }),
    defineField({
      name: 'shopify',
      title: 'Merch Store (Shopify)',
      type: 'url',
      description: 'Optional. Full URL to Shopify store.',
    }),
    defineField({
      name: 'bookingEmail',
      title: 'Booking Email',
      type: 'string',
      description: 'The email address that receives booking inquiries from the contact form.',
      validation: (Rule) =>
        Rule.required().email().error('Must be a valid email address.'),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Social Links & Contact' };
    },
  },
});
