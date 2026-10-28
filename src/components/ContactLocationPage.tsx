import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Sparkles,
  ShieldCheck,
  Navigation,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Share2,
  ExternalLink
} from 'lucide-react';
import { bellPlayer } from '../utils/audioBell';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  onOpenBooking: () => void;
}

export const ContactLocationPage: React.FC<Props> = ({ onOpenBooking }) => {
  const { t } = useLanguage();
  const [copiedAddress, setCopiedAddress] = useState(false);

  const showroomAddress = 'Sri Kamala Jewellers, Door No. 14/B, Main Commercial Road, Near Sanjay Gandhi Nagar Arch, Sanjay Gandhi Nagar, Ballari, Karnataka 583104';

  const handleCopyAddress = () => {
    bellPlayer.playBell(587);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(showroomAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  const handleOpenMaps = () => {
    const query = encodeURIComponent('Sri Kamala Jewellers Sanjay Gandhi Nagar Ballari');
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-50 dark:bg-stone-800 border border-[#CC338B]/30 text-[#CC338B] text-xs font-black tracking-wider uppercase shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#CC338B]" />
          {t('hero_trust_badge', '100% BIS 916 HUID Hallmark • Trusted Since 1974')}
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#21181E] dark:text-[#FAF9F6] tracking-tight">
          {t('showroom_page_title', 'Visit Sri Kamala Jewellers, Ballari')}
        </h1>

        <p className="font-bold text-[#CC338B] text-sm sm:text-base">
          {t('proprietors_jewellers', 'Proprietors: Nukala Srinivas Rao & Nukala Manoj')}
        </p>

        <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium">
          {t('hero_desc', 'Step into our flagship jewelry showroom at Sanjay Gandhi Nagar, Ballari. 100% BIS 916 Hallmarked pure gold and live rate monthly accumulation schemes.')}
        </p>
      </div>

      {/* Main Grid: Details & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Contact Information (Glassmorphism Cards) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Primary Address Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#CC338B]/30 shadow-xl space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#CC338B] to-[#9E1463] text-white flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#CC338B] block">
                  Ballari Central Showroom
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-950 dark:text-stone-100">
                  Sanjay Gandhi Nagar Atelier
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-medium pt-1">
                  {showroomAddress}
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleOpenMaps}
                className="btn-magenta flex-1 py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-white" />
                Get Driving Directions
              </button>
              <button
                onClick={handleCopyAddress}
                className="py-2.5 px-4 rounded-xl bg-white dark:bg-stone-800 border border-[#CC338B]/30 text-[#CC338B] hover:bg-pink-50 font-bold text-xs transition cursor-pointer"
              >
                {copiedAddress ? '✓ Address Copied' : 'Copy Address'}
              </button>
            </div>
          </div>

          {/* Direct Phone Dialing Triggers Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#CC338B]/20 shadow-sm space-y-5">
            <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#CC338B]" />
              Direct Phone & WhatsApp Helpline
            </h4>

            <div className="space-y-3">
              {/* Ballari Landline */}
              <a
                href="tel:08392271974"
                className="p-4 rounded-2xl bg-white/90 dark:bg-stone-900 border border-[#CC338B]/20 hover:border-[#CC338B] hover:shadow-xs transition flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">Showroom Landline (Ballari)</span>
                  <span className="text-base font-black text-stone-950 dark:text-stone-100 group-hover:text-[#CC338B] transition">
                    (08392) 271974
                  </span>
                </div>
                <span className="px-3 py-1 rounded-xl bg-pink-50 text-[#CC338B] font-bold text-xs group-hover:bg-pink-100">
                  Call Now
                </span>
              </a>

              {/* Mobile / Chief Desk */}
              <a
                href="tel:+919876543210"
                className="p-4 rounded-2xl bg-white/90 dark:bg-stone-900 border border-[#CC338B]/20 hover:border-[#CC338B] hover:shadow-xs transition flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">Leadership & Bullion Desk</span>
                  <span className="text-base font-black text-stone-950 dark:text-stone-100 group-hover:text-[#CC338B] transition">
                    +91 98765 43210
                  </span>
                </div>
                <span className="px-3 py-1 rounded-xl bg-pink-50 text-[#CC338B] font-bold text-xs group-hover:bg-pink-100">
                  Call Desk
                </span>
              </a>

              {/* WhatsApp Instant Trigger */}
              <a
                href="https://wa.me/919876543210?text=Namaste%20Sri%20Kamala%20Jewellers%20Ballari!%20I%20would%20like%20to%20inquire%20about%20visiting%20your%20Sanjay%20Gandhi%20Nagar%20showroom."
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-pink-50/40 dark:bg-stone-900 border border-[#CC338B]/20 hover:border-[#CC338B] transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#CC338B] text-white flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#CC338B] block">WhatsApp Showroom Desk</span>
                    <span className="text-sm font-black text-stone-900 dark:text-stone-100">
                      Live Chat & Video Call Tours
                    </span>
                  </div>
                </div>
                <span className="btn-magenta px-3 py-1 rounded-xl font-bold text-xs">
                  Chat Now
                </span>
              </a>
            </div>
          </div>

          {/* Operating Hours & Visiting Amenities */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#CC338B]/20 shadow-sm space-y-4">
            <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#CC338B]" />
              Operating Hours & Showroom Amenities
            </h4>

            <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300 font-medium">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/80 dark:bg-stone-900 border border-[#CC338B]/15">
                <span className="font-bold">Monday – Saturday:</span>
                <span className="font-black text-stone-900 dark:text-stone-100">10:00 AM – 8:30 PM (All Day)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/80 dark:bg-stone-900 border border-[#CC338B]/15">
                <span className="font-bold">Sunday & Festive Days:</span>
                <span className="font-black text-[#CC338B]">10:30 AM – 7:30 PM (Open)</span>
              </div>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-semibold text-stone-700 dark:text-stone-300">
              <span className="flex items-center gap-1.5 p-2 rounded-lg bg-pink-50/50 dark:bg-stone-900 border border-[#CC338B]/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CC338B]" /> Dedicated Valet Parking
              </span>
              <span className="flex items-center gap-1.5 p-2 rounded-lg bg-pink-50/50 dark:bg-stone-900 border border-[#CC338B]/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CC338B]" /> Private Bridal Lounge
              </span>
              <span className="flex items-center gap-1.5 p-2 rounded-lg bg-pink-50/50 dark:bg-stone-900 border border-[#CC338B]/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CC338B]" /> Free Karatmeter Gold Testing
              </span>
              <span className="flex items-center gap-1.5 p-2 rounded-lg bg-pink-50/50 dark:bg-stone-900 border border-[#CC338B]/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CC338B]" /> Consultation Chamber
              </span>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Visual Map & Appointment Booking */}
        <div className="lg:col-span-6 space-y-6">
          {/* Visual Showroom Map & Landmark Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#CC338B]/30 shadow-md space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#CC338B] font-bold uppercase tracking-widest block">
                  Interactive Showroom Map
                </span>
                <h3 className="text-xl font-bold text-stone-950 dark:text-stone-100">
                  Ballari Location Map
                </h3>
              </div>
              <span className="text-xs font-bold text-stone-500 bg-white/90 dark:bg-stone-800 px-3 py-1 rounded-full border border-[#CC338B]/20">
                Sanjay Gandhi Nagar
              </span>
            </div>

            {/* Stylized Map Canvas Container */}
            <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-[#CC338B]/25 shadow-inner bg-pink-50/30 dark:bg-stone-900 flex flex-col justify-between p-4">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#CC338B_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="absolute top-1/2 left-0 right-0 h-10 bg-pink-100/50 dark:bg-stone-800 -rotate-6 transform -translate-y-4" />
              <div className="absolute top-0 bottom-0 left-1/3 w-8 bg-pink-100/50 dark:bg-stone-800 rotate-12 transform" />

              <div className="relative z-10 flex justify-between items-start">
                <div className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-stone-800 border border-[#CC338B]/30 text-[11px] font-bold text-stone-800 dark:text-stone-200 shadow-xs flex items-center gap-1.5">
                  <Navigation className="w-3 h-3 text-[#CC338B]" />
                  Sanjay Gandhi Nagar Main Arch
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-stone-800 border border-[#CC338B]/30 text-[11px] font-bold text-stone-800 dark:text-stone-200 shadow-xs">
                  Ballari Railway Station (3.2 km)
                </div>
              </div>

              {/* Center Pin for Sri Kamala Jewellers */}
              <div className="relative z-10 mx-auto my-auto flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#CC338B] via-[#DE3C9A] to-[#8C0E56] p-1 shadow-[0_8px_25px_rgba(204,51,139,0.4)] flex items-center justify-center animate-bounce">
                  <div className="w-full h-full bg-white rounded-xl flex items-center justify-center p-1">
                    <img
                      src="/assets/aistudio/Golden_Lotus_Emblem_with_SKJ_Monogram_31db152a.png"
                      alt="Sri Kamala Jewellers"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="mt-2 px-3 py-1 rounded-full bg-stone-900/90 text-white font-bold text-xs tracking-wide shadow-md border border-[#CC338B]/50 whitespace-nowrap">
                  Sri Kamala Jewellers
                </div>
              </div>

              <div className="relative z-10 flex justify-between items-end">
                <span className="text-[10px] text-stone-500 bg-white/80 dark:bg-stone-800 px-2.5 py-1 rounded-lg">
                  Door No. 14/B, Sanjay Gandhi Nagar
                </span>
                <button
                  onClick={handleOpenMaps}
                  className="btn-magenta px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Open in Google Maps</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
