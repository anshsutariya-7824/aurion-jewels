'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

export default function DiamondDetailsClient({ diamond, whatsappNumber }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hello Aurion Jewels, I am interested in inquiring about the certified diamond (Cert: ${diamond.certificateNumber}). Shape: ${diamond.shape}, Carat: ${diamond.carat} ct, Color: ${diamond.color}, Clarity: ${diamond.clarity}. Please share a digital copy of the certificate and final quote.`
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
          type: 'diamond',
          itemId: diamond.certificateNumber
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your diamond inquiry has been submitted. A gemologist will get in touch shortly.'
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
        message: 'A network error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const cleanNumber = whatsappNumber.replace(/[^0-9+]/g, '');
    const textMessage = encodeURIComponent(
      `Hello Aurion Jewels, I am interested in this certified diamond:\n\n*Certificate:* ${diamond.certificateNumber}\n*Lab:* ${diamond.lab}\n*Specs:* ${diamond.carat}ct ${diamond.shape} | ${diamond.color} | ${diamond.clarity} | ${diamond.cut}\n*Price:* $${diamond.price.toLocaleString()}\n*URL:* ${pageUrl}\n\nPlease share the laboratory certificate PDF and purchase steps.`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${textMessage}`, '_blank');
  };

  const specs = [
    { label: 'Shape / Outline', value: diamond.shape },
    { label: 'Carat Weight', value: `${diamond.carat.toFixed(2)} ct` },
    { label: 'Color Grade', value: diamond.color },
    { label: 'Clarity Grade', value: diamond.clarity },
    { label: 'Cut Grade', value: diamond.cut },
    { label: 'Polish Grade', value: diamond.polish },
    { label: 'Symmetry Grade', value: diamond.symmetry },
    { label: 'Fluorescence', value: diamond.fluorescence },
    { label: 'Grading Lab', value: diamond.lab },
    { label: 'Certificate Number', value: diamond.certificateNumber }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      {/* Left Column: Diamond Graphic & Specifications */}
      <div className="lg:col-span-7 flex flex-col space-y-8">
        <ScrollReveal animation="fadeIn" className="relative aspect-[4/3] w-full overflow-hidden bg-brand-sand border border-brand-charcoal/5 rounded-[2px] flex items-center justify-center p-8">
          <div className="text-center flex flex-col items-center space-y-4">
            {/* Diamond SVG outline icon */}
            <svg className="w-24 h-24 text-brand-gold/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M6 3h12l4 6-10 12L2 9z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 9h2v12h-2zm-6 0h2v4H5zm12 0h2v4h-2zm-6-6h2v6h-2zm-6 6l5 12-2.5-12z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="font-display text-2xl font-light text-brand-charcoal">
              {diamond.carat.toFixed(2)} ct {diamond.shape}
            </div>
            <div className="text-xs uppercase tracking-widest text-brand-slate">
              {diamond.lab} Certified • conflict-free
            </div>
          </div>
        </ScrollReveal>

        {/* Specifications Grid */}
        <div>
          <h2 className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal mb-4">
            Grading Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-brand-charcoal/5 p-6 rounded-[2px] bg-brand-ivory shadow-sm">
            {specs.map((spec, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2.5 border-b border-brand-charcoal/5 last:border-b-0 text-sm"
              >
                <span className="text-brand-slate font-medium">{spec.label}</span>
                <span className="text-brand-charcoal font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Price & Inquiry Actions */}
      <div className="lg:col-span-5 flex flex-col space-y-8">
        <div>
          <span className="bg-brand-gold/15 text-brand-gold text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-[2px] inline-block mb-3">
            {diamond.lab} Certified
          </span>
          <h1 className="font-display text-3xl text-brand-charcoal font-light leading-tight">
            Loose Diamond Specification
          </h1>
          <p className="text-2xl font-semibold text-brand-gold mt-3">
            ${diamond.price.toLocaleString()} <span className="text-xs text-brand-slate font-normal">USD (FOB)</span>
          </p>
        </div>

        <div className="border-t border-brand-charcoal/10 pt-6 flex flex-col space-y-4">
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-brand-gold hover:bg-brand-charcoal text-white text-xs uppercase tracking-widest py-4 transition-all duration-300 rounded-[2px] font-semibold flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
          >
            <span>Inquire on WhatsApp</span>
          </button>
        </div>

        {/* Embedded Inquiry Form */}
        <div className="border border-brand-charcoal/10 p-6 rounded-[2px] bg-brand-ivory shadow-sm">
          <h3 className="font-display text-lg text-brand-charcoal mb-4">
            Request Certificate & Details
          </h3>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-[11px] uppercase tracking-widest text-brand-slate mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formState.name}
                onChange={handleInputChange}
                className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] transition-colors"
                placeholder="Full Name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-[11px] uppercase tracking-widest text-brand-slate mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleInputChange}
                  className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] transition-colors"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-[11px] uppercase tracking-widest text-brand-slate mb-1">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                  className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] transition-colors"
                  placeholder="+1..."
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-[11px] uppercase tracking-widest text-brand-slate mb-1">Inquiry Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                value={formState.message}
                onChange={handleInputChange}
                className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] transition-colors resize-none"
              />
            </div>

            {status.message && (
              <div
                className={`p-3 text-xs rounded-[2px] ${
                  status.type === 'success' ? 'bg-brand-gold/10 text-brand-gold' : 'bg-red-500/10 text-red-700'
                }`}
              >
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-charcoal hover:bg-brand-gold text-white text-xs uppercase tracking-widest py-3 transition-colors duration-300 rounded-[2px] cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Submitting Request...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
