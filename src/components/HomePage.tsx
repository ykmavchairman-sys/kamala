import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Star,
  ArrowRight,
  TrendingUp,
  MapPin,
  CheckCircle2,
  PhoneCall,
  Coins,
  Gem,
  Compass,
  Heart,
  Scale
} from 'lucide-react';
import { LIVE_GOLD_RATES } from '../data/goldCatalog';
import { bellPlayer } from '../utils/audioBell';
import { AnimatedJewelleryShowcase } from './AnimatedJewelleryShowcase';

interface Props {
  onNavigate: (tab: 'home' | 'rates' | 'gold' | 'calculator' | 'dossier' | 'customizer' | 'ritual' | 'catalog' | 'chat' | 'contact') => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<Props> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* 1. Visually Striking Hero Section (White & Gold Glassmorphic with Deep Crimson Highlights) */}
      <section className="relative overflow-hidden rounded-3xl glass-card-gold p-6 sm:p-12 border-2 border-amber-300 shadow-[0_20px_60px_rgba(212,175,55,0.18)]">
        {/* Soft background luxury glow */}
        <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-gradient-to-br from-amber-200/40 via-[#8B0000]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 border border-amber-300 text-[#700B1A] text-xs font-black tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              SRI KAMALA JEWELLERS • ESTD. 1974 • BALLARI
            </div>

            <h1 className="font-serif-royal text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.12]">
              Timeless Bridal Gold & <span className="text-gold-gradient">Destiny Gemstones</span>
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-medium max-w-xl">
              Ballari’s premier fine jewelry atelier. Handcrafting BIS 916 Hallmarked bridal temple necklaces, heirloom harams, and astrologer-prescribed unheated gemstones under the guidance of <strong className="text-stone-900">Chief Astrologer Nukala Srinivasrao</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  bellPlayer.playBell(587);
                  onNavigate('gold');
                }}
                className="px-6 py-3.5 rounded-2xl btn-royal-crimson font-black text-xs uppercase tracking-wider transition flex items-center gap-2 cursor-pointer"
              >
                <Coins className="w-4 h-4 text-amber-300" />
                Explore Bridal Gold
              </button>

              <button
                onClick={() => {
                  bellPlayer.playBell(528);
                  onNavigate('calculator');
                }}
                className="px-6 py-3.5 rounded-2xl bg-white/95 border border-amber-400 text-amber-950 font-black text-xs uppercase tracking-wider hover:bg-amber-50 shadow-sm transition flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                Find My Lucky Stone
              </button>

              <button
                onClick={() => {
                  bellPlayer.playBell(587);
                  onNavigate('rates');
                }}
                className="px-4 py-3.5 rounded-2xl bg-amber-100/80 border border-amber-300 text-amber-950 font-bold text-xs hover:bg-amber-200 transition flex items-center gap-1.5 cursor-pointer"
              >
                <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
                IBJA Live Rate: 22K ₹{LIVE_GOLD_RATES.rate22KPerGram.toLocaleString('en-IN')}/g
              </button>
            </div>

            {/* Micro Trust Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-stone-700 font-bold">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-card border border-amber-300/60 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% BIS 916 HUID Laser Hallmark
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-card border border-amber-300/60 shadow-2xs">
                <Award className="w-3.5 h-3.5 text-amber-600" /> IGI Certified Unheated Gemstones
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-card border border-amber-300/60 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-amber-700" /> Sanjay Gandhi Nagar, Ballari
              </span>
            </div>
          </div>

          {/* Hero Visual Showcase: Interactive Animated Fine Jewellery Stage */}
          <div className="lg:col-span-5 relative">
            <AnimatedJewelleryShowcase
              onNavigateToGold={() => onNavigate('gold')}
              onNavigateToCustomizer={() => onNavigate('customizer')}
            />
          </div>
        </div>
      </section>

      {/* 2. Customer Trust Badges & Hallmark Certifications Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: ShieldCheck,
            title: '100% BIS 916 Hallmark',
            desc: 'Every ornament carries laser-etched HUID verification for Govt. certified gold fineness.'
          },
          {
            icon: Award,
            title: 'Unheated Natural Gems',
            desc: 'Zero glass-filling, zero irradiation. Authentic optical conduits for planetary rays.'
          },
          {
            icon: Sparkles,
            title: 'Vedic Skin-Touch Bezel',
            desc: 'Open-back setting allows natural gemstone pavilions to touch your skin continuously.'
          },
          {
            icon: Star,
            title: '50-Year Ballari Lineage',
            desc: 'Serving 12,400+ satisfied devotees and bridal families across Karnataka since 1974.'
          }
        ].map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="glass-card rounded-3xl p-5 border border-amber-200/80 shadow-xs space-y-2 hover:border-amber-400 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 border border-amber-300 flex items-center justify-center text-amber-800 shadow-2xs">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif-royal text-sm font-bold text-stone-900">{badge.title}</h3>
              <p className="text-[11px] text-stone-600 leading-relaxed font-medium">{badge.desc}</p>
            </div>
          );
        })}
      </section>

      {/* 3. Three Pillars: Bridal Gold, Lucky Stone Guru, and 24K Bullion */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-amber-900 uppercase tracking-widest block">
            Signature Departments
          </span>
          <h2 className="font-serif-royal text-2xl sm:text-4xl font-extrabold text-stone-900">
            Crafted for Celebrations & <span className="text-gold-gradient">Destiny</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            Discover three sacred worlds under one royal roof at Sri Kamala Jewellers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Bridal & Fine Gold */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-md hover:border-amber-400 transition flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8B0000] text-amber-200 flex items-center justify-center shadow-md">
                <Coins className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block">
                Atelier Collection
              </span>
              <h3 className="font-serif-royal text-xl font-bold text-stone-900 group-hover:text-[#8B0000] transition">
                Royal Bridal & Temple Gold
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Kasu Malas, antique chokers, lightweight daily-wear curb chains, mayura kadas, and classical double-vati mangalsutras in BIS 916 pure gold.
              </p>
            </div>
            <button
              onClick={() => onNavigate('gold')}
              className="py-2.5 px-4 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs uppercase tracking-wider transition flex items-center justify-between cursor-pointer"
            >
              <span>Explore Gold Catalog</span>
              <ArrowRight className="w-4 h-4 text-amber-700" />
            </button>
          </div>

          {/* Card 2: Lucky Stone Guru */}
          <div className="glass-card-gold rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-md hover:border-amber-400 transition flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 flex items-center justify-center shadow-md">
                <Gem className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block">
                Astrological Jyotish Shastra
              </span>
              <h3 className="font-serif-royal text-xl font-bold text-stone-900 group-hover:text-amber-800 transition">
                LUCKY STONE GURU
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Personalized gemstone recommendations based on your natal Kundali, Lagna, and planetary dasha cycles. Audited by Acharya Nukala Srinivasrao.
              </p>
            </div>
            <button
              onClick={() => onNavigate('calculator')}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 text-stone-950 font-black text-xs uppercase tracking-wider transition flex items-center justify-between cursor-pointer shadow-sm"
            >
              <span>Calculate Birth Chart</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </button>
          </div>

          {/* Card 3: Daily Rate Widget & 24K Bullion */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-md hover:border-amber-400 transition flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-stone-900 text-amber-300 flex items-center justify-center shadow-md">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block">
                Daily Market Bulletin
              </span>
              <h3 className="font-serif-royal text-xl font-bold text-stone-900 group-hover:text-amber-800 transition">
                Live Gold & Silver Rates
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Real-time MCX & Ballari bullion spot rates for 24K (999), 22K (916), 18K (750), and 999 Fine Silver with instant bill price estimator.
              </p>
            </div>
            <button
              onClick={() => onNavigate('rates')}
              className="py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-200 font-bold text-xs uppercase tracking-wider transition flex items-center justify-between cursor-pointer shadow-xs"
            >
              <span>Check Live Rates</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Astrologer Nukala Srinivasrao Consultation Banner */}
      <section className="glass-card-gold rounded-3xl p-6 sm:p-10 border-2 border-amber-300 shadow-[0_12px_45px_rgba(212,175,55,0.15)] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            {/* 1:1 Small Size Logo */}
            <div className="w-16 h-16 aspect-square rounded-2xl bg-gradient-to-br from-[#F5E29D] via-[#D4AF37] to-[#A37B1E] p-[2px] shadow-md shrink-0">
              <div className="w-full h-full aspect-square bg-white rounded-[14px] overflow-hidden flex items-center justify-center p-1 border border-amber-200">
                <img
                  src="/assets/aistudio/Golden_Lotus_Emblem_with_SKJ_Monogram_31db152a.png"
                  alt="Sri Kamala Jewellers Logo"
                  className="w-full h-full aspect-square object-contain"
                />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-900 block">
                Chief Astrologer & Gemologist
              </span>
              <h3 className="font-serif-royal text-xl sm:text-2xl font-black text-stone-950">
                Acharya Nukala Srinivasrao
              </h3>
              <p className="text-xs text-stone-600 max-w-lg font-medium leading-relaxed">
                Available for real-time horoscope cross-examinations, Muhurta timings for wedding jewelry, and Prana Pratishtha energization ceremonies.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('chat')}
              className="py-3 px-5 rounded-xl bg-white border border-amber-300 text-amber-950 font-black text-xs uppercase tracking-wider hover:bg-amber-50 shadow-xs transition cursor-pointer"
            >
              Ask Nukala Srinivasrao
            </button>
            <button
              onClick={onOpenBooking}
              className="py-3 px-5 rounded-xl bg-[#8B0000] hover:bg-[#700B1A] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              Book Video / In-Store Call
            </button>
          </div>
        </div>
      </section>

      {/* 5. Sanjay Gandhi Nagar, Ballari Showroom Invitation */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#8B0000] text-amber-200 flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h4 className="font-serif-royal text-base sm:text-lg font-bold text-stone-950">
              Visit Our Flagship Showroom in Ballari
            </h4>
            <p className="text-xs text-stone-600 font-medium mt-0.5">
              Near Sanjay Gandhi Nagar Arch, Sanjay Gandhi Nagar, Ballari, Karnataka 583104. Open 10:00 AM – 8:30 PM.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="py-2.5 px-5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs uppercase tracking-wider transition whitespace-nowrap border border-amber-300 cursor-pointer"
        >
          View Map & Directions
        </button>
      </section>
    </div>
  );
};
