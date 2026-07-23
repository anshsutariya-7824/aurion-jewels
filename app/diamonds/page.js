import { getDiamonds } from '@/lib/db';
import DiamondsCatalogClient from './DiamondsCatalogClient';
import ScrollReveal from '@/components/ScrollReveal';

export const revalidate = 0;

export const metadata = {
  title: "Certified Loose Diamonds Catalog | Aurion Jewels",
  description: "Explore our collection of lab-certified loose diamonds. Search by carat, shape, cut, clarity, and color. IGI & GIA certificates included.",
};

export default async function DiamondsPage() {
  const diamonds = await getDiamonds();
  const activeDiamonds = diamonds.filter(d => d.active !== false);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto mb-16 flex flex-col items-center">
        <ScrollReveal animation="fadeIn">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mb-2 block">
            Ethical Sourcing
          </span>
        </ScrollReveal>
        <ScrollReveal animation="slideUp" delay={100}>
          <h1 className="font-display text-4xl sm:text-5xl text-brand-charcoal font-light">
            Certified Diamonds
          </h1>
        </ScrollReveal>
        <ScrollReveal animation="slideUp" delay={200}>
          <p className="text-brand-slate text-sm leading-relaxed mt-4">
            Search our curated selection of fine loose diamonds, conflict-free and individually graded by GIA and IGI. Find the perfect center gem.
          </p>
        </ScrollReveal>
        <ScrollReveal animation="slideUp" delay={300}>
          <div className="w-12 h-[1px] bg-brand-gold mt-6" />
        </ScrollReveal>
      </div>

      {/* Interactive Catalog Wrapper */}
      <DiamondsCatalogClient diamonds={activeDiamonds} />
    </div>
  );
}
