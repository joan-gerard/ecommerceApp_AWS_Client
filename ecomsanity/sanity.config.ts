import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

// const {defineConfig} = require('sanity')
// const {deskTool} = require('sanity/desk')
// const {visionTool} = require('@sanity/vision')

export default defineConfig({
  name: 'default',
  title: 'ecom_sanity',

  projectId: '58nl9cc2',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
