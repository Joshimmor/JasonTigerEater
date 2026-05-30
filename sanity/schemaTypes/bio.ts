import { defineType, defineField, defineArrayMember } from 'sanity';

export  const bioType = defineType({
  name: 'bio',
  title: 'Bio',
  type: 'document',
  fields: [
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      description: 'One paragraph. Used on the homepage, press kit, and social previews.',
      type: 'text',
      rows: 4,
      validation: (Rule) =>
        Rule.required().max(300).warning('Keep this under 300 characters for best results.'),
    }),
    defineField({
      name: 'longBio',
      title: 'Full Bio',
      description: 'The full band story. Used on the About page.',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pullQuote',
      title: 'Pull Quote',
      description: "A bold one-liner that captures the band's essence. Displayed large on the About page.",
      type: 'string',
      validation: (Rule) =>
        Rule.max(120).warning('Keep this punchy — under 120 characters.'),
    }),
    defineField({
      name: 'bandPhotos',
      title: 'Band Photos',
      description: 'High-res photos. First photo is used as the hero image.',
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
              description: 'Describe the photo for accessibility.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
            defineField({
              name: 'credit',
              title: 'Photo Credit',
              type: 'string',
              description: 'Photographer name if applicable.',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1).error('Upload at least one band photo.'),
    }),
    defineField({
      name: 'members',
      title: 'Band Members',
      description: 'Optional. Displayed on the About page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              description: 'e.g. Vocals, Producer, Guitar',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'role', media: 'photo' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'shortBio', media: 'bandPhotos.0' },
    prepare({ title, media }: { title: string; media: any }) {
      return { title: 'Bio', subtitle: title, media };
    },
  },
});
