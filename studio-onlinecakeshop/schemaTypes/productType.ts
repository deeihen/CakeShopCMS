import { defineField, defineType } from 'sanity'
import { BasketIcon } from '@sanity/icons'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({ name: 'name', title: 'Cake Name', type: 'string', validation: R => R.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'name' }, validation: R => R.required()
    }),
    defineField({
      name: 'price', title: 'Base Price (₱)', type: 'number',
      validation: R => R.required().positive()
    }),
    defineField({
      name: 'images', title: 'Images', type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: R => R.required().min(1)
    }),
    defineField({
      name: 'category', title: 'Category', type: 'reference',
      to: [{ type: 'category' }], validation: R => R.required()
    }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text', rows: 2 }),
    defineField({
      name: 'description', title: 'Full Description',
      type: 'array', of: [{ type: 'block' }]
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'available', title: 'Available', type: 'boolean', initialValue: true }),
    defineField({
      name: 'sizes', title: 'Available Sizes', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'size', type: 'string', title: 'Size Label (e.g. 6 inches)' },
          { name: 'price', type: 'number', title: 'Price (₱)' },
        ],
        preview: { select: { title: 'size', subtitle: 'price' } }
      }]
    }),
    defineField({
      name: 'ingredients', title: 'Ingredients',
      type: 'array', of: [{ type: 'string' }]
    }),
    defineField({
      name: 'allergens', title: 'Allergens',
      type: 'array', of: [{ type: 'string' }]
    }),
  ],
  preview: {
    select: { title: 'name', media: 'images.0', price: 'price' },
    prepare({ title, media, price }) {
      return { title, subtitle: `₱${price?.toLocaleString()}`, media }
    }
  }
})