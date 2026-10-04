import React from 'react';
import styles from './ApplyPage.module.scss';
import { LoanForm } from '../../components/LoanForm';
import { LoanSummary } from '../../components/LoanSummary';
import { useLoanCalculation } from '../../hooks/useLoanCalculation';
import { ShieldCheck, Zap, Award } from 'lucide-react';

export function ApplyPage() {
  const { amount, termMonths, calculation } = useLoanCalculation(25000, 36);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.badge}>
          <Zap size={14} /> Instant Pre-Qualification
        </div>
        <h1 className={styles.title}>Apply for Your Personal Loan</h1>
        <p className={styles.subtitle}>
          Get funded in as fast as 24 hours. Checking rates will not impact your credit score.
        </p>

        <div className={styles.trustHighlights}>
          <div className={styles.highlight}>
            <ShieldCheck size={16} />
            <span>256-Bit Bank Security</span>
          </div>
          <div className={styles.highlight}>
            <Award size={16} />
            <span>No Hidden Prepayment Fees</span>
          </div>
          <div className={styles.highlight}>
            <Zap size={16} />
            <span>Same-Day Decisioning</span>
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        <main className={styles.formSection}>
          <LoanForm />
        </main>

        <aside className={styles.summarySection}>
          <div className={styles.stickyWrapper}>
            <LoanSummary
              amount={amount}
              termMonths={termMonths}
              monthlyPayment={calculation.monthlyPayment}
              interestRate={calculation.interestRate}
              totalInterest={calculation.totalInterest}
              originationFee={calculation.originationFee}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
