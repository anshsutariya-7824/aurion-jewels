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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-16 overflow-x-hidden">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 flex flex-col items-center">
        <ScrollReveal animation="fadeIn">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/10 px-3.5 py-1 rounded-full border border-brand-gold/30 mb-3">
            <span className="text-brand-gold text-xs">✦</span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-brand-gold font-bold">
              Signature Atelier Line
            </span>
          </div>
        </ScrollReveal>
        <ScrollReveal animation="slideUp" delay={100}>
          <h1 className="font-display text-3xl sm:text-5xl text-brand-charcoal font-light leading-tight break-words px-2">
            Our Fine Jewelry Collections
          </h1>
        </ScrollReveal>
        <ScrollReveal animation="slideUp" delay={200}>
          <p className="text-brand-slate text-xs sm:text-base leading-relaxed mt-3 sm:mt-4 font-light break-words px-2">
            Impeccable creations designed for daily luxury and milestones. Hand-selected ethically sourced diamonds set in warm gold and platinum.
          </p>
        </ScrollReveal>
        <ScrollReveal animation="slideUp" delay={300}>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold to-transparent mt-5" />
        </ScrollReveal>
      </div>

      {/* Interactive Catalog */}
      <CollectionsCatalog products={activeProducts} />
    </div>
  );
}
