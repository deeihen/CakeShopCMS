import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'OnlineCakeShop',

  // Keep your existing projectId and dataset from sanity.cli.ts
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'wrdqi9es',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.listItem()
              .title('Products / Cakes')
              .schemaType('product')
              .child(S.documentTypeList('product').title('Products / Cakes')),
            S.listItem()
              .title('Categories')
              .schemaType('category')
              .child(S.documentTypeList('category').title('Categories')),
          ])
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
})