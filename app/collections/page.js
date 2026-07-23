import { getProducts } from '@/lib/db';
import CollectionsCatalog from './CollectionsCatalog';
import ScrollReveal from '@/components/ScrollReveal';

export const revalidate = 0;

export const metadata = {
  title: "Fine Jewelry Collections | Aurion Jewels",
  description: "Browse our signature collections of handcrafted rings, necklaces, earrings, and bracelets. Pure materials and certified gemstones.",
};

export default async function CollectionsPage() {
  const products = await getProducts();
  const activeProducts = products.filter(p => p.active !== false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
        <ScrollReveal animation="fadeIn">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/10 px-3.5 py-1 rounded-full border border-brand-gold/30 mb-3">
            <span className="text-brand-gold text-xs">✦</span>
            <span className="text-[11px] uppercase tracking-[0.35em] text-brand-gold font-bold">
              Signature Atelier Line
            </span>
          </div>
        </ScrollReveal>
        <ScrollReveal animation="slideUp" delay={100}>
          <h1 className="font-display text-4xl sm:text-5xl text-brand-charcoal font-light leading-tight">
            Our Fine Jewelry Collections
          </h1>
        </ScrollReveal>
        <ScrollReveal animation="slideUp" delay={200}>
          <p className="text-brand-slate text-sm sm:text-base leading-relaxed mt-4 font-light">
            Impeccable creations designed for daily luxury and milestones. Hand-selected ethically sourced diamonds set in warm gold and platinum.
          </p>
        </ScrollReveal>
        <ScrollReveal animation="slideUp" delay={300}>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold to-transparent mt-6" />
        </ScrollReveal>
      </div>

      {/* Interactive Catalog */}
      <CollectionsCatalog products={activeProducts} />
    </div>
  );
}
