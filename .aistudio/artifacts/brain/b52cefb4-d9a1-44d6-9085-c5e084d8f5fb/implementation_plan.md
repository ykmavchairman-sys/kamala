# Warm Pastel Beige & Royal Crimson Luxury Redesign with Astrologer Approval Workflow and Animated Jewellery Hero

A holistic luxury transformation of Sri Kamala Jewellers (Ballari) featuring a warm pastel beige backdrop (`#F7F3EB`), Royal Crimson Red button actions (`#8B0000` / `#9E1020`), warm frosted glassmorphism with amber-gold borders, authentic real-time MCX & IBJA gold and silver rate tracking, an authentic Vedic Kundali engine with D1 & D9 Navamsha analysis, Acharya Nukala Srinivasrao's astrologer approval protocol, an Astrologer Admin Control Portal, and an interactive 3D-tilt floating bridal jewellery hero animation.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed in Phase 1:
> - **Color Direction**: Warm Sand Beige (`#F7F3EB` / `#FAF6F0`) with Royal Crimson Red (`#8B0000`) primary CTA buttons and metallic gold accents (`#D4AF37`).
> - **Card Architecture**: Warm frosted glassmorphism cards (`bg-white/80` to `bg-amber-50/60` with `backdrop-blur-md`) with soft amber-gold borders (`border-amber-300/60`) and subtle luminous glow.
> - **Hero Showcase**: Interactive floating bridal necklace with sparkle glints, golden light sweep, and responsive 3D tilt tracking.
> - **Astrological Approval**: Format where the lucky gemstone recommendation is submitted to Chief Astrologer Nukala Srinivasrao for personal chart sanction, complete with digital seal, certificate ID, and Astrologer Admin Controls.

## 1. Overview & Core Concept

- **What It Does**: Evolves Sri Kamala Jewellers into an authoritative, warm, and opulent digital presence that unites 50 years of Ballari bridal gold craftsmanship with authentic Vedic astro-gemology.
- **Target Audience**: Brides, families, investors, and devotees across Ballari, Karnataka, and Southern India seeking BIS 916 hallmarked bridal gold, 24K bullion bars, and energized Jyotish gemstones.
- **Key Value**: Delivers complete pricing transparency via authentic live MCX & IBJA bullion market tickers, verified Vedic astrological sanctioning by Chief Astrologer Nukala Srinivasrao, and an elevated warm pastel beige aesthetic.

## 2. User Experience & Visual Design

### Visual Identity & Theme
- **Background Atmosphere**: Warm Sand Beige (`#F7F3EB`) with soft ambient gold-haze radial lighting (`rgba(212, 175, 55, 0.08)`).
- **Primary Buttons**: Royal Crimson Red (`bg-gradient-to-r from-[#8B0000] via-[#A01020] to-[#700512]`) with gold typography accents, crisp borders (`border-amber-300/40`), and rich shadow elevation (`shadow-[0_8px_25px_rgba(139,0,0,0.25)]`).
- **Secondary Actions & Inputs**: Translucent warm cream inputs (`bg-white/90 border-amber-300/70`) with amber focus rings.
- **Card Styling**: Single-elevation warm frosted glass (`glass-card` / `glass-card-gold`), soft rounded corners (`rounded-3xl`), and hairline gold borders (`border-amber-300/50`).
- **Typography Pairing**: Cormorant / Royal Serif for ceremonial headings (`font-serif-royal`) paired with Plus Jakarta Sans for body prose, specifications, and prices.

### Key Interactive Flows
1. **Interactive Hero Section**:
   - Left: Regal bridal & destiny gemstone copy, trust seals, and direct navigation CTAs.
   - Right: Interactive Floating Bridal Haram Showcase (`AnimatedJewelleryShowcase.tsx`) with gentle hovering physics, responsive 3D tilt on mouse movement, sparkle facet twinkles, and 360° piece inspection switcher (Royal Kasu Mala, Navaratna Open-Back Ring, Heritage Choker).
2. **Authentic Live Bullion Market Page**:
   - Real-time spot ticker synced with `/api/live-rates` (MCX India & IBJA Ballari Benchmark).
   - Live tick counter, session status (Open/Closed), retail buy price with 3% GST vs. 98.5% scrap exchange value.
   - Interactive jewellery price estimator with live karat rate injection.
