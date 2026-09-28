import {defineField, defineType} from 'sanity'

export const propertyType = defineType({
  name: 'property',
  title: 'Property',
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
      options: {
        source: 'title',
      },
    }),

    defineField({
      name: 'location',
      title: 'Location',
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

    defineField({
      name: 'thumbnailBedrooms',
      title: 'Thumbnail Bedrooms',
      type: 'string',
    }),

    defineField({
      name: 'thumbnailBathrooms',
      title: 'Thumbnail Bathrooms',
      type: 'string',
    }),

    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'topRightImage',
      title: 'Top Right Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'bottomLeftImage',
      title: 'Bottom Left Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'bottomRightImage',
      title: 'Bottom Right Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    // OVERVIEW

    defineField({
      name: 'indoorArea',
      title: 'Indoor Area',
      type: 'string',
    }),

    defineField({
      name: 'floors',
      title: 'Floors',
      type: 'string',
    }),

    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'string',
    }),

    defineField({
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'string',
    }),

    defineField({
      name: 'viewType',
      title: 'View Type',
      type: 'string',
    }),


    // DESCRIPTION

    defineField({
      name: 'descriptionParagraphOne',
      title: 'Description Paragraph One',
      type: 'text',
    }),

    defineField({
      name: 'descriptionParagraphTwo',
      title: 'Description Paragraph Two',
      type: 'text',
    }),

    defineField({
      name: 'descriptionParagraphThree',
      title: 'Description Paragraph Three',
      type: 'text',
    }),


    // FEATURES & AMENITIES

    defineField({
      name: 'features',
      title: 'Features & Amenities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
            }),
          ],
        },
      ],
    }),


    // FLOOR PLAN

    defineField({
      name: 'floorPlanImage',
      title: 'Floor Plan Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'floorPlanFile',
      title: 'Floor Plan File',
      type: 'file',
    }),


    // PROPERTY DETAILS

    defineField({
      name: 'propertyDetails',
      title: 'Property Details',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
            }),
          ],
        },
      ],
    }),

  ],
})