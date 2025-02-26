import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';

const execAsync = promisify(exec);

async function validateSchema() {
  try {
    const { stdout, stderr } = await execAsync('prisma validate');
    
    if (stderr) {
      console.error('Schema validation failed:', stderr);
      process.exit(1);
    }
    
    console.log('Schema validation successful:', stdout);
  } catch (error) {
    console.error('Error validating schema:', error);
    process.exit(1);
  }
}

validateSchema(); 