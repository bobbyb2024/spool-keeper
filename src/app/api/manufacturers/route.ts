import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/manufacturers
 * @description Retrieves all manufacturers from the database
 * @returns {Promise<Manufacturer[]>} List of manufacturers
 */
export async function GET() {
  try {
    const manufacturers = await prisma.manufacturer.findMany({
      include: {
        filaments: true,
      },
    });
    return NextResponse.json(manufacturers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch manufacturers' }, { status: 500 });
  }
}

/**
 * POST /api/manufacturers
 * @description Creates a new manufacturer
 * @param {Object} request - Request object containing manufacturer data
 * @returns {Promise<Manufacturer>} Created manufacturer object
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const manufacturer = await prisma.manufacturer.create({
      data: {
        name: body.name,
        website: body.website,
        logo: body.logo,
        labelLogo: body.labelLogo,
        tags: body.tags || [],
        comments: body.comments,
      },
    });
    return NextResponse.json(manufacturer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create manufacturer' }, { status: 500 });
  }
} 