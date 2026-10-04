import { loanService } from '@/features/loans/services/loanService';
import { DashboardSummary } from '../models/dashboard';

export const dashboardService = {
  getSummary(): DashboardSummary {
    const apps = loanService.getApplications();

    const totalRequested = apps.reduce((sum, app) => sum + (app.terms?.amount || 0), 0);
    const activeCount = apps.filter(
      (app) => app.status === 'submitted' || app.status === 'under_review'
    ).length;
    const approvedCount = apps.filter(
      (app) => app.status === 'approved' || app.status === 'funded'
    ).length;

    const rates = apps.map((app) => app.terms?.interestRate || 0).filter((r) => r > 0);
    const averageInterestRate =
      rates.length > 0
        ? Math.round((rates.reduce((sum, r) => sum + r, 0) / rates.length) * 100) / 100
        : 5.99;

    return {
      totalRequested,
      activeCount,
      approvedCount,
      averageInterestRate,
      recentApplications: apps,
    };
  },
};
