import React, { useState } from 'react';
import { PlanetaryPosition } from '../types/astrology';
import { Sparkles, Compass, ShieldCheck, Eye, Layers } from 'lucide-react';
import { bellPlayer } from '../utils/audioBell';

interface Props {
  lagnaRashi: string;
  lagnaRashiNumber?: number;
  lagnaDegreeFormatted?: string;
  ayanamsa?: string;
  planetaryPositions: PlanetaryPosition[];
}

export const KundaliChartSvg: React.FC<Props> = ({
  lagnaRashi,
  lagnaRashiNumber,
  lagnaDegreeFormatted = "10°45'",
  ayanamsa = 'Lahiri (Chitra Paksha) 24°14\'32"',
  planetaryPositions,
}) => {
  const [chartStyle, setChartStyle] = useState<'north' | 'south'>('north');
  const [chartDivision, setChartDivision] = useState<'D1' | 'D9'>('D1');
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetaryPosition | null>(null);

  const signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const lagnaIdx = signs.indexOf(lagnaRashi);
  const effectiveLagnaNum = lagnaRashiNumber || (lagnaIdx >= 0 ? lagnaIdx + 1 : 1);

  // Helper to get Rashi number for each house (1 to 12) in North Indian chart
  const getHouseRashiNum = (houseNum: number) => {
    return ((effectiveLagnaNum - 1 + (houseNum - 1)) % 12) + 1;
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

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-300/60 relative overflow-hidden space-y-6">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
            <h4 className="font-serif-royal text-xl font-black text-stone-900 tracking-tight">
              {chartDivision === 'D1' ? 'Vedic Janam Kundali (Lagna Chakra)' : 'Navamsha Chakra (D9 Spiritual Kundali)'}
            </h4>
          </div>
          <p className="text-xs text-stone-600 mt-1 font-medium">
            Ascendant (Lagna): <strong className="text-amber-950 font-bold">{lagnaRashi} ({lagnaDegreeFormatted})</strong> • Ayanamsha: <span className="text-stone-500">{ayanamsa}</span>
          </p>
        </div>

        {/* Chart Style & Division Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* D1 / D9 Switcher */}
          <div className="flex items-center bg-amber-100/80 border border-amber-300 rounded-xl p-1 text-xs">
            <button
              onClick={() => {
                bellPlayer.playBell(587);
                setChartDivision('D1');
              }}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                chartDivision === 'D1'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              Lagna (D1)
            </button>
            <button
              onClick={() => {
                bellPlayer.playBell(528);
                setChartDivision('D9');
              }}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                chartDivision === 'D9'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              Navamsha (D9)
            </button>
          </div>

          {/* North / South Style Switcher */}
          <div className="flex items-center bg-white/90 border border-amber-300/80 rounded-xl p-1 text-xs shadow-2xs">
            <button
              onClick={() => {
                bellPlayer.playBell(587);
                setChartStyle('north');
              }}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                chartStyle === 'north'
                  ? 'bg-[#8B0000] text-amber-100 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              North (Diamond)
            </button>
            <button
              onClick={() => {
                bellPlayer.playBell(587);
                setChartStyle('south');
              }}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                chartStyle === 'south'
                  ? 'bg-[#8B0000] text-amber-100 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              South (Box)
            </button>
          </div>
        </div>
      </div>

      {/* Main Kundali Drawing Stage */}
      <div className="flex justify-center items-center py-2">
        {chartStyle === 'north' ? (
          <div className="relative w-full max-w-[420px] aspect-square">
            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_8px_20px_rgba(212,175,55,0.2)]">
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
                  <stop offset="0%" stopColor="rgba(139, 0, 0, 0.12)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              {/* Background Square */}
              <rect
                x="8"
                y="8"
                width="384"
                height="384"
                fill="#FFFDF9"
                stroke="url(#kundaliLineGold)"
                strokeWidth="2.8"
                rx="12"
              />

              {/* Diagonal Lines */}
              <line x1="8" y1="8" x2="392" y2="392" stroke="url(#kundaliLineGold)" strokeWidth="1.8" />
              <line x1="8" y1="392" x2="392" y2="8" stroke="url(#kundaliLineGold)" strokeWidth="1.8" />

              {/* Diamond (Inner Rhombus) */}
              <polygon
                points="200,8 392,200 200,392 8,200"
                fill="none"
                stroke="url(#kundaliLineGold)"
                strokeWidth="2.2"
              />

              {/* House 1 (Lagna Center Diamond Highlight) */}
              <polygon
                points="200,8 296,104 200,200 104,104"
                fill="url(#h1Glow)"
                stroke="rgba(212,175,55,0.7)"
                strokeWidth="1.2"
              />

              {/* House 9 (Bhagya Sthana Highlight - Right Bottom Triangle) */}
              <polygon
                points="296,296 392,200 392,392"
                fill="url(#bhagyaGlow)"
              />

              {/* RASHI NUMBERS & PLANET TEXT FOR ALL 12 HOUSES */}

              {/* H1 (Lagna - Top diamond center) */}
              <g className="cursor-pointer" onClick={() => setSelectedPlanet(housePlanets[1][0] || null)}>
                <text x="200" y="32" textAnchor="middle" fill="#8C6212" fontSize="13" fontWeight="900">
                  {getHouseRashiNum(1)}
                </text>
                <text x="200" y="50" textAnchor="middle" fill="#700B1A" fontSize="9" fontWeight="800">
                  LAGNA
                </text>
                {housePlanets[1].map((p, idx) => (
                  <text key={p.planet} x="200" y={70 + idx * 15} textAnchor="middle" fill="#1C160E" fontSize="11" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted} {p.isRetrograde ? '(R)' : ''}
                  </text>
                ))}
              </g>

              {/* H2 (Top Left triangle) */}
              <g>
                <text x="110" y="42" textAnchor="middle" fill="#8C6212" fontSize="12" fontWeight="800">
                  {getHouseRashiNum(2)}
                </text>
                {housePlanets[2].map((p, idx) => (
                  <text key={p.planet} x="105" y={62 + idx * 14} textAnchor="middle" fill="#1C160E" fontSize="10" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted}
                  </text>
                ))}
              </g>

              {/* H3 (Left Top triangle) */}
              <g>
                <text x="50" y="105" textAnchor="middle" fill="#8C6212" fontSize="12" fontWeight="800">
                  {getHouseRashiNum(3)}
                </text>
                {housePlanets[3].map((p, idx) => (
                  <text key={p.planet} x="55" y={125 + idx * 14} textAnchor="middle" fill="#1C160E" fontSize="10" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted}
                  </text>
                ))}
              </g>

              {/* H4 (Left center diamond - Sukha Sthana) */}
              <g>
                <text x="105" y="195" textAnchor="middle" fill="#8C6212" fontSize="13" fontWeight="900">
                  {getHouseRashiNum(4)}
                </text>
                {housePlanets[4].map((p, idx) => (
                  <text key={p.planet} x="105" y={218 + idx * 14} textAnchor="middle" fill="#1C160E" fontSize="10.5" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted}
                  </text>
                ))}
              </g>

              {/* H5 (Left bottom triangle - Putra / Purva Punya) */}
              <g>
                <text x="50" y="295" textAnchor="middle" fill="#8C6212" fontSize="12" fontWeight="800">
                  {getHouseRashiNum(5)}
                </text>
                {housePlanets[5].map((p, idx) => (
                  <text key={p.planet} x="55" y={315 + idx * 14} textAnchor="middle" fill="#1C160E" fontSize="10" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted}
                  </text>
                ))}
              </g>

              {/* H6 (Bottom left triangle - Shatru / Roga) */}
              <g>
                <text x="110" y="358" textAnchor="middle" fill="#8C6212" fontSize="12" fontWeight="800">
                  {getHouseRashiNum(6)}
                </text>
                {housePlanets[6].map((p, idx) => (
                  <text key={p.planet} x="110" y={375 + idx * 13} textAnchor="middle" fill="#1C160E" fontSize="10" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted}
                  </text>
                ))}
              </g>

              {/* H7 (Bottom diamond center - Kalatra) */}
              <g>
                <text x="200" y="315" textAnchor="middle" fill="#8C6212" fontSize="13" fontWeight="900">
                  {getHouseRashiNum(7)}
                </text>
                {housePlanets[7].map((p, idx) => (
                  <text key={p.planet} x="200" y={335 + idx * 14} textAnchor="middle" fill="#1C160E" fontSize="10.5" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted}
                  </text>
                ))}
              </g>

              {/* H8 (Bottom right triangle - Ayur) */}
              <g>
                <text x="290" y="358" textAnchor="middle" fill="#8C6212" fontSize="12" fontWeight="800">
                  {getHouseRashiNum(8)}
                </text>
                {housePlanets[8].map((p, idx) => (
                  <text key={p.planet} x="290" y={375 + idx * 13} textAnchor="middle" fill="#1C160E" fontSize="10" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted}
                  </text>
                ))}
              </g>

              {/* H9 (Right bottom triangle - BHAGYA STHANA / LUCKY STONE HOUSE) */}
              <g>
                <text x="350" y="295" textAnchor="middle" fill="#8B0000" fontSize="13" fontWeight="900">
                  {getHouseRashiNum(9)}
                </text>
                <text x="350" y="278" textAnchor="middle" fill="#8B0000" fontSize="8" fontWeight="800">
                  ★ BHAGYA
                </text>
                {housePlanets[9].map((p, idx) => (
                  <text key={p.planet} x="345" y={315 + idx * 14} textAnchor="middle" fill="#700B1A" fontSize="10.5" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted}
                  </text>
                ))}
              </g>

              {/* H10 (Right center diamond - Karma / Rajya Sthana) */}
              <g>
                <text x="295" y="195" textAnchor="middle" fill="#8C6212" fontSize="13" fontWeight="900">
                  {getHouseRashiNum(10)}
                </text>
                {housePlanets[10].map((p, idx) => (
                  <text key={p.planet} x="295" y={218 + idx * 14} textAnchor="middle" fill="#1C160E" fontSize="10.5" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted}
                  </text>
                ))}
              </g>

              {/* H11 (Right top triangle - Labha Sthana) */}
              <g>
                <text x="350" y="105" textAnchor="middle" fill="#8C6212" fontSize="12" fontWeight="800">
                  {getHouseRashiNum(11)}
                </text>
                {housePlanets[11].map((p, idx) => (
                  <text key={p.planet} x="345" y={125 + idx * 14} textAnchor="middle" fill="#1C160E" fontSize="10" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted}
                  </text>
                ))}
              </g>

              {/* H12 (Top right triangle - Vyaya Sthana) */}
              <g>
                <text x="290" y="42" textAnchor="middle" fill="#8C6212" fontSize="12" fontWeight="800">
                  {getHouseRashiNum(12)}
                </text>
                {housePlanets[12].map((p, idx) => (
                  <text key={p.planet} x="295" y={62 + idx * 14} textAnchor="middle" fill="#1C160E" fontSize="10" fontWeight="bold">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted}
                  </text>
                ))}
              </g>
            </svg>
          </div>
        ) : (
          /* Authentic South Indian Grid Chart (Clockwise Fixed Signs with Center Dedication) */
          <div className="grid grid-cols-4 grid-rows-4 w-full max-w-[420px] aspect-square border-2 border-amber-400 bg-[#FFFDF8] rounded-2xl p-1 gap-1 text-xs text-center shadow-lg">
            {/* ROW 1: Pisces, Aries, Taurus, Gemini */}
            {[
              { sign: 'Pisces (Meena)', rashiNum: 12 },
              { sign: 'Aries (Mesha)', rashiNum: 1 },
              { sign: 'Taurus (Vrishabha)', rashiNum: 2 },
              { sign: 'Gemini (Mithuna)', rashiNum: 3 },
            ].map((box) => {
              const isLagna = box.sign.startsWith(lagnaRashi);
              const pList = planetaryPositions.filter((p) => p.rashi.startsWith(box.sign.split(' ')[0]));
              return (
                <div
                  key={box.sign}
                  className={`border border-amber-300/70 p-1.5 flex flex-col justify-between rounded-lg relative overflow-hidden ${
                    isLagna ? 'bg-amber-100/90 ring-1 ring-[#8B0000]' : 'bg-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-amber-900">{box.sign.split(' ')[0]}</span>
                    {isLagna && (
                      <span className="px-1 py-0.2 bg-[#8B0000] text-amber-100 text-[9px] font-black rounded-xs">
                        LAGNA
                      </span>
                    )}
                  </div>
                  <div className="space-y-0.5 my-auto">
                    {pList.map((p) => (
                      <span key={p.planet} className="block text-[10px] font-bold text-stone-900 leading-tight">
                        {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* ROW 2: Aquarius (Col 0), Center Title (Cols 1-2), Cancer (Col 3) */}
            {/* Aquarius */}
            <div className={`border border-amber-300/70 p-1.5 flex flex-col justify-between rounded-lg ${lagnaRashi === 'Aquarius' ? 'bg-amber-100/90 ring-1 ring-[#8B0000]' : 'bg-white/80'}`}>
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-amber-900">Aquarius</span>
                {lagnaRashi === 'Aquarius' && <span className="px-1 bg-[#8B0000] text-amber-100 text-[9px] font-black rounded-xs">LAGNA</span>}
              </div>
              <div className="space-y-0.5 my-auto">
                {planetaryPositions.filter(p => p.rashi === 'Aquarius').map(p => (
                  <span key={p.planet} className="block text-[10px] font-bold text-stone-900 leading-tight">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted}
                  </span>
                ))}
              </div>
            </div>

            {/* Center Area (Col span 2, Row span 2) */}
            <div className="col-span-2 row-span-2 bg-gradient-to-br from-[#FFF9EE] to-[#F7EED8] border-2 border-amber-300/90 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-inner">
              <span className="text-[10px] uppercase tracking-widest text-[#8B0000] font-black">
                SRI KAMALA JEWELLERS
              </span>
              <h5 className="font-serif-royal text-sm sm:text-base font-black text-stone-950 mt-0.5">
                {chartDivision === 'D1' ? 'Lagna Chakra' : 'Navamsha (D9)'}
              </h5>
              <div className="text-[10px] text-stone-600 mt-2 space-y-0.5">
                <p>Ascendant: <strong className="text-amber-900">{lagnaRashi}</strong></p>
                <p>Ayanamsha: {ayanamsa.split(' ')[0]}</p>
                <p className="text-[#8B0000] font-bold">Bhagya Sthana: 9th House</p>
              </div>
            </div>

            {/* Cancer */}
            <div className={`border border-amber-300/70 p-1.5 flex flex-col justify-between rounded-lg ${lagnaRashi === 'Cancer' ? 'bg-amber-100/90 ring-1 ring-[#8B0000]' : 'bg-white/80'}`}>
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-amber-900">Cancer</span>
                {lagnaRashi === 'Cancer' && <span className="px-1 bg-[#8B0000] text-amber-100 text-[9px] font-black rounded-xs">LAGNA</span>}
              </div>
              <div className="space-y-0.5 my-auto">
                {planetaryPositions.filter(p => p.rashi === 'Cancer').map(p => (
                  <span key={p.planet} className="block text-[10px] font-bold text-stone-900 leading-tight">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted}
                  </span>
                ))}
              </div>
            </div>

            {/* ROW 3: Capricorn (Col 0), Center continues, Leo (Col 3) */}
            {/* Capricorn */}
            <div className={`border border-amber-300/70 p-1.5 flex flex-col justify-between rounded-lg ${lagnaRashi === 'Capricorn' ? 'bg-amber-100/90 ring-1 ring-[#8B0000]' : 'bg-white/80'}`}>
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-amber-900">Capricorn</span>
                {lagnaRashi === 'Capricorn' && <span className="px-1 bg-[#8B0000] text-amber-100 text-[9px] font-black rounded-xs">LAGNA</span>}
              </div>
              <div className="space-y-0.5 my-auto">
                {planetaryPositions.filter(p => p.rashi === 'Capricorn').map(p => (
                  <span key={p.planet} className="block text-[10px] font-bold text-stone-900 leading-tight">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted}
                  </span>
                ))}
              </div>
            </div>

            {/* Leo */}
            <div className={`border border-amber-300/70 p-1.5 flex flex-col justify-between rounded-lg ${lagnaRashi === 'Leo' ? 'bg-amber-100/90 ring-1 ring-[#8B0000]' : 'bg-white/80'}`}>
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-amber-900">Leo</span>
                {lagnaRashi === 'Leo' && <span className="px-1 bg-[#8B0000] text-amber-100 text-[9px] font-black rounded-xs">LAGNA</span>}
              </div>
              <div className="space-y-0.5 my-auto">
                {planetaryPositions.filter(p => p.rashi === 'Leo').map(p => (
                  <span key={p.planet} className="block text-[10px] font-bold text-stone-900 leading-tight">
                    {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted}
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
              const isLagna = lagnaRashi === box.sign;
              const pList = planetaryPositions.filter((p) => p.rashi === box.sign);
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
                        {p.sanskritGlyph} {p.planet.slice(0, 2)} {p.degreeFormatted}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Planetary Dignity & Exact Degree Table */}
      <div className="pt-2">
        <h5 className="font-serif-royal text-sm font-bold text-stone-900 mb-2 flex items-center justify-between">
          <span>Graha Sphuta (Planetary Degrees & Dignities)</span>
          <span className="text-[11px] text-amber-900 font-normal">Click any planet to inspect</span>
        </h5>

        <div className="overflow-x-auto rounded-2xl border border-amber-200/90 bg-white/90 shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-amber-200 bg-amber-50/70 text-stone-600 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Graha</th>
                <th className="py-2.5 px-3">Rashi (Sign)</th>
                <th className="py-2.5 px-3">House (Bhava)</th>
                <th className="py-2.5 px-3 text-right">Degree</th>
                <th className="py-2.5 px-3">Nakshatra & Pada</th>
                <th className="py-2.5 px-3">Dignity</th>
                <th className="py-2.5 px-3">Navamsha (D9)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 font-medium text-stone-800">
              {planetaryPositions.map((p) => {
                const isBhagyaLord = p.house === 9;
                return (
                  <tr
                    key={p.planet}
                    onClick={() => setSelectedPlanet(p)}
                    className={`hover:bg-amber-100/50 cursor-pointer transition ${
                      isBhagyaLord ? 'bg-amber-100/40 font-bold' : ''
                    }`}
                  >
                    <td className="py-2 px-3 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-200 text-[#700B1A] flex items-center justify-center text-[10px] font-black">
                        {p.sanskritGlyph}
                      </span>
                      <span>{p.sanskritName} ({p.planet})</span>
                      {p.isRetrograde && (
                        <span className="px-1 rounded-sm bg-rose-100 text-rose-800 text-[9px] font-black">
                          R
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-amber-950 font-semibold">{p.rashi}</td>
                    <td className="py-2 px-3">
                      House {p.house} {isBhagyaLord && <span className="text-[#8B0000] font-black ml-1">★ Bhagya</span>}
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-stone-900">{p.degreeFormatted}</td>
                    <td className="py-2 px-3 text-stone-600">{p.nakshatra} (Pada {p.pada})</td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.dignity === 'Exalted'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : p.dignity === 'Own Sign'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : p.dignity === 'Debilitated'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {p.dignity}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-amber-900 font-semibold">{p.d9Rashi} (H{p.d9House})</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
