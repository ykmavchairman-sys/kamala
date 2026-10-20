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
import { RecommendationDossier } from './components/RecommendationDossier';
import { JewelryCustomizer } from './components/JewelryCustomizer';
import { PranaPratishthaGuide } from './components/PranaPratishthaGuide';
import { JewelryCatalog } from './components/JewelryCatalog';
import { GoldJewelryPage } from './components/GoldJewelryPage';
import { AskGuruChat } from './components/AskGuruChat';
import { ConsultationModal } from './components/ConsultationModal';
import { bellPlayer } from './utils/audioBell';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [report, setReport] = useState<AstrologicalReport | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [customizingStone, setCustomizingStone] = useState<GemstoneRecommendation | undefined>(undefined);

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
    <div className="min-h-screen bg-[#F7F2EB] text-[#221C16] flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900 relative">
      {/* Ambient background gold lighting layers */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[32rem] h-[32rem] bg-amber-100/25 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Top Navbar with Official SKJ Logo (1:1 Small Size) */}
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

        {activeTab === 'calculator' && (
          <div className="space-y-8">
            <BirthChartForm
              onGenerateReport={handleGenerateReport}
              isLoading={isLoadingReport}
            />
          </div>
        )}

        {activeTab === 'dossier' && report && (
          <RecommendationDossier
            report={report}
            onCustomizeJewel={handleCustomizeJewel}
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenRitual={() => setActiveTab('ritual')}
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
      </main>

      {/* Heritage Footer in Pastel Beige & Gold Luxury Glassmorphism */}
      <footer className="bg-[#F7F2EB]/95 backdrop-blur-xl border-t border-amber-300/60 pt-12 pb-20 sm:pb-8 mt-16 print:hidden shadow-[0_-4px_30px_rgba(212,175,55,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand Lore with 1:1 Small SKJ Lotus Logo */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 aspect-square rounded-xl bg-gradient-to-br from-[#F5E29D] via-[#D4AF37] to-[#A37B1E] p-[1.5px] shadow-sm shrink-0">
                  <div className="w-full h-full aspect-square bg-white rounded-[10px] overflow-hidden flex items-center justify-center p-1 border border-amber-200">
                    <img
                      src="/assets/aistudio/Golden_Lotus_Emblem_with_SKJ_Monogram_31db152a.png"
                      alt="Sri Kamala Jewellers Logo"
                      className="w-full h-full aspect-square object-contain"
                    />
                  </div>
                </div>
                <span className="font-serif-royal font-extrabold text-stone-900 text-lg">
                  SRI KAMALA JEWELLERS
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Estd. 1974 in Ballari, Karnataka. Sri Kamala Jewellers is India’s foremost atelier for BIS 916 pure gold bridal jewellery, natural unheated Jyotish gemstones, and Vedic skin-touch settings.
              </p>
              <div className="flex items-center gap-2 text-xs text-amber-900 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>4.98 / 5 Rating (12,400+ Families & Devotees)</span>
              </div>
            </div>

            {/* Col 2: Flagship Ballari Showroom */}
            <div className="space-y-3 text-xs text-stone-600 font-medium">
              <h4 className="font-serif-royal font-bold text-amber-950 text-sm">
                Ballari Flagship Showroom
              </h4>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8B0000] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-900 block">Sanjay Gandhi Nagar Atelier:</strong>
                  Door No. 14/B, Near Sanjay Gandhi Nagar Main Arch, Sanjay Gandhi Nagar, Ballari, Karnataka 583104
                </span>
              </p>
              <p className="text-[11px] text-stone-500">
                Landline: <strong className="text-stone-800">(08392) 271974</strong> • Open: 10:00 AM – 8:30 PM (Mon–Sun)
              </p>
              <button
                onClick={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-amber-800 font-bold underline hover:text-[#8B0000] transition cursor-pointer"
              >
                View Driving Directions & Amenities →
              </button>
            </div>

            {/* Col 3: Hallmark Commitments */}
            <div className="space-y-3 text-xs text-stone-600 font-medium">
              <h4 className="font-serif-royal font-bold text-amber-950 text-sm">
                Our Hallmark Commitments
              </h4>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Unheated, Untreated Natural Gems
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> BIS 916 Hallmark with Laser HUID
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Open-Back Bezel for Skin Touch
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Free 1008-Mantra Prana Pratishtha
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Zero Cadmium Soldering Guarantee
                </li>
              </ul>
            </div>

            {/* Col 4: Astrologer Helpline */}
            <div className="space-y-3 text-xs text-stone-600 font-medium">
              <h4 className="font-serif-royal font-bold text-amber-950 text-sm">
                Astrologer Helpline
              </h4>
              <p>Consultation chamber with Chief Astrologer Nukala Srinivasrao:</p>
              <p className="text-amber-900 font-extrabold text-sm">
                Toll Free: 1800-209-1974
              </p>
              <p className="text-emerald-700 font-bold">
                WhatsApp Desk: +91 98765 43210
              </p>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#680510] text-white font-bold hover:brightness-110 transition text-center shadow-xs cursor-pointer text-xs"
              >
                Book 1-on-1 Astrologer Call
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-amber-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-medium">
            <p>
              © 1974 – 2026 Sri Kamala Jewellers, Sanjay Gandhi Nagar, Ballari. All Sacred Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
              <span>Govt. BIS Hallmark 916 Registered</span>
              <span>•</span>
              <span>ISO 9001:2015 Gemological Testing</span>
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
