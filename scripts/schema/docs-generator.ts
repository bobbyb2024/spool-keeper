import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { createCanvas } from 'canvas';

interface SchemaDoc {
  models: ModelDoc[];
  enums: EnumDoc[];
  relations: RelationDoc[];
}

interface ModelDoc {
  name: string;
  description: string;
  fields: FieldDoc[];
  indexes: string[];
}

interface FieldDoc {
  name: string;
  type: string;
  required: boolean;
  description: string;
  constraints: string[];
}

interface EnumDoc {
  name: string;
  values: { name: string; description: string }[];
}

interface RelationDoc {
  from: string;
  to: string;
  type: 'oneToOne' | 'oneToMany' | 'manyToMany';
  fields: string[];
}

class SchemaDocGenerator {
  constructor(
    private schemaPath: string,
    private outputDir: string
  ) {}

  async generate() {
    const schema = this.parseSchema();
    await this.generateDocs(schema);
    await this.generateERD(schema);
    await this.generateTypeScript(schema);
  }

  private parseSchema(): SchemaDoc {
    const content = readFileSync(this.schemaPath, 'utf8');
    const schema: SchemaDoc = {
      models: [],
      enums: [],
      relations: [],
    };

    // Parse models
    const modelMatches = content.matchAll(/model\s+(\w+)\s*{([^}]+)}/g);
    for (const match of modelMatches) {
      const [_, name, body] = match;
      const fields = this.parseFields(body);
      const description = this.parseDescription(body);
      const indexes = this.parseIndexes(body);

      schema.models.push({ name, description, fields, indexes });
    }

    // Parse enums
    const enumMatches = content.matchAll(/enum\s+(\w+)\s*{([^}]+)}/g);
    for (const match of enumMatches) {
      const [_, name, body] = match;
      schema.enums.push({
        name,
        values: this.parseEnumValues(body),
      });
    }

    // Parse relations
    schema.relations = this.parseRelations(content);

    return schema;
  }

  private async generateDocs(schema: SchemaDoc) {
    const docs = [
      '# Database Schema Documentation\n',
      '## Models\n',
      ...schema.models.map(model => this.generateModelDoc(model)),
      '\n## Enums\n',
      ...schema.enums.map(enum_ => this.generateEnumDoc(enum_)),
      '\n## Relations\n',
      ...schema.relations.map(relation => this.generateRelationDoc(relation)),
    ].join('\n');

    mkdirSync(this.outputDir, { recursive: true });
    writeFileSync(join(this.outputDir, 'schema.md'), docs);
  }

  private async generateERD(schema: SchemaDoc) {
    // Generate ERD using mermaid-cli
    const mermaidDef = this.generateMermaidDef(schema);
    writeFileSync(join(this.outputDir, 'erd.mmd'), mermaidDef);

    try {
      execSync(`mmdc -i ${join(this.outputDir, 'erd.mmd')} -o ${join(this.outputDir, 'erd.svg')}`);
    } catch (error) {
      console.error('Failed to generate ERD:', error);
    }
  }

  private generateMermaidDef(schema: SchemaDoc): string {
    return `
erDiagram
    ${schema.models.map(model => this.generateMermaidEntity(model)).join('\n    ')}
    ${schema.relations.map(relation => this.generateMermaidRelation(relation)).join('\n    ')}
    `;
  }
}

// Usage
const generator = new SchemaDocGenerator(
  join(process.cwd(), 'prisma/schema.prisma'),
  join(process.cwd(), 'docs/schema')
);

generator.generate().catch(console.error); 