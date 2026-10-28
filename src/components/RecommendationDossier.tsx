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
  Layers,
  Gem,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { AstrologicalReport, GemstoneRecommendation } from '../types/astrology';
import { GemstoneGraphic } from './GemstoneGraphic';
import { KundaliChartSvg } from './KundaliChartSvg';
import { bellPlayer } from '../utils/audioBell';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  report: AstrologicalReport;
  onCustomizeJewel: (gemstone: GemstoneRecommendation) => void;
  onOpenBooking: () => void;
  onOpenRitual: () => void;
  onOpenAstrologerPortal?: () => void;
  onNavigateToBirthChart?: () => void;
}

export const RecommendationDossier: React.FC<Props> = ({
  report,
  onCustomizeJewel,
  onOpenBooking,
  onOpenRitual,
  onOpenAstrologerPortal,
  onNavigateToBirthChart,
}) => {
  const [activeStoneTab, setActiveStoneTab] = useState<'primary' | 'lagna' | 'secondary'>('primary');
  const [copiedMantra, setCopiedMantra] = useState(false);
  const [showChartDrawer, setShowChartDrawer] = useState(false);
  const { t, getGemstoneName, getPlanetName, getRashiName, getFingerName, getMetalName } = useLanguage();

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
    <div className="space-y-8 sm:space-y-10 max-w-7xl mx-auto pb-12 print:p-0 transition-colors duration-300">
      {/* 1. Dossier Header Strip (Glassmorphism & Magenta) */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-[0_12px_45px_rgba(204,51,139,0.10)] border border-[#CC338B]/30 relative overflow-hidden transition-all">
        {/* Soft Magenta Radial Halo */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-100/30 dark:bg-pink-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-3.5 sm:gap-4">
            {/* SKJ Emblem (1:1 Small Size) */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 aspect-square rounded-2xl bg-[#CC338B] p-[1.5px] shadow-sm shrink-0">
              <div className="w-full h-full aspect-square bg-white dark:bg-stone-900 rounded-[14px] overflow-hidden flex items-center justify-center p-1 border border-[#CC338B]/30">
                <img
                  src="/assets/aistudio/Golden_Lotus_Emblem_with_SKJ_Monogram_31db152a.png"
                  alt="Sri Kamala Jewellers Logo"
                  className="w-full h-full aspect-square object-contain"
                />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-3 py-0.5 rounded-full btn-magenta text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
                  {t('dossier_badge', 'Official Jyotish Dossier')}
                </span>
                <span className="text-xs text-[#CC338B] font-semibold bg-pink-50 dark:bg-stone-800 px-2 py-0.5 rounded-full border border-[#CC338B]/30">
                  Ref: SKJ-{Date.now().toString().slice(-6)}
                </span>
              </div>

              <h1 className="font-serif-royal text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
                {t('dossier_title', 'Astrological Gemstone Dossier for')} <span className="text-[#CC338B]">{report.input.name}</span>
              </h1>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 max-w-2xl font-medium leading-relaxed">
                {report.input.dob} @ {report.input.tob} hrs ({report.input.place}) • {t('dossier_tab_karya', 'Goal')}: <strong className="text-[#CC338B] font-bold uppercase">{report.input.lifeGoal}</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto shrink-0">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white/90 dark:bg-stone-900/90 border border-[#CC338B]/30 text-stone-900 dark:text-pink-200 hover:bg-pink-50 dark:hover:bg-stone-800 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Printer className="w-4 h-4 text-[#CC338B]" />
              <span>{t('dossier_print_btn', 'Print / PDF')}</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl btn-magenta text-white text-xs font-bold uppercase tracking-wider hover:brightness-105 shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t('dossier_consult_btn', 'Consult Astrologer')}</span>
            </button>
          </div>
        </div>

        {/* Natal Key Metrics Badges (5 Balanced Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mt-6 pt-6 border-t border-[#CC338B]/20">
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/80 dark:bg-stone-900/80 border border-[#CC338B]/20 shadow-2xs">
            <span className="text-[10px] text-[#CC338B] uppercase tracking-widest block font-bold">{t('chart_lagna_metric', 'Lagna (Ascendant)')}</span>
            <span className="text-sm font-bold text-stone-900 dark:text-white font-serif-royal block mt-0.5">{getRashiName(report.lagnaRashi)}</span>
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">Lord: {getPlanetName(report.lagnaLord)}</span>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/80 dark:bg-stone-900/80 border border-[#CC338B]/20 shadow-2xs">
            <span className="text-[10px] text-[#CC338B] uppercase tracking-widest block font-bold">{t('chart_moon_metric', 'Moon Sign (Rashi)')}</span>
            <span className="text-sm font-bold text-stone-900 dark:text-white font-serif-royal block mt-0.5">{getRashiName(report.moonRashi)}</span>
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">Lord: {getPlanetName(report.moonLord)}</span>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/80 dark:bg-stone-900/80 border border-[#CC338B]/20 shadow-2xs">
            <span className="text-[10px] text-[#CC338B] uppercase tracking-widest block font-bold">Surya Rashi (Sun)</span>
            <span className="text-sm font-bold text-stone-900 dark:text-white font-serif-royal block mt-0.5">{getRashiName(report.sunRashi)}</span>
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">Solar Core Energy</span>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/80 dark:bg-stone-900/80 border border-[#CC338B]/20 shadow-2xs">
            <span className="text-[10px] text-[#CC338B] uppercase tracking-widest block font-bold">{t('chart_nakshatra_metric', 'Janma Nakshatra')}</span>
            <span className="text-sm font-bold text-stone-900 dark:text-white truncate block font-serif-royal mt-0.5">{report.nakshatra}</span>
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">Lunar Mansion</span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3 sm:p-3.5 rounded-2xl bg-white/80 dark:bg-stone-900/80 border border-[#CC338B]/20 shadow-2xs">
            <span className="text-[10px] text-[#CC338B] uppercase tracking-widest block font-bold">{t('chart_dasha_metric', 'Active Mahadasha')}</span>
            <span className="text-xs font-bold text-[#CC338B] truncate block mt-0.5">{report.currentDasha}</span>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block flex items-center gap-1 font-semibold mt-0.5">
              <CheckCircle2 className="w-2.5 h-2.5" /> {t('chart_active_status', 'High Benefic Window')}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Official Astrologer Approval & Sanction Certificate Banner */}
      <div className="rounded-3xl p-6 sm:p-8 border-2 shadow-lg relative overflow-hidden transition-all glass-card border-[#CC338B]/30">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            {/* Magenta Wax Seal */}
            <div className="relative shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#CC338B] p-1 shadow-md border-2 border-white flex items-center justify-center text-white">
                <div className="w-full h-full rounded-full border border-dashed border-white/80 flex flex-col items-center justify-center p-1">
                  <Award className="w-5 h-5 text-white" />
                  <span className="text-[8px] font-black uppercase tracking-tighter text-white mt-0.5">
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
                <span className="px-3 py-0.5 rounded-full btn-magenta text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
                  {report.astrologerApproval?.status === 'approved'
                    ? t('dossier_approval_badge', 'OFFICIALLY APPROVED & SANCTIONED')
                    : 'ASTROLOGER AUDIT PENDING'}
                </span>
                <span className="text-xs text-stone-900 dark:text-stone-200 font-bold">
                  Cert ID: {report.astrologerApproval?.certificateId || 'SKJ-VEDIC-APPROVED'}
                </span>
              </div>

              <h3 className="font-serif-royal text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                Audited & Sanctioned by Acharya Nukala Srinivas Rao
              </h3>

              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 max-w-3xl leading-relaxed font-medium">
                {report.astrologerApproval?.sanctionNotes ||
                  `Lagna Lord and 9th House Bhagya Sthana personally audited. No Maraka/Badhaka affliction detected. Natural unheated gemstone verified to radiate auspicious frequencies.`}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-bold text-stone-800 dark:text-stone-200">
                <span className="flex items-center gap-1 text-emerald-800 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {t('dossier_maraka_safe', 'Maraka / Badhaka Safe')}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-800 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {t('dossier_skin_contact', 'Open-Back Skin Touch Mandate')}
                </span>
                <span>•</span>
                <span>{t('dossier_metal_label', 'Prescribed Metal')}: {getMetalName(report.astrologerApproval?.prescribedMetal || report.primaryStone.recommendedMetal)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0">
            {onOpenAstrologerPortal && (
              <button
                onClick={onOpenAstrologerPortal}
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-[#CC338B]/30 text-[#CC338B] hover:bg-pink-50 dark:hover:bg-stone-800 text-xs font-bold transition shadow-xs cursor-pointer whitespace-nowrap"
              >
                {t('astrologer_desk', 'Astrologer Admin Desk')}
              </button>
            )}
            <button
              onClick={() => onCustomizeJewel(report.primaryStone)}
              className="px-5 py-2.5 rounded-xl btn-magenta font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer whitespace-nowrap flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>{t('dossier_craft_ring', 'Craft Sanctioned Ring →')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. The 3 Prescribed Sacred Gemstones Selection Hub */}
      <div className="space-y-6">
        {/* Selector Tabs for the 3 Prescribed Stones */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-amber-50/80 dark:bg-stone-900/90 p-2 rounded-2xl border border-amber-300/60 dark:border-stone-700 shadow-inner">
          <span className="text-xs font-black uppercase tracking-wider text-[#CC338B] px-2 shrink-0">
            {t('dossier_select_stone', 'Select Prescribed Gemstone:')}
          </span>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto flex-1 justify-end">
            <button
              onClick={() => {
                setActiveStoneTab('primary');
                bellPlayer.playBell(528);
              }}
              className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeStoneTab === 'primary'
                  ? 'btn-magenta shadow-md font-black'
                  : 'bg-white/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:text-[#CC338B]'
              }`}
            >
              <Award className="w-4 h-4 text-white" />
              <span>{t('dossier_tab_bhagya', '1. Bhagyashali (9th House Life Stone)')}</span>
            </button>

            {report.lagnaStone && (
              <button
                onClick={() => {
                  setActiveStoneTab('lagna');
                  bellPlayer.playBell(587);
                }}
                className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  activeStoneTab === 'lagna'
                    ? 'btn-magenta shadow-md font-black'
                    : 'bg-white/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:text-[#CC338B]'
                }`}
              >
                <Layers className="w-4 h-4 text-white" />
                <span>{t('dossier_tab_lagna', '2. Lagna Shield (1st House)')}</span>
              </button>
            )}

            {report.secondaryStone && (
              <button
                onClick={() => {
                  setActiveStoneTab('secondary');
                  bellPlayer.playBell(659);
                }}
                className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  activeStoneTab === 'secondary'
                    ? 'btn-magenta shadow-md font-black'
                    : 'bg-white/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:text-[#CC338B]'
                }`}
              >
                <Flame className="w-4 h-4 text-white" />
                <span>{t('dossier_tab_karya', '3. Karya Siddhi')} ({report.input.lifeGoal})</span>
              </button>
            )}
          </div>
        </div>

        {/* 4. Full-Width Selected Gemstone Showcase Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(204,51,139,0.12)] border-2 border-[#CC338B]/30 relative overflow-hidden">
          {/* Top Headline & Category Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#CC338B]/20">
            <div>
              <span className="text-[11px] text-[#CC338B] font-extrabold tracking-widest uppercase block">
                {selectedStone.categoryLabel}
              </span>
              <h3 className="font-serif-royal text-2xl sm:text-3xl font-black text-stone-950 dark:text-white mt-0.5">
                {getGemstoneName(selectedStone.name)}
              </h3>
              <span className="text-sm font-bold text-[#CC338B] font-serif-royal block mt-0.5">
                {selectedStone.hindiName} • Ruling Deity: {getPlanetName(selectedStone.planetSanskrit)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-pink-50 dark:bg-stone-800 text-[#CC338B] border border-[#CC338B]/30 text-xs font-bold flex items-center gap-1.5 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CC338B]" /> 100% Auspicious Natal Alignment
              </span>
            </div>
          </div>

          {/* Core Grid: Visual Graphic & Specs Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-4">
            {/* Left Sub-Column (5 Cols): 3D Gem Graphic + Provenance & Guarantee */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-white/90 dark:bg-stone-900/90 border border-[#CC338B]/20 text-center shadow-inner space-y-3">
              <div className="py-2">
                <GemstoneGraphic
                  hexColor={selectedStone.hexColor}
                  glowColor={selectedStone.glowColor}
                  size={160}
                  cut="oval"
                />
              </div>

              <div>
                <strong className="text-sm font-bold text-stone-900 dark:text-white block">
                  {selectedStone.primaryColor}
                </strong>
                <span className="text-xs text-stone-500 dark:text-stone-400 block mt-0.5">
                  Natural Optical Prism Lattice • Zero Thermal Treatment
                </span>
              </div>

              <div className="w-full pt-3 border-t border-[#CC338B]/20 text-xs space-y-1.5 text-stone-700 dark:text-stone-300">
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 dark:text-stone-400">Benchmark Price:</span>
                  <strong className="text-[#CC338B] font-mono font-bold">
                    ₹{selectedStone.estimatedPricePerCaratINR.toLocaleString('en-IN')}/ct
                  </strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 dark:text-stone-400">Sacred Substitute (Upratna):</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200 text-[11px] truncate max-w-[170px]">
                    {selectedStone.substituteStone}
                  </span>
                </div>
              </div>

              <div className="w-full p-2.5 rounded-xl bg-pink-50/70 dark:bg-stone-800 border border-[#CC338B]/30 text-[11px] font-bold text-[#CC338B] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#CC338B] shrink-0" />
                <span>{t('dossier_open_back_seal', 'Mandatory Open-Back Skin Touch Bezel')}</span>
              </div>
            </div>

            {/* Right Sub-Column (7 Cols): 4 Aligned Specification Cards & Cosmic Rationale */}
            <div className="lg:col-span-7 space-y-4">
              {/* 4 Aligned Specification Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-[#CC338B]/20 shadow-2xs">
                  <span className="text-[10px] text-[#CC338B] uppercase tracking-widest block font-bold">
                    {t('dossier_weight_label', 'Prescribed Weight (Carat / Ratti)')}
                  </span>
                  <p className="text-sm font-bold text-stone-950 dark:text-white mt-1">
                    {selectedStone.recommendedRatti} Ratti ({selectedStone.recommendedCarat} Carats)
                  </p>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-0.5 font-medium">
                    Calibrated for {report.input.weightKg} kg body mass
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-[#CC338B]/20 shadow-2xs">
                  <span className="text-[10px] text-[#CC338B] uppercase tracking-widest block font-bold">
                    {t('dossier_finger_label', 'Wearing Finger & Hand')}
                  </span>
                  <p className="text-sm font-bold text-stone-950 dark:text-white mt-1">
                    {getFingerName(selectedStone.recommendedFinger)}
                  </p>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-0.5 font-medium">
                    {selectedStone.recommendedHand}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-[#CC338B]/20 shadow-2xs">
                  <span className="text-[10px] text-[#CC338B] uppercase tracking-widest block font-bold">
                    {t('dossier_metal_label', 'Recommended Metal')}
                  </span>
                  <p className="text-xs font-bold text-stone-950 dark:text-white mt-1">
                    {getMetalName(selectedStone.recommendedMetal)}
                  </p>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-0.5 font-medium">
                    Open-back aperture for direct skin touch
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-[#CC338B]/20 shadow-2xs">
                  <span className="text-[10px] text-[#CC338B] uppercase tracking-widest block font-bold">
                    {t('dossier_muhurat_label', 'Auspicious Muhurat & Day')}
                  </span>
                  <p className="text-xs font-bold text-stone-950 dark:text-white mt-1">
                    {selectedStone.auspiciousDay}
                  </p>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-0.5 font-medium">
                    {selectedStone.auspiciousTime}
                  </span>
                </div>
              </div>

              {/* Astrological Rationale Card */}
              <div className="bg-white/90 dark:bg-stone-900/90 p-4 rounded-2xl border border-[#CC338B]/20 text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed space-y-1 shadow-xs">
                <span className="font-extrabold text-[#CC338B] uppercase tracking-wider text-[11px] block">
                  {t('dossier_rationale_label', 'Astrological Rationale & Cosmic Mechanism:')}
                </span>
                <p className="font-medium text-stone-700 dark:text-stone-300">
                  {selectedStone.whyRecommended}
                </p>
              </div>

              {/* Sacred Beej Mantra Card */}
              <div className="p-4 rounded-2xl bg-pink-50/50 dark:bg-stone-900 border border-[#CC338B]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#CC338B] block">
                    {t('dossier_beej_mantra', 'Sacred Beej Mantra')} ({selectedStone.mantraChantCount} Chants)
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-stone-950 dark:text-pink-100 mt-0.5 font-serif-royal">
                    {selectedStone.beejMantra}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => bellPlayer.playBell(528)}
                    title="Play Temple Bell Chime"
                    className="p-2 rounded-xl bg-white/90 dark:bg-stone-800 border border-[#CC338B]/30 text-[#CC338B] hover:opacity-80 shadow-xs transition cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopyMantra(selectedStone.beejMantra)}
                    className="px-3.5 py-1.5 rounded-xl bg-pink-100 dark:bg-stone-800 border border-[#CC338B]/30 text-[#CC338B] text-xs font-bold hover:bg-pink-200 transition shadow-xs cursor-pointer whitespace-nowrap"
                  >
                    {copiedMantra ? t('dossier_copied', 'Copied!') : t('dossier_copy_mantra', 'Copy Mantra')}
                  </button>
                </div>
              </div>

              {/* Documented Astrological Benefits (4 Aligned Cards) */}
              <div>
                <span className="text-[11px] font-bold text-[#CC338B] uppercase tracking-widest block mb-2">
                  {t('dossier_benefits_label', 'Documented Astrological & Life Benefits:')}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-800 dark:text-stone-200">
                  {selectedStone.keyBenefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-white/80 dark:bg-stone-900/80 p-2.5 rounded-xl border border-[#CC338B]/20 shadow-2xs font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#CC338B] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 border-t border-[#CC338B]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  Ballari Flagship • Certified 100% Natural Unheated Jyotish Gemstones.
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={onOpenRitual}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-[#CC338B]/30 text-[#CC338B] hover:bg-pink-50 dark:hover:bg-stone-800 text-xs font-bold transition shadow-xs cursor-pointer whitespace-nowrap"
                  >
                    {t('dossier_ritual_btn', 'Prana Pratishtha Guide')}
                  </button>

                  <button
                    onClick={() => onCustomizeJewel(selectedStone)}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl btn-magenta font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-md whitespace-nowrap"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>{t('dossier_customize_btn', 'Customize in Atelier')}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Quick Comparison Cards of All 3 Recommended Gemstones */}
      <div className="space-y-3">
        <h4 className="font-serif-royal text-lg sm:text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
          <Gem className="w-5 h-5 text-[#CC338B]" />
          <span>{t('dossier_all_3_stones', 'All 3 Astrological Gemstones Prescribed for Your Horoscope')}</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Bhagyashali Ratna */}
          <div className="glass-card rounded-2xl p-4 border border-[#CC338B]/30 space-y-2 relative flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#CC338B] block">
                {t('dossier_tab_bhagya', '1. Bhagyashali (9th House Life Stone)')}
              </span>
              <strong className="text-base font-bold text-stone-900 dark:text-white block mt-1">
                {getGemstoneName(report.primaryStone.name)}
              </strong>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                Deity: {getPlanetName(report.primaryStone.planetSanskrit)} • {report.primaryStone.recommendedRatti} Ratti
              </p>
            </div>
            <button
              onClick={() => {
                setActiveStoneTab('primary');
                bellPlayer.playBell(528);
              }}
              className="mt-2 w-full py-2 rounded-xl bg-pink-50 dark:bg-stone-800 text-[#CC338B] border border-[#CC338B]/30 hover:bg-pink-100 text-xs font-bold transition text-center cursor-pointer"
            >
              {t('explore', 'Inspect Details')} →
            </button>
          </div>

          {/* Card 2: Lagna Shield */}
          {report.lagnaStone && (
            <div className="glass-card rounded-2xl p-4 border border-[#CC338B]/30 space-y-2 relative flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#CC338B] block">
                  {t('dossier_tab_lagna', '2. Lagna Shield (1st House Health)')}
                </span>
                <strong className="text-base font-bold text-stone-900 dark:text-white block mt-1">
                  {getGemstoneName(report.lagnaStone.name)}
                </strong>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                  Deity: {getPlanetName(report.lagnaStone.planetSanskrit)} • {report.lagnaStone.recommendedRatti} Ratti
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveStoneTab('lagna');
                  bellPlayer.playBell(587);
                }}
                className="mt-2 w-full py-2 rounded-xl bg-pink-50 dark:bg-stone-800 text-[#CC338B] border border-[#CC338B]/30 hover:bg-pink-100 text-xs font-bold transition text-center cursor-pointer"
              >
                {t('explore', 'Inspect Details')} →
              </button>
            </div>
          )}

          {/* Card 3: Karya Siddhi */}
          {report.secondaryStone && (
            <div className="glass-card rounded-2xl p-4 border border-[#CC338B]/30 space-y-2 relative flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#CC338B] block">
                  {t('dossier_tab_karya', '3. Karya Siddhi')} ({report.input.lifeGoal})
                </span>
                <strong className="text-base font-bold text-stone-900 dark:text-white block mt-1">
                  {getGemstoneName(report.secondaryStone.name)}
                </strong>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                  Deity: {getPlanetName(report.secondaryStone.planetSanskrit)} • {report.secondaryStone.recommendedRatti} Ratti
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveStoneTab('secondary');
                  bellPlayer.playBell(659);
                }}
                className="mt-2 w-full py-2 rounded-xl bg-pink-50 dark:bg-stone-800 text-[#CC338B] border border-[#CC338B]/30 hover:bg-pink-100 text-xs font-bold transition text-center cursor-pointer"
              >
                {t('explore', 'Inspect Details')} →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 6. Strict Astrological Contraindications / Malefic Stones to AVOID */}
      {report.maleficStonesToAvoid.length > 0 && (
        <div className="bg-pink-50/80 dark:bg-[#201017] border border-[#CC338B]/40 rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-5 h-5 text-[#CC338B]" />
            <h3 className="font-serif-royal text-lg sm:text-xl font-bold text-[#CC338B]">
              {t('dossier_warning_title', 'Crucial Astrological Warning: Incompatible Gemstones to Avoid')}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mb-5 leading-relaxed font-medium">
            {t('dossier_warning_desc', 'In classical Jyotish Shastra, wearing gemstones of mutually adversarial planets induces intense energetic friction. Never wear the following with your recommended jewel:')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.maleficStonesToAvoid.map((warn, i) => (
              <div key={i} className="bg-white/90 dark:bg-stone-900 border border-[#CC338B]/20 rounded-2xl p-4 text-xs space-y-1.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#CC338B] text-sm">
                    ⚠️ {getGemstoneName(warn.gemstone)} ({warn.hindiName})
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-pink-100 dark:bg-stone-800 text-[#CC338B] border border-[#CC338B]/30 font-bold">
                    Ruler: {getPlanetName(warn.planet)}
                  </span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed pt-1 font-medium">{warn.reason}</p>
                <div className="text-[10px] text-[#CC338B] font-bold">
                  Do not combine with: {warn.avoidWearingWith.map((g) => getGemstoneName(g)).join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Acharya Nukala Srinivas Rao's Personal Consultation Reading */}
      {report.aiGuruReading && (
        <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-[0_12px_45px_rgba(204,51,139,0.10)] border border-[#CC338B]/30 relative overflow-hidden">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 aspect-square rounded-2xl bg-[#CC338B] p-[1.5px] shadow-sm shrink-0">
              <div className="w-full h-full aspect-square bg-white dark:bg-stone-900 rounded-[14px] overflow-hidden flex items-center justify-center p-1 border border-[#CC338B]/30">
                <img
                  src="/assets/aistudio/Golden_Lotus_Emblem_with_SKJ_Monogram_31db152a.png"
                  alt="Sri Kamala Jewellers Logo"
                  className="w-full h-full aspect-square object-contain"
                />
              </div>
            </div>
            <div>
              <span className="text-[10px] text-[#CC338B] font-bold uppercase tracking-widest block">
                Exclusive Natal Reading
              </span>
              <h3 className="font-serif-royal text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                Acharya Nukala Srinivas Rao's Personal Consultation
              </h3>
            </div>
          </div>

          <div className="prose max-w-none text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed space-y-4 whitespace-pre-line bg-white/90 dark:bg-stone-900/90 p-6 rounded-2xl border border-[#CC338B]/20 shadow-inner font-medium">
            {report.aiGuruReading}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#CC338B]/20 text-xs text-stone-600 dark:text-stone-400 font-medium">
            <div>
              Certified by Sri Kamala Jewellers Astro-Gemological Board • Ballari Flagship
            </div>
            <button
              onClick={onOpenBooking}
              className="text-[#CC338B] hover:opacity-80 underline underline-offset-4 font-bold cursor-pointer"
            >
              Request 1-on-1 Video Consultation →
            </button>
          </div>
        </div>
      )}

      {/* 8. Cross-Link to Full N.C. Lahiri Birth Chart Page */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#CC338B]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[11px] font-bold text-[#CC338B] uppercase tracking-widest block">
            ASTRONOMICAL FOUNDATION
          </span>
          <h3 className="font-serif-royal text-xl sm:text-2xl font-black text-stone-950 dark:text-white">
            {t('dossier_crosslink_title', 'Inspect Your N.C. Lahiri D1, D9 & 120-Year Vimshottari Dasha')}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl font-medium">
            View the planetary longitudes (Graha Sphuta), North & South Indian Lagna Chakras, Navamsha divisional chart, and full 120-year timeline of Maha Dashas and Antardashas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0 justify-center">
          <button
            onClick={() => setShowChartDrawer(!showChartDrawer)}
            className="px-4 py-2.5 rounded-xl bg-white/90 dark:bg-stone-900 border border-[#CC338B]/30 text-stone-900 dark:text-pink-200 text-xs font-bold hover:bg-pink-50 dark:hover:bg-stone-800 transition shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>{showChartDrawer ? 'Hide Chart Preview' : 'Quick Chart Preview'}</span>
            {showChartDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {onNavigateToBirthChart && (
            <button
              onClick={() => {
                bellPlayer.playBell(587);
                onNavigateToBirthChart();
              }}
              className="px-6 py-2.5 rounded-xl btn-magenta font-black text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-white" />
              <span>{t('dossier_crosslink_btn', 'Explore Birth Chart Page')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Optional Collapsible Chart Drawer right on the Dossier */}
      {showChartDrawer && (
        <div className="animate-fade-in-down border-2 border-[#CC338B]/40 rounded-3xl p-2 bg-pink-50/50 dark:bg-stone-950 shadow-xl">
          <KundaliChartSvg
            lagnaRashi={report.lagnaRashi}
            lagnaRashiNumber={report.lagnaRashiNumber}
            lagnaDegreeFormatted={report.lagnaDegreeFormatted}
            d9LagnaRashi={report.d9LagnaRashi}
            d9LagnaRashiNumber={report.d9LagnaRashiNumber}
            d9LagnaDegreeFormatted={report.d9LagnaDegreeFormatted}
            ayanamsa={report.ayanamsa}
            planetaryPositions={report.planetaryPositions}
            vimshottariDasha={report.vimshottariDasha}
            ncLahiriAyanamshaDetails={report.ncLahiriAyanamshaDetails}
          />
        </div>
      )}
    </div>
  );
};
