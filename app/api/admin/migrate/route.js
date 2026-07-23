import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
  const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();
  const useSupabase = Boolean(supabaseUrl && supabaseAnonKey);

  if (!useSupabase) {
    return NextResponse.json({ error: 'Supabase credentials are not configured.' }, { status: 400 });
  }

  const results = {
    products: { attempted: 0, successful: 0, error: null },
    diamonds: { attempted: 0, successful: 0, error: null },
    settings: { attempted: false, successful: false, error: null }
  };

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // 1. Migrate Products
    try {
      const prodPath = path.join(process.cwd(), 'data', 'products.json');
      const prodData = JSON.parse(await fs.readFile(prodPath, 'utf-8'));
      results.products.attempted = prodData.length;

      for (const prod of prodData) {
        // Ensure active is set
        if (prod.active === undefined) prod.active = true;
        
        const { error } = await supabase.from('products').upsert(prod);
        if (!error) {
          results.products.successful++;
        } else {
          results.products.error = error.message;
        }
      }
    } catch (err) {
      results.products.error = `File/DB error: ${err.message}`;
    }

    // 2. Migrate Diamonds
    try {
      const diaPath = path.join(process.cwd(), 'data', 'diamonds.json');
      const diaData = JSON.parse(await fs.readFile(diaPath, 'utf-8'));
      results.diamonds.attempted = diaData.length;

      for (const dia of diaData) {
        // Ensure active is set
        if (dia.active === undefined) dia.active = true;

        const { error } = await supabase.from('diamonds').upsert(dia);
        if (!error) {
          results.diamonds.successful++;
        } else {
          results.diamonds.error = error.message;
        }
      }
    } catch (err) {
      results.diamonds.error = `File/DB error: ${err.message}`;
    }

    // 3. Migrate Settings
    try {
      const setPath = path.join(process.cwd(), 'data', 'settings.json');
      const setData = JSON.parse(await fs.readFile(setPath, 'utf-8'));
      results.settings.attempted = true;

      const { error } = await supabase.from('settings').upsert({ id: 1, ...setData });
      if (!error) {
        results.settings.successful = true;
      } else {
        results.settings.error = error.message;
      }
    } catch (err) {
      results.settings.error = `File/DB error: ${err.message}`;
    }

    return NextResponse.json({
      status: 'Migration run completed.',
      results
    });

  } catch (globalErr) {
    return NextResponse.json({
      error: `Global migration exception: ${globalErr.message}`
    }, { status: 500 });
  }
}
