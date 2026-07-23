export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getProducts, getProductById, saveProduct, deleteProduct, saveSettings } from '@/lib/db';

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
      const product = await getProductById(id);
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json(product);
    }

    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('API getProducts error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Check if this is a settings update request to consolidate routes
    if (body.settingsUpdate) {
      const { settings } = body;
      if (!settings) {
        return NextResponse.json({ error: 'Missing settings content' }, { status: 400 });
      }
      const updatedSettings = await saveSettings(settings);
      return NextResponse.json({ success: true, settings: updatedSettings });
    }

    // Standard product save
    const { id, title, category, description, images, moq, alloys, gemstones, packaging, price, active } = body;
    console.log(`[DEBUG] POST /api/products called for id: ${id}. active in body:`, active);

    if (!title || !category || !price) {
      return NextResponse.json({ error: 'Missing required product fields' }, { status: 400 });
    }

    const saved = await saveProduct({
      id: id || undefined,
      title,
      category,
      description: description || '',
      images: images || [],
      moq: parseInt(moq) || 1,
      alloys: alloys || [],
      gemstones: gemstones || '',
      packaging: packaging || '',
      price,
      active: active !== false
    });
    console.log(`[DEBUG] POST /api/products saved. Result active:`, saved.active);

    return NextResponse.json({ success: true, product: saved });
  } catch (error) {
    console.error('API saveProduct error:', error);
    return NextResponse.json({ error: 'Failed to save product' }, { status: 500 });
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
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }

    const success = await deleteProduct(id);
    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  } catch (error) {
    console.error('API deleteProduct error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
