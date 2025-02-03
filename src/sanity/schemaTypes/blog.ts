import { SchemaTypeDefinition } from 'sanity';


const blog: SchemaTypeDefinition = {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'img',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
    {
      name: 'date',
      type: 'date',
      title: 'Date'
    },
    {
      name: 'category',
      type: 'reference',
      title: 'Category',
      to: [{ type: 'category' }]  // Reference to the 'category' schema
    },
    {
      name: 'post',
      type: 'string',
      title: 'Post Author'
    }
  ]
};

export default blog;
