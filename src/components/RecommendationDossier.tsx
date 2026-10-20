import React, { useState } from 'react';
import {
  Sparkles,
  ShieldAlert,
  Printer,
  Compass,
  Volume2,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Flame,
  Award,
  Layers
} from 'lucide-react';
import { AstrologicalReport, GemstoneRecommendation } from '../types/astrology';
import { GemstoneGraphic } from './GemstoneGraphic';
import { KundaliChartSvg } from './KundaliChartSvg';
import { bellPlayer } from '../utils/audioBell';

interface Props {
  report: AstrologicalReport;
  onCustomizeJewel: (gemstone: GemstoneRecommendation) => void;
  onOpenBooking: () => void;
  onOpenRitual: () => void;
  onOpenAstrologerPortal?: () => void;
}

export const RecommendationDossier: React.FC<Props> = ({
  report,
  onCustomizeJewel,
  onOpenBooking,
  onOpenRitual,
  onOpenAstrologerPortal,
}) => {
  const [activeStoneTab, setActiveStoneTab] = useState<'primary' | 'lagna' | 'secondary'>('primary');
  const [copiedMantra, setCopiedMantra] = useState(false);

  const selectedStone =
    activeStoneTab === 'primary'
      ? report.primaryStone
      : activeStoneTab === 'lagna' && report.lagnaStone
      ? report.lagnaStone
      : report.secondaryStone || report.primaryStone;

  const handleCopyMantra = (mantra: string) => {
    navigator.clipboard.writeText(mantra);
    setCopiedMantra(true);
    bellPlayer.playBell(528);
    setTimeout(() => setCopiedMantra(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-12 print:p-0">
      {/* Dossier Header Strip (Glassmorphism White & Gold) */}
      <div className="glass-card-gold rounded-3xl p-6 sm:p-8 shadow-[0_12px_45px_rgba(212,175,55,0.15)] relative overflow-hidden">
        {/* Soft Gold Radial Halo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            {/* SKJ Logo Watermark / Emblem (1:1 Small Size) */}
            <div className="w-12 h-12 aspect-square rounded-2xl bg-gradient-to-br from-[#F5E29D] via-[#D4AF37] to-[#A37B1E] p-[1.5px] shadow-sm shrink-0 hidden sm:block">
              <div className="w-full h-full aspect-square bg-white rounded-[14px] overflow-hidden flex items-center justify-center p-1 border border-amber-200">
                <img
                  src="/assets/aistudio/Golden_Lotus_Emblem_with_SKJ_Monogram_31db152a.png"
                  alt="Sri Kamala Jewellers Logo"
                  className="w-full h-full aspect-square object-contain"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold tracking-wider uppercase shadow-xs">
                  Official Jyotish Dossier
                </span>
                <span className="text-xs text-amber-800/70 font-semibold">Ref: SKJ-{Date.now().toString().slice(-6)}</span>
              </div>

              <h1 className="font-serif-royal text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900">
                Astrological Gemstone Dossier for <span className="text-gold-gradient">{report.input.name}</span>
              </h1>

              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl font-medium">
                Natal Chart calculated for {report.input.dob} at {report.input.tob} hrs ({report.input.place}).
                Calibrated for maximum empowerment of <span className="text-amber-800 font-bold">{report.input.lifeGoal.toUpperCase()}</span>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-white/90 border border-amber-300/80 text-amber-900 hover:bg-amber-50 text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-600" />
              Print / Save PDF
            </button>

            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFB743] via-[#D4AF37] to-[#B38728] text-stone-950 text-xs font-bold uppercase tracking-wider hover:brightness-105 shadow-[0_4px_16px_rgba(212,175,55,0.3)] transition flex items-center gap-1.5 cursor-pointer border border-amber-200"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Speak with Master Astrologer
            </button>
          </div>
        </div>

        {/* Natal Key Metrics Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-amber-200/70">
          <div className="glass-card-subtle p-3.5 rounded-2xl border border-amber-200/60 shadow-xs">
            <span className="text-[10px] text-amber-800 uppercase tracking-widest block font-bold">Lagna (Ascendant)</span>
            <span className="text-sm font-bold text-stone-900 font-serif-royal">{report.lagnaRashi}</span>
            <span className="text-[10px] text-stone-500 block font-medium">Lord: {report.lagnaLord}</span>
          </div>

          <div className="glass-card-subtle p-3.5 rounded-2xl border border-amber-200/60 shadow-xs">
            <span className="text-[10px] text-amber-800 uppercase tracking-widest block font-bold">Moon Sign (Rashi)</span>
            <span className="text-sm font-bold text-stone-900 font-serif-royal">{report.moonRashi}</span>
            <span className="text-[10px] text-stone-500 block font-medium">Lord: {report.moonLord}</span>
          </div>

          <div className="glass-card-subtle p-3.5 rounded-2xl border border-amber-200/60 shadow-xs">
            <span className="text-[10px] text-amber-800 uppercase tracking-widest block font-bold">Sun Sign (Surya)</span>
            <span className="text-sm font-bold text-stone-900 font-serif-royal">{report.sunRashi}</span>
            <span className="text-[10px] text-stone-500 block font-medium">Solar Core</span>
          </div>

          <div className="glass-card-subtle p-3.5 rounded-2xl border border-amber-200/60 shadow-xs">
            <span className="text-[10px] text-amber-800 uppercase tracking-widest block font-bold">Birth Star (Nakshatra)</span>
            <span className="text-sm font-bold text-stone-900 truncate block font-serif-royal">{report.nakshatra}</span>
            <span className="text-[10px] text-stone-500 block font-medium">Lunar Mansion</span>
          </div>

          <div className="col-span-2 sm:col-span-4 lg:col-span-1 glass-card-subtle p-3.5 rounded-2xl border border-amber-200/60 shadow-xs">
            <span className="text-[10px] text-amber-800 uppercase tracking-widest block font-bold">Active Mahadasha</span>
            <span className="text-xs font-bold text-amber-900 truncate block">{report.currentDasha}</span>
            <span className="text-[10px] text-emerald-700 block flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-2.5 h-2.5" /> High Benefic Window
            </span>
          </div>
        </div>
      </div>

      {/* Official Astrologer Approval & Sanction Certificate Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 border-2 shadow-lg relative overflow-hidden transition-all ${
        report.astrologerApproval?.status === 'approved'
          ? 'glass-card-gold border-amber-400 bg-gradient-to-br from-[#FFFDF7] via-[#FFF9EE] to-[#FFF4D9]'
          : 'glass-card border-amber-300 bg-white/90'
      }`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            {/* Royal Gold Wax Seal */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#8B0000] via-[#A01020] to-[#600512] p-1 shadow-md border-2 border-amber-400 flex items-center justify-center text-amber-200">
                <div className="w-full h-full rounded-full border border-dashed border-amber-300/80 flex flex-col items-center justify-center p-1">
                  <Award className="w-5 h-5 text-amber-300" />
                  <span className="text-[8px] font-black uppercase tracking-tighter text-amber-200 mt-0.5">
                    SANCTIONED
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                ✓
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-[#8B0000] text-amber-100 text-[10px] font-black uppercase tracking-wider shadow-2xs">
                  {report.astrologerApproval?.status === 'approved'
                    ? 'OFFICIALLY APPROVED & SANCTIONED'
                    : 'ASTROLOGER AUDIT PENDING'}
                </span>
                <span className="text-xs text-amber-950 font-bold">
                  Cert ID: {report.astrologerApproval?.certificateId || 'SKJ-VEDIC-APPROVED'}
                </span>
              </div>

              <h3 className="font-serif-royal text-xl sm:text-2xl font-black text-stone-900">
                Verified by Acharya Nukala Srinivasrao
              </h3>

              <p className="text-xs text-stone-700 max-w-3xl leading-relaxed font-medium">
                {report.astrologerApproval?.sanctionNotes ||
                  `Lagna Lord and 9th House Bhagya Sthana personally audited. No Maraka/Badhaka affliction detected. Natural unheated gemstone verified to radiate auspicious frequencies.`}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-bold text-amber-950">
                <span className="flex items-center gap-1 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Maraka / Badhaka Safe
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Open-Back Skin Touch Mandate
                </span>
                <span>•</span>
                <span>Prescribed Metal: {report.astrologerApproval?.prescribedMetal || report.primaryStone.recommendedMetal}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {onOpenAstrologerPortal && (
              <button
                onClick={onOpenAstrologerPortal}
                className="px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-amber-950 hover:bg-amber-50 text-xs font-bold transition shadow-xs cursor-pointer whitespace-nowrap"
              >
                Astrologer Admin Desk
              </button>
            )}
            <button
              onClick={() => onCustomizeJewel(report.primaryStone)}
              className="px-5 py-2.5 rounded-xl btn-royal-crimson font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer whitespace-nowrap"
            >
              Craft Sanctioned Ring →
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Kundali Chart + Primary Gemstone Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Vedic Chart & Planetary Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <KundaliChartSvg
            lagnaRashi={report.lagnaRashi}
            lagnaRashiNumber={report.lagnaRashiNumber}
            lagnaDegreeFormatted={report.lagnaDegreeFormatted}
            ayanamsa={report.ayanamsa}
            planetaryPositions={report.planetaryPositions}
          />

          {/* Planetary Dignity Strength Table (Glassmorphic) */}
          <div className="glass-card rounded-3xl p-5 shadow-lg border border-amber-200/60">
            <h4 className="font-serif-royal text-sm font-bold text-stone-900 mb-3 flex items-center justify-between">
              <span>Natal Planetary Dignities</span>
              <span className="text-[11px] text-amber-700 font-semibold">Shadbala Analysis</span>
            </h4>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {report.planetaryPositions.map((pos) => (
                <div
                  key={pos.planet}
                  className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-white/70 border border-amber-200/40 shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="font-bold text-stone-900">{pos.planet} ({pos.sanskritName})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-stone-500 text-[11px] font-medium">H{pos.house} • {pos.rashi}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        pos.dignity === 'Exalted'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : pos.dignity === 'Own Sign' || pos.dignity === 'Moolatrikona'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : pos.dignity === 'Debilitated'
                          ? 'bg-rose-100 text-rose-900 border border-rose-300'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {pos.dignity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recommended Gemstone Showcase & Interactive Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Gemstone Category Tabs (Glassmorphic) */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-amber-50/70 border border-amber-300/50 rounded-2xl shadow-inner">
            <button
              onClick={() => {
                setActiveStoneTab('primary');
                bellPlayer.playBell(528);
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeStoneTab === 'primary'
                  ? 'bg-gradient-to-r from-[#DFB743] to-[#D4AF37] text-stone-950 shadow-md'
                  : 'text-stone-600 hover:text-amber-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              1. Bhagyashali (9th House Life Stone)
            </button>

            {report.lagnaStone && (
              <button
                onClick={() => {
                  setActiveStoneTab('lagna');
                  bellPlayer.playBell(587);
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  activeStoneTab === 'lagna'
                    ? 'bg-gradient-to-r from-[#DFB743] to-[#D4AF37] text-stone-950 shadow-md'
                    : 'text-stone-600 hover:text-amber-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                2. Lagna Shield (1st House)
              </button>
            )}

            {report.secondaryStone && (
              <button
                onClick={() => {
                  setActiveStoneTab('secondary');
                  bellPlayer.playBell(659);
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  activeStoneTab === 'secondary'
                    ? 'bg-gradient-to-r from-[#DFB743] to-[#D4AF37] text-stone-950 shadow-md'
                    : 'text-stone-600 hover:text-amber-900'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                3. Karya Siddhi ({report.input.lifeGoal})
              </button>
            )}
          </div>

          {/* Selected Gemstone Card (Opulent White & Gold Glass) */}
          <div className="glass-card-gold rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(212,175,55,0.18)] border-2 border-amber-300/60 relative overflow-hidden">
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <span className="text-[11px] text-amber-800 font-extrabold tracking-widest uppercase block">
                  {selectedStone.categoryLabel}
                </span>
                <h3 className="font-serif-royal text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
                  {selectedStone.name}
                </h3>
                <span className="text-sm font-bold text-amber-800 font-serif-royal block mt-0.5">
                  {selectedStone.hindiName} • Ruling Deity: {selectedStone.planetSanskrit}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-1 shadow-xs">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> 100% Auspicious
                </span>
              </div>
            </div>

            {/* Visual Gem Centerpiece + Specification Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-6">
              <div className="sm:col-span-5 flex flex-col items-center justify-center p-5 rounded-2xl bg-white/80 border border-amber-300/40 relative shadow-inner">
                <GemstoneGraphic
                  hexColor={selectedStone.hexColor}
                  glowColor={selectedStone.glowColor}
                  size={150}
                  cut="oval"
                />
                <span className="text-xs text-amber-900 font-bold mt-2.5">
                  {selectedStone.primaryColor}
                </span>
                <span className="text-[10px] text-stone-500 font-medium">
                  Natural Optical Prism Lattice
                </span>
              </div>

              <div className="sm:col-span-7 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
                  <span className="text-[10px] text-amber-800 uppercase tracking-widest block font-bold">Carat / Ratti Weight</span>
                  <p className="text-sm font-bold text-stone-900 mt-0.5">
                    {selectedStone.recommendedRatti} Ratti ({selectedStone.recommendedCarat} Carats)
                  </p>
                  <span className="text-[10px] text-amber-700 block mt-0.5 font-medium">Calibrated to {report.input.weightKg} kg</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
                  <span className="text-[10px] text-amber-800 uppercase tracking-widest block font-bold">Wearing Finger</span>
                  <p className="text-sm font-bold text-stone-900 mt-0.5">
                    {selectedStone.recommendedFinger}
                  </p>
                  <span className="text-[10px] text-amber-700 block mt-0.5 font-medium">{selectedStone.recommendedHand}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
                  <span className="text-[10px] text-amber-800 uppercase tracking-widest block font-bold">Recommended Metal</span>
                  <p className="text-xs font-bold text-stone-900 mt-0.5">
                    {selectedStone.recommendedMetal}
                  </p>
                  <span className="text-[10px] text-amber-700 block mt-0.5 font-medium">Open-back bezel for skin touch</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
                  <span className="text-[10px] text-amber-800 uppercase tracking-widest block font-bold">Auspicious Muhurat</span>
                  <p className="text-xs font-bold text-stone-900 mt-0.5">
                    {selectedStone.auspiciousDay}
                  </p>
                  <span className="text-[10px] text-amber-700 block mt-0.5 font-medium">{selectedStone.auspiciousTime}</span>
                </div>
              </div>
            </div>

            {/* Why Recommended Detailed Astrological Explanation */}
            <div className="bg-white/85 p-4 rounded-2xl border border-amber-200/70 text-xs sm:text-sm text-stone-800 leading-relaxed space-y-1.5 shadow-xs">
              <span className="font-extrabold text-amber-900 uppercase tracking-wider text-[11px] block">
                Astrological Rationale & Cosmic Mechanism:
              </span>
              <p className="font-medium text-stone-700">{selectedStone.whyRecommended}</p>
            </div>

            {/* Sacred Beej Mantra Strip */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#FAF2DA] to-[#F5E6BD] border border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-amber-900 block">
                  Sacred Beej Mantra ({selectedStone.mantraChantCount} Chants)
                </span>
                <p className="text-xs sm:text-sm font-bold text-stone-950 mt-0.5 font-serif-royal">
                  {selectedStone.beejMantra}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => bellPlayer.playBell(528)}
                  title="Play Temple Bell Chime"
                  className="p-2 rounded-xl bg-white/90 border border-amber-300 text-amber-800 hover:text-amber-950 shadow-xs transition"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleCopyMantra(selectedStone.beejMantra)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-950 text-xs font-bold hover:bg-amber-500/30 transition shadow-xs cursor-pointer"
                >
                  {copiedMantra ? 'Copied!' : 'Copy Mantra'}
                </button>
              </div>
            </div>

            {/* Key Benefits Grid */}
            <div className="mt-5">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-widest block mb-2">
                Documented Astrological & Life Benefits:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-800">
                {selectedStone.keyBenefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-amber-200/50 shadow-2xs font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 pt-6 border-t border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-stone-600 font-medium">
                Available in Burma, Ceylon, & Zambian ethical mines with IGI / GIA certificates.
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onOpenRitual}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white/90 border border-amber-300 text-amber-900 hover:bg-amber-50 text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  Prana Pratishtha Guide
                </button>

                <button
                  onClick={() => onCustomizeJewel(selectedStone)}
                  className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl btn-royal-crimson font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Customize in Atelier
                  <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strict Astrological Contraindications / Malefic Stones to AVOID */}
      {report.maleficStonesToAvoid.length > 0 && (
        <div className="bg-rose-50/70 border border-rose-300/80 rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <h3 className="font-serif-royal text-lg sm:text-xl font-bold text-rose-950">
              Crucial Astrological Warning: Incompatible Gemstones to Avoid
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-rose-900/80 mb-5 leading-relaxed font-medium">
            In classical Jyotish Shastra, wearing gemstones of mutually adversarial planets induces intense energetic friction, canceling out blessings and triggering physical or mental discord. Never wear the following with your recommended jewel:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.maleficStonesToAvoid.map((warn, i) => (
              <div key={i} className="bg-white/90 border border-rose-200 rounded-2xl p-4 text-xs space-y-1.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-950 text-sm">
                    ⚠️ {warn.gemstone} ({warn.hindiName})
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-300 font-bold">
                    Ruler: {warn.planet}
                  </span>
                </div>
                <p className="text-stone-700 leading-relaxed pt-1 font-medium">{warn.reason}</p>
                <div className="text-[10px] text-rose-800 font-bold">
                  Do not combine with: {warn.avoidWearingWith.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guru AI Astrologer Consultation Reading */}
      {report.aiGuruReading && (
        <div className="glass-card-gold rounded-3xl p-6 sm:p-10 shadow-[0_12px_45px_rgba(212,175,55,0.15)] relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
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
              <span className="text-[10px] text-amber-800 font-bold uppercase tracking-widest block">
                Exclusive Natal Reading
              </span>
              <h3 className="font-serif-royal text-xl sm:text-2xl font-bold text-stone-900">
                Acharya Nukala Srinivasrao's Personal Consultation
              </h3>
            </div>
          </div>

          <div className="prose max-w-none text-xs sm:text-sm text-stone-800 leading-relaxed space-y-4 whitespace-pre-line bg-white/90 p-6 rounded-2xl border border-amber-200 shadow-inner font-medium">
            {report.aiGuruReading}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-amber-200 text-xs text-stone-600 font-medium">
            <div>
              Certified by Sri Kamala Jewellers Astro-Gemological Board • Zaveri Bazaar & T. Nagar Ateliers
            </div>
            <button
              onClick={onOpenBooking}
              className="text-amber-800 hover:text-amber-950 underline underline-offset-4 font-bold"
            >
              Request 1-on-1 Horoscope Video Cross-Examination →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
