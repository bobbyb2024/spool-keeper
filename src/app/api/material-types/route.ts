import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const materialTypes = await prisma.materialType.findMany({
      include: {
        _count: {
          select: { filaments: true },
        },
      },
    });
    return NextResponse.json(materialTypes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch material types' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const materialType = await prisma.materialType.create({
      data: {
        name: body.name,
        description: body.description,
        properties: body.properties,
      },
    });
    return NextResponse.json(materialType);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create material type' }, { status: 500 });
  }
} 