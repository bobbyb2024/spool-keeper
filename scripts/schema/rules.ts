export const schemaRules = {
  naming: {
    models: /^[A-Z][a-zA-Z]+$/,
    fields: /^[a-z][a-zA-Z]+$/,
    enums: /^[A-Z][A-Z_]+$/,
  },
  documentation: {
    required: ['@description'],
    recommended: ['@example', '@see'],
  },
  relationships: {
    requireIndex: true,
    requireOnDelete: true,
  },
  fields: {
    maxLength: 50,
    requireDescription: true,
  },
}; 