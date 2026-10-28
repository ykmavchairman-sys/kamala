import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, MapPin, Target, Scale, User, Compass } from 'lucide-react';
import { BirthChartInput, LifeGoal } from '../types/astrology';
import { ZODIAC_SIGNS, NAKSHATRAS } from '../utils/astrologyEngine';
import { bellPlayer } from '../utils/audioBell';

interface Props {
  onGenerateReport: (input: BirthChartInput) => void;
  isLoading: boolean;
}

const POPULAR_CITIES = [
  'Mumbai, India',
  'Delhi NCR, India',
  'Bengaluru, India',
  'Chennai, India',
  'Kolkata, India',
  'Hyderabad, India',
  'Ahmedabad, India',
  'Jaipur, India',
  'Varanasi, India',
  'London, UK',
  'New York, USA',
  'Dubai, UAE',
  'Singapore',
  'Toronto, Canada'
];

export const BirthChartForm: React.FC<Props> = ({ onGenerateReport, isLoading }) => {
  const [mode, setMode] = useState<'kundali' | 'rashi'>('kundali');
  
  // Form State
  const [name, setName] = useState('Arjun Sharma');
  const [dob, setDob] = useState('1994-08-15');
  const [tob, setTob] = useState('06:30');
  const [place, setPlace] = useState('Mumbai, India');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [lifeGoal, setLifeGoal] = useState<LifeGoal>('wealth');
  const [weightKg, setWeightKg] = useState<number>(68);

  // Quick Rashi Mode State
  const [selectedZodiac, setSelectedZodiac] = useState('Leo');
  const [selectedNakshatra, setSelectedNakshatra] = useState('Magha (Ketu)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bellPlayer.playBell(587);

    const inputData: BirthChartInput = {
      name: name.trim() || 'Respected Devotee',
      dob,
      tob: tob || '06:00',
      place: place.trim() || 'New Delhi, India',
      gender,
      lifeGoal,
      weightKg: Number(weightKg) || 65,
      zodiacSign: selectedZodiac,
      nakshatra: selectedNakshatra,
    };

    onGenerateReport(inputData);
  };

  const loadPreset = (presetType: 'wealth' | 'career' | 'peace') => {
    if (presetType === 'wealth') {
      setName('Vikramaditya Singhania');
      setDob('1988-11-04');
      setTob('07:15');
      setPlace('Jaipur, India');
      setLifeGoal('wealth');
      setWeightKg(74);
    } else if (presetType === 'career') {
      setName('Dr. Ananya Iyer');
      setDob('1995-03-24');
      setTob('14:40');
      setPlace('Bengaluru, India');
      setLifeGoal('career');
      setWeightKg(58);
    } else {
      setName('Raghavendra Rao');
      setDob('1990-07-12');
      setTob('22:10');
      setPlace('Varanasi, India');
      setLifeGoal('peace');
      setWeightKg(66);
    }
    bellPlayer.playBell(659);
  };

  return (
    <div className="relative">
      {/* Background ambient tan halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-[#B38048]/10 blur-[130px] pointer-events-none -z-10" />

      {/* Glassmorphic Container Card */}
      <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 shadow-[0_12px_45px_rgba(179,128,72,0.10)] border border-[#B38048]/30 relative overflow-hidden">
        {/* Luxury Tan Border Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B38048] to-transparent" />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B38048]/10 border border-[#B38048]/35 text-[#B38048] text-xs font-bold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#B38048]" />
            VEDIC JYOTISH & HOROSCOPE ENGINE
          </div>
          <h2 className="font-serif-royal text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Discover Your <span className="text-[#B38048]">Bhagyashali Ratna</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed font-medium">
            Personalized gemstone recommendation based on your natal birth chart, planetary transits, and specific life goals — curated by Chief Astrologer Nukala Srinivas Rao.
          </p>

          {/* Quick Demo Personas */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-[#B38048] font-bold">Quick Demo Profiles:</span>
            <button
              type="button"
              onClick={() => loadPreset('wealth')}
              className="px-3 py-1 rounded-full bg-white/90 border border-[#B38048]/35 text-[#B38048] hover:border-[#B38048] hover:bg-[#B38048]/10 font-medium transition shadow-xs cursor-pointer"
            >
              👑 Business & Wealth (Jaipur)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('career')}
              className="px-3 py-1 rounded-full bg-white/90 border border-[#B38048]/35 text-[#B38048] hover:border-[#B38048] hover:bg-[#B38048]/10 font-medium transition shadow-xs cursor-pointer"
            >
              🚀 Career Breakthrough (Bengaluru)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('peace')}
              className="px-3 py-1 rounded-full bg-white/90 border border-[#B38048]/35 text-[#B38048] hover:border-[#B38048] hover:bg-[#B38048]/10 font-medium transition shadow-xs cursor-pointer"
            >
              🕊️ Peace & Harmony (Varanasi)
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs (Glassmorphic) */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#B38048]/10 p-1.5 rounded-2xl border border-[#B38048]/30 flex max-w-md w-full text-xs sm:text-sm font-semibold shadow-inner">
            <button
              type="button"
              onClick={() => setMode('kundali')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'kundali'
                  ? 'bg-gradient-to-r from-[#C59359] to-[#B38048] text-white font-bold shadow-md'
                  : 'text-stone-600 hover:text-[#B38048]'
              }`}
            >
              <Compass className="w-4 h-4" />
              Accurate Birth Chart (Kundali)
            </button>
            <button
              type="button"
              onClick={() => setMode('rashi')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'rashi'
                  ? 'bg-gradient-to-r from-[#C59359] to-[#B38048] text-white font-bold shadow-md'
                  : 'text-stone-600 hover:text-[#B38048]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Quick Zodiac & Rashi
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'kundali' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#B38048]" />
                  Full Name / Devotee Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arjun Sharma"
                  className="w-full bg-white/90 border border-[#B38048]/35 rounded-xl px-4 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#B38048] focus:ring-2 focus:ring-[#B38048]/20 text-sm transition shadow-xs"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['male', 'female', 'other'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                        gender === g
                          ? 'bg-gradient-to-r from-[#C59359] to-[#B38048] text-white border border-[#B38048] shadow-xs'
                          : 'bg-white/80 text-stone-600 border border-[#B38048]/25 hover:border-[#B38048]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#B38048]" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-white/90 border border-[#B38048]/35 rounded-xl px-4 py-2.5 text-stone-900 focus:outline-none focus:border-[#B38048] focus:ring-2 focus:ring-[#B38048]/20 text-sm transition shadow-xs"
                />
              </div>

              {/* Time of Birth */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#B38048]" />
                    Exact Time of Birth (24-hr)
                  </span>
                  <span className="text-[11px] text-[#B38048] lowercase font-normal">
                    (crucial for Lagna ascendant)
                  </span>
                </label>
                <input
                  type="time"
                  required
                  value={tob}
                  onChange={(e) => setTob(e.target.value)}
                  className="w-full bg-white/90 border border-[#B38048]/35 rounded-xl px-4 py-2.5 text-stone-900 focus:outline-none focus:border-[#B38048] focus:ring-2 focus:ring-[#B38048]/20 text-sm transition shadow-xs"
                />
              </div>

              {/* Place of Birth */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B38048]" />
                  Place of Birth (City / State)
                </label>
                <input
                  type="text"
                  required
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="e.g. Mumbai, Maharashtra"
                  className="w-full bg-white/90 border border-[#B38048]/35 rounded-xl px-4 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#B38048] focus:ring-2 focus:ring-[#B38048]/20 text-sm transition shadow-xs"
                />
                <div className="mt-1 flex flex-wrap gap-1">
                  {POPULAR_CITIES.slice(0, 4).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setPlace(c)}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#B38048]/25 text-stone-600 hover:text-[#B38048] hover:border-[#B38048] transition cursor-pointer"
                    >
                      {c.split(',')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Body Weight for Ratti Calculation */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-[#B38048]" />
                    Body Weight (kg)
                  </span>
                  <span className="text-[11px] text-[#B38048] font-medium">
                    {weightKg} kg ≈ {(weightKg / 12).toFixed(2)} Ratti recommended
                  </span>
                </label>
                <input
                  type="number"
                  min="30"
                  max="150"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full bg-white/90 border border-[#B38048]/35 rounded-xl px-4 py-2.5 text-stone-900 focus:outline-none focus:border-[#B38048] focus:ring-2 focus:ring-[#B38048]/20 text-sm transition shadow-xs"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Quick Zodiac Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                  Select Sun Sign / Rashi
                </label>
                <select
                  value={selectedZodiac}
                  onChange={(e) => setSelectedZodiac(e.target.value)}
                  className="w-full bg-white/90 border border-[#B38048]/35 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:outline-none focus:border-[#B38048]"
                >
                  {ZODIAC_SIGNS.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name} ({s.hindi})
                    </option>
                  ))}
                </select>
              </div>

              {/* Nakshatra Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                  Select Birth Star (Nakshatra)
                </label>
                <select
                  value={selectedNakshatra}
                  onChange={(e) => setSelectedNakshatra(e.target.value)}
                  className="w-full bg-white/90 border border-[#B38048]/35 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:outline-none focus:border-[#B38048]"
                >
                  {NAKSHATRAS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Prime Life Objective / Life Goal */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#B38048]" />
              Primary Life Objective (Karaka Energy Activation)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {[
                { id: 'wealth', label: 'Wealth & Assets', icon: '💰', sub: '2nd & 11th House' },
                { id: 'career', label: 'Career & Power', icon: '👑', sub: '10th House' },
                { id: 'health', label: 'Health & Vitality', icon: '🌿', sub: '1st Lagna House' },
                { id: 'marriage', label: 'Love & Marriage', icon: '💍', sub: '7th House' },
                { id: 'protection', label: 'Dosha Shield', icon: '🛡️', sub: 'Rahu-Ketu / Shani' },
                { id: 'peace', label: 'Mental Peace', icon: '🕊️', sub: '4th Moon House' },
                { id: 'education', label: 'Intellect & Exams', icon: '📚', sub: '5th House' },
              ].map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setLifeGoal(goal.id as LifeGoal)}
                  className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between cursor-pointer ${
                    lifeGoal === goal.id
                      ? 'bg-[#B38048]/15 border-[#B38048] text-stone-900 shadow-md ring-2 ring-[#B38048]/30'
                      : 'bg-white/70 border-[#B38048]/25 text-stone-600 hover:border-[#B38048] hover:bg-white'
                  }`}
                >
                  <span className="text-xl mb-1">{goal.icon}</span>
                  <div>
                    <p className="text-xs font-bold leading-tight text-stone-900">{goal.label}</p>
                    <span className="text-[10px] text-[#B38048] block mt-0.5 font-medium">{goal.sub}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#B38048]/25">
            <div className="text-xs text-stone-500 text-center sm:text-left font-medium">
              🔒 100% confidential astrological computation. Real-time planetary algorithms as per Brihat Parashara Hora Shastra.
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C59359] via-[#B38048] to-[#8F5E29] text-white font-serif-royal font-black text-sm tracking-wider uppercase hover:brightness-105 active:scale-98 shadow-[0_6px_24px_rgba(179,128,72,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Astrological Dossier...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Calculate Lucky Stone & Generate Dossier
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
