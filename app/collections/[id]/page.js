import { getProductById, getSettings } from '@/lib/db';
import ProductDetailsClient from './ProductDetailsClient';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);
  if (!product || product.active === false) return { title: 'Product Not Found | Aurion Jewels' };

  return {
    title: `${product.title} | Aurion Jewels`,
    description: product.description.substring(0, 160)
  };
}

export default async function ProductDetailsPage({ params }) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);
  
  if (!product || product.active === false) {
    notFound();
  }

  const settings = await getSettings();
  const whatsappNumber = settings.whatsappNumber || '+15550199';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-36 sm:pb-24">
      <ProductDetailsClient product={product} whatsappNumber={whatsappNumber} />
    </div>
  );
}
