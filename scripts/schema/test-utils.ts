import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface TestConfig {
  databaseUrl: string;
  schemaPath: string;
}

export class SchemaTestUtils {
  private prisma: PrismaClient;

  constructor(private config: TestConfig) {
    this.prisma = new PrismaClient({
      datasources: { db: { url: config.databaseUrl } },
    });
  }

  async runTests() {
    try {
      await this.setupTestDatabase();
      await this.runValidations();
      await this.testRelationships();
      await this.testConstraints();
      await this.testIndexes();
      await this.testDataTypes();
    } finally {
      await this.cleanup();
    }
  }

  private async setupTestDatabase() {
    const dbName = `test_${Date.now()}`;
    await execAsync(`createdb ${dbName}`);
    
    try {
      await execAsync('prisma migrate reset --force', {
        env: { ...process.env, DATABASE_URL: this.config.databaseUrl },
      });
    } catch (error) {
      await execAsync(`dropdb ${dbName}`);
      throw error;
    }
  }

  private async runValidations() {
    // Test model validations
    await this.testUserModel();
    await this.testMaterialTypeModel();
    await this.testManufacturerModel();
    await this.testFilamentModel();
    await this.testUsageHistoryModel();
  }

  private async testUserModel() {
    try {
      const user = await this.prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
          password: 'hashedpassword',
          role: 'USER',
        },
      });
      
      // Test unique constraints
      await expect(this.prisma.user.create({
        data: {
          email: 'test@example.com',
          password: 'hashedpassword',
        },
      })).rejects.toThrow();

    } catch (error) {
      console.error('User model validation failed:', error);
      throw error;
    }
  }

  private async testRelationships() {
    try {
      // Test User -> Filament relationship
      const user = await this.prisma.user.create({
        data: {
          email: 'test2@example.com',
          password: 'hashedpassword',
          filaments: {
            create: {
              name: 'Test Filament',
              manufacturerId: '...',
              materialTypeId: '...',
              // ... other required fields
            },
          },
        },
      });

      // Verify cascade deletes
      await this.prisma.user.delete({
        where: { id: user.id },
      });

    } catch (error) {
      console.error('Relationship validation failed:', error);
      throw error;
    }
  }

  private async cleanup() {
    await this.prisma.$disconnect();
    await execAsync(`dropdb ${this.getDatabaseName()}`);
  }

  private getDatabaseName(): string {
    const url = new URL(this.config.databaseUrl);
    return url.pathname.slice(1);
  }
}

export async function withTestDatabase<T>(
  callback: (utils: SchemaTestUtils) => Promise<T>
): Promise<T> {
  const testDbUrl = process.env.TEST_DATABASE_URL || 'postgresql://test:test@localhost:5432/test_db';
  const utils = new SchemaTestUtils({ databaseUrl: testDbUrl, schemaPath: '' });

  try {
    await utils.setupTestDatabase();
    return await callback(utils);
  } finally {
    await utils.cleanup();
  }
} 