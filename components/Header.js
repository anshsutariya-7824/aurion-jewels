'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll detection to add solid shadow/opacity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'Diamonds', href: '/diamonds' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-header shadow-sm py-3 sm:py-4'
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center space-x-3">
          <img
            src="/images/logo.png"
            alt="Aurion Jewels Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl tracking-widest text-brand-charcoal group-hover:text-brand-gold transition-colors duration-300 whitespace-nowrap">
              AURION JEWELS
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-brand-slate opacity-75 -mt-1 pl-[2px]">
              Fine Jewelry
            </span>
          </div>
        </Link>



        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm tracking-widest uppercase transition-all duration-300 relative py-1 ${
                  isActive
                    ? 'text-brand-gold'
                    : 'text-brand-charcoal hover:text-brand-gold'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-gold transform scale-x-100 transition-transform duration-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Call to Action Button */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="text-xs uppercase tracking-widest border border-brand-gold/40 hover:border-brand-gold px-6 py-2.5 text-brand-charcoal bg-transparent hover:bg-brand-gold hover:text-white transition-all duration-300 rounded-[2px]"
          >
            Inquire Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center p-2 text-brand-charcoal focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={`w-full h-[1px] bg-brand-charcoal transition-all duration-300 origin-left ${
                isOpen ? 'rotate-45 translate-x-1' : ''
              }`}
            />
            <span
              className={`w-full h-[1px] bg-brand-charcoal transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-full h-[1px] bg-brand-charcoal transition-all duration-300 origin-left ${
                isOpen ? '-rotate-45 translate-x-1' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-brand-ivory border-b border-brand-charcoal/5 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 max-h-screen py-6'
            : 'opacity-0 max-h-0 overflow-hidden pointer-events-none'
        }`}
      >
        <div className="px-6 flex flex-col space-y-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm tracking-widest uppercase py-2 transition-all duration-300 ${
                  isActive ? 'text-brand-gold font-medium' : 'text-brand-charcoal hover:text-brand-gold'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="text-xs uppercase tracking-widest border border-brand-gold/60 text-center py-3 text-brand-charcoal hover:bg-brand-gold hover:text-white transition-all duration-300"
          >
            Inquire Now
          </Link>
        </div>
      </div>
    </header>
  );
}