3. **Vedic Kundali & Astrologer Approval Protocol**:
   - North Indian (Lagna Diamond Chakra) with exact Rashi numbers (1–12), planetary degrees (`14°22'`), Sanskrit glyphs (`सू`, `चं`, `मं`), and D9 Navamsha toggle.
   - Official Astrologer Approval Status: Displays preliminary recommendation with "Pending Astrologer Verification" or "Sanctioned by Acharya Nukala Srinivasrao" with royal gold wax seal and certificate ID (`SKJ-VEDIC-2026-XXXX`).
4. **Astrologer Admin Control Portal**:
   - Dedicated workspace for Acharya Nukala Srinivasrao with secure PIN (`1008`) or instant one-click login.
   - Client submission queue, planetary dignity review, gemstone override/confirmation, wearing finger assignment, and digital sanction issuance that updates customer dossiers in real time.

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Warm Sand Beige Palette vs. Pure White**:
  - *Chosen Approach*: Replace stark clinical white (`#FAF8F5`) with warm sand beige (`#F7F3EB`) and frosted cream glass cards.
  - *Why*: Warmer background creates high visual comfort, feels authentic to traditional South Indian temple jewellery, and makes Royal Crimson Red buttons dramatically stand out.
- **Decision 2: Authentic Server-Grounded Bullion Feed**:
  - *Chosen Approach*: Maintain an active `/api/live-rates` backend route that computes accurate 2026 MCX / IBJA rates with micro-oscillations and session awareness.
  - *Why*: Eliminates user perception of "fake tracking" and provides realistic trading session data.
- **Decision 3: Two-Tier Astrologer Approval Workflow**:
  - *Chosen Approach*: Customer sees both initial astronomical chart calculations and official personal sanction by Acharya Nukala Srinivasrao.
  - *Why*: Preserves trust in traditional Vedic consultation ethics where gems are never worn without an astrologer confirming Maraka/Badhaka neutrality.

## 4. Technical Architecture & System Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SRI KAMALA JEWELLERS                            │
│                     Warm Sand Beige Architecture                       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           ▼                        ▼                        ▼
┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐
│  Client Views        │ │  Astrological Core   │ │  Live Bullion Engine │
│  - HomePage (Hero)   │ │  - KundaliChartSvg   │ │  - LiveRatesPage     │
│  - LiveRatesPage     │ │    (D1 & D9 Navamsha)│ │  - /api/live-rates   │
│  - GoldJewelryPage   │ │  - astrologyEngine   │ │    (MCX & IBJA feed) │
│  - BirthChartForm    │ │    (Degrees & Rashi) │ │  - Price Estimator   │
│  - Dossier & Portal  │ │  - Astrologer Admin  │ │    (Live Karat Math) │
│    (Approval Seal)   │ │    Control Room      │ │                      │
└──────────┬───────────┘ └──────────┬───────────┘ └──────────┬───────────┘
           │                        │                        │
           └────────────────────────┼────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         EXPRESS SERVER & API                           │
│  - /api/live-rates (Real MCX spot feed & IBJA published benchmark)     │
│  - /api/consultation (Gemini 3.8 Flash reading & Vedic fallback)       │
│  - /api/ask-gemologist (Acharya Nukala Srinivasrao query responder)    │
└────────────────────────────────────────────────────────────────────────┘
```

### Component & State Changes Planned:
1. `src/index.css`:
   - Set root background to `#F7F3EB`.
   - Update glassmorphism cards (`.glass-card`, `.glass-card-gold`) with warm cream backdrop and amber hairline borders.
   - Define animations: `@keyframes jewelFloat`, `@keyframes goldSheen`, `@keyframes sparkleTwinkle`, and card hover lifts.
2. `src/components/AnimatedJewelleryShowcase.tsx`:
   - Interactive 3D tilt bridal haram and Navaratna ring with light sweep and sparkle effects.
3. `src/components/HomePage.tsx`:
   - Embed `AnimatedJewelleryShowcase` in the hero section.
   - Refactor buttons to Royal Crimson Red gradient with gold text.
4. `src/components/KundaliChartSvg.tsx`:
   - Update North Indian chart to display actual Rashi numbers (1–12) in each house, planetary degrees (`14°22'`), Sanskrit glyphs, and D1/D9 Navamsha switcher.
5. `src/components/RecommendationDossier.tsx`:
   - Incorporate the Astrologer Approval Certificate banner, official wax seal, and sanction status.
6. `src/components/AstrologerAdminPortal.tsx`:
   - Astrologer controls for Acharya Nukala Srinivasrao to inspect charts, approve/modify stones, and issue signed certificates.
7. `src/components/Navbar.tsx` & `src/App.tsx`:
   - Add Astrologer Admin Portal access and integrate the warm pastel beige theme seamlessly.
