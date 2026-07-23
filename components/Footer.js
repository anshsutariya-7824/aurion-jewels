'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [settings, setSettings] = useState({
    email: 'inquire@aurionjewels.com',
    instagramLink: 'https://instagram.com/aurionjewels',
    facebookLink: 'https://facebook.com/aurionjewels',
    address: '5th Avenue Atelier, New York, NY'
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/inquiries?type=settings');
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setSettings({
              email: data.email || 'inquire@aurionjewels.com',
              instagramLink: data.instagramLink || 'https://instagram.com/aurionjewels',
              facebookLink: data.facebookLink || 'https://facebook.com/aurionjewels',
              address: data.address || '5th Avenue Atelier, New York, NY'
            });
          }
        }
      } catch (err) {
        console.error('Error loading footer settings:', err);
      }
    }
    loadSettings();
  }, []);

  return (
    <footer className="bg-brand-sand border-t border-brand-charcoal/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-brand-slate">
        {/* Brand Information */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <img
              src="/images/logo.png"
              alt="Aurion Jewels Logo"
              className="w-12 h-12 object-contain"
            />
            <span className="font-display text-2xl tracking-widest text-brand-charcoal">
              AURION JEWELS
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Atelier of fine jewelry and certified diamonds. Crafting high-end, timeless pieces of art with meticulous attention to detail.
          </p>
          <div className="pt-2 text-xs uppercase tracking-widest text-brand-gold">
            Est. 2020
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col space-y-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal">
            Collections
          </span>
          <Link href="/collections?cat=Rings" className="text-sm hover:text-brand-gold transition-colors duration-300">
            Rings
          </Link>
          <Link href="/collections?cat=Necklaces" className="text-sm hover:text-brand-gold transition-colors duration-300">
            Necklaces
          </Link>
          <Link href="/collections?cat=Earrings" className="text-sm hover:text-brand-gold transition-colors duration-300">
            Earrings
          </Link>
          <Link href="/collections?cat=Bracelets" className="text-sm hover:text-brand-gold transition-colors duration-300">
            Bracelets
          </Link>
        </div>

        {/* Resources */}
        <div className="flex flex-col space-y-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal">
            Information
          </span>
          <Link href="/about" className="text-sm hover:text-brand-gold transition-colors duration-300">
            Our Craftsmanship
          </Link>
          <Link href="/diamonds" className="text-sm hover:text-brand-gold transition-colors duration-300">
            Certified Diamonds
          </Link>
          <Link href="/contact" className="text-sm hover:text-brand-gold transition-colors duration-300">
            Book an Appointment
          </Link>
        </div>

        {/* Contact info & social */}
        <div className="flex flex-col space-y-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal">
            Atelier
          </span>
          <p className="text-sm leading-relaxed whitespace-pre-line">
            {settings.address}
          </p>
          <p className="text-sm">
            E: <a href={`mailto:${settings.email}`} className="hover:text-brand-gold transition-colors">{settings.email}</a>
          </p>
          <div className="pt-2 flex space-x-4">
            <a
              href={settings.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href={settings.facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors duration-300"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-brand-charcoal/5 flex flex-col md:flex-row items-center justify-between text-xs text-brand-slate/60">
        <p>© {currentYear} Aurion Jewels. All rights reserved.</p>
        <p className="mt-2 md:mt-0 uppercase tracking-widest">
          Handcrafted in Atelier
        </p>
      </div>
    </footer>
  );
}
