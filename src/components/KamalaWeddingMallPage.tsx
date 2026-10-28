import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Award,
  Crown,
  CheckCircle2,
  PhoneCall,
  Calendar,
  Eye,
  Heart,
  Share2,
  Filter,
  Layers,
  MapPin,
  Clock,
  Shirt,
  Sparkle,
  ArrowRight,
  ShieldCheck,
  Coins,
  Check,
  Star,
  Compass
} from 'lucide-react';
import {
  WeddingMallItem,
  WEDDING_MALL_CATEGORIES,
  WEDDING_MALL_ITEMS,
  WEDDING_MALL_HIGHLIGHTS
} from '../data/weddingMallData';
import { SareeAndAttireGraphic } from './SareeAndAttireGraphic';
import { bellPlayer } from '../utils/audioBell';

interface Props {
  onOpenBooking: () => void;
  onNavigateToGold?: () => void;
  onNavigateToAstrology?: () => void;
}

export const KamalaWeddingMallPage: React.FC<Props> = ({
  onOpenBooking,
  onNavigateToGold,
  onNavigateToAstrology,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<WeddingMallItem | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isTrousseauPlannerOpen, setIsTrousseauPlannerOpen] = useState(false);
  const [plannerDays, setPlannerDays] = useState<number>(3);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    'muhurtham',
    'reception',
    'sangeet',
    'engagement',
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    bellPlayer.playBell(587);
    setWishlist((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Item removed from Wedding Wishlist');
        return prev.filter((item) => item !== id);
      } else {
        showToast('✓ Added to Sri Kamala Wedding mall Trousseau Wishlist!');
        return [...prev, id];
      }
    });
  };

  // Filter items
  const filteredItems = WEDDING_MALL_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesOccasion =
      selectedOccasion === 'all' || item.occasion === selectedOccasion;
    return matchesCategory && matchesOccasion;
  });

  const handleWhatsAppInquiry = (item: WeddingMallItem) => {
    bellPlayer.playBell(528);
    const msg = `Namaste Sri Kamala Wedding mall, Ballari! I am interested in viewing/booking the "${item.title}" (${item.priceINR.toLocaleString('en-IN')}). Please arrange a video shopping slot or boutique trial.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleBookBoutiqueTrial = (item?: WeddingMallItem) => {
    bellPlayer.playBell(528);
    onOpenBooking();
  };

  // Trousseau budget estimate
  const trousseauEstimatedTotal = selectedEvents.reduce((acc, ev) => {
    if (ev === 'muhurtham') return acc + 88500 + 32500; // Bride Kanjeevaram + Groom Dhoti set
    if (ev === 'reception') return acc + 125000 + 84000; // Banarasi / Lehenga + Sherwani
    if (ev === 'sangeet') return acc + 98000; // Sangeet Lehenga
    if (ev === 'engagement') return acc + 64500; // Engagement Korvai
    return acc + 40000;
  }, 19500); // Base sacred shalu & accessories

  return (
    <div className="space-y-12 pb-20 animate-fade-in-up">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-[#8B0000] text-amber-100 shadow-2xl flex items-center gap-3 border border-amber-300 animate-fade-in-up">
          <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 1. GRAND HERO BANNER: SRI KAMALA WEDDING MALL */}
      {/* ------------------------------------------------------------- */}
      <section className="relative rounded-3xl overflow-hidden glass-card-gold p-8 sm:p-12 border-2 border-amber-400/90 shadow-xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E6] to-[#F5EAD4]">
        {/* Subtle decorative gold silk background patterns */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#8B0000] text-amber-100 text-xs font-black uppercase tracking-widest shadow-2xs">
              BALLARI FLAGSHIP DESTINATION
            </span>
            <span className="text-xs text-amber-950 font-bold bg-amber-200/80 px-3 py-1 rounded-full border border-amber-300/80">
              Est. 1974 • Sri Kamala Jewellery Group
            </span>
            <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              100% Silk Mark India Certified
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif-royal text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              Sri Kamala Wedding mall
            </h1>
            <p className="font-serif-royal text-lg sm:text-2xl text-[#8B0000] font-bold">
              South India's Sovereign Palace for Pure Handloom Silks, Bridal Lehengas & Muhurtham Trousseau
            </p>
          </div>

          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium">
            Spanning 4 grand floors in Sanjay Gandhi Nagar, Ballari (adjacent to Sri Kamala Jewellery Atelier). Experience over 2,500 pure silk sarees hand-loomed in Kanchipuram, Varanasi, Mysore, and Yeola with certified 2G/3G gold and silver zari. From sacred Muhurtham Pattu Panche sets to bespoke zardozi bridal lehengas, discover your complete royal wedding ensemble under one sacred roof.
          </p>

          {/* Clean metadata strip (Zero-pill discipline) */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-600 pt-2 border-t border-amber-300/60 font-semibold">
            <span>2,500+ Handloom Silks in Stock</span>
            <span aria-hidden="true" className="text-amber-400 font-bold">·</span>
            <span>Tested Pure Gold & Silver Zari</span>
            <span aria-hidden="true" className="text-amber-400 font-bold">·</span>
            <span>Private VIP Bridal Dressing Chambers</span>
            <span aria-hidden="true" className="text-amber-400 font-bold">·</span>
            <span>Doorstep Video Shopping Worldwide</span>
            <span aria-hidden="true" className="text-amber-400 font-bold">·</span>
            <span>24-Hour Express Bridal Blouse Atelier</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => handleBookBoutiqueTrial()}
              className="px-6 py-3.5 rounded-2xl btn-royal-crimson font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer hover:brightness-110 active:scale-98 transition"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              Book Private Bridal Trial Room
            </button>

            <a
              href="https://wa.me/919876543210?text=Namaste%20Sri%20Kamala%20Wedding%20mall!%20I%20would%20like%20to%20request%20a%20Live%20Video%20Shopping%20Session%20for%20bridal%20sarees%20and%20groomswear."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3.5 rounded-2xl bg-white border border-amber-300 text-stone-800 font-bold text-xs hover:bg-amber-50 shadow-2xs flex items-center gap-2 cursor-pointer transition"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              WhatsApp Live Video Shopping
            </a>

            <button
              onClick={() => {
                bellPlayer.playBell(587);
                setIsTrousseauPlannerOpen(true);
              }}
              className="px-5 py-3.5 rounded-2xl bg-amber-100/90 border border-amber-300 text-amber-950 font-black text-xs hover:bg-amber-200 shadow-2xs flex items-center gap-2 cursor-pointer transition"
            >
              <Crown className="w-4 h-4 text-amber-700" />
              Trousseau Wardrobe Planner
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. FOUR-STORY MALL EXPERIENCE NAVIGATOR */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-serif-royal text-xl sm:text-2xl font-black text-stone-900">
              The 4-Floor Luxury Sri Kamala Wedding mall Experience
            </h2>
            <p className="text-xs text-stone-600 font-medium">
              Every floor dedicated to a sacred facet of the grand Indian wedding celebration.
            </p>
          </div>
          <span className="text-xs text-amber-900 font-bold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Sanjay Gandhi Nagar, Ballari
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {WEDDING_MALL_HIGHLIGHTS.map((item, idx) => (
            <div
              key={item.floor}
              className="glass-card rounded-2xl p-5 border border-amber-300/80 shadow-xs space-y-3 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#8B0000] text-amber-100 text-[10px] font-black uppercase">
                    {item.floor}
                  </span>
                  <span className="text-xs text-stone-400 font-serif-royal font-bold">0{idx + 1}</span>
                </div>
                <h3 className="font-serif-royal font-bold text-stone-950 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-amber-200/60 text-[11px] font-bold text-amber-900 flex items-center gap-1">
                <span>Explore Floor Inventory</span>
                <ArrowRight className="w-3 h-3 text-[#8B0000]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. INTERACTIVE CATEGORY & OCCASION FILTER CONTROLS */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-amber-300/80 shadow-xs space-y-4">
          {/* Category Tabs */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-wider font-black text-stone-700 block">
              Curated Wardrobe Categories:
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              {WEDDING_MALL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    bellPlayer.playBell(587);
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3.5 py-2 rounded-xl transition cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#8B0000] text-amber-100 shadow-md font-black'
                      : 'bg-white/80 text-stone-700 hover:bg-amber-100/70 border border-amber-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Occasion Segmented Controls */}
          <div className="space-y-2 pt-2 border-t border-amber-200/60">
            <span className="text-[11px] uppercase tracking-wider font-black text-stone-700 block">
              Filter by Sacred Wedding Ritual:
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
              {[
                { id: 'all', label: 'All Rituals & Events' },
                { id: 'muhurtham', label: 'Muhurtham & Vivaha (Phere)' },
                { id: 'reception', label: 'Grand Reception' },
                { id: 'sangeet', label: 'Sangeet & Dance Night' },
                { id: 'engagement', label: 'Vara Pooja & Engagement' },
              ].map((occ) => (
                <button
                  key={occ.id}
                  onClick={() => {
                    bellPlayer.playBell(587);
                    setSelectedOccasion(occ.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer text-xs ${
                    selectedOccasion === occ.id
                      ? 'bg-amber-500 text-stone-950 font-black shadow-2xs'
                      : 'bg-amber-50 text-stone-700 hover:bg-amber-100'
                  }`}
                >
                  {occ.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. WEDDING MALL ITEMS GRID */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-royal text-xl sm:text-2xl font-black text-stone-900">
              Masterpiece Wedding Collection ({filteredItems.length} Ensembles)
            </h2>
            <p className="text-xs text-stone-600 font-medium">
              Each piece is pure handloom, inspected by master weavers, with Silk Mark India authenticity seals.
            </p>
          </div>

          {wishlist.length > 0 && (
            <div className="text-xs font-bold text-[#8B0000] bg-rose-50 border border-rose-200 px-3 py-1 rounded-xl flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-[#8B0000] text-[#8B0000]" />
              <span>{wishlist.length} in Wedding Wishlist</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isWishlisted = wishlist.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => {
                  bellPlayer.playBell(587);
                  setSelectedItem(item);
                }}
                className="glass-card-gold rounded-3xl p-5 border border-amber-300 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-lg transition cursor-pointer relative group"
              >
                <div className="space-y-3">
                  {/* Top Graphic Container */}
                  <div className="relative">
                    <SareeAndAttireGraphic
                      type={item.svgType}
                      primaryColor={item.primaryColorHex}
                      secondaryColor={item.secondaryColorHex}
                    />

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => toggleWishlist(item.id, e)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-600 hover:text-[#8B0000] shadow-sm transition cursor-pointer"
                      title="Save to Wedding Trousseau Wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted ? 'fill-[#8B0000] text-[#8B0000]' : ''
                        }`}
                      />
                    </button>

                    {/* Silk Mark Seal Tag */}
                    {item.silkMarkCertified && (
                      <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-white/95 text-stone-900 text-[10px] font-black shadow-xs border border-amber-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Silk Mark Certified
                      </span>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
                      <span>{item.categoryLabel}</span>
                      <span className="text-amber-900 font-bold">{item.occasionLabel}</span>
                    </div>

                    <h3 className="font-serif-royal font-black text-stone-950 text-base leading-snug group-hover:text-[#8B0000] transition">
                      {item.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Clean unboxed metadata */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-stone-500 pt-1">
                      <span>{item.fabric}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-stone-800 font-semibold">{item.zariType}</span>
                    </div>
                  </div>

                  {/* Matching Jewelry Teaser from Sri Kamala Jewellers */}
                  <div className="p-2.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-[11px] text-amber-950 space-y-0.5">
                    <strong className="block font-bold text-[#8B0000] flex items-center gap-1">
                      <Coins className="w-3 h-3 text-amber-600" />
                      Sri Kamala Gold Jewelry Pairing:
                    </strong>
                    <p className="line-clamp-1 text-stone-700">{item.matchingJewelrySuggestion}</p>
                  </div>
                </div>

                {/* Bottom Price & Actions */}
                <div className="pt-3 border-t border-amber-200/80 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-stone-500 block">Wedding Mall Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-stone-950">
                        ₹{item.priceINR.toLocaleString('en-IN')}
                      </span>
                      {item.originalPriceINR && (
                        <span className="text-xs text-stone-400 line-through">
                          ₹{item.originalPriceINR.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                      }}
                      className="px-3 py-2 rounded-xl bg-white border border-amber-300 text-stone-800 text-xs font-bold hover:bg-amber-50 shadow-2xs cursor-pointer"
                    >
                      Inspect
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsAppInquiry(item);
                      }}
                      className="px-3.5 py-2 rounded-xl btn-royal-crimson text-amber-100 text-xs font-black uppercase tracking-wider shadow-xs hover:brightness-110 cursor-pointer"
                    >
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. INTERACTIVE BRIDAL TROUSSEAU WARDROBE PLANNER */}
      {/* ------------------------------------------------------------- */}
      <section className="glass-card-gold rounded-3xl p-6 sm:p-10 border-2 border-amber-300 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#8B0000]">
              EXCLUSIVE KAMALA CONCIERGE SERVICE
            </span>
            <h2 className="font-serif-royal text-2xl sm:text-3xl font-black text-stone-900">
              Interactive Wedding Trousseau Wardrobe Planner
            </h2>
            <p className="text-xs text-stone-600 font-medium">
              Calculate exact saree, lehenga, and groomswear quantities required for your Indian wedding rituals.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-bold">
              Estimated Wardrobe Investment
            </span>
            <span className="text-2xl font-serif-royal font-black text-[#8B0000]">
              ₹{trousseauEstimatedTotal.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-emerald-800 font-bold block">
              Includes Kamala Trousseau Bundle Privileges
            </span>
          </div>
        </div>

        {/* Event Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
          {[
            { id: 'muhurtham', title: '1. Sacred Muhurtham', desc: 'Kanjeevaram Saree + Pattu Panche Dhoti' },
            { id: 'reception', title: '2. Grand Reception', desc: 'Banarasi / Velvet Lehenga + Royal Sherwani' },
            { id: 'sangeet', title: '3. Sangeet & Dance', desc: 'Mirror Work Shimmer Lehenga' },
            { id: 'engagement', title: '4. Vara Pooja / Haldi', desc: 'Pastel Korvai Saree + Trousseau Box' },
          ].map((ev) => {
            const isSelected = selectedEvents.includes(ev.id);
            return (
              <button
                key={ev.id}
                onClick={() => {
                  bellPlayer.playBell(587);
                  setSelectedEvents((prev) =>
                    isSelected ? prev.filter((i) => i !== ev.id) : [...prev, ev.id]
                  );
                }}
                className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#8B0000] text-amber-100 border-[#680510] shadow-sm'
                    : 'bg-white/80 border-amber-200 text-stone-700 hover:bg-white'
                }`}
              >
                <div>
                  <span className="block font-black text-sm">{ev.title}</span>
                  <span className="text-[11px] opacity-85 block font-medium mt-1 leading-relaxed">
                    {ev.desc}
                  </span>
                </div>
                <div className="pt-2 mt-2 border-t border-white/20 text-[10px] font-bold">
                  {isSelected ? '✓ Included in Wardrobe' : '+ Add Ritual'}
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-4 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-600 font-medium">
            💡 <strong>Kamala Wedding Mall Guarantee:</strong> Wedding families purchasing their bridal sarees and Sri Kamala Jewellers gold jewellery enjoy complimentary 1008-mantra Prana Pratishtha, bridal suite priority booking, and matching blouse tailoring.
          </p>

          <a
            href={`https://wa.me/919876543210?text=Namaste%20Kamala%20Wedding%20Mall!%20I%20have%20configured%20my%20wedding%20trousseau%20estimate%20(₹${trousseauEstimatedTotal.toLocaleString('en-IN')})%20for%20${selectedEvents.join(', ')}.%20Please%20share%20bridal%20appointment%20slots.`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl btn-royal-crimson font-black text-xs uppercase tracking-wider shadow-md hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4 text-amber-300" />
            Connect with Chief Bridal Stylist Sowmya
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. DETAILED ITEM INSPECTION MODAL */}
      {/* ------------------------------------------------------------- */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFDF8] rounded-3xl max-w-3xl w-full p-6 sm:p-8 border-2 border-amber-400 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-sm cursor-pointer transition"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div>
                <SareeAndAttireGraphic
                  type={selectedItem.svgType}
                  primaryColor={selectedItem.primaryColorHex}
                  secondaryColor={selectedItem.secondaryColorHex}
                  className="rounded-3xl shadow-md border border-amber-300"
                />
                <div className="mt-3 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-stone-700 space-y-1">
                  <p><strong>Floor Location:</strong> {selectedItem.floorLocation}</p>
                  <p><strong>Pallu Craft:</strong> {selectedItem.palluDetails}</p>
                  <p><strong>Border:</strong> {selectedItem.borderWidth}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#8B0000]">
                    {selectedItem.categoryLabel} • {selectedItem.occasionLabel}
                  </span>
                  <h3 className="font-serif-royal text-2xl font-black text-stone-950 mt-1">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-medium mt-1">
                    {selectedItem.kicker}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-100/70 border border-amber-300 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-bold">
                      Certified Wedding Price
                    </span>
                    <span className="text-2xl font-black text-[#8B0000]">
                      ₹{selectedItem.priceINR.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {selectedItem.silkMarkCertified && (
                    <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      Silk Mark India
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs text-stone-700">
                  <p className="leading-relaxed">{selectedItem.description}</p>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-200">
                    <p><strong>Fabric:</strong> {selectedItem.fabric}</p>
                    <p><strong>Weave Origin:</strong> {selectedItem.weaveOrigin}</p>
                    <p><strong>Zari Purity:</strong> {selectedItem.zariType}</p>
                    <p><strong>Blouse Piece:</strong> {selectedItem.blouseIncluded ? 'Included' : 'Available at Atelier'}</p>
                  </div>
                </div>

                {/* Sri Kamala Jewellery Matching Recommendation */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/80 border border-amber-300 text-xs text-amber-950 space-y-1.5">
                  <strong className="block font-bold text-[#8B0000] flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-amber-600" />
                    Paired Jewellery from Sri Kamala Jewellery:
                  </strong>
                  <p className="text-stone-700">{selectedItem.matchingJewelrySuggestion}</p>
                  <p className="text-[11px] text-stone-500">
                    <strong>Astrological Harmony:</strong> {selectedItem.astrologicalHarmony}
                  </p>
                  {onNavigateToGold && (
                    <button
                      onClick={() => {
                        setSelectedItem(null);
                        onNavigateToGold();
                      }}
                      className="text-xs font-black text-[#8B0000] underline hover:text-amber-900 cursor-pointer pt-1"
                    >
                      Browse Matching 22K Gold Jewellery Catalog →
                    </button>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => handleWhatsAppInquiry(selectedItem)}
                    className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl btn-royal-crimson text-amber-100 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <PhoneCall className="w-4 h-4 text-amber-300" />
                    Book Live Video Tour on WhatsApp
                  </button>

                  <button
                    onClick={() => handleBookBoutiqueTrial(selectedItem)}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white border border-amber-300 text-stone-800 font-bold text-xs hover:bg-amber-50 cursor-pointer shadow-2xs"
                  >
                    Book In-Store Trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
