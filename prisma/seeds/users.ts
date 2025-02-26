import { hash } from 'bcryptjs';

export const users = [
  {
    email: 'admin@spoolkeeper.com',
    name: 'Admin User',
    password: await hash('admin123', 12),
    role: 'ADMIN',
  },
  // Add more users...
]; 