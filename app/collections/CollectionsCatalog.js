'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import ScrollReveal from '@/components/ScrollReveal';

export default function CollectionsCatalog({ products }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const categoryParam = searchParams.get('cat') || 'All';
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  // Sync category with URL search param
  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // Update URL query string
    if (category === 'All') {
      router.push('/collections', { scroll: false });
    } else {
      router.push(`/collections?cat=${category}`, { scroll: false });
    }
  };

  return (
    <div className="flex flex-col space-y-12">
      {/* Category Tabs */}
      <div className="w-full flex justify-start sm:justify-center border-b border-brand-charcoal/10 pb-4 overflow-x-auto scrollbar-none">
        <div className="flex space-x-4 sm:space-x-8 px-4 whitespace-nowrap">
          {categories.map((cat) => {
            const isSelected = activeCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`text-xs uppercase tracking-[0.25em] px-5 py-2.5 rounded-full transition-all duration-300 relative cursor-pointer font-bold ${
                  isSelected
                    ? 'bg-brand-charcoal text-white shadow-md'
                    : 'text-brand-slate hover:text-brand-charcoal hover:bg-brand-sand/60'
                }`}
              >
                <span>{cat}</span>
                {isSelected && (
                  <span className="ml-2 text-brand-gold text-[10px]">✦</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-brand-cream/50 border border-brand-charcoal/10 rounded-xl">
          <p className="font-display italic text-xl text-brand-slate">No masterpieces found in this collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredProducts.map((product, idx) => {
            const secondaryImage = product.images && product.images[1] ? product.images[1] : (product.images && product.images[0] ? product.images[0] : null);
            const primaryImage = product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800';

            return (
              <ScrollReveal
                key={product.id}
                animation="slideUp"
                delay={idx * 50}
                className="group flex flex-col bg-white border border-brand-charcoal/10 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 relative"
              >
                {/* Image Viewport with Dual Image Hover */}
                <Link href={`/collections/${product.id}`} className="relative aspect-[4/4] w-full overflow-hidden bg-brand-sand/40 block">
                  <img
                    src={primaryImage}
                    alt={product.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${secondaryImage ? 'group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-110'}`}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  {secondaryImage && (
                    <img
                      src={secondaryImage}
                      alt={`${product.title} view 2`}
                      className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                  )}

                  {/* Top Floating Badges */}
                  <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
                    <span className="bg-brand-charcoal/85 text-brand-cream backdrop-blur-md text-[9px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full border border-brand-gold/30 shadow-xs">
                      {product.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-brand-gold/90 text-white text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full shadow-xs">
                      MOQ: {product.moq || 1}
                    </span>
                  </div>

                  {/* Quick Hover CTA Banner */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                    <span className="bg-white/95 text-brand-charcoal hover:bg-brand-gold hover:text-white text-[10px] uppercase tracking-widest font-bold py-2.5 px-6 rounded-full shadow-md transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      View Product Details →
                    </span>
                  </div>
                </Link>

                {/* Content Info Box */}
                <div className="p-6 flex flex-col flex-grow space-y-3 bg-gradient-to-b from-white to-brand-cream/20">
                  <h3 className="font-display text-xl text-brand-charcoal font-medium group-hover:text-brand-gold transition-colors duration-300 leading-snug">
                    <Link href={`/collections/${product.id}`}>{product.title}</Link>
                  </h3>

                  <p className="text-xs text-brand-slate/90 line-clamp-2 leading-relaxed font-light">
                    {product.description}
                  </p>

                  <div className="pt-4 mt-auto border-t border-brand-charcoal/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-brand-slate/70 block">
                        Wholesale FOB
                      </span>
                      <span className="text-sm font-bold text-brand-gold">
                        {product.price}
                      </span>
                    </div>

                    <Link
                      href={`/collections/${product.id}`}
                      className="w-10 h-10 rounded-full bg-brand-sand hover:bg-brand-gold hover:text-white text-brand-charcoal flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-md"
                      title="Inquire about product"
                    >
                      <span className="text-sm font-bold">→</span>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
