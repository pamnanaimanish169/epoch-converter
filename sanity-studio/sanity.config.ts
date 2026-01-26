import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Epoch Converter Freebies',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || '9bvn6eic',
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || 'production',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
});