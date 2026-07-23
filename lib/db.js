import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

// Determine if we should use Supabase or local JSON files
const useSupabase = Boolean(supabaseUrl && supabaseAnonKey);

let supabase = null;
if (useSupabase) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Database initialized: Using Supabase.');
  } catch (error) {
    console.error('Failed to initialize Supabase. Falling back to local JSON.', error);
  }
} else {
  console.log('Database initialized: Using local JSON files.');
}

// Local JSON File Helper Functions
const getFilePath = (fileName) => path.join(process.cwd(), 'data', fileName);

async function readJson(fileName) {
  try {
    const filePath = getFilePath(fileName);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return [];
  }
}

async function writeJson(fileName, data) {
  try {
    const filePath = getFilePath(fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing ${fileName}:`, error);
    return false;
  }
}

// ==========================================
// PRODUCTS CRUD OPERATIONS
// ==========================================

export async function getProducts() {
  if (useSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });
      if (!error) return data;
      console.error('Supabase getProducts error, falling back:', error);
    } catch (err) {
      console.error('Supabase getProducts exception, falling back:', err);
    }
  }
  return await readJson('products.json');
}

export async function getProductById(id) {
  if (useSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      if (!error) return data;
      console.error(`Supabase getProductById error (${id}), falling back:`, error);
    } catch (err) {
      console.error(`Supabase getProductById exception (${id}), falling back:`, err);
    }
  }
  const products = await readJson('products.json');
  return products.find((p) => p.id === id) || null;
}

export async function saveProduct(product) {
  if (useSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .upsert(product)
        .select();
      if (!error && data && data.length > 0) return data[0];
      console.error('Supabase saveProduct error, falling back:', error);
    } catch (err) {
      console.error('Supabase saveProduct exception, falling back:', err);
    }
  }

  // Local JSON fallback
  const products = await readJson('products.json');
  const index = products.findIndex((p) => p.id === product.id);

  if (index !== -1) {
    products[index] = { ...products[index], ...product };
  } else {
    // Generate id if missing
    if (!product.id) {
      product.id = product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    products.push(product);
  }

  await writeJson('products.json', products);
  return product;
}

export async function deleteProduct(id) {
  if (useSupabase && supabase) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      if (!error) return true;
      console.error('Supabase deleteProduct error, falling back:', error);
    } catch (err) {
      console.error('Supabase deleteProduct exception, falling back:', err);
    }
  }

  // Local JSON fallback
  const products = await readJson('products.json');
  const filtered = products.filter((p) => p.id !== id);
  return await writeJson('products.json', filtered);
}

// ==========================================
// DIAMONDS CRUD OPERATIONS
// ==========================================

export async function getDiamonds() {
  if (useSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('diamonds')
        .select('*')
        .order('price', { ascending: true });
      if (!error) return data;
      console.error('Supabase getDiamonds error, falling back:', error);
    } catch (err) {
      console.error('Supabase getDiamonds exception, falling back:', err);
    }
  }
  return await readJson('diamonds.json');
}

export async function getDiamondById(id) {
  if (useSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('diamonds')
        .select('*')
        .eq('id', id)
        .single();
      if (!error) return data;
      console.error(`Supabase getDiamondById error (${id}), falling back:`, error);
    } catch (err) {
      console.error(`Supabase getDiamondById exception (${id}), falling back:`, err);
    }
  }
  const diamonds = await readJson('diamonds.json');
  return diamonds.find((d) => d.id === id) || null;
}

export async function saveDiamond(diamond) {
  if (useSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('diamonds')
        .upsert(diamond)
        .select();
      if (!error && data && data.length > 0) return data[0];
      console.error('Supabase saveDiamond error, falling back:', error);
    } catch (err) {
      console.error('Supabase saveDiamond exception, falling back:', err);
    }
  }

  // Local JSON fallback
  const diamonds = await readJson('diamonds.json');
  const index = diamonds.findIndex((d) => d.id === diamond.id);

  if (index !== -1) {
    diamonds[index] = { ...diamonds[index], ...diamond };
  } else {
    // Generate id if missing
    if (!diamond.id) {
      diamond.id = `dia-${diamond.shape.toLowerCase()}-${Math.floor(diamond.carat * 100)}`;
    }
    diamonds.push(diamond);
  }

  await writeJson('diamonds.json', diamonds);
  return diamond;
}

export async function deleteDiamond(id) {
  if (useSupabase && supabase) {
    try {
      const { error } = await supabase
        .from('diamonds')
        .delete()
        .eq('id', id);
      if (!error) return true;
      console.error('Supabase deleteDiamond error, falling back:', error);
    } catch (err) {
      console.error('Supabase deleteDiamond exception, falling back:', err);
    }
  }

  // Local JSON fallback
  const diamonds = await readJson('diamonds.json');
  const filtered = diamonds.filter((d) => d.id !== id);
  return await writeJson('diamonds.json', filtered);
}

// ==========================================
// INQUIRIES CRUD OPERATIONS
// ==========================================

export async function getInquiries() {
  if (useSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('timestamp', { ascending: false });
      if (!error) return data;
      console.error('Supabase getInquiries error, falling back:', error);
    } catch (err) {
      console.error('Supabase getInquiries exception, falling back:', err);
    }
  }
  return await readJson('inquiries.json');
}

export async function saveInquiry(inquiry) {
  const timestamp = new Date().toISOString();
  const fullInquiry = {
    id: inquiry.id || `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp,
    ...inquiry
  };

  if (useSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert(fullInquiry)
        .select();
      if (!error && data && data.length > 0) return data[0];
      console.error('Supabase saveInquiry error, falling back:', error);
    } catch (err) {
      console.error('Supabase saveInquiry exception, falling back:', err);
    }
  }

  // Local JSON fallback
  const inquiries = await readJson('inquiries.json');
  inquiries.unshift(fullInquiry); // Add to the top
  await writeJson('inquiries.json', inquiries);
  return fullInquiry;
}

