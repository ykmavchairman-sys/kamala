import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  Calendar,
  Clock,
  MapPin,
  RotateCcw,
  Award,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Layers,
  CheckCircle2,
  Gem
} from 'lucide-react';
import { AstrologicalReport, BirthChartInput } from '../types/astrology';
import { KundaliChartSvg } from './KundaliChartSvg';
import { BirthChartForm } from './BirthChartForm';
import { bellPlayer } from '../utils/audioBell';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  report: AstrologicalReport;
  onGenerateReport: (input: BirthChartInput) => void;
  isLoadingReport: boolean;
  onNavigateToLuckyStones: () => void;
  onOpenBooking: () => void;
}

export const BirthChartPage: React.FC<Props> = ({
  report,
  onGenerateReport,
  isLoadingReport,
  onNavigateToLuckyStones,
  onOpenBooking,
}) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { t, getRashiName, getPlanetName } = useLanguage();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 transition-colors duration-300">
      {/* 1. Header Card: Vedic Authority & Quick Native Details */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-[0_12px_45px_rgba(179,128,72,0.12)] border border-[#B38048]/35 relative overflow-hidden transition-all">
        {/* Ambient tan background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#B38048]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-gradient-to-r from-[#C59359] to-[#B38048] text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
                {t('chart_page_badge', 'N.C. LAHIRI SIDEREAL EPHEMERIS')}
              </span>
              <span className="text-xs font-bold text-[#B38048] bg-white/90 dark:bg-stone-800 px-2.5 py-0.5 rounded-full border border-[#B38048]/35">
                Ayanamsha: {report.ayanamsa}
              </span>
            </div>

            <h1 className="font-serif-royal text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
              {t('chart_page_title', 'Parashara Birth Chart (Kundali) & Vimshottari Dasha')}
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-3xl font-medium leading-relaxed">
              {t('chart_page_desc', 'Classical Vedic horoscope calculated for')} <strong className="text-stone-950 dark:text-white">{report.input.name}</strong> •{' '}
              <strong className="text-stone-950 dark:text-white">{report.input.dob}</strong> @{' '}
              <strong className="text-stone-950 dark:text-white">{report.input.tob} hrs</strong> ({report.input.place}).
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto shrink-0">
            <button
              onClick={() => {
                bellPlayer.playBell(587);
                setShowEditForm(!showEditForm);
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white/90 dark:bg-stone-900/90 border border-[#B38048]/35 text-stone-900 dark:text-stone-200 hover:bg-[#B38048]/10 dark:hover:bg-stone-800 text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#B38048]" />
              <span>{showEditForm ? t('chart_btn_hide_form', 'Hide Chart Form') : t('chart_btn_recalculate', 'Recalculate / Change Birth Time')}</span>
              {showEditForm ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => {
                bellPlayer.playBell(659);
                onNavigateToLuckyStones();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C59359] via-[#B38048] to-[#8F5E29] text-white font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-98 transition shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Gem className="w-3.5 h-3.5 text-white" />
              <span>{t('chart_btn_view_stones', 'View Lucky Stones')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

        {/* 2. Key Astrological Metrics Bar (5 Aligned Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mt-6 pt-6 border-t border-[#B38048]/25">
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/85 dark:bg-stone-900/80 border border-[#B38048]/25 shadow-2xs">
            <span className="text-[10px] text-[#B38048] uppercase tracking-widest block font-bold">
              {t('chart_lagna_metric', '1st House Lagna (Ascendant)')}
            </span>
            <strong className="text-sm sm:text-base font-bold text-stone-950 dark:text-white font-serif-royal block mt-0.5">
              {getRashiName(report.lagnaRashi)}
            </strong>
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">
              Lord: {getPlanetName(report.lagnaLord)} • {report.lagnaDegreeFormatted}
            </span>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/85 dark:bg-stone-900/80 border border-[#B38048]/25 shadow-2xs">
            <span className="text-[10px] text-[#B38048] uppercase tracking-widest block font-bold">
              {t('chart_moon_metric', 'Chandra Rashi (Moon Sign)')}
            </span>
            <strong className="text-sm sm:text-base font-bold text-stone-950 dark:text-white font-serif-royal block mt-0.5">
              {getRashiName(report.moonRashi)}
            </strong>
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">
              Lord: {getPlanetName(report.moonLord)}
            </span>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/85 dark:bg-stone-900/80 border border-[#B38048]/25 shadow-2xs">
            <span className="text-[10px] text-[#B38048] uppercase tracking-widest block font-bold">
              {t('chart_nakshatra_metric', 'Janma Nakshatra (Star)')}
            </span>
            <strong className="text-sm sm:text-base font-bold text-stone-950 dark:text-white font-serif-royal block mt-0.5 truncate">
              {report.nakshatra}
            </strong>
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">
              Lunar Mansion Pada 2
            </span>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/85 dark:bg-stone-900/80 border border-[#B38048]/25 shadow-2xs">
            <span className="text-[10px] text-[#B38048] uppercase tracking-widest block font-bold">
              {t('chart_d9_metric', 'D9 Navamsha Lagna')}
            </span>
            <strong className="text-sm sm:text-base font-bold text-stone-950 dark:text-white font-serif-royal block mt-0.5">
              {getRashiName(report.d9LagnaRashi || 'Cancer')}
            </strong>
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">
              Dharmamsha Potency
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3 sm:p-3.5 rounded-2xl bg-white/85 dark:bg-stone-900/80 border border-[#B38048]/25 shadow-2xs">
            <span className="text-[10px] text-[#B38048] uppercase tracking-widest block font-bold">
              {t('chart_dasha_metric', 'Active Vimshottari Dasha')}
            </span>
            <strong className="text-xs sm:text-sm font-bold text-[#B38048] block mt-0.5 truncate">
              {report.currentDasha}
            </strong>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-semibold mt-0.5">
              <CheckCircle2 className="w-3 h-3" /> {t('chart_active_status', 'Benefic Window Active')}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Collapsible Recalculation Form Drawer */}
      {showEditForm && (
        <div className="animate-fade-in-down border-2 border-[#B38048]/40 rounded-3xl p-1 bg-[#B38048]/5 dark:bg-stone-950 shadow-xl">
          <BirthChartForm
            onGenerateReport={(input) => {
              onGenerateReport(input);
              setShowEditForm(false);
            }}
            isLoading={isLoadingReport}
          />
        </div>
      )}

      {/* 4. Full-Width Kundali Workspace: North/South Indian Chakra, D1/D9, Vimshottari Dasha, & Graha Sphuta Table */}
      <div className="w-full">
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

      {/* 5. Next Steps Banner: Direct Link to Recommended Lucky Gemstones */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#B38048]/35 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[11px] font-bold text-[#B38048] uppercase tracking-widest block">
            {t('chart_next_banner_badge', 'BHAGYASHALI RATNA RECOMMENDATION')}
          </span>
          <h3 className="font-serif-royal text-xl sm:text-2xl font-black text-stone-950 dark:text-white">
            {t('chart_next_banner_title', 'Which Gemstone Activates Your 9th House Bhagya Sthana?')}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl font-medium">
            {t('chart_next_banner_desc', 'Prescribed 3 consecrated gemstones tailored to your horoscope based on Vedic Astro-Gemology.')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0 justify-center">
          <button
            onClick={onOpenBooking}
            className="px-4 py-2.5 rounded-xl bg-white/90 dark:bg-stone-900 border border-[#B38048]/35 text-stone-900 dark:text-stone-200 text-xs font-bold hover:bg-[#B38048]/10 dark:hover:bg-stone-800 transition shadow-xs cursor-pointer"
          >
            {t('dossier_consult_btn', 'Consult Master Astrologer')}
          </button>
          <button
            onClick={() => {
              bellPlayer.playBell(587);
              onNavigateToLuckyStones();
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C59359] via-[#B38048] to-[#8F5E29] text-white font-black text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Gem className="w-3.5 h-3.5 text-white" />
            <span>{t('chart_btn_view_stones', 'Open Lucky Stones Dossier')}</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
