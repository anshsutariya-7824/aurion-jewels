import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
  const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();
  const useSupabase = Boolean(supabaseUrl && supabaseAnonKey);

  const results = {
    env: {
      supabaseUrlSet: Boolean(supabaseUrl),
      supabaseUrlValue: supabaseUrl ? `${supabaseUrl.substring(0, 15)}...` : 'not set',
      supabaseAnonKeySet: Boolean(supabaseAnonKey),
      useSupabase
    },
    tables: {}
  };

  if (!useSupabase) {
    return NextResponse.json({
      status: 'WARNING: Using local JSON fallback. File updates are not persistent on serverless hosts like Vercel.',
      results
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Test products table (including a write/delete test to verify RLS permissions)
    const prodCheck = await supabase.from('products').select('id', { count: 'exact', head: true });
    
    let writeError = null;
    try {
      const dummyId = 'test-diagnostics-product-id';
      const upsertTest = await supabase.from('products').upsert({
        id: dummyId,
        title: 'Diagnostics Temp Product',
        category: 'Rings',
        price: 'FOB $0'
      });
      if (upsertTest.error) {
        writeError = `Write failed: ${upsertTest.error.message}`;
      } else {
        // Delete it immediately
        await supabase.from('products').delete().eq('id', dummyId);
      }
    } catch (e) {
      writeError = `Exception during write test: ${e.message}`;
    }

    results.tables.products = {
      success: !prodCheck.error && !writeError,
      readError: prodCheck.error ? prodCheck.error.message : null,
      writeError: writeError,
      count: prodCheck.count
    };

    // Test diamonds table
    const diaCheck = await supabase.from('diamonds').select('id', { count: 'exact', head: true });
    results.tables.diamonds = {
      success: !diaCheck.error,
      error: diaCheck.error ? diaCheck.error.message : null,
      count: diaCheck.count
    };

    // Test inquiries table
    const inqCheck = await supabase.from('inquiries').select('id', { count: 'exact', head: true });
    results.tables.inquiries = {
      success: !inqCheck.error,
      error: inqCheck.error ? inqCheck.error.message : null,
      count: inqCheck.count
    };

    // Test settings table
    const setCheck = await supabase.from('settings').select('id', { count: 'exact', head: true });
    results.tables.settings = {
      success: !setCheck.error,
      error: setCheck.error ? setCheck.error.message : null,
      count: setCheck.count
    };

    const overallSuccess = 
      results.tables.products.success &&
      results.tables.diamonds.success &&
      results.tables.inquiries.success &&
      results.tables.settings.success;

    return NextResponse.json({
      status: overallSuccess ? 'SUCCESS: Supabase connection and schemas verified successfully!' : 'ERROR: Supabase table errors detected.',
      results
    });

  } catch (err) {
    return NextResponse.json({
      status: 'ERROR: Exception occurred during connection test.',
      error: err.message,
      results
    }, { status: 500 });
  }
}
