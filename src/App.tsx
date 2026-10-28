import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Award,
  MapPin,
  Star,
  Coins,
  TrendingUp,
  PhoneCall
} from 'lucide-react';
import { BirthChartInput, AstrologicalReport, GemstoneRecommendation } from './types/astrology';
import { generateAstrologicalReport } from './utils/astrologyEngine';
import { Navbar, AppTab } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { LiveRatesPage } from './components/LiveRatesPage';
import { ContactLocationPage } from './components/ContactLocationPage';
import { BirthChartForm } from './components/BirthChartForm';
import { BirthChartPage } from './components/BirthChartPage';
import { RecommendationDossier } from './components/RecommendationDossier';
import { JewelryCustomizer } from './components/JewelryCustomizer';
import { PranaPratishthaGuide } from './components/PranaPratishthaGuide';
import { JewelryCatalog } from './components/JewelryCatalog';
import { GoldJewelryPage } from './components/GoldJewelryPage';
import { AskGuruChat } from './components/AskGuruChat';
import { ConsultationModal } from './components/ConsultationModal';
import { AstrologerAdminPortal } from './components/AstrologerAdminPortal';
import { MonthlyGoldSchemesPage } from './components/MonthlyGoldSchemesPage';
import { bellPlayer } from './utils/audioBell';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { LanguageSelector } from './components/LanguageSelector';
import { FormatProvider, useAppFormat } from './context/FormatContext';

