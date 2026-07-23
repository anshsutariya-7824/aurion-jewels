'use client';

import { useState, useEffect } from 'react';

export default function ContactFormClient() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: ''
  });

  const [settings, setSettings] = useState({
    email: 'inquire@aurionjewels.com',
    whatsappNumber: '+15550199',
    address: '5th Avenue Atelier, New York, NY',
    mapLink: ''
  });

  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/inquiries?type=settings');
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setSettings({
              email: data.email || 'inquire@aurionjewels.com',
              whatsappNumber: data.whatsappNumber || '+15550199',
              address: data.address || '5th Avenue Atelier, New York, NY',
              mapLink: data.mapLink || ''
            });
          }
        }
      } catch (err) {
        console.error('Error loading contact settings:', err);
      }
    }
    loadSettings();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const type = params.get('type');
      if (type && ['general', 'bespoke', 'diamonds', 'wholesale'].includes(type)) {
        setFormState((prev) => ({ ...prev, inquiryType: type }));
      }
    }
  }, []);


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
          type: 'general',
          itemId: formState.inquiryType // store inquiry type as itemId for reference
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been received. Our team will get back to you within 24 hours.'
        });
        setFormState({
          name: '',
          email: '',
          phone: '',
          inquiryType: 'general',
          message: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Failed to submit form. Please try again.'
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      {/* Left side: Information */}
      <div className="lg:col-span-5 flex flex-col space-y-8">
        <div>
          <h2 className="font-display text-2xl text-brand-charcoal font-light mb-4">
            Visit the Atelier
          </h2>
          <p className="text-brand-slate text-sm sm:text-base leading-relaxed">
            Consultations are available by private appointment at our Manhattan studio. Fill out the catalog inquiry form or contact our concierge directly on WhatsApp.
          </p>
        </div>

        <div className="space-y-4 border-t border-brand-charcoal/5 pt-6 text-sm">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold mb-1">
              Address
            </span>
            <span className="text-brand-charcoal font-medium">
              {settings.address}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold mb-1">
              Email Correspondence
            </span>
            <a href={`mailto:${settings.email}`} className="text-brand-charcoal font-medium hover:text-brand-gold transition-colors">
              {settings.email}
            </a>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold mb-1">
              WhatsApp Concierge
            </span>
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9+]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-charcoal font-medium hover:text-brand-gold transition-colors"
            >
              {settings.whatsappNumber}
            </a>
          </div>
        </div>

        <div className="border-t border-brand-charcoal/5 pt-6">
          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold mb-3 block">
            Location Map
          </span>
          <iframe
            src={settings.mapLink || `https://maps.google.com/maps?q=${encodeURIComponent(settings.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="220"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-[2px] border border-brand-charcoal/10 grayscale hover:grayscale-0 contrast-110 opacity-90 hover:opacity-100 transition-all duration-700"
          ></iframe>
        </div>

        <div className="border-t border-brand-charcoal/5 pt-6 hidden lg:block">
          <p className="text-xs text-brand-slate leading-relaxed">
            * Wholesale exporter pricing and customized alloy specifications are available to certified retail distributors. Please state your business credentials in your message.
          </p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="lg:col-span-7 bg-brand-ivory border border-brand-charcoal/5 p-8 rounded-[2px] shadow-sm">
        <h3 className="font-display text-xl text-brand-charcoal mb-6">
          Send an Inquiry
        </h3>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-[11px] uppercase tracking-widest text-brand-slate mb-1">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formState.name}
              onChange={handleInputChange}
              className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-[11px] uppercase tracking-widest text-brand-slate mb-1">Email Address</label>
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
              <label htmlFor="phone" className="block text-[11px] uppercase tracking-widest text-brand-slate mb-1">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={handleInputChange}
                className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] transition-colors"
                placeholder="+1 (555) 0123"
              />
            </div>
          </div>

          <div>
            <label htmlFor="inquiryType" className="block text-[11px] uppercase tracking-widest text-brand-slate mb-1">Inquiry Type</label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formState.inquiryType}
              onChange={handleInputChange}
              className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] transition-colors"
            >
              <option value="general">General Client Inquiry</option>
              <option value="bespoke">Bespoke Design Commission</option>
              <option value="diamonds">Diamond Sourcing Request</option>
              <option value="wholesale">Wholesale & Export Inquiry</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-[11px] uppercase tracking-widest text-brand-slate mb-1">Message Detail</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              required
              value={formState.message}
              onChange={handleInputChange}
              className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-3 text-sm focus:outline-none rounded-[2px] transition-colors resize-none"
              placeholder="Describe your request..."
            />
          </div>

          {status.message && (
            <div
              className={`p-4 text-sm rounded-[2px] ${
                status.type === 'success' ? 'bg-brand-gold/10 text-brand-gold' : 'bg-red-500/10 text-red-700'
              }`}
            >
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-charcoal hover:bg-brand-gold text-white text-xs uppercase tracking-widest py-4 transition-colors duration-300 rounded-[2px] font-semibold cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Submitting Form...' : 'Submit Inquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}
