import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Award,
  ArrowRight,
  TrendingUp,
  MapPin,
  CheckCircle2,
  PhoneCall,
  Coins,
  Gem,
  Calendar,
  Building2,
  ChevronRight,
  Calculator,
  Clock,
  Layers
} from 'lucide-react';
import { LIVE_GOLD_RATES } from '../data/goldCatalog';
import { bellPlayer } from '../utils/audioBell';
import { AppTab } from './Navbar';
import { useAppFormat } from '../context/FormatContext';
import { useLanguage } from '../context/LanguageContext';
import { JewelryMotionShowcase } from './JewelryMotionShowcase';

interface Props {
  onNavigate: (tab: AppTab) => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<Props> = ({ onNavigate, onOpenBooking }) => {
  const { setFormat } = useAppFormat();
  const { t } = useLanguage();

  // Quick Classic Calculator on Home Page
  const [calcPurity, setCalcPurity] = useState<'24K' | '22K' | '18K'>('22K');
  const [calcWeight, setCalcWeight] = useState<number>(10); // default 10g

  const getRatePerGram = () => {
    switch (calcPurity) {
      case '24K':
        return LIVE_GOLD_RATES.rate24KPerGram;
      case '22K':
        return LIVE_GOLD_RATES.rate22KPerGram;
      case '18K':
        return LIVE_GOLD_RATES.rate18KPerGram;
    }
  };

  const ratePerGram = getRatePerGram();
  const rawMetalCost = Math.round(calcWeight * ratePerGram);
  const makingCharges = Math.round(rawMetalCost * 0.10); // 10% making
  const subTotal = rawMetalCost + makingCharges;
  const gstAmount = Math.round(subTotal * 0.03); // 3% GST
  const estimatedTotal = subTotal + gstAmount;

  return (
    <div className="space-y-8 sm:space-y-12 pb-20">
      {/* Motion Jewellery Showcase (Sample Images of Jewellery Motion in Circle Format) */}
      <JewelryMotionShowcase onNavigateToJewels={() => onNavigate('gold')} />

      {/* 1. Classic Live Sarafa Benchmark Ribbon */}
      <section className="relative overflow-hidden rounded-2xl glass-card p-3 sm:p-4 border border-[#CC338B]/30 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CC338B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#CC338B]"></span>
            </span>
            <span className="font-black text-[#CC338B] tracking-wider uppercase text-[11px]">
              {t('nav_rates_sub', 'IBJA Live Benchmark • Ballari')}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-medium">{t('calc_purity_24k', '24K Pure')}:</span>
              <strong className="text-[#CC338B] font-bold">₹{LIVE_GOLD_RATES.rate24KPerGram.toLocaleString('en-IN')}</strong>
              <span className="text-stone-400 text-[10px]">/g</span>
            </div>
            <span className="text-[#CC338B]/30 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-medium">{t('calc_purity_22k', '22K 916')}:</span>
              <strong className="text-[#CC338B] font-black">₹{LIVE_GOLD_RATES.rate22KPerGram.toLocaleString('en-IN')}</strong>
              <span className="text-stone-400 text-[10px]">/g</span>
            </div>
            <span className="text-[#CC338B]/30 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-medium">999 Silver:</span>
              <strong className="text-stone-800 dark:text-stone-200 font-bold">₹{LIVE_GOLD_RATES.rateSilverPerGram.toLocaleString('en-IN')}</strong>
              <span className="text-stone-400 text-[10px]">/g</span>
            </div>
          </div>

          <button
            onClick={() => {
              bellPlayer.playBell(587);
              onNavigate('rates');
            }}
            className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-[#CC338B] hover:opacity-80 transition cursor-pointer underline underline-offset-4 shrink-0"
          >
            <span>{t('view_live_sheet', 'View Live Sheet')}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#CC338B]" />
          </button>
        </div>
      </section>

      {/* 2. Classic Luxury Hero Section */}
      <section className="relative overflow-hidden rounded-3xl glass-card p-6 sm:p-12 border border-[#CC338B]/30 shadow-[0_16px_48px_rgba(204,51,139,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Brand Headline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 dark:bg-stone-800/80 border border-[#CC338B]/30 text-[#CC338B] text-xs font-black tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#CC338B]" />
              <span>{t('hero_trust_badge', '100% BIS 916 HUID Hallmark • Trusted Since 1974')}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#21181E] dark:text-[#FAF9F6] tracking-tight leading-[1.12]">
              {t('hero_title_1', 'Sri Kamala Jewellers')}
              <br />
              <span className="text-[#CC338B]">
                {t('hero_title_2', 'Purity You Can Measure. Heritage You Can Wear.')}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {t('hero_desc', 'Serving Ballari for 50 glorious years under the guidance of Nukala Srinivas Rao & Nukala Manoj. Every bridal necklace, bangle, and coin is laser-inscribed with BIS HUID certification and certified against live IBJA bullion rates.')}
            </p>

            {/* Leadership Attribution Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-stone-600 dark:text-stone-400 border-t border-[#CC338B]/15">
              <div className="flex items-center gap-1.5 font-bold text-[#CC338B]">
                <Award className="w-4 h-4 text-[#CC338B]" />
                <span>Nukala Srinivas Rao & Nukala Manoj</span>
              </div>
              <span className="text-[#CC338B]/40">•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#CC338B]" />
                <span>{t('ballari_location', 'Ballari, Karnataka')}</span>
              </div>
              <span className="text-[#CC338B]/40">•</span>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#CC338B]" />
                <span>{t('est_since', 'Established 1974')}</span>
              </div>
            </div>

            {/* Classic Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  bellPlayer.playBell(587);
                  onNavigate('gold');
                }}
                className="btn-magenta px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-md"
              >
                <Coins className="w-4 h-4 text-white" />
                <span>{t('cta_explore_jewels', 'Explore Jewels Collection')}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => {
                  bellPlayer.playBell(587);
                  onNavigate('schemes');
                }}
                className="btn-magenta-outline px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
              >
                <Calendar className="w-4 h-4 text-[#CC338B]" />
                <span>{t('cta_join_scheme', 'Monthly Passbook Scheme')}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Signature Editorial Feature Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl glass-card p-6 border border-[#CC338B]/35 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#CC338B]/20 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#CC338B]">
                    Signature Masterpiece
                  </span>
                  <h3 className="text-lg font-black text-stone-900 dark:text-stone-100">
                    22K Temple Kasu Mala
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-pink-50 dark:bg-stone-800 flex items-center justify-center border border-[#CC338B]/30">
                  <Coins className="w-5 h-5 text-[#CC338B]" />
                </div>
              </div>

              {/* Specifications Matrix */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-pink-50/50 dark:bg-stone-900/50 border border-[#CC338B]/15">
                  <span className="text-stone-500 text-[10px] block">Purity Grade</span>
                  <strong className="text-[#CC338B] font-black text-sm">22 Karat (91.6%)</strong>
                </div>
                <div className="p-3 rounded-xl bg-pink-50/50 dark:bg-stone-900/50 border border-[#CC338B]/15">
                  <span className="text-stone-500 text-[10px] block">Certification</span>
                  <strong className="text-stone-800 dark:text-stone-200 font-black text-sm">BIS 6-Digit HUID</strong>
                </div>
                <div className="p-3 rounded-xl bg-pink-50/50 dark:bg-stone-900/50 border border-[#CC338B]/15">
                  <span className="text-stone-500 text-[10px] block">Gross Weight</span>
                  <strong className="text-stone-800 dark:text-stone-200 font-black text-sm">48.250 Grams</strong>
                </div>
                <div className="p-3 rounded-xl bg-pink-50/50 dark:bg-stone-900/50 border border-[#CC338B]/15">
                  <span className="text-stone-500 text-[10px] block">Pricing Guarantee</span>
                  <strong className="text-[#CC338B] font-black text-sm">Exact Daily Rate</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-[#CC338B]/20 text-xs flex items-center justify-between">
                <span className="text-stone-600 dark:text-stone-400">Estimated Live Value:</span>
                <strong className="text-[#CC338B] font-black text-base">
                  ₹{(48.25 * LIVE_GOLD_RATES.rate22KPerGram).toLocaleString('en-IN')}*
                </strong>
              </div>

              <button
                onClick={() => {
                  bellPlayer.playBell(587);
                  onNavigate('gold');
                }}
                className="w-full btn-magenta py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>View Full Jewels Catalog</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Five Distinct Pillars of Sri Kamala Jewellers */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-[#CC338B]">
            {t('nav_home_sub', 'Flagship Overview')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
            {t('brand_name', 'SRI KAMALA JEWELLERS')} 5 Signature Services
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Everything you need for fine gold jewellery, bullion investment, and monthly security under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Pillar 1: Gold Rates */}
          <div
            onClick={() => {
              bellPlayer.playBell(587);
              onNavigate('rates');
            }}
            className="glass-card p-5 rounded-2xl border border-[#CC338B]/25 hover:border-[#CC338B] cursor-pointer group flex flex-col justify-between transition-all"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-stone-800 flex items-center justify-center border border-[#CC338B]/30 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 text-[#CC338B]" />
              </div>
              <h3 className="font-black text-sm text-stone-900 dark:text-stone-100">
                {t('nav_rates', 'Live Gold Rates')}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Live 24K pure bullion, 22K bridal 916, and 999 silver with full 3% GST transparency.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-[#CC338B] gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Rates</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 2: Jewels Collection */}
          <div
            onClick={() => {
              bellPlayer.playBell(587);
              onNavigate('gold');
            }}
            className="glass-card p-5 rounded-2xl border border-[#CC338B]/25 hover:border-[#CC338B] cursor-pointer group flex flex-col justify-between transition-all"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-stone-800 flex items-center justify-center border border-[#CC338B]/30 group-hover:scale-110 transition-transform">
                <Coins className="w-5 h-5 text-[#CC338B]" />
              </div>
              <h3 className="font-black text-sm text-stone-900 dark:text-stone-100">
                {t('nav_gold', 'Jewels Collection')}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                100% BIS 916 HUID Hallmarked necklaces, harams, jhumkas, and lightweight daily wear.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-[#CC338B] gap-1 group-hover:translate-x-1 transition-transform">
              <span>Browse Jewels</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 3: Monthly Gold Scheme */}
          <div
            onClick={() => {
              bellPlayer.playBell(587);
              onNavigate('schemes');
            }}
            className="glass-card p-5 rounded-2xl border-2 border-[#CC338B]/40 hover:border-[#CC338B] cursor-pointer group flex flex-col justify-between transition-all bg-gradient-to-b from-pink-50/40 to-transparent"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#CC338B] flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-sm text-stone-900 dark:text-stone-100">
                  {t('nav_schemes', 'Monthly Schemes')}
                </h3>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Individual gold passbook locked to daily live rates. 11+1 installments with zero wastage benefit.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-black text-[#CC338B] gap-1 group-hover:translate-x-1 transition-transform">
              <span>Open Passbook</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 4: Showroom & Contact */}
          <div
            onClick={() => {
              bellPlayer.playBell(587);
              onNavigate('contact');
            }}
            className="glass-card p-5 rounded-2xl border border-[#CC338B]/25 hover:border-[#CC338B] cursor-pointer group flex flex-col justify-between transition-all"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-stone-800 flex items-center justify-center border border-[#CC338B]/30 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5 text-[#CC338B]" />
              </div>
              <h3 className="font-black text-sm text-stone-900 dark:text-stone-100">
                {t('nav_showroom', 'Ballari Showroom')}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Visit Sanjay Gandhi Nagar showroom in Ballari. Purity testing meter & parking available.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-[#CC338B] gap-1 group-hover:translate-x-1 transition-transform">
              <span>Directions & Phone</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 5: Lucky Stone Guru Sister App */}
          <div
            onClick={() => {
              bellPlayer.playBell(659);
              setFormat('guru');
              onNavigate('calculator');
            }}
            className="glass-card p-5 rounded-2xl border border-[#CC338B]/25 hover:border-[#CC338B] cursor-pointer group flex flex-col justify-between transition-all"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-stone-800 flex items-center justify-center border border-[#CC338B]/30 group-hover:scale-110 transition-transform">
                <Gem className="w-5 h-5 text-[#CC338B]" />
              </div>
              <h3 className="font-black text-sm text-stone-900 dark:text-stone-100">
                {t('format_guru_title', 'Lucky Stone Guru')}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Acharya Nukala Srinivas Rao's Parashara Vedic birth chart, Jyotish gems & Prana Pratishtha.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-[#CC338B] gap-1 group-hover:translate-x-1 transition-transform">
              <span>Switch Format</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Classic Transparent Gold Calculator */}
      <section className="glass-card p-6 sm:p-10 rounded-3xl border border-[#CC338B]/30 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#CC338B]/20 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#CC338B] flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-[#CC338B]" />
              <span>{t('calc_title', 'Transparent Gold Price Estimator')}</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
              Calculate Exact Jewellery Value in Real Time
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500">Benchmark Rate:</span>
            <span className="px-3 py-1 rounded-full bg-pink-50 dark:bg-stone-800 border border-[#CC338B]/30 text-xs font-black text-[#CC338B]">
              ₹{ratePerGram.toLocaleString('en-IN')}/g
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                Select Gold Karat Purity:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['24K', '22K', '18K'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCalcPurity(p)}
                    className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                      calcPurity === p
                        ? 'btn-magenta border-[#CC338B]'
                        : 'bg-white/80 dark:bg-stone-800 border-[#CC338B]/20 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {p} {p === '22K' ? '(916 Hallmark)' : p === '24K' ? '(999 Pure)' : '(750)'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                <span>Enter Ornament Weight:</span>
                <span className="text-[#CC338B] font-black">{calcWeight} Grams</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={calcWeight}
                onChange={(e) => setCalcWeight(Number(e.target.value))}
                className="w-full accent-[#CC338B] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>1g (Lightweight)</span>
                <span>10g (1 Tola)</span>
                <span>50g (Bridal Set)</span>
                <span>100g (Bullion Bar)</span>
              </div>
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-pink-50/60 dark:bg-stone-900/60 border border-[#CC338B]/30 space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-[#CC338B]/15">
              <span className="text-stone-600 dark:text-stone-400">Metal Cost ({calcWeight}g @ ₹{ratePerGram}/g):</span>
              <strong className="text-stone-900 dark:text-stone-100 font-bold">₹{rawMetalCost.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-[#CC338B]/15">
              <span className="text-stone-600 dark:text-stone-400">Making Charges (10% standard):</span>
              <strong className="text-stone-900 dark:text-stone-100 font-bold">₹{makingCharges.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-[#CC338B]/15">
              <span className="text-stone-600 dark:text-stone-400">Statutory GST (3%):</span>
              <strong className="text-stone-900 dark:text-stone-100 font-bold">₹{gstAmount.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between pt-2 text-sm font-black text-[#CC338B]">
              <span>Estimated Total Invoice:</span>
              <span className="text-base font-black">₹{estimatedTotal.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-[10px] text-stone-400 italic pt-1">
              *All invoices generated at Sri Kamala Jewellers strictly follow IBJA live benchmark rates with official GST bill and HUID verification.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Legacy & Heritage Trust Banner */}
      <section className="glass-card p-6 sm:p-10 rounded-3xl border border-[#CC338B]/25 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2 p-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-stone-800 mx-auto flex items-center justify-center border border-[#CC338B]/30">
              <ShieldCheck className="w-6 h-6 text-[#CC338B]" />
            </div>
            <h4 className="font-black text-sm text-stone-900 dark:text-stone-100">
              100% BIS 916 HUID
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Every single ornament is independently hallmarked by Govt approved BIS centers.
            </p>
          </div>

          <div className="space-y-2 p-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-stone-800 mx-auto flex items-center justify-center border border-[#CC338B]/30">
              <Building2 className="w-6 h-6 text-[#CC338B]" />
            </div>
            <h4 className="font-black text-sm text-stone-900 dark:text-stone-100">
              50 Years in Ballari
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Founded by Nukala Srinivas Rao & Nukala Manoj in 1974, trusted by generations of families.
            </p>
          </div>

          <div className="space-y-2 p-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-stone-800 mx-auto flex items-center justify-center border border-[#CC338B]/30">
              <Clock className="w-6 h-6 text-[#CC338B]" />
            </div>
            <h4 className="font-black text-sm text-stone-900 dark:text-stone-100">
              Live Sarafa Rates
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Direct linkage with IBJA bullion exchange. No artificial markups or hidden fees.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
