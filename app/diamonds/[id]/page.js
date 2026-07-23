import { getDiamondById, getSettings } from '@/lib/db';
import DiamondDetailsClient from './DiamondDetailsClient';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const diamond = await getDiamondById(resolvedParams.id);
  if (!diamond || diamond.active === false) return { title: 'Diamond Not Found | Aurion Jewels' };

  return {
    title: `${diamond.carat.toFixed(2)}ct ${diamond.shape} Certified Diamond | Aurion Jewels`,
    description: `${diamond.carat.toFixed(2)} Carat ${diamond.shape} cut diamond, graded ${diamond.color} color and ${diamond.clarity} clarity. Lab report: ${diamond.lab} ${diamond.certificateNumber}.`
  };
}

export default async function DiamondDetailsPage({ params }) {
  const resolvedParams = await params;
  const diamond = await getDiamondById(resolvedParams.id);

  if (!diamond || diamond.active === false) {
    notFound();
  }

  const settings = await getSettings();
  const whatsappNumber = settings.whatsappNumber || '+15550199';

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <DiamondDetailsClient diamond={diamond} whatsappNumber={whatsappNumber} />
    </div>
  );
}