function MainAppContent() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [report, setReport] = useState<AstrologicalReport | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [customizingStone, setCustomizingStone] = useState<GemstoneRecommendation | undefined>(undefined);
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { format, isJewellers, isGuru, setFormat } = useAppFormat();

  // Initial default report for instant user delight
  useEffect(() => {
    const defaultInput: BirthChartInput = {
      name: 'Arjun Sharma',
      dob: '1992-06-21',
      tob: '06:15',
      place: 'Ballari, Karnataka',
      gender: 'male',
      lifeGoal: 'wealth',
      weightKg: 68,
      zodiacSign: 'Cancer',
    };
    const initialReport = generateAstrologicalReport(defaultInput);
    setReport(initialReport);
    setCustomizingStone(initialReport.primaryStone);
  }, []);

  // Synchronize format with activeTab
  useEffect(() => {
    const guruTabs: AppTab[] = ['calculator', 'dossier', 'customizer', 'ritual', 'chat', 'admin'];
    const jewellerTabs: AppTab[] = ['home', 'rates', 'gold', 'schemes', 'contact', 'catalog'];
    if (guruTabs.includes(activeTab) && format !== 'guru') {
      setFormat('guru');
    } else if (jewellerTabs.includes(activeTab) && format !== 'jewellers') {
      setFormat('jewellers');
    }
  }, [activeTab, format, setFormat]);

  // Handle report generation with server-side Gemini AI enrichment
  const handleGenerateReport = async (input: BirthChartInput) => {
    setIsLoadingReport(true);
    try {
      const baseReport = generateAstrologicalReport(input);

      // Fetch personalized Gemini 3.8 Flash reading from server API
      try {
        const response = await fetch('/api/consultation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: input.name,
            dob: input.dob,
            tob: input.tob,
            place: input.place,
            lifeGoal: input.lifeGoal,
            lagnaRashi: baseReport.lagnaRashi,
            moonRashi: baseReport.moonRashi,
            sunRashi: baseReport.sunRashi,
            nakshatra: baseReport.nakshatra,
            primaryStone: baseReport.primaryStone,
            secondaryStone: baseReport.secondaryStone,
          }),
        });

        if (response.ok) {
          const rawText = await response.text();
          if (rawText && !rawText.trim().startsWith('<')) {
            try {
              const data = JSON.parse(rawText);
              if (data.reading) {
                baseReport.aiGuruReading = data.reading;
              }
            } catch {
              // ignore parse error and use base reading
            }
          }
        }
      } catch {
        // Fallback gracefully without console error
      }

      setReport(baseReport);
      setCustomizingStone(baseReport.primaryStone);
      setActiveTab('dossier');
      bellPlayer.playBell(528);
    } catch (err) {
      console.error('Report generation error', err);
    } finally {
      setIsLoadingReport(false);
    }
  };

  const handleCustomizeJewel = (stone: GemstoneRecommendation) => {
    setCustomizingStone(stone);
    setActiveTab('customizer');
    bellPlayer.playBell(587);
  };

  const handleCatalogCustomize = (_jewelId: string, _gemKey?: string) => {
    setActiveTab('customizer');
    bellPlayer.playBell(587);
  };

  return (
    <div
      data-brand={format}
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 relative ${
        isGuru
          ? 'bg-[#FAF8F5] dark:bg-[#16120E] text-[#261D15] dark:text-[#FAF8F5] selection:bg-[#B38048]/25 selection:text-[#B38048]'
          : 'bg-[#FAF9F6] dark:bg-[#140C12] text-[#21181E] dark:text-[#FAF9F6] selection:bg-[#6B1D52]/25 selection:text-[#6B1D52]'
      }`}
    >
      {/* Ambient background glassmorphism lighting layers */}
      {isGuru ? (
        <>
          <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none -z-10 bg-[#B38048]/12 dark:bg-[#B38048]/14" />
          <div className="fixed bottom-0 right-1/4 w-[32rem] h-[32rem] rounded-full blur-[160px] pointer-events-none -z-10 bg-[#C59359]/10 dark:bg-[#B38048]/12" />
        </>
      ) : (
        <>
          <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none -z-10 bg-[#6B1D52]/10 dark:bg-[#6B1D52]/12" />
          <div className="fixed bottom-0 right-1/4 w-[32rem] h-[32rem] rounded-full blur-[160px] pointer-events-none -z-10 bg-[#52153E]/8 dark:bg-[#6B1D52]/10" />
        </>
      )}

      {/* Top Navbar with Official SKJ Logo & Dark Mode Toggle */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasReport={!!report}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Dynamic View Panels */}
        {activeTab === 'home' && (
          <HomePage
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {activeTab === 'rates' && (
          <LiveRatesPage
            onOpenBooking={() => setIsBookingOpen(true)}
            onNavigateToJewelry={() => {
              setActiveTab('gold');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'gold' && (
          <GoldJewelryPage
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {activeTab === 'schemes' && (
          <MonthlyGoldSchemesPage
            onOpenBooking={() => setIsBookingOpen(true)}
            onNavigateToGold={() => {
              setActiveTab('gold');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'calculator' && (
          report ? (
            <BirthChartPage
              report={report}
              onGenerateReport={handleGenerateReport}
              isLoadingReport={isLoadingReport}
              onNavigateToLuckyStones={() => {
                setActiveTab('dossier');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenBooking={() => setIsBookingOpen(true)}
            />
          ) : (
            <div className="space-y-8">
              <BirthChartForm
                onGenerateReport={handleGenerateReport}
                isLoading={isLoadingReport}
              />
            </div>
          )
        )}

        {activeTab === 'dossier' && report && (
          <RecommendationDossier
            report={report}
            onCustomizeJewel={handleCustomizeJewel}
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenRitual={() => setActiveTab('ritual')}
            onNavigateToBirthChart={() => {
              setActiveTab('calculator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'customizer' && (
          <JewelryCustomizer
            recommendedStone={customizingStone}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {activeTab === 'ritual' && (
          <PranaPratishthaGuide activeGemstone={customizingStone} />
        )}

        {activeTab === 'catalog' && (
          <JewelryCatalog
            onCustomizeItem={handleCatalogCustomize}
            onSelectGemstone={handleCustomizeJewel}
          />
        )}

        {activeTab === 'chat' && (
          <AskGuruChat
            report={report}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {activeTab === 'contact' && (
          <ContactLocationPage
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {activeTab === 'admin' && (
          <AstrologerAdminPortal
            currentReport={report}
            onUpdateReport={(updated) => setReport(updated)}
            onNavigateToDossier={() => setActiveTab('dossier')}
          />
        )}
      </main>

      {/* Classic Editorial Footer */}
      <footer
        className={`border-t transition-colors duration-300 py-14 px-4 sm:px-6 lg:px-8 ${
          isGuru
            ? 'border-[#B38048]/25 bg-gradient-to-b from-[#FAF8F5] to-[#F3EEE6] dark:from-[#16120E] dark:to-[#120D0A]'
            : 'border-[#6B1D52]/20 bg-gradient-to-b from-[#FAF9F6] to-[#F4EFF3] dark:from-[#140C12] dark:to-[#0F080E]'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1: Heritage & Leadership */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 aspect-square rounded-xl p-0.5 shadow-sm border flex items-center justify-center bg-white ${
                    isGuru ? 'border-[#B38048]/30' : 'border-[#6B1D52]/30'
                  }`}
                >
                  <img
                    src="/assets/aistudio/Golden_Lotus_Emblem_with_SKJ_Monogram_31db152a.png"
                    alt="Logo"
                    className="w-full h-full aspect-square object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-serif-royal font-black text-sm tracking-wide text-[#21181E] dark:text-[#FAF9F6]">
                    {isJewellers ? 'SRI KAMALA JEWELLERS' : 'LUCKY STONE GURU'}
                  </h3>
                  <p
                    className={`text-[11px] font-bold ${
                      isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'
                    }`}
                  >
                    {isJewellers
                      ? 'Nukala Srinivas Rao & Nukala Manoj'
                      : 'Nukala Srinivas Rao'}
                  </p>
                </div>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-medium">
                {isJewellers
                  ? 'Serving Ballari and South India since 1974 with 100% BIS 916 Hallmarked bridal gold, live transparent rates, and zero-loss monthly accumulation schemes.'
                  : 'Sacred Vedic astro-gemology sanctuary guided by Acharya Nukala Srinivas Rao. 100% unheated natural gemstones with skin-touch mounting.'}
              </p>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300">
                <ShieldCheck
                  className={`w-4 h-4 ${isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'}`}
                />
                <span>50 Years of Trusted Lineage • Estd. 1974</span>
              </div>
            </div>

            {/* Col 2: Flagship Showroom Address */}
            <div className="space-y-3 text-xs text-stone-600 dark:text-stone-400 font-medium">
              <h4 className="font-serif-royal font-bold text-[#21181E] dark:text-[#FAF9F6] text-sm">
                Flagship Showroom
              </h4>
              <p className="flex items-start gap-1.5">
                <MapPin
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'
                  }`}
                />
                <span>
                  Beside Raghavendra Swamy Mutt, Main Road, Sanjay Gandhi Nagar, Ballari, Karnataka — 583104
                </span>
              </p>
              <p>Store Hours: Mon – Sun, 10:00 AM – 09:00 PM</p>
              <button
                onClick={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`font-bold underline hover:opacity-80 transition cursor-pointer ${
                  isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'
                }`}
              >
                View Driving Directions & Amenities →
              </button>
            </div>

            {/* Col 3: Hallmark Commitments */}
            <div className="space-y-3 text-xs text-stone-600 dark:text-stone-400 font-medium">
              <h4 className="font-serif-royal font-bold text-[#21181E] dark:text-[#FAF9F6] text-sm">
                Our Hallmark Commitments
              </h4>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'}`}
                  />{' '}
                  100% Unheated, Untreated Natural Gems
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'}`}
                  />{' '}
                  BIS 916 Hallmark with Laser HUID
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'}`}
                  />{' '}
                  Open-Back Bezel for Skin Touch
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'}`}
                  />{' '}
                  Free 1008-Mantra Prana Pratishtha
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'}`}
                  />{' '}
                  Zero Cadmium Soldering Guarantee
                </li>
              </ul>
            </div>

            {/* Col 4: Astrologer Helpline */}
            <div className="space-y-3 text-xs text-stone-600 dark:text-stone-400 font-medium">
              <h4 className="font-serif-royal font-bold text-[#21181E] dark:text-[#FAF9F6] text-sm">
                Astrologer Helpline
              </h4>
              <p>Consultation chamber with Chief Astrologer Nukala Srinivas Rao:</p>
              <p
                className={`font-extrabold text-sm ${
                  isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'
                }`}
              >
                Toll Free: 1800-209-1974
              </p>
              <p className="text-stone-700 dark:text-stone-300 font-bold">
                WhatsApp Desk: +91 98765 43210
              </p>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl btn-magenta font-bold hover:brightness-105 transition text-center shadow-xs cursor-pointer text-xs"
              >
                Book 1-on-1 Astrologer Call
              </button>
            </div>
          </div>

          <div
            className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400 font-medium ${
              isGuru ? 'border-[#B38048]/25' : 'border-[#6B1D52]/20'
            }`}
          >
            <p>
              © 1974 – 2026 {t('brand_name', 'Sri Kamala Jewellers')}, {t('flagship_store', 'Sanjay Gandhi Nagar, Ballari')}.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span
                className={`text-[11px] font-bold ${
                  isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'
                }`}
              >
                {t('select_language', 'Select Language')}:
              </span>
              <LanguageSelector variant="segmented" />
            </div>
            <div className="flex items-center gap-4">
              <span>{t('certified_quality', 'BIS 916 Hallmark')}</span>
              <span>•</span>
              <span>ISO 9001:2015</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Free Astrologer Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        devoteeName={report?.input.name}
        recommendedStoneName={report?.primaryStone.name}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <FormatProvider>
          <MainAppContent />
        </FormatProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
