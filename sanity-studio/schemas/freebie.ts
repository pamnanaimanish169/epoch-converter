import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'freebie',
  title: 'Freebie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Typography', value: 'Typography' },
          { title: 'Development', value: 'Development' },
          { title: 'Icons', value: 'Icons' },
          { title: 'Design', value: 'Design' },
          { title: 'Templates', value: 'Templates' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'downloadCount',
      title: 'Download Count',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'downloadFile',
      title: 'Download File',
      type: 'file',
      description: 'Upload the file that users will download (PDF, ZIP, etc.)',
      options: {
        accept: '.pdf,.zip,.rar,.7z,.doc,.docx,.xls,.xlsx,.csv,.json,.txt',
      },
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Download URL (Alternative)',
      type: 'url',
      description: 'Alternatively, provide a direct download URL (e.g., Google Drive, Dropbox). If both are provided, the file takes precedence.',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'relatedFreebies',
      title: 'Related Freebies',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'freebie' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      category: 'category',
    },
    prepare({ title, media, category }) {
      return {
        title,
        media,
        subtitle: category,
      };
    },
  },
});