import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Award,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Compass,
  Flame,
  Sun
} from 'lucide-react';
import { GemstoneRecommendation } from '../types/astrology';
import { NAVARATNA_DATABASE } from '../utils/astrologyEngine';
import { bellPlayer } from '../utils/audioBell';

interface Props {
  activeGemstone?: GemstoneRecommendation;
}

export const PranaPratishthaGuide: React.FC<Props> = ({ activeGemstone }) => {
  // Select active gemstone for mantra
  const [selectedKey, setSelectedKey] = useState<string>('YellowSapphire');

  useEffect(() => {
    if (activeGemstone) {
      const match = Object.keys(NAVARATNA_DATABASE).find(
        (k) => NAVARATNA_DATABASE[k].name === activeGemstone.name || NAVARATNA_DATABASE[k].planet === activeGemstone.planet
      );
      if (match) setSelectedKey(match);
    }
  }, [activeGemstone]);

  const gem = NAVARATNA_DATABASE[selectedKey] || NAVARATNA_DATABASE.YellowSapphire;

  // Digital 108 Bead Japa Mala Counter
  const [chantCount, setChantCount] = useState<number>(0);
  const [isAutoChanting, setIsAutoChanting] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const incrementChant = () => {
    if (chantCount < 108) {
      const next = chantCount + 1;
      setChantCount(next);

      if (soundEnabled) {
        if (next === 108) {
          bellPlayer.playConchShell();
        } else if (next % 27 === 0) {
          bellPlayer.playBell(659);
        } else {
          bellPlayer.playBell(528);
        }
      }
    }
  };

  const resetChant = () => {
    setChantCount(0);
    setIsAutoChanting(false);
  };

  // Auto chanting loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoChanting && chantCount < 108) {
      interval = setInterval(() => {
        setChantCount((prev) => {
          const next = prev + 1;
          if (soundEnabled) {
            if (next === 108) {
              bellPlayer.playConchShell();
            } else if (next % 27 === 0) {
              bellPlayer.playBell(659);
            } else {
              bellPlayer.playBell(528);
            }
          }
          if (next >= 108) {
            setIsAutoChanting(false);
          }
          return next;
        });
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isAutoChanting, chantCount, soundEnabled]);

  const RITUAL_STEPS = [
    {
      num: '01',
      title: 'Brahma Muhurat Purification Bath',
      desc: 'Wake up before sunrise during the auspicious Shukla Paksha (Waxing Moon). Take a holy bath and wear clean auspicious clothes corresponding to the planetary frequency.',
      icon: <Sun className="w-5 h-5 text-[#B38048]" />
    },
    {
      num: '02',
      title: 'Panchamrit Cleansing (Nirmalya Shuddhi)',
      desc: 'Place the gemstone ring/pendant in a clean silver or copper vessel. Immerse in raw unpasteurized cow milk for 15 minutes, followed by sacred Gangajal infused with fresh Tulsi leaves to discharge all handling residue.',
      icon: <Sparkles className="w-5 h-5 text-[#B38048]" />
    },
    {
      num: '03',
      title: 'Altar Setup & Cosmic Direction',
      desc: 'Spread a fresh silk cloth facing East (Purva) or North-East (Ishanya Kon). Place the energized jewel on the cloth. Light a pure cow-ghee Diya and natural sandalwood incense. Offer fresh flowers.',
      icon: <Compass className="w-5 h-5 text-[#B38048]" />
    },
    {
      num: '04',
      title: '108-Time Beej Mantra Prana Pratishtha',
      desc: 'Hold your right hand over the gemstone or hold a sacred mala. Recite the planetary Beej Mantra with sincere mental devotion 108 times to awaken the gemstone\'s crystalline matrix.',
      icon: <Flame className="w-5 h-5 text-[#B38048]" />
    },
    {
      num: '05',
      title: 'Adornment on Designated Finger',
      desc: `Slip the ring onto your designated ${gem.recommendedFinger} of the ${gem.recommendedHand} right as the sun ascends. Touch your elders' feet or bow before the family deity for lifetime blessings.`,
      icon: <Award className="w-5 h-5 text-[#B38048]" />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B38048]/10 border border-[#B38048]/30 text-[#B38048] text-xs font-bold mb-3 shadow-xs">
          <Award className="w-3.5 h-3.5 text-[#B38048]" />
          SACRED VEDIC CONSECRATION
        </div>
        <h2 className="font-serif-royal text-2xl sm:text-4xl font-extrabold text-stone-900">
          Prana Pratishtha & <span className="text-[#B38048]">Mantra Energization</span>
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed font-medium">
          A gemstone without authentic Vedic Prana Pratishtha is merely an ornamental stone. Consecrate your jewel into an active cosmic satellite using this classical ritual and the 108-chant Japa Mala tracker.
        </p>

        {/* Gemstone Switcher */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {Object.keys(NAVARATNA_DATABASE).map((k) => (
            <button
              key={k}
              onClick={() => {
                setSelectedKey(k);
                setChantCount(0);
                bellPlayer.playBell(587);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                selectedKey === k
                  ? 'bg-gradient-to-r from-[#C59359] to-[#B38048] text-white border-[#B38048] shadow-sm'
                  : 'bg-white/90 border-[#B38048]/25 text-stone-700 hover:border-[#B38048]'
              }`}
            >
              {NAVARATNA_DATABASE[k].name.split(' ')[0]} ({NAVARATNA_DATABASE[k].planet})
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive 108 Digital Mala + Step-by-Step Ritual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Digital 108 Beads Japa Mala (Pearl White Glass & Tan) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 shadow-[0_12px_45px_rgba(179,128,72,0.12)] relative overflow-hidden border border-[#B38048]/35">
          <div className="flex items-center justify-between gap-2 mb-6">
            <span className="text-xs font-bold text-[#B38048] uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#B38048]" />
              Digital 108 Japa Mala
            </span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-xl bg-white border border-[#B38048]/30 text-[#B38048] hover:text-[#8F5E29] transition shadow-xs cursor-pointer"
              title={soundEnabled ? 'Mute Temple Bell' : 'Enable Temple Bell'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Planetary Deity & Mantra Details */}
          <div className="bg-white/95 p-4 rounded-2xl border border-[#B38048]/30 text-center mb-6 shadow-xs">
            <span className="text-[10px] text-[#B38048] uppercase tracking-widest block font-extrabold">
              Presiding Deity: {gem.planetSanskrit}
            </span>
            <h3 className="font-serif-royal text-lg font-extrabold text-stone-900 mt-0.5">
              {gem.name}
            </h3>
            <div className="mt-3 p-3 bg-[#B38048]/10 rounded-xl border border-[#B38048]/25 font-serif-royal text-sm sm:text-base text-[#7A4F20] font-bold leading-relaxed shadow-2xs">
              {gem.beejMantra}
            </div>
          </div>

          {/* 108 Bead Circular Progress Display */}
          <div className="relative w-56 h-56 mx-auto my-6 flex flex-col items-center justify-center">
            {/* Circular SVG Progress */}
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#EFE8DD"
                strokeWidth="6"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#B38048"
                strokeWidth="6"
                strokeDasharray="276.46"
                strokeDashoffset={276.46 - (276.46 * chantCount) / 108}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>

            {/* Inner Counter Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-serif-royal text-4xl font-extrabold text-stone-900">
                {chantCount}
              </span>
              <span className="text-xs text-[#B38048] font-bold">of 108 Chants</span>
              {chantCount === 108 && (
                <span className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1 animate-bounce">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Consecrated!
                </span>
              )}
            </div>
          </div>

          {/* Chant Controls */}
          <div className="space-y-3">
            <button
              onClick={incrementChant}
              disabled={chantCount >= 108}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#C59359] via-[#B38048] to-[#8F5E29] text-white font-serif-royal font-black text-sm uppercase tracking-wider hover:brightness-105 active:scale-98 shadow-[0_6px_24px_rgba(179,128,72,0.35)] transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 border border-white/20"
            >
              <Sparkles className="w-4 h-4" />
              {chantCount >= 108 ? 'Prana Pratishtha Complete' : 'Chant Mantra (Tap Bead)'}
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => setIsAutoChanting(!isAutoChanting)}
                disabled={chantCount >= 108}
                className="flex-1 py-2.5 rounded-xl bg-white border border-[#B38048]/30 text-[#B38048] text-xs font-bold hover:bg-[#B38048]/10 transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                {isAutoChanting ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isAutoChanting ? 'Pause Auto-Jaap' : 'Auto-Jaap Mode'}
              </button>

              <button
                onClick={resetChant}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#B38048]/30 text-[#B38048] text-xs font-bold hover:bg-[#B38048]/10 transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>
          </div>

          <div className="mt-4 text-[11px] text-stone-500 text-center font-medium">
            Tap button or spacebar with each recitation. Authentic brass temple bell resonates automatically.
          </div>
        </div>

        {/* Right Column: Step-by-Step Astrological Ritual Timeline */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card-subtle rounded-3xl p-5 mb-4 flex items-center justify-between border border-[#B38048]/25 shadow-xs">
            <div>
              <span className="text-[10px] text-[#B38048] uppercase tracking-widest font-extrabold block">
                Prescribed Muhurat
              </span>
              <p className="text-sm font-bold text-stone-900 mt-0.5">
                {gem.auspiciousDay}
              </p>
              <span className="text-xs text-[#B38048] font-semibold">{gem.auspiciousTime}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#B38048] uppercase tracking-widest font-extrabold block">
                Prescribed Metal & Finger
              </span>
              <p className="text-xs font-bold text-stone-900 mt-0.5">{gem.recommendedFinger}</p>
              <span className="text-xs text-[#B38048] font-semibold">{gem.recommendedMetal}</span>
            </div>
          </div>

          {RITUAL_STEPS.map((step) => (
            <div
              key={step.num}
              className="glass-card rounded-2xl p-5 hover:border-[#B38048]/60 transition-all flex items-start gap-4 shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C59359] to-[#B38048] border border-[#B38048]/40 flex items-center justify-center shrink-0 text-white font-serif-royal font-extrabold text-sm shadow-xs">
                {step.num}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {step.icon}
                  <h4 className="font-serif-royal text-sm sm:text-base font-bold text-stone-900">
                    {step.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Complimentary Consecration Service by Nukala Srinivas Rao */}
          <div className="p-5 rounded-3xl bg-[#B38048]/10 border border-[#B38048]/30 flex items-center justify-between gap-4 shadow-sm">
            <div>
              <h4 className="font-serif-royal text-sm font-bold text-stone-950">
                Want Chief Astrologer Nukala Srinivas Rao to perform this?
              </h4>
              <p className="text-xs text-stone-700 mt-0.5 font-medium">
                Every gemstone undergoes complete 1008-mantra Vedic Prana Pratishtha personally supervised by Nukala Srinivas Rao before dispatch at zero extra charge.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#C59359] to-[#B38048] text-white text-xs font-extrabold whitespace-nowrap shadow-xs">
              100% Free Service
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
