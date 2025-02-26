import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/filaments
 * @description Retrieves all filaments from the database
 * @returns {Promise<Filament[]>} List of filaments
 */
export async function GET() {
  try {
    const filaments = await prisma.filament.findMany({
      include: {
        usageHistory: true,
      },
    });
    return NextResponse.json(filaments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch filaments' }, { status: 500 });
  }
}

/**
 * POST /api/filaments
 * @description Creates a new filament entry
 * @param {Object} request - Request object containing filament data
 * @returns {Promise<Filament>} Created filament object
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const filament = await prisma.filament.create({
      data: {
        name: body.name,
        brand: body.brand,
        material: body.material,
        color: body.color,
        diameter: body.diameter,
        initialWeight: body.initialWeight,
        currentWeight: body.initialWeight,
        spoolWeight: body.spoolWeight,
        price: body.price,
        location: body.location,
        notes: body.notes,
      },
    });
    return NextResponse.json(filament);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create filament' }, { status: 500 });
  }
}