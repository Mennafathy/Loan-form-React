import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DashboardPage.module.scss';
import { useDashboard } from '../../hooks/useDashboard';
import { StatsCard } from '../../components/StatsCard';
import { RecentApplications } from '../../components/RecentApplications';
import { LoanCalculator } from '@/features/loans/components/LoanCalculator';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatPercentage } from '@/utils/format';
import {
  DollarSign,
  Clock,
  CheckCircle2,
  TrendingUp,
  PlusCircle,
  Shield,
  Zap,
} from 'lucide-react';

export function DashboardPage() {
  const { summary, loading } = useDashboard();

  if (loading || !summary) {
    return <div className={styles.loading}>Loading Dashboard...</div>;
  }

  return (
    <div className={styles.dashboard}>
      {/* Hero Welcome Banner */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Shield size={14} /> Next-Generation Borrowing Platform
          </div>
          <h1 className={styles.heroTitle}>
            Transparent, Low-Rate Loans on <span className="text-gradient">Your Terms</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Borrow from $1,000 to $100,000 with competitive APRs starting at 4.49%. Zero hidden origination charges, instant pre-approval, and same-day direct deposit.
          </p>

          <div className={styles.heroActions}>
            <Link to="/apply">
              <Button
                variant="primary"
                size="lg"
                icon={<PlusCircle size={18} />}
              >
                Start New Application
              </Button>
            </Link>
            <a href="#calculator">
              <Button variant="outline" size="lg" icon={<Zap size={18} />}>
                Calculate Rates
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* KPI Metrics Grid */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <StatsCard
            title="Total Borrowed & Requested"
            value={formatCurrency(summary.totalRequested)}
            subtitle="Across recorded applications"
            icon={<DollarSign size={20} />}
            trend="+12.4% vs last mo"
            isPositive={true}
          />
          <StatsCard
            title="Active in Review"
            value={String(summary.activeCount)}
            subtitle="Underwriting decisions pending"
            icon={<Clock size={20} />}
          />
          <StatsCard
            title="Approved & Funded"
            value={String(summary.approvedCount)}
            subtitle="Ready for disbursement"
            icon={<CheckCircle2 size={20} />}
            trend="98% approval rate"
            isPositive={true}
          />
          <StatsCard
            title="Average Fixed APR"
            value={formatPercentage(summary.averageInterestRate)}
            subtitle="Based on borrower credit tiers"
            icon={<TrendingUp size={20} />}
          />
        </div>
      </section>

      {/* Interactive Rate Simulator */}
      <section id="calculator" className={styles.calculatorSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Interactive Payment Calculator</h2>
          <p className={styles.sectionSubtitle}>
            Experiment with different loan terms and see your estimated monthly installment in real time.
          </p>
        </div>
        <LoanCalculator />
      </section>

      {/* Recent Applications Management Table */}
      <section className={styles.applicationsSection}>
        <RecentApplications applications={summary.recentApplications} />
      </section>
    </div>
  );
}
