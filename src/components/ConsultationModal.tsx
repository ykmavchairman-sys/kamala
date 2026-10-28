import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare } from 'lucide-react';
import { bellPlayer } from '../utils/audioBell';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  devoteeName?: string;
  recommendedStoneName?: string;
}

export const ConsultationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  devoteeName = '',
  recommendedStoneName = '',
}) => {
  const [name, setName] = useState(devoteeName || 'Devotee');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [mode, setMode] = useState<'video' | 'store'>('video');
  const [slot, setSlot] = useState('11:00 AM - 11:30 AM');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bellPlayer.playConchShell();
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Namaste Sri Kamala Jewellers! I would like to book a 1-on-1 Horoscope & Gemstone Consultation for ${name}. Preferred Mode: ${mode === 'video' ? 'Video Call' : 'In-Store Visit'}. Date: ${date}, Slot: ${slot}. Recommended Gemstone: ${recommendedStoneName || 'To be determined'}. Please confirm the astrologer's availability.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md animate-fade-in">
      <div className="glass-card-gold rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-[0_20px_60px_rgba(212,175,55,0.25)] relative overflow-hidden border-2 border-amber-300 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 border border-amber-300 text-stone-700 hover:text-stone-950 hover:bg-white transition cursor-pointer shadow-xs z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* 1:1 Small Size SKJ Emblem */}
              <div className="w-12 h-12 aspect-square rounded-2xl bg-gradient-to-br from-[#F5E29D] via-[#D4AF37] to-[#A37B1E] p-[1.5px] shadow-sm shrink-0">
                <div className="w-full h-full aspect-square bg-white rounded-[14px] overflow-hidden flex items-center justify-center p-1 border border-amber-200">
                  <img
                    src="/assets/aistudio/Golden_Lotus_Emblem_with_SKJ_Monogram_31db152a.png"
                    alt="Sri Kamala Jewellers Logo"
                    className="w-full h-full aspect-square object-contain"
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-widest block">
                  Complimentary Appointment
                </span>
                <h3 className="font-serif-royal text-xl sm:text-2xl font-bold text-stone-950">
                  Book Astrologer <span className="text-gold-gradient">Consultation</span>
                </h3>
              </div>
            </div>

            <p className="text-xs text-stone-600 mt-1 leading-relaxed font-medium">
              Verify your Kundali, planetary dasha periods, and skin-touch gemstone mounting directly with Chief Astrologer Nukala Srinivas Rao at Lucky Stone Guru & Sri Kamala Jewellers (Estd. 1974).
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-stone-800 mb-1">Devotee Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/95 border border-amber-300/80 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:outline-none focus:border-amber-500 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-stone-800 mb-1">WhatsApp / Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/95 border border-amber-300/80 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:outline-none focus:border-amber-500 shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-800 mb-1">Consultation Mode</label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value as any)}
                    className="w-full bg-white/95 border border-amber-300/80 rounded-xl px-3 py-2.5 text-stone-900 text-xs focus:outline-none focus:border-amber-500 shadow-2xs"
                  >
                    <option value="video">Google Meet / Video Call</option>
                    <option value="store">In-Store (Flagship Atelier)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-800 mb-1">Preferred Time Slot</label>
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="w-full bg-white/95 border border-amber-300/80 rounded-xl px-3 py-2.5 text-stone-900 text-xs focus:outline-none focus:border-amber-500 shadow-2xs"
                  >
                    <option value="07:30 AM - 08:00 AM">Brahma Muhurat (07:30 AM)</option>
                    <option value="11:00 AM - 11:30 AM">Morning (11:00 AM)</option>
                    <option value="03:30 PM - 04:00 PM">Afternoon (03:30 PM)</option>
                    <option value="06:30 PM - 07:00 PM">Evening (06:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-800 mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/95 border border-amber-300/80 rounded-xl px-4 py-2.5 text-stone-900 text-xs focus:outline-none focus:border-amber-500 shadow-2xs"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#DFB743] via-[#D4AF37] to-[#B38728] text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 shadow-md shadow-amber-500/20 transition cursor-pointer border border-amber-200"
                >
                  Confirm Free Booking
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Instant WhatsApp
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif-royal text-2xl font-bold text-stone-950">
              Appointment Scheduled!
            </h3>

            <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto font-medium">
              Namaste {name}. Your astrological consultation has been registered for <span className="text-amber-900 font-bold">{date} at {slot}</span>. Our senior astro-gemology desk will send your video link and pre-consultation astrological notes on WhatsApp ({phone}).
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={handleWhatsAppDirect}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                Open WhatsApp Desk
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white border border-amber-300 text-stone-800 text-xs font-bold hover:bg-amber-50 transition cursor-pointer shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
