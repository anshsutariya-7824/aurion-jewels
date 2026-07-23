import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: "About Our Craftsmanship & Atelier | Aurion Jewels",
  description: "Learn about the heritage, ethical diamond sourcing standards, precious metal refining process, and artisan handiwork behind every Aurion Jewels masterpiece.",
};

export default function AboutPage() {
  return (
    <div className="bg-brand-cream min-h-screen py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Editorial Header */}
        <section className="text-center max-w-3xl mx-auto flex flex-col items-center pt-8">
          <ScrollReveal animation="fadeIn">
            <span className="text-xs uppercase tracking-[0.4em] text-brand-gold font-semibold mb-3 block">
              Our Legacy & Philosophy
            </span>
          </ScrollReveal>
          <ScrollReveal animation="slideUp" delay={100}>
            <h1 className="font-display text-4xl sm:text-6xl text-brand-charcoal font-light leading-tight">
              The Art of <span className="italic font-playfair font-normal">High Jewelry</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="slideUp" delay={200}>
            <p className="text-brand-slate text-sm sm:text-lg leading-relaxed mt-8 max-w-2xl font-light">
              Aurion Jewels was founded on a simple premise: to strip away the industrial noise of modern jewelry and return to the quiet excellence of the traditional bench atelier, crafting objects of singular beauty and precision.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="slideUp" delay={300}>
            <div className="w-16 h-[1px] bg-brand-gold/60 mt-10" />
          </ScrollReveal>
        </section>

        {/* Split Story 1: Craftsmanship */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Overlapping Image Panel */}
          <div className="lg:col-span-6 relative group">
            {/* Background Decorative Gold Frame */}
            <div className="absolute -inset-4 border border-brand-gold/20 rounded-[2px] pointer-events-none translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
            <div className="relative h-[380px] sm:h-[480px] overflow-hidden bg-brand-sand border border-brand-charcoal/5 rounded-[2px] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800"
                alt="Handcrafting jewelry detail work"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1000ms] ease-out scale-105 group-hover:scale-100"
              />
            </div>
          </div>
          
          <div className="lg:col-span-6 flex flex-col space-y-6 lg:pl-4">
            <ScrollReveal animation="fadeIn">
              <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold">
                The Artisan Hand
              </span>
            </ScrollReveal>
            <ScrollReveal animation="slideUp" delay={100}>
              <h2 className="font-display text-3xl sm:text-4xl text-brand-charcoal font-light leading-snug">
                Mastering the <span className="italic font-playfair">Precious Metals</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="slideUp" delay={200}>
              <div className="text-brand-slate text-sm sm:text-base leading-relaxed space-y-4 font-light">
                <p>
                  Every curve, prong, and clasp is worked by hands that have spent decades at the bench. We specialize in custom-alloyed 18K gold (rose, yellow, and nickel-free white) and ultra-pure Platinum 950.
                </p>
                <p>
                  Our master setters inspect every claw under high magnification. By micro-paving with surgical accuracy, we minimize metal visibility and let the diamonds reflect an uninterrupted cascade of light.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Split Story 2: Ethical Sourcing */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 lg:order-2 relative group">
            {/* Background Decorative Gold Frame */}
            <div className="absolute -inset-4 border border-brand-gold/20 rounded-[2px] pointer-events-none -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
            <div className="relative h-[380px] sm:h-[480px] overflow-hidden bg-brand-sand border border-brand-charcoal/5 rounded-[2px] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=800"
                alt="Perfect diamond solitaire ring close up"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1000ms] ease-out scale-105 group-hover:scale-100"
              />
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1 flex flex-col space-y-6 lg:pr-4">
            <ScrollReveal animation="fadeIn">
              <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold">
                Responsible Luxury
              </span>
            </ScrollReveal>
            <ScrollReveal animation="slideUp" delay={100}>
              <h2 className="font-display text-3xl sm:text-4xl text-brand-charcoal font-light leading-snug">
                Certified <span className="italic font-playfair">Ethical Sourcing</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="slideUp" delay={200}>
              <div className="text-brand-slate text-sm sm:text-base leading-relaxed space-y-4 font-light">
                <p>
                  We hold a deep commitment to environmental stewardship and human rights. All our gold is refined from clean recycled origins, significantly lowering carbon footprints compared to newly mined reserves.
                </p>
                <p>
                  Furthermore, our catalog features only diamonds sourced through certified partners adhering to the Kimberley Process, completely free of conflict and backed by verified laboratory dossiers from the Gemological Institute of America (GIA) and IGI.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Factory Process highlight */}
        <section className="bg-brand-sand/60 p-12 sm:p-20 rounded-[3px] border border-brand-charcoal/5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 border-t border-r border-brand-gold/10 pointer-events-none translate-x-20 -translate-y-20 rotate-45" />
          <div className="absolute bottom-0 left-0 w-64 h-64 border-b border-l border-brand-gold/10 pointer-events-none -translate-x-20 translate-y-20 rotate-45" />
          
          <div className="text-center max-w-xl mx-auto mb-16 flex flex-col items-center relative z-10">
            <span className="text-xs uppercase tracking-[0.4em] text-brand-gold font-semibold mb-3 block">
              Inside the Atelier
            </span>
            <h2 className="font-display text-3xl text-brand-charcoal font-light">
              Our Design Journey
            </h2>
            <div className="w-12 h-[1px] bg-brand-gold mt-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-8 text-center relative z-10">
            <ScrollReveal animation="slideUp" className="space-y-5">
              <div className="w-14 h-14 bg-brand-ivory border border-brand-gold/30 flex items-center justify-center font-display text-lg text-brand-gold mx-auto rounded-full shadow-xs">
                I
              </div>
              <h3 className="font-display text-xl text-brand-charcoal font-medium">Sketch & Render</h3>
              <p className="text-xs sm:text-sm text-brand-slate leading-relaxed font-light">
                Beginning with a hand-drawn pencil concept, our designers transition to high-detail CAD matrices to check parameters down to a fraction of a millimeter.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="slideUp" delay={150} className="space-y-5">
              <div className="w-14 h-14 bg-brand-ivory border border-brand-gold/30 flex items-center justify-center font-display text-lg text-brand-gold mx-auto rounded-full shadow-xs">
                II
              </div>
              <h3 className="font-display text-xl text-brand-charcoal font-medium">Cast & Forge</h3>
              <p className="text-xs sm:text-sm text-brand-slate leading-relaxed font-light">
                Using fine plaster investment casting, our alloys are poured at high temps. Once solid, they undergo physical hammering and pre-polishing.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="slideUp" delay={300} className="space-y-5">
              <div className="w-14 h-14 bg-brand-ivory border border-brand-gold/30 flex items-center justify-center font-display text-lg text-brand-gold mx-auto rounded-full shadow-xs">
                III
              </div>
              <h3 className="font-display text-xl text-brand-charcoal font-medium">Set & Polish</h3>
              <p className="text-xs sm:text-sm text-brand-slate leading-relaxed font-light">
                Diamonds are individually fitted into seats and secured by hand. A multi-stage rouge polishing reveals the mirror shine of the gold or platinum.
              </p>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </div>
  );
}
