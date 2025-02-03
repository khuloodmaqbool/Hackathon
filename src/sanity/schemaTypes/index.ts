import { type SchemaTypeDefinition } from 'sanity';
import product from './product';
import blog from './blog';  // Assuming you have a separate file for the blog schema
import category from './category';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, blog , category],  // Add the blog schema to the types array
};
