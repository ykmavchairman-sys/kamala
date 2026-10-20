import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Sparkles,
  ShieldCheck,
  Award,
  Navigation,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Share2,
  ExternalLink
} from 'lucide-react';
import { bellPlayer } from '../utils/audioBell';

interface Props {
  onOpenBooking: () => void;
}

export const ContactLocationPage: React.FC<Props> = ({ onOpenBooking }) => {
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
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 border border-amber-300 text-[#700B1A] text-xs font-black tracking-wider uppercase shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          FLAGSHIP SHOWROOM & JYOTISH ATELIER
        </div>

        <h1 className="font-serif-royal text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          Visit Sri Kamala Jewellers, <span className="text-gold-gradient">Ballari</span>
        </h1>

        <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium">
          Step into our flagship jewelry palace at Sanjay Gandhi Nagar, Ballari. Experience BIS 916 pure gold, master bridal craftsmanship, and 1-on-1 consultations with Chief Astrologer Nukala Srinivasrao.
        </p>
      </div>

      {/* Main Grid: Details & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Contact Information (Glassmorphism Cards) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Primary Address Card */}
          <div className="glass-card-gold rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-[0_12px_45px_rgba(212,175,55,0.12)] space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B0000] to-[#50050E] text-amber-200 flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="w-6 h-6 text-amber-300" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-900 block">
                  Ballari Central Showroom
                </span>
                <h3 className="font-serif-royal text-xl sm:text-2xl font-black text-stone-950">
                  Sanjay Gandhi Nagar Atelier
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium pt-1">
                  {showroomAddress}
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleOpenMaps}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#8B0000] hover:bg-[#700B1A] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-300" />
                Get Driving Directions
              </button>
              <button
                onClick={handleCopyAddress}
                className="py-2.5 px-4 rounded-xl bg-white border border-amber-300 text-amber-950 hover:bg-amber-50 font-bold text-xs transition cursor-pointer"
              >
                {copiedAddress ? '✓ Address Copied' : 'Copy Address'}
              </button>
            </div>
          </div>

          {/* Direct Phone Dialing Triggers Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-sm space-y-5">
            <h4 className="font-serif-royal text-lg font-bold text-stone-900 flex items-center gap-2">
              <Phone className="w-5 h-5 text-amber-600" />
              Direct Phone & WhatsApp Helpline
            </h4>

            <div className="space-y-3">
              {/* Ballari Landline */}
              <a
                href="tel:08392271974"
                className="p-4 rounded-2xl bg-white/90 border border-amber-200/90 hover:border-amber-400 hover:shadow-xs transition flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">Showroom Landline (Ballari)</span>
                  <span className="text-base font-black text-stone-950 group-hover:text-[#8B0000] transition">
                    (08392) 271974
                  </span>
                </div>
                <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs group-hover:bg-amber-200">
                  Call Now
                </span>
              </a>

              {/* Mobile / Astrologer Desk */}
              <a
                href="tel:+919876543210"
                className="p-4 rounded-2xl bg-white/90 border border-amber-200/90 hover:border-amber-400 hover:shadow-xs transition flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">Chief Astrologer Desk & Bullion</span>
                  <span className="text-base font-black text-stone-950 group-hover:text-[#8B0000] transition">
                    +91 98765 43210
                  </span>
                </div>
                <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs group-hover:bg-amber-200">
                  Call Desk
                </span>
              </a>

              {/* WhatsApp Instant Trigger */}
              <a
                href="https://wa.me/919876543210?text=Namaste%20Sri%20Kamala%20Jewellers%20Ballari!%20I%20would%20like%20to%20inquire%20about%20visiting%20your%20Sanjay%20Gandhi%20Nagar%20showroom."
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100/60 border border-emerald-300 hover:border-emerald-500 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block">WhatsApp Showroom Desk</span>
                    <span className="text-sm font-black text-emerald-950">
                      Live Chat & Video Call Tours
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-bold text-xs">
                  Chat Now
                </span>
              </a>
            </div>
          </div>

          {/* Operating Hours & Visiting Amenities */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-sm space-y-4">
            <h4 className="font-serif-royal text-lg font-bold text-stone-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              Operating Hours & Showroom Amenities
            </h4>

            <div className="space-y-2 text-xs text-stone-700 font-medium">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/80 border border-amber-100">
                <span className="font-bold">Monday – Saturday:</span>
                <span className="font-black text-stone-900">10:00 AM – 8:30 PM (All Day)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/80 border border-amber-100">
                <span className="font-bold">Sunday & Festive Days:</span>
                <span className="font-black text-[#8B0000]">10:30 AM – 7:30 PM (Open)</span>
              </div>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-semibold text-stone-700">
              <span className="flex items-center gap-1.5 p-2 rounded-lg bg-amber-50/70 border border-amber-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Dedicated Valet Parking
              </span>
              <span className="flex items-center gap-1.5 p-2 rounded-lg bg-amber-50/70 border border-amber-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Private Bridal Lounge
              </span>
              <span className="flex items-center gap-1.5 p-2 rounded-lg bg-amber-50/70 border border-amber-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Free Karatmeter Gold Testing
              </span>
              <span className="flex items-center gap-1.5 p-2 rounded-lg bg-amber-50/70 border border-amber-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Nukala Srinivasrao Chamber
              </span>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Visual Map & Appointment Booking */}
        <div className="lg:col-span-6 space-y-6">
          {/* Visual Showroom Map & Landmark Card */}
          <div className="glass-card-gold rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-md space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-800 font-bold uppercase tracking-widest block">
                  Interactive Showroom Map
                </span>
                <h3 className="font-serif-royal text-xl font-bold text-stone-950">
                  Ballari Location Map
                </h3>
              </div>
              <span className="text-xs font-bold text-stone-500 bg-white/90 px-3 py-1 rounded-full border border-amber-200">
                Sanjay Gandhi Nagar
              </span>
            </div>

            {/* Stylized Map Canvas Container */}
            <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-amber-300/80 shadow-inner bg-[#F5EEDB] flex flex-col justify-between p-4">
              {/* Map Canvas Background Grid */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Roads / Decorative Geometry */}
              <div className="absolute top-1/2 left-0 right-0 h-10 bg-amber-200/60 -rotate-6 transform -translate-y-4" />
              <div className="absolute top-0 bottom-0 left-1/3 w-8 bg-amber-200/60 rotate-12 transform" />

              {/* Landmark Callouts */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="px-3 py-1.5 rounded-xl bg-white/90 border border-amber-300 text-[11px] font-bold text-stone-800 shadow-sm flex items-center gap-1.5">
                  <Navigation className="w-3 h-3 text-amber-600" />
                  Sanjay Gandhi Nagar Main Arch
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/90 border border-amber-300 text-[11px] font-bold text-stone-800 shadow-sm">
                  Ballari Railway Station (3.2 km)
                </div>
              </div>

              {/* Center Pin for Sri Kamala Jewellers */}
              <div className="relative z-10 mx-auto my-auto flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B0000] via-[#A01020] to-[#55050F] p-1 shadow-[0_8px_25px_rgba(139,0,0,0.4)] flex items-center justify-center animate-bounce">
                  <div className="w-full h-full bg-white rounded-xl flex items-center justify-center p-1">
                    <img
                      src="/assets/aistudio/Golden_Lotus_Emblem_with_SKJ_Monogram_31db152a.png"
                      alt="Sri Kamala Jewellers"
                      className="w-full h-full aspect-square object-contain"
                    />
                  </div>
                </div>
                <div className="mt-2 px-4 py-1.5 rounded-full bg-[#8B0000] text-amber-100 font-serif-royal font-black text-xs shadow-md border border-amber-300 text-center whitespace-nowrap">
                  Sri Kamala Jewellers • Ballari
                </div>
              </div>

              {/* Map Footer Action */}
              <div className="relative z-10 flex items-center justify-between text-xs pt-2 border-t border-amber-300/40">
                <span className="text-[11px] text-stone-600 font-semibold">Near Ballari City Center & Gandhi Nagar Circle</span>
                <button
                  onClick={handleOpenMaps}
                  className="px-3 py-1 rounded-lg bg-white border border-amber-300 text-amber-950 font-bold hover:bg-amber-100 transition flex items-center gap-1 shadow-2xs"
                >
                  Open in Google Maps <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* In-Store Astrologer Consultation Chamber Card */}
            <div className="p-5 rounded-2xl bg-white/90 border border-amber-200 space-y-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-serif-royal font-bold">
                  🕉️
                </div>
                <div>
                  <h4 className="font-serif-royal text-sm sm:text-base font-bold text-stone-950">
                    Chamber of Acharya Nukala Srinivasrao
                  </h4>
                  <p className="text-[11px] text-stone-500 font-medium">
                    In-person Birth Chart & Gemological Audit at Ballari
                  </p>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Devotees can sit with Chief Astrologer Nukala Srinivasrao in person to analyze their Kundali, verify planetary dasha remedies, and inspect certified natural gemstones under high-magnification microscopes.
              </p>

              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 transition shadow-sm cursor-pointer"
              >
                Schedule Showroom Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
