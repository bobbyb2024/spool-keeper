import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface ModelField {
  name: string;
  type: string;
  description: string;
  required: boolean;
  relations?: string[];
}

interface Model {
  name: string;
  description: string;
  fields: ModelField[];
  indexes: string[];
}

function generateModelDocs(schema: string): Model[] {
  const models: Model[] = [];
  const modelRegex = /model\s+(\w+)\s*{([^}]+)}/g;
  let match;

  while ((match = modelRegex.exec(schema)) !== null) {
    const [_, name, content] = match;
    const fields: ModelField[] = [];
    const lines = content.split('\n');
    
    let description = '';
    const indexes: string[] = [];

    lines.forEach(line => {
      const fieldMatch = line.match(/^\s*(\w+)\s+(\w+)(\[\])?\s*(@\w+)?/);
      const indexMatch = line.match(/@@index\(\[(.*?)\]\)/);
      const descMatch = line.match(/\/\/\/\s*(.*)/);

      if (descMatch && !description) {
        description = descMatch[1];
      } else if (fieldMatch) {
        fields.push({
          name: fieldMatch[1],
          type: fieldMatch[2] + (fieldMatch[3] || ''),
          description: line.includes('//') ? line.split('//')[1].trim() : '',
          required: !line.includes('?'),
        });
      } else if (indexMatch) {
        indexes.push(indexMatch[1]);
      }
    });

    models.push({ name, description, fields, indexes });
  }

  return models;
}

function generateMarkdown(models: Model[]): string {
  return models.map(model => `
# ${model.name}

${model.description}

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
${model.fields.map(field => 
  `| ${field.name} | ${field.type} | ${field.required ? 'Yes' : 'No'} | ${field.description} |`
).join('\n')}

${model.indexes.length ? `
## Indexes

- ${model.indexes.join('\n- ')}
` : ''}
`).join('\n---\n');
}

const schemaPath = join(process.cwd(), 'prisma/schema.prisma');
const schema = readFileSync(schemaPath, 'utf8');
const models = generateModelDocs(schema);
const markdown = generateMarkdown(models);

writeFileSync(join(process.cwd(), 'docs/schema.md'), markdown); 