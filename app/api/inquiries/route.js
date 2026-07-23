export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getInquiries, saveInquiry, deleteInquiry, getSettings } from '@/lib/db';

// Helper to check authentication
async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return session && session.value === 'aurion-authenticated-session';
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  // Handle public query for website settings (e.g., for WhatsApp float, address, etc.)
  if (type === 'settings') {
    const settings = await getSettings();
    return NextResponse.json(settings);
  }

  // Admin access check for viewing customer inquiries
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const inquiries = await getInquiries();
  return NextResponse.json(inquiries);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, type, itemId, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newInquiry = await saveInquiry({
      name,
      email,
      phone: phone || '',
      type: type || 'general',
      itemId: itemId || '',
      message,
      status: 'pending' // Default status
    });

    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (error) {
    console.error('Save inquiry error:', error);
    return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing inquiry ID' }, { status: 400 });
  }

  const success = await deleteInquiry(id);
  if (success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
