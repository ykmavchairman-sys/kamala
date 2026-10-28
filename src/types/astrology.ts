export type LifeGoal =
  | 'wealth'
  | 'career'
  | 'health'
  | 'marriage'
  | 'protection'
  | 'peace'
  | 'education';

export interface BirthChartInput {
  name: string;
  dob: string; // YYYY-MM-DD
  tob: string; // HH:MM
  place: string;
  gender: 'male' | 'female' | 'other';
  lifeGoal: LifeGoal;
  zodiacSign?: string;
  moonSign?: string;
  nakshatra?: string;
  weightKg?: number;
}

export interface PlanetaryPosition {
  planet: 'Sun' | 'Moon' | 'Mars' | 'Mercury' | 'Jupiter' | 'Venus' | 'Saturn' | 'Rahu' | 'Ketu';
  sanskritName: string;
  sanskritGlyph: string; // e.g. 'सू', 'चं', 'मं'
  rashi: string;
  rashiNumber: number; // 1 to 12
  house: number; // 1 to 12 in D1
  degree: number;
  degreeFormatted: string; // e.g. '14°22\''
  nakshatra: string;
  pada: 1 | 2 | 3 | 4;
  dignity: 'Exalted' | 'Moolatrikona' | 'Own Sign' | 'Friendly' | 'Neutral' | 'Debilitated' | 'Enemy';
  strengthPercentage: number;
  status: 'Benefic' | 'Malefic' | 'Yogakaraka';
  isRetrograde: boolean;
  isCombust: boolean;
  d9Rashi: string;
  d9House: number;
  isVargottama?: boolean;
}

export interface GemstoneRecommendation {
  id: string;
  category: 'bhagyashali' | 'lagna' | 'karaka';
  categoryLabel: string;
  name: string;
  hindiName: string;
  planet: string;
  planetSanskrit: string;
  primaryColor: string;
  hexColor: string;
  glowColor: string;
  recommendedCarat: number;
  recommendedRatti: number;
  recommendedFinger: string;
  recommendedHand: string;
  recommendedMetal: string;
  auspiciousDay: string;
  auspiciousTime: string;
  beejMantra: string;
  mantraChantCount: number;
  keyBenefits: string[];
  whyRecommended: string;
  precautions: string[];
  originOptions: string[];
  estimatedPricePerCaratINR: number;
  substituteStone?: string;
}

export interface AntiGemstoneWarning {
  gemstone: string;
  hindiName: string;
  planet: string;
  reason: string;
  avoidWearingWith: string[];
}

export interface AstrologerApproval {
  status: 'pending' | 'approved' | 'modified' | 'special_remedy';
  sanctionedBy: string;
  title: string;
  certificateId: string;
  approvedAt?: string;
  sanctionNotes: string;
  prescribedStoneName: string;
  prescribedRatti: number;
  prescribedCarat: number;
  prescribedMetal: string;
  prescribedFinger: string;
  prescribedHand: string;
  prescribedAuspiciousTime: string;
  prescribedMantraCount: number;
  marakaBadhakaChecked: boolean;
  skinContactMandatory: boolean;
  astrologerBadge: string;
}

export interface AstrologerDevoteeEntry {
  id: string;
  customerName: string;
  phone?: string;
  city: string;
  dob: string;
  tob: string;
  lagnaRashi: string;
  moonRashi: string;
  lifeGoal: LifeGoal;
  requestedStone: string;
  requestType: 'birth_chart_dossier' | 'consultation_call' | 'custom_jewel_order';
  requestedAt: string;
  approvalStatus: 'pending' | 'approved' | 'modified' | 'special_remedy';
  prescribedRatti: number;
  prescribedMetal: string;
  prescribedFinger: string;
  prescribedMuhurat: string;
  sanctionNotes: string;
  marakaAfflictionChecked: boolean;
  certificateNumber: string;
  report?: AstrologicalReport;
}

