import {defineField, defineType} from 'sanity'

export const journalType = defineType({
  name: 'journal',
  title: 'Journal',
  type: 'document',

  fields: [
    // BASIC

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),

    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),

    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
    }),

    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
    }),

    // JOURNAL CARD

    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // HERO

    defineField({
      name: 'heroImageDesktop',
      title: 'Hero Image Desktop',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'heroImageMobile',
      title: 'Hero Image Mobile',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // SECTION ONE

    defineField({
      name: 'sectionOneText',
      title: 'Section One Text',
      type: 'text',
    }),

    defineField({
      name: 'sectionOneImage',
      title: 'Section One Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // SECTION TWO

    defineField({
      name: 'sectionTwoText',
      title: 'Section Two Text',
      type: 'text',
    }),

    defineField({
      name: 'sectionTwoImage',
      title: 'Section Two Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // SECTION THREE

    defineField({
      name: 'sectionThreeText',
      title: 'Section Three Text',
      type: 'text',
    }),

    defineField({
      name: 'sectionThreeImage',
      title: 'Section Three Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // QUOTE

    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
    }),
  ],
})