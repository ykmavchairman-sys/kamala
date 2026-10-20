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
      desc: 'Wake up before sunrise during the auspicious Shukla Paksha (Waxing Moon). Take a holy bath and wear clean auspicious clothes corresponding to the planet (e.g. Yellow for Jupiter, White for Venus/Moon, Red for Sun/Mars).',
      icon: <Sun className="w-5 h-5 text-amber-600" />
    },
    {
      num: '02',
      title: 'Panchamrit Cleansing (Nirmalya Shuddhi)',
      desc: 'Place the gemstone ring/pendant in a clean copper or brass bowl. Immerse in raw unpasteurized cow milk for 15 minutes, followed by sacred Gangajal infused with fresh Tulsi leaves and pure honey to discharge all physical merchant residue.',
      icon: <Sparkles className="w-5 h-5 text-amber-600" />
    },
    {
      num: '03',
      title: 'Altar Setup & Cosmic Direction',
      desc: 'Spread a fresh silk cloth facing East (Purva) or North-East (Ishanya Kon). Place the energized jewel on the cloth. Light a pure cow-ghee Diya and sandalwood incense (Dhoop). Offer fresh flowers (Pushpa).',
      icon: <Compass className="w-5 h-5 text-amber-600" />
    },
    {
      num: '04',
      title: '108-Time Beej Mantra Prana Pratishtha',
      desc: 'Hold your right hand over the gemstone or hold a sacred Rudraksha / Sphatik mala. Recite the planetary Beej Mantra with sincere mental devotion 108 times to awaken the gemstone\'s crystalline matrix.',
      icon: <Flame className="w-5 h-5 text-amber-600" />
    },
    {
      num: '05',
      title: 'Adornment on Designated Finger',
      desc: `Slip the ring onto your designated ${gem.recommendedFinger} of the ${gem.recommendedHand} right as the sun ascends. Touch your elders\' feet or bow before the family deity for lifetime blessings.`,
      icon: <Award className="w-5 h-5 text-amber-600" />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold mb-3 shadow-xs">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          SACRED VEDIC CONSECRATION
        </div>
        <h2 className="font-serif-royal text-2xl sm:text-4xl font-extrabold text-stone-900">
          Prana Pratishtha & <span className="text-gold-gradient">Mantra Energization</span>
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
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                selectedKey === k
                  ? 'bg-gradient-to-r from-[#DFB743] to-[#D4AF37] text-stone-950 border-amber-300 shadow-sm'
                  : 'bg-white/80 border-amber-200/60 text-stone-700 hover:border-amber-300'
              }`}
            >
              {NAVARATNA_DATABASE[k].name.split(' ')[0]} ({NAVARATNA_DATABASE[k].planet})
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive 108 Digital Mala + Step-by-Step Ritual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Digital 108 Beads Japa Mala (White Gold Glass) */}
        <div className="lg:col-span-5 glass-card-gold rounded-3xl p-6 sm:p-8 shadow-[0_12px_45px_rgba(212,175,55,0.15)] relative overflow-hidden border-2 border-amber-300/60">
          <div className="flex items-center justify-between gap-2 mb-6">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Digital 108 Japa Mala
            </span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-xl bg-white border border-amber-300 text-amber-800 hover:text-stone-950 transition shadow-xs cursor-pointer"
              title={soundEnabled ? 'Mute Temple Bell' : 'Enable Temple Bell'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Planetary Deity & Mantra Details */}
          <div className="bg-white/85 p-4 rounded-2xl border border-amber-300/60 text-center mb-6 shadow-xs">
            <span className="text-[10px] text-amber-800 uppercase tracking-widest block font-extrabold">
              Presiding Deity: {gem.planetSanskrit}
            </span>
            <h3 className="font-serif-royal text-lg font-extrabold text-stone-900 mt-0.5">
              {gem.name}
            </h3>
            <div className="mt-3 p-3 bg-gradient-to-r from-[#FAF2DC] to-[#F5E6BD] rounded-xl border border-amber-300 font-serif-royal text-sm sm:text-base text-stone-950 font-bold leading-relaxed shadow-2xs">
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
                stroke="#EAE2CE"
                strokeWidth="6"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#D4AF37"
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
              <span className="text-xs text-amber-900 font-bold">of 108 Chants</span>
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
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#DFB743] via-[#D4AF37] to-[#B38728] text-stone-950 font-serif-royal font-black text-sm uppercase tracking-wider hover:brightness-105 active:scale-98 shadow-[0_6px_24px_rgba(212,175,55,0.35)] transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 border border-amber-200"
            >
              <Sparkles className="w-4 h-4" />
              {chantCount >= 108 ? 'Prana Pratishtha Complete' : 'Chant Mantra (Tap Bead)'}
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => setIsAutoChanting(!isAutoChanting)}
                disabled={chantCount >= 108}
                className="flex-1 py-2.5 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-50 transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                {isAutoChanting ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isAutoChanting ? 'Pause Auto-Jaap' : 'Auto-Jaap Mode'}
              </button>

              <button
                onClick={resetChant}
                className="px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-50 transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
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
          <div className="glass-card-subtle rounded-3xl p-5 mb-4 flex items-center justify-between border border-amber-200/80 shadow-xs">
            <div>
              <span className="text-[10px] text-amber-800 uppercase tracking-widest font-extrabold block">
                Prescribed Muhurat
              </span>
              <p className="text-sm font-bold text-stone-900 mt-0.5">
                {gem.auspiciousDay}
              </p>
              <span className="text-xs text-amber-800 font-semibold">{gem.auspiciousTime}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-amber-800 uppercase tracking-widest font-extrabold block">
                Prescribed Metal & Finger
              </span>
              <p className="text-xs font-bold text-stone-900 mt-0.5">{gem.recommendedFinger}</p>
              <span className="text-xs text-amber-800 font-semibold">{gem.recommendedMetal}</span>
            </div>
          </div>

          {RITUAL_STEPS.map((step) => (
            <div
              key={step.num}
              className="glass-card rounded-2xl p-5 hover:border-amber-400 transition-all flex items-start gap-4 shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DFB743] to-[#D4AF37] border border-amber-300 flex items-center justify-center shrink-0 text-stone-950 font-serif-royal font-extrabold text-sm shadow-xs">
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

          {/* Complimentary Sri Kamala Jewellers Energization Service */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-[#FAF3DF] via-[#F5E6BF] to-[#FAF3DF] border border-amber-300 flex items-center justify-between gap-4 shadow-sm">
            <div>
              <h4 className="font-serif-royal text-sm font-bold text-stone-950">
                Want our Vedic Pundits to perform this for you?
              </h4>
              <p className="text-xs text-stone-700 mt-0.5 font-medium">
                Every gemstone purchased at Sri Kamala Jewellers undergoes complete 1008-mantra Vedic Prana Pratishtha at our Varanasi & Ujjain temple shrines before dispatch at zero extra charge.
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#DFB743] to-[#D4AF37] text-stone-950 text-xs font-extrabold whitespace-nowrap shadow-xs border border-amber-200">
              100% Free Service
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
