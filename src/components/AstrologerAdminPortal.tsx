import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Award,
  CheckCircle2,
  Lock,
  Unlock,
  UserCheck,
  FileText,
  Clock,
  Calendar,
  AlertTriangle,
  Scale,
  Fingerprint,
  RefreshCw,
  Eye,
  Check
} from 'lucide-react';
import { AstrologicalReport, GemstoneRecommendation } from '../types/astrology';
import { NAVARATNA_DATABASE } from '../utils/astrologyEngine';
import { KundaliChartSvg } from './KundaliChartSvg';
import { bellPlayer } from '../utils/audioBell';

interface Props {
  currentReport: AstrologicalReport | null;
  onUpdateReport: (updatedReport: AstrologicalReport) => void;
  onNavigateToDossier: () => void;
}

export const AstrologerAdminPortal: React.FC<Props> = ({
  currentReport,
  onUpdateReport,
  onNavigateToDossier,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('current');
  const [statusSuccessToast, setStatusSuccessToast] = useState<string | null>(null);

  // Form state for editing current report approval
  const [sanctionStatus, setSanctionStatus] = useState<'pending' | 'approved' | 'modified' | 'special_remedy'>(
    currentReport?.astrologerApproval?.status || 'approved'
  );
  const [selectedStoneKey, setSelectedStoneKey] = useState<string>(
    currentReport?.primaryStone?.name?.includes('Ruby')
      ? 'Ruby'
      : currentReport?.primaryStone?.name?.includes('Yellow')
      ? 'YellowSapphire'
      : currentReport?.primaryStone?.name?.includes('Emerald')
      ? 'Emerald'
      : currentReport?.primaryStone?.name?.includes('Blue')
      ? 'BlueSapphire'
      : currentReport?.primaryStone?.name?.includes('Coral')
      ? 'RedCoral'
      : currentReport?.primaryStone?.name?.includes('Pearl')
      ? 'Pearl'
      : currentReport?.primaryStone?.name?.includes('Diamond')
      ? 'Diamond'
      : currentReport?.primaryStone?.name?.includes('Hessonite')
      ? 'Hessonite'
      : 'CatsEye'
  );
  const [prescribedRatti, setPrescribedRatti] = useState<number>(
    currentReport?.astrologerApproval?.prescribedRatti || currentReport?.primaryStone?.recommendedRatti || 5.75
  );
  const [prescribedMetal, setPrescribedMetal] = useState<string>(
    currentReport?.astrologerApproval?.prescribedMetal || currentReport?.primaryStone?.recommendedMetal || '22K Yellow Gold'
  );
  const [prescribedFinger, setPrescribedFinger] = useState<string>(
    currentReport?.astrologerApproval?.prescribedFinger || currentReport?.primaryStone?.recommendedFinger || 'Ring finger (Anamika)'
  );
  const [prescribedHand, setPrescribedHand] = useState<string>(
    currentReport?.astrologerApproval?.prescribedHand || currentReport?.primaryStone?.recommendedHand || 'Right hand (Working hand)'
  );
  const [prescribedAuspiciousTime, setPrescribedAuspiciousTime] = useState<string>(
    currentReport?.astrologerApproval?.prescribedAuspiciousTime || 'Sunday morning during Shukla Paksha (06:00 AM - 07:30 AM)'
  );
  const [prescribedMantraCount, setPrescribedMantraCount] = useState<number>(
    currentReport?.astrologerApproval?.prescribedMantraCount || 108
  );
  const [sanctionNotes, setSanctionNotes] = useState<string>(
    currentReport?.astrologerApproval?.sanctionNotes ||
      `Lagna Lord and 9th House Bhagya Sthana personally audited. No Maraka/Badhaka affliction detected. Natural unheated gemstone certified to radiate auspicious benefic frequencies.`
  );

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '1008' || passcode.toLowerCase() === 'nukala' || passcode === '') {
      setIsAuthenticated(true);
      setAuthError('');
      bellPlayer.playBell(587);
    } else {
      setAuthError('Incorrect Astrologer PIN. Hint: Master PIN is 1008');
    }
  };

  const handleSaveSanction = () => {
    if (!currentReport) return;
    bellPlayer.playBell(528);

    const chosenDb = NAVARATNA_DATABASE[selectedStoneKey] || currentReport.primaryStone;
    const certId =
      currentReport.astrologerApproval?.certificateId ||
      `SKJ-VEDIC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const updatedPrimaryStone: GemstoneRecommendation = {
      ...currentReport.primaryStone,
      ...chosenDb,
      recommendedRatti: prescribedRatti,
      recommendedCarat: Math.round(prescribedRatti * 0.912 * 100) / 100,
      recommendedMetal: prescribedMetal,
      recommendedFinger: prescribedFinger,
      recommendedHand: prescribedHand,
      auspiciousDay: chosenDb.auspiciousDay,
      auspiciousTime: chosenDb.auspiciousTime,
    };

    const updatedReport: AstrologicalReport = {
      ...currentReport,
      primaryStone: updatedPrimaryStone,
      astrologerApproval: {
        status: sanctionStatus,
        sanctionedBy: 'Acharya Nukala Srinivasrao',
        title: 'Chief Astrologer & Master Gemologist, Sri Kamala Jewellers',
        certificateId: certId,
        approvedAt: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        sanctionNotes,
        prescribedStoneName: chosenDb.name,
        prescribedRatti,
        prescribedCarat: Math.round(prescribedRatti * 0.912 * 100) / 100,
        prescribedMetal,
        prescribedFinger,
        prescribedHand,
        prescribedAuspiciousTime,
        prescribedMantraCount,
        marakaBadhakaChecked: true,
        skinContactMandatory: true,
        astrologerBadge: 'Govt. Recognized Jyotish Ratna • 50 Yrs Lineage',
      },
    };

    onUpdateReport(updatedReport);
    setStatusSuccessToast('Sanction Certificate Issued & Synchronized with Customer Dossier!');
    setTimeout(() => setStatusSuccessToast(null), 3500);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-8 rounded-3xl glass-card-gold border-2 border-amber-300 shadow-xl text-center space-y-6 animate-fade-in-up">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-md">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#8B0000]">
            RESTRICTED ACCESS • SRI KAMALA JEWELLERS
          </span>
          <h2 className="font-serif-royal text-2xl font-black text-stone-900">
            Astrologer Control Room
          </h2>
          <p className="text-xs text-stone-600 font-medium">
            Verification portal for Chief Astrologer Nukala Srinivasrao.
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter Astrologer Master PIN (1008)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-white text-center text-sm font-bold tracking-widest text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {authError && <p className="text-xs text-rose-600 mt-1 font-semibold">{authError}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl btn-royal-crimson font-black text-xs uppercase tracking-wider cursor-pointer"
          >
            Authenticate As Astrologer
          </button>
        </form>

        <button
          onClick={() => {
            setPasscode('1008');
            setIsAuthenticated(true);
            bellPlayer.playBell(587);
          }}
          className="text-xs text-amber-900 underline font-bold cursor-pointer hover:text-[#8B0000]"
        >
          Quick Demo Unlock (PIN: 1008)
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16 animate-fade-in-up">
      {/* Toast Notification */}
      {statusSuccessToast && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-emerald-800 text-white shadow-2xl flex items-center gap-3 border border-emerald-400 animate-fade-in-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="text-xs font-bold">{statusSuccessToast}</span>
        </div>
      )}

      {/* Control Room Header */}
      <div className="glass-card-gold rounded-3xl p-6 sm:p-8 border-2 border-amber-400/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 aspect-square rounded-2xl bg-gradient-to-br from-[#F5E29D] via-[#D4AF37] to-[#A37B1E] p-[2px] shadow-md shrink-0">
            <div className="w-full h-full bg-white rounded-[14px] overflow-hidden flex items-center justify-center p-1 border border-amber-200">
              <img
                src="/assets/aistudio/Golden_Lotus_Emblem_with_SKJ_Monogram_31db152a.png"
                alt="SKJ Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#8B0000] text-amber-100 text-[10px] font-black uppercase">
                ADMINISTRATION & SANCTION CHAMBER
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                <ShieldCheck className="w-3 h-3 text-emerald-700" /> Session Active
              </span>
            </div>
            <h1 className="font-serif-royal text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              Acharya Nukala Srinivasrao Control Room
            </h1>
            <p className="text-xs text-stone-600 font-medium">
              Chief Astrologer & Master Gemologist • Sri Kamala Jewellers, Sanjay Gandhi Nagar, Ballari
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onNavigateToDossier}
            className="px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-amber-950 font-bold text-xs hover:bg-amber-50 shadow-2xs transition flex items-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-amber-700" />
            View Customer Dossier
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-2.5 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 font-bold text-xs transition cursor-pointer"
          >
            Lock Session
          </button>
        </div>
      </div>

      {/* Main 2-Column Workstation: Left Kundali Inspection & Right Astrologer Decision Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Client Kundali Inspection (Lagna & Navamsha SVG) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card rounded-3xl p-5 border border-amber-300/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-royal text-lg font-bold text-stone-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-600" />
                Active Kundali Inspection
              </h3>
              <span className="text-xs text-stone-500 font-semibold">
                Ref: {currentReport?.astrologerApproval?.certificateId || 'SKJ-VEDIC-NEW'}
              </span>
            </div>

            {currentReport ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] text-stone-500 block">Devotee Name</span>
                  <span className="font-bold text-stone-900 truncate block">{currentReport.input.name}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] text-stone-500 block">Date & Time</span>
                  <span className="font-bold text-stone-900 truncate block">{currentReport.input.dob} {currentReport.input.tob}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] text-stone-500 block">Ascendant (Lagna)</span>
                  <span className="font-bold text-amber-900 truncate block">{currentReport.lagnaRashi}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] text-stone-500 block">Prime Life Goal</span>
                  <span className="font-bold text-[#8B0000] uppercase truncate block">{currentReport.input.lifeGoal}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-stone-500">No birth chart generated yet. Default chart active.</p>
            )}
          </div>

          {/* Authentic Real Kundali Chart Display */}
          {currentReport && (
            <KundaliChartSvg
              lagnaRashi={currentReport.lagnaRashi}
              lagnaRashiNumber={currentReport.lagnaRashiNumber}
              lagnaDegreeFormatted={currentReport.lagnaDegreeFormatted}
              ayanamsa={currentReport.ayanamsa}
              planetaryPositions={currentReport.planetaryPositions}
            />
          )}
        </div>

        {/* Right Column: Astrologer Decision, Override & Sanction Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card-gold rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-md space-y-6">
            <div className="border-b border-amber-200/80 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-[#8B0000] block">
                  OFFICIAL ACTION REQUIRED
                </span>
                <h3 className="font-serif-royal text-xl font-black text-stone-900">
                  Astrologer Sanction & Prescription Form
                </h3>
              </div>
              <span className="text-xs font-bold text-amber-950 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                50-Yr Vedic Lineage
              </span>
            </div>

            {/* 1. Approval Decision Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-800 block">
                Verification & Approval Status:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                {[
                  { key: 'approved' as const, label: 'Approved & Sanctioned', desc: 'Certify for Atelier Crafting' },
                  { key: 'modified' as const, label: 'Approved with Modification', desc: 'Custom Gem/Weight Adjusted' },
                  { key: 'pending' as const, label: 'Pending Verification', desc: 'Awaiting Further Chart Audit' },
                  { key: 'special_remedy' as const, label: 'Special Pooja Advised', desc: 'Perform Shanti before wearing' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      bellPlayer.playBell(587);
                      setSanctionStatus(item.key);
                    }}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                      sanctionStatus === item.key
                        ? 'bg-[#8B0000] text-amber-100 border-[#680510] shadow-sm ring-1 ring-amber-300'
                        : 'bg-white/80 border-amber-200 text-stone-700 hover:bg-white'
                    }`}
                  >
                    <span className="block font-black">{item.label}</span>
                    <span className="text-[10px] opacity-80 block font-normal">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Primary Lucky Stone Override / Confirmation */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-800 block">
                Sanctioned Primary Lucky Stone (Bhagyashali Ratna):
              </label>
              <select
                value={selectedStoneKey}
                onChange={(e) => {
                  setSelectedStoneKey(e.target.value);
                  const db = NAVARATNA_DATABASE[e.target.value];
                  if (db) {
                    setPrescribedMetal(db.recommendedMetal);
                    setPrescribedFinger(db.recommendedFinger);
                    setPrescribedHand(db.recommendedHand);
                    setPrescribedAuspiciousTime(`${db.auspiciousDay} (${db.auspiciousTime})`);
                  }
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-white font-bold text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
              >
                {Object.entries(NAVARATNA_DATABASE).map(([key, stone]) => (
                  <option key={key} value={key}>
                    {stone.name} — {stone.planetSanskrit} ({stone.hindiName})
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Weight, Metal & Finger Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                  Prescribed Weight (Ratti):
                </label>
                <input
                  type="number"
                  step="0.25"
                  min="2"
                  max="15"
                  value={prescribedRatti}
                  onChange={(e) => setPrescribedRatti(parseFloat(e.target.value) || 5)}
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white font-bold text-stone-900 text-sm"
                />
                <span className="text-[11px] text-stone-500 mt-0.5 block">
                  Approx {Math.round(prescribedRatti * 0.912 * 100) / 100} Carats (1 Ratti per 11.5kg body weight)
                </span>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                  Prescribed Sacred Metal:
                </label>
                <select
                  value={prescribedMetal}
                  onChange={(e) => setPrescribedMetal(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white font-bold text-stone-900 text-sm"
                >
                  <option value="22K Yellow Gold">22K Yellow Gold (BIS 916)</option>
                  <option value="18K Yellow Gold">18K Yellow Gold (BIS 750)</option>
                  <option value="Panchdhatu (5 Sacred Metals)">Panchdhatu (5 Sacred Metals)</option>
                  <option value="Pure Copper">Pure Copper</option>
                  <option value="925 Sterling Silver">925 Sterling Silver</option>
                  <option value="Platinum 950">Platinum 950</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                  Prescribed Wearing Finger:
                </label>
                <input
                  type="text"
                  value={prescribedFinger}
                  onChange={(e) => setPrescribedFinger(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white font-medium text-stone-900 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                  Prescribed Hand:
                </label>
                <input
                  type="text"
                  value={prescribedHand}
                  onChange={(e) => setPrescribedHand(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white font-medium text-stone-900 text-sm"
                />
              </div>
            </div>

            {/* 4. Auspicious Time & Mantra Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                  Auspicious Day & Muhurat:
                </label>
                <input
                  type="text"
                  value={prescribedAuspiciousTime}
                  onChange={(e) => setPrescribedAuspiciousTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white font-medium text-stone-900 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                  Prana Pratishtha Mantra Count:
                </label>
                <select
                  value={prescribedMantraCount}
                  onChange={(e) => setPrescribedMantraCount(parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white font-bold text-stone-900 text-sm"
                >
                  <option value={108}>108 Chants (Standard Purification)</option>
                  <option value={1008}>1008 Chants (High Potency Temple Pratishtha)</option>
                  <option value={11000}>11,000 Chants (Mahavidya Maha Pratishtha)</option>
                </select>
              </div>
            </div>

            {/* 5. Astrologer's Signed Clinical Notes */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                Acharya Nukala Srinivasrao's Clinical Jyotish Notes:
              </label>
              <textarea
                rows={3}
                value={sanctionNotes}
                onChange={(e) => setSanctionNotes(e.target.value)}
                className="w-full p-3 rounded-xl border border-amber-300 bg-white text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Save & Sanction Button */}
            <div className="pt-2">
              <button
                onClick={handleSaveSanction}
                className="w-full py-3.5 px-6 rounded-2xl btn-royal-crimson font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-300" />
                Issue Official Astrologer Sanction & Update Dossier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
