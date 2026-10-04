import React from 'react';
import styles from './LoanCalculator.module.scss';
import { Card } from '@/components/ui/Card';
import { CreditScoreTier } from '../../models/loan';
import { useLoanCalculation } from '../../hooks/useLoanCalculation';
import { formatCurrency, formatPercentage } from '@/utils/format';
import { LOAN_CONSTANTS } from '@/config/constants';
import { Calculator, ArrowRight, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export interface LoanCalculatorProps {
  initialAmount?: number;
  initialTerm?: number;
  showApplyButton?: boolean;
  onApplyWithTerms?: (amount: number, term: number, tier: CreditScoreTier) => void;
}

export function LoanCalculator({
  initialAmount = LOAN_CONSTANTS.DEFAULT_AMOUNT,
  initialTerm = LOAN_CONSTANTS.DEFAULT_TERM_MONTHS,
  showApplyButton = true,
  onApplyWithTerms,
}: LoanCalculatorProps) {
  const {
    amount,
    setAmount,
    termMonths,
    setTermMonths,
    creditTier,
    setCreditTier,
    calculation,
  } = useLoanCalculation(initialAmount, initialTerm);

  const quickAmounts = [10000, 25000, 50000, 75000];

  const principalRatio = Math.round((amount / calculation.totalPayment) * 100) || 100;
  const interestRatio = 100 - principalRatio;

  const handleApply = () => {
    if (onApplyWithTerms) {
      onApplyWithTerms(amount, termMonths, creditTier);
    }
  };

  return (
    <Card variant="glass" className={styles.calculatorCard}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <div className={styles.iconCircle}>
            <Calculator size={20} />
          </div>
          <div>
            <h3 className={styles.title}>Estimate Your Monthly Rate</h3>
            <p className={styles.subtitle}>Adjust terms with zero credit impact</p>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.controls}>
          {/* Amount Slider */}
          <div className={styles.controlGroup}>
            <div className={styles.controlHeader}>
              <label htmlFor="loan-amount-range" className={styles.controlLabel}>
                <DollarSign size={16} />
                <span>Loan Amount</span>
              </label>
              <span className={styles.highlightValue}>{formatCurrency(amount)}</span>
            </div>

            <input
              id="loan-amount-range"
              type="range"
              min={LOAN_CONSTANTS.MIN_AMOUNT}
              max={LOAN_CONSTANTS.MAX_AMOUNT}
              step={LOAN_CONSTANTS.AMOUNT_STEP}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className={styles.rangeSlider}
            />

            <div className={styles.quickPills}>
              {quickAmounts.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(q)}
                  className={`${styles.quickBtn} ${amount === q ? styles.activeQuickBtn : ''}`}
                >
                  ${q / 1000}k
                </button>
              ))}
            </div>
          </div>

          {/* Term Selector */}
          <div className={styles.controlGroup}>
            <div className={styles.controlHeader}>
              <label className={styles.controlLabel}>
                <Calendar size={16} />
                <span>Repayment Term</span>
              </label>
              <span className={styles.highlightValue}>{termMonths} Months ({termMonths / 12} Yrs)</span>
            </div>

            <div className={styles.termGrid}>
              {LOAN_CONSTANTS.TERM_OPTIONS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTermMonths(t)}
                  className={`${styles.termBtn} ${termMonths === t ? styles.activeTermBtn : ''}`}
                >
                  {t} mo
                </button>
              ))}
            </div>
          </div>

          {/* Credit Tier Selector */}
          <div className={styles.controlGroup}>
            <div className={styles.controlHeader}>
              <label className={styles.controlLabel}>
                <TrendingUp size={16} />
                <span>Estimated Credit Score</span>
              </label>
            </div>

            <div className={styles.creditTierGrid}>
              {(['excellent', 'good', 'fair', 'poor'] as CreditScoreTier[]).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setCreditTier(tier)}
                  className={`${styles.tierBtn} ${creditTier === tier ? styles.activeTierBtn : ''}`}
                >
                  <span className={styles.tierName}>{tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
                  <span className={styles.tierScore}>
                    {tier === 'excellent' && '750+'}
                    {tier === 'good' && '700-749'}
                    {tier === 'fair' && '640-699'}
                    {tier === 'poor' && '<640'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation Result Panel */}
        <div className={styles.resultsPanel}>
          <div className={styles.resultsTop}>
            <span className={styles.estimateTag}>Estimated Monthly Payment</span>
            <div className={styles.monthlyPayment}>
              {formatCurrency(calculation.monthlyPayment)}
              <span className={styles.perMonth}>/mo</span>
            </div>
            <p className={styles.aprDisclaimer}>
              Based on {formatPercentage(calculation.interestRate)} APR fixed rate
            </p>
          </div>

          {/* Visual Amortization Breakdown */}
          <div className={styles.breakdownBar}>
            <div
              className={styles.principalSegment}
              style={{ width: `${principalRatio}%` }}
              title={`Principal: ${formatCurrency(amount)} (${principalRatio}%)`}
            />
            <div
              className={styles.interestSegment}
              style={{ width: `${interestRatio}%` }}
              title={`Interest: ${formatCurrency(calculation.totalInterest)} (${interestRatio}%)`}
            />
          </div>

          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <span className={`${styles.dot} ${styles.dotPrincipal}`} />
              <span>Principal: <strong>{formatCurrency(amount)}</strong></span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.dot} ${styles.dotInterest}`} />
              <span>Interest: <strong>{formatCurrency(calculation.totalInterest)}</strong></span>
            </div>
          </div>

          <div className={styles.statsSummary}>
            <div className={styles.statRow}>
              <span>Total Repayment</span>
              <strong>{formatCurrency(calculation.totalPayment)}</strong>
            </div>
            <div className={styles.statRow}>
              <span>Origination Fee (1%)</span>
              <strong>{formatCurrency(calculation.originationFee)}</strong>
            </div>
          </div>

          {showApplyButton && (
            <div className={styles.actionWrapper}>
              {onApplyWithTerms ? (
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleApply}
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  Apply for this Loan
                </Button>
              ) : (
                <Link to="/apply" style={{ width: '100%' }}>
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon={<ArrowRight size={18} />}
                    iconPosition="right"
                  >
                    Apply with these Terms
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
