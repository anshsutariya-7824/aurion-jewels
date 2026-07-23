import Link from 'next/link';
import Image from 'next/image';
import { getProducts, getSettings } from '@/lib/db';
import ScrollReveal from '@/components/ScrollReveal';
import HeroImageSlider from '@/components/HeroImageSlider';

export const revalidate = 0; // Ensure fresh data on visits

export default async function Home() {
  const products = await getProducts();
  const settings = await getSettings();

  const categories = [
    {
      name: 'Rings',
      image: '/images/hero-diamond-ring.png',
      tagline: 'Timeless Solitaires & Bands',
      link: '/collections?cat=Rings',
      span: 'md:col-span-2 md:row-span-1'
    },
    {
      name: 'Necklaces',
      image: '/images/necklaces-category.png',
      tagline: 'Exquisite Pendants & Chokers',
      link: '/collections?cat=Necklaces',
      span: 'md:col-span-1 md:row-span-1'
    },
    {
      name: 'Earrings',
      image: '/images/earrings-category.png',
      tagline: 'Cascading Drops & Studs',
      link: '/collections?cat=Earrings',
      span: 'md:col-span-1 md:row-span-2'
    },
    {
      name: 'Bracelets',
      image: '/images/bracelets-category.png',
      tagline: 'Elegant Tennis Chains & Cuffs',
      link: '/collections?cat=Bracelets',
      span: 'md:col-span-2 md:row-span-1'
    }
  ];

  const activeProducts = products.filter(p => p.active !== false);
  // Get featured products (first 3)
  const featuredProducts = activeProducts.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center bg-brand-cream overflow-hidden px-6 -mt-24 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:25%_100%]">
        {/* Subtle geometric lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:100%_150px] pointer-events-none" />
        
        {/* Fine gold horizontal line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center z-10 py-20 relative">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8 pr-4">
            <div className="slide-up-entrance" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-brand-gold/60" />
                <span className="text-[11px] uppercase tracking-[0.4em] text-brand-gold font-semibold">
                  Atelier Fine Jewelry
                </span>
              </div>
            </div>

            <div className="slide-up-entrance" style={{ animationDelay: '250ms' }}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brand-charcoal tracking-wide leading-[1.1] font-light">
                {(() => {
                  const words = (settings.heroHeadline || "Aura & Lustre Fine Jewelry").split(" ");
                  const lastWord = words.pop();
                  const firstPart = words.join(" ");
                  return (
                    <>
                      {firstPart} <br />
                      <span className="italic text-brand-gold font-normal font-display">{lastWord}</span>
                    </>
                  );
                })()}
              </h1>
            </div>

            <div className="slide-up-entrance" style={{ animationDelay: '400ms' }}>
              <p className="text-brand-slate text-sm sm:text-base leading-relaxed max-w-md">
                {settings.heroSubheadline || "Handcrafted premium jewelry for the modern connoisseur. Exquisite metals, certified diamonds, and exceptional artisan craftsmanship."}
              </p>
            </div>

            <div className="slide-up-entrance" style={{ animationDelay: '550ms' }}>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/collections"
                  className="bg-brand-gold hover:bg-brand-charcoal text-white text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 rounded-[2px] font-semibold shadow-sm hover:shadow"
                >
                  Explore Collection
                </Link>
                <Link
                  href="/diamonds"
                  className="border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white text-xs uppercase tracking-widest px-8 py-4 bg-transparent transition-all duration-300 rounded-[2px] font-semibold"
                >
                  Diamonds Catalog
                </Link>
              </div>
            </div>
          </div>

          {/* Right Image Column with Premium Framed Overlap */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end pr-6 pb-6 select-none">
            {/* The elegant gold frame behind the image (matching the arch shape) */}
            <div
              className="absolute w-[80%] h-[85%] border border-brand-gold/20 translate-x-6 translate-y-6 rounded-t-[250px] rounded-b-[4px] z-0 bottom-6 right-6 lg:right-12 scale-up-entrance"
              style={{ animationDelay: '300ms' }}
            />
            
            {/* Image Box - Styled as an Arch */}
            <div
              className="relative w-full sm:w-[90%] h-[420px] sm:h-[520px] lg:h-[570px] bg-brand-cream border border-brand-charcoal/5 rounded-t-[250px] rounded-b-[4px] overflow-hidden shadow-xl z-10 scale-up-entrance"
              style={{ animationDelay: '450ms' }}
            >
              <HeroImageSlider images={settings.heroImages} />
            </div>

            {/* Floating Glassmorphism Spec Badge */}
            <div 
              className="absolute bottom-12 -left-2 bg-brand-cream/80 backdrop-blur-md border border-white/60 shadow-lg px-6 py-4 rounded-[3px] z-20 flex items-center space-x-3.5 max-w-[220px] slide-up-entrance font-sans hidden sm:flex hover:-translate-y-1 transition-transform duration-300"
              style={{ animationDelay: '800ms' }}
            >
              <span className="text-xl text-brand-gold animate-pulse">✦</span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal leading-none">GIA Certified</p>
                <p className="text-[9px] text-brand-slate/90 mt-1.5 leading-normal font-light">Individually sourced and selected fine diamonds.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="bg-brand-ivory py-24 px-6 border-b border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[400px] lg:h-[500px] border border-brand-gold/10 p-4">
            <div className="w-full h-full relative overflow-hidden">
              <img
                src="/images/heritage-earrings.png"
                alt="Jewelry design workshop and craftsmanship process"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Absolute accent card */}
            <div className="absolute -bottom-6 -right-6 bg-brand-ivory border border-brand-gold/20 shadow-md p-6 hidden sm:block max-w-xs">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold mb-2">100% Certified</p>
              <p className="text-sm text-brand-charcoal font-display italic">
                "Each diamond is individually selected and certified by the world's leading labs (GIA, IGI)."
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <ScrollReveal animation="fadeIn">
              <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold">
                Our Heritage
              </span>
            </ScrollReveal>
            <ScrollReveal animation="slideUp" delay={100}>
              <h2 className="font-display text-3xl sm:text-4xl text-brand-charcoal font-light leading-tight">
                Meticulously Hand-Set in Precious Gold & Platinum
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="slideUp" delay={200}>
              <p className="text-brand-slate text-sm sm:text-base leading-relaxed">
                Every Aurion piece begins its life in our atelier, where skilled craftsmen design and sculpt using traditional bench techniques integrated with precision technology. We utilize only high-purity recycled gold and platinum, ensuring every alloy showcases the diamonds with radiant fire and absolute security.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="slideUp" delay={300}>
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-brand-charcoal/5">
                <div>
                  <span className="font-display text-2xl text-brand-gold">18K / Pt950</span>
                  <p className="text-xs uppercase tracking-widest text-brand-slate mt-1">Premium Alloys Only</p>
                </div>
                <div>
                  <span className="font-display text-2xl text-brand-gold">GIA / IGI</span>
                  <p className="text-xs uppercase tracking-widest text-brand-slate mt-1">Certified Fine Diamonds</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="bg-brand-cream py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 flex flex-col items-center">
            <ScrollReveal animation="fadeIn">
              <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mb-2 block">
                Selected Categories
              </span>
            </ScrollReveal>
            <ScrollReveal animation="slideUp" delay={100}>
              <h2 className="font-display text-3xl sm:text-4xl text-brand-charcoal font-light">
                Shop by Jewelry Category
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="slideUp" delay={200}>
              <div className="w-12 h-[1px] bg-brand-gold mt-6" />
            </ScrollReveal>
          </div>

          {/* Editorial Arched Columns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, idx) => (
              <ScrollReveal
                key={cat.name}
                animation="slideUp"
                delay={idx * 150}
                className="group flex flex-col items-center"
              >
                <Link href={cat.link} className="w-full flex flex-col items-center">
                  {/* Modern Arched Image Frame */}
                  <div className="relative w-full aspect-[3/4] rounded-t-full rounded-b-[4px] overflow-hidden bg-brand-cream border border-brand-charcoal/5 shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
                    {/* Darkening hover tint */}
                    <div className="absolute inset-0 bg-brand-charcoal/5 group-hover:bg-brand-charcoal/15 transition-colors duration-500 z-10" />
                    
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    
                    {/* Subtle absolute label in the arch */}
                    <div className="absolute top-4 right-4 bg-brand-cream/80 backdrop-blur-xs border border-white/40 text-brand-gold text-[9px] font-mono tracking-widest px-2.5 py-1 rounded-full z-20">
                      0{idx + 1}
                    </div>
                  </div>

                  {/* Clean Typography below */}
                  <div className="mt-6 flex flex-col items-center text-center space-y-2">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-brand-gold font-semibold">
                      {cat.tagline}
                    </span>
                    <h3 className="font-display text-lg tracking-[0.2em] text-brand-charcoal group-hover:text-brand-gold transition-colors duration-300 font-light uppercase">
                      {cat.name}
                    </h3>
                    <div className="w-8 h-[1px] bg-brand-charcoal/10 group-hover:bg-brand-gold group-hover:w-16 transition-all duration-500" />
                    <span className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 group-hover:text-brand-charcoal transition-colors duration-300 pt-1">
                      Discover Collection →
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Masterpieces Section - Luxury Redesign */}
      <section className="bg-gradient-to-b from-brand-cream via-brand-ivory to-white py-28 px-6 border-t border-brand-charcoal/5 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-brand-charcoal/10">
            <div className="flex flex-col space-y-2">
              <ScrollReveal animation="fadeIn">
                <div className="flex items-center space-x-2">
                  <span className="text-brand-gold text-xs">✦</span>
                  <span className="text-xs uppercase tracking-[0.35em] text-brand-gold font-bold">
                    Exquisite Releases
                  </span>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="slideUp" delay={100}>
                <h2 className="font-display text-3xl sm:text-5xl text-brand-charcoal font-light leading-tight">
                  Featured Masterpieces
                </h2>
              </ScrollReveal>
            </div>
            <ScrollReveal animation="slideUp" delay={200} className="mt-6 md:mt-0">
              <Link
                href="/collections"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-brand-gold hover:text-brand-charcoal font-bold group transition-colors duration-300"
              >
                <span>View Full Catalog</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {featuredProducts.map((product, idx) => {
              const secondaryImage = product.images && product.images[1] ? product.images[1] : (product.images && product.images[0] ? product.images[0] : null);
              const primaryImage = product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800';

              return (
                <ScrollReveal
                  key={product.id}
                  animation="slideUp"
                  delay={idx * 150}
                  className="group flex flex-col bg-white border border-brand-charcoal/10 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 relative"
                >
                  {/* Image Viewport with Dual Image Hover */}
                  <Link href={`/collections/${product.id}`} className="relative aspect-[4/4] w-full overflow-hidden bg-brand-sand/40 block">
                    <img
                      src={primaryImage}
                      alt={product.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${secondaryImage ? 'group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-110'}`}
                    />
                    {secondaryImage && (
                      <img
                        src={secondaryImage}
                        alt={`${product.title} view 2`}
                        className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
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
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-brand-ivory py-24 px-6 border-t border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 flex flex-col items-center">
            <ScrollReveal animation="fadeIn">
              <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mb-2 block">
                Client Experiences
              </span>
            </ScrollReveal>
            <ScrollReveal animation="slideUp" delay={100}>
              <h2 className="font-display text-3xl sm:text-4xl text-brand-charcoal font-light">
                Voices of Brilliance
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="slideUp" delay={200}>
              <div className="w-12 h-[1px] bg-brand-gold mt-6" />
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal animation="slideUp" delay={100} className="bg-brand-cream border border-brand-charcoal/5 p-8 rounded-[2px] shadow-xs relative flex flex-col justify-between">
              <div className="text-brand-gold text-sm mb-4">★★★★★</div>
              <p className="text-brand-slate text-sm leading-relaxed italic mb-6">
                "The craftsmanship of the solitaire ring is absolutely breathtaking. Our clients in London were blown away by the clarity and precision. Aurion Jewels is our premier partner for high-jewelry commissions."
              </p>
              <div>
                <h4 className="text-sm font-semibold text-brand-charcoal font-display">Sophia Mercer</h4>
                <p className="text-[10px] uppercase tracking-widest text-brand-gold mt-0.5">Mercer & Co. Boutiques, London</p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slideUp" delay={200} className="bg-brand-cream border border-brand-charcoal/5 p-8 rounded-[2px] shadow-xs relative flex flex-col justify-between">
              <div className="text-brand-gold text-sm mb-4">★★★★★</div>
              <p className="text-brand-slate text-sm leading-relaxed italic mb-6">
                "Their custom OEM/ODM manufacturing capability has helped us scale our custom engagement rings business significantly. Meticulous GIA stone sourcing and perfect alloy finishes every single time."
              </p>
              <div>
                <h4 className="text-sm font-semibold text-brand-charcoal font-display">Marcus Sterling</h4>
                <p className="text-[10px] uppercase tracking-widest text-brand-gold mt-0.5">Sterling Showroom, NY</p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slideUp" delay={300} className="bg-brand-cream border border-brand-charcoal/5 p-8 rounded-[2px] shadow-xs relative flex flex-col justify-between">
              <div className="text-brand-gold text-sm mb-4">★★★★★</div>
              <p className="text-brand-slate text-sm leading-relaxed italic mb-6">
                "We ordered a batch of custom necklaces and earrings for our holiday catalog. Outstanding communication, swift insured shipping, and lead times were exactly as promised. Highly recommend."
              </p>
              <div>
                <h4 className="text-sm font-semibold text-brand-charcoal font-display">Elena Rostova</h4>
                <p className="text-[10px] uppercase tracking-widest text-brand-gold mt-0.5">Luxury Jewelers Association, Geneva</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Wholesale & B2B Section */}
      <section className="bg-brand-sand py-24 px-6 border-t border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Image with Luxury Border */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-start pr-6 pb-6 order-last lg:order-first">
            {/* Elegant gold frame behind the image */}
            <div
              className="absolute w-[85%] h-[90%] border border-brand-gold/20 translate-x-6 translate-y-6 rounded-[2px] z-0 bottom-6 right-6 lg:right-12"
            />
            
            {/* Image Box */}
            <div className="relative w-full sm:w-[90%] h-[350px] sm:h-[450px] lg:h-[480px] bg-brand-cream border border-brand-charcoal/5 rounded-[2px] overflow-hidden shadow-md z-10">
              <img
                src="/images/wholesale-showcase.png"
                alt="Aurion Jewels wholesale and bulk manufacturing showcase"
                className="w-full h-full object-cover opacity-95 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-brand-charcoal text-brand-gold text-[10px] uppercase tracking-widest font-semibold px-4 py-1.5 rounded-[1px] shadow-sm">
                B2B & Exporters
              </div>
            </div>
          </div>

          {/* Right Column: Wholesale Content */}
          <div className="lg:col-span-6 flex flex-col space-y-8 pl-0 lg:pl-6">
            <div className="flex flex-col space-y-3">
              <ScrollReveal animation="fadeIn">
                <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold">
                  Wholesale Partnership Program
                </span>
              </ScrollReveal>
              <ScrollReveal animation="slideUp" delay={100}>
                <h2 className="font-display text-3xl sm:text-4xl text-brand-charcoal font-light leading-tight">
                  Global Fine Jewelry Supplier & Manufacturer
                </h2>
              </ScrollReveal>
              <ScrollReveal animation="slideUp" delay={150}>
                <div className="w-12 h-[1px] bg-brand-gold mt-2" />
              </ScrollReveal>
            </div>

            <ScrollReveal animation="slideUp" delay={200}>
              <p className="text-brand-slate text-sm sm:text-base leading-relaxed">
                Expand your showroom or boutique collection with Aurion Jewels. We offer retail distributors, online boutiques, and jewelry showrooms bulk pricing, flexible minimum order quantities (MOQ), and fully customized design manufacturing.
              </p>
            </ScrollReveal>

            {/* B2B Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <ScrollReveal animation="slideUp" delay={250} className="flex items-start space-x-3">
                <div className="text-brand-gold text-lg mt-0.5">✦</div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-charcoal">Flexible Tiered Pricing</h4>
                  <p className="text-xs text-brand-slate mt-1 leading-relaxed">High-margin structures tailored to showrooms and independent retailers.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="slideUp" delay={300} className="flex items-start space-x-3">
                <div className="text-brand-gold text-lg mt-0.5">✦</div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-charcoal">Custom OEM/ODM Manufacturing</h4>
                  <p className="text-xs text-brand-slate mt-1 leading-relaxed">Custom metal purity, bespoke casting, and private label hallmarking.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="slideUp" delay={350} className="flex items-start space-x-3">
                <div className="text-brand-gold text-lg mt-0.5">✦</div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-charcoal">100% Certified Diamonds</h4>
                  <p className="text-xs text-brand-slate mt-1 leading-relaxed">Every batch is verified and certified by recognized labs (GIA, IGI).</p>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="slideUp" delay={400} className="flex items-start space-x-3">
                <div className="text-brand-gold text-lg mt-0.5">✦</div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-charcoal">Secured Insured Shipping</h4>
                  <p className="text-xs text-brand-slate mt-1 leading-relaxed">Fast, fully insured worldwide shipping with complete customs support.</p>
                </div>
              </ScrollReveal>
            </div>

            {/* Action Buttons */}
            <ScrollReveal animation="slideUp" delay={450} className="flex flex-wrap gap-4 pt-6 border-t border-brand-charcoal/5">
              <Link
                href="/contact?type=wholesale"
                className="bg-brand-charcoal hover:bg-brand-gold text-white text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 rounded-[2px] font-semibold shadow-sm"
              >
                Inquire For Wholesale
              </Link>
              <a
                href={`https://wa.me/${(settings.whatsappNumber || '+15550199').replace(/[^0-9+]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white text-xs uppercase tracking-widest px-8 py-4 bg-transparent transition-all duration-300 rounded-[2px] font-semibold flex items-center justify-center"
              >
                WhatsApp B2B Desk
              </a>
            </ScrollReveal>
          </div>
          
        </div>
      </section>

      {/* Inquiry Call to Action */}
      <section className="bg-brand-sand py-20 px-6 border-t border-b border-brand-charcoal/5">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-6">
          <ScrollReveal animation="fadeIn">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold">
              Bespoke Jewelry Crafting
            </span>
          </ScrollReveal>
          <ScrollReveal animation="slideUp" delay={150}>
            <h2 className="font-display text-3xl sm:text-4xl text-brand-charcoal font-light leading-tight">
              Looking for a Custom Diamond Design?
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="slideUp" delay={300}>
            <p className="text-brand-slate text-sm sm:text-base leading-relaxed max-w-2xl">
              Collaborate directly with our master jewelers to bring your dream piece to life. Whether an custom sizing, alternative alloy, or a custom engagement mount, we source GIA certified stones to matching your budget.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="slideUp" delay={450} className="pt-4">
            <Link
              href="/contact"
              className="bg-brand-charcoal hover:bg-brand-gold text-brand-ivory text-xs uppercase tracking-widest px-10 py-4 transition-all duration-300 rounded-[2px]"
            >
              Request A Design Consultation
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
