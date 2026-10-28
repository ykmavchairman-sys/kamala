import React, { useState, useEffect } from 'react';
import {
  Coins,
  TrendingUp,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Building2,
  Receipt,
  User,
  Plus,
  RefreshCw,
  Gift
} from 'lucide-react';
import { CustomerSchemeAccount, MonthlyPaymentRecord } from '../types/schemes';
import { INITIAL_SAMPLE_ACCOUNT, SCHEME_PLANS } from '../data/mockSchemes';
import { LIVE_GOLD_RATES } from '../data/goldCatalog';
import { bellPlayer } from '../utils/audioBell';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  onOpenBooking: () => void;
  onNavigateToGold?: () => void;
}

export const MonthlyGoldSchemesPage: React.FC<Props> = ({ onOpenBooking, onNavigateToGold }) => {
  const { t } = useLanguage();
  const [account, setAccount] = useState<CustomerSchemeAccount>(() => {
    try {
      const saved = localStorage.getItem('skj_scheme_account');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_SAMPLE_ACCOUNT;
  });

  const [activeTab, setActiveTab] = useState<'passbook' | 'plans' | 'calculator'>('passbook');
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('UPI (PhonePe / GPay)');
  const [receiptDetail, setReceiptDetail] = useState<MonthlyPaymentRecord | null>(null);

  // Calculator State
  const [calcMonthlyAmount, setCalcMonthlyAmount] = useState<number>(5000);

  // Sync account changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('skj_scheme_account', JSON.stringify(account));
    } catch {}
  }, [account]);

  // Derived calculations
  const paidPayments = account.payments.filter((p) => p.status === 'Paid');
  const totalPaidINR = paidPayments.reduce((sum, p) => sum + p.amountPaidINR, 0);
  const totalGoldGrams = paidPayments.reduce((sum, p) => sum + p.goldGramsCredited, 0);
  const currentLiveRate = LIVE_GOLD_RATES.rate22KPerGram;
  const currentMarketValueINR = totalGoldGrams * currentLiveRate;
  const totalAppreciationINR = currentMarketValueINR - totalPaidINR;
  const nextPendingPayment = account.payments.find((p) => p.status === 'Upcoming');

  // Handle paying the next monthly installment at today's live rate
  const handlePayInstallment = () => {
    if (!nextPendingPayment) return;
    bellPlayer.playBell(587);

    const todayDate = new Date().toISOString().split('T')[0];
    const creditedGrams = +(account.monthlyInstallmentINR / currentLiveRate).toFixed(4);
    const newReceipt = `SKJ-REC-${Date.now().toString().slice(-6)}`;

    const updatedPayments = account.payments.map((p) => {
      if (p.monthNumber === nextPendingPayment.monthNumber) {
        return {
          ...p,
          status: 'Paid' as const,
          paymentDate: todayDate,
          goldRateOfThatDayINR: currentLiveRate,
          goldGramsCredited: creditedGrams,
          receiptNumber: newReceipt,
          paymentMethod: selectedPaymentMethod,
          notes: `Paid at live rate ₹${currentLiveRate.toLocaleString('en-IN')}/g via ${selectedPaymentMethod}`,
        };
      }
      return p;
    });

    const updatedAccount: CustomerSchemeAccount = {
      ...account,
      payments: updatedPayments,
    };

    setAccount(updatedAccount);
    setShowPayModal(false);
  };

  const handlePrintPassbook = () => {
    bellPlayer.playBell(528);
    window.print();
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 transition-colors duration-300">
      {/* 1. Hero Header Banner: SKJ Swarna Nidhi & Live Rate Gold Peg */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl border border-[#CC338B]/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-100/30 dark:bg-pink-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-[#CC338B] text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
                11 + 1 MONTHLY GOLD SAVINGS SCHEME
              </span>
              <span className="text-xs font-bold text-[#CC338B] bg-pink-50 dark:bg-stone-800 px-2.5 py-0.5 rounded-full border border-[#CC338B]/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#CC338B] animate-pulse" />
                Live 22K Rate Today: ₹{currentLiveRate.toLocaleString('en-IN')}/g
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
              {t('schemes_page_title', 'SKJ Swarna Nidhi — Monthly Gold Savings Scheme')}
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-3xl font-medium leading-relaxed">
              {t('schemes_page_desc', 'Every installment is converted into 22K gold grams on that exact day based on live IBJA rates. Enjoy a 100% 12th Month Bonus by Sri Kamala Jewellers!')}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto shrink-0">
            <button
              onClick={handlePrintPassbook}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white/90 dark:bg-stone-900/90 border border-[#CC338B]/30 text-stone-900 dark:text-pink-200 hover:bg-pink-50 dark:hover:bg-stone-800 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5 text-[#CC338B]" />
              <span>{t('print_passbook_btn', 'Print Passbook')}</span>
            </button>

            {nextPendingPayment && (
              <button
                onClick={() => {
                  bellPlayer.playBell(587);
                  setShowPayModal(true);
                }}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl btn-magenta font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-98 transition shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Coins className="w-4 h-4 text-white" />
                <span>{t('pay_installment_btn', 'Pay Installment at Today’s Live Rate')}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs for Schemes */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[#CC338B]/20 overflow-x-auto no-scrollbar">
          <button
            onClick={() => {
              bellPlayer.playBell(528);
              setActiveTab('passbook');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'passbook'
                ? 'btn-magenta shadow-sm font-black'
                : 'bg-white/70 dark:bg-stone-900/70 text-stone-700 dark:text-stone-300 hover:bg-pink-50 dark:hover:bg-stone-800'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>{t('passbook_title', 'Individual Customer Passbook')}</span>
          </button>

          <button
            onClick={() => {
              bellPlayer.playBell(528);
              setActiveTab('plans');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'plans'
                ? 'btn-magenta shadow-sm font-black'
                : 'bg-white/70 dark:bg-stone-900/70 text-stone-700 dark:text-stone-300 hover:bg-pink-50 dark:hover:bg-stone-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>11+1 Scheme Plans</span>
          </button>

          <button
            onClick={() => {
              bellPlayer.playBell(528);
              setActiveTab('calculator');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'btn-magenta shadow-sm font-black'
                : 'bg-white/70 dark:bg-stone-900/70 text-stone-700 dark:text-stone-300 hover:bg-pink-50 dark:hover:bg-stone-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t('calc_title', 'Maturity Gold Calculator')}</span>
          </button>
        </div>
      </div>

      {/* 2. Customer Passbook Section */}
      {activeTab === 'passbook' && (
        <div className="space-y-6">
          {/* Account Overview Card & Key Metrics */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl border border-[#CC338B]/30 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#CC338B]/20 dark:border-stone-800 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#CC338B] block">
                  DIGITAL PASSBOOK & ACCOUNT LEDGER
                </span>
                <h3 className="font-serif-royal text-xl sm:text-2xl font-black text-stone-950 dark:text-white mt-0.5">
                  {account.customerName}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 font-medium">
                  A/C: <span className="font-mono font-bold text-[#CC338B]">{account.accountNumber}</span> • Plan: <span className="font-bold text-stone-900 dark:text-stone-200">₹{account.monthlyInstallmentINR.toLocaleString('en-IN')}/mo</span> • Nominee: {account.nomineeName} • Started: {account.startDate}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-700 flex items-center gap-1.5 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{paidPayments.length} of {account.totalMonths} Installments Paid</span>
                </span>
              </div>
            </div>

            {/* 4 Financial & Gold Weight KPI Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Metric 1: Total Deposited */}
              <div className="p-4 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-[#CC338B]/20 dark:border-stone-800 shadow-2xs">
                <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold uppercase tracking-wider block">
                  {t('total_deposited', 'Total Deposited')}
                </span>
                <strong className="text-lg sm:text-2xl font-black font-mono text-[#CC338B] block mt-1">
                  ₹{totalPaidINR.toLocaleString('en-IN')}
                </strong>
                <span className="text-[10px] text-stone-600 dark:text-stone-400 font-medium mt-0.5 block">
                  Across {paidPayments.length} monthly installments
                </span>
              </div>

              {/* Metric 2: Accumulated Gold Grams */}
              <div className="p-4 rounded-2xl bg-pink-50/50 dark:bg-stone-900 border-2 border-[#CC338B]/40 shadow-2xs">
                <span className="text-[10px] text-[#CC338B] font-black uppercase tracking-wider block">
                  {t('gold_accumulated', 'Accumulated 22K Gold')}
                </span>
                <strong className="text-lg sm:text-2xl font-black font-mono text-[#CC338B] block mt-1">
                  {totalGoldGrams.toFixed(4)} g
                </strong>
                <span className="text-[10px] text-stone-600 dark:text-stone-400 font-bold mt-0.5 block">
                  Locked at exact rates of each payment day
                </span>
              </div>

              {/* Metric 3: Current Market Value Today */}
              <div className="p-4 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-[#CC338B]/20 dark:border-stone-800 shadow-2xs">
                <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold uppercase tracking-wider block">
                  {t('market_value', 'Current Market Value')}
                </span>
                <strong className="text-lg sm:text-2xl font-black font-mono text-stone-950 dark:text-white block mt-1">
                  ₹{Math.round(currentMarketValueINR).toLocaleString('en-IN')}
                </strong>
                <span className="text-[10px] text-[#CC338B] font-semibold mt-0.5 block">
                  Based on live rate: ₹{currentLiveRate.toLocaleString('en-IN')}/g
                </span>
              </div>

              {/* Metric 4: Customer Appreciation / Profit */}
              <div className="p-4 rounded-2xl bg-white/90 dark:bg-stone-900/90 border border-[#CC338B]/20 dark:border-stone-800 shadow-2xs">
                <span className="text-[10px] text-[#CC338B] font-bold uppercase tracking-wider block">
                  {t('gold_gain', 'Net Gold Appreciation')}
                </span>
                <strong className="text-lg sm:text-2xl font-black font-mono text-[#CC338B] block mt-1">
                  +₹{Math.round(totalAppreciationINR).toLocaleString('en-IN')}
                </strong>
                <span className="text-[10px] text-stone-600 dark:text-stone-400 font-medium mt-0.5 block">
                  +{((totalAppreciationINR / totalPaidINR) * 100 || 0).toFixed(1)}% gain + Free 12th Month!
                </span>
              </div>
            </div>

            {/* Scheme Progress Bar */}
            <div className="space-y-1.5 p-4 rounded-2xl bg-pink-50/40 dark:bg-stone-900/60 border border-[#CC338B]/20 dark:border-stone-800">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-stone-700 dark:text-stone-300">
                  Tenure Progress: Month {paidPayments.length} of 11 (Maturity: {account.maturityDate})
                </span>
                <span className="text-[#CC338B] font-black">
                  {Math.round((paidPayments.length / account.totalMonths) * 100)}% Complete
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-pink-100 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#CC338B] to-[#9E1463] transition-all duration-500"
                  style={{ width: `${(paidPayments.length / account.totalMonths) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 pt-1 font-medium">
                <span>Start: {account.startDate}</span>
                <span className="text-[#CC338B] font-bold flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-[#CC338B]" />
                  12th Month 100% Bonus by Sri Kamala Jewellers upon completion
                </span>
                <span>Maturity: {account.maturityDate}</span>
              </div>
            </div>
          </div>

          {/* Payment History Ledger Table */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <Coins className="w-5 h-5 text-[#CC338B]" />
                  <span>Monthly Payment Ledger & Live-Rate Gold Credits</span>
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  Showing historical gold rate locked on each installment date and resulting 22K gold grams credited to customer passbook.
                </p>
              </div>

              <span className="text-[11px] font-bold text-[#CC338B] bg-pink-50 dark:bg-stone-800 px-3 py-1 rounded-xl border border-[#CC338B]/30">
                A/C Ref: {account.accountNumber}
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#CC338B]/20 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#CC338B]/20 dark:border-stone-800 bg-pink-50/50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3.5">{t('col_month', 'Month')}</th>
                    <th className="py-3 px-3.5">{t('col_payment_date', 'Payment Date')}</th>
                    <th className="py-3 px-3.5">{t('col_amount', 'Amount Paid')}</th>
                    <th className="py-3 px-3.5">{t('col_gold_rate', 'Live Gold Rate of That Day')}</th>
                    <th className="py-3 px-3.5 text-right font-black">{t('col_gold_credited', '22K Gold Credited')}</th>
                    <th className="py-3 px-3.5">{t('col_mode', 'Payment Mode')}</th>
                    <th className="py-3 px-3.5">{t('col_receipt', 'Receipt #')}</th>
                    <th className="py-3 px-3.5 text-center">{t('col_status', 'Status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-50 dark:divide-stone-800 font-medium text-stone-800 dark:text-stone-200">
                  {account.payments.map((p) => {
                    const isPaid = p.status === 'Paid';
                    return (
                      <tr
                        key={p.monthNumber}
                        className={`transition ${
                          isPaid
                            ? 'hover:bg-pink-50/30 dark:hover:bg-stone-800/60'
                            : 'bg-stone-50/50 dark:bg-stone-950/40 text-stone-400 dark:text-stone-500'
                        }`}
                      >
                        <td className="py-3 px-3.5 font-bold text-stone-900 dark:text-white">
                          {p.monthLabel}
                        </td>
                        <td className="py-3 px-3.5 font-mono">
                          {p.paymentDate}
                        </td>
                        <td className="py-3 px-3.5 font-mono font-bold text-stone-900 dark:text-pink-100">
                          ₹{p.amountPaidINR.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-3.5">
                          {isPaid ? (
                            <span className="font-mono text-[#CC338B] font-bold">
                              ₹{p.goldRateOfThatDayINR.toLocaleString('en-IN')}/g
                            </span>
                          ) : (
                            <span className="italic text-stone-400">Rate at time of payment</span>
                          )}
                        </td>
                        <td className="py-3 px-3.5 text-right font-mono font-black text-sm">
                          {isPaid ? (
                            <span className="text-[#CC338B] bg-pink-50 dark:bg-stone-800 px-2 py-0.5 rounded-lg border border-[#CC338B]/30">
                              +{p.goldGramsCredited.toFixed(4)} g
                            </span>
                          ) : (
                            <span className="text-stone-400">~{p.goldGramsCredited.toFixed(4)} g</span>
                          )}
                        </td>
                        <td className="py-3 px-3.5 text-[11px] text-stone-600 dark:text-stone-400">
                          {p.paymentMethod || '—'}
                        </td>
                        <td className="py-3 px-3.5 font-mono text-[11px]">
                          {isPaid ? (
                            <button
                              onClick={() => setReceiptDetail(p)}
                              className="text-[#CC338B] hover:underline font-bold cursor-pointer"
                            >
                              {p.receiptNumber}
                            </button>
                          ) : (
                            <span>Pending</span>
                          )}
                        </td>
                        <td className="py-3 px-3.5 text-center">
                          {isPaid ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold border border-emerald-300 dark:border-emerald-700 inline-flex items-center gap-1">
                              <CheckCircle2 className="w-2.5 h-2.5" /> Paid
                            </span>
                          ) : p.paymentDate === 'Due Now' ? (
                            <button
                              onClick={() => {
                                bellPlayer.playBell(587);
                                setShowPayModal(true);
                              }}
                              className="px-2.5 py-0.5 rounded-full btn-magenta text-[10px] font-black uppercase tracking-wider animate-pulse hover:brightness-110 cursor-pointer shadow-xs"
                            >
                              Pay Now
                            </button>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 text-[10px]">
                              Upcoming
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. Scheme Plans Showcase Section */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#CC338B]">
              TRANSPARENT GOLD ACCUMULATION
            </span>
            <h3 className="font-serif-royal text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
              Choose Your 11+1 Swarna Nidhi Plan
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium">
              Pay 11 monthly installments. On the 12th month, Sri Kamala Jewellers contributes the 12th installment or gives you 100% making charges discount!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SCHEME_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 flex flex-col justify-between border-2 transition-all duration-200 relative ${
                  plan.popular
                    ? 'glass-card border-[#CC338B] shadow-xl scale-[1.02]'
                    : 'glass-card border-[#CC338B]/20 dark:border-stone-800 shadow-sm hover:border-[#CC338B]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full btn-magenta text-[10px] font-black uppercase tracking-wider shadow-sm">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h4 className="font-serif-royal text-lg font-bold text-stone-900 dark:text-white">
                      {plan.title}
                    </h4>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-[#CC338B]">
                        ₹{plan.monthlyAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-stone-500 dark:text-stone-400 font-bold">/ Month</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-stone-700 dark:text-stone-300 border-t border-[#CC338B]/20 dark:border-stone-800 pt-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#CC338B] shrink-0 mt-0.5" />
                      <span><strong>11 Installments</strong> converted to 22K pure gold grams at live rates</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Gift className="w-4 h-4 text-[#CC338B] shrink-0 mt-0.5" />
                      <span><strong>{plan.bonusMonth}</strong></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#CC338B] shrink-0 mt-0.5" />
                      <span>{plan.makingChargeBenefit}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#CC338B]/20 dark:border-stone-800 mt-6">
                  <button
                    onClick={() => {
                      bellPlayer.playBell(587);
                      onOpenBooking();
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      plan.popular
                        ? 'btn-magenta shadow-md'
                        : 'bg-pink-50 dark:bg-stone-800 text-[#CC338B] hover:bg-pink-100 border border-[#CC338B]/30'
                    }`}
                  >
                    <span>Enroll In This Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Interactive Gold Maturity Calculator */}
      {activeTab === 'calculator' && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#CC338B]/30 max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-bold text-[#CC338B] uppercase tracking-widest block">
              REAL-TIME SAVINGS SIMULATOR
            </span>
            <h3 className="font-serif-royal text-xl sm:text-2xl font-black text-stone-950 dark:text-white">
              Estimate Your Accumulated Gold & Bonus
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium">
              See how much pure 22K hallmarked gold you accumulate over 11 months based on today's benchmark rate of ₹{currentLiveRate.toLocaleString('en-IN')}/g.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4 bg-pink-50/40 dark:bg-stone-900/80 p-6 rounded-2xl border border-[#CC338B]/20 dark:border-stone-700">
              <label className="block text-xs font-bold text-stone-800 dark:text-stone-200">
                Choose Monthly Installment Amount (₹):
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[2000, 5000, 10000, 25000, 50000, 100000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setCalcMonthlyAmount(amt)}
                    className={`py-2 px-2 rounded-xl text-xs font-mono font-bold transition cursor-pointer border ${
                      calcMonthlyAmount === amt
                        ? 'btn-magenta shadow-xs'
                        : 'bg-white dark:bg-stone-800 border-[#CC338B]/30 text-stone-800 dark:text-stone-300'
                    }`}
                  >
                    ₹{amt >= 100000 ? `${amt / 100000} Lakh` : `${amt / 1000}k`}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <input
                  type="range"
                  min="2000"
                  max="50000"
                  step="1000"
                  value={calcMonthlyAmount}
                  onChange={(e) => setCalcMonthlyAmount(Number(e.target.value))}
                  className="w-full accent-[#CC338B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
                  <span>Min: ₹2,000</span>
                  <span className="font-bold text-[#CC338B]">Selected: ₹{calcMonthlyAmount.toLocaleString('en-IN')}/mo</span>
                  <span>Max: ₹50,000</span>
                </div>
              </div>
            </div>

            {/* Projected Output Summary */}
            <div className="p-6 rounded-2xl glass-card border-2 border-[#CC338B]/50 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#CC338B] block">
                PROJECTED MATURITY BENEFIT
              </span>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-600 dark:text-stone-400">Total You Pay (11 Months):</span>
                  <strong className="font-mono text-stone-900 dark:text-white">
                    ₹{(calcMonthlyAmount * 11).toLocaleString('en-IN')}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-600 dark:text-stone-400">12th Month Bonus by SKJ:</span>
                  <strong className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                    +₹{calcMonthlyAmount.toLocaleString('en-IN')} (Free!)
                  </strong>
                </div>

                <div className="flex justify-between pt-2 border-t border-[#CC338B]/20 dark:border-stone-800">
                  <span className="text-stone-900 dark:text-stone-200 font-bold">Estimated 22K Gold Accumulated:</span>
                  <strong className="font-mono text-base font-black text-[#CC338B]">
                    ~{((calcMonthlyAmount * 11) / currentLiveRate).toFixed(3)} grams
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-600 dark:text-stone-400">Total Redemption Value with Bonus:</span>
                  <strong className="font-mono text-stone-900 dark:text-white font-black text-base">
                    ₹{(calcMonthlyAmount * 12).toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 rounded-xl btn-magenta font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer mt-4"
              >
                Enroll In ₹{calcMonthlyAmount.toLocaleString('en-IN')} Plan Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Payment Modal (Pay at Today's Live Rate) */}
      {showPayModal && nextPendingPayment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-[#CC338B]/50 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex justify-between items-center border-b border-[#CC338B]/20 dark:border-stone-800 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#CC338B] block">
                  LOCK IN GOLD AT LIVE RATE
                </span>
                <h4 className="font-serif-royal text-xl font-bold text-stone-950 dark:text-white">
                  Pay Installment {nextPendingPayment.monthNumber} of 11
                </h4>
              </div>
              <button
                onClick={() => setShowPayModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-pink-50/50 dark:bg-stone-900 border border-[#CC338B]/20 dark:border-stone-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-600 dark:text-stone-400">Account:</span>
                <strong className="font-mono text-stone-900 dark:text-white">{account.accountNumber} ({account.customerName})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600 dark:text-stone-400">Installment Amount:</span>
                <strong className="font-mono text-stone-900 dark:text-white">₹{account.monthlyInstallmentINR.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600 dark:text-stone-400">Today's Live 22K Gold Rate:</span>
                <strong className="font-mono text-[#CC338B] font-bold">₹{currentLiveRate.toLocaleString('en-IN')}/g</strong>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#CC338B]/20 dark:border-stone-800 text-sm">
                <span className="font-bold text-stone-900 dark:text-stone-100">Gold Credited Instantly:</span>
                <strong className="font-mono font-black text-[#CC338B]">
                  +{(account.monthlyInstallmentINR / currentLiveRate).toFixed(4)} g
                </strong>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-800 dark:text-stone-200">
                Select Payment Mode:
              </label>
              <div className="space-y-1.5">
                {['UPI (PhonePe / GPay / Paytm)', 'Debit Card / NetBanking', 'Showroom Cash Desk (Ballari Arch)'].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                      selectedPaymentMethod === method
                        ? 'bg-pink-50 dark:bg-stone-800 border-[#CC338B] text-[#CC338B]'
                        : 'bg-white/80 dark:bg-stone-900 border-[#CC338B]/20 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      checked={selectedPaymentMethod === method}
                      onChange={() => setSelectedPaymentMethod(method)}
                      className="accent-[#CC338B]"
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowPayModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs hover:bg-stone-200 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePayInstallment}
                className="flex-1 py-2.5 rounded-xl btn-magenta font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Confirm & Lock Gold</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Digital Receipt Modal */}
      {receiptDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-[#CC338B]/50 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex justify-between items-start border-b border-[#CC338B]/20 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#CC338B] block">
                  SRI KAMALA JEWELLERS • BALLARI
                </span>
                <h4 className="font-serif-royal text-lg font-bold text-stone-950 dark:text-white">
                  Official Digital Gold Receipt
                </h4>
                <span className="font-mono text-xs text-[#CC338B] font-bold">
                  {receiptDetail.receiptNumber}
                </span>
              </div>
              <button
                onClick={() => setReceiptDetail(null)}
                className="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-900 flex items-center justify-center font-bold text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs bg-pink-50/40 dark:bg-stone-900/80 p-4 rounded-2xl border border-[#CC338B]/20">
              <div className="flex justify-between">
                <span className="text-stone-500">Account Number:</span>
                <span className="font-mono font-bold">{account.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Customer Name:</span>
                <span className="font-bold">{account.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Date:</span>
                <span className="font-mono">{receiptDetail.paymentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Installment:</span>
                <span className="font-bold">{receiptDetail.monthLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Amount Paid:</span>
                <span className="font-mono font-bold text-[#CC338B]">₹{receiptDetail.amountPaidINR.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Gold Rate of that Day:</span>
                <span className="font-mono font-bold">₹{receiptDetail.goldRateOfThatDayINR.toLocaleString('en-IN')} / g</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#CC338B]/20 text-sm">
                <span className="font-black text-[#CC338B]">Pure 22K Gold Credited:</span>
                <span className="font-mono font-black text-[#CC338B]">
                  {receiptDetail.goldGramsCredited.toFixed(4)} grams
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-pink-50 dark:bg-stone-800 text-[#CC338B] border border-[#CC338B]/30 text-xs font-bold hover:bg-pink-100 transition cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={() => setReceiptDetail(null)}
                className="px-4 py-2 rounded-xl btn-magenta text-xs font-bold hover:brightness-110 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
