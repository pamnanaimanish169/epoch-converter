import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'downloadLog',
  title: 'Download Log',
  type: 'document',
  fields: [
    defineField({
      name: 'freebie',
      title: 'Freebie',
      type: 'reference',
      to: [{ type: 'freebie' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'downloadedAt',
      title: 'Downloaded At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'downloadSource',
      title: 'Download Source',
      type: 'string',
      options: {
        list: [
          { title: 'Email Link', value: 'email' },
          { title: 'Direct Page', value: 'direct' },
          { title: 'Download Page', value: 'page' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      description: 'Browser user agent string',
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      description: 'IP address of the downloader (for analytics)',
    }),
  ],
  preview: {
    select: {
      email: 'email',
      freebieTitle: 'freebie.title',
      downloadedAt: 'downloadedAt',
      source: 'downloadSource',
    },
    prepare({ email, freebieTitle, downloadedAt, source }) {
      return {
        title: email || 'Unknown',
        subtitle: `${freebieTitle || 'Unknown Freebie'} - ${source || 'unknown'} - ${downloadedAt ? new Date(downloadedAt).toLocaleDateString() : ''}`,
      };
    },
  },
  orderings: [
    {
      title: 'Downloaded At (Newest)',
      name: 'downloadedAtDesc',
      by: [{ field: 'downloadedAt', direction: 'desc' }],
    },
    {
      title: 'Downloaded At (Oldest)',
      name: 'downloadedAtAsc',
      by: [{ field: 'downloadedAt', direction: 'asc' }],
    },
  ],
});

