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
      {/* Background ambient gold halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-amber-200/20 blur-[130px] pointer-events-none -z-10" />

      {/* Glassmorphic Container Card */}
      <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 shadow-[0_12px_45px_rgba(212,175,55,0.12)] border border-amber-300/40 relative overflow-hidden">
        {/* Luxury Gold Border Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            VEDIC JYOTISH & HOROSCOPE ENGINE
          </div>
          <h2 className="font-serif-royal text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Discover Your <span className="text-gold-gradient">Bhagyashali Ratna</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed font-medium">
            Personalized gemstone recommendation based on your natal birth chart, planetary transits, and specific life goals — authenticated by Sri Kamala Jewellers.
          </p>

          {/* Quick Demo Personas */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-amber-900/80 font-bold">Quick Demo Profiles:</span>
            <button
              type="button"
              onClick={() => loadPreset('wealth')}
              className="px-3 py-1 rounded-full bg-white/90 border border-amber-300/70 text-amber-900 hover:border-amber-500 hover:bg-amber-50 font-medium transition shadow-xs"
            >
              👑 Business & Wealth (Jaipur)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('career')}
              className="px-3 py-1 rounded-full bg-white/90 border border-amber-300/70 text-amber-900 hover:border-amber-500 hover:bg-amber-50 font-medium transition shadow-xs"
            >
              🚀 Career Breakthrough (Bengaluru)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('peace')}
              className="px-3 py-1 rounded-full bg-white/90 border border-amber-300/70 text-amber-900 hover:border-amber-500 hover:bg-amber-50 font-medium transition shadow-xs"
            >
              🕊️ Peace & Harmony (Varanasi)
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs (Glassmorphic) */}
        <div className="flex justify-center mb-8">
          <div className="bg-amber-50/80 p-1.5 rounded-2xl border border-amber-300/60 flex max-w-md w-full text-xs sm:text-sm font-semibold shadow-inner">
            <button
              type="button"
              onClick={() => setMode('kundali')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
                mode === 'kundali'
                  ? 'bg-gradient-to-r from-[#DFB743] to-[#D4AF37] text-stone-950 font-bold shadow-md'
                  : 'text-stone-600 hover:text-amber-950'
              }`}
            >
              <Compass className="w-4 h-4" />
              Accurate Birth Chart (Kundali)
            </button>
            <button
              type="button"
              onClick={() => setMode('rashi')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
                mode === 'rashi'
                  ? 'bg-gradient-to-r from-[#DFB743] to-[#D4AF37] text-stone-950 font-bold shadow-md'
                  : 'text-stone-600 hover:text-amber-950'
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
                  <User className="w-3.5 h-3.5 text-amber-600" />
                  Full Name / Devotee Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arjun Sharma"
                  className="w-full bg-white/90 border border-amber-300/60 rounded-xl px-4 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm transition shadow-xs"
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
                      className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                        gender === g
                          ? 'bg-amber-100 text-amber-950 border-2 border-amber-400 shadow-xs'
                          : 'bg-white/80 text-stone-600 border border-amber-200/60 hover:border-amber-400'
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
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-white/90 border border-amber-300/60 rounded-xl px-4 py-2.5 text-stone-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm transition shadow-xs"
                />
              </div>

              {/* Time of Birth */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Exact Time of Birth (24-hr)
                  </span>
                  <span className="text-[11px] text-amber-700 lowercase font-normal">
                    (crucial for Lagna ascendant)
                  </span>
                </label>
                <input
                  type="time"
                  required
                  value={tob}
                  onChange={(e) => setTob(e.target.value)}
                  className="w-full bg-white/90 border border-amber-300/60 rounded-xl px-4 py-2.5 text-stone-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm transition shadow-xs"
                />
              </div>

              {/* Place of Birth */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  Place of Birth (City & Country)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    placeholder="e.g. Mumbai, India"
                    list="city-suggestions"
                    className="w-full bg-white/90 border border-amber-300/60 rounded-xl px-4 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm transition shadow-xs"
                  />
                  <datalist id="city-suggestions">
                    {POPULAR_CITIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Body Weight for Vedic Ratti Formula */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-amber-600" />
                    Body Weight (kg)
                  </span>
                  <span className="text-[11px] text-amber-700 font-semibold">
                    Vedic formula: 1 Ratti per 12kg
                  </span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="35"
                    max="140"
                    step="1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="flex-1 accent-amber-600 cursor-pointer"
                  />
                  <span className="w-16 text-center font-bold text-amber-950 bg-amber-100/90 border border-amber-300 py-1.5 rounded-lg text-sm shadow-xs">
                    {weightKg} kg
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Quick Rashi Mode */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Select Moon Sign / Sun Sign
                </label>
                <select
                  value={selectedZodiac}
                  onChange={(e) => setSelectedZodiac(e.target.value)}
                  className="w-full bg-white/90 border border-amber-300/60 rounded-xl px-4 py-2.5 text-stone-900 focus:outline-none focus:border-amber-500 text-sm shadow-xs"
                >
                  {ZODIAC_SIGNS.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name} ({s.hindi}) — {s.dates}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                  Birth Star / Nakshatra (If Known)
                </label>
                <select
                  value={selectedNakshatra}
                  onChange={(e) => setSelectedNakshatra(e.target.value)}
                  className="w-full bg-white/90 border border-amber-300/60 rounded-xl px-4 py-2.5 text-stone-900 focus:outline-none focus:border-amber-500 text-sm shadow-xs"
                >
                  {NAKSHATRAS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Varma"
                  className="w-full bg-white/90 border border-amber-300/60 rounded-xl px-4 py-2.5 text-stone-900 focus:outline-none focus:border-amber-500 text-sm shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                  Body Weight (kg)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="35"
                    max="140"
                    step="1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="flex-1 accent-amber-600 cursor-pointer"
                  />
                  <span className="w-16 text-center font-bold text-amber-950 bg-amber-100/90 border border-amber-300 py-1.5 rounded-lg text-sm shadow-xs">
                    {weightKg} kg
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Prime Life Objective / Life Goal */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-amber-600" />
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
                  className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between glass-card-hover ${
                    lifeGoal === goal.id
                      ? 'bg-amber-100/90 border-amber-400 text-stone-900 shadow-md ring-2 ring-amber-300/60'
                      : 'bg-white/70 border-amber-200/50 text-stone-600 hover:border-amber-300 hover:bg-white'
                  }`}
                >
                  <span className="text-xl mb-1">{goal.icon}</span>
                  <div>
                    <p className="text-xs font-bold leading-tight text-stone-900">{goal.label}</p>
                    <span className="text-[10px] text-amber-700 block mt-0.5 font-medium">{goal.sub}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-amber-200/60">
            <div className="text-xs text-stone-500 text-center sm:text-left font-medium">
              🔒 100% confidential astrological computation. Real-time planetary algorithms as per Brihat Parashara Hora Shastra.
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#DFB743] via-[#D4AF37] to-[#B38728] text-stone-950 font-serif-royal font-black text-sm tracking-wider uppercase hover:brightness-105 active:scale-98 shadow-[0_6px_24px_rgba(212,175,55,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-200 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
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
