import { defineType, defineField, defineArrayMember } from 'sanity';

export  const pressKitType = defineType({
  name: 'pressKit',
  title: 'Press Kit',
  type: 'document',
  fields: [
    // --- Press Bio ---
    defineField({
      name: 'pressBio',
      title: 'Press Bio',
      description:
        'Short, punchy bio written in third person. This is what journalists and promoters copy-paste.',
      type: 'text',
      rows: 6,
      validation: (Rule) =>
        Rule.required().max(600).warning('Press bios should be under 600 characters.'),
    }),

    // --- EPK PDF ---
    defineField({
      name: 'epkPdf',
      title: 'EPK PDF',
      description: 'Downloadable Electronic Press Kit. Upload a PDF — shown as a download button.',
      type: 'file',
      options: { accept: '.pdf' },
    }),

    // --- Logos ---
    defineField({
      name: 'logos',
      title: 'Logos',
      description:
        'Upload PNG with transparent background. Include light and dark versions if possible.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. "White on transparent", "Black on transparent", "Full color"',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'label', media: 'asset' },
          },
        }),
      ],
    }),

    // --- Press Quotes ---
    defineField({
      name: 'pressQuotes',
      title: 'Press Quotes',
      description: 'Reviews, features, or mentions from blogs, magazines, or outlets.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'publication',
              title: 'Publication / Source',
              type: 'string',
              description: 'e.g. "The FADER", "Pigeons & Planes"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Link to Article',
              type: 'url',
            }),
            defineField({
              name: 'year',
              title: 'Year',
              type: 'number',
            }),
          ],
          preview: {
            select: { title: 'publication', subtitle: 'quote' },
          },
        }),
      ],
    }),

    // --- Press Photos ---
    defineField({
      name: 'pressPhotos',
      title: 'Press Photos',
      description:
        'High-res photos available for press use. These will be downloadable on the Press page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'credit',
              title: 'Photo Credit',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'alt', media: 'asset' },
          },
        }),
      ],
    }),

    // --- Tech Rider / Stage Plot ---
    defineField({
      name: 'techRider',
      title: 'Tech Rider',
      description: 'PDF of technical requirements for venues. Optional but useful for booking.',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'stagePlot',
      title: 'Stage Plot',
      description: 'PDF or image showing stage layout.',
      type: 'file',
      options: { accept: '.pdf,.png,.jpg' },
    }),

    // --- Streaming Stats ---
    defineField({
      name: 'streamingStats',
      title: 'Streaming Stats',
      description: 'Key numbers to impress promoters. Update these periodically.',
      type: 'object',
      fields: [
        defineField({ name: 'monthlyListeners', title: 'Spotify Monthly Listeners', type: 'number' }),
        defineField({ name: 'totalStreams', title: 'Total Streams', type: 'number' }),
        defineField({ name: 'instagramFollowers', title: 'Instagram Followers', type: 'number' }),
        defineField({ name: 'tiktokFollowers', title: 'TikTok Followers', type: 'number' }),
        defineField({ name: 'statsAsOf', title: 'Stats as of (date)', type: 'date' }),
      ],
    }),

    // --- Booking Contact ---
    defineField({
      name: 'bookingContact',
      title: 'Booking Contact',
      description: 'Displayed on the Press page for industry contacts.',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Contact Name', type: 'string' }),
        defineField({ name: 'email', title: 'Booking Email', type: 'string' }),
        defineField({ name: 'phone', title: 'Phone (optional)', type: 'string' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Press Kit' };
    },
  },
});
