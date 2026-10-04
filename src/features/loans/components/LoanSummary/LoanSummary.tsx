import React from 'react';
import styles from './LoanSummary.module.scss';
import { Card } from '@/components/ui/Card';
import { formatCurrency, formatPercentage } from '@/utils/format';
import { ShieldCheck } from 'lucide-react';

export interface LoanSummaryProps {
  amount: number;
  termMonths: number;
  monthlyPayment: number;
  interestRate: number;
  totalInterest: number;
  originationFee: number;
  purposeLabel?: string;
  className?: string;
}

export function LoanSummary({
  amount,
  termMonths,
  monthlyPayment,
  interestRate,
  totalInterest,
  originationFee,
  purposeLabel = 'Debt Consolidation',
  className = '',
}: LoanSummaryProps) {
  const totalPayment = amount + totalInterest;

  return (
    <Card variant="glass" className={`${styles.card} ${className}`}>
      <div className={styles.header}>
        <span className={styles.tag}>Offer Summary</span>
        <h4 className={styles.title}>Your Customized Loan</h4>
      </div>

      <div className={styles.highlightSection}>
        <span className={styles.label}>Estimated Monthly Payment</span>
        <div className={styles.paymentValue}>
          {formatCurrency(monthlyPayment)}
          <span className={styles.paymentPeriod}>/month</span>
        </div>
        <span className={styles.subtext}>
          Fixed for the duration of {termMonths} months
        </span>
      </div>

      <div className={styles.termsList}>
        <div className={styles.termRow}>
          <span>Requested Amount</span>
          <strong>{formatCurrency(amount)}</strong>
        </div>

        <div className={styles.termRow}>
          <span>Loan Term</span>
          <strong>{termMonths} Months ({termMonths / 12} Yrs)</strong>
        </div>

        <div className={styles.termRow}>
          <span>Fixed APR</span>
          <strong className={styles.accentText}>{formatPercentage(interestRate)}</strong>
        </div>

        <div className={styles.termRow}>
          <span>Total Interest</span>
          <strong>{formatCurrency(totalInterest)}</strong>
        </div>

        <div className={styles.termRow}>
          <span>Origination Fee (1%)</span>
          <strong>{formatCurrency(originationFee)}</strong>
        </div>

        <div className={styles.termRow}>
          <span>Intended Purpose</span>
          <strong>{purposeLabel}</strong>
        </div>

        <div className={`${styles.termRow} ${styles.totalRow}`}>
          <span>Total Repayment</span>
          <strong className={styles.totalValue}>{formatCurrency(totalPayment)}</strong>
        </div>
      </div>

      <div className={styles.securityNote}>
        <ShieldCheck size={16} className={styles.shieldIcon} />
        <span>No prepayment penalties. Soft credit inquiry check.</span>
      </div>
    </Card>
  );
}
