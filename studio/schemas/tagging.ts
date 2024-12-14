import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'tagging',
  title: 'Tagging',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(50),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      tag: 'tag', 
    },
    prepare(selection) {
      const { tag } = selection;
      return { ...selection, subtitle: tag && `#${tag}` };
    },
  },
});
