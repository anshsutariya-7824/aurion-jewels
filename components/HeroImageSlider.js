'use client';

import { useState, useEffect } from 'react';

export default function HeroImageSlider({ images = [] }) {
  // Fallback to initial image if array is empty or invalid
  const sliderImages = images && images.length > 0
    ? images
    : ['/images/hero-diamond-ring.png'];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (sliderImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3000); // Transitions every 3 seconds

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <div className="relative w-full h-full">
      {sliderImages.map((src, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={src + index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={src}
              alt={`Premium jewelry showcase ${index + 1}`}
              className={`w-full h-full object-cover opacity-95 transition-transform duration-[4000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        );
      })}

      {/* Subtle indicator dots */}
      {sliderImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20 bg-brand-charcoal/10 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/10">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-brand-gold w-4' : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
