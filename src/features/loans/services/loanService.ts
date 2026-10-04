import {
  LoanApplication,
  LoanCalculationResult,
  CreditScoreTier,
  ApplicantInfo,
  FinancialInfo,
  LoanTerms,
} from '../models/loan';
import { LOAN_CONSTANTS, STORAGE_KEYS } from '@/config/constants';
import { storageService } from '@/services/storage/storageService';

const SEED_APPLICATIONS: LoanApplication[] = [
  {
    id: 'APP-8941',
    applicant: {
      firstName: 'Sarah',
      lastName: 'Jenkins',
      email: 'sarah.jenkins@example.com',
      phone: '5551234567',
      dateOfBirth: '1990-05-14',
      ssn: '123456789',
      address: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704',
    },
    financial: {
      employmentStatus: 'employed_full_time',
      employerName: 'Apex Innovations LLC',
      annualIncome: 95000,
      monthlyHousingPayment: 1850,
      creditScoreTier: 'excellent',
    },
    terms: {
      amount: 35000,
      termMonths: 36,
      purpose: 'debt_consolidation',
      interestRate: 4.49,
      monthlyPayment: 1041.05,
      totalPayment: 37477.8,
      totalInterest: 2477.8,
      originationFee: 350,
    },
    status: 'approved',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    timeline: [
      {
        title: 'Application Submitted',
        description: 'Completed multi-step loan questionnaire',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        completed: true,
      },
      {
        title: 'Identity & Income Verification',
        description: 'Instant automated bank verification succeeded',
        timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(),
        completed: true,
      },
      {
        title: 'Underwriting Approval',
        description: 'Approved at prime rate 4.49% APR',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        completed: true,
      },
      {
        title: 'Electronic Signing & Funding',
        description: 'Awaiting agreement signature before direct deposit',
        timestamp: new Date().toISOString(),
        completed: false,
      },
    ],
  },
  {
    id: 'APP-7622',
    applicant: {
      firstName: 'Marcus',
      lastName: 'Vance',
      email: 'marcus.v@example.com',
      phone: '5559876543',
      dateOfBirth: '1985-11-20',
      ssn: '987654321',
      address: '104 Ocean Drive',
      city: 'Miami',
      state: 'FL',
      zipCode: '33139',
    },
    financial: {
      employmentStatus: 'self_employed',
      employerName: 'Vance Design Co.',
      annualIncome: 120000,
      monthlyHousingPayment: 2600,
      creditScoreTier: 'good',
    },
    terms: {
      amount: 50000,
      termMonths: 48,
      purpose: 'business',
      interestRate: 5.99,
      monthlyPayment: 1174.02,
      totalPayment: 56352.96,
      totalInterest: 6352.96,
      originationFee: 500,
    },
    status: 'under_review',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    timeline: [
      {
        title: 'Application Submitted',
        description: 'Completed multi-step loan questionnaire',
        timestamp: new Date(Date.now() - 86400000 * 4).toISOString(),
        completed: true,
      },
      {
        title: 'Document Review',
        description: 'Underwriter assessing 1099 self-employment schedules',
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
        completed: true,
      },
      {
        title: 'Underwriting Decision',
        description: 'Final review expected within 24 business hours',
        timestamp: new Date().toISOString(),
        completed: false,
      },
    ],
  },
];

export const loanService = {
  /**
   * Calculate monthly payment, total interest, and fees
   */
  calculateLoan(
    amount: number,
    termMonths: number,
    creditTier: CreditScoreTier = 'good'
  ): LoanCalculationResult {
    let rate = LOAN_CONSTANTS.BASE_INTEREST_RATE;
    switch (creditTier) {
      case 'excellent':
        rate = LOAN_CONSTANTS.CREDIT_SCORE_EXCELLENT_RATE;
        break;
      case 'good':
        rate = LOAN_CONSTANTS.CREDIT_SCORE_GOOD_RATE;
        break;
      case 'fair':
        rate = LOAN_CONSTANTS.CREDIT_SCORE_FAIR_RATE;
        break;
      case 'poor':
        rate = LOAN_CONSTANTS.CREDIT_SCORE_POOR_RATE;
        break;
    }

    const monthlyRate = rate / 100 / 12;
    const monthlyPayment =
      monthlyRate === 0
        ? amount / termMonths
        : (amount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
          (Math.pow(1 + monthlyRate, termMonths) - 1);

    const totalPayment = monthlyPayment * termMonths;
    const totalInterest = totalPayment - amount;
    const originationFee = Math.round(amount * 0.01); // 1% fee

    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      interestRate: rate,
      originationFee,
    };
  },

  /**
   * Get all applications from storage
   */
  getApplications(): LoanApplication[] {
    const apps = storageService.get<LoanApplication[]>(
      STORAGE_KEYS.APPLICATIONS,
      []
    );
    if (!apps || apps.length === 0) {
      storageService.set(STORAGE_KEYS.APPLICATIONS, SEED_APPLICATIONS);
      return SEED_APPLICATIONS;
    }
    return apps;
  },

  /**
   * Find application by unique ID
   */
  getApplicationById(id: string): LoanApplication | undefined {
    const apps = this.getApplications();
    return apps.find((app) => app.id.toLowerCase() === id.toLowerCase());
  },

  /**
   * Submit new loan application
   */
  async submitApplication(payload: {
    applicant: ApplicantInfo;
    financial: FinancialInfo;
    terms: LoanTerms;
  }): Promise<LoanApplication> {
    // Simulate brief network latency for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 600));

    const id = `APP-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const newApplication: LoanApplication = {
      id,
      applicant: payload.applicant,
      financial: payload.financial,
      terms: payload.terms,
      status: 'submitted',
      createdAt: now,
      updatedAt: now,
      timeline: [
        {
          title: 'Application Received',
          description: 'Your loan application was successfully recorded',
          timestamp: now,
          completed: true,
        },
        {
          title: 'Instant Pre-Qualification Verification',
          description: 'Evaluating income and credit profiles against lending guidelines',
          timestamp: now,
          completed: true,
        },
        {
          title: 'Underwriting Review',
          description: 'Final verification in progress',
          timestamp: now,
          completed: false,
        },
      ],
    };

    const current = this.getApplications();
    const updated = [newApplication, ...current];
    storageService.set(STORAGE_KEYS.APPLICATIONS, updated);
    storageService.remove(STORAGE_KEYS.LOAN_DRAFT);

    return newApplication;
  },

  /**
   * Save draft in progress
   */
  saveDraft(draft: Record<string, unknown>): void {
    storageService.set(STORAGE_KEYS.LOAN_DRAFT, draft);
  },

  /**
   * Retrieve active draft
   */
  getDraft<T>(): T | null {
    return storageService.get<T | null>(STORAGE_KEYS.LOAN_DRAFT, null);
  },
};
