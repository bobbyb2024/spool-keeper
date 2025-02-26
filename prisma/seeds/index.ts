import { PrismaClient } from '@prisma/client';
import { manufacturers } from './manufacturers';
import { users } from './users';
import { materialTypes } from './materialTypes';

const prisma = new PrismaClient();

async function main() {
  // Seed material types
  for (const materialType of materialTypes) {
    await prisma.materialType.upsert({
      where: { name: materialType.name },
      update: {},
      create: materialType,
    });
  }

  // Seed users
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  // Seed manufacturers
  for (const manufacturer of manufacturers) {
    await prisma.manufacturer.upsert({
      where: { name: manufacturer.name },
      update: {},
      create: manufacturer,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 