export async function deleteInquiry(id) {
  if (useSupabase && supabase) {
    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);
      if (!error) return true;
      console.error('Supabase deleteInquiry error, falling back:', error);
    } catch (err) {
      console.error('Supabase deleteInquiry exception, falling back:', err);
    }
  }

  // Local JSON fallback
  const inquiries = await readJson('inquiries.json');
  const filtered = inquiries.filter((i) => i.id !== id);
  return await writeJson('inquiries.json', filtered);
}

// ==========================================
// WEBSITE SETTINGS OPERATIONS
// ==========================================

export async function getSettings() {
  if (useSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('id', 1)
        .single();
      if (!error) return data;
      console.error('Supabase getSettings error, falling back:', error);
    } catch (err) {
      console.error('Supabase getSettings exception, falling back:', err);
    }
  }
  
  // Local JSON fallback
  try {
    const filePath = getFilePath('settings.json');
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading settings.json, returning defaults:', error);
    return {
      whatsappNumber: "+15550199",
      instagramLink: "https://instagram.com/aurionjewels",
      facebookLink: "https://facebook.com/aurionjewels",
      email: "inquire@aurionjewels.com",
      address: "5th Avenue Atelier, New York, NY 10001",
      mapLink: "",
      heroHeadline: "Aura & Lustre Fine Jewelry",
      heroSubheadline: "Handcrafted premium jewelry for the modern connoisseur. Exquisite metals, certified diamonds, and exceptional artisan craftsmanship.",
      heroImages: [
        "/images/hero-diamond-ring.png",
        "/images/luxury-hero-necklace.png",
        "/images/luxury-hero-earrings.png"
      ]
    };
  }
}

export async function saveSettings(settings) {
  if (useSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('settings')
        .upsert({ id: 1, ...settings })
        .select();
      if (!error && data && data.length > 0) return data[0];
      console.error('Supabase saveSettings error, falling back:', error);
    } catch (err) {
      console.error('Supabase saveSettings exception, falling back:', err);
    }
  }

  // Local JSON fallback
  await writeJson('settings.json', settings);
  return settings;
}
