import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Star, ArrowRight, Gem } from 'lucide-react';
import { JEWELRY_CATALOG, NAVARATNA_DATABASE } from '../utils/astrologyEngine';
import { GemstoneRecommendation } from '../types/astrology';
import { GemstoneGraphic } from './GemstoneGraphic';
import { bellPlayer } from '../utils/audioBell';

interface Props {
  onCustomizeItem: (jewelId: string, gemKey?: string) => void;
  onSelectGemstone: (stone: GemstoneRecommendation) => void;
}

export const JewelryCatalog: React.FC<Props> = ({ onCustomizeItem }) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'ring' | 'pendant' | 'bracelet' | 'loose'>('all');

  const filteredItems = JEWELRY_CATALOG.filter((item) => {
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    return true;
  });

  const looseGems = Object.keys(NAVARATNA_DATABASE).map((k) => ({
    key: k,
    ...NAVARATNA_DATABASE[k],
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Catalog Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          GOVT. REGISTERED & IGI CERTIFIED • LUCKY STONE GURU
        </div>
        <h2 className="font-serif-royal text-2xl sm:text-4xl font-extrabold text-stone-900">
          Lucky Stone Guru <span className="text-gold-gradient">& Sri Kamala Jewellery</span>
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed font-medium">
          Exquisite heirloom jewellery engineered for divine astrological resonance. Each creation features our signature open-back Vedic skin-contact setting with 100% natural, untreated, unheated gemstones.
        </p>

        {/* Filters (Glassmorphic) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Creations' },
            { id: 'ring', label: 'Vedic Rings' },
            { id: 'pendant', label: 'Sacred Pendants' },
            { id: 'bracelet', label: 'Imperial Kadas' },
            { id: 'loose', label: 'Loose Certified Gems' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilterCategory(cat.id as any);
                bellPlayer.playBell(587);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-gradient-to-r from-[#DFB743] to-[#D4AF37] text-stone-950 font-black shadow-sm'
                  : 'bg-white/80 border border-amber-200/70 text-stone-700 hover:border-amber-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loose Gemstones Section if 'loose' or 'all' selected */}
      {(filterCategory === 'loose' || filterCategory === 'all') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-royal text-xl font-bold text-stone-900 flex items-center gap-2">
              <Gem className="w-5 h-5 text-amber-600" />
              The Sacred Navaratna Loose Gemstone Vault
            </h3>
            <span className="text-xs text-amber-900 font-bold">Untreated & Unheated Certified Lots</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {looseGems.map((gem) => (
              <div
                key={gem.key}
                className="glass-card rounded-3xl p-6 shadow-md hover:border-amber-400 transition-all flex flex-col justify-between glass-card-hover border border-amber-200/70"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-amber-800 font-extrabold uppercase tracking-widest block">
                        Deity: {gem.planetSanskrit}
                      </span>
                      <h4 className="font-serif-royal text-lg font-bold text-stone-900 mt-0.5">
                        {gem.name}
                      </h4>
                      <span className="text-xs text-amber-800 font-serif-royal font-semibold">{gem.hindiName}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 px-2.5 py-0.5 bg-emerald-100 rounded-full border border-emerald-300 shadow-2xs">
                      IGI Certified
                    </span>
                  </div>

                  {/* Gem Visual */}
                  <div className="my-4 flex items-center justify-center p-5 bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EB] rounded-2xl border border-amber-200/60 shadow-inner">
                    <GemstoneGraphic
                      hexColor={gem.hexColor}
                      glowColor={gem.glowColor}
                      size={110}
                      cut="oval"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 text-xs text-stone-700 font-medium">
                    <p className="flex justify-between">
                      <span className="text-stone-500">Origin:</span>
                      <span className="font-bold text-stone-900">{gem.originOptions[0]}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-stone-500">Auspicious Day:</span>
                      <span className="font-bold text-stone-900">{gem.auspiciousDay}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-stone-500">Finger:</span>
                      <span className="font-bold text-stone-900">{gem.recommendedFinger}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-amber-200/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-amber-800 block uppercase font-bold">Price From</span>
                    <span className="font-serif-royal text-base font-extrabold text-stone-950">
                      ₹{gem.estimatedPricePerCaratINR.toLocaleString('en-IN')}/ct
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onCustomizeItem(JEWELRY_CATALOG[0].id, gem.key);
                      bellPlayer.playBell(528);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#DFB743] to-[#D4AF37] text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 transition flex items-center gap-1.5 shadow-sm border border-amber-200 cursor-pointer"
                  >
                    Mount in Ring <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Crafted Jewelry Designs */}
      {filterCategory !== 'loose' && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-royal text-xl font-bold text-stone-900">
              Handcrafted Astrological Settings by Sri Kamala Jewellers
            </h3>
            <span className="text-xs text-amber-900 font-bold">Open-Back Bezel Skin Touch Ready</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-3xl p-6 shadow-md hover:border-amber-400 transition-all flex flex-col justify-between glass-card-hover border border-amber-200/70"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] text-amber-800 font-extrabold uppercase tracking-widest block">
                      {item.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-amber-900 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {item.rating} ({item.reviewsCount})
                    </span>
                  </div>

                  <h4 className="font-serif-royal text-lg font-bold text-stone-900 mt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-amber-800 font-bold">{item.style}</p>

                  <p className="text-xs text-stone-600 mt-3 line-clamp-3 leading-relaxed font-medium">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/60 text-xs space-y-1.5 font-medium">
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                      <span>{item.labCertificate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-900">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                      <span>100% Skin-Touch Bezel Engineered</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-200/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-amber-800 block uppercase font-bold">Setting Price</span>
                    <span className="font-serif-royal text-lg font-extrabold text-stone-950">
                      ₹{item.basePriceINR.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onCustomizeItem(item.id);
                      bellPlayer.playBell(587);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFB743] via-[#D4AF37] to-[#B38728] text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 shadow-[0_4px_16px_rgba(212,175,55,0.3)] transition flex items-center gap-1.5 cursor-pointer border border-amber-200"
                  >
                    Configure in Atelier <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
