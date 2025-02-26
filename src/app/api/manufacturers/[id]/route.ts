import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/manufacturers/[id]
 * @description Retrieves a specific manufacturer by ID
 * @param {Object} params - Route parameters containing manufacturer ID
 * @returns {Promise<Manufacturer>} Manufacturer object
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const manufacturer = await prisma.manufacturer.findUnique({
      where: { id: params.id },
      include: { filaments: true },
    });
    
    if (!manufacturer) {
      return NextResponse.json({ error: 'Manufacturer not found' }, { status: 404 });
    }
    
    return NextResponse.json(manufacturer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch manufacturer' }, { status: 500 });
  }
}

/**
 * PUT /api/manufacturers/[id]
 * @description Updates a specific manufacturer
 * @param {Object} request - Request object containing updated manufacturer data
 * @param {Object} params - Route parameters containing manufacturer ID
 * @returns {Promise<Manufacturer>} Updated manufacturer object
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const manufacturer = await prisma.manufacturer.update({
      where: { id: params.id },
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
    return NextResponse.json({ error: 'Failed to update manufacturer' }, { status: 500 });
  }
}

/**
 * DELETE /api/manufacturers/[id]
 * @description Deletes a specific manufacturer
 * @param {Object} params - Route parameters containing manufacturer ID
 * @returns {Promise<void>}
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.manufacturer.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Manufacturer deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete manufacturer' }, { status: 500 });
  }
} 