import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';

const execAsync = promisify(exec);

interface MigrationValidation {
  type: 'error' | 'warning';
  message: string;
  details?: string;
}

async function validateMigration(schemaPath: string): Promise<MigrationValidation[]> {
  const validations: MigrationValidation[] = [];
  
  try {
    // Check for destructive changes
    const { stdout: diffOutput } = await execAsync(
      `prisma migrate diff --from-schema-datamodel ${schemaPath} --to-schema-datamodel ${schemaPath}.new --exit-code`
    );

    // Analyze migration impact
    if (diffOutput.includes('DROP TABLE') || diffOutput.includes('DROP COLUMN')) {
      validations.push({
        type: 'error',
        message: 'Destructive changes detected',
        details: 'Migration contains operations that could result in data loss',
      });
    }

    // Check for missing indexes on relations
    const { stdout: pushOutput } = await execAsync('prisma db push --preview-feature');
    if (pushOutput.includes('foreign key constraint')) {
      validations.push({
        type: 'warning',
        message: 'Missing indexes on foreign keys',
        details: 'Consider adding indexes to improve query performance',
      });
    }

    // Validate model dependencies
    const modelDeps = await analyzeModelDependencies(schemaPath);
    if (modelDeps.circular.length > 0) {
      validations.push({
        type: 'warning',
        message: 'Circular dependencies detected',
        details: `Models involved: ${modelDeps.circular.join(', ')}`,
      });
    }

  } catch (error: any) {
    validations.push({
      type: 'error',
      message: 'Migration validation failed',
      details: error.message,
    });
  }

  return validations;
}

async function analyzeModelDependencies(schemaPath: string) {
  // Implementation for analyzing model relationships
  return {
    circular: [] as string[],
    // Add other dependency analysis results
  };
}

export async function runMigrationValidation() {
  const schemaPath = join(process.cwd(), 'prisma/schema/base.prisma');
  const validations = await validateMigration(schemaPath);

  console.log('\nMigration Validation Results:');
  validations.forEach(v => {
    console.log(`[${v.type.toUpperCase()}] ${v.message}`);
    if (v.details) console.log(`  Details: ${v.details}`);
  });

  if (validations.some(v => v.type === 'error')) {
    process.exit(1);
  }
}

if (require.main === module) {
  runMigrationValidation();
} 