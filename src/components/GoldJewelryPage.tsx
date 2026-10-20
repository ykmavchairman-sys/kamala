import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Star,
  MessageSquare,
  Calculator,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Layers,
  Scale
} from 'lucide-react';
import {
  SRI_KAMALA_GOLD_PRODUCTS,
  LIVE_GOLD_RATES,
  calculateGoldPrice,
  GoldProduct
} from '../data/goldCatalog';
import { GoldProductIllustration } from './GoldProductIllustration';
import { bellPlayer } from '../utils/audioBell';

interface Props {
  onOpenBooking: () => void;
}

export const GoldJewelryPage: React.FC<Props> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPurity, setSelectedPurity] = useState<string>('all');
  const [calculatingProduct, setCalculatingProduct] = useState<GoldProduct | null>(null);

  // Custom Gold Calculator State
  const [calcWeight, setCalcWeight] = useState<number>(25);
  const [calcKarat, setCalcKarat] = useState<22 | 18>(22);
  const [calcMakingPercent, setCalcMakingPercent] = useState<number>(10);

  const filteredProducts = SRI_KAMALA_GOLD_PRODUCTS.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedPurity !== 'all' && !item.purity.startsWith(selectedPurity)) return false;
    return true;
  });

  const handleWhatsAppProduct = (item: GoldProduct) => {
    const pricing = calculateGoldPrice(item);
    const text = encodeURIComponent(
      `Namaste Sri Kamala Jewellers! I am interested in purchasing "${item.title}" (${item.purity}, Approx Weight: ${item.weightGrams}g, SKU: ${item.id}). Estimated Price: ₹${pricing.totalPrice.toLocaleString('en-IN')}. Please share available live videos and showroom availability.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  // Custom Calculation
  const currentRate = calcKarat === 22 ? LIVE_GOLD_RATES.rate22KPerGram : LIVE_GOLD_RATES.rate18KPerGram;
  const customGoldCost = Math.round(calcWeight * currentRate);
  const customMakingCost = Math.round((customGoldCost * calcMakingPercent) / 100);
  const customGst = Math.round((customGoldCost + customMakingCost) * 0.03);
  const customTotal = customGoldCost + customMakingCost + customGst;

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 text-xs font-bold mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          SRI KAMALA JEWELLERS • GOLD ATELIER
        </div>
        <h1 className="font-serif-royal text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          Pure 22K & 18K <span className="text-gold-gradient">Gold Jewellery</span>
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed font-medium">
          Handcrafted in Chennai, Mumbai, & Varanasi ateliers. Every masterpiece is crafted in BIS 916 Hallmarked gold with laser-inscribed HUID numbers, zero cadmium soldering, and pure heirloom craftsmanship.
        </p>
      </div>

      {/* Live Gold Rate Ticker (Glassmorphism Gold) */}
      <div className="glass-card-gold rounded-3xl p-5 shadow-[0_10px_35px_rgba(212,175,55,0.12)] border border-amber-300/80">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-900 border border-amber-400 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-royal font-extrabold text-stone-950 text-sm sm:text-base">
                  Live Gold Spot Rates
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[11px] text-stone-500 font-medium">
                Transparent MCX Spot Ticker • {LIVE_GOLD_RATES.lastUpdated}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <div className="px-3.5 py-2 rounded-2xl bg-white/90 border border-amber-200/80 shadow-2xs">
              <span className="text-[10px] text-stone-500 uppercase font-semibold block">24K Pure Gold (999)</span>
              <span className="text-sm font-bold text-stone-950">₹{LIVE_GOLD_RATES.rate24KPerGram.toLocaleString('en-IN')}/g</span>
            </div>

            <div className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-[#FAF2DA] to-[#F5E6BD] border border-amber-300 shadow-2xs">
              <span className="text-[10px] text-amber-900 uppercase font-extrabold block">22K Hallmarked (916)</span>
              <span className="text-sm font-black text-stone-950">₹{LIVE_GOLD_RATES.rate22KPerGram.toLocaleString('en-IN')}/g</span>
              <span className="text-[10px] text-[#8B0000] font-bold block">₹{(LIVE_GOLD_RATES.rate22KPerGram * 8).toLocaleString('en-IN')} / 1 Pavan (8g)</span>
            </div>

            <div className="px-3.5 py-2 rounded-2xl bg-white/90 border border-amber-200/80 shadow-2xs">
              <span className="text-[10px] text-stone-500 uppercase font-semibold block">18K Hallmarked (750)</span>
              <span className="text-sm font-bold text-stone-950">₹{LIVE_GOLD_RATES.rate18KPerGram.toLocaleString('en-IN')}/g</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills (Glassmorphic) */}
      {/* Category Filter Pills (Glassmorphic) */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {[
          { id: 'all', label: 'All Fine Creations' },
          { id: 'necklace', label: 'Bridal Necklaces & Harams' },
          { id: 'chain', label: 'Solid Gold Chains' },
          { id: 'bangles', label: 'Bangles & Kadas' },
          { id: 'earrings', label: 'Jhumkas & Chandbalis' },
          { id: 'mangalsutra', label: 'Mangalsutras' },
          { id: 'ring', label: 'Signet & Solitaire Rings' },
          { id: 'diamond', label: 'Diamond Jewellery' },
          { id: 'silver', label: '925 Silver Articles' },
          { id: 'investment', label: '24K Minted Coins & Bars' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              bellPlayer.playBell(587);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer shadow-xs ${
              selectedCategory === cat.id
                ? 'bg-[#8B0000] text-amber-100 ring-2 ring-amber-400 font-black'
                : 'glass-card border-amber-200/70 text-stone-700 hover:border-amber-400 hover:bg-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gold Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filteredProducts.map((product) => {
          const pricing = calculateGoldPrice(product);
          return (
            <div
              key={product.id}
              className="glass-card rounded-3xl p-6 shadow-md hover:border-amber-400 transition-all flex flex-col justify-between glass-card-hover border border-amber-200/70 relative overflow-hidden group"
            >
              <div>
                {/* Header Tag and Rating */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-amber-800 font-extrabold uppercase tracking-widest block">
                    {product.collection}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-amber-900 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {product.rating} ({product.reviewsCount})
                  </span>
                </div>

                {/* Title & Category */}
                <h3 className="font-serif-royal text-lg font-bold text-stone-900 mt-1 leading-snug">
                  {product.title}
                </h3>
                <span className="text-xs text-amber-800 font-semibold">{product.categoryLabel}</span>

                {/* Visual Gold Illustration Stage */}
                <div className="my-4 p-4 rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5EEDB] border border-amber-200/60 shadow-inner flex items-center justify-center">
                  <GoldProductIllustration type={product.svgType} className="max-w-[200px]" />
                </div>

                {/* Weight, Purity & Specifications Badge */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-medium">
                  <div className="p-2.5 rounded-xl bg-white/80 border border-amber-200/60">
                    <span className="text-[10px] text-stone-500 block">Gross Weight</span>
                    <span className="font-bold text-stone-900 text-sm">{product.weightGrams} grams</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/80 border border-amber-200/60">
                    <span className="text-[10px] text-stone-500 block">Gold Purity</span>
                    <span className="font-bold text-amber-900 text-sm">22K (916)</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-medium">
                  {product.description}
                </p>

                {/* Hallmark Reassurance */}
                <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>BIS 916 Hallmark with Unique Laser HUID</span>
                </div>
              </div>

              {/* Price & Action Strip */}
              <div className="mt-6 pt-4 border-t border-amber-200/60 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-amber-800 block uppercase font-bold">
                      Indicative Investment
                    </span>
                    <span className="font-serif-royal text-xl font-black text-stone-950">
                      ₹{pricing.totalPrice.toLocaleString('en-IN')}*
                    </span>
                  </div>

                  <button
                    onClick={() => setCalculatingProduct(product)}
                    className="text-xs text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 cursor-pointer underline underline-offset-2"
                  >
                    <Calculator className="w-3.5 h-3.5 text-amber-600" />
                    Price Breakup
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleWhatsAppProduct(product)}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    WhatsApp
                  </button>

                  <button
                    onClick={onOpenBooking}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#DFB743] to-[#D4AF37] text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer border border-amber-200"
                  >
                    Book Viewing
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Custom Gold Price Calculator Drawer/Section */}
      <div className="glass-card-gold rounded-3xl p-6 sm:p-10 shadow-[0_12px_45px_rgba(212,175,55,0.15)] border-2 border-amber-300">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-bold shadow-2xs">
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
              TRANSPARENCY GUARANTEE
            </div>
            <h2 className="font-serif-royal text-2xl sm:text-3xl font-bold text-stone-950">
              Sri Kamala Gold <span className="text-gold-gradient">Estimation Calculator</span>
            </h2>
            <p className="text-xs text-stone-600 font-medium">
              Calculate the transparent price of any custom gold order based on weight, purity, and standard wastage making charges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Weight Slider */}
            <div className="p-4 rounded-2xl bg-white/90 border border-amber-200 shadow-2xs">
              <label className="text-xs font-bold text-stone-900 block mb-1">
                Gold Weight (Grams)
              </label>
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif-royal text-xl font-bold text-amber-900">{calcWeight} g</span>
                <Scale className="w-4 h-4 text-amber-600" />
              </div>
              <input
                type="range"
                min="2"
                max="100"
                step="1"
                value={calcWeight}
                onChange={(e) => setCalcWeight(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            {/* Purity Select */}
            <div className="p-4 rounded-2xl bg-white/90 border border-amber-200 shadow-2xs">
              <label className="text-xs font-bold text-stone-900 block mb-2">
                Purity
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCalcKarat(22)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    calcKarat === 22
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  22K (916)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcKarat(18)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    calcKarat === 18
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  18K (750)
                </button>
              </div>
              <span className="text-[10px] text-stone-500 block mt-2 font-medium">
                Rate: ₹{currentRate.toLocaleString('en-IN')}/g
              </span>
            </div>

            {/* Making Charge */}
            <div className="p-4 rounded-2xl bg-white/90 border border-amber-200 shadow-2xs">
              <label className="text-xs font-bold text-stone-900 block mb-1">
                Making Charges (VA)
              </label>
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif-royal text-xl font-bold text-amber-900">{calcMakingPercent}%</span>
                <span className="text-[10px] text-stone-500">Handcrafting</span>
              </div>
              <input
                type="range"
                min="6"
                max="18"
                step="0.5"
                value={calcMakingPercent}
                onChange={(e) => setCalcMakingPercent(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Breakdown Result */}
          <div className="p-5 rounded-2xl bg-white/95 border border-amber-300 space-y-2 text-xs font-medium">
            <div className="flex justify-between text-stone-700">
              <span>Pure Gold Cost ({calcWeight}g × ₹{currentRate.toLocaleString('en-IN')})</span>
              <span className="font-bold text-stone-950">₹{customGoldCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-stone-700">
              <span>Handcrafting Making Charge ({calcMakingPercent}%)</span>
              <span className="font-bold text-stone-950">₹{customMakingCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-stone-700">
              <span>Govt. GST (3%)</span>
              <span className="font-bold text-stone-950">₹{customGst.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-2 border-t border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-800 uppercase font-extrabold block">
                  Estimated Total Investment
                </span>
                <span className="font-serif-royal text-2xl font-black text-stone-950">
                  ₹{customTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={() => {
                  const text = encodeURIComponent(
                    `Namaste Sri Kamala Jewellers! I calculated a custom ${calcKarat}K Gold piece of approx ${calcWeight}g with estimated value ₹${customTotal.toLocaleString('en-IN')}. Please help me with customized craftsmanship and designs.`
                  );
                  window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFB743] to-[#D4AF37] text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 shadow-sm cursor-pointer border border-amber-200"
              >
                Inquire for Custom Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Price Breakup Modal */}
      {calculatingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md animate-fade-in">
          <div className="glass-card-gold rounded-3xl max-w-md w-full p-6 shadow-2xl relative border-2 border-amber-300">
            <h3 className="font-serif-royal text-xl font-bold text-stone-950">
              Transparent Price Breakup
            </h3>
            <p className="text-xs text-amber-900 font-bold mt-0.5">{calculatingProduct.title}</p>

            {(() => {
              const p = calculateGoldPrice(calculatingProduct);
              return (
                <div className="mt-4 space-y-2.5 text-xs text-stone-700 font-medium">
                  <div className="flex justify-between py-1.5 border-b border-amber-200/60">
                    <span>Gold Weight & Purity</span>
                    <span className="font-bold text-stone-900">{calculatingProduct.weightGrams}g ({calculatingProduct.purity})</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-amber-200/60">
                    <span>Gold Base Value</span>
                    <span className="font-bold text-stone-900">₹{p.goldCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-amber-200/60">
                    <span>Making Charge / VA ({calculatingProduct.makingChargePercent}%)</span>
                    <span className="font-bold text-stone-900">₹{p.makingCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-amber-200/60">
                    <span>Govt. GST (3%)</span>
                    <span className="font-bold text-stone-900">₹{p.gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 text-sm font-bold text-stone-950">
                    <span>Final Net Price</span>
                    <span className="font-serif-royal text-base text-amber-950 font-black">₹{p.totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              );
            })()}

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  handleWhatsAppProduct(calculatingProduct);
                  setCalculatingProduct(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-xs"
              >
                Inquire on WhatsApp
              </button>
              <button
                onClick={() => setCalculatingProduct(null)}
                className="px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-stone-800 text-xs font-bold hover:bg-amber-50 cursor-pointer shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
