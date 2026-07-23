import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found | Aurion Jewels',
  description: 'The requested page or fine jewelry piece could not be found. Explore our fine jewelry collections or contact our atelier concierge.',
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Gold Accent Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 w-32 h-32 border-t border-l border-brand-gold/15 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-b border-r border-brand-gold/15 pointer-events-none hidden sm:block" />

      <div className="max-w-2xl w-full text-center relative z-10 space-y-8 bg-white/80 backdrop-blur-md p-8 sm:p-14 rounded-2xl border border-brand-gold/25 shadow-xl">
        {/* Glowing Jewel Emblem & 404 Tag */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-brand-charcoal via-brand-slate to-brand-gold p-0.5 rounded-full shadow-md flex items-center justify-center animate-pulse">
            <div className="w-full h-full bg-brand-ivory rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-brand-gold fill-current" viewBox="0 0 24 24">
                <path d="M12 2L2 9l10 13L22 9L12 2zm0 3.2L18.4 9H5.6L12 5.2zM4.3 10.5h4.9l2.8 7.3l-7.7-7.3zm6.7 7.3l-2.6-6.8h7.2l-2.6 6.8zm4.4-.5l2.8-7.3h4.9l-7.7 7.3z"/>
              </svg>
            </div>
          </div>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-brand-gold font-bold bg-brand-gold/10 px-4 py-1 rounded-full border border-brand-gold/30">
            Error 404 • Page Not Found
          </span>
        </div>

        {/* Title and Explanation */}
        <div className="space-y-3">
          <h1 className="font-display text-3xl sm:text-5xl text-brand-charcoal font-light leading-tight">
            This Masterpiece Seems <br className="hidden sm:block"/>
            <span className="italic font-playfair font-normal text-brand-gold">to Be Missing</span>
          </h1>
          <p className="text-brand-slate text-xs sm:text-base leading-relaxed max-w-lg mx-auto font-light">
            The page or jewelry piece you are looking for might have been renamed, moved, or is currently being handcrafted in our private atelier.
          </p>
        </div>

        {/* Divider */}
        <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto bg-brand-charcoal hover:bg-brand-gold text-white text-xs uppercase tracking-widest py-3.5 px-8 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95"
          >
            Return to Home Page
          </Link>
          <Link
            href="/collections"
            className="w-full sm:w-auto bg-brand-sand/80 hover:bg-brand-gold/10 text-brand-charcoal border border-brand-gold/40 text-xs uppercase tracking-widest py-3.5 px-8 rounded-full font-bold transition-all duration-300 hover:border-brand-gold"
          >
            Explore Collections
          </Link>
        </div>

        {/* Direct Concierge Shortcuts */}
        <div className="pt-6 border-t border-brand-charcoal/10 flex flex-col space-y-3">
          <span className="text-[10px] uppercase tracking-widest text-brand-slate/70 font-semibold">
            Quick Destinations
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-brand-charcoal">
            <Link href="/collections" className="hover:text-brand-gold underline underline-offset-4 px-2">All Jewelry</Link>
            <span>•</span>
            <Link href="/diamonds" className="hover:text-brand-gold underline underline-offset-4 px-2">Certified Diamonds</Link>
            <span>•</span>
            <Link href="/about" className="hover:text-brand-gold underline underline-offset-4 px-2">Our Atelier</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-brand-gold underline underline-offset-4 px-2">Contact Concierge</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
