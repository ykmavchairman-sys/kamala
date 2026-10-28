import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Award,
  Maximize2,
  RotateCcw,
  MessageSquare,
  Lock,
  Eye
} from 'lucide-react';
import { GemstoneRecommendation, JewelryItem } from '../types/astrology';
import { JEWELRY_CATALOG, NAVARATNA_DATABASE } from '../utils/astrologyEngine';
import { GemstoneGraphic } from './GemstoneGraphic';
import { bellPlayer } from '../utils/audioBell';

interface Props {
  recommendedStone?: GemstoneRecommendation;
  onOpenBooking: () => void;
}

export const JewelryCustomizer: React.FC<Props> = ({ recommendedStone, onOpenBooking }) => {
  // Available jewellery models
  const [selectedJewelId, setSelectedJewelId] = useState<string>(JEWELRY_CATALOG[0].id);
  const selectedJewel = JEWELRY_CATALOG.find((j) => j.id === selectedJewelId) || JEWELRY_CATALOG[0];

  // Selected Gemstone
  const [gemKey, setGemKey] = useState<string>(
    recommendedStone
      ? Object.keys(NAVARATNA_DATABASE).find(k => NAVARATNA_DATABASE[k].name === recommendedStone.name) || 'Ruby'
      : 'Ruby'
  );

  useEffect(() => {
    if (recommendedStone) {
      const matchKey = Object.keys(NAVARATNA_DATABASE).find(
        (k) => NAVARATNA_DATABASE[k].planet === recommendedStone.planet || NAVARATNA_DATABASE[k].name === recommendedStone.name
      );
      if (matchKey) setGemKey(matchKey);
    }
  }, [recommendedStone]);

  const activeGemData = NAVARATNA_DATABASE[gemKey] || NAVARATNA_DATABASE.Ruby;

  // Metal Selection
  const [selectedMetalIdx, setSelectedMetalIdx] = useState<number>(0);
  const activeMetal = selectedJewel.availableMetals[selectedMetalIdx] || selectedJewel.availableMetals[0];

  // Cut Selection
  const [selectedCut, setSelectedCut] = useState<'oval' | 'cushion' | 'emerald' | 'round' | 'cabochon'>('oval');

  // Carat & Ratti Slider
  const defaultRatti = recommendedStone ? recommendedStone.recommendedRatti : 5.5;
  const [ratti, setRatti] = useState<number>(defaultRatti);

  // Open-back skin touch toggle
  const [openBackSkinTouch, setOpenBackSkinTouch] = useState<boolean>(true);

  // Calculate dynamic price
  const baseCraftPrice = selectedJewel.basePriceINR * activeMetal.priceMultiplier;
  const gemPrice = activeGemData.estimatedPricePerCaratINR * (ratti * 0.912);
  const totalPriceINR = Math.round((baseCraftPrice + gemPrice) / 500) * 500;

  const handleGemSelect = (key: string) => {
    setGemKey(key);
    bellPlayer.playBell(587);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Namaste Sri Kamala Jewellers! I would like to inquire about the custom "${selectedJewel.title}" with a certified natural ${activeGemData.name} (${ratti} Ratti / ${Math.round(ratti * 0.912 * 100) / 100} Carats) in ${activeMetal.name}. Open-back skin setting: ${openBackSkinTouch ? 'YES' : 'Standard'}. Estimated quote: ₹${totalPriceINR.toLocaleString('en-IN')}. Please provide available gem videos and certification details.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Atelier Title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 dark:bg-stone-800 border border-[#CC338B]/30 text-[#CC338B] text-xs font-bold mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#CC338B]" />
          ATELIER LUCKY STONE GURU • SRI KAMALA JEWELLERS
        </div>
        <h2 className="font-serif-royal text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white">
          Vedic Jewellery <span className="text-[#CC338B]">Customizer & Studio</span>
        </h2>
        <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed font-medium">
          Configure your bespoke astrological jewel. Every piece is handcrafted with an authentic open-back setting, ensuring the gemstone’s optical pavilion touches your skin for optimal planetary transmission.
        </p>
      </div>

      {/* Main Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive 3D Canvas / Jewel Visualizer */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 shadow-[0_12px_45px_rgba(204,51,139,0.10)] relative overflow-hidden border-2 border-[#CC338B]/30">
          {/* Top Visualizer Control Bar */}
          <div className="flex items-center justify-between gap-2 text-xs mb-4">
            <span className="flex items-center gap-1.5 text-[#CC338B] font-bold">
              <Eye className="w-4 h-4 text-[#CC338B]" />
              Live Jyotish Atelier Preview
            </span>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-pink-50 dark:bg-stone-800 border border-[#CC338B]/30 text-[#CC338B] text-[10px] font-bold">
                {activeMetal.purity}
              </span>
              <button
                onClick={() => bellPlayer.playBell(528)}
                title="Ring Bell"
                className="p-1.5 rounded-xl bg-white dark:bg-stone-800 border border-[#CC338B]/30 text-[#CC338B] hover:opacity-80 shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Visual Jewel Mockup Display (Ivory Mount) */}
          <div className="relative aspect-[4/3] w-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF9F6] to-[#F5EFF3] dark:from-[#1D131A] dark:to-[#140D12] rounded-2xl border border-[#CC338B]/20 flex items-center justify-center p-6 overflow-hidden shadow-inner">
            {/* Ambient Radial Gemstone Shimmer */}
            <div
              className="absolute inset-0 rounded-full blur-[80px] opacity-35 transition-all duration-700 pointer-events-none"
              style={{ background: activeGemData.hexColor }}
            />

            {/* Visual Chassis Renderer */}
            <div className="relative flex flex-col items-center justify-center transition-all duration-500">
              {/* Jewel Chassis SVG Mockup */}
              <div className="relative w-64 sm:w-80 h-64 sm:h-80 flex items-center justify-center">
                <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_18px_35px_rgba(204,51,139,0.20)]">
                  <defs>
                    <linearGradient id="metalGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="25%" stopColor={activeMetal.colorHex} />
                      <stop offset="75%" stopColor={activeMetal.colorHex} />
                      <stop offset="100%" stopColor="#8C0E56" />
                    </linearGradient>
                  </defs>

                  {/* Ring Band (Lower Loop) */}
                  {selectedJewel.category === 'ring' && (
                    <g>
                      <path
                        d="M 50 160 C 50 250, 250 250, 250 160 C 230 160, 230 220, 150 220 C 70 220, 70 160, 50 160 Z"
                        fill="url(#metalGradLight)"
                        stroke="#8C0E56"
                        strokeWidth="1.5"
                      />
                      {/* Vedic Skin-Touch Open Back Aperture Highlight */}
                      {openBackSkinTouch && (
                        <g>
                          <ellipse cx="150" cy="155" rx="36" ry="18" fill="none" stroke="#CC338B" strokeWidth="2" strokeDasharray="3,3" />
                          <text x="150" y="195" textAnchor="middle" fill="#CC338B" fontSize="10" fontWeight="bold">
                            ✦ Vedic Skin-Touch Aperture
                          </text>
                        </g>
                      )}
                      {/* Heavy Bezel Setting / Crown */}
                      <path
                        d="M 85 140 L 95 160 L 205 160 L 215 140 Z"
                        fill="url(#metalGradLight)"
                        stroke="#5A1038"
                        strokeWidth="1"
                      />
                      {/* Four/Eight Prongs or Signet Collar */}
                      <circle cx="95" cy="135" r="7" fill="url(#metalGradLight)" stroke="#3a0423" strokeWidth="1" />
                      <circle cx="205" cy="135" r="7" fill="url(#metalGradLight)" stroke="#3a0423" strokeWidth="1" />
                    </g>
                  )}

                  {/* Pendant Loop */}
                  {selectedJewel.category === 'pendant' && (
                    <g>
                      {/* Bale Loop */}
                      <path d="M 140 40 C 140 20, 160 20, 160 40 L 160 70 L 140 70 Z" fill="url(#metalGradLight)" stroke="#3a0423" strokeWidth="1" />
                      {/* Mandala Outer Ring */}
                      <circle cx="150" cy="150" r="95" fill="none" stroke="url(#metalGradLight)" strokeWidth="12" />
                      <circle cx="150" cy="150" r="85" fill="none" stroke="#CC338B" strokeWidth="1.5" strokeDasharray="4,4" />
                      {/* Gayatri Solar Rays */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                        <line
                          key={angle}
                          x1="150"
                          y1="50"
                          x2="150"
                          y2="30"
                          stroke="url(#metalGradLight)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          transform={`rotate(${angle} 150 150)`}
                        />
                      ))}
                    </g>
                  )}

                  {/* Bracelet / Kada Form */}
                  {selectedJewel.category === 'bracelet' && (
                    <g>
                      <ellipse cx="150" cy="150" rx="110" ry="80" fill="none" stroke="url(#metalGradLight)" strokeWidth="22" strokeDasharray="600" strokeDashoffset="120" />
                      {/* Left Terminal Bezel */}
                      <circle cx="95" cy="85" r="16" fill="url(#metalGradLight)" />
                      {/* Right Terminal Bezel */}
                      <circle cx="205" cy="85" r="16" fill="url(#metalGradLight)" />
                    </g>
                  )}
                </svg>

                {/* Central Mounted Gemstone */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none transform -translate-y-2">
                  <div className="gem-facet-shine">
                    <GemstoneGraphic
                      hexColor={activeGemData.hexColor}
                      glowColor={activeGemData.glowColor}
                      size={selectedJewel.category === 'bracelet' ? 80 : 130}
                      cut={selectedCut}
                    />
                  </div>
                </div>
              </div>

              {/* Setting Description Banner */}
              <div className="mt-2 text-center">
                <span className="font-serif-royal text-base font-bold text-stone-900 dark:text-white">
                  {selectedJewel.title}
                </span>
                <p className="text-xs text-[#CC338B] font-bold mt-0.5">
                  Featuring Natural {activeGemData.name} ({ratti} Ratti) in {activeMetal.name}
                </p>
              </div>
            </div>

            {/* Hallmark & Certification Badges Floating */}
            <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-stone-900/95 backdrop-blur border border-[#CC338B]/30 px-3 py-1.5 rounded-xl text-[11px] text-stone-800 dark:text-stone-200 font-bold flex items-center gap-2 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#CC338B]" />
              <span>BIS 916 Hallmark • IGI Lab Certified</span>
            </div>

            <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-stone-900/95 backdrop-blur border border-[#CC338B]/30 px-3 py-1.5 rounded-xl text-[11px] text-[#CC338B] font-bold flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#CC338B]" />
              <span>{openBackSkinTouch ? 'Skin-Touch Bezel Active' : 'Closed Back'}</span>
            </div>
          </div>

          {/* Skin Touch Jyotish Education Box */}
          <div className="mt-4 p-4 rounded-2xl bg-pink-50/50 dark:bg-stone-900 border border-[#CC338B]/30 flex items-start gap-3 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-stone-800 text-[#CC338B] flex items-center justify-center shrink-0 mt-0.5">
              <Maximize2 className="w-4 h-4" />
            </div>
            <div className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
              <span className="font-bold text-[#CC338B] block">
                The Sacred Vedic Skin-Touch Rule (Varahamihira Shastra):
              </span>
              Gemstones are cosmic electromagnetic prisms. For the astrological rays to absorb into the body’s lymphatic meridian points, Sri Kamala Jewellers leaves the underside of the bezel hollow so the pointed culet/pavilion touches your skin continuously.
            </div>
          </div>
        </div>

        {/* Right: Customization Controls & Specifications */}
        <div className="lg:col-span-5 space-y-6">
          {/* Step 1: Select Jewelry Model */}
          <div className="glass-card rounded-3xl p-5 space-y-3 border border-[#CC338B]/20 shadow-sm">
            <label className="text-xs font-bold text-[#CC338B] uppercase tracking-widest block flex items-center justify-between">
              <span>1. Select Jewelry Style</span>
              <span className="text-[10px] text-stone-500 font-medium">Sri Kamala Signature Line</span>
            </label>
            <div className="space-y-2">
              {JEWELRY_CATALOG.map((j) => (
                <button
                  key={j.id}
                  onClick={() => {
                    setSelectedJewelId(j.id);
                    bellPlayer.playBell(587);
                  }}
                  className={`w-full p-3 rounded-2xl text-left border transition flex items-center justify-between ${
                    selectedJewelId === j.id
                      ? 'bg-pink-50 dark:bg-stone-800 border-[#CC338B] text-stone-900 dark:text-white shadow-sm ring-1 ring-[#CC338B]'
                      : 'bg-white/80 dark:bg-stone-900 border-[#CC338B]/20 text-stone-700 dark:text-stone-300 hover:border-[#CC338B]'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold font-serif-royal text-stone-900 dark:text-white">{j.title}</p>
                    <span className="text-[10px] text-[#CC338B] block mt-0.5 font-medium">{j.style}</span>
                  </div>
                  <span className="text-xs font-extrabold text-[#CC338B]">
                    From ₹{j.basePriceINR.toLocaleString('en-IN')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Navaratna Gemstone */}
          <div className="glass-card rounded-3xl p-5 space-y-3 border border-[#CC338B]/20 shadow-sm">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#CC338B] uppercase tracking-widest block">
                2. Choose Astrological Gemstone
              </label>
              {recommendedStone && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-100 dark:bg-stone-800 text-[#CC338B] border border-[#CC338B]/30 font-bold">
                  Recommended: {recommendedStone.planet}
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {Object.keys(NAVARATNA_DATABASE).map((k) => {
                const gem = NAVARATNA_DATABASE[k];
                const isSelected = gemKey === k;
                return (
                  <button
                    key={k}
                    onClick={() => handleGemSelect(k)}
                    className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                      isSelected
                        ? 'bg-pink-50 dark:bg-stone-800 border-[#CC338B] text-stone-950 dark:text-white font-bold shadow-sm ring-1 ring-[#CC338B]'
                        : 'bg-white/80 dark:bg-stone-900 border-[#CC338B]/20 text-stone-600 dark:text-stone-300 hover:border-[#CC338B]'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full shadow-inner border border-stone-200"
                      style={{ background: gem.hexColor }}
                    />
                    <div className="text-[11px] font-bold leading-tight truncate w-full">
                      {gem.name.split(' ')[0]}
                    </div>
                    <span className="text-[9px] text-[#CC338B] font-semibold">{gem.planet}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Precious Metal Selection */}
          <div className="glass-card rounded-3xl p-5 space-y-3 border border-[#CC338B]/20 shadow-sm">
            <label className="text-xs font-bold text-[#CC338B] uppercase tracking-widest block">
              3. Precious Metal & Vedic Alloy
            </label>
            <div className="space-y-2">
              {selectedJewel.availableMetals.map((metal, idx) => (
                <button
                  key={metal.name}
                  onClick={() => {
                    setSelectedMetalIdx(idx);
                    bellPlayer.playBell(659);
                  }}
                  className={`w-full p-2.5 rounded-2xl text-left border transition flex items-center justify-between ${
                    selectedMetalIdx === idx
                      ? 'bg-pink-50 dark:bg-stone-800 border-[#CC338B] text-stone-950 dark:text-white font-bold shadow-xs'
                      : 'bg-white/80 dark:bg-stone-900 border-[#CC338B]/20 text-stone-700 dark:text-stone-300 hover:border-[#CC338B]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full border border-stone-300 shadow-2xs"
                      style={{ background: metal.colorHex }}
                    />
                    <div>
                      <p className="text-xs font-bold text-stone-900 dark:text-white">{metal.name}</p>
                      <span className="text-[10px] text-[#CC338B] font-semibold">{metal.purity}</span>
                    </div>
                  </div>
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      selectedMetalIdx === idx ? 'text-[#CC338B]' : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Gemstone Cut & Weight (Ratti/Carat) */}
          <div className="glass-card rounded-3xl p-5 space-y-4 border border-[#CC338B]/20 shadow-sm">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#CC338B] uppercase tracking-widest block">
                4. Gemstone Cut & Size (Ratti)
              </label>
              <span className="text-[11px] font-bold text-[#CC338B]">
                {ratti} Ratti ({Math.round(ratti * 0.912 * 100) / 100} Carats)
              </span>
            </div>

            {/* Cut Selector */}
            <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
              {(['oval', 'cushion', 'emerald', 'round', 'cabochon'] as const).map((cutName) => (
                <button
                  key={cutName}
                  onClick={() => setSelectedCut(cutName)}
                  className={`py-1.5 px-1 rounded-xl capitalize border text-[11px] font-bold transition ${
                    selectedCut === cutName
                      ? 'btn-magenta shadow-xs'
                      : 'bg-white/90 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-[#CC338B]/20 hover:border-[#CC338B]'
                  }`}
                >
                  {cutName}
                </button>
              ))}
            </div>

            {/* Ratti Slider */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1 font-medium">
                <span>Min: 3.25 Ratti</span>
                <span className="text-[#CC338B] font-bold">Vedic Recommended: {defaultRatti} Ratti</span>
                <span>Max: 12.0 Ratti</span>
              </div>
              <input
                type="range"
                min="3.25"
                max="12.0"
                step="0.25"
                value={ratti}
                onChange={(e) => setRatti(Number(e.target.value))}
                className="w-full accent-[#CC338B] cursor-pointer"
              />
            </div>

            {/* Open Back Setting Toggle */}
            <div className="pt-2 flex items-center justify-between border-t border-[#CC338B]/20">
              <div>
                <span className="text-xs font-bold text-stone-900 dark:text-white block">
                  Vedic Skin-Contact Bezel
                </span>
                <span className="text-[10px] text-stone-500 font-medium">
                  Allows gemstone culet to directly touch finger skin
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpenBackSkinTouch(!openBackSkinTouch)}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  openBackSkinTouch ? 'bg-[#CC338B]' : 'bg-stone-300 dark:bg-stone-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    openBackSkinTouch ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Pricing Summary & Checkout / Consultation (Pearl White & Magenta) */}
          <div className="glass-card rounded-3xl p-6 shadow-[0_12px_45px_rgba(204,51,139,0.12)] space-y-4 border-2 border-[#CC338B]/40">
            <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300 border-b border-[#CC338B]/20 pb-3 font-medium">
              <div className="flex justify-between">
                <span>{selectedJewel.title} ({activeMetal.name})</span>
                <span className="text-stone-900 dark:text-white font-bold">₹{Math.round(baseCraftPrice).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>
                  Certified {activeGemData.name} ({ratti} Ratti)
                </span>
                <span className="text-stone-900 dark:text-white font-bold">₹{Math.round(gemPrice).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-bold">
                <span>Vedic Prana Pratishtha & Pooja Energization</span>
                <span>INCLUDED (Complimentary)</span>
              </div>
              <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-bold">
                <span>IGI / GIA Lab Certificate & BIS Hallmark</span>
                <span>INCLUDED</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#CC338B] block font-bold">
                  Total Estimated Investment (INR)
                </span>
                <span className="font-serif-royal text-2xl sm:text-3xl font-extrabold text-stone-950 dark:text-white">
                  ₹{totalPriceINR.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-[10px] text-stone-500 text-right font-medium">
                All Taxes & Insured<br />Delivery Included
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="w-full py-3 px-4 rounded-xl btn-magenta-outline font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                Inquire on WhatsApp
              </button>

              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full py-3 px-4 rounded-xl btn-magenta font-bold text-xs uppercase tracking-wider hover:brightness-105 shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white" />
                Book Astrologer Review
              </button>
            </div>

            <p className="text-[10px] text-stone-500 text-center flex items-center justify-center gap-1 font-medium">
              <Lock className="w-3 h-3 text-[#CC338B]" />
              100% Certified Ethical Mines • 30-Day Money Back Guarantee by Sri Kamala Jewellers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
