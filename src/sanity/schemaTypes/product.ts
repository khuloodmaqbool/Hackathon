import { Rule } from 'sanity';

const productSchema = {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Product Name',
      validation: (Rule: Rule) =>
        Rule.required().error('Product name is required'),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule: Rule) =>
        Rule.required().min(10).error('Description must be at least 10 characters'),
    },
    {
      name: 'price',
      type: 'number',
      title: 'Product Price',
      validation: (Rule: Rule) =>
        Rule.required().min(0).error('Price must be a positive number'),
    },
    {
      name: 'discountPercentage',
      type: 'number',
      title: 'Discount Percentage',
      validation: (Rule: Rule) =>
        Rule.min(0).max(100).error('Discount percentage must be between 0 and 100'),
    },
    {
      name: 'priceWithoutDiscount',
      type: 'number',
      title: 'Price Without Discount',
      description: 'Original price before discount',
      validation: (Rule: Rule) =>
        Rule.min(0).error('Price must be a positive number'),
    },
    {
      name: 'stock',
      type: 'number',
      title: 'Stock Quantity',
      description: 'Available stock for the product',
      validation: (Rule: Rule) =>
        Rule.min(0).error('Stock quantity must be a positive number'),
    },
    {
      name: 'weight',
      type: 'number',
      title: 'Weight',
      description: 'Weight of the product in kilograms',
      validation: (Rule: Rule) =>
        Rule.min(0).error('Weight must be a positive number'),
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating',
      description: 'Average rating of the product (0 to 5)',
      validation: (Rule: Rule) =>
        Rule.min(0).max(5).error('Rating must be between 0 and 5'),
    },
    {
      name: 'ratingCount',
      type: 'number',
      title: 'Rating Count',
      description: 'Number of ratings',
      validation: (Rule: Rule) =>
        Rule.min(0).error('Rating count must be a non-negative number'),
    },
    {
      name: 'offer',
      type: 'string',
      title: 'Offer',
      description: 'Special offer description, e.g., 50% off',
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Add tags like "new arrival", "bestseller", etc.',
    },
    {
      name: 'sizes',
      type: 'array',
      title: 'Sizes',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Add sizes like S, M, L, XL, XXL',
    },
    {
      name: 'colors',
      type: 'array',
      title: 'Colors',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Available colors for the product',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Product Images',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      description: 'Upload multiple images for the product',
    },
    {
      name: 'reviews',
      type: 'array',
      title: 'Product Reviews',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'reviewer',
              type: 'string',
              title: 'Reviewer',
              validation: (Rule: Rule) =>
                Rule.required().error('Reviewer name is required'),
            },
            {
              name: 'comment',
              type: 'text',
              title: 'Comment',
              validation: (Rule: Rule) =>
                Rule.required().min(5).error('Comment must be at least 5 characters'),
            },
            {
              name: 'rating',
              type: 'number',
              title: 'Rating',
              validation: (Rule: Rule) =>
                Rule.min(0).max(5).error('Rating must be between 0 and 5'),
            },
          ],
        },
      ],
      description: 'Customer reviews and ratings',
    },
  ],
};

export default productSchema;
