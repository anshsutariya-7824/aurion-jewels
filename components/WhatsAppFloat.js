'use client';

import { useState, useEffect } from 'react';

export default function WhatsAppFloat() {
  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/inquiries'); // We can fetch from inquiries API or create a separate /api/settings. Let's make an API call to get configuration.
        // Actually, we'll fetch from a dedicated settings API or inquiries API
        const settingsRes = await fetch('/api/products?settings=true'); // We can add settings query to products route, or a specific endpoint. Let's fetch from `/api/inquiries?settings=true` or make a `/api/products` helper.
        // Let's create a solid /api/inquiries route that can also return settings or load it.
        // Let's call /api/inquiries which we will configure to support GET for settings or similar, or just create /api/products?settings=true.
        // Better yet: we'll build a clean settings API or just fetch from /api/inquiries.
        // Let's call `/api/inquiries` and if we add a 'settings' endpoint, it's very clean.
        // Let's assume we can fetch it at '/api/inquiries?type=settings'
        const response = await fetch('/api/inquiries?type=settings');
        if (response.ok) {
          const data = await response.json();
          if (data && data.whatsappNumber) {
            setWhatsappNumber(data.whatsappNumber);
            return;
          }
        }
      } catch (err) {
        console.error('Error fetching settings for WhatsApp float:', err);
      }
      // Fallback
      setWhatsappNumber('+15550199');
    };

    fetchSettings();
  }, []);

  const handleWhatsAppClick = () => {
    const cleanNumber = whatsappNumber.replace(/[^0-9+]/g, '');
    const message = encodeURIComponent(
      "Hello Aurion Jewels, I am browsing your fine jewelry collection and would like to make an inquiry."
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-8 right-8 z-40 bg-brand-ivory text-brand-gold hover:text-brand-charcoal border border-brand-gold/30 hover:border-brand-gold shadow-lg w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 glass-card cursor-pointer group"
      title="Inquire on WhatsApp"
      aria-label="Inquire on WhatsApp"
    >
      <svg
        className="w-7 h-7 fill-current transition-transform duration-300 group-hover:rotate-12"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.42 9.86-9.864.001-2.636-1.02-5.11-2.871-6.963C16.6 2.054 14.12 1.025 11.996 1.025c-5.452 0-9.88 4.417-9.882 9.862-.001 1.762.463 3.484 1.347 5.02L2.493 21.5l5.881-1.542.273-.153.001-.001zm10.233-6.607c-.266-.134-1.57-.775-1.814-.863-.243-.089-.42-.134-.596.13-.176.264-.68.864-.834 1.04-.155.176-.31.197-.577.063-.267-.134-1.13-.417-2.153-1.328-.795-.71-1.332-1.587-1.488-1.854-.155-.266-.016-.41.117-.542.121-.12.266-.31.4-.464.133-.155.177-.265.266-.442.09-.176.044-.33-.022-.464-.066-.134-.596-1.436-.817-1.97-.215-.518-.432-.447-.597-.456-.153-.008-.33-.009-.507-.009-.176 0-.464.066-.707.33-.243.264-.927.906-.927 2.208s.95 2.56 1.083 2.737c.133.176 1.87 2.855 4.53 4.004.633.273 1.127.436 1.512.559.636.202 1.213.174 1.67.108.51-.074 1.57-.642 1.79-1.262.22-.619.22-1.15.155-1.262-.066-.113-.243-.177-.51-.31z" />
      </svg>
    </button>
  );
}
