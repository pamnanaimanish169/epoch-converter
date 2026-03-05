import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'table',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'rows',
      title: 'Table Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tableRow',
          title: 'Table Row',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isHeader',
              title: 'Is Header Row?',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              cells: 'cells',
              isHeader: 'isHeader',
            },
            prepare({ cells, isHeader }) {
              return {
                title: isHeader ? 'Header' : 'Row',
                subtitle: cells?.join(' | ') || 'Empty row',
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      rows: 'rows',
    },
    prepare({ rows }) {
      const rowCount = rows?.length || 0;
      const colCount = rows?.[0]?.cells?.length || 0;
      return {
        title: 'Table',
        subtitle: `${rowCount} row${rowCount !== 1 ? 's' : ''}, ${colCount} column${colCount !== 1 ? 's' : ''}`,
      };
    },
  },
});







