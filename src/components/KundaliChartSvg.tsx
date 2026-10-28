import React, { useState } from 'react';
import { PlanetaryPosition, VimshottariDashaInfo, NCLahiriAyanamshaDetails } from '../types/astrology';
import { Sparkles, Compass, ShieldCheck, Eye, Layers, Star, Info, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { bellPlayer } from '../utils/audioBell';
import { calculateNavamshaSign } from '../utils/astrologyEngine';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  lagnaRashi: string;
  lagnaRashiNumber?: number;
  lagnaDegreeFormatted?: string;
  d9LagnaRashi?: string;
  d9LagnaRashiNumber?: number;
  d9LagnaDegreeFormatted?: string;
  ayanamsa?: string;
  planetaryPositions: PlanetaryPosition[];
  vimshottariDasha?: VimshottariDashaInfo;
  ncLahiriAyanamshaDetails?: NCLahiriAyanamshaDetails;
}

export const KundaliChartSvg: React.FC<Props> = ({
  lagnaRashi,
  lagnaRashiNumber,
  lagnaDegreeFormatted = "10°45'",
  d9LagnaRashi,
  d9LagnaRashiNumber,
  d9LagnaDegreeFormatted = "06°45'",
  ayanamsa = 'N.C. Lahiri (Chitra Paksha) 24°14\'32"',
  planetaryPositions,
  vimshottariDasha,
  ncLahiriAyanamshaDetails,
}) => {
  const [chartStyle, setChartStyle] = useState<'north' | 'south'>('north');
  const [chartDivision, setChartDivision] = useState<'D1' | 'D9' | 'Dasha'>('D1');
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetaryPosition | null>(null);
  const [expandedAntardashaPlanet, setExpandedAntardashaPlanet] = useState<string | null>(null);
  const { t, getPlanetName, getRashiName, getGemstoneName } = useLanguage();

  const signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  // D1 Lagna
  const lagnaIdx = signs.indexOf(lagnaRashi);
  const effectiveD1LagnaNum = lagnaRashiNumber || (lagnaIdx >= 0 ? lagnaIdx + 1 : 1);

  // Parashara D9 Navamsha Lagna
  const computedD9Lagna = d9LagnaRashi || calculateNavamshaSign(lagnaRashi, 10.75);
  const d9LagnaIdx = signs.indexOf(computedD9Lagna);
  const effectiveD9LagnaNum = d9LagnaRashiNumber || (d9LagnaIdx >= 0 ? d9LagnaIdx + 1 : 1);

  // Active Lagna for current division
  const activeLagnaSign = chartDivision === 'D1' ? lagnaRashi : computedD9Lagna;
  const activeLagnaNum = chartDivision === 'D1' ? effectiveD1LagnaNum : effectiveD9LagnaNum;
  const activeLagnaDegree = chartDivision === 'D1' ? lagnaDegreeFormatted : d9LagnaDegreeFormatted;

  // Helper to get Rashi number for each house (1 to 12) in North Indian chart
  // In Parashara North Indian chart: House 1 is always the top central diamond.
  // The rashi number in House H is: ((activeLagnaNum - 1 + (H - 1)) % 12) + 1.
  const getHouseRashiNum = (houseNum: number) => {
    return ((activeLagnaNum - 1 + (houseNum - 1)) % 12) + 1;
  };

  // Map planets to houses based on division (D1 or D9)
  const housePlanets: Record<number, PlanetaryPosition[]> = {};
  for (let i = 1; i <= 12; i++) {
    housePlanets[i] = [];
  }

  planetaryPositions.forEach((p) => {
    const targetHouse = chartDivision === 'D1' ? p.house : p.d9House;
    if (housePlanets[targetHouse]) {
      housePlanets[targetHouse].push(p);
    }
  });

  // Vargottama planets (planets in the exact same sign in D1 & D9 - high Parashara dignity)
  const vargottamaPlanets = planetaryPositions.filter(
    (p) => p.isVargottama || p.rashi === p.d9Rashi
  );

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-300/70 relative overflow-hidden space-y-6">
      {/* Chart Header with Parashara Authority Badge & N.C. Lahiri Standard */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-200/80 pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#8B0000] text-amber-100 text-[10px] font-black uppercase tracking-wider">
              {t('chart_page_badge', 'N.C. LAHIRI SIDEREAL (CHITRA PAKSHA)')}
            </span>
            <span className="text-[11px] text-amber-900 font-bold bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
              {chartDivision === 'D1'
                ? t('chart_toggle_d1', 'D1 Rashi Chakra (Lagna Physical)')
                : chartDivision === 'D9'
                ? t('chart_toggle_d9', 'D9 Navamsha Chakra (Spiritual Potency)')
                : t('chart_toggle_dasha', '120-Year Vimshottari Dasha Cycle')}
            </span>
          </div>
          <h4 className="font-serif-royal text-xl sm:text-2xl font-black text-stone-900 tracking-tight mt-1">
            {chartDivision === 'D1'
              ? t('chart_page_title', 'Lagna Kundali (D1 Rashi Chakra)')
              : chartDivision === 'D9'
              ? 'Navamsha Kundali (D9 Dharmamsha)'
              : t('dasha_cycle_title', 'Vimshottari Dasha System (120 Years)')}
          </h4>
          <p className="text-xs text-stone-600 mt-1 font-medium">
            {chartDivision !== 'Dasha' ? (
              <>
                {t('chart_lagna_metric', 'Ascendant (Lagna)')}: <strong className="text-amber-950 font-bold">{getRashiName(activeLagnaSign)} ({activeLagnaDegree})</strong> • Ayanamsha: <strong className="text-amber-900 font-bold">{ayanamsa}</strong>
              </>
            ) : (
              <>
                {t('dasha_active_period', 'Active Period')}: <strong className="text-[#8B0000] font-bold">{vimshottariDasha?.currentDashaPeriod || 'Jupiter - Venus'}</strong> • {t('dasha_birth_balance', 'Birth Balance')}: <strong className="text-amber-900">{vimshottariDasha?.birthBalanceDasha} ({vimshottariDasha?.balanceYears}y {t('dasha_remaining', 'remaining')})</strong>
              </>
            )}
          </p>
        </div>

        {/* Chart Style & Division Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* D1 / D9 / Vimshottari Dasha Switcher */}
          <div className="flex items-center bg-amber-100/90 border border-amber-300 rounded-xl p-1 text-xs shadow-2xs">
            <button
              onClick={() => {
                bellPlayer.playBell(587);
                setChartDivision('D1');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                chartDivision === 'D1'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-xs font-black'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              {t('chart_toggle_d1', 'Lagna (D1)')}
            </button>
            <button
              onClick={() => {
                bellPlayer.playBell(528);
                setChartDivision('D9');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                chartDivision === 'D9'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-xs font-black'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              {t('chart_toggle_d9', 'Navamsha (D9)')}
            </button>
            <button
              onClick={() => {
                bellPlayer.playBell(659);
                setChartDivision('Dasha');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1 ${
                chartDivision === 'Dasha'
                  ? 'bg-[#8B0000] text-amber-100 shadow-xs font-black'
                  : 'text-[#8B0000] hover:text-stone-950 font-bold'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{t('chart_toggle_dasha', 'Vimshottari Dasha')}</span>
            </button>
          </div>

          {/* North / South Style Switcher (only for D1 / D9) */}
          {chartDivision !== 'Dasha' && (
            <div className="flex items-center bg-white/90 border border-amber-300/80 rounded-xl p-1 text-xs shadow-2xs">
              <button
                onClick={() => {
                  bellPlayer.playBell(587);
                  setChartStyle('north');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  chartStyle === 'north'
                    ? 'bg-[#8B0000] text-amber-100 shadow-xs font-black'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {t('chart_style_north', 'North (Diamond)')}
              </button>
              <button
                onClick={() => {
                  bellPlayer.playBell(587);
                  setChartStyle('south');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  chartStyle === 'south'
                    ? 'bg-[#8B0000] text-amber-100 shadow-xs font-black'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {t('chart_style_south', 'South (Square)')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Parashara Vargottama & Kendra/Trikona Informational Banner (shown for D1/D9) */}
      {chartDivision !== 'Dasha' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] font-medium">
          <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-stone-800/80 border border-amber-200/90 dark:border-amber-500/30 text-stone-700 dark:text-stone-300">
            <strong className="text-amber-950 dark:text-amber-300 block font-bold mb-0.5">
              {t('chart_kendras', 'Parashara Kendras (1, 4, 7, 10):')}
            </strong>
            Vishnu Sthanas representing worldly foundation, stability, status, and vitality.
          </div>
          <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-amber-950/40 border border-rose-200/90 dark:border-amber-500/30 text-stone-700 dark:text-stone-300">
            <strong className="text-[#8B0000] dark:text-amber-400 block font-bold mb-0.5">
              {t('chart_trikonas', 'Parashara Trikonas (1, 5, 9):')}
            </strong>
            Lakshmi Sthanas of supreme luck, divine grace, past-life merit, and Bhagya Ratna activation.
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/90 dark:border-emerald-500/30 text-stone-700 dark:text-stone-300">
            <strong className="text-emerald-950 dark:text-emerald-400 block font-bold mb-0.5 flex items-center gap-1">
              <Star className="w-3 h-3 text-emerald-700 fill-emerald-600" />
              {t('chart_vargottama', 'Vargottama Planets')}:
            </strong>
            {vargottamaPlanets.length > 0 ? (
              <span>
                {vargottamaPlanets.map((p) => `${getPlanetName(p.sanskritName)} (${getRashiName(p.rashi)})`).join(', ')} — {t('chart_vargottama_desc', 'Highest auspicious strength!')}
              </span>
            ) : (
              <span>{t('chart_vargottama_desc', 'No identical D1/D9 signs; benefic yogas active.')}</span>
            )}
          </div>
        </div>
      )}

      {/* Vimshottari Dasha Explorer Section (when Dasha tab is selected) */}
      {chartDivision === 'Dasha' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Dasha Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl glass-card-gold border-2 border-amber-400 shadow-md">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#8B0000] dark:text-amber-400 block">
                Active Maha Dasha
              </span>
              <h5 className="font-serif-royal text-lg font-black text-stone-900 dark:text-amber-100 mt-1">
                {vimshottariDasha?.currentMahaDasha || 'Jupiter (Guru Dev)'}
              </h5>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">
                Current Ruling Planet & Master Cycle
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-amber-300 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                Active Antardasha (Bhukti)
              </span>
              <h5 className="font-serif-royal text-lg font-black text-stone-900 dark:text-amber-100 mt-1">
                {vimshottariDasha?.currentAntardasha || 'Venus (Shukra Dev)'}
              </h5>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">
                Sub-Period Influencing Immediate Karma
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-amber-300 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-600 dark:text-stone-400 block">
                Birth Balance Dasha
              </span>
              <h5 className="font-serif-royal text-lg font-black text-stone-900 dark:text-amber-100 mt-1">
                {vimshottariDasha?.birthBalanceDasha || 'Pushya Lord (Saturn)'}
              </h5>
              <p className="text-[11px] text-amber-800 dark:text-amber-400 mt-0.5 font-semibold">
                {vimshottariDasha?.balanceYears || 8.4} Years remaining at birth
              </p>
            </div>
          </div>

          {/* 120-Year Vimshottari Master Dasha Timeline Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-serif-royal text-xs font-bold text-stone-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                120-Year Vimshottari Maha Dasha Sequence (Parashara System)
              </span>
              <span className="text-[10px] text-stone-500 font-medium">Click any dasha to inspect sub-periods (Bhuktis)</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-amber-200/90 dark:border-amber-500/30 bg-white/90 dark:bg-stone-900/90 shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-amber-200 dark:border-amber-500/30 bg-amber-50/80 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Maha Dasha Lord</th>
                    <th className="py-2.5 px-3">Span</th>
                    <th className="py-2.5 px-3">Period</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Prescribed Gemstone Remedy</th>
                    <th className="py-2.5 px-3">Key Themes</th>
                    <th className="py-2.5 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100 dark:divide-amber-500/20 font-medium text-stone-800 dark:text-stone-200">
                  {vimshottariDasha?.allMahaDashas.map((dasha) => {
                    const isExpanded = expandedAntardashaPlanet === dasha.planet;
                    return (
                      <React.Fragment key={dasha.planet}>
                        <tr
                          onClick={() => {
                            bellPlayer.playBell(587);
                            setExpandedAntardashaPlanet(isExpanded ? null : dasha.planet);
                          }}
                          className={`hover:bg-amber-100/50 dark:hover:bg-stone-800/80 cursor-pointer transition ${
                            dasha.isCurrent
                              ? 'bg-amber-100/60 dark:bg-amber-950/50 font-bold border-l-4 border-[#8B0000]'
                              : ''
                          }`}
                        >
                          <td className="py-2.5 px-3 flex items-center gap-2">
                            <span
                              className="w-3 h-3 rounded-full shrink-0 border border-amber-300"
                              style={{ backgroundColor: dasha.gemstoneColor }}
                            />
                            <strong className="text-stone-900 dark:text-white">
                              {dasha.planet} ({dasha.planetSanskrit})
                            </strong>
                          </td>
                          <td className="py-2.5 px-3 font-mono">{dasha.fullDurationYears} Years</td>
                          <td className="py-2.5 px-3 font-mono text-stone-600 dark:text-stone-400">
                            {dasha.startDate} — {dasha.endDate}
                          </td>
                          <td className="py-2.5 px-3">
                            {dasha.isCurrent ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#8B0000] text-amber-100 text-[10px] font-black animate-pulse">
                                ★ ACTIVE DASHA
                              </span>
                            ) : dasha.status === 'Completed' ? (
                              <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 text-[10px]">
                                Completed
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-stone-800 text-amber-800 dark:text-amber-300 text-[10px]">
                                Upcoming
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-[#8B0000] dark:text-amber-300 font-bold">
                            {dasha.gemstoneRemedy}
                          </td>
                          <td className="py-2.5 px-3 text-[11px] text-stone-600 dark:text-stone-400 max-w-xs truncate">
                            {dasha.keyThemes}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 underline cursor-pointer">
                              {isExpanded ? 'Hide Bhuktis ▲' : 'View Bhuktis ▼'}
                            </span>
                          </td>
                        </tr>

                        {/* Expandable Antardashas (Bhuktis) Sub-Table */}
                        {isExpanded && (
                          <tr>
                            <td colSpan={7} className="p-3 bg-amber-50/70 dark:bg-stone-900/90 border-y border-amber-200 dark:border-amber-500/30">
                              <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 dark:text-amber-300 block">
                                  Antardashas (Bhuktis) for {dasha.planet} Maha Dasha:
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                  {dasha.antardashas.map((antar) => (
                                    <div
                                      key={antar.planet}
                                      className={`p-2 rounded-xl border text-[11px] transition ${
                                        antar.isCurrent
                                          ? 'bg-white dark:bg-stone-800 border-[#8B0000] shadow-xs'
                                          : 'bg-white/80 dark:bg-stone-800/60 border-amber-200 dark:border-stone-700'
                                      }`}
                                    >
                                      <div className="flex justify-between items-center">
                                        <strong className="font-bold text-stone-900 dark:text-white">
                                          {antar.planet} ({antar.planetSanskrit})
                                        </strong>
                                        {antar.isCurrent && (
                                          <span className="px-1.5 py-0.2 rounded-xs bg-[#8B0000] text-amber-100 text-[9px] font-black">
                                            ACTIVE
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-stone-500 text-[10px] mt-0.5">
                                        {antar.startDate} — {antar.endDate} ({antar.durationMonths}m)
                                      </p>
                                      <p className="text-amber-800 dark:text-amber-400 font-semibold text-[10px] mt-0.5">
                                        Remedy: {antar.gemstoneRemedy}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Main Kundali Drawing Stage (when D1 or D9 is selected) */}
      {chartDivision !== 'Dasha' && (
      <div className="flex justify-center items-center py-2">
        {chartStyle === 'north' ? (
          <div className="relative w-full max-w-[430px] aspect-square">
            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_10px_25px_rgba(212,175,55,0.22)]">
              <defs>
                <linearGradient id="kundaliLineGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C49A2D" />
                  <stop offset="50%" stopColor="#E2C264" />
                  <stop offset="100%" stopColor="#966D12" />
                </linearGradient>
                <radialGradient id="h1Glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(212, 175, 55, 0.28)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
                </radialGradient>
                <radialGradient id="bhagyaGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(139, 0, 0, 0.14)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* Background Square */}
              <rect
                x="8"
                y="8"
                width="384"
                height="384"
                fill="#FFFDF8"
                stroke="url(#kundaliLineGold)"
                strokeWidth="2.8"
                rx="14"
              />

              {/* Diagonal Lines (Corner to Corner) */}
              <line x1="8" y1="8" x2="392" y2="392" stroke="url(#kundaliLineGold)" strokeWidth="1.8" />
              <line x1="8" y1="392" x2="392" y2="8" stroke="url(#kundaliLineGold)" strokeWidth="1.8" />

              {/* Diamond (Inner Rhombus) */}
              <polygon
                points="200,8 392,200 200,392 8,200"
                fill="none"
                stroke="url(#kundaliLineGold)"
                strokeWidth="2.2"
              />

              {/* House 1 (Lagna Center Diamond Highlight - Vishnu & Lakshmi confluence) */}
              <polygon
                points="200,8 296,104 200,200 104,104"
                fill="url(#h1Glow)"
                stroke="rgba(212,175,55,0.7)"
                strokeWidth="1.2"
              />

              {/* House 9 (Bhagya Sthana Highlight - Right Bottom Outer Triangle) */}
              <polygon
                points="296,296 392,200 392,392"
                fill="url(#bhagyaGlow)"
              />

              {/* RASHI NUMBERS & PLANET TEXT FOR ALL 12 HOUSES (Counter-Clockwise Fixed Parashara Format) */}

              {/* H1 (Lagna - Top Center Diamond) */}
              <g className="cursor-pointer" onClick={() => setSelectedPlanet(housePlanets[1][0] || null)}>
                <text x="200" y="32" textAnchor="middle" fill="#8C6212" fontSize="13" fontWeight="900">
                  {getHouseRashiNum(1)}
                </text>
                <text x="200" y="48" textAnchor="middle" fill="#700B1A" fontSize="9" fontWeight="800">
                  {chartDivision === 'D1' ? 'LAGNA' : 'D9 LAGNA'}
                </text>
                {housePlanets[1].map((p, idx) => (
                  <text key={p.planet} x="200" y={66 + idx * 15} textAnchor="middle" fill="#1C160E" fontSize="11" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''} {p.isRetrograde ? '(R)' : ''}
                  </text>
                ))}
              </g>

              {/* H2 (Top Left Triangle) */}
              <g>
                <text x="110" y="42" textAnchor="middle" fill="#8C6212" fontSize="12" fontWeight="800">
                  {getHouseRashiNum(2)}
                </text>
                {housePlanets[2].map((p, idx) => (
                  <text key={p.planet} x="105" y={62 + idx * 14} textAnchor="middle" fill="#1C160E" fontSize="10" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''}
                  </text>
                ))}
              </g>

              {/* H3 (Left Top Triangle) */}
              <g>
                <text x="50" y="105" textAnchor="middle" fill="#8C6212" fontSize="12" fontWeight="800">
                  {getHouseRashiNum(3)}
                </text>
                {housePlanets[3].map((p, idx) => (
                  <text key={p.planet} x="55" y={125 + idx * 14} textAnchor="middle" fill="#1C160E" fontSize="10" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''}
                  </text>
                ))}
              </g>

              {/* H4 (Left Center Diamond - Sukha Sthana) */}
              <g>
                <text x="105" y="195" textAnchor="middle" fill="#8C6212" fontSize="13" fontWeight="900">
                  {getHouseRashiNum(4)}
                </text>
                {housePlanets[4].map((p, idx) => (
                  <text key={p.planet} x="105" y={218 + idx * 14} textAnchor="middle" fill="#1C160E" fontSize="10.5" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''}
                  </text>
                ))}
              </g>

              {/* H5 (Left Bottom Triangle - Putra / Purva Punya) */}
              <g>
                <text x="50" y="295" textAnchor="middle" fill="#8C6212" fontSize="12" fontWeight="800">
                  {getHouseRashiNum(5)}
                </text>
                {housePlanets[5].map((p, idx) => (
                  <text key={p.planet} x="55" y={315 + idx * 14} textAnchor="middle" fill="#1C160E" fontSize="10" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''}
                  </text>
                ))}
              </g>

              {/* H6 (Bottom Left Triangle - Shatru / Roga) */}
              <g>
                <text x="110" y="358" textAnchor="middle" fill="#8C6212" fontSize="12" fontWeight="800">
                  {getHouseRashiNum(6)}
                </text>
                {housePlanets[6].map((p, idx) => (
                  <text key={p.planet} x="110" y={375 + idx * 13} textAnchor="middle" fill="#1C160E" fontSize="10" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''}
                  </text>
                ))}
              </g>

              {/* H7 (Bottom Center Diamond - Kalatra Sthana) */}
              <g>
                <text x="200" y="315" textAnchor="middle" fill="#8C6212" fontSize="13" fontWeight="900">
                  {getHouseRashiNum(7)}
                </text>
                {housePlanets[7].map((p, idx) => (
                  <text key={p.planet} x="200" y={335 + idx * 14} textAnchor="middle" fill="#1C160E" fontSize="10.5" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''}
                  </text>
                ))}
              </g>

              {/* H8 (Bottom Right Triangle - Ayur / Randhra) */}
              <g>
                <text x="290" y="358" textAnchor="middle" fill="#8C6212" fontSize="12" fontWeight="800">
                  {getHouseRashiNum(8)}
                </text>
                {housePlanets[8].map((p, idx) => (
                  <text key={p.planet} x="290" y={375 + idx * 13} textAnchor="middle" fill="#1C160E" fontSize="10" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''}
                  </text>
                ))}
              </g>

              {/* H9 (Right Bottom Triangle - BHAGYA STHANA / LUCKY STONE HOUSE) */}
              <g>
                <text x="350" y="295" textAnchor="middle" fill="#8B0000" fontSize="13" fontWeight="900">
                  {getHouseRashiNum(9)}
                </text>
                <text x="350" y="278" textAnchor="middle" fill="#8B0000" fontSize="8" fontWeight="800">
                  ★ BHAGYA
                </text>
                {housePlanets[9].map((p, idx) => (
                  <text key={p.planet} x="345" y={315 + idx * 14} textAnchor="middle" fill="#700B1A" fontSize="10.5" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''}
                  </text>
                ))}
              </g>

              {/* H10 (Right Center Diamond - Karma / Rajya Sthana) */}
              <g>
                <text x="295" y="195" textAnchor="middle" fill="#8C6212" fontSize="13" fontWeight="900">
                  {getHouseRashiNum(10)}
                </text>
                {housePlanets[10].map((p, idx) => (
                  <text key={p.planet} x="295" y={218 + idx * 14} textAnchor="middle" fill="#1C160E" fontSize="10.5" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''}
                  </text>
                ))}
              </g>

              {/* H11 (Right Top Triangle - Labha / Aaya Sthana) */}
              <g>
                <text x="350" y="105" textAnchor="middle" fill="#8C6212" fontSize="12" fontWeight="800">
                  {getHouseRashiNum(11)}
                </text>
                {housePlanets[11].map((p, idx) => (
                  <text key={p.planet} x="345" y={125 + idx * 14} textAnchor="middle" fill="#1C160E" fontSize="10" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''}
                  </text>
                ))}
              </g>

              {/* H12 (Top Right Triangle - Vyaya / Moksha Sthana) */}
              <g>
                <text x="290" y="42" textAnchor="middle" fill="#8C6212" fontSize="12" fontWeight="800">
                  {getHouseRashiNum(12)}
                </text>
                {housePlanets[12].map((p, idx) => (
                  <text key={p.planet} x="295" y={62 + idx * 14} textAnchor="middle" fill="#1C160E" fontSize="10" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''}
                  </text>
                ))}
              </g>
            </svg>
          </div>
        ) : (
          /* Authentic South Indian Grid Chart (Clockwise Fixed Signs with Center Dedication) */
          <div className="grid grid-cols-4 grid-rows-4 w-full max-w-[430px] aspect-square border-2 border-amber-400 bg-[#FFFDF8] rounded-2xl p-1 gap-1 text-xs text-center shadow-lg">
            {/* ROW 1: Pisces, Aries, Taurus, Gemini */}
            {[
              { sign: 'Pisces', label: 'Pisces (Meena)', rashiNum: 12 },
              { sign: 'Aries', label: 'Aries (Mesha)', rashiNum: 1 },
              { sign: 'Taurus', label: 'Taurus (Vrishabha)', rashiNum: 2 },
              { sign: 'Gemini', label: 'Gemini (Mithuna)', rashiNum: 3 },
            ].map((box) => {
              const isLagna = activeLagnaSign === box.sign;
              const pList = planetaryPositions.filter((p) =>
                (chartDivision === 'D1' ? p.rashi : p.d9Rashi) === box.sign
              );
              return (
                <div
                  key={box.sign}
                  className={`border border-amber-300/70 p-1.5 flex flex-col justify-between rounded-lg relative overflow-hidden ${
                    isLagna ? 'bg-amber-100/90 ring-1 ring-[#8B0000]' : 'bg-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-amber-900">{box.sign}</span>
                    {isLagna && (
                      <span className="px-1 py-0.2 bg-[#8B0000] text-amber-100 text-[9px] font-black rounded-xs">
                        {chartDivision === 'D1' ? 'LAGNA' : 'D9 LAGNA'}
                      </span>
                    )}
                  </div>
                  <div className="space-y-0.5 my-auto">
                    {pList.map((p) => (
                      <span key={p.planet} className="block text-[10px] font-bold text-stone-900 leading-tight">
                        {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* ROW 2: Aquarius (Col 0), Center Title (Cols 1-2), Cancer (Col 3) */}
            {/* Aquarius */}
            <div className={`border border-amber-300/70 p-1.5 flex flex-col justify-between rounded-lg ${activeLagnaSign === 'Aquarius' ? 'bg-amber-100/90 ring-1 ring-[#8B0000]' : 'bg-white/80'}`}>
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-amber-900">Aquarius</span>
                {activeLagnaSign === 'Aquarius' && <span className="px-1 bg-[#8B0000] text-amber-100 text-[9px] font-black rounded-xs">LAGNA</span>}
              </div>
              <div className="space-y-0.5 my-auto">
                {planetaryPositions.filter(p => (chartDivision === 'D1' ? p.rashi : p.d9Rashi) === 'Aquarius').map(p => (
                  <span key={p.planet} className="block text-[10px] font-bold text-stone-900 leading-tight">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* Center Area (Col span 2, Row span 2) */}
            <div className="col-span-2 row-span-2 bg-gradient-to-br from-[#FFF9EE] to-[#F7EED8] border-2 border-amber-300/90 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-inner">
              <span className="text-[10px] uppercase tracking-widest text-[#8B0000] font-black">
                SRI KAMALA JEWELLERS • BALLARI
              </span>
              <h5 className="font-serif-royal text-sm sm:text-base font-black text-stone-950 mt-0.5">
                {chartDivision === 'D1' ? 'Parashara Lagna Chakra' : 'Parashara Navamsha (D9)'}
              </h5>
              <div className="text-[10px] text-stone-600 mt-2 space-y-0.5">
                <p>Ascendant: <strong className="text-amber-900">{activeLagnaSign} ({activeLagnaDegree})</strong></p>
                <p>Ayanamsha: {ayanamsa.split(' ')[0]}</p>
                <p className="text-[#8B0000] font-bold">Bhagya Sthana: 9th House</p>
              </div>
            </div>

            {/* Cancer */}
            <div className={`border border-amber-300/70 p-1.5 flex flex-col justify-between rounded-lg ${activeLagnaSign === 'Cancer' ? 'bg-amber-100/90 ring-1 ring-[#8B0000]' : 'bg-white/80'}`}>
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-amber-900">Cancer</span>
                {activeLagnaSign === 'Cancer' && <span className="px-1 bg-[#8B0000] text-amber-100 text-[9px] font-black rounded-xs">LAGNA</span>}
              </div>
              <div className="space-y-0.5 my-auto">
                {planetaryPositions.filter(p => (chartDivision === 'D1' ? p.rashi : p.d9Rashi) === 'Cancer').map(p => (
                  <span key={p.planet} className="block text-[10px] font-bold text-stone-900 leading-tight">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* ROW 3: Capricorn (Col 0), Center continues, Leo (Col 3) */}
            {/* Capricorn */}
            <div className={`border border-amber-300/70 p-1.5 flex flex-col justify-between rounded-lg ${activeLagnaSign === 'Capricorn' ? 'bg-amber-100/90 ring-1 ring-[#8B0000]' : 'bg-white/80'}`}>
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-amber-900">Capricorn</span>
                {activeLagnaSign === 'Capricorn' && <span className="px-1 bg-[#8B0000] text-amber-100 text-[9px] font-black rounded-xs">LAGNA</span>}
              </div>
              <div className="space-y-0.5 my-auto">
                {planetaryPositions.filter(p => (chartDivision === 'D1' ? p.rashi : p.d9Rashi) === 'Capricorn').map(p => (
                  <span key={p.planet} className="block text-[10px] font-bold text-stone-900 leading-tight">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* Leo */}
            <div className={`border border-amber-300/70 p-1.5 flex flex-col justify-between rounded-lg ${activeLagnaSign === 'Leo' ? 'bg-amber-100/90 ring-1 ring-[#8B0000]' : 'bg-white/80'}`}>
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-amber-900">Leo</span>
                {activeLagnaSign === 'Leo' && <span className="px-1 bg-[#8B0000] text-amber-100 text-[9px] font-black rounded-xs">LAGNA</span>}
              </div>
              <div className="space-y-0.5 my-auto">
                {planetaryPositions.filter(p => (chartDivision === 'D1' ? p.rashi : p.d9Rashi) === 'Leo').map(p => (
                  <span key={p.planet} className="block text-[10px] font-bold text-stone-900 leading-tight">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* ROW 4: Sagittarius, Scorpio, Libra, Virgo */}
            {[
              { sign: 'Sagittarius', rashiNum: 9 },
              { sign: 'Scorpio', rashiNum: 8 },
              { sign: 'Libra', rashiNum: 7 },
              { sign: 'Virgo', rashiNum: 6 },
            ].map((box) => {
              const isLagna = activeLagnaSign === box.sign;
              const pList = planetaryPositions.filter((p) =>
                (chartDivision === 'D1' ? p.rashi : p.d9Rashi) === box.sign
              );
              return (
                <div
                  key={box.sign}
                  className={`border border-amber-300/70 p-1.5 flex flex-col justify-between rounded-lg ${
                    isLagna ? 'bg-amber-100/90 ring-1 ring-[#8B0000]' : 'bg-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-amber-900">{box.sign}</span>
                    {isLagna && <span className="px-1 bg-[#8B0000] text-amber-100 text-[9px] font-black rounded-xs">LAGNA</span>}
                  </div>
                  <div className="space-y-0.5 my-auto">
                    {pList.map((p) => (
                      <span key={p.planet} className="block text-[10px] font-bold text-stone-900 leading-tight">
                        {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isVargottama ? '★' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      )}

      {/* Planetary Dignity & Exact Degree Table */}
      <div className="pt-2">
        <h5 className="font-serif-royal text-sm font-bold text-stone-900 dark:text-white mb-2 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            {t('chart_sphuta_title', 'Parashara Graha Sphuta (Planetary Longitudes & Div-9 Dignities)')}
          </span>
          <span className="text-[11px] text-amber-900 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-stone-800 px-2 py-0.5 rounded-md border border-amber-200 dark:border-stone-700">
            {t('chart_sphuta_hint', 'Click any Graha row to inspect remedies')}
          </span>
        </h5>

        <div className="overflow-x-auto rounded-2xl border border-amber-200/90 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-amber-200 dark:border-stone-800 bg-amber-50/80 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">{t('chart_col_graha', 'Graha')}</th>
                <th className="py-2.5 px-3">{t('chart_col_rashi', 'D1 Rashi')}</th>
                <th className="py-2.5 px-3">{t('chart_col_house', 'D1 House')}</th>
                <th className="py-2.5 px-3 text-right">{t('chart_col_degree', 'Degree')}</th>
                <th className="py-2.5 px-3">{t('chart_col_nakshatra', 'Nakshatra & Pada')}</th>
                <th className="py-2.5 px-3">{t('chart_col_dignity', 'Parashara Dignity')}</th>
                <th className="py-2.5 px-3">{t('chart_col_d9', 'D9 Navamsha')}</th>
                <th className="py-2.5 px-3 text-center">{t('chart_col_vargottama', 'Vargottama')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 dark:divide-stone-800 font-medium text-stone-800 dark:text-stone-200">
              {planetaryPositions.map((p) => {
                const isBhagyaLord = p.house === 9;
                const isVarg = p.isVargottama || p.rashi === p.d9Rashi;
                return (
                  <tr
                    key={p.planet}
                    onClick={() => {
                      bellPlayer.playBell(587);
                      setSelectedPlanet(p);
                    }}
                    className={`hover:bg-amber-100/50 dark:hover:bg-stone-800/60 cursor-pointer transition ${
                      isBhagyaLord ? 'bg-amber-100/35 dark:bg-amber-950/30 font-bold' : ''
                    }`}
                  >
                    <td className="py-2 px-3 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-200 dark:bg-amber-900/70 text-[#700B1A] dark:text-amber-200 flex items-center justify-center text-[10px] font-black">
                        {p.sanskritGlyph}
                      </span>
                      <span className="text-stone-900 dark:text-white">{getPlanetName(p.sanskritName)} ({getPlanetName(p.planet)})</span>
                      {p.isRetrograde && (
                        <span className="px-1 rounded-sm bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-[9px] font-black">
                          (R)
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-amber-950 dark:text-amber-200 font-semibold">{getRashiName(p.rashi)}</td>
                    <td className="py-2 px-3">
                      House {p.house} {isBhagyaLord && <span className="text-[#8B0000] dark:text-amber-400 font-black ml-1">★ Bhagya</span>}
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-stone-900 dark:text-white">{p.degreeFormatted}</td>
                    <td className="py-2 px-3 text-stone-600 dark:text-stone-400">{p.nakshatra} (Pada {p.pada})</td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.dignity === 'Exalted'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                            : p.dignity === 'Own Sign'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                            : p.dignity === 'Debilitated'
                            ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        {p.dignity}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-amber-900 dark:text-amber-300 font-semibold">
                      {getRashiName(p.d9Rashi)} (H{p.d9House})
                    </td>
                    <td className="py-2 px-3 text-center">
                      {isVarg ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900/60 text-amber-950 dark:text-amber-200 font-black text-[10px] border border-amber-400 dark:border-amber-600">
                          ★ {t('chart_col_vargottama', 'Vargottama')}
                        </span>
                      ) : (
                        <span className="text-stone-400 text-[10px]">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Planet Modal / Quick Drawer */}
      {selectedPlanet && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-stone-900 border border-amber-300 dark:border-amber-600/50 text-xs text-stone-800 dark:text-stone-200 space-y-2 animate-fade-in-up shadow-lg">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-300 dark:bg-amber-800 text-[#8B0000] dark:text-amber-200 font-black text-[11px] flex items-center justify-center">
                {selectedPlanet.sanskritGlyph}
              </span>
              {selectedPlanet.sanskritName} ({selectedPlanet.planet}) Details
            </span>
            <button
              onClick={() => setSelectedPlanet(null)}
              className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white font-bold px-2 py-0.5 rounded-lg bg-amber-200/60 dark:bg-stone-800 cursor-pointer"
            >
              Close ✕
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
            <p><strong>D1 Position:</strong> {selectedPlanet.rashi} at {selectedPlanet.degreeFormatted} (H{selectedPlanet.house})</p>
            <p><strong>D9 Navamsha:</strong> {selectedPlanet.d9Rashi} (H{selectedPlanet.d9House})</p>
            <p><strong>Nakshatra:</strong> {selectedPlanet.nakshatra} (Pada {selectedPlanet.pada})</p>
            <p><strong>Parashara Status:</strong> {selectedPlanet.status} • {selectedPlanet.dignity}</p>
          </div>
          {selectedPlanet.isVargottama && (
            <div className="p-2 bg-amber-200/70 dark:bg-amber-950/60 border border-amber-400 dark:border-amber-600 rounded-xl text-amber-950 dark:text-amber-200 font-semibold text-[11px]">
              ★ <strong>Parashara Vargottama Gemstone Blessing:</strong> This planet occupies the exact same sign in both D1 and D9. Wearing its consecrated ratna channels maximum harmonic prosperity.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
