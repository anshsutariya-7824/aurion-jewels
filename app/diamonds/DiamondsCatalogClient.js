'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export default function DiamondsCatalogClient({ diamonds }) {
  // Filters State
  const [shape, setShape] = useState('All');
  const [caratRange, setCaratRange] = useState('All');
  const [cut, setCut] = useState('All');
  const [color, setColor] = useState('All');
  const [clarity, setClarity] = useState('All');
  const [sortBy, setSortBy] = useState('price-asc');

  // Filter options lists
  const shapes = ['All', 'Round', 'Oval', 'Princess', 'Emerald', 'Pear', 'Cushion'];
  const caratRanges = [
    { label: 'All Carats', value: 'All' },
    { label: 'Under 1.00 ct', value: 'under-1' },
    { label: '1.00 - 1.49 ct', value: '1-1.5' },
    { label: '1.50 - 1.99 ct', value: '1.5-2' },
    { label: '2.00 ct & Above', value: 'above-2' }
  ];
  const cuts = ['All', 'Ideal', 'Excellent', 'Very Good'];
  const colors = ['All', 'D', 'E', 'F', 'G', 'H'];
  const clarities = ['All', 'IF', 'FL', 'VVS1', 'VVS2', 'VS1', 'VS2'];

  // Filtering Logic
  const filteredDiamonds = diamonds.filter((diamond) => {
    if (shape !== 'All' && diamond.shape.toLowerCase() !== shape.toLowerCase()) return false;
    
    if (caratRange !== 'All') {
      const c = diamond.carat;
      if (caratRange === 'under-1' && c >= 1.0) return false;
      if (caratRange === '1-1.5' && (c < 1.0 || c >= 1.5)) return false;
      if (caratRange === '1.5-2' && (c < 1.5 || c >= 2.0)) return false;
      if (caratRange === 'above-2' && c < 2.0) return false;
    }

    if (cut !== 'All' && diamond.cut.toLowerCase() !== cut.toLowerCase()) return false;
    if (color !== 'All' && diamond.color.toUpperCase() !== color.toUpperCase()) return false;
    if (clarity !== 'All' && diamond.clarity.toUpperCase() !== clarity.toUpperCase()) return false;

    return true;
  });

  // Sorting Logic
  const sortedDiamonds = [...filteredDiamonds].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'carat-asc') return a.carat - b.carat;
    if (sortBy === 'carat-desc') return b.carat - a.carat;
    return 0;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Filters */}
      <div className="lg:col-span-1 bg-brand-ivory border border-brand-charcoal/5 p-6 rounded-[2px] shadow-sm h-fit space-y-6">
        <h3 className="font-display text-lg text-brand-charcoal border-b border-brand-charcoal/5 pb-3">
          Refine Search
        </h3>

        {/* Shape Filter */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-brand-slate mb-2 font-semibold">Shape</label>
          <select
            value={shape}
            onChange={(e) => setShape(e.target.value)}
            className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-2 text-sm focus:outline-none rounded-[2px] transition-colors"
          >
            {shapes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Carat Filter */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-brand-slate mb-2 font-semibold">Carat Weight</label>
          <select
            value={caratRange}
            onChange={(e) => setCaratRange(e.target.value)}
            className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-2 text-sm focus:outline-none rounded-[2px] transition-colors"
          >
            {caratRanges.map(cr => <option key={cr.value} value={cr.value}>{cr.label}</option>)}
          </select>
        </div>

        {/* Cut Filter */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-brand-slate mb-2 font-semibold">Cut</label>
          <select
            value={cut}
            onChange={(e) => setCut(e.target.value)}
            className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-2 text-sm focus:outline-none rounded-[2px] transition-colors"
          >
            {cuts.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Color Filter */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-brand-slate mb-2 font-semibold">Color</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-2 text-sm focus:outline-none rounded-[2px] transition-colors"
          >
            {colors.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Clarity Filter */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-brand-slate mb-2 font-semibold">Clarity</label>
          <select
            value={clarity}
            onChange={(e) => setClarity(e.target.value)}
            className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-2 text-sm focus:outline-none rounded-[2px] transition-colors"
          >
            {clarities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Sort Select */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-brand-slate mb-2 font-semibold">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-brand-cream border border-brand-charcoal/10 focus:border-brand-gold p-2 text-sm focus:outline-none rounded-[2px] transition-colors"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="carat-asc">Carat: Low to High</option>
            <option value="carat-desc">Carat: High to Low</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={() => {
            setShape('All');
            setCaratRange('All');
            setCut('All');
            setColor('All');
            setClarity('All');
            setSortBy('price-asc');
          }}
          className="w-full border border-brand-charcoal/10 hover:border-brand-gold hover:text-brand-gold text-brand-charcoal text-xs uppercase tracking-widest py-2.5 bg-transparent transition-colors duration-300 rounded-[2px]"
        >
          Reset Filters
        </button>
      </div>

      {/* Diamonds Content Table */}
      <div className="lg:col-span-3 space-y-6">
        <div className="flex items-center justify-between border-b border-brand-charcoal/5 pb-3">
          <p className="text-sm text-brand-slate">
            Showing <span className="font-semibold text-brand-charcoal">{sortedDiamonds.length}</span> certified diamonds
          </p>
        </div>

        {sortedDiamonds.length === 0 ? (
          <div className="text-center py-20 bg-brand-ivory border border-brand-charcoal/5 rounded-[2px]">
            <p className="font-display italic text-lg text-brand-slate">No diamonds match your specifications.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-brand-charcoal/5 rounded-[2px] bg-brand-ivory shadow-sm">
            <table className="w-full border-collapse text-left text-sm text-brand-slate">
              <thead className="bg-brand-sand border-b border-brand-charcoal/5 text-[11px] uppercase tracking-widest font-semibold text-brand-charcoal">
                <tr>
                  <th className="p-4">Shape</th>
                  <th className="p-4">Carat</th>
                  <th className="p-4">Color</th>
                  <th className="p-4 hidden sm:table-cell">Clarity</th>
                  <th className="p-4 hidden md:table-cell">Cut</th>
                  <th className="p-4 hidden sm:table-cell">Lab</th>
                  <th className="p-4 text-right">Price</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-charcoal/5">
                {sortedDiamonds.map((diamond) => (
                  <tr key={diamond.id} className="hover:bg-brand-cream/30 transition-colors">
                    <td className="p-4 font-semibold text-brand-charcoal">{diamond.shape}</td>
                    <td className="p-4">{diamond.carat.toFixed(2)} ct</td>
                    <td className="p-4">{diamond.color}</td>
                    <td className="p-4 hidden sm:table-cell">{diamond.clarity}</td>
                    <td className="p-4 hidden md:table-cell">{diamond.cut}</td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="bg-brand-cream border border-brand-gold/15 px-2 py-0.5 text-[10px] font-semibold text-brand-gold rounded-[2px]">
                        {diamond.lab}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-brand-charcoal text-right">
                      ${diamond.price.toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/diamonds/${diamond.id}`}
                        className="text-xs uppercase tracking-widest font-semibold text-brand-gold hover:text-brand-charcoal transition-colors"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
