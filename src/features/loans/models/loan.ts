export type LoanPurpose =
  | 'debt_consolidation'
  | 'home_improvement'
  | 'business'
  | 'medical'
  | 'auto'
  | 'major_purchase'
  | 'other';

export type EmploymentStatus =
  | 'employed_full_time'
  | 'employed_part_time'
  | 'self_employed'
  | 'retired'
  | 'other';

export type CreditScoreTier = 'excellent' | 'good' | 'fair' | 'poor';

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'action_required'
  | 'funded'
  | 'declined';

export interface ApplicantInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ssn: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface FinancialInfo {
  employmentStatus: EmploymentStatus;
  employerName: string;
  annualIncome: number;
  monthlyHousingPayment: number;
  creditScoreTier: CreditScoreTier;
}

export interface LoanTerms {
  amount: number;
  termMonths: number;
  purpose: LoanPurpose;
  interestRate: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  originationFee: number;
}

export interface ApplicationTimelineEvent {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface LoanApplication {
  id: string;
  applicant: ApplicantInfo;
  financial: FinancialInfo;
  terms: LoanTerms;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  timeline: ApplicationTimelineEvent[];
}

export interface LoanCalculationResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  interestRate: number;
  originationFee: number;
}
