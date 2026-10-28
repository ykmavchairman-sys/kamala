import React, { useState, useEffect } from 'react';
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
  Check,
  Gem,
  PlusCircle,
  Filter,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  Hammer
} from 'lucide-react';
import {
  AstrologicalReport,
  GemstoneRecommendation,
  AstrologerDevoteeEntry,
  SacredStoneSanction,
  AtelierCustomRequest
} from '../types/astrology';
import { NAVARATNA_DATABASE, generateAstrologicalReport } from '../utils/astrologyEngine';
import {
  INITIAL_DEVOTEE_ENTRIES,
  SACRED_STONES_MASTER_SANCTION_LIST,
  INITIAL_ATELIER_REQUESTS
} from '../data/astrologerAdminData';
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
  const [adminActiveTab, setAdminActiveTab] = useState<'entries' | 'stones' | 'requests'>('entries');
  const [statusSuccessToast, setStatusSuccessToast] = useState<string | null>(null);

  // Devotee entries state
  const [devoteeEntries, setDevoteeEntries] = useState<AstrologerDevoteeEntry[]>(INITIAL_DEVOTEE_ENTRIES);
  const [selectedEntryId, setSelectedEntryId] = useState<string>(
    INITIAL_DEVOTEE_ENTRIES[0]?.id || 'entry-arjun-sharma'
  );
  const [entryFilter, setEntryFilter] = useState<'all' | 'pending' | 'approved' | 'modified' | 'special_remedy'>('all');

  // Sacred stones state
  const [sacredStones, setSacredStones] = useState<SacredStoneSanction[]>(SACRED_STONES_MASTER_SANCTION_LIST);
  const [stoneFilter, setStoneFilter] = useState<'all' | 'approved' | 'pending'>('all');

  // Atelier requests state
  const [atelierRequests, setAtelierRequests] = useState<AtelierCustomRequest[]>(INITIAL_ATELIER_REQUESTS);
  const [requestFilter, setRequestFilter] = useState<'all' | 'pending' | 'approved'>('all');

  // Synchronize current report into the entries list if available
  useEffect(() => {
    if (currentReport) {
      setDevoteeEntries((prev) => {
        const exists = prev.some((e) => e.customerName.toLowerCase() === currentReport.input.name.toLowerCase());
        if (exists) {
          return prev.map((e) => {
            if (e.customerName.toLowerCase() === currentReport.input.name.toLowerCase()) {
              return {
                ...e,
                approvalStatus: currentReport.astrologerApproval?.status || e.approvalStatus,
                requestedStone: currentReport.primaryStone?.name || e.requestedStone,
                prescribedRatti: currentReport.astrologerApproval?.prescribedRatti || e.prescribedRatti,
                prescribedMetal: currentReport.astrologerApproval?.prescribedMetal || e.prescribedMetal,
                sanctionNotes: currentReport.astrologerApproval?.sanctionNotes || e.sanctionNotes,
                report: currentReport,
              };
            }
            return e;
          });
        } else {
          const newEntry: AstrologerDevoteeEntry = {
            id: `entry-${Date.now()}`,
            customerName: currentReport.input.name,
            phone: '+91 (Devotee Online)',
            city: currentReport.input.place || 'Ballari, Karnataka',
            dob: currentReport.input.dob,
            tob: currentReport.input.tob,
            lagnaRashi: currentReport.lagnaRashi,
            moonRashi: currentReport.moonRashi,
            lifeGoal: currentReport.input.lifeGoal,
            requestedStone: currentReport.primaryStone.name,
            requestType: 'birth_chart_dossier',
            requestedAt: 'Just Now (Active Session)',
            approvalStatus: currentReport.astrologerApproval?.status || 'approved',
            prescribedRatti: currentReport.astrologerApproval?.prescribedRatti || currentReport.primaryStone.recommendedRatti,
            prescribedMetal: currentReport.astrologerApproval?.prescribedMetal || currentReport.primaryStone.recommendedMetal,
            prescribedFinger: currentReport.astrologerApproval?.prescribedFinger || currentReport.primaryStone.recommendedFinger,
            prescribedMuhurat: currentReport.astrologerApproval?.prescribedAuspiciousTime || currentReport.primaryStone.auspiciousDay,
            sanctionNotes: currentReport.astrologerApproval?.sanctionNotes || 'Personally audited by Acharya Nukala Srinivasrao.',
            marakaAfflictionChecked: true,
            certificateNumber: currentReport.astrologerApproval?.certificateId || `SKJ-VEDIC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            report: currentReport,
          };
          return [newEntry, ...prev];
        }
      });
    }
  }, [currentReport]);

  // Selected entry data
  const activeEntry = devoteeEntries.find((e) => e.id === selectedEntryId) || devoteeEntries[0];

  // Active entry report (or generated on the fly if needed)
  const activeReport: AstrologicalReport = activeEntry?.report || (
    activeEntry
      ? generateAstrologicalReport({
          name: activeEntry.customerName,
          dob: activeEntry.dob,
          tob: activeEntry.tob.includes(':') ? activeEntry.tob.split(' ')[0] : '06:15',
          place: activeEntry.city,
          gender: 'male',
          lifeGoal: activeEntry.lifeGoal,
        })
      : currentReport!
  );

  // Form state for editing approval
  const [sanctionStatus, setSanctionStatus] = useState<'pending' | 'approved' | 'modified' | 'special_remedy'>(
    activeEntry?.approvalStatus || 'approved'
  );
  const [selectedStoneKey, setSelectedStoneKey] = useState<string>('YellowSapphire');
  const [prescribedRatti, setPrescribedRatti] = useState<number>(activeEntry?.prescribedRatti || 5.75);
  const [prescribedMetal, setPrescribedMetal] = useState<string>(activeEntry?.prescribedMetal || '22K Yellow Gold (BIS 916)');
  const [prescribedFinger, setPrescribedFinger] = useState<string>(activeEntry?.prescribedFinger || 'Index finger (Tarjani)');
  const [prescribedHand, setPrescribedHand] = useState<string>('Right hand (Working hand)');
  const [prescribedAuspiciousTime, setPrescribedAuspiciousTime] = useState<string>(activeEntry?.prescribedMuhurat || 'Thursday morning in Shukla Paksha');
  const [prescribedMantraCount, setPrescribedMantraCount] = useState<number>(108);
  const [sanctionNotes, setSanctionNotes] = useState<string>(activeEntry?.sanctionNotes || 'Vedic Parashara audit verified.');

  // Update form fields when active entry changes
  useEffect(() => {
    if (activeEntry) {
      setSanctionStatus(activeEntry.approvalStatus);
      setPrescribedRatti(activeEntry.prescribedRatti || 5.5);
      setPrescribedMetal(activeEntry.prescribedMetal || '22K Yellow Gold (BIS 916)');
      setPrescribedFinger(activeEntry.prescribedFinger || 'Index finger (Tarjani)');
      setPrescribedAuspiciousTime(activeEntry.prescribedMuhurat || 'Auspicious Shukla Paksha Muhurat');
      setSanctionNotes(activeEntry.sanctionNotes || 'Chart cross-audited for Maraka/Badhaka affliction.');

      // Match stone key
      const stoneName = activeEntry.requestedStone.toLowerCase();
      if (stoneName.includes('ruby') || stoneName.includes('manikya')) setSelectedStoneKey('Ruby');
      else if (stoneName.includes('pearl') || stoneName.includes('moti')) setSelectedStoneKey('Pearl');
      else if (stoneName.includes('coral') || stoneName.includes('moonga')) setSelectedStoneKey('RedCoral');
      else if (stoneName.includes('emerald') || stoneName.includes('panna')) setSelectedStoneKey('Emerald');
      else if (stoneName.includes('yellow') || stoneName.includes('pukhraj')) setSelectedStoneKey('YellowSapphire');
      else if (stoneName.includes('blue') || stoneName.includes('neelam')) setSelectedStoneKey('BlueSapphire');
      else if (stoneName.includes('diamond') || stoneName.includes('heera')) setSelectedStoneKey('Diamond');
      else if (stoneName.includes('hessonite') || stoneName.includes('gomed')) setSelectedStoneKey('Hessonite');
      else if (stoneName.includes('cat') || stoneName.includes('vaidurya')) setSelectedStoneKey('CatsEye');
      else setSelectedStoneKey('YellowSapphire');
    }
  }, [selectedEntryId, activeEntry]);

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

  const showToast = (msg: string) => {
    setStatusSuccessToast(msg);
    setTimeout(() => setStatusSuccessToast(null), 4000);
  };

  // Save sanction for active devotee entry
  const handleSaveSanction = () => {
    bellPlayer.playBell(528);
    const chosenDb = NAVARATNA_DATABASE[selectedStoneKey] || NAVARATNA_DATABASE.YellowSapphire;
    const certId = activeEntry?.certificateNumber || `SKJ-VEDIC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const updatedPrimaryStone: GemstoneRecommendation = {
      ...activeReport.primaryStone,
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
      ...activeReport,
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

    // Update devotee entries state
    setDevoteeEntries((prev) =>
      prev.map((e) =>
        e.id === activeEntry.id
          ? {
              ...e,
              approvalStatus: sanctionStatus,
              requestedStone: chosenDb.name,
              prescribedRatti,
              prescribedMetal,
              prescribedFinger,
              prescribedMuhurat: prescribedAuspiciousTime,
              sanctionNotes,
              report: updatedReport,
            }
          : e
      )
    );

    // If active entry is the current main user report, update parent
    if (activeEntry.customerName.toLowerCase() === currentReport?.input.name.toLowerCase()) {
      onUpdateReport(updatedReport);
    }

    showToast(`✓ Official Astrologer Sanction Issued for ${activeEntry.customerName}! Cert #${certId}`);
  };

  // Quick 1-click approval for any entry
  const handleQuickApproveEntry = (entryId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    bellPlayer.playBell(528);
    setDevoteeEntries((prev) =>
      prev.map((item) =>
        item.id === entryId
          ? { ...item, approvalStatus: 'approved', sanctionNotes: '1-Click Sanctioned by Acharya Nukala Srinivasrao.' }
          : item
      )
    );
    showToast('✓ Entry Sanctioned & Approved Instantly!');
  };

  // Approve a stone in the Master Stones list
  const handleApproveStone = (stoneId: string) => {
    bellPlayer.playBell(528);
    setSacredStones((prev) =>
      prev.map((s) =>
        s.id === stoneId
          ? { ...s, status: 'approved_consecrated', mantraChantsApproved: 1008 }
          : s
      )
    );
    showToast('✓ Sacred Stone Batch Approved & Consecrated!');
  };

  // Approve an atelier custom request
  const handleApproveAtelierRequest = (reqId: string) => {
    bellPlayer.playBell(528);
    setAtelierRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? { ...r, status: 'approved_for_atelier', astrologerClearance: true }
          : r
      )
    );
    showToast('✓ Atelier Request Approved for Laser Fabrication!');
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
            Verification & Approval Portal for Chief Astrologer Nukala Srinivasrao.
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

  // Filtered lists
  const filteredDevoteeEntries = devoteeEntries.filter((e) => {
    if (entryFilter === 'all') return true;
    return e.approvalStatus === entryFilter;
  });

  const filteredStones = sacredStones.filter((s) => {
    if (stoneFilter === 'all') return true;
    if (stoneFilter === 'approved') return s.status === 'approved_consecrated';
    if (stoneFilter === 'pending') return s.status !== 'approved_consecrated';
    return true;
  });

  const filteredRequests = atelierRequests.filter((r) => {
    if (requestFilter === 'all') return true;
    if (requestFilter === 'approved') return r.status === 'approved_for_atelier';
    if (requestFilter === 'pending') return r.status === 'pending_approval';
    return true;
  });

  // Summary counts
  const pendingEntriesCount = devoteeEntries.filter((e) => e.approvalStatus === 'pending').length;
  const pendingRequestsCount = atelierRequests.filter((r) => r.status === 'pending_approval').length;
  const consecratedStonesCount = sacredStones.filter((s) => s.status === 'approved_consecrated').length;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16 animate-fade-in-up">
      {/* Toast Notification */}
      {statusSuccessToast && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-emerald-800 text-white shadow-2xl flex items-center gap-3 border border-emerald-400 animate-fade-in-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          <span className="text-xs font-bold">{statusSuccessToast}</span>
        </div>
      )}

      {/* Control Room Header with Heritage Lotus Emblem */}
      <div className="glass-card-gold rounded-3xl p-6 sm:p-8 border-2 border-amber-400/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 aspect-square rounded-2xl bg-gradient-to-br from-[#F5E29D] via-[#D4AF37] to-[#A37B1E] p-[2px] shadow-md shrink-0">
            <div className="w-full h-full bg-white dark:bg-stone-900 rounded-[14px] overflow-hidden flex items-center justify-center p-1 border border-amber-200 dark:border-amber-500/40">
              <img
                src="/assets/aistudio/Golden_Lotus_Emblem_with_SKJ_Monogram_31db152a.png"
                alt="Sri Kamala Jewellery Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#8B0000] text-amber-100 text-[10px] font-black uppercase tracking-wider">
                ASTROLOGER'S DECK • OFFICIAL SANCTION CHAMBER
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">
                <ShieldCheck className="w-3 h-3 text-emerald-700 dark:text-emerald-400" /> Active Master Session
              </span>
            </div>
            <h1 className="font-serif-royal text-2xl sm:text-3xl font-black text-stone-900 dark:text-white mt-1">
              Acharya Nukala Srinivasrao Control Room
            </h1>
            <p className="text-xs text-stone-600 dark:text-stone-300 font-medium">
              Chief Astrologer & Master Gemologist • Sri Kamala Jewellery & Lucky Stone Guru, Ballari
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={onNavigateToDossier}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-amber-300 dark:border-stone-700 text-amber-950 dark:text-amber-200 font-bold text-xs hover:bg-amber-50 dark:hover:bg-stone-800 shadow-2xs transition flex items-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            <span>Customer Dossier</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 font-bold text-xs transition cursor-pointer"
          >
            Lock Session
          </button>
        </div>
      </div>

      {/* 3-Tab Control Bar: Entries & Approval, Sacred Stones Sanction, Atelier Custom Requests */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-100/70 dark:bg-stone-900/90 p-2.5 rounded-2xl border border-amber-300/80 dark:border-stone-700">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold w-full sm:w-auto">
          <button
            onClick={() => {
              bellPlayer.playBell(587);
              setAdminActiveTab('entries');
            }}
            className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer ${
              adminActiveTab === 'entries'
                ? 'bg-[#8B0000] text-amber-100 shadow-md font-black'
                : 'bg-white/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700'
            }`}
          >
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>Devotee Entries & Kundali Approval</span>
            {pendingEntriesCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black">
                {pendingEntriesCount} Pending
              </span>
            )}
          </button>

          <button
            onClick={() => {
              bellPlayer.playBell(587);
              setAdminActiveTab('stones');
            }}
            className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer ${
              adminActiveTab === 'stones'
                ? 'bg-[#8B0000] text-amber-100 shadow-md font-black'
                : 'bg-white/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700'
            }`}
          >
            <Gem className="w-4 h-4 text-amber-400" />
            <span>Lucky Stone Guru Master Sanction ({sacredStones.length})</span>
          </button>

          <button
            onClick={() => {
              bellPlayer.playBell(587);
              setAdminActiveTab('requests');
            }}
            className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer ${
              adminActiveTab === 'requests'
                ? 'bg-[#8B0000] text-amber-100 shadow-md font-black'
                : 'bg-white/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700'
            }`}
          >
            <Hammer className="w-4 h-4 text-amber-400" />
            <span>Atelier & Custom Requests ({atelierRequests.length})</span>
            {pendingRequestsCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black">
                {pendingRequestsCount}
              </span>
            )}
          </button>
        </div>

        <div className="text-xs text-stone-600 dark:text-stone-300 font-semibold px-3 py-1.5 bg-white/80 dark:bg-stone-800 rounded-xl border border-amber-200 dark:border-stone-700">
          Certified Consecrations: <strong className="text-emerald-700 dark:text-emerald-400">{consecratedStonesCount} / {sacredStones.length}</strong>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: DEVOTEE ENTRIES & PARASHARA KUNDALI APPROVAL PIPELINE */}
      {/* ========================================================================= */}
      {adminActiveTab === 'entries' && (
        <div className="space-y-6">
          {/* Devotee Entries Selection Strip & Filters */}
          <div className="glass-card rounded-2xl p-5 border border-amber-300/80 dark:border-stone-700 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-200/70 dark:border-stone-700 pb-3">
              <div>
                <h3 className="font-serif-royal font-bold text-stone-900 dark:text-white text-base flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Devotee Birth Chart Approval Queue ({devoteeEntries.length} Devotees)
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Select any devotee entry to audit their Parashara D1/D9 Kundali and sanction their prescribed Ratna.
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
                {[
                  { key: 'all' as const, label: 'All' },
                  { key: 'pending' as const, label: 'Pending' },
                  { key: 'approved' as const, label: 'Approved' },
                  { key: 'modified' as const, label: 'Modified' },
                  { key: 'special_remedy' as const, label: 'Special Remedy' },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setEntryFilter(f.key)}
                    className={`px-3 py-1.5 rounded-xl transition cursor-pointer text-xs ${
                      entryFilter === f.key
                        ? 'bg-[#8B0000] text-amber-100 font-black shadow-xs'
                        : 'bg-amber-100/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Aligned Devotee Queue Cards (Fixed heights & clean columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
              {filteredDevoteeEntries.map((entry) => {
                const isSelected = entry.id === selectedEntryId;
                return (
                  <div
                    key={entry.id}
                    onClick={() => {
                      bellPlayer.playBell(587);
                      setSelectedEntryId(entry.id);
                    }}
                    className={`p-3.5 rounded-2xl border transition text-left cursor-pointer relative flex flex-col justify-between min-h-[148px] ${
                      isSelected
                        ? 'bg-amber-100/90 dark:bg-amber-950/40 border-[#8B0000] dark:border-amber-400 ring-2 ring-[#8B0000] dark:ring-amber-400 shadow-md'
                        : 'bg-white/90 dark:bg-stone-900 border-amber-200 dark:border-stone-700/80 hover:bg-amber-50 dark:hover:bg-stone-800'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="font-bold text-xs text-stone-900 dark:text-white truncate">
                          {entry.customerName}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase shrink-0 ${
                            entry.approvalStatus === 'approved'
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                              : entry.approvalStatus === 'modified'
                              ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700'
                              : entry.approvalStatus === 'special_remedy'
                              ? 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-700'
                              : 'bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-200 border border-amber-400 dark:border-amber-600 animate-pulse'
                          }`}
                        >
                          {entry.approvalStatus}
                        </span>
                      </div>

                      <div className="text-[11px] text-stone-600 dark:text-stone-300 space-y-1">
                        <p className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                          <span className="truncate">{entry.city}</span>
                        </p>
                        <p className="text-amber-950 dark:text-amber-300 font-bold truncate">
                          {entry.lagnaRashi} Lagna • {entry.requestedStone}
                        </p>
                        <p className="text-[10px] text-stone-500 dark:text-stone-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400 shrink-0" />
                          <span>{entry.requestedAt}</span>
                        </p>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-amber-200/70 dark:border-stone-800 mt-2 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-stone-500 dark:text-stone-400 font-mono">
                        {entry.certificateNumber}
                      </span>
                      {entry.approvalStatus === 'pending' ? (
                        <button
                          onClick={(e) => handleQuickApproveEntry(entry.id, e)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer transition shadow-2xs"
                        >
                          <Check className="w-3 h-3" /> Approve
                        </button>
                      ) : (
                        <span className="text-emerald-700 dark:text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Sanctioned
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main 2-Column Workstation: Left Parashara Kundali Inspection & Right Astrologer Decision Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Authentic Parashara D1 & D9 Kundali Inspection */}
            <div className="lg:col-span-6 space-y-6">
              <div className="glass-card rounded-3xl p-5 border border-amber-300/80 dark:border-stone-700 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-amber-200/70 dark:border-stone-700 pb-2">
                  <h3 className="font-serif-royal text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    Auditing Natal Chart: <strong className="text-gold-gradient">{activeEntry.customerName}</strong>
                  </h3>
                  <span className="text-xs text-amber-950 dark:text-amber-300 font-mono font-bold bg-amber-100 dark:bg-stone-800 px-2.5 py-0.5 rounded-lg border border-amber-300 dark:border-stone-700">
                    Ref: {activeEntry.certificateNumber}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-stone-800/80 border border-amber-200/80 dark:border-stone-700">
                    <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block tracking-wider">Devotee Name</span>
                    <span className="font-bold text-stone-900 dark:text-white truncate block mt-0.5">{activeEntry.customerName}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-stone-800/80 border border-amber-200/80 dark:border-stone-700">
                    <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block tracking-wider">Birth Details</span>
                    <span className="font-bold text-stone-900 dark:text-white truncate block mt-0.5">{activeEntry.dob}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-stone-800/80 border border-amber-200/80 dark:border-stone-700">
                    <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block tracking-wider">Lagna (Ascendant)</span>
                    <span className="font-bold text-amber-900 dark:text-amber-300 truncate block mt-0.5">{activeEntry.lagnaRashi}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-stone-800/80 border border-amber-200/80 dark:border-stone-700">
                    <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block tracking-wider">Prime Goal</span>
                    <span className="font-bold text-[#8B0000] dark:text-amber-400 uppercase truncate block mt-0.5">{activeEntry.lifeGoal}</span>
                  </div>
                </div>
              </div>

              {/* Authentic Parashara D1 & D9 Kundali Component */}
              <div className="rounded-3xl overflow-hidden border border-amber-300/80 dark:border-stone-700 shadow-md">
                <KundaliChartSvg
                  lagnaRashi={activeReport.lagnaRashi}
                  lagnaRashiNumber={activeReport.lagnaRashiNumber}
                  lagnaDegreeFormatted={activeReport.lagnaDegreeFormatted}
                  d9LagnaRashi={activeReport.d9LagnaRashi}
                  d9LagnaRashiNumber={activeReport.d9LagnaRashiNumber}
                  d9LagnaDegreeFormatted={activeReport.d9LagnaDegreeFormatted}
                  ayanamsa={activeReport.ayanamsa}
                  planetaryPositions={activeReport.planetaryPositions}
                />
              </div>
            </div>

            {/* Right Column: Astrologer Sanction & Prescription Form */}
            <div className="lg:col-span-6 space-y-6">
              <div className="glass-card-gold rounded-3xl p-6 sm:p-8 border-2 border-amber-300/90 dark:border-amber-500/40 shadow-lg space-y-5">
                <div className="border-b border-amber-200/80 dark:border-stone-700 pb-3.5 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#8B0000] dark:text-amber-400 block">
                      OFFICIAL JYOTISH RATNA SANCTION
                    </span>
                    <h3 className="font-serif-royal text-xl font-black text-stone-900 dark:text-white mt-0.5">
                      Sanction & Prescription Form
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-amber-950 dark:text-amber-200 bg-amber-100 dark:bg-stone-800 px-3 py-1 rounded-full border border-amber-300 dark:border-stone-700 font-mono">
                    Cert #{activeEntry.certificateNumber}
                  </span>
                </div>

                {/* 1. Approval Decision Selector (2x2 Aligned Grid) */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-800 dark:text-stone-300 block">
                    Verification & Approval Status:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-bold">
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
                        className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between min-h-[64px] ${
                          sanctionStatus === item.key
                            ? 'bg-[#8B0000] text-amber-100 border-[#680510] shadow-sm ring-1 ring-amber-300'
                            : 'bg-white/80 dark:bg-stone-800/80 border-amber-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-black text-xs">{item.label}</span>
                          {sanctionStatus === item.key && (
                            <span className="w-2 h-2 rounded-full bg-amber-300 shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] opacity-80 block font-normal mt-0.5">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Primary Lucky Stone Override / Confirmation */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-800 dark:text-stone-300 block">
                    Sanctioned Sacred Lucky Stone (Bhagyashali Ratna):
                  </label>
                  <div className="relative">
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
                      className="w-full h-11 px-3.5 rounded-xl border border-amber-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-bold text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs cursor-pointer"
                    >
                      {Object.entries(NAVARATNA_DATABASE).map(([key, stone]) => (
                        <option key={key} value={key}>
                          {stone.name} — {stone.planetSanskrit} ({stone.hindiName})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 3. Weight, Metal & Finger Settings (Aligned 2-Col Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 block">
                      Prescribed Weight (Ratti):
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      min="2"
                      max="15"
                      value={prescribedRatti}
                      onChange={(e) => setPrescribedRatti(parseFloat(e.target.value) || 5)}
                      className="w-full h-11 px-3.5 rounded-xl border border-amber-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-bold text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                    />
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">
                      ≈ {Math.round(prescribedRatti * 0.912 * 100) / 100} Carats (1 Ratti per 11.5kg body mass)
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 block">
                      Prescribed Sacred Metal:
                    </label>
                    <select
                      value={prescribedMetal}
                      onChange={(e) => setPrescribedMetal(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-amber-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-bold text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs cursor-pointer"
                    >
                      <option value="22K Yellow Gold (BIS 916)">22K Yellow Gold (BIS 916)</option>
                      <option value="18K Yellow Gold (BIS 750)">18K Yellow Gold (BIS 750)</option>
                      <option value="Panchdhatu (5 Sacred Metals)">Panchdhatu (5 Sacred Metals)</option>
                      <option value="Pure Copper">Pure Copper</option>
                      <option value="925 Sterling Silver">925 Sterling Silver</option>
                      <option value="Platinum 950">Platinum 950</option>
                    </select>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-medium">
                      Direct open-back skin touch mandatory
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 block">
                      Prescribed Wearing Finger:
                    </label>
                    <input
                      type="text"
                      value={prescribedFinger}
                      onChange={(e) => setPrescribedFinger(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-amber-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-medium text-stone-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 block">
                      Prescribed Hand:
                    </label>
                    <input
                      type="text"
                      value={prescribedHand}
                      onChange={(e) => setPrescribedHand(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-amber-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-medium text-stone-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                    />
                  </div>
                </div>

                {/* 4. Auspicious Time & Mantra Count (Aligned 2-Col Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 block">
                      Auspicious Day & Muhurat:
                    </label>
                    <input
                      type="text"
                      value={prescribedAuspiciousTime}
                      onChange={(e) => setPrescribedAuspiciousTime(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-amber-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-medium text-stone-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 block">
                      Prana Pratishtha Mantra Count:
                    </label>
                    <select
                      value={prescribedMantraCount}
                      onChange={(e) => setPrescribedMantraCount(parseInt(e.target.value))}
                      className="w-full h-11 px-3.5 rounded-xl border border-amber-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-bold text-stone-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs cursor-pointer"
                    >
                      <option value={108}>108 Chants (Standard Purification)</option>
                      <option value={1008}>1008 Chants (High Potency Temple Pratishtha)</option>
                      <option value={11000}>11,000 Chants (Mahavidya Maha Pratishtha)</option>
                    </select>
                  </div>
                </div>

                {/* 5. Astrologer's Signed Clinical Notes */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 block">
                    Acharya Nukala Srinivasrao's Clinical Jyotish Notes:
                  </label>
                  <textarea
                    rows={3}
                    value={sanctionNotes}
                    onChange={(e) => setSanctionNotes(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-amber-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
                  />
                </div>

                {/* Save & Sanction Button */}
                <div className="pt-2">
                  <button
                    onClick={handleSaveSanction}
                    className="w-full py-3.5 px-6 rounded-2xl btn-royal-crimson font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:brightness-110 active:scale-99 transition"
                  >
                    <Award className="w-4 h-4 text-amber-300" />
                    <span>Issue Official Astrologer Sanction & Update Dossier</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SACRED NAVARATNA STONES MASTER SANCTION (EVERY STONE APPROVAL) */}
      {/* ========================================================================= */}
      {adminActiveTab === 'stones' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-4 sm:p-6 border border-amber-300/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Gem className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif-royal font-bold text-stone-900 text-lg">
                  Every Sacred Stone Sanction & Consecration Registry
                </h3>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Astrologer audit for all 9 Navaratnas & Vedic Uparatnas. Verify skin-touch open-back compliance, origin certificates, and sanction Prana Pratishtha.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold">
              <button
                onClick={() => setStoneFilter('all')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  stoneFilter === 'all' ? 'bg-[#8B0000] text-amber-100' : 'bg-white border border-amber-300 text-stone-700'
                }`}
              >
                All ({sacredStones.length})
              </button>
              <button
                onClick={() => setStoneFilter('approved')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  stoneFilter === 'approved' ? 'bg-emerald-700 text-white' : 'bg-white border border-amber-300 text-stone-700'
                }`}
              >
                Blessed & Consecrated ({consecratedStonesCount})
              </button>
              <button
                onClick={() => setStoneFilter('pending')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  stoneFilter === 'pending' ? 'bg-amber-500 text-stone-950 font-black' : 'bg-white border border-amber-300 text-stone-700'
                }`}
              >
                Pending Lab/Audit ({sacredStones.length - consecratedStonesCount})
              </button>
            </div>
          </div>

          {/* Grid of Every Sacred Stone */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStones.map((stone) => (
              <div
                key={stone.id}
                className="glass-card-gold rounded-3xl p-5 border border-amber-300 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md shrink-0 border border-amber-300"
                        style={{ backgroundColor: stone.color }}
                      >
                        <Gem className="w-5 h-5 text-white drop-shadow-sm" />
                      </div>
                      <div>
                        <h4 className="font-serif-royal font-bold text-stone-950 text-sm">
                          {stone.name}
                        </h4>
                        <span className="text-[11px] text-amber-900 font-bold block">
                          {stone.planetSanskrit} • {stone.hindiName}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase shrink-0 ${
                        stone.status === 'approved_consecrated'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : stone.status === 'lab_verification_passed'
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-400'
                      }`}
                    >
                      {stone.status === 'approved_consecrated' ? 'Blessed & Consecrated' : 'Lab Passed'}
                    </span>
                  </div>

                  {/* Certifications and Origins */}
                  <div className="space-y-1.5 text-xs text-stone-700 bg-white/70 p-3 rounded-2xl border border-amber-200">
                    <p className="text-[11px]">
                      <strong className="text-stone-900">Certified Origin:</strong> {stone.certifiedOrigin}
                    </p>
                    <p className="text-[11px]">
                      <strong className="text-stone-900">Vedic Formula:</strong> {stone.recommendedWeightFormula}
                    </p>
                    <p className="text-[11px]">
                      <strong className="text-stone-900">Recommended Metal:</strong> {stone.recommendedMetal}
                    </p>
                    <p className="text-[11px]">
                      <strong className="text-stone-900">Sacred Muhurat:</strong> {stone.sacredDayMuhurat}
                    </p>
                  </div>

                  {/* Verification Badges */}
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" /> Skin-Touch Open Back
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" /> BIS Hallmark HUID
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
                      {stone.mantraChantsApproved} Mantra Chants
                    </span>
                  </div>
                </div>

                {/* Stock & Astrologer Approval Action */}
                <div className="pt-3 border-t border-amber-200/80 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-stone-500 block">Current Stock</span>
                    <span className="text-xs font-black text-stone-900">{stone.stockCaratsAvailable} Carats</span>
                    <span className="text-[10px] text-amber-900 block font-semibold">₹{stone.currentMarketRateINR.toLocaleString('en-IN')}/ct</span>
                  </div>

                  <button
                    onClick={() => handleApproveStone(stone.id)}
                    className="px-4 py-2 rounded-xl btn-royal-crimson text-amber-100 font-bold text-xs uppercase tracking-wider shadow-xs hover:brightness-110 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                    Approve Batch
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: EVERY ATELIER CUSTOMIZATION & CONSULTATION REQUEST */}
      {/* ========================================================================= */}
      {adminActiveTab === 'requests' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-4 sm:p-6 border border-amber-300/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Hammer className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif-royal font-bold text-stone-900 text-lg">
                  Every Devotee Jewelry Atelier & Consecration Request
                </h3>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Astrologer approval required before master goldsmiths melt gold and set gems. Ensures open-back skin touch and sacred orientation.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold">
              <button
                onClick={() => setRequestFilter('all')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  requestFilter === 'all' ? 'bg-[#8B0000] text-amber-100' : 'bg-white border border-amber-300 text-stone-700'
                }`}
              >
                All Requests ({atelierRequests.length})
              </button>
              <button
                onClick={() => setRequestFilter('pending')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  requestFilter === 'pending' ? 'bg-rose-700 text-white' : 'bg-white border border-amber-300 text-stone-700'
                }`}
              >
                Pending Clearance ({pendingRequestsCount})
              </button>
              <button
                onClick={() => setRequestFilter('approved')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  requestFilter === 'approved' ? 'bg-emerald-700 text-white' : 'bg-white border border-amber-300 text-stone-700'
                }`}
              >
                Approved for Atelier ({atelierRequests.length - pendingRequestsCount})
              </button>
            </div>
          </div>

          {/* Requests Grid */}
          <div className="space-y-4">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className="glass-card-gold rounded-3xl p-5 sm:p-6 border border-amber-300/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-serif-royal font-bold text-base text-stone-950">
                      {req.customerName}
                    </span>
                    <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" /> {req.city}
                    </span>
                    <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-stone-400" /> {req.phone}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        req.status === 'approved_for_atelier'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : req.status === 'consecration_scheduled'
                          ? 'bg-purple-100 text-purple-800 border border-purple-300'
                          : 'bg-amber-200 text-amber-950 border border-amber-400'
                      }`}
                    >
                      {req.status === 'approved_for_atelier' ? 'Approved for Atelier' : req.status === 'consecration_scheduled' ? 'Consecration Scheduled' : 'Pending Astrologer Clearance'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-white/70 p-3 rounded-2xl border border-amber-200">
                    <div>
                      <span className="text-[10px] text-stone-500 block">Jewel Item</span>
                      <strong className="text-stone-900">{req.jewelType} {req.ringSize ? `(${req.ringSize})` : ''}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 block">Sanctioned Gem</span>
                      <strong className="text-amber-950">{req.selectedGemstone} ({req.carats} ct)</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 block">Sacred Metal</span>
                      <strong className="text-stone-900">{req.metal} • {req.purity}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 block">Requested Date</span>
                      <strong className="text-stone-700">{req.requestedDate}</strong>
                    </div>
                  </div>

                  {req.specialInstructions && (
                    <p className="text-xs text-stone-600 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200">
                      <strong className="text-stone-900">Devotee Specification:</strong> {req.specialInstructions}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 w-full md:w-auto">
                  {req.astrologerClearance ? (
                    <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Atelier Clearance Issued</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleApproveAtelierRequest(req.id)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl btn-royal-crimson text-amber-100 font-black text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Award className="w-4 h-4 text-amber-300" />
                      <span>Approve Request</span>
                    </button>
                  )}

                  <a
                    href={`https://wa.me/919876543210?text=Sri%20Kamala%20Jewellers%20Astrologer%20Desk%3A%20Regarding%20Order%20for%20${encodeURIComponent(req.customerName)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-white border border-amber-300 text-stone-700 hover:text-stone-900 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Devotee</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
