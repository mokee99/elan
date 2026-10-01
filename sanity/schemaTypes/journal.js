import {defineField, defineType} from 'sanity'

export const journalType = defineType({
  name: 'journal',
  title: 'Journal',
  type: 'document',

  fields: [
    // BASIC INFORMATION

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
      name: 'date',
      title: 'Date',
      type: 'date',
    }),

    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
    }),

    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),


    // HERO IMAGES

    defineField({
      name: 'heroImage',
      title: 'Hero Image Desktop',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'heroImageTablet',
      title: 'Hero Image Tablet',
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


    // ARTICLE INTRO

    defineField({
      name: 'introHeading',
      title: 'Heading',
      type: 'string',
    }),

    defineField({
      name: 'italicText',
      title: 'Italic Text',
      type: 'text',
    }),

    defineField({
  name: 'introParagraph',
  title: 'Paragraph',
  type: 'text',
}),


    // SECTION ONE

    defineField({
      name: 'sectionOneImage',
      title: 'Section One Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'sectionOneHeading',
      title: 'Section One Heading',
      type: 'string',
    }),

    defineField({
      name: 'sectionOneParagraph',
      title: 'Section One Paragraph',
      type: 'text',
    }),


    // SECTION TWO

    defineField({
      name: 'sectionTwoImage',
      title: 'Section Two Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'sectionTwoHeading',
      title: 'Section Two Heading',
      type: 'string',
    }),

    defineField({
      name: 'sectionTwoParagraph',
      title: 'Section Two Paragraph',
      type: 'text',
    }),


    // QUOTE

    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
    }),
  ],
})