'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

export default function ProductDetailsClient({ product, whatsappNumber }) {
  const [activeImage, setActiveImage] = useState(
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800'
  );

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hello Aurion Jewels, I would like to inquire about the "${product.title}" (Code: ${product.id}). I am interested in customization options and wholesale pricing.`
  });

  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formState,
          type: 'product',
          itemId: product.id
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your inquiry has been submitted. Our team will contact you shortly.'
        });
        setFormState({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to submit inquiry. Please try again.'
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message: 'A network error occurred. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const cleanNumber = whatsappNumber.replace(/[^0-9+]/g, '');
    const textMessage = encodeURIComponent(
      `Hello Aurion Jewels, I am interested in the following product:\n\n*Product:* ${product.title}\n*Code:* ${product.id}\n*URL:* ${pageUrl}\n\nPlease share availability, customization options, and quotation terms.`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${textMessage}`, '_blank');
  };

  return (
    <div className="flex flex-col space-y-16">
      {/* Top Section: Product Gallery & Product Details/Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Section: Gallery (Main image on Left, Thumbnails vertically on Right) */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-4 lg:gap-6 items-start">
          {/* Main Image Viewport */}
          <div className="w-full md:flex-1 order-1 md:order-1">
            <ScrollReveal animation="fadeIn" className="relative aspect-square w-full overflow-hidden bg-brand-sand/30 border border-brand-charcoal/10 rounded-lg shadow-sm group">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800';
                }}
              />
              <div className="absolute top-4 left-4 bg-brand-charcoal/80 text-brand-cream text-[10px] uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md font-medium border border-brand-gold/20">
                High Jewelry Collection
              </div>
            </ScrollReveal>
          </div>

          {/* Thumbnails (Different Angles) - Positioned on the RIGHT side of main image */}
          {product.images && product.images.length > 1 && (
            <div className="w-full md:w-24 order-2 md:order-2 flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-y-auto scrollbar-none max-h-[520px] py-1 shrink-0">
              {product.images.map((img, index) => {
                const isSelected = img === activeImage;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square w-20 md:w-full overflow-hidden bg-brand-sand border-2 cursor-pointer rounded-md transition-all duration-300 transform shrink-0 relative group ${
                      isSelected
                        ? 'border-brand-gold ring-2 ring-brand-gold/30 scale-100 shadow-md'
                        : 'border-brand-charcoal/10 opacity-70 hover:opacity-100 hover:border-brand-gold/50 hover:scale-105'
                    }`}
                    title={`View image ${index + 1}`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=200';
                      }}
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-brand-gold/10 pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Spec details and actions */}
        <div className="lg:col-span-5 flex flex-col space-y-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-semibold mb-2 block">
              {product.category}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl text-brand-charcoal font-light leading-tight">
              {product.title}
            </h1>
            <p className="text-xl font-semibold text-brand-gold mt-2">
              {product.price}
            </p>
          </div>

          <div className="border-t border-brand-charcoal/10 pt-6">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal mb-3">
              Description
            </h2>
            <p className="text-brand-slate text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Technical Specs Table */}
          <div className="border-t border-brand-charcoal/10 pt-6">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal mb-4">
              Product Specifications
            </h2>
            <div className="border border-brand-charcoal/10 rounded-md overflow-hidden text-sm bg-brand-cream/40 shadow-xs">
              <div className="grid grid-cols-3 border-b border-brand-charcoal/5 p-3.5 items-center">
                <span className="text-brand-slate font-medium col-span-1 text-xs uppercase tracking-wider">Minimum Order</span>
                <span className="text-brand-charcoal font-semibold col-span-2">{product.moq} units</span>
              </div>
              <div className="grid grid-cols-3 border-b border-brand-charcoal/5 p-3.5 items-center">
                <span className="text-brand-slate font-medium col-span-1 text-xs uppercase tracking-wider">Alloy Options</span>
                <span className="text-brand-charcoal font-medium col-span-2">
                  {product.alloys && Array.isArray(product.alloys) ? product.alloys.join(', ') : product.alloys}
                </span>
              </div>
              <div className="grid grid-cols-3 border-b border-brand-charcoal/5 p-3.5 items-center">
                <span className="text-brand-slate font-medium col-span-1 text-xs uppercase tracking-wider">Gemstones</span>
                <span className="text-brand-charcoal font-medium col-span-2">{product.gemstones}</span>
              </div>
              <div className="grid grid-cols-3 p-3.5 items-center">
                <span className="text-brand-slate font-medium col-span-1 text-xs uppercase tracking-wider">Lead Time</span>
                <span className="text-brand-charcoal font-medium col-span-2">{product.packaging || '10-12 Business Days'}</span>
              </div>
            </div>
          </div>

          {/* Call to Action: WhatsApp button */}
          <div className="border-t border-brand-charcoal/10 pt-6 flex flex-col space-y-3">
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs uppercase tracking-widest py-4 px-4 transition-all duration-300 rounded-md font-semibold flex items-center justify-center space-x-2.5 shadow-sm hover:shadow cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Inquire directly on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-Width / Wide Catalog Inquiry Section */}
      <div className="border border-brand-gold/30 p-8 sm:p-12 rounded-xl bg-gradient-to-b from-white via-brand-ivory to-brand-cream/40 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-gold via-amber-300 to-brand-gold" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Inquiry Info Header */}
          <div className="lg:col-span-4 space-y-5 border-b lg:border-b-0 lg:border-r border-brand-charcoal/10 pb-6 lg:pb-0 lg:pr-8">
            <div className="inline-flex items-center space-x-2 bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/30">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">
                B2B & Custom Concierge
              </span>
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl text-brand-charcoal font-medium leading-tight">
              Catalog Inquiry & Quotation
            </h3>
            
            <p className="text-xs sm:text-sm text-brand-slate leading-relaxed">
              Submit your bespoke specifications, metal alloy preference, gemstone requirements, or bulk order details. Our master jewelers respond within 2 business hours.
            </p>

            <div className="space-y-3 pt-2 text-xs text-brand-charcoal font-medium">
              <div className="flex items-center space-x-2.5">
                <span className="text-brand-gold font-bold">✓</span>
                <span>Certified Conflict-Free GIA Diamonds</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="text-brand-gold font-bold">✓</span>
                <span>14k / 18k / Platinum PT950 Options</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="text-brand-gold font-bold">✓</span>
                <span>Custom Laser Engraving & Packaging</span>
              </div>
            </div>
          </div>

          {/* Right Form: Wide Layout with 3-column inputs */}
          <div className="lg:col-span-8">
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[11px] uppercase tracking-widest text-brand-charcoal font-semibold mb-1.5">
                    Full Name <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-brand-charcoal/15 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 p-3.5 text-sm focus:outline-none rounded-md transition-all placeholder:text-brand-slate/50"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[11px] uppercase tracking-widest text-brand-charcoal font-semibold mb-1.5">
                    Email Address <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-brand-charcoal/15 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 p-3.5 text-sm focus:outline-none rounded-md transition-all placeholder:text-brand-slate/50"
                    placeholder="name@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[11px] uppercase tracking-widest text-brand-charcoal font-semibold mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-brand-charcoal/15 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 p-3.5 text-sm focus:outline-none rounded-md transition-all placeholder:text-brand-slate/50"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-[11px] uppercase tracking-widest text-brand-charcoal font-semibold mb-1.5">
                  Inquiry Details & Customization Notes <span className="text-brand-gold">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  value={formState.message}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-brand-charcoal/15 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 p-3.5 text-sm focus:outline-none rounded-md transition-all leading-relaxed placeholder:text-brand-slate/50 resize-y"
                  placeholder="Specify your diamond specifications, quantity, alloy preference or custom design notes..."
                />
              </div>

              {status.message && (
                <div
                  className={`p-4 text-xs rounded-md border flex items-center space-x-2.5 ${
                    status.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-red-50 text-red-800 border-red-200'
                  }`}
                >
                  <span className="font-bold">{status.type === 'success' ? '✓ Success:' : '✕ Error:'}</span>
                  <span>{status.message}</span>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 bg-brand-charcoal hover:bg-brand-gold text-white text-xs uppercase tracking-widest py-4 transition-all duration-300 rounded-md cursor-pointer font-semibold shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Catalog Inquiry</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
