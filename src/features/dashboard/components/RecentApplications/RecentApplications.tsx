import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RecentApplications.module.scss';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoanApplication } from '@/features/loans/models/loan';
import { formatCurrency, formatPercentage } from '@/utils/format';
import { formatDate } from '@/utils/date';
import { ArrowUpRight, Clock, CheckCircle2, AlertCircle, PlusCircle } from 'lucide-react';

export interface RecentApplicationsProps {
  applications: LoanApplication[];
}

export function RecentApplications({ applications }: RecentApplicationsProps) {
  const getBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className={`${styles.badge} ${styles.badgeApproved}`}>
            <CheckCircle2 size={12} /> Approved
          </span>
        );
      case 'under_review':
        return (
          <span className={`${styles.badge} ${styles.badgeReview}`}>
            <Clock size={12} /> In Review
          </span>
        );
      default:
        return (
          <span className={`${styles.badge} ${styles.badgeSubmitted}`}>
            <Clock size={12} /> Submitted
          </span>
        );
    }
  };

  return (
    <Card
      variant="glass"
      className={styles.card}
      title="Recent Loan Applications"
      subtitle="Track your loan requests and approval status"
      action={
        <Link to="/apply">
          <Button variant="outline" size="sm" icon={<PlusCircle size={14} />}>
            New Application
          </Button>
        </Link>
      }
    >
      {applications.length === 0 ? (
        <div className={styles.emptyState}>
          <AlertCircle size={32} className={styles.emptyIcon} />
          <p>No loan applications submitted yet.</p>
          <Link to="/apply">
            <Button variant="primary" size="sm">
              Start Your First Application
            </Button>
          </Link>
        </div>
      ) : (
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Reference ID</th>
                <th>Borrower</th>
                <th>Requested Amount</th>
                <th>Fixed APR</th>
                <th>Term</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className={styles.tableRow}>
                  <td className={styles.refCell}>
                    <strong>#{app.id}</strong>
                  </td>
                  <td>
                    {app.applicant.firstName} {app.applicant.lastName}
                  </td>
                  <td className={styles.amountCell}>
                    {formatCurrency(app.terms.amount)}
                  </td>
                  <td className={styles.rateCell}>
                    {formatPercentage(app.terms.interestRate)}
                  </td>
                  <td>{app.terms.termMonths} mo</td>
                  <td className={styles.dateCell}>{formatDate(app.createdAt)}</td>
                  <td>{getBadge(app.status)}</td>
                  <td>
                    <Link to={`/loans/${app.id}`}>
                      <Button variant="ghost" size="sm" icon={<ArrowUpRight size={14} />}>
                        View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
