import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const SCHEMA_DIR = join(__dirname, '../prisma/schema');
const OUTPUT_FILE = join(__dirname, '../prisma/schema.prisma');

// Base schema content
const baseSchema = readFileSync(join(SCHEMA_DIR, 'base.prisma'), 'utf8');

// Read all model files
const modelFiles = [
  'User.prisma',
  'MaterialType.prisma',
  'Manufacturer.prisma',
  'Filament.prisma',
  'UsageHistory.prisma',
];

const modelContents = modelFiles.map(file => 
  readFileSync(join(SCHEMA_DIR, 'models', file), 'utf8')
);

// Combine all content
const fullSchema = [
  baseSchema,
  ...modelContents,
].join('\n\n');

// Write the combined schema
writeFileSync(OUTPUT_FILE, fullSchema); 