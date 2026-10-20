import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Calculator,
  Calendar,
  Layers,
  Scale,
  Building2,
  CheckCircle2,
  PhoneCall,
  Clock,
  ArrowRight,
  Info,
  RefreshCw,
  Share2,
  Radio
} from 'lucide-react';
import {
  INITIAL_MARKET_DATA,
  LiveMarketFeedState,
  fetchLiveMarketRates,
  calculateCustomJewelryEstimate,
  GoldPurityRate
} from '../data/marketRates';
import { bellPlayer } from '../utils/audioBell';

interface Props {
  onOpenBooking: () => void;
  onNavigateToJewelry?: () => void;
}

export const LiveRatesPage: React.FC<Props> = ({ onOpenBooking, onNavigateToJewelry }) => {
  const [marketData, setMarketData] = useState<LiveMarketFeedState>(INITIAL_MARKET_DATA);
  const [selectedKarat, setSelectedKarat] = useState<24 | 22 | 18 | 14>(22);
  const [calcWeight, setCalcWeight] = useState<number>(10);
  const [calcMakingPercent, setCalcMakingPercent] = useState<number>(10);
  const [copiedPurity, setCopiedPurity] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncText, setLastSyncText] = useState('Synchronized just now');

  // Load authentic live market rates on mount and set up live polling
  const syncRates = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchLiveMarketRates();
      setMarketData(data);
      setLastSyncText(`Live Tick at ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} IST`);
    } catch (e) {
      console.warn('Sync rates fallback', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    syncRates();
    const interval = setInterval(() => {
      syncRates();
    }, 15000); // 15-second authentic live ticker
    return () => clearInterval(interval);
  }, []);

  const currentRateObj = marketData.goldRates.find(r => r.karat === selectedKarat);
  const activeRatePerGram = currentRateObj ? currentRateObj.ratePerGramINR : 8115;

  const estimate = calculateCustomJewelryEstimate({
    weightGrams: calcWeight,
    karat: selectedKarat,
    makingPercent: calcMakingPercent,
    customLiveRate: activeRatePerGram,
  });

  const handleShareRate = (rate: GoldPurityRate) => {
    bellPlayer.playBell(587);
    const text = `Sri Kamala Jewellers (Ballari) Authentic Live Gold Rate for ${rate.purityName}: ₹${rate.ratePerGramINR.toLocaleString('en-IN')}/gram | ₹${rate.ratePer8GramINR.toLocaleString('en-IN')}/8g (1 Pavan) | ₹${rate.ratePer10GramINR.toLocaleString('en-IN')}/10g. Certified BIS Hallmarked 916 with HUID. Direct MCX Spot benchmark.`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedPurity(rate.purityName);
      setTimeout(() => setCopiedPurity(null), 2500);
    }
  };

  const handleWhatsAppBooking = (purityTitle: string, rate: number) => {
    const text = encodeURIComponent(
      `Namaste Sri Kamala Jewellers (Ballari)! I would like to inquire about today's live rate for ${purityTitle} (₹${rate.toLocaleString('en-IN')}/g, Tick: ${marketData.tickId}). Please inform me about bullion bar / coin availability and rate booking options.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-16 animate-fade-in-up">
      {/* Page Header (Royal White & Gold Glassmorphic) */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 via-amber-200/90 to-amber-100 border border-amber-300 text-[#700B1A] text-xs font-black tracking-wider uppercase shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          AUTHENTIC REAL-TIME MARKET RATE BULLETIN • SRI KAMALA JEWELLERS
        </div>

        <h1 className="font-serif-royal text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
          Today's Live <span className="text-gold-gradient">Gold & Silver Bullion Rates</span>
        </h1>

        <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-medium">
          Direct real-time spot prices synchronized with National MCX Spot and Indian Bullion & Jewellers Association (IBJA) official published benchmarks for Ballari. Every gram certified with 100% BIS Hallmark laser HUID registration.
        </p>

        {/* Live Status Bar & Real-time Ticker Refresh */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs pt-1">
          <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-emerald-300 text-emerald-800 font-bold shadow-xs">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Market Session: {marketData.marketSession}</span>
          </span>

          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-card border border-amber-300 text-amber-950 font-semibold shadow-xs">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{marketData.lastUpdatedTimestamp}</span>
          </span>

          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-card border border-amber-300 text-stone-700 font-medium shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-amber-700" />
            <span>{marketData.benchmarkLocation}</span>
          </span>

          <button
            onClick={() => {
              bellPlayer.playBell(587);
              syncRates();
            }}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold shadow-sm transition active:scale-95 cursor-pointer disabled:opacity-75"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Fetching Spot Tick...' : 'Sync Live Spot'}</span>
          </button>
        </div>

        {/* IBJA Benchmark Official Header & Verification Card */}
        <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-amber-50/80 border border-amber-300/90 text-xs text-stone-700 shadow-sm space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/80 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-black text-amber-950 uppercase tracking-wide text-[11px]">
                IBJA Mandated Benchmark Source:
              </span>
              <a
                href="https://www.ibjarates.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold border border-amber-300 transition"
              >
                <span>https://www.ibjarates.com/</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>

            <span className="text-[11px] text-amber-900 font-bold bg-white px-2.5 py-0.5 rounded-md border border-amber-200 shadow-2xs">
              {lastSyncText}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2 rounded-xl bg-amber-100/50 border border-amber-200">
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Gold 999 (AM)</span>
              <span className="text-xs sm:text-sm font-black text-stone-900">
                ₹{(marketData.ibjaOfficialBenchmark?.gold999?.amPricePer10g || 146406).toLocaleString('en-IN')}/10g
              </span>
            </div>
            <div className="p-2 rounded-xl bg-amber-100/50 border border-amber-200">
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Gold 999 (PM)</span>
              <span className="text-xs sm:text-sm font-black text-[#8B0000]">
                ₹{(marketData.ibjaOfficialBenchmark?.gold999?.pmPricePer10g || 145944).toLocaleString('en-IN')}/10g
              </span>
            </div>
            <div className="p-2 rounded-xl bg-amber-100/50 border border-amber-200">
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Gold 916 (22K)</span>
              <span className="text-xs sm:text-sm font-black text-stone-900">
                ₹{(marketData.ibjaOfficialBenchmark?.gold916?.amPricePer10g || 134108).toLocaleString('en-IN')}/10g
              </span>
            </div>
            <div className="p-2 rounded-xl bg-amber-100/50 border border-amber-200">
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Silver 999 (1KG)</span>
              <span className="text-xs sm:text-sm font-black text-stone-900">
                ₹{(marketData.ibjaOfficialBenchmark?.silver999?.amPricePerKg || 209467).toLocaleString('en-IN')}/kg
              </span>
            </div>
          </div>

          <div className="text-[10px] text-stone-500 flex items-center justify-between pt-1">
            <span>*Rates officially published by IBJA are exclusive of 3% GST and Making Charges. Mandated by RBI for Sovereign Gold Bonds (SGB).</span>
            <span className="font-bold text-amber-800 hidden sm:inline">Ballari Sarafa Benchmark</span>
          </div>
        </div>
      </div>

      {/* Main Spotlight Cards: 999 24K and 916 22K (Glassmorphism Luxury) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {marketData.goldRates.slice(0, 2).map((rate) => {
          const is916 = rate.karat === 22;
          return (
            <div
              key={rate.purityName}
              className={`rounded-3xl p-6 sm:p-8 shadow-[0_12px_45px_rgba(212,175,55,0.14)] relative overflow-hidden transition-all duration-300 border-2 hover:-translate-y-1 ${
                is916
                  ? 'glass-card-gold border-amber-400 bg-gradient-to-br from-[#FFFDF7] via-[#FFF9EC] to-[#FFF4D9]'
                  : 'glass-card border-amber-300 bg-white/90'
              }`}
            >
              {/* Highlight Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span
                  className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs ${
                    is916
                      ? 'bg-[#8B0000] text-amber-100 ring-1 ring-amber-300'
                      : 'bg-amber-100 text-amber-950 border border-amber-300'
                  }`}
                >
                  {is916 ? '⭐ Most Popular for Bridal Jewellery (916 BIS)' : '💎 Pure Investment Bullion (999 Fine)'}
                </span>

                <div className="flex items-center gap-1 text-emerald-700 text-xs font-black bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <TrendingUp className="w-3 h-3" />
                  +₹{rate.changeDayINR}/g (+{rate.changePercent}%)
                </div>
              </div>

              {/* Title & Fineness */}
              <div className="mb-4">
                <h2 className="font-serif-royal text-2xl sm:text-3xl font-black text-stone-900">
                  {rate.purityName}
                </h2>
                <p className="text-xs text-amber-900 font-bold mt-0.5">{rate.fineness}</p>
              </div>

              {/* Price Grid (1g, 8g/Pavan, 10g, 100g) */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/95 border border-amber-200 shadow-inner mb-4">
                <div className="text-center">
                  <span className="text-[10px] text-stone-500 uppercase font-bold block">1 Gram</span>
                  <span className="text-lg sm:text-2xl font-black text-stone-950">
                    ₹{rate.ratePerGramINR.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-center border-x border-amber-200 px-2">
                  <span className="text-[10px] text-stone-500 uppercase font-bold block">8g (1 Pavan)</span>
                  <span className="text-lg sm:text-2xl font-black text-[#8B0000]">
                    ₹{rate.ratePer8GramINR.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-stone-500 uppercase font-bold block">10 Grams</span>
                  <span className="text-lg sm:text-2xl font-black text-stone-950">
                    ₹{rate.ratePer10GramINR.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Transparent Buy vs Exchange / Scrap Breakdown */}
              <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-amber-50/70 border border-amber-200 mb-4">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block font-semibold">Retail Price (Incl 3% GST):</span>
                  <span className="font-black text-emerald-800 text-sm">
                    ₹{(rate.retailBuyWithGst || Math.round(rate.ratePerGramINR * 1.03)).toLocaleString('en-IN')}/g
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block font-semibold">Exchange / Sell-Back Guarantee:</span>
                  <span className="font-black text-stone-900 text-sm">
                    ₹{(rate.scrapSellBack || Math.round(rate.ratePerGramINR * 0.985)).toLocaleString('en-IN')}/g
                  </span>
                </div>
              </div>

              {/* Application / Best used for */}
              <p className="text-xs text-stone-600 mb-5 font-medium flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span><strong className="text-stone-800">Ideal For:</strong> {rate.bestUsedFor}</span>
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-amber-200/80">
                <button
                  onClick={() => handleWhatsAppBooking(rate.purityName, rate.ratePerGramINR)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#600512] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
                  Lock In Rate on WhatsApp
                </button>
                <button
                  onClick={() => handleShareRate(rate)}
                  className="py-2.5 px-4 rounded-xl bg-white border border-amber-300 text-amber-950 hover:bg-amber-50 font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  {copiedPurity === rate.purityName ? '✓ Copied' : 'Share Rate'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Purities (18K, 14K, and Silver Rates in Glassmorphic Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* 18K & 14K Cards */}
        {marketData.goldRates.slice(2, 4).map((rate) => (
          <div
            key={rate.purityName}
            className="glass-card rounded-3xl p-5 shadow-sm hover:border-amber-400 transition-all flex flex-col justify-between border border-amber-200/80 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">
                  {rate.karat} Karat
                </span>
                <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> +₹{rate.changeDayINR}/g
                </span>
              </div>
              <h3 className="font-serif-royal text-lg font-bold text-stone-900">{rate.purityName}</h3>
              <p className="text-[11px] text-stone-500 font-medium mb-3">{rate.fineness}</p>
              
              <div className="bg-white/90 p-3 rounded-xl border border-amber-100 mb-3 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium">Per 1 Gram:</span>
                  <span className="font-black text-stone-900 text-sm">₹{rate.ratePerGramINR.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium">Per 10 Grams:</span>
                  <span className="font-bold text-amber-900">₹{rate.ratePer10GramINR.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-stone-500 font-medium italic mb-3">
              {rate.bestUsedFor}
            </p>

            <button
              onClick={() => handleWhatsAppBooking(rate.purityName, rate.ratePerGramINR)}
              className="w-full py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-bold text-xs transition cursor-pointer text-center"
            >
              Inquire Live Stock
            </button>
          </div>
        ))}

        {/* Silver Rates (2 Cards) */}
        {marketData.silverRates.slice(0, 2).map((silver) => (
          <div
            key={silver.item}
            className="glass-card rounded-3xl p-5 shadow-sm hover:border-amber-400 transition-all flex flex-col justify-between border border-amber-200/80 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase text-slate-800 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-300">
                  Pure Silver (Chandi)
                </span>
                <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> +₹{silver.changeINR}
                </span>
              </div>
              <h3 className="font-serif-royal text-lg font-bold text-stone-900">{silver.item}</h3>
              <p className="text-[11px] text-stone-500 font-medium mb-3">{silver.purity}</p>

              <div className="bg-white/90 p-3 rounded-xl border border-amber-100 mb-3 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium">Current Spot:</span>
                  <span className="font-black text-stone-900 text-base">₹{silver.rateINR.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">Unit:</span>
                  <span className="text-stone-600 font-semibold">{silver.unit}</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-stone-500 font-medium italic mb-3">
              Certified pure 999 silver coins, pooja deepams, & thali sets.
            </p>

            <button
              onClick={() => handleWhatsAppBooking(silver.item, silver.rateINR)}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 font-bold text-xs transition cursor-pointer text-center"
            >
              Order Silver Articles
            </button>
          </div>
        ))}
      </div>

      {/* Silver 1KG Bar Banner */}
      <div className="glass-card-gold rounded-3xl p-6 sm:p-8 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_8px_30px_rgba(212,175,55,0.1)] hover:-translate-y-0.5 transition">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-200 border border-slate-400 flex items-center justify-center shrink-0 shadow-inner">
            <Scale className="w-6 h-6 text-slate-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-royal text-xl sm:text-2xl font-black text-stone-950">
                1 KG Pure Silver Minted Bullion Bar (999)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#8B0000] text-white text-[10px] font-black uppercase">
                Investor Choice
              </span>
            </div>
            <p className="text-xs text-stone-600 font-medium mt-0.5">
              Refinery assay certified 1000g pure bar with serial number and tax invoice. Spot price today:
              <strong className="text-stone-950 text-sm ml-1">₹{marketData.silverRates[2].rateINR.toLocaleString('en-IN')} / kg</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => handleWhatsAppBooking('1 KG Pure Silver Bar', marketData.silverRates[2].rateINR)}
          className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-200 font-bold text-xs uppercase tracking-wider transition whitespace-nowrap shadow-md cursor-pointer border border-amber-400/40"
        >
          Reserve 1 KG Silver Bar
        </button>
      </div>

      {/* Official IBJA Daily Opening & Closing Fixing Table (Direct from https://www.ibjarates.com/) */}
      <div className="glass-card-gold rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-[0_12px_45px_rgba(212,175,55,0.12)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-900">
                Official National Benchmark (RBI Mandate)
              </span>
            </div>
            <h2 className="font-serif-royal text-2xl sm:text-3xl font-black text-stone-950 flex items-center gap-2">
              <span>IBJA Daily Opening (AM) & Closing (PM) Fixings</span>
            </h2>
            <p className="text-xs text-stone-600 font-medium">
              Published twice daily by the Indian Bullion and Jewellers Association Ltd. Source:{' '}
              <a
                href="https://www.ibjarates.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B0000] font-black underline hover:text-[#A01020]"
              >
                https://www.ibjarates.com/
              </a>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://www.ibjarates.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-amber-50 text-amber-950 border border-amber-300 font-bold text-xs shadow-2xs transition"
            >
              <span>Verify on ibjarates.com</span>
              <span className="text-xs">↗</span>
            </a>
            <button
              onClick={() => {
                bellPlayer.playBell(587);
                syncRates();
              }}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8B0000] hover:bg-[#700B1A] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition active:scale-95 disabled:opacity-75 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Checking...' : 'Refresh Feed'}</span>
            </button>
          </div>
        </div>

        {/* IBJA Official Fixing Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-amber-300 text-stone-600 uppercase font-black tracking-wider text-[11px] bg-amber-100/50">
                <th className="py-3 px-3.5 rounded-l-xl">Precious Metal / Karat</th>
                <th className="py-3 px-3.5">Fineness</th>
                <th className="py-3 px-3.5 text-right">AM Rate (Morning 11:30)</th>
                <th className="py-3 px-3.5 text-right font-black text-[#8B0000]">PM Rate (Evening 16:30)</th>
                <th className="py-3 px-3.5 text-right">Spread / Change</th>
                <th className="py-3 px-3.5 text-right rounded-r-xl">Retail Buy (+3% GST)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100">
              {[
                {
                  name: 'Gold 999 (24K Pure)',
                  fineness: '99.9% Fine Bullion',
                  unit: '/ 10g',
                  am: marketData.ibjaOfficialBenchmark?.gold999?.amPricePer10g || 146406,
                  pm: marketData.ibjaOfficialBenchmark?.gold999?.pmPricePer10g || 145944,
                  highlight: true,
                },
                {
                  name: 'Gold 995',
                  fineness: '99.5% Standard Bullion',
                  unit: '/ 10g',
                  am: marketData.ibjaOfficialBenchmark?.gold995?.amPricePer10g || 145820,
                  pm: marketData.ibjaOfficialBenchmark?.gold995?.pmPricePer10g || 145360,
                  highlight: false,
                },
                {
                  name: 'Gold 916 (22K Bridal)',
                  fineness: '91.6% BIS Hallmarked',
                  unit: '/ 10g',
                  am: marketData.ibjaOfficialBenchmark?.gold916?.amPricePer10g || 134108,
                  pm: marketData.ibjaOfficialBenchmark?.gold916?.pmPricePer10g || 133685,
                  highlight: true,
                },
                {
                  name: 'Gold 750 (18K Fine)',
                  fineness: '75.0% Diamond Jewelry',
                  unit: '/ 10g',
                  am: marketData.ibjaOfficialBenchmark?.gold750?.amPricePer10g || 109805,
                  pm: marketData.ibjaOfficialBenchmark?.gold750?.pmPricePer10g || 109458,
                  highlight: false,
                },
                {
                  name: 'Gold 585 (14K Casual)',
                  fineness: '58.5% Everyday Gold',
                  unit: '/ 10g',
                  am: marketData.ibjaOfficialBenchmark?.gold585?.amPricePer10g || 85648,
                  pm: marketData.ibjaOfficialBenchmark?.gold585?.pmPricePer10g || 85377,
                  highlight: false,
                },
                {
                  name: 'Silver 999 (Pure Chandi)',
                  fineness: '99.9% Mint Bar',
                  unit: '/ 1kg',
                  am: marketData.ibjaOfficialBenchmark?.silver999?.amPricePerKg || 209467,
                  pm: marketData.ibjaOfficialBenchmark?.silver999?.pmPricePerKg || 208750,
                  highlight: false,
                },
              ].map((row) => {
                const diff = row.pm - row.am;
                const buyWithGst = Math.round(row.pm * 1.03);
                return (
                  <tr
                    key={row.name}
                    className={`hover:bg-amber-50/70 transition ${
                      row.highlight ? 'bg-amber-50/40 font-bold' : ''
                    }`}
                  >
                    <td className="py-3 px-3.5">
                      <span className="font-bold text-stone-900 block">{row.name}</span>
                      <span className="text-[10px] text-stone-500 font-normal">Quoted {row.unit}</span>
                    </td>
                    <td className="py-3 px-3.5 text-stone-600">{row.fineness}</td>
                    <td className="py-3 px-3.5 text-right font-semibold text-stone-900">
                      ₹{row.am.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3.5 text-right font-black text-[#8B0000] text-sm">
                      ₹{row.pm.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3.5 text-right font-semibold">
                      <span
                        className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] font-black ${
                          diff >= 0
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {diff >= 0 ? `+₹${diff}` : `-₹${Math.abs(diff)}`}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 text-right font-black text-emerald-900">
                      ₹{buyWithGst.toLocaleString('en-IN')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Indian Pricing Units Transparency Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/90 border border-amber-200/90 text-xs">
          <div className="space-y-1">
            <span className="font-black text-amber-950 block">🇮🇳 All-India Sarafa Standard</span>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Standard IBJA rates published on <strong className="text-stone-900">ibjarates.com</strong> are quoted per 10 grams (Gold) and per 1 kilogram (Silver), exclusive of GST.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-black text-amber-950 block">⚖️ South Indian Metric (1 Pavan = 8g)</span>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              At Sri Kamala Jewellers Ballari, bridal gold ornaments are calculated transparently per 8g Sovereign (1 Pavan = ₹{(marketData.goldRates[1]?.ratePer8GramINR || 107286).toLocaleString('en-IN')}).
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-black text-amber-950 block">📜 Govt. 3% GST & BIS Hallmarking</span>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              GST of 3% (1.5% CGST + 1.5% SGST) is applied uniformly on precious metals. BIS 6-digit laser HUID is certified on every piece.
            </p>
          </div>
        </div>
      </div>

      {/* Live Interactive Gold Price Estimator & Calculator (Glassmorphism Gold) */}
      <div className="glass-card-gold rounded-3xl p-6 sm:p-10 shadow-[0_12px_45px_rgba(212,175,55,0.15)] border-2 border-amber-300/80">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold mb-2">
              <Calculator className="w-3.5 h-3.5 text-amber-700" />
              100% TRANSPARENT BILLING
            </div>
            <h2 className="font-serif-royal text-2xl sm:text-4xl font-black text-stone-950">
              Live Jewellery <span className="text-gold-gradient">Price Estimator</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
              Calculate exact gold values, making charges, and 3% Govt. GST based on today's live spot rate of <strong className="text-stone-900">₹{activeRatePerGram.toLocaleString('en-IN')}/g</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-900">Select Purity:</span>
            {([24, 22, 18, 14] as const).map((k) => (
              <button
                key={k}
                onClick={() => {
                  setSelectedKarat(k);
                  bellPlayer.playBell(587);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                  selectedKarat === k
                    ? 'bg-[#8B0000] text-amber-100 shadow-sm ring-1 ring-amber-300'
                    : 'bg-white/80 text-stone-700 border border-amber-200/80 hover:bg-white'
                }`}
              >
                {k}K
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Weight Slider & Input */}
            <div className="p-5 rounded-2xl bg-white/90 border border-amber-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-amber-600" />
                  Net Gold Weight (Grams)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="500"
                    step="0.5"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(Math.max(0.5, parseFloat(e.target.value) || 1))}
                    className="w-20 px-2 py-1 text-right font-black text-stone-900 bg-amber-50 border border-amber-300 rounded-lg text-sm focus:outline-none"
                  />
                  <span className="text-xs font-bold text-stone-600">grams</span>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="100"
                step="0.5"
                value={calcWeight}
                onChange={(e) => setCalcWeight(parseFloat(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />

              {/* Quick weight chips */}
              <div className="flex flex-wrap gap-2 pt-1 text-xs font-semibold">
                {[
                  { label: '4g (Ring)', val: 4 },
                  { label: '8g (1 Pavan)', val: 8 },
                  { label: '16g (2 Pavans)', val: 16 },
                  { label: '25g (Bangles)', val: 25 },
                  { label: '40g (Bridal Haram)', val: 40 },
                ].map((chip) => (
                  <button
                    key={chip.val}
                    type="button"
                    onClick={() => setCalcWeight(chip.val)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] transition cursor-pointer ${
                      calcWeight === chip.val
                        ? 'bg-amber-200 text-amber-950 font-bold border border-amber-400'
                        : 'bg-white border border-stone-200 text-stone-600 hover:border-amber-300'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Making Charges Slider */}
            <div className="p-5 rounded-2xl bg-white/90 border border-amber-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-600" />
                  Making & Craftsmanship Charges (%)
                </label>
                <div className="flex items-center gap-1">
                  <span className="font-black text-stone-900 text-sm">{calcMakingPercent}%</span>
                </div>
              </div>

              <input
                type="range"
                min="6.5"
                max="18"
                step="0.5"
                value={calcMakingPercent}
                onChange={(e) => setCalcMakingPercent(parseFloat(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />

              <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
                <span>Machine Chains (6.5% - 8.5%)</span>
                <span>Bridal Nakshi (10% - 14%)</span>
              </div>
            </div>
          </div>

          {/* Invoice Summary Output */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#FAF5E8] to-[#FFF9EE] rounded-3xl p-6 border-2 border-amber-300 shadow-md space-y-4">
            <div className="border-b border-amber-300/70 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-800 font-bold uppercase tracking-widest block">
                  Detailed Estimate
                </span>
                <h4 className="font-serif-royal text-lg font-extrabold text-stone-950">
                  {selectedKarat}K Gold ({calcWeight}g)
                </h4>
              </div>
              <span className="text-xs font-bold text-amber-900 px-2.5 py-1 bg-amber-100 rounded-full border border-amber-300">
                ₹{activeRatePerGram.toLocaleString('en-IN')}/g
              </span>
            </div>

            <div className="space-y-2 text-xs font-medium text-stone-700">
              <div className="flex items-center justify-between">
                <span>Pure Gold Value ({calcWeight}g × ₹{activeRatePerGram}):</span>
                <span className="font-bold text-stone-950">₹{estimate.netGoldCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Making Charges ({calcMakingPercent}%):</span>
                <span className="font-bold text-stone-950">₹{estimate.makingChargesCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Govt. BIS Laser Hallmarking & Assay:</span>
                <span className="font-bold text-stone-950">₹45 (Complimentary)</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-amber-200">
                <span>Subtotal:</span>
                <span className="font-bold text-stone-950">₹{(estimate.netGoldCost + estimate.makingChargesCost).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>GST (3% on Gold & Making):</span>
                <span className="font-bold text-stone-950">₹{estimate.taxGst3Percent.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-3 border-t-2 border-amber-300 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-500 block">Total Estimated Price</span>
                <span className="font-serif-royal text-2xl font-black text-[#8B0000]">
                  ₹{estimate.grandTotalINR.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={() => {
                  const text = encodeURIComponent(
                    `Namaste Sri Kamala Jewellers! I calculated an estimate for ${calcWeight}g in ${selectedKarat}K Gold (approx ₹${estimate.grandTotalINR.toLocaleString('en-IN')} at live rate ₹${activeRatePerGram}/g). Please show me available jewelry designs in this weight bracket.`
                  );
                  window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
                }}
                className="py-2.5 px-4 rounded-xl bg-[#8B0000] hover:bg-[#700B1A] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
              >
                Inquire on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Historical Rate Trend & Regional Comparison Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 7-Day History Table */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif-royal text-xl font-bold text-stone-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                7-Day Historical Gold Rate Movement
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Day-to-day spot tracking for Ballari bullion market
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-amber-200 text-stone-500 uppercase tracking-wider font-bold">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Day</th>
                  <th className="py-2.5 px-3 text-right">24K (999)/g</th>
                  <th className="py-2.5 px-3 text-right font-black text-amber-950">22K (916)/g</th>
                  <th className="py-2.5 px-3 text-right">Silver (1kg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {marketData.historical7Days.map((hist, idx) => (
                  <tr
                    key={hist.date}
                    className={`hover:bg-amber-50/60 transition ${
                      idx === 0 ? 'bg-amber-100/40 font-bold text-stone-900' : 'text-stone-700'
                    }`}
                  >
                    <td className="py-3 px-3">
                      {hist.date}
                      {idx === 0 && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase">
                          Live
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-stone-500">{hist.day}</td>
                    <td className="py-3 px-3 text-right font-semibold">₹{hist.rate24K.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 text-right font-black text-[#8B0000]">
                      ₹{hist.rate22K.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3 text-right font-medium text-stone-600">
                      ₹{hist.silver1kg.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Regional Market Benchmark Comparison */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-200/80 space-y-4">
          <div>
            <h3 className="font-serif-royal text-xl font-bold text-stone-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-600" />
              Regional City Price Differentials
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Comparison of 10g rates across major South Indian trading hubs
            </p>
          </div>

          <div className="space-y-2.5 text-xs">
            {marketData.regionalRates.map((reg) => {
              const isBallari = reg.city.includes('Ballari');
              return (
                <div
                  key={reg.city}
                  className={`p-3 rounded-xl flex items-center justify-between border transition ${
                    isBallari
                      ? 'bg-amber-100/70 border-amber-400 font-bold text-stone-950 shadow-2xs'
                      : 'bg-white/80 border-amber-100 text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isBallari && <span className="w-2 h-2 rounded-full bg-[#8B0000]" />}
                    <span>{reg.city}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[10px] text-stone-400 block text-right">22K / 10g</span>
                      <span className={isBallari ? 'text-[#8B0000] font-black text-sm' : 'font-bold'}>
                        ₹{reg.rate22KPer10g.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-stone-600 space-y-1">
            <span className="font-bold text-amber-950 block">Why buy in Ballari at Sri Kamala Jewellers?</span>
            <p className="text-[11px] leading-relaxed">
              We offer direct transparent wholesale bullion rates without high city showroom overhead markups. Every ornament is weighted on Govt. certified 0.001g digital scale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
