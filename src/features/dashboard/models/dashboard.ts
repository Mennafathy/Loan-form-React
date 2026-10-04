import { LoanApplication } from '@/features/loans/models/loan';

export interface DashboardMetric {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: string;
}

export interface DashboardSummary {
  totalRequested: number;
  activeCount: number;
  approvedCount: number;
  averageInterestRate: number;
  recentApplications: LoanApplication[];
}