export interface SacredStoneSanction {
  id: string;
  gemstoneKey: string;
  name: string;
  hindiName: string;
  planet: string;
  planetSanskrit: string;
  color: string;
  certifiedOrigin: string;
  status: 'approved_consecrated' | 'pending_prana_pratishtha' | 'lab_verification_passed';
  vedicSkinTouchCompliant: boolean;
  huidHallmarkPassed: boolean;
  recommendedWeightFormula: string;
  recommendedMetal: string;
  sacredDayMuhurat: string;
  stockCaratsAvailable: number;
  currentMarketRateINR: number;
  mantraChantsApproved: number;
}

export interface AtelierCustomRequest {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  jewelType: 'Ring' | 'Pendant' | 'Bracelet / Kada' | 'Loose Consecrated Gem';
  selectedGemstone: string;
  carats: number;
  metal: string;
  purity: string;
  ringSize?: string;
  specialInstructions?: string;
  requestedDate: string;
  status: 'pending_approval' | 'approved_for_atelier' | 'consecration_scheduled' | 'rejected_incompatible';
  astrologerClearance: boolean;
}

export interface VimshottariAntardasha {
  planet: string;
  planetSanskrit: string;
  durationMonths: number;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  beneficStatus: 'Benefic' | 'Malefic' | 'Neutral' | 'Yogakaraka';
  gemstoneRemedy: string;
}

export interface VimshottariMahaDasha {
  planet: string;
  planetSanskrit: string;
  fullDurationYears: number;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  status: 'Completed' | 'Active Maha Dasha' | 'Upcoming';
  gemstoneRemedy: string;
  gemstoneColor: string;
  keyThemes: string;
  antardashas: VimshottariAntardasha[];
}

export interface VimshottariDashaInfo {
  birthBalanceDasha: string;
  balanceYears: number;
  currentMahaDasha: string;
  currentAntardasha: string;
  currentDashaPeriod: string;
  dashaProgressPercent: number;
  allMahaDashas: VimshottariMahaDasha[];
}

export interface NCLahiriAyanamshaDetails {
  exactAyanamsha: string;
  valueDegrees: number;
  degrees: number;
  minutes: number;
  seconds: number;
  referenceEpoch: string;
  calculationStandard: string;
  ayanamshaType: 'N.C. Lahiri (Chitra Paksha)';
}

export interface AstrologicalReport {
  input: BirthChartInput;
  lagnaRashi: string;
  lagnaRashiNumber: number; // 1 to 12
  lagnaDegreeFormatted: string;
  lagnaLord: string;
  d9LagnaRashi: string;
  d9LagnaRashiNumber: number;
  d9LagnaDegreeFormatted: string;
  moonRashi: string;
  moonLord: string;
  sunRashi: string;
  nakshatra: string;
  nakshatraPada: number;
  ayanamsa: string; // e.g. 'N.C. Lahiri (Chitra Paksha) 24°14\'32"'
  ncLahiriAyanamshaDetails?: NCLahiriAyanamshaDetails;
  currentDasha: string;
  vimshottariDasha?: VimshottariDashaInfo;
  planetaryPositions: PlanetaryPosition[];
  primaryStone: GemstoneRecommendation;
  secondaryStone?: GemstoneRecommendation;
  lagnaStone?: GemstoneRecommendation;
  maleficStonesToAvoid: AntiGemstoneWarning[];
  astrologerApproval: AstrologerApproval;
  wearingRitual: {
    steps: string[];
    purificationIngredients: string[];
    mantra: string;
    auspiciousDayTime: string;
    direction: string;
  };
  aiGuruReading?: string;
}

export interface JewelryItem {
  id: string;
  title: string;
  category: 'ring' | 'pendant' | 'bracelet' | 'loose_gem';
  style: string;
  suitableGemstones: string[];
  availableMetals: Array<{
    name: string;
    purity: string;
    colorHex: string;
    priceMultiplier: number;
  }>;
  basePriceINR: number;
  hallmarkCertified: boolean;
  labCertificate: string;
  description: string;
  openBackVedicSetting: boolean;
  tag: string;
  rating: number;
  reviewsCount: number;
}
