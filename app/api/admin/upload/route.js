import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase Storage
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();
const useSupabase = Boolean(supabaseUrl && supabaseAnonKey);

let supabase = null;
if (useSupabase) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Failed to initialize Supabase client for uploads:', error);
  }
}

// POST: Upload file
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const filename = `${Date.now()}-${safeName}`;

    // 1. If Supabase is configured, upload to Supabase Storage Bucket 'product-images'
    if (useSupabase && supabase) {
      try {
        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(filename, buffer, {
            contentType: file.type,
            upsert: true
          });

        if (error) {
          throw new Error(error.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filename);

        return NextResponse.json({
          success: true,
          url: publicUrlData.publicUrl
        });
      } catch (err) {
        console.error('Supabase upload error, falling back to local storage:', err);
        // Fall back to local storage if Supabase upload fails (e.g. bucket doesn't exist yet)
      }
    }

    // 2. Local Fallback (for local development or if bucket upload fails)
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}` 
    });
  } catch (error) {
    console.error('API upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

// DELETE: Remove file
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'Missing file URL' }, { status: 400 });
    }

    // 1. If it's a Supabase storage URL, delete from Supabase bucket
    if (url.includes('supabase.co/storage/v1/object/public/product-images/')) {
      if (useSupabase && supabase) {
        try {
          const filename = url.split('/product-images/').pop();
          if (filename) {
            await supabase.storage
              .from('product-images')
              .remove([filename]);
          }
          return NextResponse.json({ success: true });
        } catch (err) {
          console.error('Failed to delete file from Supabase storage:', err);
        }
      }
      return NextResponse.json({ success: true }); // Return success anyway
    }

    // 2. Local fallback delete
    if (!url.startsWith('/uploads/')) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    const filename = url.replace('/uploads/', '');
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return NextResponse.json({ error: 'Access denied' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

    try {
      await fs.unlink(filePath);
      return NextResponse.json({ success: true });
    } catch (err) {
      console.warn(`File already deleted or not found: ${filePath}`);
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('API delete file error:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
