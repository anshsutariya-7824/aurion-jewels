export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDiamonds, getDiamondById, saveDiamond, deleteDiamond } from '@/lib/db';

async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return session && session.value === 'aurion-authenticated-session';
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const diamond = await getDiamondById(id);
      if (!diamond) {
        return NextResponse.json({ error: 'Diamond not found' }, { status: 404 });
      }
      return NextResponse.json(diamond);
    }

    const diamonds = await getDiamonds();
    return NextResponse.json(diamonds);
  } catch (error) {
    console.error('API getDiamonds error:', error);
    return NextResponse.json({ error: 'Failed to fetch diamonds' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      id,
      shape,
      carat,
      cut,
      color,
      clarity,
      polish,
      symmetry,
      fluorescence,
      lab,
      certificateNumber,
      price,
      featured,
      active
    } = body;

    if (!shape || !carat || !certificateNumber || !price) {
      return NextResponse.json({ error: 'Missing required diamond fields' }, { status: 400 });
    }

    const saved = await saveDiamond({
      id: id || undefined,
      shape,
      carat: parseFloat(carat),
      cut: cut || 'Excellent',
      color: color || 'D',
      clarity: clarity || 'VVS1',
      polish: polish || 'Excellent',
      symmetry: symmetry || 'Excellent',
      fluorescence: fluorescence || 'None',
      lab: lab || 'GIA',
      certificateNumber,
      price: parseFloat(price),
      featured: featured === true || featured === 'true',
      active: active !== false
    });

    return NextResponse.json({ success: true, diamond: saved });
  } catch (error) {
    console.error('API saveDiamond error:', error);
    return NextResponse.json({ error: 'Failed to save diamond' }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing diamond ID' }, { status: 400 });
    }

    const success = await deleteDiamond(id);
    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Failed to delete diamond' }, { status: 500 });
  } catch (error) {
    console.error('API deleteDiamond error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
