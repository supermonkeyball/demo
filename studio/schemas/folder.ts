import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'folder',
  title: 'Folder',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Folder Title',
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
      name: 'myTags',
      title: 'Tags',
      type: 'tags',
      validation: (Rule) => Rule.required(),
      options: {
        onCreate: (value) => ({
          label: value,
          value: value.toLowerCase().replace(/\W/g, '-'),
        }),
      },
    }),
  ],
})
