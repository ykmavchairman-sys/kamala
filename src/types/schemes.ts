export interface MonthlyPaymentRecord {
  monthNumber: number;
  monthLabel: string;
  paymentDate: string; // YYYY-MM-DD
  amountPaidINR: number;
  goldRateOfThatDayINR: number; // 22K rate per gram on that day
  goldGramsCredited: number; // calculated as amountPaidINR / goldRateOfThatDayINR
  receiptNumber: string;
  status: 'Paid' | 'Upcoming';
  paymentMethod?: string;
  notes?: string;
}

export interface CustomerSchemeAccount {
  accountNumber: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  schemeName: string;
  monthlyInstallmentINR: number;
  totalMonths: number; // typically 11 months + 1 bonus month
  startDate: string;
  maturityDate: string;
  nomineeName: string;
  goldPurity: string; // '22K (916 BIS Hallmarked)'
  payments: MonthlyPaymentRecord[];
}
