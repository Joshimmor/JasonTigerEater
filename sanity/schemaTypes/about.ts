import { defineType, defineField, defineArrayMember } from 'sanity';

export  const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'originStory',
      title: 'Origin Story',
      description:
        'How did the band come together? Where are they from? Used as the opening section of the About page.',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'influences',
      title: 'Influences',
      description: 'Artists, sounds, or movements that shape the music. Displayed as tags.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'soundDescription',
      title: 'Sound Description',
      description:
        'How would you describe the sound in your own words? e.g. "Raw Atlanta street rap meets lo-fi indie texture."',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'city',
      title: 'Hometown / City',
      type: 'string',
      description: 'e.g. Atlanta, GA',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'yearFormed',
      title: 'Year Formed',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'liveShowDescription',
      title: 'Live Show Description',
      description: "What's the live experience like? Used on the Booking page to sell promoters.",
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured About Page Image',
      description: 'Main image displayed on the About page. Choose something atmospheric.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: { media: 'featuredImage', subtitle: 'city' },
    prepare({ media, subtitle }: { media: any; subtitle: string }) {
      return { title: 'About', subtitle, media };
    },
  },
});
