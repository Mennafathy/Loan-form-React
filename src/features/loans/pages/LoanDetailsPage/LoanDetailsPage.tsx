import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './LoanDetailsPage.module.scss';
import { loanService } from '../../services/loanService';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusTracker } from '../../components/StatusTracker';
import { formatCurrency, formatPercentage, maskSSN, formatPhoneNumber } from '@/utils/format';
import { formatDate } from '@/utils/date';
import {
  ArrowLeft,
  FileCheck,
  Download,
  AlertCircle,
  HelpCircle,
  Clock,
} from 'lucide-react';

export function LoanDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const application = id ? loanService.getApplicationById(id) : undefined;

  if (!application) {
    return (
      <div className={styles.notFoundWrapper}>
        <Card variant="glass" className={styles.notFoundCard}>
          <AlertCircle size={40} className={styles.notFoundIcon} />
          <h2>Application Not Found</h2>
          <p>We could not locate an application with reference ID: <strong>{id}</strong>.</p>
          <Link to="/">
            <Button variant="primary" icon={<ArrowLeft size={16} />}>
              Back to Dashboard
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const { applicant, terms, financial, status, timeline, createdAt } = application;

  return (
    <div className={styles.page}>
      <div className={styles.navigationRow}>
        <Link to="/" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <span className={styles.submittedBadge}>
          <Clock size={14} /> Created on {formatDate(createdAt)}
        </span>
      </div>

      <header className={styles.header}>
        <div className={styles.headerTitles}>
          <span className={styles.appRef}>Reference #{application.id}</span>
          <h1 className={styles.title}>
            {applicant.firstName}’s Loan Application
          </h1>
        </div>

        <div className={styles.headerActions}>
          <Button
            variant="outline"
            size="sm"
            icon={<Download size={16} />}
            onClick={() => alert(`Downloading Loan Disclosure Package for #${application.id}`)}
          >
            Download Disclosure
          </Button>
        </div>
      </header>

      <div className={styles.mainGrid}>
        {/* Left Column: Progress & Terms */}
        <div className={styles.primaryColumn}>
          <Card variant="glass" className={styles.trackerCard}>
            <StatusTracker status={status} timeline={timeline} />
          </Card>

          <Card variant="default" className={styles.detailsCard} title="Loan Terms & Payment Breakdown">
            <div className={styles.termsGrid}>
              <div className={styles.termBox}>
                <span className={styles.termLabel}>Approved Principal</span>
                <strong className={styles.termValue}>{formatCurrency(terms.amount)}</strong>
              </div>
              <div className={styles.termBox}>
                <span className={styles.termLabel}>Monthly Repayment</span>
                <strong className={styles.termValue}>{formatCurrency(terms.monthlyPayment)}/mo</strong>
              </div>
              <div className={styles.termBox}>
                <span className={styles.termLabel}>Fixed APR</span>
                <strong className={`${styles.termValue} ${styles.accentColor}`}>
                  {formatPercentage(terms.interestRate)}
                </strong>
              </div>
              <div className={styles.termBox}>
                <span className={styles.termLabel}>Duration</span>
                <strong className={styles.termValue}>{terms.termMonths} Months</strong>
              </div>
            </div>

            <div className={styles.breakdownTable}>
              <div className={styles.tableRow}>
                <span>Total Interest Over Term</span>
                <strong>{formatCurrency(terms.totalInterest)}</strong>
              </div>
              <div className={styles.tableRow}>
                <span>Origination Fee (1%)</span>
                <strong>{formatCurrency(terms.originationFee)}</strong>
              </div>
              <div className={`${styles.tableRow} ${styles.totalRow}`}>
                <span>Total Lifetime Repayment</span>
                <strong className={styles.totalValue}>{formatCurrency(terms.totalPayment)}</strong>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Borrower Info & Checklist */}
        <div className={styles.secondaryColumn}>
          <Card variant="default" className={styles.infoCard} title="Borrower Information">
            <div className={styles.infoList}>
              <div className={styles.infoRow}>
                <span>Full Name</span>
                <strong>{applicant.firstName} {applicant.lastName}</strong>
              </div>
              <div className={styles.infoRow}>
                <span>Email Address</span>
                <strong>{applicant.email}</strong>
              </div>
              <div className={styles.infoRow}>
                <span>Phone Number</span>
                <strong>{formatPhoneNumber(applicant.phone)}</strong>
              </div>
              <div className={styles.infoRow}>
                <span>Social Security (SSN)</span>
                <strong>{maskSSN(applicant.ssn)}</strong>
              </div>
              <div className={styles.infoRow}>
                <span>Address</span>
                <strong>{applicant.address}, {applicant.city}, {applicant.state} {applicant.zipCode}</strong>
              </div>
            </div>
          </Card>

          <Card variant="default" className={styles.checklistCard} title="Underwriting Checklist">
            <ul className={styles.checklist}>
              <li className={styles.checkItem}>
                <FileCheck size={18} className={styles.checkDone} />
                <span>Identity Verification Completed</span>
              </li>
              <li className={styles.checkItem}>
                <FileCheck size={18} className={styles.checkDone} />
                <span>Proof of Income Validated (${financial.annualIncome.toLocaleString()}/yr)</span>
              </li>
              <li className={styles.checkItem}>
                <FileCheck size={18} className={styles.checkDone} />
                <span>Credit Report Checked ({financial.creditScoreTier.toUpperCase()})</span>
              </li>
              <li className={styles.checkItem}>
                <HelpCircle size={18} className={styles.checkPending} />
                <span>Final Electronic Agreement Signature</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
