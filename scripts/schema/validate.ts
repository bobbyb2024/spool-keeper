import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';
import { readdir, readFile } from 'fs/promises';
import { schemaRules } from './rules';

const execAsync = promisify(exec);

interface SchemaValidationError {
  file: string;
  line: number;
  message: string;
  type?: string;
  severity?: string;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

async function validateSchema(): Promise<ValidationResult> {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: []
  };

  try {
    // Run Prisma validation
    await execAsync('prisma validate');

    // Check model naming conventions
    const modelCheck = await checkModelNaming();
    result.warnings.push(...modelCheck.warnings);
    result.errors.push(...modelCheck.errors);

    // Check field types and constraints
    const fieldCheck = await checkFieldConstraints();
    result.warnings.push(...fieldCheck.warnings);
    result.errors.push(...fieldCheck.errors);

    // Validate relationships
    const relationCheck = await checkRelationships();
    result.warnings.push(...relationCheck.warnings);
    result.errors.push(...relationCheck.errors);

    result.valid = result.errors.length === 0;
  } catch (error: any) {
    result.valid = false;
    result.errors.push(error.message);
  }

  return result;
}

async function checkModelNaming(): Promise<{ warnings: string[]; errors: string[] }> {
  // Implementation
  return { warnings: [], errors: [] };
}

async function checkFieldConstraints(): Promise<{ warnings: string[]; errors: string[] }> {
  // Implementation
  return { warnings: [], errors: [] };
}

async function checkRelationships(): Promise<{ warnings: string[]; errors: string[] }> {
  // Implementation
  return { warnings: [], errors: [] };
}

async function validateSchemaFiles() {
  const errors: SchemaValidationError[] = [];
  const schemaDir = join(process.cwd(), 'prisma/schema');

  // Custom validations
  await validateDirectory(schemaDir, errors);

  if (errors.length > 0) {
    console.error('Schema validation errors:');
    errors.forEach(error => {
      console.error(`${error.file}:${error.line} - ${error.message}`);
    });
    process.exit(1);
  }

  console.log('Schema validation successful!');
}

async function validateDirectory(dir: string, errors: SchemaValidationError[]) {
  const files = await readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const path = join(dir, file.name);
    
    if (file.isDirectory()) {
      await validateDirectory(path, errors);
      continue;
    }

    if (!file.name.endsWith('.prisma')) continue;

    const content = await readFile(path, 'utf-8');
    await validateSchemaFile(path, content, errors);
  }
}

async function validateSchemaFile(path: string, content: string, errors: SchemaValidationError[]) {
  const lines = content.split('\n');
  
  // Check for documentation
  if (!content.includes('/// @description')) {
    errors.push({
      file: path,
      line: 1,
      message: 'Missing @description documentation',
    });
  }

  // Check for proper model naming
  const modelMatch = content.match(/model\s+(\w+)/);
  if (modelMatch) {
    const modelName = modelMatch[1];
    if (!modelName.match(/^[A-Z][a-zA-Z]+$/)) {
      errors.push({
        file: path,
        line: modelMatch.index || 1,
        message: 'Model names should be PascalCase',
      });
    }
  }

  // Check for indexes on foreign keys
  const relationLines = lines.filter(line => line.includes('@relation'));
  relationLines.forEach((line, index) => {
    const fieldName = line.match(/fields:\s*\[(.*?)\]/)?.[1];
    if (fieldName && !content.includes(`@@index([${fieldName}])`)) {
      errors.push({
        file: path,
        line: index + 1,
        message: `Missing index for relation field: ${fieldName}`,
      });
    }
  });

  // Validate field naming
  const fieldLines = lines.filter(line => /^\s+\w+\s+\w+/.test(line));
  fieldLines.forEach(line => {
    const fieldName = line.match(/^\s+(\w+)/)?.[1];
    if (fieldName) {
      const fieldErrors = validateField(fieldName, schemaRules);
      errors.push(...fieldErrors.map(err => ({
        ...err,
        file: path,
        line: lines.indexOf(line) + 1,
      })));
    }
  });
}

function validateField(field: string, rules: typeof schemaRules): SchemaValidationError[] {
  const errors: SchemaValidationError[] = [];
  
  if (!rules.naming.fields.test(field)) {
    errors.push({
      message: `Field name "${field}" should be camelCase`,
      type: 'naming',
      severity: 'error',
    });
  }

  if (field.length > rules.fields.maxLength) {
    errors.push({
      message: `Field name "${field}" exceeds maximum length of ${rules.fields.maxLength}`,
      type: 'naming',
      severity: 'warning',
    });
  }

  return errors;
}

validateSchema().then(result => {
  console.log('Schema Validation Results:');
  if (result.warnings.length > 0) {
    console.log('\nWarnings:');
    result.warnings.forEach(w => console.log(`- ${w}`));
  }
  if (result.errors.length > 0) {
    console.log('\nErrors:');
    result.errors.forEach(e => console.log(`- ${e}`));
    process.exit(1);
  }
  console.log('Schema validation passed!');
}); 